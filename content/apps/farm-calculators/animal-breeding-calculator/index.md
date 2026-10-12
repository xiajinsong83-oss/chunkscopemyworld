---
title: "Animal Breeding Calculator"
description: "Work out how much food you need to grow your herd, and how long baby animals take to mature — cows, sheep, pigs, chickens and rabbits."
type: tool
editions: ["Java", "Bedrock"]
version: "1.21.5"
featured: true
accent: 2
js: "animal-breeding-calculator"
tags: ["Animals", "Breeding", "Farms", "Food"]
relatedGuides: ["/guides/farms/villager-breeding-farm/"]
---
<div class="tool-ui">
  <div class="row">
    <div>
      <label for="abAnimal">Animal</label>
      <select id="abAnimal">
        <option value="cow">Cow (wheat)</option>
        <option value="sheep">Sheep (wheat)</option>
        <option value="pig">Pig (carrot/potato/beet)</option>
        <option value="chicken">Chicken (seeds)</option>
        <option value="rabbit">Rabbit (carrot/dandelion)</option>
      </select>
    </div>
    <div><label for="abStart">Start count</label><input id="abStart" type="number" min="2" max="64" value="2"></div>
    <div><label for="abTarget">Target count</label><input id="abTarget" type="number" min="2" max="128" value="10"></div>
  </div>
  <button class="run" type="button" data-run="js">Calculate breeding</button>
  <div class="tool-result" id="abResult"></div>
</div>

## How to use

Enter your current herd size and the size you want. The calculator works out how many **babies** you need, how much **food** to feed (two willing adults → one baby), and the **cooldown + growth time** to full herd.

## The numbers

- Breeding two willing adults produces **one baby**.
- Feeding costs **2 food per baby** (both parents need one).
- After breeding, parents wait **5 minutes** before they can breed again.
- Babies take **~20 minutes** to mature (halved if you feed them while young).

**Tip:** keep extra adults spare so breeding isn't blocked by the cooldown — a herd of 8–10 adults breeds far faster than a pair.

## Common questions

**Why won't they breed?** They need food in hand, a valid spawn spot, and the cooldown must be over. Chickens/rabbits also need the right food type.
