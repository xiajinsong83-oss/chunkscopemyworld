---
title: "TNT Cannon Guide: Power, Angle & Range Math"
description: "Build reliable TNT cannons: charge ratio, angle, power cells and the range table for Java & Bedrock."
edition: "Java & Bedrock"
version: "1.21.5"
image: "tnt-explosion.jpg"
featured: true
tags: ["TNT", "Redstone", "PvP"]
relatedTools: []
---
# TNT Cannon Guide: Power, Angle & Range Math

A TNT cannon fires a "shell" TNT using an explosion of "charge" TNT behind it. Range depends on the number of charge blocks and the launch angle.

## The 45° rule

TNT launches farthest at **~45°** launch angle on Java. Each charge block adds roughly **+14 blocks** of range. Power comes from charge count — not from bigger shells.

| Charge TNT | Java range (45°) | Bedrock range (45°) |
|---|---|---|
| 1 | ~32 blocks | ~30 blocks |
| 2 | ~46 blocks | ~44 blocks |
| 3 | ~60 blocks | ~57 blocks |
| 4 | ~74 blocks | ~70 blocks |

## Build steps

1. Build a **trench 2 blocks wide** facing the target; place water in the trench to catch the shell.
2. Place the **charge cells** behind the firing position, one per block of power (1–4 typical).
3. Put the **shell TNT** in front of the charges, on the water.
4. Wire all charges to one button with repeaters at **4-tick delay** so they detonate together.
5. Angle: for maximum range build the barrel at 45° using stairs; for flat shots keep the shell at eye level.

## Common questions

**Why does my cannon destroy itself?** The blast radius reaches back — put 3+ blocks of obsidian between the charges and your base wall, and use water to dampen the rear blast.

**Why is Bedrock range shorter?** Bedrock TNT physics differ slightly (blast momentum is weaker). Add one extra charge block for the same range.

**Can I fire vertically?** Yes — point the barrel up and adjust charges by 2 blocks of range each; useful for anti-base lobs.
