---
title: "Particle Command Generator"
description: "Build a /particle command — dust, flame, heart, portal and more, with position and motion. Java 1.21."
type: tool
editions: ["Java", "Bedrock"]
version: "1.21.5"
featured: true
accent: 4
js: "particle-command-generator"
tags: ["Commands", "Particle", "Effects", "Creative"]
relatedTools: ["/apps/command-tools/"]
---
<div class="tool-ui">
  <div class="row">
    <div>
      <label for="pcType">Particle</label>
      <select id="pcType">
        <option value="minecraft:flame">Flame</option>
        <option value="minecraft:heart">Heart</option>
        <option value="minecraft:portal">Portal</option>
        <option value="minecraft:dust">Dust (colored)</option>
        <option value="minecraft:smoke">Smoke</option>
        <option value="minecraft:end_rod">End rod</option>
        <option value="minecraft:totem">Totem</option>
      </select>
    </div>
    <div><label for="pcX">Offset X</label><input id="pcX" type="text" value="~" disabled></div>
    <div><label for="pcCount">Count</label><input id="pcCount" type="number" min="1" max="500" value="20"></div>
  </div>
  <div class="row" id="pcDustRow">
    <div><label for="pcR">Red</label><input id="pcR" type="number" min="0" max="255" value="255"></div>
    <div><label for="pcG">Green</label><input id="pcG" type="number" min="0" max="255" value="100"></div>
    <div><label for="pcB">Blue</label><input id="pcB" type="number" min="0" max="255" value="50"></div>
    <div><label for="pcSize">Size</label><input id="pcSize" type="number" min="0.1" max="10" step="0.1" value="1"></div>
  </div>
  <button class="run" type="button" data-run="js">Generate /particle</button>
  <div class="tool-result" id="pcResult"></div>
</div>

## How to use

Pick a **particle** and **count**, then Generate. Dust lets you set an RGB color and size. The command spawns particles at your position.

## Command format

```
/particle minecraft:<particle> ~ ~1 ~ 0 0 0 0 <count>
/particle minecraft:dust <r> <g> <b> <size> ~ ~1 ~ 0 0 0 0 <count>
```

## Common questions

**Why no particles?** The `force` keyword shows particles to everyone: add `force` before the count for visible-to-all effects.

**How do I animate movement?** Adjust the three `0 0 0` (spread/speed) values — they control how far particles scatter per tick.
