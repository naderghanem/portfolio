---
title: "Data collection pipelines"
context: "Data engineering"
order: 6
tags: ["Scrapy", "Selenium", "PostgreSQL"]
---

Built extraction pipelines against public web sources, handling the usual
realities: pagination, rate limits, markup that changes without warning, and
pages that only render under a real browser.

Collected data landed in a schema designed for querying rather than just storing,
so the people who asked for it could actually use it.
