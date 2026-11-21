// Browser tests for the built website. Serve the repo root first:
//   python3 -m http.server 8765 &   then   node tests/browser.js http://localhost:8765/
// Set CHROME_PATH to use a particular Chromium; otherwise Playwright's own browser is used.
const {chromium,devices}=require('playwright');const fs=require('fs'),os=require('os'),path=require('path');
const BASE=process.argv[2]||'http://localhost:8765/';
const TABS=["compare","churches","passages","find","lineage","angels","saints","books","notes"];
let failures=0;
const ok=(cond,msg)=>{console.log((cond?'  ok   ':'  FAIL ')+msg);if(!cond)failures++};
async function ctx(b,opts={}){
  const c=await b.newContext(opts);
  await c.route(/fonts\.(googleapis|gstatic)\.com/,r=>r.abort()); // tests shouldn't depend on Google Fonts
  return c;
}
function watch(p){const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|ERR_|net::/.test(m.text()))errs.push(m.text())});return errs}

(async()=>{
const b=await chromium.launch(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{});

console.log('Layout on phone and desktop, light and dark, both Bibles');
for(const ver of ['dr','kjv'])for(const [dev,dark] of [['iPhone 13',false],['iPhone 13',true],['Desktop Chrome',false]]){
  const c=await ctx(b,{...devices[dev],colorScheme:dark?'dark':'light'});
  await c.addInitScript(v=>{try{localStorage.setItem('bibleVersion',v)}catch(e){}},ver);
  const p=await c.newPage();const errs=watch(p);
  await p.goto(BASE);await p.waitForFunction(()=>typeof BIBLE!=="undefined"&&BIBLE,null,{timeout:20000});
  const wide=[];
  for(const t of TABS){
    await p.evaluate(t=>document.querySelector(`.tab[data-tab="${t}"]`).click(),t);await p.waitForTimeout(120);
    if(await p.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth+1))wide.push(t);
  }
  ok(!errs.length&&!wide.length,`${ver} ${dev}${dark?' dark':''}`+(errs.length?` errors: ${errs.join('; ')}`:'')+(wide.length?` sideways scroll on: ${wide.join(', ')}`:''));
  await c.close();
}

console.log('Verse comparisons');
{const c=await ctx(b);const p=await c.newPage();const errs=watch(p);
  await p.goto(BASE+'#passages');await p.waitForTimeout(1500);
  const r=await p.evaluate(()=>({cards:document.querySelectorAll('#passageList article.passage').length,saved:P.length,
    links:[...document.querySelectorAll('#passageList .srcline a')].map(a=>[a.href,a.rel,a.target])}));
  ok(r.cards===r.saved&&r.cards>0,`all ${r.saved} saved passages show`);
  ok(r.links.length>0&&r.links.every(([h,rel,t])=>h.startsWith('https://')&&rel==='noopener noreferrer'&&t==='_blank'),`${r.links.length} source links are https and open safely in a new tab`);
  const t=await p.evaluate(()=>({name:document.querySelector('#today .tdname').textContent,href:document.querySelector('#today .tdlink a').href,
    fq:[...document.querySelectorAll('#passageList article.passage')].find(a=>a.querySelector('.ref').textContent.startsWith('Matthew 26:26')).querySelectorAll('.fathers .fq').length}));
  ok(t.name.length>3&&/^https:\/\/bible\.usccb\.org\/bible\/readings\/\d{6}\.cfm$/.test(t.href),`today's Mass readings card: ${t.name}`);
  ok(t.fq===2,'early Christian writers show on Matthew 26:26');
  ok(!errs.length,'no errors'+(errs.length?': '+errs.join('; '):''));await c.close();}

console.log('Links to a view');
{const c=await ctx(b);
  for(const [h,check] of [['#John-3-16',"fBook.value==='John'&&fCh.value==='3'&&fVs.value==='16'"],['#1-Corinthians-13-8',"fBook.value==='1 Corinthians'"],
      ['#saints/francis',"sCur&&sCur.id==='francis'"],['#compare/salvation',"topic==='salvation'"],['#lineage/peter',"document.querySelector('#lineage .chip[aria-selected=true]').dataset.ap==='peter'"],
      ['#find/Melchizedek',"q2.value==='Melchizedek'"],['#notes',"!document.getElementById('notes').hidden"]]){
    const p=await c.newPage();await p.goto(BASE+h);await p.waitForTimeout(700);
    ok(await p.evaluate(check),`${h} opens the right view`);await p.close();
  }
  const p=await c.newPage();await p.goto(BASE);await p.waitForTimeout(700);
  ok(await p.evaluate(()=>location.hash)==='','a plain visit keeps a plain address');
  await p.click('[data-tab=saints]');await p.evaluate(()=>openSaint(SAINTS.find(s=>s.id==='andrew')));
  ok(await p.evaluate(()=>location.hash)==='#saints/andrew','the address follows navigation');
  await c.close();}

console.log('Notes backup and restore');
{const c=await ctx(b,{acceptDownloads:true});const p=await c.newPage();const errs=watch(p);p.on('dialog',d=>d.accept());
  await p.goto(BASE);await p.evaluate(()=>{localStorage.setItem('mr-notes-v1',JSON.stringify([{id:'a1',title:'Grace',ref:'Romans 3:28',body:'faith',created:1000,updated:2000}]))});
  await p.reload();await p.waitForTimeout(1200);await p.click('[data-tab=notes]');
  const [d]=await Promise.all([p.waitForEvent('download'),p.click('#nExport')]);
  const j=JSON.parse(fs.readFileSync(await d.path(),'utf8'));ok(j.notes.length===1&&j.notes[0].ref==='Romans 3:28','backup file holds the note');
  const f=path.join(os.tmpdir(),'sbmr-notes-test.json');
  fs.writeFileSync(f,JSON.stringify({app:'same-book-many-readings',notes:[{id:'a1',title:'Grace (edited)',ref:'Romans 3:28',body:'x',created:1000,updated:3000},{id:'<x>',title:'<img src=x onerror=alert(1)>',ref:'John 3:16',body:'b',created:5,updated:6},42]}));
  await p.setInputFiles('#nImport',f);await p.waitForTimeout(400);
  await p.setInputFiles('#nImport',f);await p.waitForTimeout(400);
  const titles=await p.$$eval('#nList .nmain b',x=>x.map(e=>e.textContent));
  ok(titles.length===2,'restoring twice adds no duplicates');
  ok(await p.$$eval('#nList img',x=>x.length)===0,'restored text is never treated as code');
  fs.writeFileSync(f,'not a backup');await p.setInputFiles('#nImport',f);await p.waitForTimeout(300);
  ok(/isn't a notes backup/.test(await p.textContent('#nIoMsg')),'a bad file is rejected with a clear message');
  ok(!errs.length,'no errors'+(errs.length?': '+errs.join('; '):''));await c.close();}

console.log('Offline');
{const c=await ctx(b);const p=await c.newPage();
  await p.goto(BASE);await p.waitForFunction(()=>navigator.serviceWorker&&navigator.serviceWorker.controller,null,{timeout:20000}).catch(()=>{});
  await p.waitForFunction(()=>typeof BIBLE!=="undefined"&&BIBLE,null,{timeout:20000});await p.waitForTimeout(500);
  await c.setOffline(true);await p.reload();
  const t=await p.waitForFunction(()=>typeof BIBLE!=="undefined"&&BIBLE&&getVerse("John",3,16),null,{timeout:15000}).then(()=>true).catch(()=>false);
  ok(t,'the page and Bible text open with no connection after one visit');await c.close();}

await b.close();
console.log(failures?`\n${failures} test(s) failed`:'\nAll browser tests passed');process.exit(failures?1:0);
})().catch(e=>{console.error(e);process.exit(1)});
