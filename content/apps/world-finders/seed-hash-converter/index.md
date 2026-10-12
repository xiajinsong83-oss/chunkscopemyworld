---
title: "Seed Hash Converter"
description: "Convert a text seed into its numeric Java seed (String.hashCode) — or read a numeric seed — to use in tools and servers."
type: tool
editions: ["Java & Bedrock"]
version: "1.21.5"
featured: true
accent: 1
js: "seed-hash-converter"
tags: ["Seeds", "Hash", "Data", "Calculators"]
relatedTools: ["/apps/seed-map/"]
---
<div class="tool-ui">
  <div class="row">
    <div><label for="shcSeed">Text or numeric seed</label><input id="shcSeed" type="text" inputmode="text" placeholder="hello" value="hello"></div>
  </div>
  <button class="run" type="button" data-run="js">Convert</button>
  <div class="tool-result" id="shcResult"></div>
</div>

## How to use

Enter any **text seed** and Convert. The tool shows the numeric Java seed computed by `String.hashCode()` — the value your tools and servers actually use.

## How text seeds work

Java (and Bedrock 1.18+) converts text seeds with **`String.hashCode()`**, giving a signed 32-bit number. The world generation uses that number, so `"hello"` and its numeric value produce the **same world**.

## Example

`"hello"` → `99162322`. A numeric seed is used as-is.

## Common questions

**Is the numeric seed different from the text?** No — the numeric value *is* the seed; the text is just a friendlier way to enter it.

**Can I convert back?** Not uniquely — many strings hash to the same number; keep the number if you need it elsewhere.
