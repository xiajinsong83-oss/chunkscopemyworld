---
title: "Seed Finder"
description: "Reverse-search for seeds where a village, ancient city, trial chambers or monument spawns right next to your world spawn — exact seed numbers, instantly, Java & Bedrock 1.18+."
type: tool
editions: ["Java", "Bedrock"]
version: "1.21.5"
versions: ["Java", "Bedrock"]
featured: true
accent: 1
js: ["core-urlstate", "core-worker", "core-java-random", "core-structures", "seed-finder"]
tags: ["Seeds", "Structures", "Spawn"]
relatedGuides: ["/guides/find-ancient-cities/"]
---
The Seed Finder works **backwards**: instead of entering a seed to see its world, you pick what you want near your spawn — a village, ancient city, trial chambers or monument — and it scans seeds to find ones that qualify. Enter the exact seed into any world or the **Seed Map** to start playing right next to your target structure.

<div class="tool-ui" id="sfdUi">
  <div class="row">
    <div><label for="sfdStart">Start seed</label><input id="sfdStart" type="number" inputmode="numeric" value="0" autocomplete="off"></div>
    <div><label for="sfdType">Structure</label><select id="sfdType"></select></div>
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
  <div class="tool-stats" id="sfdStatus">Pick a structure and press Search — scans in the background.</div>
  <div class="tool-stats dim" id="sfdProgress" style="display:none"></div>
  <div class="sf-results" id="sfdResults"></div>
  <div class="tool-hint" id="sfdHint" style="display:none">
    Bedrock note: since 1.18, Bedrock and Java generate identical worlds for the same seed, so these seeds work on both editions.
  </div>
</div>

## How to use

1. Set the **start seed** (leave 0 to scan the lowest seeds first).
2. Pick a **structure** — villages, ancient cities, trial chambers, monuments, mansions and more.
3. Choose the **max distance** from world spawn (chunks) and how many **seeds to scan**.
4. Press **Search** — matching seeds are listed with the structure's exact chunk/block coordinates and distance.
5. Click **Open in Seed Map** to inspect that seed before starting a world.

## Why "deterministic" matters

Every seed's structure layout is a pure function of the seed, so scanning is **exact and reproducible** — the same search always gives the same matches, identical on Java and Bedrock. Scans run in a background worker, so the page stays responsive.

## Common questions

**How are distances measured?** Distance is from world spawn (chunk 0,0) to the structure's generation-attempt block, in chunks then converted to blocks.

**Can it find biome-specific things like cherry groves or lush caves?** Not yet — this build finds **structure** conditions. A biome-based seed finder is on the roadmap.
