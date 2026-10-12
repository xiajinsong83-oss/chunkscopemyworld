---
title: "Redstone Iron Door Build"
description: "A compact, self-closing iron door with an observer toggle and a pulse generator — 2×3 footprint, zero lag, materials included."
edition: "Java & Bedrock"
version: "1.21.5"
featured: true
image: "redstone-circuit.jpg"
tags: ["Redstone", "Iron door", "Observer", "Build"]
relatedGuides: ["/guides/redstone/observer-piston-guide/"]
---
![Redstone door](/img/redstone-circuit.jpg)

A clean **iron door** that opens with a button and closes itself — no levers stuck on the wall. Uses an **observer** pulse and a short delay.

## Materials

- 1 iron door
- 1 stone button (or pressure plate)
- 2 redstone dust, 1 repeater
- 1 observer (optional auto-close timer)

## Circuit (2×3)

```
[Button] → [Redstone dust] → [Repeater (1 tick)] → [Redstone dust] → [Iron door]
```

1. Place the door, then the button beside it.
2. Run dust from the button to a **repeater** set to 1 tick (the delay keeps the door open a beat).
3. Feed the door from the repeater.
4. (Optional) Add an **observer** facing a block that changes to re-trigger auto-close.

## Troubleshooting

- **Door stays open**: remove the extra dust that's latched it; keep the feed short (<15 blocks).
- **Door won't close**: an iron door needs redstone on both halves or a piston; use the 1-tick repeater to cut the pulse.
- **Lag**: keep observer chains off the main line — they pulse constantly.

## Why this build

It's the **observer + piston/repeater pattern** used in every auto-farm, distilled into a door. Master it and item sorters, cane farms and doors all click into place.
