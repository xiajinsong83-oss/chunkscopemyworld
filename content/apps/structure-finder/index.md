---
title: "Structure Finder"
description: "Find the nearest village, ancient city, trial chambers, ocean monument, mansion and more for any seed — with exact block coordinates, distance, direction and an interactive map."
type: tool
editions: ["Java", "Bedrock"]
version: "1.21.5"
versions: ["Java", "Bedrock"]
featured: true
accent: 1
js: ["core-urlstate", "core-renderer", "core-java-random", "core-structures", "structure-finder"]
tags: ["Structures", "Village", "Ancient City"]
relatedGuides: ["/guides/find-ancient-cities/"]
---
Enter your **seed** and current **coordinates**, pick a structure type, and ChunkScope finds the **nearest structures** with exact block coordinates, distance and compass direction — plotted on an interactive map you can share.

<div class="tool-ui" id="sfUi">
  <div class="row">
    <div><label for="sfSeed">World seed</label><input id="sfSeed" type="text" inputmode="text" placeholder="12345" autocomplete="off"></div>
    <div><label for="sfX">Your X</label><input id="sfX" type="number" inputmode="numeric" placeholder="0" autocomplete="off"></div>
    <div><label for="sfZ">Your Z</label><input id="sfZ" type="number" inputmode="numeric" placeholder="0" autocomplete="off"></div>
    <div><label for="sfType">Structure</label><select id="sfType"></select></div>
    <div><label>&nbsp;</label><button class="run" type="button" id="sfRun">Find</button></div>
  </div>
  <div class="tool-stats" id="sfStatus">Computing…</div>
  <div class="map-wrap">
    <canvas id="sfMap" aria-label="Nearest structures map"></canvas>
  </div>
  <div class="tool-stats" id="sfSelected"></div>
  <div class="sf-results" id="sfResults"></div>
  <div class="legend">
    <span class="lg lg-plain"></span> Structure attempt
    <span class="lg lg-spawn"></span> You (red marker)
  </div>
  <div class="tool-hint" id="sfHint" style="display:none">
    Bedrock note: since 1.18, Bedrock and Java use identical world generation for the same seed, so structure positions match exactly.
  </div>
</div>

## How to use

1. Enter your **seed** and your in-game **X / Z** coordinates (use F3 on Java, or the coordinates shown when you press your coordinates key on Bedrock).
2. Pick a **structure type** (village, ancient city, trial chambers, ocean monument, woodland mansion, desert pyramid, pillager outpost, ruined portal, shipwreck, ocean ruin, igloo, swamp hut or jungle pyramid).
3. Press **Find** — the nearest structures are listed with block coordinates, distance and compass direction, and marked on the map.
4. **Click a marker** or a list row to center on that structure. Copy any coordinates with the button.

## Structure rules (1.18+)

Each structure type uses a grid of regions and one generation attempt per region — for example villages attempt once per 32×32-chunk region, ancient cities once per 24×24, trial chambers once per 34×34, mansions once per 80×80. The attempt position depends only on the seed, the region and the structure's salt, so results are **deterministic and identical for the same seed in Java & Bedrock**.

## Common questions

**Why don't I find a structure at the marked point?** The map shows *attempt* positions. Structures only actually generate where biome and terrain requirements are met (e.g. villages need plains / desert / savanna / taiga; monuments need deep ocean). Treat the marker as the most likely spawn spot to dig or sail toward.

**How does the distance work?** Distance is measured block-to-block from your coordinates to the structure's attempt block (chunk × 16 + 8). For mansions the huge 80×80 spacing means they're rare — the finder scans widely enough to always catch the nearest one.
