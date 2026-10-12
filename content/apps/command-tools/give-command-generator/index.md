---
title: "Give Command Generator"
description: "Build a copy-paste /give command — pick item, count and enchantments, and get valid 1.21 command syntax with components."
type: tool
editions: ["Java", "Bedrock"]
version: "1.21.5"
featured: true
accent: 4
js: "give-command-generator"
tags: ["Commands", "Give", "Creative", "Data"]
relatedTools: ["/apps/command-tools/enchant-command-generator/"]
---
<div class="tool-ui">
  <div class="row">
    <div>
      <label for="gcItem">Item</label>
      <select id="gcItem">
        <option value="minecraft:diamond_pickaxe">Diamond pickaxe</option>
        <option value="minecraft:netherite_sword">Netherite sword</option>
        <option value="minecraft:iron_chestplate">Iron chestplate</option>
        <option value="minecraft:bow">Bow</option>
        <option value="minecraft:golden_carrot">Golden carrot</option>
        <option value="minecraft:elytra">Elytra</option>
      </select>
    </div>
    <div><label for="gcCount">Count</label><input id="gcCount" type="number" min="1" max="64" value="1"></div>
    <div>
      <label for="gcEnch">Enchantment</label>
      <select id="gcEnch">
        <option value="">None</option>
        <option value="unbreaking=3">Unbreaking III</option>
        <option value="mending=1">Mending</option>
        <option value="efficiency=5">Efficiency V</option>
        <option value="sharpness=5">Sharpness V</option>
        <option value="fortune=3">Fortune III</option>
        <option value="power=5">Power V</option>
      </select>
    </div>
  </div>
  <button class="run" type="button" data-run="js">Generate /give</button>
  <div class="tool-result" id="gcResult"></div>
</div>

## How to use

Pick the **item**, **count** and an optional **enchantment**, then press Generate. The tool outputs a valid Java `/give` command using 1.20.5+ **components** syntax — copy it straight into chat or a command block.

## Command format

```
/give @p <item>[enchantments={id:"minecraft:<ench>",level:N}] <count>
```

For Bedrock, drop the `[enchantments=…]` bracket part (Bedrock uses a different NBT layout) — the base `/give` command still works.

## Common questions

**Why won't the enchanted command work on Bedrock?** Bedrock needs the enchant in NBT form (`{ench:[{id:16,lvl:5}]}`). This generator targets Java 1.20.5+; use the Bedrock variant by removing the components bracket.

**How do I give a named item?** Add `[custom_name='{"text":"My Item"}']` to the item segment.
