---
title: "Nether Portal Calculator"
description: "Convert Overworld ↔ Nether coordinates with the 1:8 ratio — and find the portal that links exactly where you want to go."
type: tool
editions: ["Java", "Bedrock"]
version: "1.21.5"
featured: true
accent: 1
js: "nether-portal-calculator"
tags: ["Nether", "Coordinates", "Portal"]
relatedGuides: []
---
<div class="tool-ui">
  <div class="row">
    <div>
      <label for="npDir">Direction</label>
      <select id="npDir">
        <option value="to-nether">Overworld → Nether (÷8)</option>
        <option value="to-over">Nether → Overworld (×8)</option>
      </select>
    </div>
    <div>
      <label for="npX">X</label>
      <input id="npX" type="number" value="0">
    </div>
    <div>
      <label for="npZ">Z</label>
      <input id="npZ" type="number" value="0">
    </div>
  </div>
  <button class="run" type="button" data-run="js">Convert coordinates</button>
  <div class="tool-result" id="npResult"></div>
</div>

## How to use

1. Choose the **direction** — Overworld to Nether divides X and Z by 8; the reverse multiplies.
2. Enter the **X and Z** coordinates (Y stays the same for linking purposes).
3. Convert, then build your portal at the result. Link both sides and the game matches them.

## The 1:8 rule

Every block you walk in the Nether equals **8 blocks** in the Overworld. A Nether portal at X=100, Z=-64 links to the Overworld portal nearest X=800, Z=-512.

## Common questions

**Why do my portals link to the wrong place?** The game links to the *nearest existing* portal within search range (128 blocks Overworld / 16 Nether). Build your second portal exactly at the calculated coordinates before lighting it, and keep portals 1,024 Overworld blocks apart to avoid cross-linking.

**Does Bedrock use the same ratio?** Yes — 1:8 applies to both editions.
