import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const distDir = path.join(root, 'dist');
const serverDir = path.join(root, 'dist-server');

const { render } = await import(pathToFileURL(path.join(serverDir, 'entry-server.js')).href);
const { SITE_URL, canonicalUrl, pageMeta, pageRoutes } = await import(
  pathToFileURL(path.join(root, 'src', 'routes.js')).href
);

const template = await readFile(path.join(distDir, 'index.html'), 'utf8');

const escapeAttr = (value) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function replaceTag(html, pattern, replacement) {
  if (!pattern.test(html)) throw new Error(`Template is missing ${pattern}`);
  return html.replace(pattern, replacement);
}

for (const [page, route] of Object.entries(pageRoutes)) {
  const meta = pageMeta[page];
  const url = canonicalUrl(page);
  const title = escapeAttr(meta.title);
  const description = escapeAttr(meta.description);

  let html = template;
  html = replaceTag(html, /<title>.*?<\/title>/s, `<title>${title}</title>`);
  html = replaceTag(html, /(<meta name="description" content=")[^"]*(")/, `$1${description}$2`);
  html = replaceTag(html, /(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
  html = replaceTag(html, /(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`);
  html = replaceTag(html, /(<meta property="og:title" content=")[^"]*(")/, `$1${title}$2`);
  html = replaceTag(html, /(<meta property="og:description" content=")[^"]*(")/, `$1${description}$2`);
  html = replaceTag(html, /(<meta name="twitter:title" content=")[^"]*(")/, `$1${title}$2`);
  html = replaceTag(html, /(<meta name="twitter:description" content=")[^"]*(")/, `$1${description}$2`);
  html = replaceTag(html, /<div id="root"><\/div>/, () => `<div id="root">${render(route)}</div>`);

  const outDir = route === '/' ? distDir : path.join(distDir, route);
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, 'index.html'), html);
  console.log(`prerendered ${route}`);
}

const lastmod = new Date().toISOString().slice(0, 10);
const urls = Object.keys(pageRoutes)
  .map((page) => `  <url>\n    <loc>${canonicalUrl(page)}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`)
  .join('\n');
await writeFile(
  path.join(distDir, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);

await rm(serverDir, { recursive: true, force: true });
console.log(`sitemap written for ${SITE_URL}`);
