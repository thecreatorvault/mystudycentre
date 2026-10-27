const C='sz-v22',F=['./','index.html','app.html','version.json','manifest.webmanifest','icon-192.png','icon-512.png','pdfjs/pdf.min.mjs','pdfjs/pdf.worker.min.mjs'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==location.origin)return;
if(u.pathname.includes('/pdfjs/')){e.respondWith(caches.match(r).then(x=>x||fetch(r).then(n=>{const c=n.clone();caches.open(C).then(k=>k.put(r,c));return n})));return}
const net=fetch(r,{cache:'no-cache'}).then(n=>{const c=n.clone();caches.open(C).then(k=>k.put(r,c));return n});
e.respondWith(Promise.race([net,new Promise((_,j)=>setTimeout(j,4000))]).catch(()=>caches.match(r,{ignoreSearch:true}).then(x=>x||caches.match('index.html'))))});
