# ChunkScope — Minecraft Tools & Guides

Static site for **www.chunkscope.com** (bare domain 301 → www, HTTPS enforced).
Stack: **Hugo** (static) + **GitHub** (source) + **GitHub Actions** (build) + **Cloudflare Pages** (host/CDN).

## Project layout

```
chunkscope-site/
├── hugo.toml                  # Site config: baseURL www, adsense id, disclaimer, sitemap
├── archetypes/                # Frontmatter templates: tools / guides / seeds / faq / legal
├── content/
│   ├── apps/                  # 4 categories + tool pages (type: tool → tool/single.html)
│   │   ├── world-finders/     #   Seed Map, Ore Finder, Slime Chunk Finder, …
│   │   ├── farm-calculators/  #   Farm Output Calculator (exclusive, JS), …
│   │   ├── creative-tools/
│   │   └── command-tools/
│   ├── guides/                # survival / redstone / farms, version-locked
│   ├── updates/               # Version news (featured on homepage)
│   ├── seeds/                 # Verified seeds with preview colors
│   ├── faq/                   # Troubleshooting Q&A (accordion on homepage)
│   └── legal/                 # About / Privacy / DMCA / Disclaimer / Terms
├── layouts/
│   ├── _default/              # baseof / list / single
│   ├── tool/single.html       # Tool page: breadcrumb, version tabs, ad, JS, related
│   ├── partials/              # head (SEO+JSON-LD) / header / footer / ad
│   └── shortcodes/            # {{< ad "leader|inline|multiplex" >}}
├── static/
│   ├── css/main.css           # Full site stylesheet
│   ├── js/main.js             # Search, FAQ, tabs, newsletter, toast
│   ├── js/tools/              # Per-tool scripts (farm-calculator, nether-portal, …)
│   ├── img/                   # AI pixel-art assets (original, no game assets)
│   ├── robots.txt             # 3 sitemaps referenced
│   └── ads.txt                # Google AdSense (replace pub-XXXXXXXXXXXXXXXX)
└── .github/workflows/deploy.yml  # Push to main → hugo build → Cloudflare Pages
```

## How tools work

Each tool is a Markdown page under `content/apps/<tool>/index.md` with:

- `type: tool` → rendered by `layouts/tool/single.html`.
- `js: "farm-calculator"` → loads `/js/tools/farm-calculator.js`.
- Interactive UI is plain HTML inside the page body; the JS binds to its IDs.
- `featured: true` → shows in homepage "Popular tools".
- `accent: 1-4` → category color on the card.

New tool = copy `archetypes/tools.md`, add UI HTML + a JS file, done.

## Local build

```bash
hugo server -D          # dev server with drafts
hugo --minify --gc      # production build → ./public
```

## Deploy (Cloudflare Pages + GitHub Actions)

1. Create a Cloudflare Pages project named **chunkscope** (or change `--project-name` in the workflow).
2. In GitHub repo **Settings → Secrets → Actions**, add:
   - `CLOUDFLARE_API_TOKEN` (token with Pages edit permission)
   - `CLOUDFLARE_ACCOUNT_ID`
3. Push to `main` — the workflow builds Hugo and deploys to Pages automatically.

## Go-live checklist

- [x] AdSense Publisher ID `pub-3866829862674413` configured in `hugo.toml` + `static/ads.txt`; loader script active in `layouts/partials/head.html`.
- [ ] Create 3 ad units in AdSense (Leaderboard / In-article / Responsive) and paste their `data-ad-slot` values into `layouts/partials/ad.html` (currently placeholder slots render as labeled boxes).
- [ ] Verify domain `chunkscope.com` → Pages project **custom domain `www.chunkscope.com`**, and add a redirect rule for the bare domain (301 → www).
- [ ] Enable HTTPS (always) and Cloudflare's automatic `_headers` / cache rules.
- [ ] Submit the 3 sitemaps (see `static/robots.txt`) in Google Search Console, plus the RSS feed `/index.xml`.
- [ ] Generate the multi-sitemap split (`sitemap-tools.xml`, `sitemap-guides.xml`) via a small `layouts/_default/sitemap.*.xml` once sections grow beyond ~1,000 URLs.

## Content & images

- All pixel-art thumbnails are **AI-generated originals** (kept in `static/img/`) — no Mojang assets, no scraping. Copyright-safe.
- Mojang disclaimer is rendered site-wide in the footer and on legal pages.
- Ads never appear inside interactive tool canvases; legal pages carry no ads.

## Roadmap

- **Phase 1 (this repo)**: English site, all tools, Seeds/Builds/FAQ, growing article library.
- **Phase 2**: Spanish & Portuguese (`[languages]` blocks reserved in `hugo.toml`), hreflang + per-language sitemaps.
