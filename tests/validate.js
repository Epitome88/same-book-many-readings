// Checks the content in src/data before anything is merged.
//   node tests/validate.js                     check the current files
//   node tests/validate.js --base origin/main  also compare against another version and flag removed content
const fs=require('fs'),path=require('path'),vm=require('vm'),zlib=require('zlib'),{execFileSync}=require('child_process');
const ROOT=path.join(__dirname,'..');
const ORDER=['topics','traditions','passages','sources','parables','lineage','angels','saints','other-books','church-tree','apostles','fathers','checked','studies','jewish'];
const EXPORTS=['TOPICS','T','P','CSRC','PARABLES','LINE','ANG_RANKS','ANG_NAMED','DEM_RANKS','DEM_NAMED','SAINTS','XB_CATS','XBOOKS','RSRC','READ','NOREAD','FT','APOSTLES','FATHERS','CHECKED','STUDIES','JEWISH'];
const errors=[],warnings=[];
const err=(where,msg)=>errors.push(`${where}: ${msg}`);

function load(readFile){
  const known=fs.readdirSync(path.join(ROOT,'src/data')).filter(f=>f.endsWith('.js')).map(f=>f.slice(0,-3));
  const extra=known.filter(f=>!ORDER.includes(f));
  if(extra.length)err('src/data',`unknown file(s) ${extra.join(', ')}: add them to src/app.js and to ORDER in tests/validate.js`);
  let code=ORDER.map(f=>readFile(`src/data/${f}.js`)??'').join('\n;\n');
  code+=`\n;this.__out={${EXPORTS.map(e=>`${e}:typeof ${e}!=="undefined"?${e}:undefined`).join(',')}};`;
  const ctx={};vm.createContext(ctx);vm.runInContext(code,ctx,{timeout:5000});
  return ctx.__out;
}
const cur=load(f=>fs.readFileSync(path.join(ROOT,f),'utf8'));

// Books, from the app code.
const app=fs.readFileSync(path.join(ROOT,'src/app.js'),'utf8');
const BOOKS=vm.runInNewContext('('+app.match(/const BOOKS=(\{[\s\S]*?\n\});/)[1]+')');
const ALL_BOOKS=new Set(Object.values(BOOKS).flat());
const B66=[...BOOKS['Old Testament'],...BOOKS['New Testament']];
const DEUT=app.match(/const DEUT=(\[[^\]]*\])/)[1];const DEUTB=JSON.parse(DEUT);
const bible=n=>JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(ROOT,'data',n+'.gz'))));
const KJV=bible('kjvdata'),DR=bible('drdata').t;
function verseExists(book,ch,v){
  let i=B66.indexOf(book);
  if(i>=0&&KJV[i]&&KJV[i][ch-1]&&KJV[i][ch-1][v-1])return true;
  if(i<0)i=66+DEUTB.indexOf(book);
  return !!(i>=0&&DR[i]&&DR[i][ch-1]&&DR[i][ch-1][v-1]);
}
function parseRef(r){const m=String(r).match(/^(.+?) (\d+):(\d+)(?:[-–](\d+))?$/);return m&&{book:m[1],ch:+m[2],v1:+m[3],v2:+(m[4]||m[3])}}

