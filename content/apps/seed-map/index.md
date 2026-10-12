---
title: "Seed Map"
description: "Interactive world map — biomes, structures, slime chunks, ore and terrain for any seed. Java & Bedrock, 1.18+."
type: tool
editions: ["Java", "Bedrock"]
version: "1.21.5"
featured: true
accent: 1
js: ""
tags: ["World", "Biomes", "Structures"]
relatedGuides: ["/guides/find-ancient-cities/", "/guides/playerless-sugarcane-farm/"]
---
The Seed Map is ChunkScope's flagship tool. Enter any seed and edition to get an interactive top-down map of the entire world: biomes, villages, strongholds, ancient cities, trial chambers, slime chunks, ore distribution and terrain height.

## How to use

1. Enter your world **seed** (find it with `/seed` in-game, or check your world settings).
2. Choose your **edition** — Java and Bedrock use different world generators.
3. Select a **game version** (defaults to the latest release).
4. Toggle overlays: structures, slime chunks, biomes, ores, spawn chunk grid.

## Parameters

| Parameter | Options | Notes |
|---|---|---|
| Seed | Any number or text | Text seeds convert to numeric automatically |
| Edition | Java / Bedrock | Required — generators differ |
| Version | 1.18 – latest | Structures moved in 1.18+ |
| Radius | 128 – 8192 blocks | Larger = slower render |

## Common questions

**Why don't I see a structure I expected?** Structures generate only in compatible biomes. Check the biome overlay first, then the structure's minimum distance (most generate 200+ blocks apart).

**Do Bedrock seeds match Java?** No — Bedrock uses a different generator since 1.18. Always select the correct edition.
