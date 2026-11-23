const CACHE = 'karten-v1';
const FILES = [
"./",
"index.html",
"cards.js",
"manifest.webmanifest",
"icons/icon-192.png",
"icons/icon-512.png",
"icons/icon-180.png",
"cards/abenteuer.jpg",
"cards/abgrenzen.jpg",
"cards/absicht.jpg",
"cards/anerkennung.jpg",
"cards/authentizitaet.jpg",
"cards/begeisterung.jpg",
"cards/commitment.jpg",
"cards/context.jpg",
"cards/dankbarkeit.jpg",
"cards/dienen.jpg",
"cards/durchbruch.jpg",
"cards/erfolg.jpg",
"cards/erfuellung.jpg",
"cards/erkenntnis.jpg",
"cards/ermaechtigung.jpg",
"cards/erneuerung.jpg",
"cards/erotik.jpg",
"cards/extase.jpg",
"cards/freie-wahl.jpg",
"cards/freizuegigkeit.jpg",
"cards/freude.jpg",
"cards/frieden.jpg",
"cards/fuelle.jpg",
"cards/gelassenheit.jpg",
"cards/geld.jpg",
"cards/genuss.jpg",
"cards/gewinnen.jpg",
"cards/glueckseligkeit.jpg",
"cards/grosszuegigkeit.jpg",
"cards/heiterkeit.jpg",
"cards/hingabe.jpg",
"cards/inspiration.jpg",
"cards/integritaet.jpg",
"cards/klarheit.jpg",
"cards/kommunikation.jpg",
"cards/kooperation.jpg",
"cards/kreativitaet.jpg",
"cards/lebenslust.jpg",
"cards/licht.jpg",
"cards/liebe.jpg",
"cards/luxus.jpg",
"cards/macht.jpg",
"cards/mitgefuehl.jpg",
"cards/musse.jpg",
"cards/potenz.jpg",
"cards/potenzkommunikation.jpg",
"cards/profit.jpg",
"cards/quantensprung.jpg",
"cards/reichtum.jpg",
"cards/respekt.jpg",
"cards/risiko.jpg",
"cards/schoenheit.jpg",
"cards/schoepferkraft.jpg",
"cards/segen.jpg",
"cards/sexualitaet.jpg",
"cards/sinnlichkeit.jpg",
"cards/spiel.jpg",
"cards/spiritualitaet.jpg",
"cards/spontaneitaet.jpg",
"cards/status.jpg",
"cards/stille.jpg",
"cards/synthese.jpg",
"cards/transformation.jpg",
"cards/urheber.jpg",
"cards/verantwortlichkeit.jpg",
"cards/verbundenheit.jpg",
"cards/vergebung.jpg",
"cards/vergnuegen.jpg",
"cards/verschmelzung.jpg",
"cards/vertrauen.jpg",
"cards/vitalitaet.jpg",
"cards/vollstaendigkeit.jpg",
"cards/wahrheit.jpg",
"cards/weisheit.jpg",
"cards/weiterentwicklung.jpg",
"cards/wertschaetzung.jpg",
"cards/wunder.jpg",
"cards/wuerdigen.jpg",
"cards/ziele.jpg",
"cards/zustimmen.jpg",
"cards/zuversicht.jpg"
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const isPage = e.request.mode === 'navigate';
  if (isPage) {
    // network first for the page so updates arrive, cache as fallback (offline)
    e.respondWith(fetch(e.request).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r; })
      .catch(() => caches.match(e.request).then(r => r || caches.match('index.html'))));
  } else {
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
  }
});
