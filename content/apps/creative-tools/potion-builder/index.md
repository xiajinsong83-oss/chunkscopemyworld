---
title: "Potion Builder"
description: "Plan any potion recipe: base, modifiers, effects and durations — with brewing order and ingredients."
type: tool
editions: ["Java", "Bedrock"]
version: "1.21.5"
featured: true
accent: 3
js: "potion-builder"
tags: ["Potions", "Brewing", "Effects"]
relatedGuides: []
---
![Brewing room](/img/potion-brewing.jpg)

From awkward potion to max-level splash potion — pick the effect you want and get the full ingredient chain, including which modifiers extend or strengthen it.

<div class="tool-ui">
  <div class="row">
    <div>
      <label for="pbEffect">Desired effect</label>
      <select id="pbEffect">
        <option value="speed">Speed</option><option value="strength">Strength</option>
        <option value="regeneration">Regeneration</option><option value="fire-resistance">Fire Resistance</option>
        <option value="invisibility">Invisibility</option><option value="poison">Poison</option>
        <option value="weakness">Weakness</option><option value="slow-falling">Slow Falling</option>
      </select>
    </div>
    <div>
      <label for="pbLevel">Level</label>
      <select id="pbLevel">
        <option value="1">I (base)</option><option value="2">II (glowstone)</option>
      </select>
    </div>
    <div>
      <label for="pbDuration">Duration</label>
      <select id="pbDuration">
        <option value="base">Base (3:00)</option><option value="extended">Extended (redstone, 8:00)</option>
      </select>
    </div>
  </div>
  <button class="run" type="button" data-run="js">Show recipe</button>
  <div class="tool-result" id="pbResult"></div>
</div>

## Brewing chain basics

1. **Awkward potion**: water bottle + nether wart (base for all effect potions).
2. **Effect ingredient**: add the effect ingredient (sugar, blaze powder, etc.).
3. **Modifiers** (in any order after the effect): redstone extends, glowstone strengthens, gunpowder makes it splash, dragon's breath makes lingering.

## Common questions

**Why is my potion "mundane"?** You skipped the awkward potion step — all effect potions need nether wart first.

**Can I extend a Level II potion?** No — glowstone and redstone don't stack. Level II can't be extended; extended potions stay Level I.
