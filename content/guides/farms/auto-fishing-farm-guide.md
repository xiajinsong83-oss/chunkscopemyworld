---
title: "Automatic Fishing Farm Guide: AFK Fishing in 1.21"
description: "Build an automatic fishing farm that catches fish, enchanted books and treasure while you're AFK — redstone, noteblock and the best 1.21 design."
edition: "Java & Bedrock"
version: "1.21.5"
image: "guide-fishing.jpg"
featured: true
tags: ["Fishing", "AFK", "Farm", "Enchanting"]
relatedGuides: ["/guides/redstone/redstone-basics-guide/", "/guides/survival/enchanting-guide/"]
relatedTools: ["/apps/farm-calculators/item-sorter-calculator/"]
---
![Automatic fishing farm](/img/guide-fishing.jpg)

# Automatic Fishing Farm Guide

An **automatic fishing farm** casts and reels the rod for you, catching **fish, enchanted books, treasure (name tags, saddles, enchanted bows)** while you're AFK — one of the easiest passive XP and loot sources.

## How it works

The farm uses a **noteblock** above water. When the fishing bobber hits the water, a redstone circuit detects it, reels the line, and re-casts automatically. The rod stays enchanted with **Lure + Luck of the Sea** for faster, better catches.

## Core build

1. Dig a **1×2 pit** filled with water.
2. Place a **noteblock** 2 blocks above the water.
3. Aim your rod at the noteblock and throw — the bobber lands in the water.
4. Wire a **redstone clock** (repeater-based) to right-click the rod when the bobber splashes.

Because timing matters, most designs use a **repeater delay** tuned so the farm only reels when there's a catch.

## Improving the farm

- **AFK spot**: stand still within reach — the farm works fully unattended.
- **Enchant the rod**: Lure III + Luck of the Sea III dramatically boost catches and treasure.
- **Sort the loot**: feed catches into hoppers and our [item sorter calculator](/apps/farm-calculators/item-sorter-calculator/) to separate books, fish and treasure.

## Rewards

Automatic XP, cooked fish, enchanted books (great for [enchanting](/guides/survival/enchanting-guide/)) and rare treasure without any mining or mob fighting.
