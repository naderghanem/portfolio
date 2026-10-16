---
title: "Backend components for time-sensitive logistics"
context: "CEVA Logistics"
order: 5
tags: ["Symfony", "MySQL", "Doctrine"]
---

Shipment data passes through many hands, and every stage has a deadline.

I built modular backend components handling that flow. A good share of the work
was on the database side, reworking queries and access patterns where the
latency was showing up in daily operations rather than in a profiler. Shipped in
a Scrum team on a frequent release cadence, with QA involved early enough to
catch edge cases before customers did.
