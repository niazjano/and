// scripts/fetchImages.js
// Node 18+ recommended
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUT_DIR = path.join(__dirname, '../assets/images');
const ORIGIN = 'https://www.adrianandsonsgrouplimited.co.uk';

// Pages to scan for images
const PAGES = [
  '/',           // home
  '/contact-us', // adjust if different
  '/projects',   // adjust if different
  '/services',   // adjust if different
  '/about-us'    // adjust if different
];

// Basic allowlist so we only keep useful assets
const ALLOW_PATTERNS = [
  /wp-content\/uploads/,
  /\.(png|jpe?g|webp|svg)(\?|$)/i
];

// Helper to normalise absolute URLs
function abs(url) {
  if (!url) return null;
  try {
    return new URL(url, ORIGIN).toString();
  } catch {
    return null;
  }
}

async function scrapeImageUrls() {
  const urls = new Set();
  for (const p of PAGES) {
    const pageUrl = abs(p);
    try {
      const res = await fetch(pageUrl, { redirect: 'follow' });
      if (!res.ok) { console.warn('Skip', pageUrl, res.status); continue; }
      const html = await res.text();
      const $ = cheerio.load(html);

      // <img src> and srcset candidates
      $('img').each((_, el) => {
        const src = $(el).attr('src');
        const srcset = ($(el).attr('srcset') || '')
          .split(',')
          .map(s => s.trim().split(' ')[0])
          .filter(Boolean);

        [src, ...srcset].forEach(u => {
          const a = abs(u);
          if (a && ALLOW_PATTERNS.some(rx => rx.test(a))) urls.add(a);
        });
      });

      // CSS background images (basic)
      $('[style*="background"]').each((_, el) => {
        const style = ($(el).attr('style') || '');
        const match = style.match(/url\(([^)]+)\)/i);
        if (match) {
          const raw = match[1].replace(/['"]/g, '');
          const a = abs(raw);
          if (a && ALLOW_PATTERNS.some(rx => rx.test(a))) urls.add(a);
        }
      });

    } catch (e) {
      console.warn('Scrape error', pageUrl, e.message);
    }
  }
  return Array.from(urls);
}

function safeName(u) {
  try {
    const { pathname } = new URL(u);
    const base = pathname.split('/').filter(Boolean).slice(-1)[0] || 'image';
    // prefix with short hash for uniqueness
    const h = Buffer.from(u).toString('base64').slice(0,8);
    return `${h}-${base}`.replace(/[^a-z0-9.\-]/gi,'_');
  } catch {
    return `img-${Date.now()}.jpg`;
  }
}

async function download(url, to) {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`Download failed ${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(to, buf);
}

(async () => {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  const list = await scrapeImageUrls();

  console.log(`Found ${list.length} image candidates on official site.`);
  let saved = 0;
  for (const u of list) {
    const fname = safeName(u);
    const fp = path.join(OUT_DIR, fname);
    if (fs.existsSync(fp)) { console.log('Skip existing', fname); continue; }
    try {
      await download(u, fp);
      saved++;
      console.log('Saved', fname);
    } catch (e) {
      console.warn('Failed', u, e.message);
    }
  }
  console.log(`Done. Saved ${saved} new images to /assets/images`);
})();
