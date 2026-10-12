---
title: "Repeater Delay Calculator"
description: "Convert redstone repeater delays (1–4 ticks) into seconds, game ticks and redstone ticks — for timers and clocks."
type: tool
editions: ["Java & Bedrock"]
version: "1.21.5"
featured: true
accent: 3
js: "repeater-delay-calculator"
tags: ["Redstone", "Repeater", "Timing", "Calculators"]
relatedGuides: ["/guides/redstone/observer-piston-guide/"]
---
<div class="tool-ui">
  <div class="row">
    <div>
      <label for="rdDelay">Repeater delay</label>
      <select id="rdDelay">
        <option value="1">1 (fastest)</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4" selected>4 (slowest)</option>
      </select>
    </div>
  </div>
  <button class="run" type="button" data-run="js">Convert delay</button>
  <div class="tool-result" id="rdResult"></div>
</div>

## How to use

Pick the repeater's **delay setting** (1–4) and Convert. The tool shows the delay in redstone ticks, game ticks and seconds.

## The numbers

| Setting | Redstone ticks | Game ticks | Seconds |
|---|---|---|---|
| 1 | 1 | 2 | 0.1 |
| 2 | 2 | 4 | 0.2 |
| 3 | 3 | 6 | 0.3 |
| 4 | 4 | 8 | 0.4 |

A **redstone tick** = 2 game ticks = 0.1 seconds. 20 redstone ticks per second.

## Common questions

**How many repeaters for a 1-second delay?** Ten repeaters at setting 1 (or five at setting 2) = 1 second.

**Do repeaters make clocks?** Yes — chain repeaters in a loop with a comparator or observer for a pulse clock.
