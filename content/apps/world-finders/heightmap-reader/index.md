---
title: "Heightmap Reader"
description: "Preview the approximate terrain height field around any seed's world spawn — see valleys, hills and water, click any spot for an approx Y and biome."
type: tool
editions: ["Java", "Bedrock"]
version: "1.21.5"
featured: true
accent: 7
js: ["core-java-random", "core-biome-noise", "heightmap-reader"]
tags: ["Heightmap", "Terrain", "World generation", "Spawn"]
relatedTools: ["/apps/world-finders/biome-climate-matcher/", "/apps/world-finders/spawn-chunk-finder/", "/apps/seed-map/"]
---
<div class="tool-ui">
  <div class="row">
    <div><label for="hmSeed">World seed</label><input id="hmSeed" type="text" inputmode="text" placeholder="12345 or any text seed" value="12345"></div>
  </div>
  <button class="run" type="button" data-run="js">Render heightmap</button>
  <div class="tool-result" id="hmResult">
    <div id="hmCanvasWrap"></div>
    <p id="hmInfo" class="fine">Enter a seed and press Render to preview the terrain height around the world spawn.</p>
  </div>
</div>

## How to read it

The map shows a **relative height field** centered on the world **spawn chunk (0,0)** (marked in red). Dark blues are low/water, greens are plains, browns are hills, near-white is high/snowy. **Click any pixel** to see its approximate Y and a suggested biome.

## What it's for

- **Pick a build site**: spot a flat green plateau for a base, or a valley for a hidden home.
- **Check the spawn**: see whether your world spawn drops you into water, a plain or a mountain before you commit.
- **Plan farms**: low/flat areas are easier to terrace for farms and grinders.

## Important

This is an **experimental approximation** of Minecraft terrain using a deterministic noise model — it is **not** Mojang's exact generator. Heights and biome labels are suggestive. **Always verify in-game** before relying on a spot.

## Facts that do hold

- World spawn is always inside **chunk (0,0)**, roughly block **(8, 64, 8)** — the exact Y depends on real terrain.
- The 3×3 **spawn chunks** around it stay loaded (see Spawn Chunk Finder).

## Common questions

**Can you give me the exact Y for diamond veins?** No — this tool only shows *relative* terrain height, not ore distribution. Use the **Ore Finder** for ore Y-levels and the **Seed Map** for exact structures.
