---
title: "Tellraw Command Generator"
description: "Build a colored /tellraw message with bold, italic and clickable run commands — send styled text to all players."
type: tool
editions: ["Java"]
version: "1.21.5"
featured: true
accent: 4
js: "tellraw-generator"
tags: ["Commands", "Tellraw", "JSON", "Chat"]
relatedTools: ["/apps/command-tools/json-text-formatter/"]
---
<div class="tool-ui">
  <div class="row">
    <div><label for="tgText">Message</label><input id="tgText" type="text" placeholder="Welcome to the server!"></div>
    <div>
      <label for="tgColor">Color</label>
      <select id="tgColor">
        <option value="white">White</option>
        <option value="yellow">Yellow</option>
        <option value="gold">Gold</option>
        <option value="green">Green</option>
        <option value="aqua">Aqua</option>
        <option value="blue">Blue</option>
        <option value="light_purple">Light Purple</option>
        <option value="red">Red</option>
      </select>
    </div>
  </div>
  <div class="row">
    <div>
      <label for="tgBold">Bold</label>
      <select id="tgBold"><option value="false" selected>No</option><option value="true">Yes</option></select>
    </div>
    <div>
      <label for="tgClick">On click</label>
      <select id="tgClick">
        <option value="">None</option>
        <option value="run_command">Run command</option>
        <option value="suggest_command">Suggest command</option>
      </select>
    </div>
    <div><label for="tgClickVal">Click value</label><input id="tgClickVal" type="text" placeholder="/help" disabled></div>
  </div>
  <button class="run" type="button" data-run="js">Generate /tellraw</button>
  <div class="tool-result" id="tgResult"></div>
</div>

## How to use

Enter the **message**, pick a **color** and formatting, optionally add a **click action**, then Generate. The result is a valid Java `/tellraw` command you can run or drop in a command block.

## Command format

```
/tellraw @a {"text":"<msg>","color":"<color>","bold":<bool>,"clickEvent":{"action":"<action>","value":"<cmd>"}}
```

## Common questions

**Who does @a target?** All players. Use @p (nearest) or a player name to target one.

**Why does my command need quoting?** The JSON must be one line with escaped quotes — this generator handles the escaping.
