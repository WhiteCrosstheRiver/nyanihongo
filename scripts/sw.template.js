// Offline cache for the web version. vite.config.ts fills in FILES at build time.
// Each entry is [path, content hash, size, core]. Core files must arrive before the
// app counts as installed; the rest download in the background, smallest first, and
// resume after a dropped connection. Storing by content hash means an update only
// downloads files that really changed.
const FILES = __FILES__;
const CACHE = 'nyanihongo';
const base = new URL('./', self.location.href).href;
const hashOf = new Map(FILES.map(([path, hash]) => [new URL(path, base).href, hash]));
const keyOf = (hash) => new URL(`__h/${hash}`, base).href;
const total = FILES.reduce((n, f) => n + f[2], 0);

async function fetchInto(cache, path, hash) {
  if (await cache.match(keyOf(hash))) return true;
  try {
    const res = await fetch(new URL(path, base).href, { cache: 'no-cache' });
    if (!res.ok) return false;
    // A redirected response cannot answer a page load, so store a clean copy.
    const clean = res.redirected ? new Response(await res.blob(), { headers: res.headers }) : res;
    await cache.put(keyOf(hash), clean);
    return true;
  } catch {
    return false;
  }
}

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    const results = await Promise.all(FILES.filter((f) => f[3]).map(([path, hash]) => fetchInto(cache, path, hash)));
    if (results.includes(false)) throw new Error('core files unavailable');
  })());
});

async function announce(saved, failed) {
  const list = await self.clients.matchAll({ includeUncontrolled: true });
  for (const client of list) client.postMessage({ type: 'offline', saved, total, failed });
}

let filling = null;
async function fillAll() {
  const cache = await caches.open(CACHE);
  const queue = [...FILES].sort((a, b) => a[2] - b[2]);
  let saved = 0;
  let failed = 0;
  const worker = async () => {
    for (let f = queue.shift(); f; f = queue.shift()) {
      if (await fetchInto(cache, f[0], f[1])) saved += f[2]; else failed++;
      await announce(saved, failed);
    }
  };
  await Promise.all([worker(), worker(), worker()]);
}
const fill = () => (filling ??= fillAll().finally(() => { filling = null; }));

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    const keep = new Set(FILES.map((f) => keyOf(f[1])));
    for (const req of await cache.keys()) if (!keep.has(req.url)) await cache.delete(req);
    await self.clients.claim();
  })());
  fill();
});

self.addEventListener('message', (event) => {
  if (event.data === 'fill') event.waitUntil(fill());
});

async function respond(request, url, hash) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(keyOf(hash));
  if (hit) return hit;
  const res = await fetch(url === request.url ? request : url);
  if (res.ok && !res.redirected) await cache.put(keyOf(hash), res.clone());
  return res;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const u = new URL(request.url);
  if (u.origin !== self.location.origin) return;
  const index = new URL('index.html', base).href;
  const plain = u.origin + u.pathname;
  const url = request.mode === 'navigate' || plain === base ? index : plain;
  const hash = hashOf.get(url);
  if (hash) event.respondWith(respond(request, url, hash));
});
