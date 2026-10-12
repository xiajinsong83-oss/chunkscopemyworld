#!/usr/bin/env python3
"""full-audit.py — scan public/ HTML for broken internal links, missing
images, missing scripts and missing CSS across the whole built site."""
import os, re, sys

PUB = os.path.abspath('public')
ERR = {'links': [], 'images': [], 'scripts': [], 'css': []}
checked_links = set()

def resolve(ref, base):
    ref = ref.split('#')[0].split('?')[0]
    if not ref or ref.startswith(('http:', 'https:', '//', 'mailto:', 'tel:', 'data:', 'javascript:')):
        return None
    if ref.startswith('/'):
        return os.path.normpath(os.path.join(PUB, ref.lstrip('/')))
    return os.path.normpath(os.path.join(base, ref))

def exists(path):
    return os.path.exists(path) or os.path.exists(path + '.html') or os.path.exists(os.path.join(path, 'index.html'))

pages = 0
for root, dirs, files in os.walk(PUB):
    for f in files:
        if not f.endswith('.html'):
            continue
        pages += 1
        p = os.path.join(root, f)
        base = os.path.dirname(p)
        try:
            txt = open(p, encoding='utf-8', errors='ignore').read()
        except Exception:
            continue
        # internal links (a[href] / area)
        for m in re.finditer(r'<a\b[^>]*\bhref=["\']([^"\']+)["\']', txt, re.I):
            t = resolve(m.group(1), base)
            if t is None or t in checked_links:
                continue
            checked_links.add(t)
            if not exists(t):
                ERR['links'].append((p, m.group(1)))
        # images: <img src>, <source srcset>, og:image content
        for m in re.finditer(r'<img\b[^>]*\bsrc=["\']([^"\']+)["\']', txt, re.I):
            t = resolve(m.group(1), base)
            if t is not None and not os.path.exists(t):
                ERR['images'].append((p, m.group(1)))
        for m in re.finditer(r'<source\b[^>]*\bsrcset=["\']([^"\']+)["\']', txt, re.I):
            src = m.group(1).split(',')[0].strip().split(' ')[0]
            t = resolve(src, base)
            if t is not None and not os.path.exists(t):
                ERR['images'].append((p, src))
        for m in re.finditer(r'content=["\']([^"\']+\.(?:png|jpe?g|webp|gif))["\']', txt, re.I):
            t = resolve(m.group(1), base)
            if t is not None and not os.path.exists(t):
                ERR['images'].append((p, m.group(1)))
        # scripts
        for m in re.finditer(r'<script\b[^>]*\bsrc=["\']([^"\']+)["\']', txt, re.I):
            t = resolve(m.group(1), base)
            if t is not None and not os.path.exists(t):
                ERR['scripts'].append((p, m.group(1)))
        # stylesheets
        for m in re.finditer(r'<link\b[^>]*rel=["\']stylesheet["\'][^>]*\bhref=["\']([^"\']+)["\']', txt, re.I):
            t = resolve(m.group(1), base)
            if t is not None and not os.path.exists(t):
                ERR['css'].append((p, m.group(1)))

print(f"Scanned {pages} pages, {len(checked_links)} unique internal links.")
tot = 0
for k, items in ERR.items():
    print(f"  {k}: {len(items)} broken")
    for p, ref in items[:10]:
        print(f"     {os.path.relpath(p, PUB)} -> {ref}")
    tot += len(items)
print("TOTAL issues:", tot)
sys.exit(1 if tot else 0)
