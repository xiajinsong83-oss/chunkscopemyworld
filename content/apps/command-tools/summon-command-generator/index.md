---
title: "Summon Command Generator"
description: "Build a /summon command — entity, custom name, AI toggle and nbt options. Copy-paste for Java 1.21."
type: tool
editions: ["Java", "Bedrock"]
version: "1.21.5"
featured: true
accent: 4
js: "summon-command-generator"
tags: ["Commands", "Summon", "Mobs", "Creative"]
relatedTools: ["/apps/command-tools/"]
---
<div class="tool-ui">
  <div class="row">
    <div>
      <label for="scEntity">Entity</label>
      <select id="scEntity">
        <option value="minecraft:creeper">Creeper</option>
        <option value="minecraft:zombie">Zombie</option>
        <option value="minecraft:villager">Villager</option>
        <option value="minecraft:ender_dragon">Ender Dragon</option>
        <option value="minecraft:wither">Wither</option>
        <option value="minecraft:sheep">Sheep</option>
        <option value="minecraft:armor_stand">Armor stand</option>
      </select>
    </div>
    <div><label for="scName">Custom name</label><input id="scName" type="text" value="" placeholder="Optional"></div>
    <div>
      <label for="scAI">AI</label>
      <select id="scAI"><option value="1" selected>Enabled</option><option value="0">Disabled</option></select>
    </div>
  </div>
  <button class="run" type="button" data-run="js">Generate /summon</button>
  <div class="tool-result" id="scResult"></div>
</div>

## How to use

Pick an **entity**, optional **custom name** and whether AI is **enabled**, then Generate. The result is a valid Java `/summon` command with NBT — run it to place the entity at your position.

## Command format

```
/summon minecraft:<entity> ~ ~1 ~ {CustomName:'"<name>"',NoAI:<0|1>b}
```

## Common questions

**Why is my creeper not exploding?** Creepers need to be primed by players; setting `NoAI:1b` makes them idle, not explode.

**How do I make a giant zombie?** Add `{Size:4}` for slimes or scale via `Health`/`Attributes` — this generator covers the basics.

**Does it work on Bedrock?** Bedrock /summon uses different NBT — this targets Java.
