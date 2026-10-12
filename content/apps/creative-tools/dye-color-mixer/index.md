---
title: "Dye Color Mixer"
description: "Look up Minecraft dye recipes — combine two base dyes to make orange, magenta, light blue, lime and more, with exact recipes."
type: tool
editions: ["Java & Bedrock"]
version: "1.21.5"
featured: true
accent: 5
js: "dye-color-mixer"
tags: ["Dyes", "Colors", "Crafting", "Creative"]
relatedTools: ["/apps/creative-tools/banner-editor/"]
---
<div class="tool-ui">
  <div class="row">
    <div>
      <label for="dmA">First dye</label>
      <select id="dmA">
        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="yellow">Yellow</option>
        <option value="green">Green</option>
        <option value="white">White</option>
        <option value="black">Black</option>
        <option value="purple">Purple</option>
        <option value="gray">Gray</option>
      </select>
    </div>
    <div>
      <label for="dmB">Second dye</label>
      <select id="dmB">
        <option value="yellow" selected>Yellow</option>
        <option value="blue">Blue</option>
        <option value="red">Red</option>
        <option value="white">White</option>
        <option value="green">Green</option>
        <option value="black">Black</option>
        <option value="purple">Purple</option>
        <option value="gray">Gray</option>
      </select>
    </div>
  </div>
  <button class="run" type="button" data-run="js">Mix dyes</button>
  <div class="tool-result" id="dmResult"></div>
</div>

## How to use

Pick **two dyes** and press Mix. The tool tells you the resulting dye and the exact recipe — from Minecraft's crafting recipes (1.14+).

## Dye recipes

| Result | Recipe |
|---|---|
| Orange | Red + Yellow |
| Magenta | Purple + White (or Red + Blue + White) |
| Light Blue | Blue + White |
| Lime | Green + White |
| Pink | Red + White |
| Gray | Black + White |
| Cyan | Green + Blue |
| Purple | Red + Blue |

## Common questions

**Why no result?** Some combinations don't produce a new dye — two identical dyes give more of the same, and not every pair has a recipe.

**Which dyes are "base"?** Red, blue, yellow, green, white, black, brown (cocoa), plus grey from black+white and others from recipes above.
