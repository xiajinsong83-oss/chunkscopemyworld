---
title: "Stronghold Finder"
description: "The three strongholds — their ring distribution around spawn and a /locate command to find the nearest one with the end portal."
type: tool
editions: ["Java", "Bedrock"]
version: "1.21.5"
featured: true
accent: 1
js: "stronghold-finder"
tags: ["Stronghold", "End portal", "Structures", "World generation"]
relatedTools: ["/apps/command-tools/locate-command-generator/"]
---
<div class="tool-ui">
  <div class="row">
    <div><label for="shSeed">World seed</label><input id="shSeed" type="text" inputmode="text" placeholder="Optional" value=""></div>
  </div>
  <button class="run" type="button" data-run="js">Find stronghold</button>
  <div class="tool-result" id="shResult"></div>
</div>

## About strongholds

Three strongholds (containing the **End portal**) generate on a ring around spawn, spaced roughly **120° apart** and about **1280 blocks** out from the origin. They're the only path to the End.

## Locating one

- Throw **Ender Eyes** — they fly toward the nearest stronghold.
- Use `/locate structure minecraft:stronghold` (cheats) for exact coords.
- The **Seed Map** structure layer and this tool help you plan before entering the game.

## Generation facts

- Exactly **3 strongholds** per world (Java), evenly spaced in a ring.
- The nearest is ~**1280 blocks** from spawn (roughly 80 chunks).

## Common questions

**Why do Ender Eyes go up?** They fly toward the stronghold; when they point straight down, dig — you're over it.

**Is the End portal always there?** A stronghold always has an End portal room, but its spawner/frame layout varies.
