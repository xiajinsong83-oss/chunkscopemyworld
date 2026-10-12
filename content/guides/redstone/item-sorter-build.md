---
title: "Item Sorter: Build a 9-Slot Filter in 20 Minutes"
description: "Full redstone item sorter build — hoppers, comparators, redstone dust and the exact wiring for 9 filtered slots."
edition: "Java & Bedrock"
version: "1.21.5"
image: "redstone-circuit.jpg"
featured: true
tags: ["Redstone", "Item sorter", "Storage"]
relatedTools: []
---
# Item Sorter: Build a 9-Slot Filter in 20 Minutes

An item sorter routes every item type into its own chest automatically. The core is the **signal strength trick**: a hopper holding 45 items of one type + 1 filter item outputs signal strength 3, which trips a comparator and locks the next hopper only for that item.

## Materials (per sorter + 1 shared line)

| Item | Amount (9 slots) |
|---|---|
| Hoppers | 20 |
| Chests | 9 double-chests |
| Comparators | 9 |
| Redstone dust | ~30 |
| Redstone repeaters | 9 |
| Solid blocks | ~60 |
| Item to filter per slot | 1 + filler (44 same items) |

## Build steps

1. Lay a **hopper line** along the wall feeding one input chest.
2. For each slot: hopper → **double chest** below, comparator pointing out of the hopper.
3. Put **45 identical items + 1 filter item** (e.g. 46 iron ingots) in the hopper — this sets the magic strength-3 signal.
4. Run a redstone dust line from each comparator **back to a repeater**, feeding the *next* hopper's lock.
5. Each comparator's signal locks the downstream hopper until the slot is full — so only matching items pass.

## How the lock works

- Hopper with 46 items = signal strength **3** → comparator stays on.
- On: the redstone line locks the adjacent hopper (hopper locks when powered) → no item enters.
- The moment the filter hopper holds less than 46 (an item fell into the chest), signal drops to 2 → unlock → the matching item falls in and it re-locks.

## Troubleshooting

- **Items stuck on the line:** the main hopper line is too slow — add repeaters with 1-tick delay and keep the line straight.
- **Wrong items fall through:** your filler isn't 45 — count exactly 45 + 1 filter item per hopper.
- **All chests lock permanently:** a comparator signal is bleeding into the main line — separate the redstone lines with a block gap.
