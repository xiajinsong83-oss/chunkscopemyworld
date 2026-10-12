---
title: "Redstone Clock Calculator"
description: "Compute the period of a repeater-based redstone clock — how many delay settings make a 1-second, 2-second or arbitrary cycle."
type: tool
editions: ["Java & Bedrock"]
version: "1.21.5"
featured: true
accent: 3
js: "redstone-clock-calculator"
tags: ["Redstone", "Clock", "Timing", "Calculators"]
relatedGuides: ["/guides/redstone/observer-piston-guide/"]
---
<div class="tool-ui">
  <div class="row">
    <div><label for="rcSegs">Repeater chain segments</label><input id="rcSegs" type="number" min="1" max="200" value="5"></div>
    <div>
      <label for="rcDelay">Per-repeater delay</label>
      <select id="rcDelay">
        <option value="1">1 tick</option>
        <option value="2" selected>2 ticks</option>
        <option value="3">3 ticks</option>
        <option value="4">4 ticks</option>
      </select>
    </div>
  </div>
  <button class="run" type="button" data-run="js">Calculate clock</button>
  <div class="tool-result" id="rcResult"></div>
</div>

## How to use

Enter the number of **repeater chain segments** and each repeater's **delay**, then Calculate. A repeater loop (with a comparator or observer feedback) produces a clock whose period is **2× the total delay**.

## The formula

Period (redstone ticks) = **2 × segments × delay**. Each redstone tick = 0.1s.

| Example | Period |
|---|---|
| 5 segments @ 2 ticks | 2×5×2 = 20 rt = **2.0s** |
| 10 segments @ 1 tick | 2×10×1 = 20 rt = **2.0s** |
| 1 segment @ 4 ticks | 2×1×4 = 8 rt = **0.8s** |

## Common questions

**Why ×2?** The clock toggles high then low, so a full cycle is twice the one-way delay.

**Do I need a comparator?** A comparator looping into the repeaters sustains the pulse; without feedback the signal dies.
