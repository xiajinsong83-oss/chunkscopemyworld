---
title: "Mob Cap & Simulation Distance Calculator"
description: "Estimate the active mob capacity for your world based on simulation distance — how many hostile mobs can be alive, and how spawn-proofing helps."
type: tool
editions: ["Java", "Bedrock"]
version: "1.21.5"
featured: true
accent: 2
js: "mob-cap-calculator"
tags: ["Mobs", "Spawning", "Farms", "Survival"]
relatedGuides: ["/guides/farms/creeper-farm-no-cats/"]
---
<div class="tool-ui">
  <div class="row">
    <div>
      <label for="mcEdition">Edition</label>
      <select id="mcEdition">
        <option value="java" selected>Java</option>
        <option value="bedrock">Bedrock</option>
      </select>
    </div>
    <div>
      <label for="mcSim">Simulation distance</label>
      <select id="mcSim">
        <option value="4">4 chunks</option>
        <option value="6">6 chunks</option>
        <option value="8" selected>8 chunks</option>
        <option value="12">12 chunks</option>
      </select>
    </div>
    <div>
      <label for="mcPlayers">Players</label>
      <input id="mcPlayers" type="number" min="1" max="8" value="1">
    </div>
  </div>
  <button class="run" type="button" data-run="js">Estimate mob cap</button>
  <div class="tool-result" id="mcResult"></div>
</div>

## How to use

Pick your edition, simulation distance and player count. The calculator estimates the **active hostile mob cap** — the number of hostile mobs that can be alive in loaded chunks. Spawn-proofing (lighting caves, slabs) frees that cap for your farm.

## The numbers

- **Java** hostile cap ≈ **70 × players** (world-wide across loaded chunks).
- **Bedrock** uses a per-player cap ≈ 200 hostile, split across simulation distance.
- Simulation distance decides how many chunks are active: (2×dist+1)² total.

A farm near your base competes with the rest of the cap — clearing the spawn radius of caves and dark spots dramatically improves farm rates.

## Common questions

**Why is my creeper farm slow?** Hostile mobs spawn in every dark, spawnable block in loaded chunks. Light up caves and the surface within ~128 blocks (mob spawn radius) to funnel the cap into your farm.

**Does simulation distance affect rates?** Yes — more active chunks = more cap, but also more places mobs can spawn away from your farm. 6–8 is a common balance.
