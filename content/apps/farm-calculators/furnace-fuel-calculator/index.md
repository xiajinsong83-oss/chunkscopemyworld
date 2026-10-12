---
title: "Furnace Fuel Calculator"
description: "How long does coal, lava or a log burn — and how many items it smelts. Exact fuel burn times for Java & Bedrock."
type: tool
editions: ["Java & Bedrock"]
version: "1.21.5"
featured: true
accent: 2
js: "furnace-fuel-calculator"
tags: ["Furnace", "Fuel", "Smelting", "Calculators"]
relatedTools: []
---
<div class="tool-ui">
  <div class="row">
    <div>
      <label for="ffFuel">Fuel</label>
      <select id="ffFuel">
        <option value="coal">Coal / Charcoal (8 items)</option>
        <option value="coal_block">Coal block (80 items)</option>
        <option value="lava">Lava bucket (100 items)</option>
        <option value="dried_kelp">Dried kelp block (20 items)</option>
        <option value="log">Oak/spruce log (1.5 items)</option>
        <option value="plank">Plank (1.5 items)</option>
        <option value="stick">Stick (0.5 items)</option>
      </select>
    </div>
    <div><label for="ffCount">Fuel count</label><input id="ffCount" type="number" min="1" max="64" value="1"></div>
  </div>
  <button class="run" type="button" data-run="js">Calculate burn</button>
  <div class="tool-result" id="ffResult"></div>
</div>

## How to use

Pick a **fuel** and how many you have, then Calculate. The tool shows total burn time and how many items it smelts (each item takes 10 seconds).

## Fuel burn times (exact)

| Fuel | Burn time | Items smelted |
|---|---|---|
| Coal / Charcoal | 80s | 8 |
| Coal block | 800s | 80 |
| Lava bucket | 1,000s | 100 |
| Dried kelp block | 200s | 20 |
| Log / Plank | 15s | 1.5 |
| Stick | 5s | 0.5 |

## Common questions

**What's the best early fuel?** Coal is the best single-slot value; lava buckets and dried kelp blocks are the best for big smelts.

**Does a furnace stop wasting fuel?** No — a furnace keeps burning through its fuel even with nothing to smelt, so load it fully before leaving.
