---
title: "Map Art Calculator"
description: "Work out how many maps a map-art build needs — enter your target size in blocks and pick a zoom level to get the map count and per-map coverage."
type: tool
editions: ["Java & Bedrock"]
version: "1.21.5"
featured: true
accent: 5
js: "map-art-calculator"
tags: ["Map art", "Maps", "Calculators", "Creative"]
relatedTools: ["/apps/creative-tools/"]
---
<div class="tool-ui">
  <div class="row">
    <div><label for="maW">Width (blocks)</label><input id="maW" type="number" min="1" max="4096" value="128"></div>
    <div><label for="maH">Height (blocks)</label><input id="maH" type="number" min="1" max="4096" value="128"></div>
    <div>
      <label for="maZoom">Map zoom</label>
      <select id="maZoom">
        <option value="0" selected>0 (1:1, 128 blocks/map)</option>
        <option value="1">1 (256 blocks/map)</option>
        <option value="2">2 (512 blocks/map)</option>
        <option value="3">3 (1024 blocks/map)</option>
        <option value="4">4 (2048 blocks/map)</option>
      </select>
    </div>
  </div>
  <button class="run" type="button" data-run="js">Calculate maps</button>
  <div class="tool-result" id="maResult"></div>
</div>

## How to use

Enter your **map-art size** in blocks and the **zoom level**, then Calculate. The tool tells you how many maps you need and what each one covers.

## Zoom vs coverage

| Zoom | Blocks per map | Best for |
|---|---|---|
| 0 | 128 | Detail (one map = 128×128 pixels) |
| 1 | 256 | Mid-size builds |
| 2 | 512 | Large pixel art |
| 3–4 | 1024–2048 | Big maps, low detail |

**Map count** = ⌈width ÷ blocks-per-map⌉ × ⌈height ÷ blocks-per-map⌉.

## Common questions

**How do I make a pixel-perfect map?** Build on a flat 128×128 platform at zoom 0, fill each block as a pixel, then map it.

**Why do maps overlap?** Maps anchor to 128-block-aligned grids — align your build to the map boundary to avoid splits.
