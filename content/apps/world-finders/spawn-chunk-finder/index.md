---
title: "Spawn Chunk Finder"
description: "Find the world spawn chunk and the always-loaded spawn area for any seed — the 3×3 chunk region where redstone keeps running."
type: tool
editions: ["Java", "Bedrock"]
version: "1.21.5"
featured: true
accent: 1
js: "spawn-chunk-finder"
tags: ["Spawn", "Chunks", "World generation", "Redstone"]
relatedTools: ["/apps/seed-map/"]
---
<div class="tool-ui">
  <div class="row">
    <div><label for="sfSeed">World seed</label><input id="sfSeed" type="text" inputmode="text" placeholder="12345 or any text seed" value="12345"></div>
  </div>
  <button class="run" type="button" data-run="js">Find spawn chunk</button>
  <div class="tool-result" id="sfResult"></div>
</div>

## How to use

Enter any **seed** and press Find. The tool shows the world spawn chunk (chunk 0,0) and the **always-loaded spawn chunk area** where farms and redstone keep running even when you're away.

## What stays loaded

The **3×3 spawn chunks** (chunks -1…1 on X and Z, centered on the spawn chunk) stay loaded in the world regardless of player position — ideal for a permanent iron farm or an item sorter hub.

## Spawn facts

- World spawn is always inside **chunk (0,0)**, around block **(8, 64, 8)** — the Y depends on terrain.
- The spawn chunk area never unloads, so contraptions there run 24/7.

## Common questions

**How do I move the spawn point?** `/setworldspawn <x> <y> <z>` moves the *respawn* point; the loaded 3×3 chunk region is fixed by the original spawn.

**Does Bedrock keep spawn chunks loaded?** Bedrock's behavior differs — spawn chunks stay loaded on Java; on Bedrock the region near spawn behaves similarly but has its own rules.
