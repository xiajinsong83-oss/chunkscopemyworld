---
title: "Redstone Basics Guide: Signals, Repeaters & Clocks"
description: "The fundamentals of redstone — how signals travel, how far dust reaches, and how repeaters and comparators build clocks and logic."
edition: "Java & Bedrock"
version: "1.21.5"
image: "redstone-circuit.jpg"
featured: true
tags: ["Redstone", "Signals", "Repeaters", "Basics"]
relatedGuides: ["/guides/redstone/observer-piston-guide/", "/guides/redstone/piston-machine-guide/"]
relatedTools: ["/apps/farm-calculators/repeater-delay-calculator/", "/apps/farm-calculators/comparator-calculator/"]
---
![Redstone circuit](/img/redstone-circuit.jpg)

Redstone is Minecraft's electricity. Before building farms, learn how a signal starts, travels and dies — then you can wire almost anything.

## How signals work

- **Power source** → lever, button, pressure plate, redstone torch, observer.
- **Redstone dust** carries a signal **15 blocks** before it dies (the 16th block gets nothing).
- Signal **strength** 0–15; repeaters and comparators read or boost it.

## The three workhorse blocks

**Redstone repeater**
- Delays the signal by 1–4 redstone ticks (0.1–0.4s) and **boosts** it back to full strength (restarts the 15-block run).
- Directional — signal only flows in the direction it faces.

**Redstone comparator**
- Compares two inputs (compare/subtract) and reads container fullness (0–15).
- Back input vs side input → compare mode (back if back≥side, else 0) or subtract mode.

**Observer**
- Fires a 1-tick pulse when the block in front changes (see the observer guide).

## Building a clock

Loop a **repeater chain back into itself** with a comparator/observer to make a pulse clock:
```
Comparator → repeaters (delay) → back into comparator
```
Period = 2 × total delay. 5 segments at 2 ticks = 2.0s per cycle.

## Wire-saving tips

- Use **dust diagonally** (covers two blocks of range) to save dust.
- Repeaters boost weak signals — put one every ~14 blocks on long runs.
- Hoppers/comparators read containers for analog signal (chest fullness → 0–15).

Use the **Repeater Delay Calculator** and **Comparator Calculator** on ChunkScope to size your timings.
