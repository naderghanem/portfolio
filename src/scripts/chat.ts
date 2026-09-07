// Chat panel. Talks to /api/chat, which streams plain text back.
// Kept in a module rather than an inline script block: an inline body is
// projected as JSX when the page is type-checked, which mangles generics.

type Turn = { role: "user" | "assistant"; content: string };

const MAX_CHARS = 1000;
const MAX_TURNS = 12;

const form = document.querySelector<HTMLFormElement>("[data-chat-form]");
const input = document.querySelector<HTMLInputElement>("[data-chat-input]");
const log = document.querySelector<HTMLElement>("[data-chat-log]");
const starters = document.querySelector<HTMLElement>("[data-chat-starters]");
const panel = document.querySelector<HTMLDialogElement>("[data-chat-panel]");
// There is more than one way in — the hero and the case note — so this has to
// be querySelectorAll. querySelector would silently leave the second button dead.
const openBtns = document.querySelectorAll<HTMLButtonElement>("[data-chat-open]");
const closeBtn = document.querySelector<HTMLButtonElement>("[data-chat-close]");

// showModal() covers the focus trap, Esc, page inertness and top-layer
// stacking. All that is left is opening it, closing it, and the one thing
// <dialog> does not do: treating a click on the backdrop as a dismissal.
if (panel && openBtns.length) {
  for (const btn of openBtns) {
    btn.addEventListener("click", () => {
      panel.showModal();
      input?.focus();
    });
  }

  closeBtn?.addEventListener("click", () => panel.close());

  // The backdrop is part of the dialog element, so a click that lands outside
  // the inner box is a backdrop click. Comparing against the panel's own box
  // avoids adding a wrapper element just to detect this.
  panel.addEventListener("click", (event) => {
    if (event.target !== panel) return;
    const box = panel.getBoundingClientRect();
    const inside =
      event.clientX >= box.left &&
      event.clientX <= box.right &&
      event.clientY >= box.top &&
      event.clientY <= box.bottom;
    if (!inside) panel.close();
  });
}

if (form && input && log) {
  const history: Turn[] = [];

  /** Appends a bubble and returns its text node holder, for streaming into. */
  const addTurn = (role: Turn["role"], text: string) => {
    const li = document.createElement("li");
    li.className = `chat__turn chat__turn--${role}`;
    const body = document.createElement("p");
    body.className = "chat__bubble";
    body.textContent = text;
    li.append(body);
    log.append(li);
    // The log is its own scroll container, so this never moves the page.
    log.scrollTop = log.scrollHeight;
    return body;
  };

  const setBusy = (busy: boolean) => {
    input.disabled = busy;
    form.dataset.busy = busy ? "true" : "false";
    if (!busy) input.focus();
  };

  const ask = async (question: string) => {
    const text = question.trim().slice(0, MAX_CHARS);
    if (!text) return;

    if (history.length >= MAX_TURNS) {
      addTurn("assistant", "That is a long conversation — reload the page to start fresh.");
      return;
    }

    starters?.remove();
    addTurn("user", text);
    history.push({ role: "user", content: text });
    input.value = "";
    setBusy(true);

    // Placeholder bubble; the dots are swapped for the first token that lands.
    const bubble = addTurn("assistant", "");
    bubble.classList.add("chat__bubble--waiting");

    let answer = "";
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      if (!res.ok || !res.body) {
        const detail = await res.json().catch(() => null);
        throw new Error(detail?.error ?? "Something went wrong.");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        answer += decoder.decode(value, { stream: true });
        bubble.classList.remove("chat__bubble--waiting");
        bubble.textContent = answer;
        log.scrollTop = log.scrollHeight;
      }

      history.push({ role: "assistant", content: answer });
    } catch (err) {
      bubble.classList.remove("chat__bubble--waiting");
      bubble.classList.add("chat__bubble--error");
      bubble.textContent = err instanceof Error ? err.message : "Something went wrong.";
      // Drop the unanswered question so the next request is not sent with a
      // dangling user turn the model never replied to.
      history.pop();
    } finally {
      setBusy(false);
    }
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    void ask(input.value);
  });

  starters?.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLButtonElement && target.dataset.starter) {
      void ask(target.dataset.starter);
    }
  });
}
