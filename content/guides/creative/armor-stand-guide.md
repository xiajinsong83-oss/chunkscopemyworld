---
title: "Armor Stand Guide: Pose, Decorate & Build with Armor Stands"
description: "How to place, pose and decorate armor stands in Minecraft 1.21 — make a display, or use commands to freeze poses for builds and art."
edition: "Java & Bedrock"
version: "1.21.5"
image: "guide-armorstand.jpg"
featured: true
tags: ["Armor stand", "Decoration", "Commands", "Building"]
relatedGuides: ["/guides/creative/banner-pattern-guide/"]
relatedTools: ["/apps/creative-tools/armor-stand-poser/"]
---
![Armor stand](/img/guide-armorstand.jpg)

# Armor Stand Guide

**Armor stands** hold armor and equipment, but with a little work they become decoration, mannequins, and even animation props. They're the backbone of detailed builds.

## Basic use

- **Place** an armor stand (Java: `minecraft:armor_stand`).
- Right-click and put on armor / a head / tools.
- Sneak + right-click to **rotate** the body (and arms on Java).

## Posing with commands (Java)

The full power comes from the **pose NBT**. Use `data merge entity` to freeze arms, head, body and legs:

```
/data merge entity @e[type=armor_stand,sort=nearest,limit=1] {Pose:{Head:[0f,-30f,0f],RightArm:[-90f,0f,0f]}}
```

- Angles are in degrees; negative pitches arms up.
- **Invisible** (`{Invisible:1b}`) plus a head = floating head/boss display.
- **Arms enabled** (`{ShowArms:1b}`) gives the stand arms to hold tools.

## Decoration ideas

- **Mannequins** in shops showing armor sets.
- **Guard statues** with arms down, holding swords.
- **Floating props** using invisible stands.
- **Dioramas** in bases and museum rooms.

Design your pose visually before you spend time in-game — preview every arm/head/body angle with our [armor stand poser](/apps/creative-tools/armor-stand-poser/).
