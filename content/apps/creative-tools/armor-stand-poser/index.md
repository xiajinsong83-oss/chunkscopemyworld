---
title: "Armor Stand Poser"
icon: "/img/app-icons/armor-stand-poser.jpg"
description: "Build a /summon command with armor-stand poses — pick a preset (T-pose, salute, sit) or set custom arm and leg angles."
type: tool
editions: ["Java"]
version: "1.21.5"
featured: true
accent: 5
js: "armor-stand-poser"
tags: ["Commands", "Armor stand", "Pose", "Creative"]
relatedTools: ["/apps/command-tools/summon-command-generator/"]
---
<div class="tool-ui">
  <div class="row">
    <div>
      <label for="asPose">Pose preset</label>
      <select id="asPose">
        <option value="stand" selected>Standing</option>
        <option value="sit">Sitting</option>
        <option value="salute">Salute</option>
        <option value="tpose">T-Pose</option>
        <option value="wave">Waving</option>
      </select>
    </div>
    <div><label for="asPlate">Base plate</label><select id="asPlate"><option value="1" selected>Yes</option><option value="0">No</option></select></div>
    <div><label for="asArms">Arms shown</label><select id="asArms"><option value="1" selected>Yes</option><option value="0">No</option></select></div>
  </div>
  <button class="run" type="button" data-run="js">Generate /summon</button>
  <div class="tool-result" id="asResult"></div>
</div>

## How to use

Pick a **pose preset**, toggle the **base plate** and **arms**, then Generate. The tool builds a `/summon` command with the correct `Pose` NBT.

## Pose reference

| Preset | Pose NBT |
|---|---|
| Standing | (default) |
| Sitting | legs bent forward |
| Salute | right arm raised 90° |
| T-Pose | arms horizontal |
| Waving | one arm raised, other forward |

## Command format

```
/summon minecraft:armor_stand ~ ~1 ~ {Pose:{RightArm:[90f,0f,0f]},ShowArms:1b,NoBasePlate:0b}
```

## Common questions

**Why are arms not visible?** Armor stands hide arms by default — set `ShowArms:1b` (this generator does it when "Arms shown" is Yes).

**How do I pose a mob?** Armor stands are entities; this NBT applies only to armor stands.
