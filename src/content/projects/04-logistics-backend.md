---
title: "Backend components for time-sensitive logistics"
context: "Logistics platform"
order: 4
tags: ["Symfony", "MySQL", "Doctrine"]
---

Shipment data passes through many hands and every stage has a deadline. I built
modular backend components handling that flow.

A good share of the work was on the database side, reworking queries and access
patterns where latency was showing up in daily operations rather than in a
profiler. Shipped in a Scrum team with frequent production releases, with QA
involved early enough to catch edge cases before customers found them.
