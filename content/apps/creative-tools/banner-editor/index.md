---
title: "Banner Editor"
description: "Design Minecraft banners and shields visually — pick patterns and colors, preview the result, copy the banner command."
type: tool
editions: ["Java", "Bedrock"]
version: "1.21.5"
featured: true
accent: 3
js: "banner-editor"
tags: ["Banners", "Creative", "Design"]
relatedGuides: []
---
![Banner design workspace](/img/banner-flags.jpg)

Design your guild banner or shield emblem step by step. Choose a base color, add up to 6 patterns, and the editor composes the final look and outputs the exact `/give` command for Java or Bedrock.

<div class="tool-ui">
  <div class="row">
    <div>
      <label for="beBase">Base color</label>
      <select id="beBase">
        <option value="white">White</option><option value="red">Red</option><option value="blue">Blue</option>
        <option value="green">Green</option><option value="black">Black</option><option value="gold">Gold</option>
      </select>
    </div>
    <div>
      <label for="bePattern">Pattern</label>
      <select id="bePattern">
        <option value="stripe">Stripe (vertical)</option><option value="cross">Cross</option>
        <option value="border">Border</option><option value="chief">Chief (top)</option>
        <option value="diagonal">Diagonal</option><option value="skull">Skull</option>
      </select>
    </div>
    <div>
      <label for="beColor">Pattern color</label>
      <select id="beColor">
        <option value="white">White</option><option value="red">Red</option><option value="blue">Blue</option>
        <option value="green">Green</option><option value="black">Black</option><option value="gold">Gold</option>
      </select>
    </div>
  </div>
  <button class="run" type="button" data-run="js">Generate banner</button>
  <div class="tool-result" id="beResult"></div>
</div>

## How to use

1. Pick the **base color** of the banner.
2. Choose a **pattern** (stripe, cross, border, chief, diagonal, skull).
3. Set the **pattern color** and generate — the tool returns the banner command and the loom recipe steps.

## Pattern rules

- Banners allow up to **6 pattern layers** in Java (more with commands).
- Patterns are applied in order — the last one sits on top.
- Shields accept the same patterns; hold a shield and right-click a banner to transfer it.

## Common questions

**Why does my pattern not show?** Check that the pattern color differs from the base color — identical colors are invisible. Also confirm the pattern is applied after the base coat on the loom.
