---
title: "Failure visibility for the support team"
context: "Awaretrain"
order: 4
tags: ["Grafana", "Loki", "CloudWatch"]
---

Support could tell that something had broken for a customer, but not what, so
every question became an engineering interrupt.

I built dashboards over the platform's logs and metrics so the team could trace
a failed action themselves: which service, which error, and when. Engineering
stopped being the first stop for triage.
