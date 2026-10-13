---
title: "Advanced Redstone Guide: Logic Gates & Counters"
description: "Beyond basics — build AND/OR/NOT gates, RS-latches, item counters and comparator logic for compact, clever machines."
edition: "Java & Bedrock"
version: "1.21.5"
image: "redstone-circuit.jpg"
featured: true
tags: ["Redstone", "Logic gates", "Counters", "Advanced"]
relatedGuides: ["/guides/redstone/redstone-basics-guide/", "/guides/redstone/piston-machine-guide/"]
relatedTools: ["/apps/farm-calculators/comparator-calculator/"]
---
![Redstone circuit](/img/redstone-circuit.jpg)

Once you can wire dust and repeaters, the next step is **logic** — gates that decide when a machine runs. These are the building blocks of compact contraptions.

## The three basic gates

**NOT (inverter)** — a redstone torch on a block
```
Input (weak) → block + torch → inverted output
```

**AND** — two inputs must both be on
```
Input A → repeater → into a block
Input B → dust → same block → torch out
```

**OR** — either input triggers
```
Two dust runs merge into one output
```

## RS-latch (memory)

Two cross-linked torches hold a state:
- **Set** line on → output high and stays; **Reset** line → off.
- Great for a "remember the button press" door or machine.

## Comparator logic

- A **comparator subtract** between two chest signals = an **item counter** (read fullness A−B).
- Feed a chest + hopper line → the comparator outputs how many slots are filled.

## Item counter example

```
[Hopper line] → [Chest] → [Comparator (subtract)] → signal proportional to items
```

Use it to **toggle a machine after N items** — e.g. dispense exactly 8 when a stack passes.

## Wiring tips

- **Keep logic blocks tidy**: one gate per 2×1 area saves space.
- **Repeaters** restore signal after gates; dust runs stay ≤15.
- Test each gate in isolation before chaining — a wrong torch flips the whole machine.

Use the **Comparator Calculator** to compute the subtraction before you build.
