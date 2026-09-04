---
title: "Campaign reporting people can hand upward"
context: "Security awareness SaaS"
order: 2
tags: ["PHP", "PDF generation", "Object storage"]
---

Reporting that has to leave the tool it was generated in is its own problem. The
numbers need aggregating once, arranging for a reader who was never in the tool,
and rendering into something portable enough to forward.

I led a summary export end to end: scoping with product, designing the
aggregation, building the rendering pipeline, and taking it through release.
Turning raw event data into a document a security officer can send to management
without editing it first is mostly a design problem, and only then a PDF problem.
