// The head script has already applied the theme; this only flips it and
// remembers the choice. Which label shows is handled in CSS.
const root = document.documentElement;
const button = document.querySelector<HTMLButtonElement>("[data-theme-toggle]");

if (button) {
  const describe = () => {
    button.setAttribute(
      "aria-label",
      root.dataset.theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
    );
  };

  describe();

  button.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    describe();
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage blocked; the choice just does not survive a reload.
    }
  });
}
