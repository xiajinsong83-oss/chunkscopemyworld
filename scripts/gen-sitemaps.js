/* gen-sitemaps.js — after `hugo`, generate focused section sitemaps from the
   built output: sitemap-tools.xml (/apps/**) and sitemap-guides.xml (/guides/**).
   The main all-site sitemap.xml is produced by Hugo itself. */
const fs = require('fs');
const path = require('path');
const BASE = 'https://www.chunkscope.com';
const PUB = path.join(__dirname, '..', 'public');

const dirs = { tools: [], guides: [] };

function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') || e.name === 'index.xml') continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full);
    else if (e.name.endsWith('.html') || (e.name === 'index.html')) {
      const rel = path.relative(PUB, full).split(path.sep).join('/');
      const relDir = rel === 'index.html' ? '' : rel.replace(/index\.html$/, '').replace(/[^/]+\/index\.html$/, '');
      // Compute URL dir: drop the filename to get a clean directory URL
      const urlDir = rel.endsWith('index.html')
        ? (rel === 'index.html' ? '/' : '/' + rel.slice(0, -'index.html'.length))
        : '/' + rel;
      const url = BASE + urlDir;
      if (urlDir.startsWith('/apps/')) dirs.tools.push(url);
      else if (urlDir.startsWith('/guides/')) dirs.guides.push(url);
    }
  }
}
walk(PUB);

const now = new Date().toISOString().slice(0, 10);
function xml(items) {
  let s = '<?xml version="1.0" encoding="utf-8" standalone="yes"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  for (const u of items) s += `  <url><loc>${u}</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>0.6</priority></url>\n`;
  return s + '</urlset>\n';
}
fs.writeFileSync(path.join(PUB, 'sitemap-tools.xml'), xml(dirs.tools.sort()));
fs.writeFileSync(path.join(PUB, 'sitemap-guides.xml'), xml(dirs.guides.sort()));
console.log('sitemap-tools:', dirs.tools.length, 'urls | sitemap-guides:', dirs.guides.length, 'urls');
