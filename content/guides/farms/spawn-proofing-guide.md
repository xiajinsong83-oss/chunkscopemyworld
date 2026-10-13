---
title: "Spawn Proofing Guide: Stop Mobs Spawning in Your Base"
description: "Light level, the mob cap and how to spawn-proof your base and farms so only the mobs you want actually spawn."
edition: "Java & Bedrock"
version: "1.21.5"
image: "guide-spawnproof.jpg"
featured: true
tags: ["Spawning", "Light", "Mob cap", "Farms"]
relatedGuides: ["/guides/redstone/redstone-basics-guide/", "/guides/farms/slime-farm-guide/"]
relatedTools: ["/apps/farm-calculators/mob-cap-calculator/", "/apps/world-finders/spawn-chunk-finder/"]
---
![Spawn proofing](/img/guide-spawnproof.jpg)

# Spawn Proofing Guide

Spawn proofing is making an area **impossible for hostile mobs to spawn**. It's the foundation of every efficient farm and a safe base.

## How hostile mobs spawn

Hostile mobs spawn:
- Where the **light level is 0** (below the spawning threshold; in Java it's block light 0, in Bedrock light level 0 with sky 15+ blocked)
- On solid ground with **enough space** (mobs need specific room sizes)
- Within the **mob cap** (a global limit; overloading it stops all spawning)

## The three ways to spawn-proof

| Method | What it does |
|---|---|
| **Light it up** | Torches, glowstone, lanterns raise light above 0 → no mobs. The classic cheap fix. |
| **Remove spawn space** | Slabs, carpets, transparent blocks or "half-height" floors block spawns. |
| **Use the mob cap** | Fill the global cap with the mobs you want (e.g. your farm) so nothing else spawns nearby. |

## Practical steps for a base

1. **Light every corner**: torches every ~6–8 blocks, plus glowstone/lanterns.
2. **Slab floors** in storage and hallways prevent spawns.
3. **Light caves below** your base (Y levels you'll use) so they don't drain the cap.
4. Keep **unused dark rooms sealed** or lit.

## For farms

Farms need to **remove competitors**: light all surrounding caves so your farm's mobs fill the cap. Our [slime farm guide](/guides/farms/slime-farm-guide/) and [mob cap calculator](/apps/farm-calculators/mob-cap-calculator/) help you tune exactly how many can spawn.
