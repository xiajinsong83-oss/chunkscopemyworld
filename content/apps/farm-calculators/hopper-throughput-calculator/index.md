---
title: "Hopper Throughput Calculator"
description: "How fast do hoppers move items and how long to fill a chest — exact transfer rates for storage and sorting lines."
type: tool
editions: ["Java & Bedrock"]
version: "1.21.5"
featured: true
accent: 3
js: "hopper-throughput-calculator"
tags: ["Hopper", "Items", "Throughput", "Calculators"]
relatedGuides: ["/guides/redstone/item-sorter-build/"]
---
<div class="tool-ui">
  <div class="row">
    <div><label for="htItems">Items to move</label><input id="htItems" type="number" min="1" max="100000" value="64"></div>
    <div><label for="htHoppers">Hoppers</label><input id="htHoppers" type="number" min="1" max="16" value="1"></div>
  </div>
  <button class="run" type="button" data-run="js">Calculate time</button>
  <div class="tool-result" id="htResult"></div>
</div>

## How to use

Enter the **item count** and how many **hoppers** move it, then Calculate. The tool shows transfer time and rate.

## The rates (exact)

- A hopper transfers **1 item every 8 game ticks (0.4s)** when it has a target.
- So a single hopper moves **150 items/minute** (2.5/s).
- Multiple hoppers in a line can parallelize, but a single hopper into a chest is the classic limit.

## Common questions

**How long to fill a 27-slot chest (27×64)?** One hopper: 1728 items ≈ 11.5 minutes; parallel hoppers cut that.

**Do hoppers ever jam?** Yes — if the target is full or the hopper has no room, items sit until space opens.
