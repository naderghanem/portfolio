# naderghanem.dev — portfolio

A static one-page portfolio built with [Astro](https://astro.build). No database,
no server, no build-time API calls. It compiles to plain HTML and CSS.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # writes dist/
npm run preview  # serve dist/ locally
```

## Where the content lives

Nothing important is buried in markup. Editing these three places covers
everything on the page.

| What you want to change | File |
| --- | --- |
| Name, headline, contact links, tech stack, jobs, certification, education | `src/data/site.ts` |
| A project write-up | `src/content/projects/*.md` |
| Colours, type, spacing | the token block at the top of `src/styles/global.css` |

### Adding a project

Create one markdown file in `src/content/projects/`. Nothing else to wire up —
it appears in "Selected work", sorted by `order`.

```markdown
---
title: "What the thing did"
context: "Domain it lived in"
order: 7
tags: ["Symfony", "Redis"]
---

One paragraph on the problem. One on what you built and what changed.
```

Keep these free of anything internal — no client names, no internal service
names, no numbers you would not say publicly. The current six are written that
way on purpose.

### Adding a job

Append to the `roles` array in `src/data/site.ts`. The `from` and `to` fields are
decimal years (`2024.5` is mid-2024) and drive the hero timeline, so a new role
shows up there automatically.

## Before you publish

Two placeholders are waiting in `src/data/site.ts`:

- `github` — set your real username, or delete the line to hide the link.
- `credentials[0].url` — paste your Scrum.org credential URL to turn the PSM II
  entry into a verify link. Left empty, the link just doesn't render.

Also set `site` in `astro.config.mjs` to your final domain. It only affects the
canonical and social-preview URLs.

## Deploying to Cloudflare Pages

Free, unlimited bandwidth, and it redeploys on every push.

1. Push this folder to a GitHub repository.
2. At [dash.cloudflare.com](https://dash.cloudflare.com) go to **Workers & Pages
   → Create → Pages → Connect to Git** and pick the repo.
3. Settings:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Output directory: `dist`
4. Deploy. You get `<project-name>.pages.dev`.

From then on, `git push` is the whole deploy process.

### Getting a nicer domain, free

`naderghanem.is-a.dev` is free forever for developers. Open a pull request on
[is-a-dev/register](https://github.com/is-a-dev/register) adding one JSON file
that points at your `.pages.dev` address, then add the domain under
**Custom domains** in the Pages project.

Or buy `naderghanem.dev` (~€12/year) and point it at the same deployment. Either
way, update `site` in `astro.config.mjs` afterwards.

### Other hosts

The build output is a plain static folder, so Netlify, Vercel and GitHub Pages
all work with the same `npm run build` / `dist` settings.
