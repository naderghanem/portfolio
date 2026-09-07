---
title: "A chat assistant that refuses most questions"
context: "This site"
order: 0
tags: ["Astro", "Cloudflare Pages", "Workers AI", "TypeScript"]
demo: true
---

A chat box on a portfolio is easy to build and easy to get wrong. The failure
mode is not a wrong answer about my job history, it is the thing answering
anything at all: writing someone's code, opining on their hiring process,
inventing a year of experience I do not have. The interesting engineering here
is what it declines, and holding that line against visitors who treat the input
box as a dare.

So the scope is the design. Everything it knows is my CV and these write-ups,
built from the same files this page renders, which is a little over two thousand
tokens: small enough to hand over whole, so there is no retrieval step and no
vector store to keep in sync. It answers from a Pages Function rather
than the browser, on a model binding that carries no API key to leak, behind
caps on message length, turn count and reply length, and it treats anything in
a message that claims to be an instruction as text rather than authority. The
provider sits behind one function, the prompt does not change when it moves.
