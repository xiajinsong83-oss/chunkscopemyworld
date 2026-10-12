---
title: "Item Sorter Calculator"
description: "Size out an item-sorter wall — how many filter hoppers you need for your item types and how the design scales."
type: tool
editions: ["Java & Bedrock"]
version: "1.21.5"
featured: true
accent: 3
js: "item-sorter-calculator"
tags: ["Redstone", "Item sorter", "Storage", "Calculators"]
relatedGuides: ["/guides/redstone/item-sorter-build/"]
---
<div class="tool-ui">
  <div class="row">
    <div><label for="isTypes">Item types to sort</label><input id="isTypes" type="number" min="1" max="200" value="20"></div>
    <div><label for="isStack">Stack size</label><select id="isStack"><option value="64" selected>64 (tools/blocks)</option><option value="16">16 (blocks/items)</option><option value="1">1 (unique)</option></select></div>
  </div>
  <button class="run" type="button" data-run="js">Size sorter</button>
  <div class="tool-result" id="isResult"></div>
</div>

## How to use

Enter how many **item types** you want to sort and their **stack size**, then Calculate. The tool shows the sorter wall size and layout.

## The math

- Each item type needs **1 filter hopper** + 1 storage chest per full stack.
- A sorter wall is 1 block wide per type, ~2 tall (hopper + chest + comparator + torch row).

## Common questions

**What's a filter hopper?** A hopper locked by redstone that only lets one item type pass — the core of every sorter.

**Can I sort non-stackables?** Yes, but they need a dedicated slot each; most sorters reserve a row for them.
