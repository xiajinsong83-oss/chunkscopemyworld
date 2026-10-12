---
title: "Enchant Command Generator"
description: "Build a valid /enchant command — choose enchantment and level for any item in your hand. Java 1.21."
type: tool
editions: ["Java", "Bedrock"]
version: "1.21.5"
featured: true
accent: 4
js: "enchant-command-generator"
tags: ["Commands", "Enchant", "Creative", "Data"]
relatedTools: ["/apps/command-tools/give-command-generator/"]
---
<div class="tool-ui">
  <div class="row">
    <div>
      <label for="ecEnch">Enchantment</label>
      <select id="ecEnch">
        <option value="sharpness">Sharpness</option>
        <option value="smite">Smite</option>
        <option value="unbreaking">Unbreaking</option>
        <option value="efficiency">Efficiency</option>
        <option value="fortune">Fortune</option>
        <option value="silktouch">Silk Touch</option>
        <option value="mending">Mending</option>
        <option value="infinity">Infinity</option>
        <option value="power">Power</option>
        <option value="protection">Protection</option>
      </select>
    </div>
    <div><label for="ecLevel">Level</label><input id="ecLevel" type="number" min="1" max="10" value="5"></div>
  </div>
  <button class="run" type="button" data-run="js">Generate /enchant</button>
  <div class="tool-result" id="ecResult"></div>
</div>

## How to use

Choose an enchantment and level, then press Generate. Hold the target item in your main hand and run the command — the enchant is applied directly (levels above the game cap are allowed on servers with /enchant).

## Command format

```
/enchant @p minecraft:<enchantment> <level>
```

## Enchantment IDs & levels

| Enchantment | Max legit | Note |
|---|---|---|
| Sharpness | 5 | Sword/axe |
| Unbreaking | 3 | Any tool/armor |
| Efficiency | 5 | Pickaxe/axe |
| Fortune | 3 | Conflicts with Silk Touch |
| Mending | 1 | Conflicts with Infinity |
| Power | 5 | Bow |

## Common questions

**Why can't I enchant higher than the cap?** Single-player /enchant enforces max levels; servers can override with permission tweaks.

**Does /enchant work on Bedrock?** Bedrock has no /enchant — use /give with NBT there.
