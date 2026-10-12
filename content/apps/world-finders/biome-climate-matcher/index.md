---
title: "Biome Climate Matcher"
description: "Match a temperature / humidity / continent combo to the most likely Minecraft biome — based on ChunkScope's deterministic climate model."
type: tool
editions: ["Java"]
version: "1.21.5"
featured: true
accent: 1
js: "biome-climate-matcher"
tags: ["Biomes", "Climate", "World generation", "Data"]
relatedTools: ["/apps/seed-map/"]
---
<div class="tool-ui">
  <div class="row">
    <div><label for="bcTemp">Temperature (0–1)</label><input id="bcTemp" type="number" min="0" max="1" step="0.01" value="0.4"></div>
    <div><label for="bcHum">Humidity (0–1)</label><input id="bcHum" type="number" min="0" max="1" step="0.01" value="0.5"></div>
    <div><label for="bcCont">Continent (0–1)</label><input id="bcCont" type="number" min="0" max="1" step="0.01" value="0.5"></div>
  </div>
  <button class="run" type="button" data-run="js">Match biome</button>
  <div class="tool-result" id="bcResult"></div>
</div>

## How to use

Enter **temperature, humidity and continent** values (0–1) from a climate readout and Match. The tool returns the most likely biome from ChunkScope's climate windows.

## Climate windows (ChunkScope model)

| Biome | Conditions |
|---|---|
| Desert | temp > 0.6, continent land |
| Snowy Plains | temp < 0.5 |
| Jungle | temp > 0.55, humid |
| Cherry Grove | temp 0.12–0.62, humid |
| Flower Forest | temp 0.3–0.6, humid |
| Mushroom Island | coast, humid |
| Swamp | temp −0.1–0.7, very humid |
| Plains | temp 0.1–0.5, moderate |

## Common questions

**Is this exact?** It's a **deterministic approximation** of Java world generation — accurate enough for planning, but in-game F3 is authoritative.

**What are the 0–1 values?** Simplified proxies for the real climate noise; consistency matters more than absolute scale.
