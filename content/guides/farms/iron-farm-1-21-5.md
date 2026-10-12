---
title: "Easy Iron Farm for 1.21.5"
description: "Build a compact 6-villager iron farm with full material list, golem spawn logic and troubleshooting."
edition: "Java & Bedrock"
version: "1.21.5"
image: "iron-farm.jpg"
featured: true
tags: ["Iron", "Farms", "Villagers"]
relatedTools: ["/apps/farm-calculator/"]
---
# Easy Iron Farm for 1.21.5

Iron farms work by spawning iron golems in a village, killing them, and collecting the ingots. In 1.21 the mechanics are unchanged: **3 villagers + beds + workstations**, with a hostile mob scare mechanic to trigger spawns.

## Materials

| Item | Amount |
|---|---|
| Villagers | 6 (2 breeders + 4 workers) |
| Beds | 6 |
| Workstations (barrels/fletchers) | 4–6 |
| Building blocks | ~200 |
| Water buckets | 4 |
| Glass | 12 |
| Hopper + chest | 1 set |
| Lava bucket | 1 (or cactus kill chamber) |

## Build steps

1. Build a **16×12 platform** at Y = 10 (bedrock-proof) with a 2-block water stream on top.
2. Place the villager cells 2 blocks above the stream — 2 villagers per cell, 3 cells.
3. Put beds beside each cell and workstations in front. Villagers must reach them to claim profession.
4. Above the cells, build the **spawn platform** where golems appear (Y = 14–16).
5. Add the kill chamber: lava blades or cactus, then hoppers into a double chest.
6. Watch one golem spawn to confirm, then AFK 12 blocks away.

## Why 6 villagers?

Golem spawn rate scales with village population up to ~10. Six villagers in three cells gives a steady **~700 ingots/hour** without the complexity of a 20-villager hall. Use our [Farm Output Calculator](/apps/farm-calculator/) to scale by AFK time.

## Troubleshooting

- **No golems:** villagers aren't sleeping — give each cell a claimed bed 2 blocks above ground.
- **Slow rates:** too many cats in the spawn area; cats compete with golems for the mob cap.
- **Golems escape:** ensure the spawn platform has no holes bigger than 1 block.
