---
title: "Why do my Nether portals link to the wrong place?"
description: "Portal linking rules explained — the 1:8 ratio, the 128-block search radius, and how to force exact links."
featured: true
---
# Why do my Nether portals link to the wrong place?

Portal linking feels random until you know the three rules.

## Rule 1 — The 1:8 ratio

Every Nether block equals 8 Overworld blocks. A portal at Nether (10, 20) should link near Overworld (80, 160). The game converts coordinates, then searches for an existing portal.

## Rule 2 — The search radius

After converting, the game searches for a portal in a **128-block radius (Overworld)** / **16-block radius (Nether)**. If it finds *any* portal there, it links to that one — even if it's not the "right" one.

## Rule 3 — Closest wins

If two portals are both in range, the nearest gets the link.

## How to force exact links

1. Build the **first** portal exactly at your base, note its coordinates.
2. In the Nether, build the second portal at **(X÷8, Z÷8)** of the first.
3. Light it and step through — it links to the Overworld portal nearest (X, Z). Verify, then never build other portals within 1,024 Overworld blocks of the pair.

Use our [Nether Portal Calculator](/apps/nether-portal-calculator/) to convert coordinates instantly and stop guessing.
