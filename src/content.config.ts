import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    /** Domain, deliberately vague — no client-identifying detail. */
    context: z.string(),
    /** Lower numbers appear first. */
    order: z.number(),
    tags: z.array(z.string()).default([]),
    /** Renders the "ask a question" button inside this note. */
    demo: z.boolean().default(false),
  }),
});

export const collections = { projects };
