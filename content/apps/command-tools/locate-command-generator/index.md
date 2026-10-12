---
title: "Locate Command Generator"
description: "Build a /locate command for any structure — village, ancient city, monument and more. Copy-paste coordinates."
type: tool
editions: ["Java", "Bedrock"]
version: "1.21.5"
featured: true
accent: 4
js: "locate-command-generator"
tags: ["Commands", "Locate", "Structures", "Data"]
relatedGuides: ["/apps/structure-finder/"]
relatedTools: ["/apps/command-tools/"]
---
<div class="tool-ui">
  <div class="row">
    <div>
      <label for="lcStruct">Structure</label>
      <select id="lcStruct">
        <option value="village">Village</option>
        <option value="ancient_city">Ancient City</option>
        <option value="trial_chambers">Trial Chambers</option>
        <option value="monument">Ocean Monument</option>
        <option value="mansion">Woodland Mansion</option>
        <option value="stronghold">Stronghold</option>
        <option value="shipwreck">Shipwreck</option>
        <option value="desert_pyramid">Desert Pyramid</option>
        <option value="fortress">Nether Fortress</option>
        <option value="ruined_portal">Ruined Portal</option>
      </select>
    </div>
  </div>
  <button class="run" type="button" data-run="js">Generate /locate</button>
  <div class="tool-result" id="lcResult"></div>
</div>

## How to use

Pick a **structure** and press Generate. The command prints the nearest matching structure's coordinates to chat — walk or teleport there.

## Command format

```
/locate structure minecraft:<structure>
```

## Why use the Structure Finder instead?

`/locate` finds the nearest structure from *your* position and only works in-game. The **Structure Finder** tool finds structures for *any seed* without launching the game — use it to plan a world before you even create it.

## Common questions

**Why "No structure found"?** The structure type must exist in your biome/region, and the search radius has a cap. Retry from a different location.

**Does /locate need cheats?** Yes — cheats must be on (single-player) or you need operator on a server.
