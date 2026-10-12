---
title: "Server MOTD Builder"
description: "Build a two-line colored server MOTD as JSON — pick colors and text for line 1 and 2. Copy straight into server.properties."
type: tool
editions: ["Java"]
version: "1.21.5"
featured: true
accent: 4
js: "motd-builder"
tags: ["Commands", "MOTD", "Server", "JSON"]
relatedTools: ["/apps/command-tools/json-text-formatter/"]
---
<div class="tool-ui">
  <div class="row">
    <div><label for="mbLine1">Line 1</label><input id="mbLine1" type="text" value="Welcome to our server!"></div>
    <div>
      <label for="mbColor1">Color</label>
      <select id="mbColor1">
        <option value="gold">Gold</option>
        <option value="green">Green</option>
        <option value="aqua">Aqua</option>
        <option value="red">Red</option>
        <option value="white">White</option>
        <option value="light_purple">Light Purple</option>
      </select>
    </div>
  </div>
  <div class="row">
    <div><label for="mbLine2">Line 2</label><input id="mbLine2" type="text" value="Vanilla + plugins"></div>
    <div>
      <label for="mbColor2">Color</label>
      <select id="mbColor2">
        <option value="gray">Gray</option>
        <option value="yellow">Yellow</option>
        <option value="white" selected>White</option>
        <option value="aqua">Aqua</option>
        <option value="green">Green</option>
      </select>
    </div>
  </div>
  <button class="run" type="button" data-run="js">Generate MOTD</button>
  <div class="tool-result" id="mbResult"></div>
</div>

## How to use

Set **line 1** and **line 2** text and colors, then Generate. The tool builds the JSON MOTD value — paste it into `motd=` in `server.properties`.

## MOTD format

```
motd={"text":"<line1>","color":"<color>"}\n{"text":"<line2>","color":"<color>"}
```

## Common questions

**How do I add a newline?** Use `\n` between the two components (this generator joins them with `\n`).

**Does Bedrock support it?** Bedrock uses a different MOTD format (text-only, section-color codes). This targets Java servers.
