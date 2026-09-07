import { SYSTEM_PROMPT } from "../../src/lib/persona";

// A Cloudflare Pages Function. The file's path is its route, so this answers
// POST /api/chat on the same origin as the page — no CORS, no second project,
// and the secret stays in the Pages environment where the browser cannot see
// it. The rest of the site is still plain prerendered HTML.

/** Caps. A public endpoint spending someone's quota needs all three. */
const MAX_TURNS = 12; // conversation length
const MAX_CHARS = 1000; // one visitor message
const MAX_TOKENS = 1024; // one answer — replies are meant to be short

/**
 * Workers AI: a binding, not an API key, so there is nothing to leak or
 * rotate. The free allocation is 10,000 Neurons a day and this model costs
 * ~100 per exchange here, so roughly 100 conversations a day cost nothing.
 */
const WORKERS_AI_MODEL = "@cf/meta/llama-3.3-70b-instruct-fp8-fast";

type Turn = { role: "user" | "assistant"; content: string };

/** Carries the provider's status so a rate limit can be told from a real fault. */
class ProviderError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
  }
}

function bad(status: number, error: string) {
  return new Response(JSON.stringify({ error }), {
    status,
    headers: { "content-type": "application/json" },
  });
}

/**
 * Returns the validated turns, or a string describing what was wrong.
 * Everything here is attacker-controlled, so nothing is trusted by shape alone.
 */
function readMessages(body: unknown): Turn[] | string {
  if (typeof body !== "object" || body === null) return "Malformed request.";
  const messages = (body as { messages?: unknown }).messages;
  if (!Array.isArray(messages) || messages.length === 0) return "No messages.";
  if (messages.length > MAX_TURNS) return "This conversation is long enough — start a new one.";

  const out: Turn[] = [];
  for (const m of messages) {
    if (typeof m !== "object" || m === null) return "Malformed message.";
    const { role, content } = m as { role?: unknown; content?: unknown };
    if (role !== "user" && role !== "assistant") return "Malformed message.";
    if (typeof content !== "string") return "Malformed message.";
    const trimmed = content.trim();
    if (!trimmed) return "Empty message.";
    if (trimmed.length > MAX_CHARS) return `Keep it under ${MAX_CHARS} characters.`;
    out.push({ role, content: trimmed });
  }
  if (out[out.length - 1].role !== "user") return "Malformed request.";
  return out;
}

/**
 * Both providers stream SSE; only the shape inside each frame differs. This
 * unwraps frames to the plain text the page expects, so switching providers
 * never changes a line of client code.
 */
function sseToText(
  source: ReadableStream<Uint8Array>,
  extract: (frame: unknown) => string
): ReadableStream<Uint8Array> {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffered = "";

  return source.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        buffered += decoder.decode(chunk, { stream: true });
        // Keep the trailing fragment: a frame can be split across chunks.
        const lines = buffered.split("\n");
        buffered = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data:")) continue;
          const payload = line.slice(5).trim();
          if (!payload || payload === "[DONE]") continue;
          try {
            const text = extract(JSON.parse(payload));
            if (text) controller.enqueue(encoder.encode(text));
          } catch {
            // A frame we cannot parse is not worth killing the answer over.
          }
        }
      },
    })
  );
}

/**
 * Free path. Runs on the account's own Workers AI binding — no second service,
 * no key in the environment, and the request never leaves Cloudflare.
 */
async function answerWithWorkersAI(ai: Ai, messages: Turn[]) {
  const stream = await ai.run(WORKERS_AI_MODEL, {
    messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
    stream: true,
    max_tokens: MAX_TOKENS,
    // Low: the answers are recall over a fixed dossier, not invention.
    temperature: 0.3,
  });

  return sseToText(stream, (frame) => (frame as { response?: string }).response ?? "");
}

/**
 * Paid path, used when ANTHROPIC_API_KEY is set. The SDK is imported lazily so
 * the free deployment never pulls it into the Worker bundle.
 */
async function answerWithClaude(apiKey: string, messages: Turn[]) {
  const { default: Anthropic } = await import("@anthropic-ai/sdk");
  const client = new Anthropic({ apiKey });

  // The system prompt is identical on every request and sits at the front of
  // the prefix, so it caches: ~2,500 tokens billed at a tenth of the rate
  // after the first call. Nothing volatile is interpolated into it.
  const stream = client.messages.stream({
    model: "claude-opus-5",
    max_tokens: MAX_TOKENS,
    // Low effort: short factual recall over a small dossier, not a reasoning
    // problem. Thinking is left on (its default on Opus 5) — disabling it
    // costs more in failure modes than it saves here.
    output_config: { effort: "low" },
    system: [
      { type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } },
    ],
    messages,
  });

  const encoder = new TextEncoder();
  return new ReadableStream<Uint8Array>({
    async start(controller) {
      for await (const event of stream) {
        if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
          controller.enqueue(encoder.encode(event.delta.text));
        }
      }
      controller.close();
    },
  });
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const url = new URL(request.url);
  // Same-origin only. Cheap, and it stops the endpoint being embedded on
  // someone else's page and billed to Nader's quota. Absent Origin (curl) is
  // allowed through — it proves nothing either way, and the caps still apply.
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== url.host) {
    return bad(403, "Not allowed from this origin.");
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return bad(400, "Malformed request.");
  }

  const messages = readMessages(body);
  if (typeof messages === "string") return bad(400, messages);

  // The binding is the default. Setting ANTHROPIC_API_KEY moves the chat to
  // Claude with no code change; deleting the secret moves it back.
  const anthropicKey = env.ANTHROPIC_API_KEY;
  if (!anthropicKey && !env.AI) return bad(500, "Chat is not configured.");

  let answer: ReadableStream<Uint8Array>;
  try {
    answer = anthropicKey
      ? await answerWithClaude(anthropicKey, messages)
      : await answerWithWorkersAI(env.AI, messages);
  } catch (err) {
    // Nothing has been written yet, so this can still be an honest status.
    console.error("chat provider failed", err);
    // Exhausting the day's free Neurons is ordinary traffic, not a fault, and
    // saying so is more use to a visitor than "unavailable". The binding
    // reports it as a message rather than a status, so both are checked.
    const overQuota =
      (err instanceof ProviderError && err.status === 429) ||
      /capacity|quota|rate limit|too many/i.test(
        err instanceof Error ? err.message : String(err)
      );
    if (overQuota) {
      return bad(429, "Busy right now — try again in a little while.");
    }
    return bad(502, "The assistant is unavailable right now. Try again shortly.");
  }

  return new Response(answer, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
    },
  });
};

/**
 * Method-specific handlers take priority, so this only sees anything but POST.
 * Without it Pages falls through to the static assets and a GET on the API
 * quietly returns the homepage with a 200.
 */
export const onRequest: PagesFunction<Env> = async () =>
  bad(405, "This endpoint accepts POST only.");
