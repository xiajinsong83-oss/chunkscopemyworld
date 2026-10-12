---
title: "TNT Yield Calculator"
description: "Estimate the blast radius and block damage of a single TNT charge, and how a chain scales — for quarrying, cannons and demolition."
type: tool
editions: ["Java", "Bedrock"]
version: "1.21.5"
featured: true
accent: 3
js: "tnt-yield-calculator"
tags: ["TNT", "Explosions", "Redstone"]
relatedGuides: ["/guides/redstone/tnt-cannon-guide/"]
---
<div class="tool-ui">
  <div class="row">
    <div>
      <label for="tyMode">Scenario</label>
      <select id="tyMode">
        <option value="single">Single TNT</option>
        <option value="chain">TNT chain (linked)</option>
      </select>
    </div>
    <div><label for="tyCount">TNT count</label><input id="tyCount" type="number" min="1" max="100" value="1"></div>
    <div>
      <label for="tyBlock">Material</label>
      <select id="tyBlock">
        <option value="dirt" selected>Dirt / grass (weak)</option>
        <option value="stone">Stone / cobble</option>
        <option value="obsidian">Obsidian (blast-proof)</option>
      </select>
    </div>
  </div>
  <button class="run" type="button" data-run="js">Calculate blast</button>
  <div class="tool-result" id="tyResult"></div>
</div>

## How to use

Choose a **single TNT** or a **chain**, the count, and the material it's blasting. A TNT charge has blast strength **4**, enough to destroy most weak blocks within a ~5–7 block radius; obsidian and bedrock are immune.

## The numbers

| Material | Single-TNT radius | Notes |
|---|---|---|
| Dirt / grass | ~5–7 blocks | Easiest to clear |
| Stone / cobble | ~4–5 blocks | Half as effective |
| Obsidian | Immune | Blast-resistant |

Chaining TNT roughly scales the affected volume but each charge's radius overlaps, so it's not a simple multiplier.

## Common questions

**Why did my quarry leave a smaller hole than expected?** Blast radius depends on block blast-resistance and distance from the charge — underwater TNT is also dampened.

**Can TNT break bedrock?** No — obsidian and bedrock are effectively blast-immune.
