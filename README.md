# naderghanem portfolio

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
it appears in "Case notes", sorted by `order`.

```markdown
---
title: "What the thing did"
context: "Domain it lived in"
order: 7
tags: ["Symfony", "Redis"]
---

One paragraph on the problem. One on what you built and what changed.
```

### Adding a job

Append to the `roles` array in `src/data/site.ts`. The `from` and `to` fields are
decimal years (`2024.5` is mid-2024) and drive the hero timeline, so a new role
shows up there automatically.
