#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Daily: detect new Minecraft releases/snapshots and emit /updates entries.
Runs inside GitHub Actions (cron). Uses only stdlib (urllib). Never invents
feature content — generated entries are factual (version + type + changelog link)."""
import json, os, re, sys, urllib.request
from datetime import datetime, timezone

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
UPDATES = os.path.join(ROOT, "content", "updates")
MANIFEST = "https://piston-meta.mojang.com/mc/game/version_manifest_v2.json"

def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": "chunkscope-bot/1.0"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode("utf-8"))

def get_frontmatter(path):
    with open(path, encoding="utf-8") as f:
        text = f.read()
    m = re.match(r"^---\n(.*?)\n---", text, re.S)
    fm = {}
    if m:
        for line in m.group(1).splitlines():
            if ":" in line:
                k, v = line.split(":", 1)
                fm[k.strip()] = v.strip().strip('"').strip("'")
    return fm

def published_versions():
    seen = set()
    for fn in os.listdir(UPDATES):
        if fn.endswith(".md"):
            fm = get_frontmatter(os.path.join(UPDATES, fn))
            if "short" in fm:
                seen.add(fm["short"].lower())
    return seen

def slug(ver):
    return re.sub(r"[^a-zA-Z0-9]+", "-", ver.lower()).strip("-") or "update"

def write_entry(ver, kind):
    path = os.path.join(UPDATES, f"{kind}-{slug(ver)}.md")
    if os.path.exists(path):
        return None
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    badge = "Release" if kind == "release" else "Snapshot"
    version_field = ver + (" snapshot" if kind == "snapshot" else "")
    title = ("Minecraft " + ver + " Released") if kind == "release" else ("Minecraft Snapshot " + ver)
    desc = (
        "Minecraft " + ver + " has been released. Auto-detected update; "
        "full notes in the official changelog."
        if kind == "release" else
        "A new Minecraft snapshot (" + ver + ") is out. Auto-detected update; "
        "full notes in the official changelog."
    )
    body = """---
title: "{title}"
description: "{desc}"
badge: "{badge}"
short: "{ver}"
version: "{version_field}"
tags: ["New version"]
featured: false
---
# Minecraft {ver}

A new {kind_label} (**{ver}**) has been detected.

- Type: {badge}
- Detected: {today}
- Official changelog: <https://www.minecraft.net/changelog>

All ChunkScope tools stay aligned with the latest versions. Full guides and
tool updates for {ver} will follow as details are confirmed.
""".format(
        title=title, desc=desc, badge=badge, ver=ver, version_field=version_field,
        kind_label=("release" if kind == "release" else "snapshot"), today=today,
    )
    with open(path, "w", encoding="utf-8") as f:
        f.write(body)
    return path

def main():
    manifest = fetch(MANIFEST)
    latest = manifest.get("latest", {})
    targets = []
    if latest.get("release"):
        targets.append(("release", latest["release"]))
    if latest.get("snapshot"):
        targets.append(("snapshot", latest["snapshot"]))
    published = published_versions()
    created = []
    for kind, ver in targets:
        if ver.lower() not in published:
            p = write_entry(ver, kind)
            if p:
                created.append(p)
    if created:
        print("Created %d update entr(y/ies):" % len(created))
        for p in created:
            print(" ", os.path.basename(p))
    else:
        print("No new versions — up to date.")
    sys.exit(0)

if __name__ == "__main__":
    main()
