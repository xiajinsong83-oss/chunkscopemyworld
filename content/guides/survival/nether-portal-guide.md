---
title: "Nether Portal Guide: Linking, Co-ordinate Math & Fast Travel"
description: "Build a working Nether portal, learn the 8:1 coordinate rule for linking, and set up a nether highway for fast travel."
edition: "Java & Bedrock"
version: "1.21.5"
image: "nether-portal.jpg"
featured: true
tags: ["Nether", "Portals", "Fast travel", "Survival"]
relatedTools: ["/apps/nether-portal-calculator/"]
---
![Nether portal](/img/nether-portal.jpg)

The Nether is 8× smaller than the Overworld on the horizontal axis — **1 Nether block = 8 Overworld blocks**. That single ratio is the whole trick behind fast travel: build a portal in the Nether and you move 8× faster across the map.

## The 8:1 coordinate rule

- Overworld coords → Nether: **divide X and Z by 8**.
- Nether coords → Overworld: **multiply X and Z by 8**.
- Y stays roughly the same (use your portal's Y for both).

Example: Overworld (800, 64, 800) → Nether (100, 64, 100). Walk 100 blocks in the Nether, re-enter, and you're back at 800.

## Building a working portal

- Minimum frame: **4×5 obsidian** inside, lit with **flint & steel** or fire.
- The portal must fit **within the nether coords** for that region, or it links to a new portal elsewhere.
- Light it, step through, and the Nether portal spawns at the matching 8:1 location.

## Linking two distant bases

1. Build portal A in the Overworld (e.g. your home).
2. Go through; note the Nether coords.
3. Build portal B in the Overworld where you want to travel *to* (divide its coords by 8 = Nether target).
4. In the Nether, walk from A's nether coords toward B's target until you're within 128 blocks, then build portal B's nether-side frame.

When both nether portals are within 128 blocks, they **link to the same Nether portal**, and each overworld portal routes correctly.

## Nether highway tips

- Use **piston-based elevators** or just build a straight tunnel with **glass** and **ice** for ice-boat highways (boats on packed/blue ice are the fastest).
- **Don't build the highway directly on lava** — raised bridges or soul sand areas are safer.
- Bring a **repaired pick** and **gold** (piglin trades); light your route.

## Troubleshooting

- **Portal spawns in the wrong place**: overworld portals >128 blocks apart can share one Nether portal. Break the extra one or move it into range.
- **Can't find your nether exit**: record both sets of coords before you build.

Use the **Nether Portal Calculator** on ChunkScope to convert coords instantly and plan links.
