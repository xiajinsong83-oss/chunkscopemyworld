---
title: "Comparator Signal Calculator"
description: "Work out a redstone comparator's output — compare or subtract the rear and side signal strengths, and see the result."
type: tool
editions: ["Java & Bedrock"]
version: "1.21.5"
featured: true
accent: 3
js: "comparator-calculator"
tags: ["Redstone", "Comparator", "Signal", "Calculators"]
relatedGuides: ["/guides/redstone/observer-piston-guide/"]
---
<div class="tool-ui">
  <div class="row">
    <div><label for="ccRear">Rear signal (0–15)</label><input id="ccRear" type="number" min="0" max="15" value="8"></div>
    <div><label for="ccSide">Side signal (0–15)</label><input id="ccSide" type="number" min="0" max="15" value="5"></div>
    <div>
      <label for="ccMode">Mode</label>
      <select id="ccMode">
        <option value="compare" selected>Compare</option>
        <option value="subtract">Subtract</option>
      </select>
    </div>
  </div>
  <button class="run" type="button" data-run="js">Calculate output</button>
  <div class="tool-result" id="ccResult"></div>
</div>

## How to use

Set the **rear** (back) and **side** signal strengths (0–15), pick the **mode**, then Calculate.

## How it works

- **Compare mode**: output = rear, **if** rear ≥ side; otherwise **0**.
- **Subtract mode**: output = **max(0, rear − side)**.

## Common questions

**What does a comparator read from containers?** It outputs a signal proportional to how full the container is (0–15).

**Why is subtract useful?** It's the basis of item sorters and analog signal arithmetic — e.g. filtering a specific amount.
