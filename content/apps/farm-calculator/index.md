---
title: "Farm Output Calculator"
description: "Estimate items per hour for iron, gold, sugarcane, creeper and villager farms, with AFK time scaling and material lists. Exclusive to ChunkScope."
type: tool
editions: ["Java", "Bedrock"]
version: "1.21.5"
featured: true
accent: 2
js: "farm-calculator"
tags: ["Exclusive", "Farms", "per hour"]
relatedGuides: ["/guides/iron-farm-1.21.5/", "/guides/playerless-sugarcane-farm/", "/guides/creeper-farm-no-cats/"]
---
<div class="tool-ui">
  <div class="row">
    <div>
      <label for="fcType">Farm type</label>
      <select id="fcType">
        <option value="iron">Iron farm (6 villager, 1.21)</option>
        <option value="gold">Gold farm (nether piglin)</option>
        <option value="sugarcane">Sugarcane farm (playerless)</option>
        <option value="creeper">Creeper farm (gunpowder)</option>
      </select>
    </div>
    <div>
      <label for="fcHours">AFK time (hours)</label>
      <input id="fcHours" type="number" min="0.5" max="24" step="0.5" value="4">
    </div>
  </div>
  <button class="run" type="button" data-run="js">Calculate output</button>
  <div class="tool-result" id="fcResult"></div>
</div>

## How to use

1. Choose your **farm type** — rates below reflect standard, well-built designs (not ultra-optimized, not broken).
2. Enter how long you plan to **AFK** (defaults to 4 hours).
3. Hit **Calculate output** to get a per-hour estimate plus totals for your session.

Rates are community-measured averages for 1.21 designs and may vary ±15% with spawn conditions.

## Parameters used

| Farm | Items / hour (est.) | Notes |
|---|---|---|
| Iron (6 villager) | ~700 iron ingots | Depends on golem cap and villager count |
| Gold (piglin) | ~240 gold ingots | More with looting sword |
| Sugarcane (playerless) | ~2,160 sugar cane | 6-7 rows, hopper collection |
| Creeper (gunpowder) | ~1,500 gunpowder | 2-spawner or roof-only design |

## Common questions

**Why is my farm below the estimate?** Check spawning space, mob cap usage by other farms, and simulation distance (set to 6+ for Bedrock, 8+ recommended on Java).
