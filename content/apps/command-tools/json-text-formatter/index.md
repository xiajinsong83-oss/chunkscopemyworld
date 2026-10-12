---
title: "JSON Text Formatter"
description: "Convert plain text into Minecraft JSON text components — escape quotes, split lines and add colors for commands and books."
type: tool
editions: ["Java & Bedrock"]
version: "1.21.5"
featured: true
accent: 4
js: "json-text-formatter"
tags: ["Commands", "JSON", "Text", "Data"]
relatedTools: ["/apps/command-tools/tellraw-generator/"]
---
<div class="tool-ui">
  <div class="row">
    <div><label for="jfText">Text (one line per component)</label><textarea id="jfText" rows="5" placeholder="First line&#10;Second line"></textarea></div>
  </div>
  <button class="run" type="button" data-run="js">Format as JSON</button>
  <div class="tool-result" id="jfResult"></div>
</div>

## How to use

Paste text — each line becomes a JSON text component with the quotes properly escaped. Useful for `custom_name`, `lore`, written books and `tellraw` strings.

## Output

Each line is escaped and wrapped as `{"text":"..."}`, with newlines preserved as separate components joined by `\n`. Copy it into any `nbt` or `components` field.

## Example

Input `Hello "world"` → `{"text":"Hello \"world\""}`

## Common questions

**Where does this go?** Into `custom_name`, `lore`, `pages` (books) or `tellraw` JSON. This tool just does the escaping — the surrounding command is yours to build.

**Does it handle special chars?** Quotes and backslashes are escaped; newlines become separate components.
