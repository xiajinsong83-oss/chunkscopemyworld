---
title: "Fortune Ore Calculator"
description: "Estimate average ore output per block with Fortune I–III — the expected extra drops for diamond, coal, iron and more."
type: tool
editions: ["Java & Bedrock"]
version: "1.21.5"
featured: true
accent: 2
js: "fortune-ore-calculator"
tags: ["Ores", "Fortune", "Enchanting", "Calculators"]
relatedGuides: ["/guides/mining/best-y-levels-guide/"]
---
<div class="tool-ui">
  <div class="row">
    <div>
      <label for="foOre">Ore</label>
      <select id="foOre">
        <option value="diamond">Diamond ore (1 each)</option>
        <option value="coal">Coal ore (1 each)</option>
        <option value="emerald">Emerald ore (1 each)</option>
        <option value="iron">Iron ore (1 each)</option>
        <option value="redstone">Redstone (4–5 each)</option>
        <option value="lapis">Lapis lazuli (4–9 each)</option>
        <option value="gold">Nether gold (2–6 each)</option>
      </select>
    </div>
    <div>
      <label for="foFortune">Fortune level</label>
      <select id="foFortune">
        <option value="0">None</option>
        <option value="1">I</option>
        <option value="2">II</option>
        <option value="3" selected>III</option>
      </select>
    </div>
  </div>
  <button class="run" type="button" data-run="js">Estimate output</button>
  <div class="tool-result" id="foResult"></div>
</div>

## How to use

Pick an **ore** and your **Fortune** level, then Estimate. The tool shows the average drops per block.

## Fortune averages

| Level | Avg multiplier |
|---|---|
| None | 1.0× |
| I | ~1.33× |
| II | ~1.75× |
| III | ~2.2× |

Fortune III roughly **doubles** ore output — the single best enchant for mining.

## Common questions

**Does Fortune work on iron?** Yes, on diamond/coal/emerald/iron/nether-gold; it has no effect on copper, redstone's count is boosted, and it doesn't work on unbreakables.

**Is this exact per block?** It's the statistical average — individual blocks vary, but over a vein it holds up.
