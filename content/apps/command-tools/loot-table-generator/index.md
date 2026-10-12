---
title: "Loot Table Generator"
description: "Build a simple Minecraft loot-table JSON for chests and entities — item, count range and weight. Paste into a datapack."
type: tool
editions: ["Java"]
version: "1.21.5"
featured: true
accent: 4
js: "loot-table-generator"
tags: ["Commands", "Loot table", "Datapack", "Data"]
relatedTools: ["/apps/command-tools/"]
---
<div class="tool-ui">
  <div class="row">
    <div>
      <label for="ltItem">Item</label>
      <select id="ltItem">
        <option value="minecraft:diamond">Diamond</option>
        <option value="minecraft:emerald">Emerald</option>
        <option value="minecraft:gold_ingot">Gold ingot</option>
        <option value="minecraft:enchanted_book">Enchanted book</option>
        <option value="minecraft:iron_ingot">Iron ingot</option>
      </select>
    </div>
    <div><label for="ltMin">Min count</label><input id="ltMin" type="number" min="1" max="64" value="1"></div>
    <div><label for="ltMax">Max count</label><input id="ltMax" type="number" min="1" max="64" value="3"></div>
    <div><label for="ltRolls">Rolls</label><input id="ltRolls" type="number" min="1" max="10" value="1"></div>
  </div>
  <button class="run" type="button" data-run="js">Generate loot table</button>
  <div class="tool-result" id="ltResult"></div>
</div>

## How to use

Set the **item**, **count range** and **rolls**, then Generate. The output is a valid Java loot-table JSON you can place in a datapack under `data/<namespace>/loot_table/blocks/<name>.json`.

## Output structure

```json
{"type":"minecraft:chest","pools":[{"rolls":1,"entries":[{"type":"minecraft:item","name":"minecraft:diamond","weight":1}],"functions":[{"function":"minecraft:set_count","count":{"min":1,"max":3}}]}]}
```

## Common questions

**Where do I put this file?** In a datapack: `data/mypack/loot_table/blocks/mychest.json`, then use `/setblock` with a `LootTable` tag or assign it to a container.

**How do multiple entries work?** Add more entries to the `entries` array with weights — higher weight = more common.
