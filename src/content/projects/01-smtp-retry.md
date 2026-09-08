---
title: "Retries that know when to give up"
context: "Awaretrain"
order: 1
tags: ["Symfony Messenger", "SMTP", "PHP"]
---

A mailbox that no longer exists and a mail server having a bad minute fail the
same way at the transport level. Treat them identically and permanent rejections
ride the full backoff schedule, crowding out the transient failures a retry
would actually fix.

I designed a retry strategy for the mail queue that reads the SMTP response and
splits the two: permanent rejections stop after the first attempt and are
recorded, transient ones back off and try again. Not much code, and it decides
whether the retry queue is reporting problems worth acting on or just talking
to itself.
