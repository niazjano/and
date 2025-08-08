// scripts/fetchImages.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ORIGIN = 'https://www.adrianandsonsgrouplimited.co.uk';
const OUT_DIR = path.join(__dirname, '../assets/images');
const PAGES = ['/', '/projects', '/services', '/about-us', '/contact-us'];

const ALLOW = [/wp-content\/uploads/i, /\.(png|jpe?g|webp|svg)(\?|$)/i];

const abs = (u) => { try { return new URL(u, ORIGIN).toString(); } catch { return null; } };
const fname = (u) => {
  const { pathname } = new URL(u);
  const base = pathname.split('/').pop() || 'image.jpg';
  const h = Buffer.from(u).toString('base64').slice(0,8);
  return `${h}-${base}`.replace(/[^a-z0-9.\-]/gi, '_');
};

async function collect() {
  const urls = new Set();
  for (const p of PAGES) {
    try {
      const res = await fetch(abs(p), { redirect: 'follow' });
      if (!res.ok) continue;
      const $ = cheerio.load(await res.text());
      $('img').each((_, el) => {
        const src = $(el).attr('src');
        const srcset = ($(el).attr('srcset') || '').split(',').map(s => s.trim().split(' ')[0]);
        [src, ...srcset].forEach(u => {
          const a = abs(u);
          if (a && ALLOW.some(rx => rx.test(a))) urls.add(a);
        });
      });
    } catch {}
  }
  return Array.from(urls);
}

async function download(u, out) {
  const r = await fetch(u, { redirect: 'follow' });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  fs.writeFileSync(out, Buffer.from(await r.arrayBuffer()));
}

(async () => {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  const list = await collect();
  let saved = 0;
  for (const u of list) {
    const fp = path.join(OUT_DIR, fname(u));
    if (fs.existsSync(fp)) continue;
    try { await download(u, fp); saved++; } catch {}
  }
  console.log(`Saved ${saved} images to /assets/images`);
})();
