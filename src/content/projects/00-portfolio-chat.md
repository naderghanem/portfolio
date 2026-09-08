---
title: "A chat assistant that refuses most questions"
context: "This site"
order: 0
tags: ["Astro", "Cloudflare Pages", "Workers AI", "TypeScript"]
demo: true
---

The hard part of a chat box on a portfolio is not answering questions about my
CV. It is declining everything else: writing a visitor's code, judging their
hiring process, inventing experience I do not have.

Everything it knows is my CV and these write-ups, assembled at build time from
the same files this page renders, so its answers cannot drift from what you are
reading. The whole corpus is about two thousand tokens, small enough to hand
over whole, so there is no retrieval step and no vector store to keep in sync.
It answers from a Cloudflare Pages Function on a model binding, so no API key
reaches the browser, under caps on message length, turn count and reply length.

Visitor text is treated as a question, never as an instruction. The scope rule
is written as what the assistant is for rather than as a list of banned topics,
because a blocklist invites people to go looking for the gap.
