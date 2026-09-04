---
title: "Retries that know when to give up"
context: "Security awareness SaaS"
order: 1
tags: ["Symfony Messenger", "SMTP", "PHP"]
---

A mailbox that no longer exists and a mail server having a bad minute fail the
same way at the transport level. Treat them identically and permanent rejections
ride the whole backoff schedule, taking up room that belongs to the transient
failures retrying would actually fix.

I design queue retry strategies that read the SMTP response and split the two:
permanent rejections stop on the first attempt and get recorded, transient ones
back off and try again. Little code, and it decides whether a retry queue is
reporting problems worth acting on or just talking to itself.
