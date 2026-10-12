---
title: "Nether Fortress Finder"
description: "Find a nether fortress — the /locate command, spawn rates and the wither-skeleton path to netherite."
type: tool
editions: ["Java", "Bedrock"]
version: "1.21.5"
featured: true
accent: 1
js: "nether-fortress-finder"
tags: ["Nether fortress", "Wither skeletons", "Netherite", "World generation"]
relatedTools: ["/apps/command-tools/locate-command-generator/"]
---
<div class="tool-ui">
  <div class="row">
    <div><label for="nfSeed">World seed</label><input id="nfSeed" type="text" inputmode="text" placeholder="Optional" value=""></div>
  </div>
  <button class="run" type="button" data-run="js">Find fortress</button>
  <div class="tool-result" id="nfResult"></div>
</div>

## About nether fortresses

Fortresses are the nether's key structure: home to **wither skeletons** (skulls → netherite) and **blaze spawners** (blaze rods → potions/end). They generate on a grid across the nether.

## Locating one

- Run `/locate structure minecraft:fortress` (cheats) for exact coords.
- Fortresses often sit in **soul sand valleys** or open nether terrain; fly high to spot the dark brick.

## What to farm

| Mob | Drops |
|---|---|
| Wither skeleton | Wither skull (→ beacons) |
| Blaze | Blaze rods (→ potions, end) |
| Magma cube | Magma cream |

## Common questions

**Why can't I find one?** Fortresses spawn at nether coordinate bands — fly across the nether high up; multiple fortresses exist per world.

**Do I need it for the End?** Yes — blaze rods are required to craft Eyes of Ender.
