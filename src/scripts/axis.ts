// The hero timeline's card. One card serves every role: it glides between
// them as the pointer scrubs along the line, and the company name decodes out
// of the same 0s and 1s as the waterfall above it. Each role's details ride on
// its hover target as data attributes, so this file only moves text around.
const track = document.querySelector<HTMLElement>("[data-axis]");
const tip = track?.querySelector<HTMLElement>("[data-axis-tip]");

/** Decimal years, the unit site.ts uses for the axis. */
const today = () => {
  const now = new Date();
  return now.getFullYear() + now.getMonth() / 12;
};

const tenure = (from: number, to: number) => {
  const total = Math.max(1, Math.round((to - from) * 12));
  const years = Math.floor(total / 12);
  const months = total % 12;
  return [
    years ? `${years} ${years === 1 ? "yr" : "yrs"}` : "",
    months ? `${months} mo` : "",
  ]
    .filter(Boolean)
    .join(" ");
};

if (track && tip) {
  const box = tip.firstElementChild as HTMLElement;
  const field = (name: string) =>
    tip.querySelector<HTMLElement>(`[data-tip="${name}"]`)!;
  const company = field("company");
  const role = field("role");
  const period = field("period");
  const length = field("length");
  const hits = [...track.querySelectorAll<HTMLButtonElement>("[data-hit]")];
  const segs = [...track.querySelectorAll<SVGLineElement>("[data-seg]")];
  const calm = window.matchMedia("(prefers-reduced-motion: reduce)");

  let active = -1;
  let closing = 0;
  let frame = 0;

  // Measured at the final text, then pinned, so the flickering digits cannot
  // jostle the box while the name decodes.
  const place = (i: number) => {
    box.style.width = "";
    const width = box.offsetWidth;
    box.style.width = `${width}px`;
    const span = track.clientWidth;
    const center = (Number(hits[i].dataset.center) / 100) * span;
    const left = Math.max(0, Math.min(center - width / 2, span - width));
    tip.style.setProperty("--tip-x", `${left}px`);
    // The caret hangs off the hard shadow, which starts 4px in from the left.
    tip.style.setProperty(
      "--caret-x",
      `${Math.max(14, Math.min(center - left, width - 6))}px`
    );
  };

  const decode = (text: string) => {
    cancelAnimationFrame(frame);
    company.textContent = text;
    if (calm.matches) return;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      let shown = "";
      let settled = true;
      for (let k = 0; k < text.length; k++) {
        // Every character flickers for a moment, then locks, left to right.
        if (text[k] === " " || elapsed > 70 + k * 24) {
          shown += text[k];
        } else {
          shown += Math.random() < 0.5 ? "0" : "1";
          settled = false;
        }
      }
      company.textContent = shown;
      if (!settled) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
  };

  const open = (i: number) => {
    window.clearTimeout(closing);
    if (i === active) return;
    const data = hits[i].dataset;
    const fresh = active === -1;
    active = i;

    role.textContent = data.role ?? "";
    period.textContent = data.period ?? "";
    period.toggleAttribute("data-current", !data.to);
    length.textContent = tenure(
      Number(data.from),
      data.to ? Number(data.to) : today()
    );
    company.textContent = data.company ?? "";
    place(i);

    // Opening fresh lands on the role; only a card already open glides.
    tip.toggleAttribute("data-snap", fresh);
    tip.setAttribute("data-open", "");
    track.setAttribute("data-active", "");
    segs.forEach((seg, j) => seg.classList.toggle("is-active", j === i));
    decode(data.company ?? "");
  };

  const close = (after = 0) => {
    window.clearTimeout(closing);
    closing = window.setTimeout(() => {
      active = -1;
      tip.removeAttribute("data-open");
      track.removeAttribute("data-active");
      segs.forEach((seg) => seg.classList.remove("is-active"));
    }, after);
  };

  hits.forEach((hit, i) => {
    hit.addEventListener("pointerenter", () => open(i));
    hit.addEventListener("focus", () => open(i));
    // Touch has no hover: a tap opens the card, a tap anywhere else closes it.
    hit.addEventListener("click", () => open(i));
  });

  // The card sits inside the track, so moving onto it does not count as
  // leaving. The short delay lets the pointer cross a gap between roles.
  track.addEventListener("pointerleave", (event) => {
    if (event.pointerType !== "touch") close(140);
  });

  track.addEventListener("focusout", (event) => {
    if (!track.contains(event.relatedTarget as Node | null)) close();
  });

  document.addEventListener("pointerdown", (event) => {
    if (active !== -1 && !track.contains(event.target as Node)) close();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && active !== -1) close();
  });

  window.addEventListener("resize", () => {
    if (active !== -1) place(active);
  });
}
