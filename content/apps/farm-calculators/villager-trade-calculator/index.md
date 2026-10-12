---
title: "Villager Trade Calculator"
description: "Work out how many trades you can do with your emeralds and when a villager restocks — prices and refresh cycles."
type: tool
editions: ["Java & Bedrock"]
version: "1.21.5"
featured: true
accent: 2
js: "villager-trade-calculator"
tags: ["Villagers", "Trading", "Emeralds", "Calculators"]
relatedGuides: ["/guides/farms/villager-breeding-farm/"]
---
<div class="tool-ui">
  <div class="row">
    <div><label for="vtEmeralds">Emeralds</label><input id="vtEmeralds" type="number" min="0" max="9999" value="64"></div>
    <div><label for="vtPrice">Price (emeralds each)</label><input id="vtPrice" type="number" min="1" max="64" value="1"></div>
    <div><label for="vtStock">Stock per trade</label><input id="vtStock" type="number" min="1" max="12" value="1"></div>
  </div>
  <button class="run" type="button" data-run="js">Calculate trades</button>
  <div class="tool-result" id="vtResult"></div>
</div>

## How to use

Enter your **emeralds**, the **price per item** and how many the villager stocks per trade, then Calculate. The tool shows total trades and how many times the villager restocks.

## How trading works

- Each villager has a limited **stock** per trade that refills after **restocking** (twice a day, or after they work a workstation).
- Prices change based on demand and your **Hero of the Village** status.

## Common questions

**How do I get better prices?** Curing a zombie villager gives a huge permanent discount; Hero of the Village adds temporary discounts.

**When does restocking happen?** Villagers restock up to twice per day after using their workstation (job block).
