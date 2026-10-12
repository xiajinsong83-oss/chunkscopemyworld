---
title: "XP Level Calculator"
description: "Convert between Minecraft levels and total experience points — how much XP you need to reach level 30 for enchanting, or how many levels your XP gives you."
type: tool
editions: ["Java", "Bedrock"]
version: "1.21.5"
featured: true
accent: 2
js: "xp-level-calculator"
tags: ["XP", "Levels", "Enchanting", "Survival"]
relatedGuides: ["/guides/survival/enchanting-guide/"]
---
<div class="tool-ui">
  <div class="row">
    <div>
      <label for="xpMode">Convert</label>
      <select id="xpMode">
        <option value="level" selected>Level → Total XP</option>
        <option value="xp">Total XP → Level</option>
      </select>
    </div>
    <div><label for="xpVal">Value</label><input id="xpVal" type="number" min="0" value="30"></div>
  </div>
  <button class="run" type="button" data-run="js">Convert</button>
  <div class="tool-result" id="xpResult"></div>
</div>

## How to use

- **Level → Total XP**: enter a level (e.g. 30) to see the exact total XP points needed to reach it from level 0.
- **Total XP → Level**: enter XP points to see the level you'd reach and how much XP you'd have left over.

Uses Minecraft's exact level formula (Java & Bedrock identical since 1.18): levels below 16 cost `L²+6L`, 16–30 cost `L²−14L+160`, above 30 cost `L²−44L+760`.

## Useful reference

| Goal | Total XP needed |
|---|---|
| Level 30 (top enchanting tier) | 1,395 XP |
| Level 30 → 31 (one more level) | 177 XP |
| Repair + combine at anvil | cost rises per use |

**Tip:** a single level-30 enchant consumes 30 *levels* of your total XP pool — enchanting at high level depletes it fast, so bank XP before big upgrades.

## Common questions

**Does enchanting spend levels or XP?** It spends levels, but each level costs more XP the higher you go, so expensive enchants drain more XP near the top.

**Why does my level not climb evenly?** Each level needs more XP than the last after level 16 — that's the `L²` term kicking in.
