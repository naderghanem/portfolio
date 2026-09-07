/// <reference types="astro/client" />

/**
 * Read by the Pages Function in functions/api/chat.ts via `context.env`.
 * Both are set in the Pages dashboard as encrypted secrets, never in the repo.
 */
interface Env {
  /** Workers AI. A binding, added in the Pages dashboard — no key involved. */
  AI: Ai;
  /** Optional secret. Set it to move the chat from Workers AI to Claude. */
  ANTHROPIC_API_KEY: string;
}

/**
 * The Workers AI binding, narrowed to the one call the endpoint makes. The
 * full @cloudflare/workers-types package declares the whole runtime globally
 * and its HTMLRewriter `Element` shadows the DOM one, which breaks every
 * browser script here.
 */
interface Ai {
  run(
    model: "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
    inputs: {
      messages: { role: "system" | "user" | "assistant"; content: string }[];
      stream: true;
      max_tokens?: number;
      temperature?: number;
    }
  ): Promise<ReadableStream<Uint8Array>>;
}

/** Injected by `vite.define` in astro.config.mjs, measured from public/. */
declare const __CV_FILE__: string;
declare const __CV_SIZE_KB__: number;

/**
 * Minimal stand-in for the type in @cloudflare/workers-types. That package
 * declares the entire Workers runtime globally, and its HTMLRewriter `Element`
 * shadows the DOM `Element`, which breaks every browser-side script here.
 * The endpoint uses two fields, so two fields are what this declares.
 */
type PagesFunction<E = unknown> = (context: {
  request: Request;
  env: E;
  params: Record<string, string | string[]>;
  waitUntil(promise: Promise<unknown>): void;
  next(input?: Request): Promise<Response>;
}) => Response | Promise<Response>;
