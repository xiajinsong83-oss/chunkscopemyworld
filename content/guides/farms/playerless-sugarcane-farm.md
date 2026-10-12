---
title: "Playerless Sugarcane Farm"
description: "AFK-free sugarcane design that keeps growing while you explore the world."
edition: "Java & Bedrock"
version: "1.21.5"
image: "sugarcane-farm.jpg"
featured: true
tags: ["Sugarcane", "Farms", "AFK-free"]
relatedTools: ["/apps/farm-calculator/"]
---
# Playerless Sugarcane Farm

Sugarcane grows with a simple rule: a new cane appears every **16 random ticks (~18 seconds)** while the plant is next to water on sand or dirt. "Playerless" means the farm keeps producing while you're anywhere in the loaded area — no AFK spot required.

## Design (6-row)

| Item | Amount |
|---|---|
| Sand or dirt | 54 (6 rows × 9) |
| Water source blocks | 18 |
| Observers + pistons | 18 each |
| Hoppers + chests | 1 line |
| Redstone dust | ~20 |

## Build steps

1. Lay 6 rows of sand, each 9 long, with a water trench between rows.
2. Place an observer facing each cane position and a piston above it.
3. When the cane grows to 3 blocks, the observer fires, the piston breaks the top 2 — they drop into the water.
4. Water flows into a hopper line feeding one chest.
5. Keep the farm inside your **simulation distance** (6 chunks Bedrock, 8 Java).

## Output

Each cane produces ~4–5 per hour, so a 54-cane farm yields **~2,160/hour** — enough for unlimited books, maps and rockets. Scale up by copying rows; the calculator shows totals for any AFK window.
