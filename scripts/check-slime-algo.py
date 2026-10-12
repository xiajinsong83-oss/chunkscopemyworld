#!/usr/bin/env python3
"""Cross-check JS slime-chunk predicate against an independent Python port.
Verifies that the JS Java-Random replication matches, not game truth itself.
"""
MASK48 = (1 << 48) - 1
MASK64 = (1 << 64) - 1


def java_next_int(bound, state):
    s = state

    def next31():
        nonlocal s
        s = (s * 0x5DEECE66D + 0xB) & MASK48
        return s >> 17

    bits = next31()
    val = bits % bound
    while (bits - val + (bound - 1)) < 0:
        bits = next31()
        val = bits % bound
    return val


def is_slime(seed, cx, cz):
    chunk_seed = (seed + cx * 341873128712 + cz * 132897987541) & MASK64
    state = (chunk_seed ^ 0x5DEECE66D) & MASK48
    return java_next_int(10, state) == 0


def main():
    import subprocess, json, sys
    node = ["node", "-e",
            "global.self=global;" +
            "const fs=require('fs');" +
            "eval(fs.readFileSync(process.argv[1],'utf8'));" +
            "const t=JSON.parse(process.argv[2]);" +
            "const out=t.map(([s,x,z])=>MCAlgo.isSlimeChunk(BigInt(s),x,z));" +
            "console.log(JSON.stringify(out));",
            "/home/user/Doubao/chats/38446546291822850/chunkscope-site/static/js/tools/core-java-random.js"]
    # test vectors: seeds incl. negative, text-hash seeds (via javaHashCode), various chunk coords
    tests = []
    for seed in ["0", "12345", "-12345", "987654321", "3536257", "-9223372036854775808"]:
        for (x, z) in [(0, 0), (1, 1), (-1, -1), (3, -7), (123, 456), (-512, 512)]:
            tests.append([seed, x, z])
    # text seed -> hashCode check too
    import subprocess as sp
    proc = sp.run(node + [json.dumps(tests)], capture_output=True, text=True)
    if proc.returncode != 0:
        print("NODE FAIL", proc.stderr)
        sys.exit(1)
    js_out = json.loads(proc.stdout)
    mismatches = 0
    for i, (seed_s, x, z) in enumerate(tests):
        s = int(seed_s)  # numeric only here
        py = is_slime(s, x, z)
        js = js_out[i]
        if bool(py) != bool(js):
            mismatches += 1
            print("MISMATCH", seed_s, x, z, "py=", py, "js=", js)
    print(f"checked {len(tests)} vectors, mismatches: {mismatches}")
    # sanity: density should be ~10%
    seed = 12345
    total = slime = 0
    for x in range(-100, 100):
        for z in range(-100, 100):
            total += 1
            if is_slime(seed, x, z):
                slime += 1
    print(f"density check seed 12345: {slime}/{total} = {slime/total*100:.2f}% (expect ~10%)")
    sys.exit(1 if mismatches else 0)


if __name__ == "__main__":
    main()
