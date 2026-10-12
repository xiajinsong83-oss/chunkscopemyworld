---
title: "Chunk Boundary Finder"
description: "Turn any world coordinate into its chunk and the block borders — for chunk-aligned builds, slime chunks and map alignment."
type: tool
editions: ["Java & Bedrock"]
version: "1.21.5"
featured: true
accent: 1
js: "chunk-boundary-finder"
tags: ["Chunks", "Coordinates", "Calculators", "World generation"]
relatedTools: ["/apps/slime-chunk-finder/"]
---
<div class="tool-ui">
  <div class="row">
    <div><label for="cbX">Block X</label><input id="cbX" type="number" value="0"></div>
    <div><label for="cbZ">Block Z</label><input id="cbZ" type="number" value="0"></div>
  </div>
  <button class="run" type="button" data-run="js">Find chunk</button>
  <div class="tool-result" id="cbResult"></div>
</div>

## How to use

Enter a **block coordinate** (X, Z) and Find. The tool shows which chunk it's in and the chunk's block boundaries.

## The math

- Chunk X = `floor(blockX / 16)` (and Z likewise).
- A chunk spans `chunkX×16 … (chunkX+1)×16 − 1`.

## Example

Block (8, 8) → chunk **(0, 0)**, spanning blocks 0–15 on both axes. Block (20, 40) → chunk (1, 2).

## Common questions

**Why does my build split across chunks?** Slime chunks, maps and spawn chunks are chunk-aligned — check your chunk before placing a farm.

**Does Bedrock use the same grid?** Yes — chunks are always 16×16 blocks on both editions.
