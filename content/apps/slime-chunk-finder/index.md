---
title: "Slime Chunk Finder"
description: "Interactive slime chunk map for any seed — Java & Bedrock 1.18+, with a 1/10 chunk probability breakdown and farm placement tips."
type: tool
editions: ["Java", "Bedrock"]
version: "1.21.5"
versions: ["Java", "Bedrock"]
featured: true
accent: 1
js: ["core-urlstate", "core-worker", "core-renderer", "slime-chunk-finder"]
tags: ["Slime", "Chunks", "Farms"]
relatedGuides: ["/guides/playerless-sugarcane-farm/"]
---
Slime chunks are hard-coded into every world — roughly **1 in 10 chunks** spawn slimes below Y = 40. The interactive map below shows every slime chunk for your seed, so you can place your slime farm without trial and error.

<div class="tool-ui" id="slimeUi">
  <div class="row">
    <div>
      <label for="scSeed">World seed</label>
      <input id="scSeed" type="text" inputmode="text" placeholder="12345 or any text seed" autocomplete="off">
    </div>
    <div>
      <label>&nbsp;</label>
      <button class="run" type="button" id="scRun">Find slime chunks</button>
    </div>
  </div>
  <div class="map-wrap">
    <canvas id="slimeMap" aria-label="Slime chunk map"></canvas>
  </div>
  <div class="tool-stats" id="scStatus">Computing chunks…</div>
  <div class="tool-stats dim" id="scStats"></div>
  <div class="legend">
    <span class="lg lg-green"></span> Slime chunk
    <span class="lg lg-spawn"></span> Spawn area
    <span class="lg lg-plain"></span> Not a slime chunk
  </div>
  <div class="tool-hint" id="scHint" style="display:none">
    Bedrock note: since 1.18, Bedrock and Java generate the same terrain for the same seed — the slime pattern below is identical. Older Bedrock worlds (&lt; 1.18) used a different generator and are not covered here.
  </div>
</div>

## How to use

1. Enter your **seed** (a number like `12345`, or any text seed — text seeds hash the same way in Java and Bedrock).
2. Press **Find slime chunks**. Green squares are slime chunks; the red square marks the spawn area (chunk 0,0).
3. **Drag** to pan, **scroll / pinch** to zoom. The link in your address bar updates with the current seed and view — share it to show a friend.
4. Pick a green chunk inside your loaded area and build a farm at **Y = 30 or lower** (slimes spawn below Y = 40 in slime chunks).

## Slime spawn rules (Java)

- Slimes spawn below **Y = 40** in slime chunks (any light level).
- Swamp biomes spawn slimes at night above Y = 50 too, but slower than a chunk farm.
- Chunk probability: **10%** per chunk — a 3×3 chunk area has ~27% chance to contain at least one.
- The pattern is identical for Java and Bedrock **since 1.18**; older Bedrock worlds differ.

## How the map works

Chunk locations are deterministic: each chunk's seed is `worldSeed + chunkX × 341873128712 + chunkZ × 132897987541`, and a chunk is a slime chunk when the first `nextInt(10)` draw equals 0. The computation runs in a **Web Worker**, so panning and zooming stay smooth while chunks are calculated in the background.

## Common questions

**Can I change slime chunks?** No — they are fixed by seed. Build around them.

**Why does my farm produce nothing?** The farm must be in a *loaded* chunk (within simulation distance of a player). AFK above the farm at Y = 60–100 so nothing else spawns nearby.
