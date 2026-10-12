---
title: "Elytra Flight Fuel Calculator"
description: "Estimate how long your firework rockets keep you gliding — how far a stack of fireworks boosts your elytra."
type: tool
editions: ["Java & Bedrock"]
version: "1.21.5"
featured: true
accent: 2
js: "elytra-flight-fuel"
tags: ["Elytra", "Fireworks", "Flight", "Calculators"]
relatedGuides: ["/guides/elytra/elytra-firework-guide/"]
---
<div class="tool-ui">
  <div class="row">
    <div><label for="efFireworks">Firework rockets</label><input id="efFireworks" type="number" min="1" max="256" value="64"></div>
    <div><label for="efDuration">Per rocket boost</label><select id="efDuration"><option value="1.8" selected>≈1.8s (standard)</option><option value="2.0">2s (long)</option></select></div>
  </div>
  <button class="run" type="button" data-run="js">Estimate flight</button>
  <div class="tool-result" id="efResult"></div>
</div>

## How to use

Enter how many **firework rockets** you carry and the boost per rocket, then Estimate. The tool shows total continuous glide time — a rough estimate, since glide speed and terrain vary.

## The estimate

- One standard firework boosts your elytra glide for **≈1.8 seconds** before you need another.
- 1 stack (64) ≈ **115 seconds** of near-continuous flight.
- Use **Flight Duration 1–3** fireworks for stronger/sustained boosts.

## Common questions

**How do I carry them while gliding?** A single firework in the off-hand or hotbar — use it, then switch to a second for the next boost.

**Can I fly forever?** Almost — with enough rockets and flat terrain, flight is limited only by your supply.
