#!/usr/bin/env python3
"""Cross-check the structure-placement JS module against an independent Python
port of the same game-fact formula (region grid + additive seed + % range).
Verifies implementation consistency, not game truth.
"""
MASK48 = (1 << 48) - 1
MULT = 0x5DEECE66D
ADD = 0xB

STRUCTURES = {
    "village":        (32, 8, 10387312),
    "desert_pyramid": (32, 8, 14357617),
    "monument":       (32, 5, 10387313),
    "mansion":        (80, 20, 10387319),
    "ancient_city":   (24, 8, 20083232),
    "trial_chambers": (34, 8, 84285879),
}


def struct_chunk(seed, regX, regZ, cfg):
    spacing, separation, salt = cfg
    s = (seed & MASK48) + regX * 341873128712 + regZ * 132897987541 + salt
    state = (s & MASK48) ^ MULT
    state = (state * MULT + ADD) & MASK48
    offX = (state >> 17) % (spacing - separation)
    state = (state * MULT + ADD) & MASK48
    offZ = (state >> 17) % (spacing - separation)
    return regX * spacing + offX, regZ * spacing + offZ


def main():
    import json
    import subprocess
    import sys

    node = ["node", "-e",
            "global.self=global;" +
            "const fs=require('fs');" +
            "eval(fs.readFileSync(process.argv[1],'utf8'));" +
            "eval(fs.readFileSync(process.argv[2],'utf8'));" +
            "const t=JSON.parse(process.argv[3]);" +
            "const out=t.map(([s,rx,rz,id])=>{" +
            "const cfg=MCStructures.CONFIG[id];" +
            "const p=MCStructures.structureChunkInRegion(BigInt(s),rx,rz,cfg);" +
            "return [p.x,p.z];});" +
            "console.log(JSON.stringify(out));",
            "/home/user/Doubao/chats/38446546291822850/chunkscope-site/static/js/tools/core-java-random.js",
            "/home/user/Doubao/chats/38446546291822850/chunkscope-site/static/js/tools/core-structures.js"]

    tests = []
    for seed in ["0", "12345", "-12345", "437241185583693582"]:
        for sid, cfg in STRUCTURES.items():
            for (rx, rz) in [(0, 0), (1, -1), (-2, 3), (4, 4)]:
                tests.append([seed, rx, rz, sid])

    proc = subprocess.run(node + [json.dumps(tests)], capture_output=True, text=True)
    if proc.returncode != 0:
        print("NODE FAIL", proc.stderr)
        sys.exit(1)
    js_out = json.loads(proc.stdout)
    mism = 0
    for i, (seed_s, rx, rz, sid) in enumerate(tests):
        py = struct_chunk(int(seed_s), rx, rz, STRUCTURES[sid])
        js = tuple(js_out[i])
        if py != js:
            mism += 1
            print("MISMATCH", seed_s, sid, rx, rz, "py=", py, "js=", js)
    print(f"checked {len(tests)} vectors, mismatches: {mism}")
    sys.exit(1 if mism else 0)


if __name__ == "__main__":
    main()
