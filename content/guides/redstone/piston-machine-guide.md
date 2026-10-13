---
title: "Piston Machine Guide: Doors, Elevators & Slimestone"
description: "Build with pistons — the 12-block push limit, sticky retraction, slime-block chains and the machines they unlock."
edition: "Java & Bedrock"
version: "1.21.5"
image: "redstone-circuit.jpg"
featured: true
tags: ["Redstone", "Pistons", "Slime", "Machines"]
relatedGuides: ["/guides/redstone/redstone-basics-guide/", "/guides/redstone/observer-piston-guide/"]
relatedTools: []
---
![Piston machine](/img/redstone-circuit.jpg)

Pistons are the muscles of redstone — they push, pull, lift and launch. Master the **push limit** and **slime-block chains** and you can build doors, elevators and entire contraptions.

## Piston rules

- A piston extends 1 block and pushes up to **12 blocks** in a line (or up to 12 blocks before hitting an obstacle).
- A **sticky piston** pulls the block back on retract; a normal piston only pushes.
- Pistons cannot push **bedrock, obsidian, anvils, or more than 12 blocks** — check before wiring.

## The slime-block trick

**Slime blocks** (and honey blocks) stick to many blocks, letting you **chain pistons** to move large structures:

- Piston → slime → blocks: the whole stack moves together.
- Honey blocks pull more than slime (honey also moves players/entities).
- Alternate directions to build **Slimestone** doors and hidden entrances.

## Three machines to build

**1. Automatic door**
```
Sticky pistons push 2-block doors up/down, triggered by pressure plates or observers.
```

**2. Slime elevator**
```
Sticky pistons + slime blocks push you upward in a loop — powered by a clock.
```

**3. Hidden piston door (Slimestone)**
```
Alternating pistons with slime blocks slide a wall in/out; observers trigger the sequence.
```

## Debugging tips

- **Piston won't retract?** The block it pulls may be a non-pushable, or it's at the 12-block limit.
- **Slime block stuck?** Slime blocks won't move when an obstacle is in the path — leave 1 block of clearance.
- Power a piston for **longer than 1 tick** or it won't fully extend (use a repeater/latch).

Start with the automatic door, then the elevator — they teach the same slime-chain logic you'll reuse everywhere.
