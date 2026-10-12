---
title: "Crop Yield Calculator"
description: "Estimate output per harvest cycle and per hour for wheat, carrot, potato and beetroot fields — accounting for watered vs dry farmland."
type: tool
editions: ["Java", "Bedrock"]
version: "1.21.5"
featured: true
accent: 2
js: "crop-yield-calculator"
tags: ["Farms", "Crops", "per hour"]
relatedGuides: ["/guides/farms/playerless-sugarcane-farm/", "/guides/farms/villager-breeding-farm/"]
---
<div class="tool-ui">
  <div class="row">
    <div>
      <label for="cyCrop">Crop</label>
      <select id="cyCrop">
        <option value="wheat">Wheat</option>
        <option value="carrot">Carrot</option>
        <option value="potato">Potato</option>
        <option value="beetroot">Beetroot</option>
      </select>
    </div>
    <div><label for="cyW">Field width</label><input id="cyW" type="number" min="1" max="64" value="9"></div>
    <div><label for="cyL">Field length</label><input id="cyL" type="number" min="1" max="64" value="9"></div>
    <div>
      <label for="cyWater">Watered?</label>
      <select id="cyWater"><option value="yes" selected>Yes (hydrated)</option><option value="no">No (dry)</option></select>
    </div>
  </div>
  <button class="run" type="button" data-run="js">Calculate yield</button>
  <div class="tool-result" id="cyResult"></div>
</div>

## How to use

1. Pick the **crop** and enter your **field size** (width × length).
2. Choose whether the farmland is **watered** — hydrated farmland grows ~50% faster than dry.
3. Press **Calculate** for the output per harvest cycle and per hour.

Crops mature in about **8–12 minutes** in hydrated farmland with proper light; each mature plant drops the crop plus seeds (wheat/beetroot). Rates are estimates and vary with light and adjacent-crop bonuses.

## Parameters used

| Crop | Drops per plant | Notes |
|---|---|---|
| Wheat | 1 (+ seeds) | Seeds multiply |
| Carrot | 1–4 | Fortune doesn't affect crops |
| Potato | 1–4 | Rare baked-potato drop |
| Beetroot | 1 (+ seeds) | Seeds multiply |

**Tip:** bone meal speeds growth instantly — combine this with a villager farmer for a fully automatic field.

## Common questions

**Why does my field produce less?** Lack of light (needs 9+ at night), un-hydrated farmland, or slow chunks. Keep a water block within 4 blocks of every crop for hydration.
