---
title: "One repair log for the workshop and the client"
context: "Side project"
order: 1
tags: ["Laravel", "Filament", "PostgreSQL", "FrankenPHP"]
---

I repair retro consoles as a hobby, in batches for a company in Utrecht:
controllers, Game Boys and other handhelds, sixty to ninety units at a time,
with a bag of parts to go with them. Both sides need the same answers about a
batch: how far along it is, which parts are left, and what has already been
done to a given unit.

[Repair Retro](https://repair-retro.club) takes a batch the way it is handed
over, products with counts plus the parts list, and gives every unit its own
ID, status, checks and a dated history of notes. Fitting a part draws it from
that batch's stock, so the count left is never a guess. The company follows
along in its own portal and exports a batch to Excel. The portal never shows
money or my private notes, and a test renders every portal page and fails if
either appears.

It runs on free hosting, which shaped the code as much as the features did.
The database has a monthly allowance of compute hours and sleeps when idle, so
nothing in the app polls it, and the health check an uptime monitor pings is
tested never to touch it.
