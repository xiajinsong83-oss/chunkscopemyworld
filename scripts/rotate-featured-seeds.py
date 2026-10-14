#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Daily: rotate which seeds are featured on the homepage.
Each day the featured flag is reassigned to the next 3 seeds (round-robin by
date), so the homepage Featured seeds section shows fresh picks without manual
editing. Uses only stdlib."""
import datetime, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SEEDS = os.path.join(ROOT, "content", "seeds")
FEATURED_COUNT = 3

def seed_files():
    return sorted(
        os.path.join(SEEDS, fn) for fn in os.listdir(SEEDS)
        if fn.endswith(".md") and fn != "_index.md"
    )

def set_featured(path, on):
    with open(path, encoding="utf-8") as f:
        text = f.read()
    new, n = re.subn(r"^(featured:\s*)(true|false)", r"\g<1>" + ("true" if on else "false"),
                     text, count=1, flags=re.M)
    if n == 0:
        return False  # no featured line; leave untouched
    if new != text:
        with open(path, "w", encoding="utf-8") as f:
            f.write(new)
        return True
    return False

def main():
    files = seed_files()
    if not files:
        print("No seeds found.")
        return
    n = len(files)
    # deterministic day counter so rotation is stable & idempotent per day
    day = (datetime.date.today() - datetime.date(2026, 1, 1)).days
    start = day % n
    featured_idx = {(start + i) % n for i in range(min(FEATURED_COUNT, n))}
    changed = 0
    for i, path in enumerate(files):
        on = i in featured_idx
        if set_featured(path, on):
            changed += 1
            print(("featured" if on else "plain") + "  " + os.path.basename(path))
    print("Changed %d seed file(s)." % changed)

if __name__ == "__main__":
    main()
