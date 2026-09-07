// @ts-check
import { statSync } from "node:fs";
import { defineConfig } from "astro/config";

// Measured at config time so the label cannot go stale when the CV is replaced.
const CV_FILE = "nader-ghanem-cv.pdf";
const cvSizeKb = Math.round(statSync(`public/${CV_FILE}`).size / 1024);

export default defineConfig({
  // this affects canonical/OG URLs, not where the site deploys.
  site: "https://naderghanem.is-a.dev",

  // No adapter. The page is prerendered to plain HTML and served by Pages;
  // the one dynamic route lives in functions/, which Pages runs for us.
  vite: {
    define: {
      __CV_FILE__: JSON.stringify(CV_FILE),
      __CV_SIZE_KB__: JSON.stringify(cvSizeKb),
    },
  },
});