// 1. Nothing in the content can run code or sneak in markup.
(function walk(x,where){
  if(typeof x==='string'){
    if(/<\s*[a-z!\/]/i.test(x))err(where,'contains HTML; write plain text instead');
    if(/javascript:|data:text\/html|vbscript:/i.test(x))err(where,'contains a script link');
    if(/^https?:\/\//.test(x)&&!x.startsWith('https://'))err(where,`link must use https: ${x}`);
  }else if(Array.isArray(x))x.forEach((y,i)=>walk(y,`${where}[${i}]`));
  else if(x&&typeof x==='object')for(const k in x)walk(x[k],`${where}.${k}`);
})(Object.fromEntries(Object.entries(cur).filter(([k])=>k!=='RSRC')),'data');

// 2. Traditions and topics.
const tids=new Set();
(cur.T||[]).forEach((t,i)=>{if(!t.id)err(`traditions[${i}]`,'missing id');if(tids.has(t.id))err(`traditions ${t.id}`,'duplicate id');tids.add(t.id)});
const topicIds=new Set((cur.TOPICS||[]).map(t=>t.id));
(cur.T||[]).forEach(t=>topicIds.forEach(tp=>{if(!(tp in t))warnings.push(`traditions ${t.id}: no text for topic "${tp}"`)}));

// 3. Passages: refs resolve, readings name real traditions, sources point at real documents.
const seen=new Set();
(cur.P||[]).forEach((p,i)=>{
  const w=`passages ${p.ref||'#'+i}`;
  const r=parseRef(p.ref);
  if(!r){err(w,'ref must look like "John 3:16" or "John 3:16-18"');return}
  if(!ALL_BOOKS.has(r.book))err(w,`unknown book "${r.book}"`);
  for(let v=r.v1;v<=r.v2;v++)if(!verseExists(r.book,r.ch,v))err(w,`verse ${r.book} ${r.ch}:${v} isn't in the KJV or Douay-Rheims text`);
  if(seen.has(p.ref))err(w,'this passage is listed twice');seen.add(p.ref);
  if(!Array.isArray(p.r)||!p.r.length)err(w,'needs at least one reading');
  (p.r||[]).forEach((x,j)=>{
    if(!x.who||!x.t)err(`${w} reading ${j+1}`,'needs who and t');
    (x.ids||[]).forEach(id=>{if(!tids.has(id))err(`${w} reading ${j+1}`,`unknown tradition id "${id}"`)});
    (x.s||[]).forEach(s=>{const d=cur.CSRC[s[0]]&&cur.CSRC[s[0]].docs[s[1]];if(!d)err(`${w} reading ${j+1}`,`source ${s[0]}/${s[1]} isn't listed in src/data/sources.js`)});
  });
});

// 4. Church sources.
for(const [id,c] of Object.entries(cur.CSRC||{})){
  if(!tids.has(id))err(`sources ${id}`,'not a tradition id');
  for(const [k,d] of Object.entries(c.docs||{}))if(!Array.isArray(d)||typeof d[0]!=='string'||(d[1]!==null&&typeof d[1]!=='string'))err(`sources ${id}.${k}`,'should be ["Title", "https://..."] or ["Title", null]');
  for(const [topic,list] of Object.entries(c))if(topic!=='docs')(list||[]).forEach(x=>{if(!x.note&&!(c.docs||{})[x[0]])err(`sources ${id}.${topic}`,`cites unknown document "${x[0]}"`)});
}

// 5. Saints, books outside the Bible, church tree, apostles: ids unique.
const uniq=(list,key,name)=>{const s=new Set();(list||[]).forEach((x,i)=>{const v=x&&x[key];if(v===undefined)return;if(s.has(v))err(`${name} ${v}`,'duplicate id');s.add(v)})};
uniq(cur.SAINTS,'id','saints');uniq(cur.XBOOKS,'id','books outside the Bible');uniq(cur.FT,'id','church tree');uniq(cur.APOSTLES,'id','apostles');
(cur.SAINTS||[]).forEach(x=>(x.refs||[]).forEach(r=>{const p=parseRef(r);if(!p||!ALL_BOOKS.has(p.book))err(`saints ${x.id}`,`bad Bible reference "${r}"`)}));

// 5b. Early Christian writers: keyed to real passages, complete entries.
for(const [ref,list] of Object.entries(cur.FATHERS||{})){
  if(!(cur.P||[]).some(p=>p.ref===ref))err(`fathers ${ref}`,'not a passage in src/data/passages.js');
  list.forEach((f,i)=>['who','when','work','tr','url','q'].forEach(k=>{if(!f[k])err(`fathers ${ref} #${i+1}`,`missing ${k}`)}));
}

// 5b2. Bible studies: verse links resolve, related passages exist, sources are complete.
const sids=new Set();
(cur.STUDIES||[]).forEach((st,i)=>{
  const w=`studies ${st.id||'#'+i}`;
  if(!st.id||!/^[a-z0-9-]+$/.test(st.id))err(w,'id must be lowercase letters, numbers and dashes');
  if(sids.has(st.id))err(w,'duplicate id');sids.add(st.id);
  ['title','intro'].forEach(k=>{if(!st[k])err(w,`missing ${k}`)});
  (st.passages||[]).forEach(r=>{if(!(cur.P||[]).some(p=>p.ref===r))err(w,`related passage "${r}" isn't in passages.js`)});
  (st.sections||[]).forEach(sec=>(sec.p||[]).forEach(t=>{
    for(const m of t.matchAll(/\{([^{}]+)\}/g)){const r=parseRef(m[1]);if(!r||!ALL_BOOKS.has(r.book)){err(w,`bad verse link {${m[1]}}`);continue}
      for(let v=r.v1;v<=r.v2;v++)if(!verseExists(r.book,r.ch,v))err(w,`{${m[1]}}: ${r.book} ${r.ch}:${v} isn't in the Bible text`)}
  }));
  if(!(st.sources||[]).length)err(w,'needs sources');
});

// 5b3. Jewish Tradition tab: verse links resolve, every entry has sources, study sub-tabs point at real studies.
const verseLinks=(w,t)=>{for(const m of String(t).matchAll(/\{([^{}]+)\}/g)){const r=parseRef(m[1]);if(!r||!ALL_BOOKS.has(r.book)){err(w,`bad verse link {${m[1]}}`);continue}
  for(let v=r.v1;v<=r.v2;v++)if(!verseExists(r.book,r.ch,v))err(w,`{${m[1]}}: ${r.book} ${r.ch}:${v} isn't in the Bible text`)}};
const jids=new Set();
(cur.JEWISH||[]).forEach((sec,i)=>{
  const w=`jewish ${sec.id||'#'+i}`;
  if(!sec.id||!/^[a-z0-9-]+$/.test(sec.id))err(w,'id must be lowercase letters, numbers and dashes');
  if(jids.has(sec.id))err(w,'duplicate id');jids.add(sec.id);
  if(!sec.n)err(w,'missing n (the sub-tab label)');
  if(sec.study){if(!(cur.STUDIES||[]).some(s=>s.id===sec.study))err(w,`study "${sec.study}" isn't in studies.js`);return}
  if(!sec.intro)err(w,'missing intro');
  (sec.items||[]).forEach((it,j)=>{const ww=`${w} item ${it.h||j+1}`;
    if(!it.h||!(it.t||[]).length)err(ww,'needs h and t');
    (it.t||[]).forEach(t=>verseLinks(ww,t));if(it.xn)verseLinks(ww,it.xn);
    if(!(it.src||[]).length)err(ww,'needs at least one source');
    (it.src||[]).forEach(s=>{if(!Array.isArray(s)||!s[0]||!/^https:\/\//.test(s[1]||''))err(ww,'each source should be ["Title", "https://..."]')});
  });
});

// 5c. Last-checked dates: real dates, flagged when more than a year old.
for(const [tab,iso] of Object.entries(cur.CHECKED||{})){
  const t=Date.parse(iso+'T00:00:00Z');
  if(!/^\d{4}-\d{2}-\d{2}$/.test(iso)||isNaN(t))err(`checked ${tab}`,`"${iso}" should be a date like 2026-11-21`);
  else if(t>Date.now()+864e5)err(`checked ${tab}`,`${iso} is in the future`);
  else if(Date.now()-t>365*864e5)warnings.push(`the ${tab} tab was last checked on ${iso}, over a year ago: time to re-verify it`);
}

// 6. Compare with the base version: flag anything removed.
const bi=process.argv.indexOf('--base');
const counts=o=>({traditions:(o.T||[]).length,passages:(o.P||[]).length,readings:(o.P||[]).reduce((n,p)=>n+(p.r||[]).length,0),'source documents':Object.values(o.CSRC||{}).reduce((n,c)=>n+Object.keys(c.docs||{}).length,0),saints:(o.SAINTS||[]).length,parables:(o.PARABLES||[]).length,'lineage names':JSON.stringify(o.LINE||[]).split('"n":').length-1,'angels and demons':(o.ANG_NAMED||[]).length+(o.DEM_NAMED||[]).length,'books outside the Bible':(o.XBOOKS||[]).length,'church tree branches':(o.FT||[]).length,apostles:(o.APOSTLES||[]).length,studies:(o.STUDIES||[]).length,'Jewish tradition entries':(o.JEWISH||[]).reduce((n,s)=>n+(s.items||[]).length,0),'early Christian quotations':Object.values(o.FATHERS||{}).reduce((n,l)=>n+l.length,0)});
const now=counts(cur);
let removed=[];
if(bi>0){
  const base=process.argv[bi+1];
  let old=null;
  try{old=load(f=>{try{return execFileSync('git',['show',`${base}:${f}`],{cwd:ROOT,encoding:'utf8',stdio:['ignore','pipe','ignore'],maxBuffer:64*1024*1024})}catch(e){return null}})}catch(e){warnings.push(`couldn't read ${base} to compare: ${e.message}`)}
  if(old){const was=counts(old);for(const k in was)if(now[k]<was[k])removed.push(`${k}: ${was[k]} → ${now[k]}`)}
}

console.log('Content:',Object.entries(now).map(([k,v])=>`${v} ${k}`).join(', '));
warnings.forEach(w=>console.log('note:',w));
if(removed.length){console.log('\nThis change REMOVES content:\n  '+removed.join('\n  ')+'\nRemovals need the maintainer\'s explicit approval. If this is intended, explain why in the pull request.');}
if(errors.length){console.log(`\n${errors.length} problem(s):\n  `+errors.join('\n  '));}
process.exit(errors.length||removed.length?1:0);
