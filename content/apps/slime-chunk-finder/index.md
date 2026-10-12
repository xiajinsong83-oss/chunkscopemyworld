---
title: "Slime Chunk Finder"
description: "Find all slime chunks for any seed — Java & Bedrock, with a 1/10 chunk probability breakdown and farm placement tips."
type: tool
editions: ["Java", "Bedrock"]
version: "1.21.5"
featured: true
accent: 1
js: ""
tags: ["Slime", "Chunks", "Farms"]
relatedGuides: ["/guides/playerless-sugarcane-farm/"]
---
Slime chunks are hard-coded into every world — roughly 1 in 10 chunks spawn slimes below Y = 40. The Slime Chunk Finder maps them all for any seed, so you can place your slime farm without trial and error.

## How to use

1. Enter your **seed** and **edition**.
2. The map marks slime chunks in green. Coordinates snap to chunk borders (16×16).
3. Pick a chunk inside your spawn/loaded area and build a farm at Y = 30 or lower.

## Slime spawn rules (Java)

- Slimes spawn below **Y = 40** in slime chunks (any light level).
- Swamp biomes spawn slimes at night above Y = 50 too, but slower than a chunk farm.
- Chunk probability: **10%** per chunk — a 3×3 chunk area has ~27% chance to contain at least one.
- The pattern is identical for Java and Bedrock **since 1.18**; older Bedrock worlds differ.

## Common questions

**Can I change slime chunks?** No — they are fixed by seed. Build around them.

**Why does my farm produce nothing?** The farm must be in a *loaded* chunk (within simulation distance of a player). AFK above the farm at Y = 60–100 so nothing else spawns nearby.
