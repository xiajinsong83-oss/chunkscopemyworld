---
title: "Ore Finder"
description: "Interactive ore distribution by Y level — diamond, iron, gold, copper, emerald, redstone, lapis and ancient debris. Java 1.18+ worldgen constants with best mining levels."
type: tool
editions: ["Java", "Bedrock"]
version: "1.21.5"
versions: ["Java"]
featured: true
accent: 1
js: "ore-finder"
tags: ["Ores", "Mining", "Diamond"]
relatedGuides: ["/guides/survival/trial-chambers-guide/"]
---
![Diamond ore cave](/img/ore-diamond.jpg)

The Ore Finder shows exactly **where each ore generates by Y level** for Java 1.18+, so you can pick the best mining layer for diamond, iron, coal, copper, gold, lapis, redstone, emerald and ancient debris — then plan your branch mine around the guaranteed peaks.

<div class="tool-ui" id="oreUi">
  <div class="ore-bar">
    <div class="ore-chips" id="oreChips"></div>
    <label class="chip" style="margin-left:auto"><input type="checkbox" id="oreAll"> Show all ores</label>
  </div>
  <div class="map-wrap" id="oreChartWrap">
    <canvas id="oreChart" aria-label="Ore distribution by Y level"></canvas>
  </div>
  <div class="tool-stats dim" id="oreHover"></div>
  <div class="ore-info" id="oreInfo"></div>
</div>

## How to use

1. Click an **ore** to see its Y-level distribution curve (relative frequency vs. height).
2. **Hover** the chart to read the approximate frequency at any Y layer.
3. The **deepest shaded band** is the deepslate layer (Y < 0) — many ores are densest there.
4. Tick **Show all ores** to compare every peak at once.

## Best Y levels (Java 1.21)

| Ore | Best Y | Range | Notes |
|---|---|---|---|
| Diamond | **-59** | -64 to 16 | Triangular peak, densest at bedrock layer |
| Redstone | **-59** | -64 to 16 | Same band as diamond — mine both together |
| Iron | **15** / 232 | -24 to 320 | Two peaks; 232 in mountains |
| Coal | **96** | 0 to 320 | More coal higher in mountains; none below 0 |
| Copper | **48** | 0 to 96 | Large veins in dripstone caves |
| Gold | **-16** | -64 to 30 | Extra veins in badlands |
| Lapis Lazuli | **0** | -64 to 64 | Widest band of all |
| Emerald | **90** | 0 to 128 | Mountain biomes only |
| Ancient Debris | **15** | 8 to 22 | Nether-exclusive |

## Common questions

**Does Fortune work on deepslate ores?** Yes — fortune multipliers apply identically; deepslate variants are simply denser and deeper (Y < 0).

**Why Y = -59 for diamonds?** Since 1.18 diamond veins are large (up to 10 ore) and most frequent between Y -32 and -64; -59 captures the deepest, densest layer above bedrock. Many players branch-mine at -54 to sit above the worst lava lakes.

**Why do I see more diamonds in caves than digging straight?** Air-exposed veins are only deleted near open air in some distributions — cave walls expose far more blocks per effort. Diamond still peaks in deepslate.
