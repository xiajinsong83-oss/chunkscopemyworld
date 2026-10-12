---
title: "Firework Designer"
description: "Build custom firework rockets: flight duration, colors, shapes and effects — output the exact /give command."
type: tool
editions: ["Java", "Bedrock"]
version: "1.21.5"
featured: true
accent: 3
js: "firework-designer"
tags: ["Fireworks", "Creative", "Commands"]
relatedGuides: []
---
![Firework night](/img/fireworks.jpg)

Design celebration fireworks or elytra-boosting rockets. Choose flight time, explosion colors and shape, and copy the generated command straight into the game.

<div class="tool-ui">
  <div class="row">
    <div>
      <label for="fwFlight">Flight duration</label>
      <select id="fwFlight">
        <option value="1">1 (short)</option><option value="2">2 (medium)</option><option value="3">3 (long)</option>
      </select>
    </div>
    <div>
      <label for="fwColor">Explosion color</label>
      <select id="fwColor">
        <option value="red">Red</option><option value="green">Green</option><option value="gold">Gold</option>
        <option value="blue">Blue</option><option value="purple">Purple</option><option value="cyan">Cyan</option>
      </select>
    </div>
    <div>
      <label for="fwShape">Shape</label>
      <select id="fwShape">
        <option value="small">Small ball</option><option value="large">Large ball</option>
        <option value="star">Star</option><option value="creeper">Creeper face</option>
        <option value="burst">Burst</option>
      </select>
    </div>
  </div>
  <button class="run" type="button" data-run="js">Generate firework</button>
  <div class="tool-result" id="fwResult"></div>
</div>

## How to use

1. Set the **flight duration** — each level adds ~2 seconds of flight; level 3 rockets are elytra essentials.
2. Choose the explosion **color** and **shape**.
3. Generate and copy the command. Java uses `/give`, Bedrock accepts the same NBT in commands.

## Common questions

**What makes a good elytra rocket?** Flight duration 3 + any explosion. Use our designer to mass-produce them with one command.

**Why does my firework show no explosion?** Firework *stars* determine the explosion; a rocket without stars flies with no burst. Craft rockets with paper + gunpowder + a crafted star.
