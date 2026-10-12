---
title: "Effect Command Generator"
description: "Build a /effect command — pick status effect, duration and amplifier, with hide-particles option. Java 1.21."
type: tool
editions: ["Java", "Bedrock"]
version: "1.21.5"
featured: true
accent: 4
js: "effect-command-generator"
tags: ["Commands", "Effect", "Potions", "Creative"]
relatedTools: ["/apps/creative-tools/potion-builder/"]
---
<div class="tool-ui">
  <div class="row">
    <div>
      <label for="efEffect">Effect</label>
      <select id="efEffect">
        <option value="speed">Speed</option>
        <option value="haste">Haste</option>
        <option value="strength">Strength</option>
        <option value="resistance">Resistance</option>
        <option value="regeneration">Regeneration</option>
        <option value="night_vision">Night Vision</option>
        <option value="invisibility">Invisibility</option>
        <option value="levitation">Levitation</option>
        <option value="saturation">Saturation</option>
      </select>
    </div>
    <div><label for="efDur">Duration (s)</label><input id="efDur" type="number" min="1" max="100000" value="60"></div>
    <div><label for="efAmp">Amplifier</label><input id="efAmp" type="number" min="0" max="255" value="0"></div>
    <div>
      <label for="efHide">Hide particles</label>
      <select id="efHide"><option value="true">Yes</option><option value="false" selected>No</option></select>
    </div>
  </div>
  <button class="run" type="button" data-run="js">Generate /effect</button>
  <div class="tool-result" id="efResult"></div>
</div>

## How to use

Pick an **effect**, set **duration**, **amplifier** (0 = level I) and whether to **hide particles**, then Generate. The command applies the effect to you.

## Command format

```
/effect give @p minecraft:<effect> <seconds> <amplifier> <hideParticles>
```

## Effect notes

| Effect | Typical use |
|---|---|
| Haste | Faster mining |
| Levitation | Animate mobs / climb |
| Invisibility | Hide from mobs (armor still visible) |
| Saturation | Full hunger fill |

## Common questions

**What's amplifier 0?** Amplifier 0 = effect level I, 1 = level II, etc. `255` is effectively infinite in some cases.

**Why "No such effect"?** Check the spelling — effect IDs use underscores (e.g. `night_vision`, not `nightvision`).
