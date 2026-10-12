---
title: "Seed Finder"
description: "Reverse-search for seeds where a village, ancient city, trial chambers or monument spawns near your world spawn — or, experimentally, where cherry grove / mushroom island climate shows up. Java & Bedrock 1.18+."
type: tool
editions: ["Java", "Bedrock"]
version: "1.21.5"
versions: ["Java", "Bedrock"]
featured: true
accent: 1
js: ["core-urlstate", "core-worker", "core-java-random", "core-structures", "core-biome-noise", "seed-finder"]
tags: ["Seeds", "Structures", "Biomes", "Spawn"]
relatedGuides: ["/guides/find-ancient-cities/"]
---
The Seed Finder works **backwards**: instead of entering a seed to see its world, you pick what you want near your spawn — a village, ancient city, trial chambers, monument — or (experimentally) a biome's climate — and it scans seeds to find ones that qualify. Enter the exact seed into any world or the **Seed Map** to check it.

<div class="tool-ui" id="sfdUi">
  <div class="row">
    <div><label for="sfdStart">Start seed</label><input id="sfdStart" type="number" inputmode="numeric" value="0" autocomplete="off"></div>
    <div><label for="sfdMode">Search by</label><select id="sfdMode">
      <option value="structure" selected>Structure</option>
      <option value="biome">Biome (Beta)</option>
    </select></div>
    <div><label for="sfdType">Structure</label><select id="sfdType"></select></div>
    <div style="display:none"><label for="sfdBiome">Biome</label><select id="sfdBiome"></select></div>
    <div><label for="sfdRadius">Max distance</label><select id="sfdRadius">
      <option value="4">4 chunks (64 blocks)</option>
      <option value="8" selected>8 chunks (128 blocks)</option>
      <option value="16">16 chunks (256 blocks)</option>
      <option value="32">32 chunks (512 blocks)</option>
    </select></div>
    <div><label for="sfdCount">Seeds to scan</label><select id="sfdCount">
      <option value="200">200</option>
      <option value="500" selected>500</option>
      <option value="1000">1,000</option>
      <option value="2000">2,000</option>
    </select></div>
    <div><label>&nbsp;</label><button class="run" type="button" id="sfdRun">Search seeds</button></div>
  </div>
  <div class="tool-hint" id="sfdBiomeNote" style="display:none">
    <b>Biome search is experimental (Beta).</b> It uses a simplified, deterministic climate model (temperature / humidity / continentalness) to screen seeds for a target biome's typical climate near spawn. It is <b>not</b> Minecraft's real biome generator — treat matches as candidates and <b>verify in-game</b>.
  </div>
  <div class="tool-stats" id="sfdStatus">Pick a target and press Search — scans in the background.</div>
  <div class="tool-stats dim" id="sfdProgress" style="display:none"></div>
  <div class="sf-results" id="sfdResults"></div>
  <div class="tool-hint" id="sfdHint" style="display:none">
    Bedrock note: since 1.18, Bedrock and Java generate identical worlds for the same seed, so structure seeds work on both editions.
  </div>
</div>

## How to use

1. Set the **start seed** (leave 0 to scan the lowest seeds first).
2. Choose **Search by: Structure** for deterministic structure-near-spawn seeds, or **Biome (Beta)** for approximate climate screening.
3. Pick the **structure** or **biome** target, the **max distance** (chunks), and how many **seeds to scan**.
4. Press **Search** — candidate seeds are listed. Click **Open in Seed Map** to inspect one before starting a world.

## Why "deterministic" matters (structures)

Every seed's structure layout is a pure function of the seed, so structure scans are **exact and reproducible** — the same search always gives the same matches, identical on Java and Bedrock. Scans run in a background worker, so the page stays responsive.

## Biome search — honest limits

The biome mode screens seeds with a **simplified climate model**: a seed-driven, smooth noise field for temperature, humidity and continentalness, mapped to a target biome's typical climate window (e.g. cherry grove = warm & humid inland). Because it doesn't reproduce Mojang's exact multi-noise biome generator, hit rates and exact biomes can differ from the real game. It's useful for **shortlisting candidate seeds to try**, not for guaranteeing a biome.

## Common questions

**How are distances measured?** Structure distance is from world spawn (chunk 0,0) to the structure's generation-attempt block, in chunks then blocks.

**Why does the biome search warn "verify in game"?** The approximate climate model is not the real biome generator — always load the seed in Minecraft before committing to a playthrough.
