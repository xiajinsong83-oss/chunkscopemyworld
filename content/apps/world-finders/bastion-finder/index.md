---
title: "Bastion Finder"
description: "Locate bastion remnants — the piglin gold-rich structures with netherite debris — and a /locate command to reach one."
type: tool
editions: ["Java", "Bedrock"]
version: "1.21.5"
featured: true
accent: 1
js: "bastion-finder"
tags: ["Bastion", "Piglins", "Netherite", "World generation"]
relatedTools: ["/apps/command-tools/locate-command-generator/"]
---
<div class="tool-ui">
  <div class="row">
    <div><label for="bfSeed">World seed</label><input id="bfSeed" type="text" inputmode="text" placeholder="Optional" value=""></div>
  </div>
  <button class="run" type="button" data-run="js">Find bastion</button>
  <div class="tool-result" id="bfResult"></div>
</div>

## About bastion remnants

Bastions are massive piglin fortresses in the nether — the **richest netherite source** (ancient debris + netherite gear in their chests). They generate in most nether biomes except soulsand valleys.

## Locating one

- Run `/locate structure minecraft:bastion_remnant` (cheats).
- Entering a bastion **angers piglins** unless you wear gold — bring a golden helmet and gold ingots to barter.

## Loot to grab

| Chest | Contents |
|---|---|
| Treasure room | **Netherite ingot, debris**, gold |
| Hoglin stable | Gold, meat, occasionally netherite |
| Bridge / housing | Gold, arrows, armor |

## Common questions

**Why are piglins hostile?** They attack if you open chests or break gold blocks without wearing gold armor — wear a golden piece.

**How many per world?** Several bastions generate; they're rarer than fortresses but plentiful in open nether areas.
