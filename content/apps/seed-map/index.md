---
title: "Seed Map"
description: "Interactive world map — structures, slime chunks and spawn chunks for any seed. Java & Bedrock 1.18+, with clickable structure markers and shareable links."
type: tool
editions: ["Java", "Bedrock"]
version: "1.21.5"
versions: ["Java", "Bedrock"]
featured: true
accent: 1
js: ["core-urlstate", "core-worker", "core-renderer", "core-java-random", "core-structures", "seed-map"]
tags: ["World", "Biomes", "Structures"]
relatedGuides: ["/guides/find-ancient-cities/", "/guides/playerless-sugarcane-farm/"]
---
The Seed Map is ChunkScope's flagship tool. Enter any seed to see **every structure attempt, slime chunk and spawn chunk** on one interactive map — villages, ancient cities, trial chambers, monuments, mansions and more, all at once.

<div class="tool-ui" id="seedMapUi">
  <div class="row">
    <div>
      <label for="smSeed">World seed</label>
      <input id="smSeed" type="text" inputmode="text" placeholder="12345 or any text seed" autocomplete="off">
    </div>
    <div>
      <label>&nbsp;</label>
      <button class="run" type="button" id="smRun">Show map</button>
    </div>
  </div>
  <div class="layer-bar">
    <label class="chip"><input type="checkbox" data-layer="structures"> Structures</label>
    <label class="chip"><input type="checkbox" data-layer="slime"> Slime chunks</label>
    <label class="chip"><input type="checkbox" data-layer="spawn"> Spawn chunks</label>
    <label class="chip"><input type="checkbox" data-layer="grid"> Grid</label>
  </div>
  <div class="share-bar"><button class="run small" type="button" id="smShare">Copy share link</button></div>
  <div class="map-wrap">
    <canvas id="seedMap" aria-label="Seed map"></canvas>
    <div class="sm-detail" id="smDetail" role="dialog" aria-label="Structure details">
      <button class="sm-close" id="smDetailClose" aria-label="Close">×</button>
      <div class="sm-name"></div>
      <div class="sm-coords"></div>
      <div class="sm-dist"></div>
      <button class="run small" type="button" id="smCopy">Copy coordinates</button>
    </div>
  </div>
  <div class="tool-stats" id="smStatus">Computing…</div>
  <div class="tool-stats dim" id="smStats"></div>
  <div class="legend">
    <span class="lg lg-green"></span> Slime chunk
    <span class="lg lg-spawn"></span> World spawn (chunk 0,0)
    <span class="lg lg-struct"></span> Structure attempt
  </div>
  <div class="tool-hint" id="smHint" style="display:none">
    Bedrock note: since 1.18, Bedrock and Java use the same world generation for the same seed — structure and slime positions below are identical. Older Bedrock worlds (&lt; 1.18) are not covered.
  </div>
</div>

## How to use

1. Enter your **seed** (number or text), then press **Show map**.
2. The map shows **structure attempts** (where each structure's generation roll happens), **slime chunks** (green) and the **world spawn area** (red, 3×3 spawn chunks around chunk 0,0).
3. **Click a structure marker** for its chunk / block coordinates and distance from spawn — handy for `/tp` or seed planning.
4. **Drag** to pan, **scroll / pinch** to zoom. Toggle layers with the checkboxes. The URL updates as you move — share the link to show the exact same view.

## Parameters

| Parameter | Options | Notes |
|---|---|---|
| Seed | Any number or text | Text seeds hash the same way in Java & Bedrock |
| Edition | Java / Bedrock 1.18+ | Identical generation since 1.18 |
| Layers | Structures / Slime / Spawn / Grid | Toggle on the fly |

## Structure rules (1.18+)

Each structure type divides the world into a grid of regions and makes **one generation attempt per region** at a pseudo-random offset — for example villages attempt once per 32×32-chunk region, ancient cities once per 24×24, trial chambers once per 34×34. The attempt position depends only on the seed, the region and the structure's salt, so it is **deterministic**: the same seed always produces the same pattern, matching community tools.

## Common questions

**Why is a structure missing?** The map shows *attempt* positions. Structures only actually generate when their biome requirements are met (e.g. villages need plains / desert / savanna / taiga). A biome overlay is on the roadmap.

**Do Bedrock seeds match Java?** Since 1.18, yes — the same numeric seed produces the same terrain, structures and slime chunks in both editions.
