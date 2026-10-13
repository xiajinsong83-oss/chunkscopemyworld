---
title: "Redstone Logic Gates Guide: AND, OR, NOT & Memory"
description: "Build redstone logic gates in Minecraft 1.21 — the AND, OR, NOT, XOR and T-flip-flop builds explained simply, with compact designs."
edition: "Java & Bedrock"
version: "1.21.5"
image: "guide-logicgates.jpg"
featured: true
tags: ["Redstone", "Logic", "Circuits", "Gates"]
relatedGuides: ["/guides/redstone/redstone-basics-guide/", "/guides/redstone/redstone-advanced-guide/"]
relatedTools: ["/apps/farm-calculators/comparator-calculator/", "/apps/farm-calculators/redstone-clock-calculator/"]
---
![Redstone logic gates](/img/guide-logicgates.jpg)

# Redstone Logic Gates Guide

Redstone lets you build real **logic gates** — the same AND / OR / NOT circuits computers use. Master these and you can build automated farms, doors, locks and machines.

## The building blocks

| Gate | Output | Build |
|---|---|---|
| **NOT (inverter)** | 0 when input is 1, 1 when input is 0 | A redstone torch on a block (torch turns off when powered) |
| **OR** | 1 if **any** input is on | Two inputs into the same line |
| **AND** | 1 if **all** inputs are on | Chain NOT gates (two NOTs in series) |
| **XOR** | 1 if inputs **differ** | Classic: two-input XOR using torches/repeaters |

## The core: NOT gate

The **redstone torch on a block** is your inverter. Power a block and the torch turns off; unpower it and the torch lights. Almost every gate is built from inverters and wire.

## AND gate (compact)

Route input A and B into the same torch: when both are powered, the torch turns off → that's a NAND. Add one more inverter to get AND.

## Practical: T-flip-flop (toggle)

A **T-flip-flop** toggles a signal with each pulse — press a button to turn something on, press again to turn it off. Great for lamps and doors.

Need exact timing for your loops and hoppers? Use our [redstone clock calculator](/apps/farm-calculators/redstone-clock-calculator/) and [comparator calculator](/apps/farm-calculators/comparator-calculator/) so signals line up correctly.
