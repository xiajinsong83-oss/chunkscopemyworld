---
title: "Beacon Range Calculator"
description: "See the effect range and duration for beacon pyramid levels 1–4, and how many blocks you need for each tier."
type: tool
editions: ["Java", "Bedrock"]
version: "1.21.5"
featured: true
accent: 3
js: "beacon-range-calculator"
tags: ["Beacon", "Range", "Survival"]
relatedGuides: []
---
<div class="tool-ui">
  <div class="row">
    <div>
      <label for="bcLevel">Pyramid level</label>
      <select id="bcLevel">
        <option value="1">Level 1 (9 blocks)</option>
        <option value="2">Level 2 (34 blocks)</option>
        <option value="3">Level 3 (83 blocks)</option>
        <option value="4" selected>Level 4 (164 blocks)</option>
      </select>
    </div>
  </div>
  <button class="run" type="button" data-run="js">Calculate range</button>
  <div class="tool-result" id="bcResult"></div>
</div>

## How to use

Pick the pyramid level to see the effect's **radius** and **duration**. The beacon must be built from iron/gold/diamond/emerald blocks (or netherite), and the pyramid must have a beacon at the top with the sky clear above it.

## Pyramid requirements

| Level | Blocks | Shape |
|---|---|---|
| 1 | 9 | 3×3 base |
| 2 | 34 | 5×5 base, 3×3 on top |
| 3 | 83 | 7×7 + 5×5 + 3×3 |
| 4 | 164 | 9×9 + 7×7 + 5×5 + 3×3 |

Effect radius: **level × 10 blocks** (20 / 30 / 40 / 50). Effect duration scales with level — roughly 9s, 17s, 26s, 34s at full strength.

## Common questions

**Which blocks count?** Iron, gold, diamond, emerald and netherite blocks — all equivalent, and you can mix them.

**Can I move it?** The pyramid must stay intact and the beacon's top must be exposed to the sky; transparent blocks above the beam don't count as blocking.
