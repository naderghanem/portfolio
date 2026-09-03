---
title: "Retries that know when to give up"
context: "Security awareness SaaS"
order: 1
tags: ["Symfony Messenger", "SMTP", "PHP"]
---

A queue-backed mailer was retrying every failed send the same way. A mailbox that
no longer exists fails identically to a mail server having a bad minute, so
permanent failures cycled through the whole retry schedule and buried real
incidents in alert noise.

I designed a retry strategy that reads the SMTP response and separates permanent
rejections from transient ones. Permanent failures stop immediately and get
recorded; transient ones back off and try again. Queue volume and false alerts
both came down.
