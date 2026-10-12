---
title: "Armor Trim Designer"
description: "Generate a /give command with the 1.20 armor-trim component — pick armor, trim material and pattern for fully decorated gear."
type: tool
editions: ["Java"]
version: "1.21.5"
featured: true
accent: 5
js: "armor-trim-designer"
tags: ["Commands", "Armor", "Trim", "Creative"]
relatedTools: ["/apps/command-tools/give-command-generator/"]
---
<div class="tool-ui">
  <div class="row">
    <div>
      <label for="atArmor">Armor</label>
      <select id="atArmor">
        <option value="minecraft:iron_helmet">Iron helmet</option>
        <option value="minecraft:iron_chestplate">Iron chestplate</option>
        <option value="minecraft:iron_leggings">Iron leggings</option>
        <option value="minecraft:iron_boots">Iron boots</option>
        <option value="minecraft:diamond_chestplate">Diamond chestplate</option>
        <option value="minecraft:netherite_chestplate">Netherite chestplate</option>
        <option value="minecraft:golden_helmet">Golden helmet</option>
      </select>
    </div>
    <div>
      <label for="atMat">Trim material</label>
      <select id="atMat">
        <option value="amethyst">Amethyst</option>
        <option value="copper">Copper</option>
        <option value="iron">Iron</option>
        <option value="gold">Gold</option>
        <option value="diamond">Diamond</option>
        <option value="emerald">Emerald</option>
        <option value="redstone">Redstone</option>
        <option value="lapis">Lapis</option>
        <option value="quartz">Quartz</option>
        <option value="netherite">Netherite</option>
      </select>
    </div>
    <div>
      <label for="atPat">Pattern</label>
      <select id="atPat">
        <option value="sentry">Sentry</option>
        <option value="vex">Vex</option>
        <option value="wild">Wild</option>
        <option value="coast">Coast</option>
        <option value="dune">Dune</option>
        <option value="eye">Eye</option>
        <option value="rib">Rib</option>
        <option value="snout">Snout</option>
        <option value="tide">Tide</option>
        <option value="ward">Ward</option>
        <option value="spire">Spire</option>
        <option value="wayfinder">Wayfinder</option>
      </select>
    </div>
  </div>
  <button class="run" type="button" data-run="js">Generate trimmed gear</button>
  <div class="tool-result" id="atResult"></div>
</div>

## How to use

Pick the **armor piece**, **trim material** (color) and **pattern**, then Generate. The tool builds a `/give` command using the 1.20+ armor-trim component.

## Command format

```
/give @p <armor>[trim={material:"minecraft:<mat>",pattern:"minecraft:<pat>"}] 1
```

## Trim facts

- Materials set the trim color: amethyst (purple), copper (orange), emerald (green), etc.
- Patterns come from smithing templates found in structures (pillager outposts, trial chambers, etc.).
- Trims are purely cosmetic and work on leather, chain, iron, gold, diamond and netherite armor.

## Common questions

**Does trim change stats?** No — cosmetic only.

**Why doesn't the command work on Bedrock?** The trim component is Java-only; Bedrock uses a different smithing workflow.
