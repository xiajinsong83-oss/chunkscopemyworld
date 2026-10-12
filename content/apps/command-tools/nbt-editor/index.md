---
title: "Item NBT / Components Editor"
description: "Build a /give command with custom name and lore using 1.20.5+ components — tag your gear and stack items with flavor text."
type: tool
editions: ["Java"]
version: "1.21.5"
featured: true
accent: 4
js: "nbt-editor"
tags: ["Commands", "NBT", "Components", "Give"]
relatedTools: ["/apps/command-tools/give-command-generator/"]
---
<div class="tool-ui">
  <div class="row">
    <div>
      <label for="neItem">Item</label>
      <select id="neItem">
        <option value="minecraft:diamond_sword">Diamond sword</option>
        <option value="minecraft:netherite_pickaxe">Netherite pickaxe</option>
        <option value="minecraft:golden_carrot">Golden carrot</option>
        <option value="minecraft:written_book">Written book</option>
      </select>
    </div>
    <div><label for="neName">Custom name</label><input id="neName" type="text" placeholder="Excalibur"></div>
  </div>
  <div class="row">
    <div><label for="neLore">Lore (one line per row)</label><textarea id="neLore" rows="3" placeholder="Forged in fire&#10;Rarity: legendary"></textarea></div>
  </div>
  <button class="run" type="button" data-run="js">Generate item</button>
  <div class="tool-result" id="neResult"></div>
</div>

## How to use

Pick an **item**, set a **custom name** and optional **lore lines**, then Generate. The tool outputs a `/give` command using 1.20.5+ **components** for name and lore.

## Command format

```
/give @p <item>[custom_name='{"text":"<name>","italic":false}',lore=['{"text":"<line>"}',...]] 1
```

## Common questions

**Why does my name turn italic?** Item names default to italic; add `"italic":false` (this generator does it for you).

**How do I add color to lore?** Use `{"text":"<line>","color":"gold"}` inside the lore array — the generator keeps it simple, but you can hand-edit the JSON.
