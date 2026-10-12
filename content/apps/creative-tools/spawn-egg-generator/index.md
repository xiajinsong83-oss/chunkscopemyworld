---
title: "Spawn Egg Generator"
description: "Build a /give command for any mob's spawn egg — pick the mob and get the exact item id to spawn it in-game."
type: tool
editions: ["Java & Bedrock"]
version: "1.21.5"
featured: true
accent: 4
js: "spawn-egg-generator"
tags: ["Commands", "Spawn eggs", "Give", "Creative"]
relatedTools: ["/apps/command-tools/give-command-generator/"]
---
<div class="tool-ui">
  <div class="row">
    <div>
      <label for="seMob">Mob</label>
      <select id="seMob">
        <option value="creeper">Creeper</option>
        <option value="zombie">Zombie</option>
        <option value="skeleton">Skeleton</option>
        <option value="enderman">Enderman</option>
        <option value="villager">Villager</option>
        <option value="cow">Cow</option>
        <option value="pig">Pig</option>
        <option value="wolf">Wolf</option>
        <option value="cat">Cat</option>
        <option value="blaze">Blaze</option>
        <option value="iron_golem">Iron golem</option>
        <option value="warden">Warden</option>
      </select>
    </div>
    <div><label for="seCount">Count</label><input id="seCount" type="number" min="1" max="64" value="1"></div>
  </div>
  <button class="run" type="button" data-run="js">Generate /give</button>
  <div class="tool-result" id="seResult"></div>
</div>

## How to use

Pick a **mob** and count, then Generate. The tool outputs a `/give` command with the correct spawn-egg item id.

## How it works

Every mob has a spawn egg item: `minecraft:<mob>_spawn_egg`. Place it to spawn that mob (works with command blocks and in creative).

## Common questions

**Can I spawn a custom mob?** Yes — use `/summon` for NBT control; spawn eggs give the base mob.

**Do spawn eggs work in survival?** They're a creative/cheat item — you need `/give` or creative mode.
