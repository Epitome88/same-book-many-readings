// Same Book, Many Readings: offline support.
// The page is fetched fresh when online (so updates arrive) and from the cache when offline.
// The Bible texts are large and rarely change, so they're kept in a separate cache and reused.
const VERSION = "8fc67e5c5a";
const SHELL = "sbmr-shell-" + VERSION;
const DATA = "sbmr-data";
const FONTS = "sbmr-fonts";
const SHELL_FILES = ["./", "index.html", "manifest.webmanifest", "icon.svg", "icon-192.png", "icon-512.png", "fonts/KeelSans-Regular.woff2"];
const DATA_FILES = ["data/drdata.gz?v=32e6eb26bb", "data/kjvdata.gz?v=32e6eb26bb"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(SHELL).then(c => c.addAll(SHELL_FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k.startsWith("sbmr-shell-") && k !== SHELL) await caches.delete(k);
    // Drop Bible files from older builds.
    const d = await caches.open(DATA), keep = new Set(DATA_FILES.map(f => new URL(f, self.registration.scope).href));
    for (const r of await d.keys()) if (!keep.has(r.url)) await d.delete(r);
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    if (url.pathname.includes("/data/")) { e.respondWith(cacheFirst(req, DATA)); return; }
    if (req.mode === "navigate") { e.respondWith(networkFirst(req, "index.html")); return; }
    e.respondWith(networkFirst(req));
    return;
  }
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") e.respondWith(staleWhileRevalidate(req, FONTS));
});

async function cacheFirst(req, name) {
  const c = await caches.open(name), hit = await c.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res.ok) c.put(req, res.clone());
  return res;
}
async function networkFirst(req, fallback) {
  const c = await caches.open(SHELL);
  try {
    const res = await fetch(req);
    if (res.ok) c.put(fallback || req, res.clone());
    return res;
  } catch (err) {
    const hit = (await c.match(req, { ignoreSearch: true })) || (fallback && await c.match(fallback));
    if (hit) return hit;
    throw err;
  }
}
async function staleWhileRevalidate(req, name) {
  const c = await caches.open(name), hit = await c.match(req);
  const net = fetch(req).then(res => { if (res.ok || res.type === "opaque") c.put(req, res.clone()); return res; }).catch(() => hit);
  return hit || net;
}
