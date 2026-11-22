//@include calendar.js
//@include data/checked.js
//@include data/topics.js

//@include data/traditions.js

//@include data/passages.js
//@include data/fathers.js
//@include data/studies.js
//@include data/jewish.js

const byId = Object.fromEntries(T.map(t=>[t.id,t]));
const el = (tag,attrs={},html="")=>{const e=document.createElement(tag);for(const k in attrs){if(k==="style")e.style.cssText=attrs[k];else e.setAttribute(k,attrs[k])}if(html)e.innerHTML=html;return e};

// Ribbons in header
const rib=document.getElementById("ribbons");
T.forEach((t,i)=>{const r=el("div",{class:"ribbon",style:`--c:${t.c};height:${58+((i*37)%34)}px;animation-delay:${i*45}ms`});rib.appendChild(r)});

// Tabs
document.querySelectorAll(".tab").forEach(b=>b.addEventListener("click",()=>{
  document.querySelectorAll(".tab").forEach(x=>x.setAttribute("aria-selected",x===b));
  document.querySelectorAll(".tab").forEach(t=>{const sec=document.getElementById(t.dataset.tab);if(sec)sec.hidden=t.dataset.tab!==b.dataset.tab});
  {const bar=b.parentElement;if(bar&&bar.scrollWidth>bar.clientWidth){const r=b.getBoundingClientRect(),br=bar.getBoundingClientRect();if(r.left<br.left||r.right>br.right)bar.scrollLeft+=r.left-br.left-(br.width-r.width)/2}}
  window.scrollTo({top:document.querySelector("nav").offsetTop,behavior:"instant"});
}));

// Compare
let topic="authority";
const active=new Set(T.map(t=>t.id));
const topicChips=document.getElementById("topicChips");
TOPICS.forEach(tp=>{
  const b=el("button",{class:"chip","aria-pressed":tp.id===topic},tp.label);
  b.addEventListener("click",()=>{topic=tp.id;topicChips.querySelectorAll(".chip").forEach(c=>c.setAttribute("aria-pressed",c===b));renderCompare();syncHash()});
  topicChips.appendChild(b);
});
const tradChips=document.getElementById("tradChips");
T.forEach(t=>{
  const b=el("button",{class:"tchip","aria-pressed":"true",style:`--c:${t.c}`},`<span class="dot"></span>${t.name}`);
  b.addEventListener("click",()=>{active.has(t.id)?active.delete(t.id):active.add(t.id);b.setAttribute("aria-pressed",active.has(t.id));renderCompare()});
  tradChips.appendChild(b);
});
const toggleAll=el("button",{class:"mini"},"Show only two");
toggleAll.addEventListener("click",()=>{
  if(active.size>2){active.clear();active.add("catholic");active.add("baptist");toggleAll.textContent="Show all"}
  else{T.forEach(t=>active.add(t.id));toggleAll.textContent="Show only two"}
  tradChips.querySelectorAll(".tchip").forEach((c,i)=>c.setAttribute("aria-pressed",active.has(T[i].id)));
  renderCompare();
});
tradChips.appendChild(toggleAll);

//@include data/sources.js
// Topic sources for one church: [{name,url,detail}] plus notes
function srcFor(id,topic){
  const s=CSRC[id];if(!s)return null;
  const list=s[topic]||s._all;if(!list)return null;
  return list.map(x=>x.note?{note:x.note}:{name:s.docs[x[0]][0],url:s.docs[x[0]][1],detail:x[1]});
}
function srcLine(id,topic){
  const items=srcFor(id,topic);if(!items)return null;
  const p=el("p",{class:"srcline"});
  const lab=el("span",{class:"srclab"});lab.textContent="Source: ";p.appendChild(lab);
  items.forEach((it,i)=>{
    if(i)p.appendChild(document.createTextNode("; "));
    if(it.note){p.appendChild(document.createTextNode(it.note));return}
    const nm=it.url?el("a",{href:it.url,target:"_blank",rel:"noopener noreferrer"}):el("cite");
    nm.textContent=it.name;p.appendChild(nm);
    if(it.detail)p.appendChild(document.createTextNode(", "+it.detail));
  });
  return p;
}
function rsrc(list){
  const p=el("p",{class:"srcline"});
  const lab=el("span",{class:"srclab"});lab.textContent="Source: ";p.appendChild(lab);
  let n=0;
  list.forEach(([id,key,detail])=>{
    const d=CSRC[id]&&CSRC[id].docs[key];if(!d)return;
    if(n++)p.appendChild(document.createTextNode("; "));
    const nm=d[1]?el("a",{href:d[1],target:"_blank",rel:"noopener noreferrer"}):el("cite");
    nm.textContent=d[0];p.appendChild(nm);
    if(detail)p.appendChild(document.createTextNode(", "+detail));
  });
  return n?p:null;
}
function srcDocs(id){
  const s=CSRC[id];if(!s)return null;
  const wrap=el("div",{class:"srcdocs"});
  const h=el("p",{class:"srch"});h.textContent="Official sources";wrap.appendChild(h);
  const ul=el("ul");
  Object.values(s.docs).forEach(([t,u])=>{const li=el("li");if(u){const a=el("a",{href:u,target:"_blank",rel:"noopener noreferrer"});a.textContent=t;li.appendChild(a)}else li.textContent=t;ul.appendChild(li)});
  wrap.appendChild(ul);return wrap;
}

function renderCompare(){
  const tp=TOPICS.find(x=>x.id===topic);
  document.getElementById("topicTitle").textContent=tp.title;
  document.getElementById("topicHint").textContent=tp.hint+" Tap church names below to add or remove them.";
  const box=document.getElementById("entries");box.innerHTML="";
  const list=T.filter(t=>active.has(t.id));
  if(!list.length){box.appendChild(el("p",{class:"empty"},"Select at least one church above to compare."));return}
  list.forEach(t=>{
    const d=el("article",{class:"entry",style:`--c:${t.c}`});
    d.appendChild(el("h3",{},t.name));
    d.appendChild(el("p",{class:"fam"},t.fam));
    const p=el("p",{class:"body"});p.textContent=t[topic];d.appendChild(p);
    const sl=srcLine(t.id,topic);if(sl)d.appendChild(sl);
    box.appendChild(d);
  });
}
renderCompare();

// Churches
const cl=document.getElementById("churchList");
let lastFam="";
T.forEach(t=>{
  const d=el("details",{class:"church",style:`--c:${t.c}`});
  const s=el("summary");
  s.innerHTML=`<div class="sumtop"><h3></h3><span class="chev" aria-hidden="true">\u203A</span></div><p class="origin"></p><p class="summary"></p>`;
  s.querySelector("h3").textContent=t.name;
  s.querySelector(".origin").textContent=t.fam+". "+t.origin+".";
  s.querySelector(".summary").textContent=t.summary;
  d.appendChild(s);
  const dl=el("dl");
  TOPICS.forEach(tp=>{const dt=el("dt");dt.textContent=tp.title;const dd=el("dd");dd.textContent=t[tp.id];const sl=srcLine(t.id,tp.id);if(sl)dd.appendChild(sl);dl.append(dt,dd)});
  const sd=srcDocs(t.id);if(sd)dl.appendChild(sd);
  d.appendChild(dl);
  cl.appendChild(d);
});
const restor=el("p",{class:"hint",style:"margin-top:14px"});
restor.textContent="A note on terms: Latter-day Saints and Jehovah's Witnesses identify as Christian. Most of the other traditions here don't regard them as part of historic creedal Christianity, mainly because of differences over the Trinity and added scripture or authority.";
cl.appendChild(restor);


// Verses: parse references and sort in Bible order
// ---------- Bible versions ----------
const VERSIONS={dr:{name:"Douay-Rheims",full:"Douay-Rheims (Challoner)",node:"drdata"},kjv:{name:"King James Version",full:"King James Version",node:"kjvdata"}};
let BIBLE=null, FLAT=null, bibleErr=false, BN=null, VMAP=null;
const TEXTS={};
let VER="dr";try{const v=localStorage.getItem("bibleVersion");if(VERSIONS[v])VER=v}catch(e){}
const DEUT=["Tobit","Judith","Wisdom","Sirach","Baruch","1 Maccabees","2 Maccabees","Song of the Three"];
const DRNAME={"Joshua":"Josue","1 Samuel":"1 Kings","2 Samuel":"2 Kings","1 Kings":"3 Kings","2 Kings":"4 Kings","1 Chronicles":"1 Paralipomenon","2 Chronicles":"2 Paralipomenon","Ezra":"1 Esdras","Nehemiah":"2 Esdras","Tobit":"Tobias","Song of Solomon":"Canticle of Canticles","Sirach":"Ecclesiasticus","Isaiah":"Isaias","Jeremiah":"Jeremias","Ezekiel":"Ezechiel","Hosea":"Osee","Obadiah":"Abdias","Jonah":"Jonas","Micah":"Micheas","Habakkuk":"Habacuc","Zephaniah":"Sophonias","Haggai":"Aggeus","Zechariah":"Zacharias","Malachi":"Malachias","1 Maccabees":"1 Machabees","2 Maccabees":"2 Machabees","Revelation":"Apocalypse"};
const UCODE=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV","TOB","JDT","WIS","SIR","BAR","1MA","2MA","DAN"];
function bookLabel(b,n){
  let t=b==="Song of the Three"?"Song of the Three (Daniel 3)":b;
  if(VER==="dr"&&DRNAME[b])t+=` / ${DRNAME[b]}`;
  return n?`${t} (${n})`:t;
}
function BI(book){return BN.indexOf(book)}
function isOT(b){return b<39||b>=66}
// Text of one verse in the current version: null = not in this Bible, "" = printed as part of a neighbouring verse
function getVerse(book,ch,v){
  if(!BIBLE)return null;const bi=BI(book);if(bi<0)return null;
  const c=BIBLE[bi][ch-1];if(!c||v<1||v>c.length)return null;return c[v-1];
}
function getPassage(book,ch,v1,v2){
  const first=getVerse(book,ch,v1);if(first===null)return null;
  let t=first;for(let v=v1+1;v<=(v2||v1);v++){const x=getVerse(book,ch,v);if(x)t+=(t?" ":"")+x}
  return t;
}
function drRefOf(book,ch,v){
  if(book==="Song of the Three")return ["Daniel",3,v+23];
  const bi=BOOKS66.indexOf(book);const m=bi>=0&&VMAP?VMAP[`${bi}:${ch}:${v}`]:null;
  return [DRNAME[book]||book,m?m[0]:ch,m?m[1]:v];
}
// "Douay-Rheims: Psalm 22:1" when its book name or numbering differs from the one shown
function drNumber(book,ch,v1,v2){
  if(VER!=="dr"||!v1)return null;
  const a=drRefOf(book,ch,v1),b=v2&&v2>v1?drRefOf(book,ch,v2):null;
  if(a[0]===book&&a[1]===ch&&a[2]===v1&&(!b||(b[1]===ch&&b[2]===v2)))return null;
  const nm=a[0]==="Psalms"?"Psalm":a[0];
  let t=`${nm} ${a[1]}:${a[2]}`;if(b)t+=b[1]===a[1]?`\u2013${b[2]}`:`\u2013${b[1]}:${b[2]}`;
  return "In the Douay-Rheims: "+t;
}
function nabreUrl(book,ch,v){
  const i=BOOKS66.indexOf(book),d=DEUT.indexOf(book);
  let code=i>=0?UCODE[i]:d>=0?UCODE[66+d]:null;if(!code)return null;
  if(book==="Esther"&&ch>10)return null;
  if(book==="Song of the Three"){ch=3;v=v?v+23:null}
  if(book==="Daniel"&&ch>12)return `https://www.bible.com/bible/463/DAN.${ch}${v?"."+v:""}.NABRE`;
  return `https://www.bible.com/bible/463/${code}.${ch}${v&&code!=="PSA"?"."+v:""}.NABRE`;
}
function syncVerUI(){
  document.querySelectorAll(".verSel").forEach(sel=>{
    if(!sel.options.length){Object.entries(VERSIONS).forEach(([k,o])=>{const op=document.createElement("option");op.value=k;op.textContent=o.full;sel.appendChild(op)});sel.addEventListener("change",()=>setVersion(sel.value))}
    sel.value=VER;
  });
  document.querySelectorAll(".verName").forEach(x=>x.textContent=VERSIONS[VER].full);
  document.querySelectorAll("#fBook option[value]").forEach(o=>{if(o.value)o.textContent=bookLabel(o.value,+o.dataset.n||0)});
}
async function setVersion(v){
  if(!VERSIONS[v]||v===VER&&BIBLE){syncVerUI();return}
  VER=v;try{localStorage.setItem("bibleVersion",v)}catch(e){}
  BIBLE=null;FLAT=null;bibleErr=false;syncVerUI();
  await loadBible();
  try{renderVerses()}catch(e){}
  try{if(q2.value.trim()&&fState.terms.length)runFind()}catch(e){}
  try{if(nEls&&!nEls("nEditView").hidden)syncRefBtn()}catch(e){}
}

const BOOKS={
 "Old Testament":["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther","Job","Psalms","Proverbs","Ecclesiastes","Song of Solomon","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi"],
 "Deuterocanonical (Apocrypha)":["Tobit","Judith","Wisdom","Sirach","Baruch","1 Maccabees","2 Maccabees","Song of the Three"],
 "Also in some Bibles":["2 Esdras"],
 "New Testament":["Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation"]
};
const BOOKS66=[...BOOKS["Old Testament"],...BOOKS["New Testament"]];BN=BOOKS66;
const ORDER=[...BOOKS["Old Testament"],...BOOKS["Deuterocanonical (Apocrypha)"],...BOOKS["New Testament"]];
P.forEach(p=>{const m=p.ref.match(/^(.+?) (\d+):(\d+)(?:-(\d+))?$/);p.book=m[1];p.ch=+m[2];p.v1=+m[3];p.v2=+(m[4]||m[3])});
P.sort((a,b)=>ORDER.indexOf(a.book)-ORDER.indexOf(b.book)||a.ch-b.ch||a.v1-b.v1);

const fBook=document.getElementById("fBook"),fCh=document.getElementById("fCh"),fVs=document.getElementById("fVs"),fQ=document.getElementById("fQ");
fBook.appendChild(el("option",{value:""},"All books"));
for(const g in BOOKS){
  const og=el("optgroup",{label:g});
  BOOKS[g].forEach(b=>{const n=P.filter(p=>p.book===b).length;const o=el("option",{value:b});o.dataset.n=n;o.textContent=bookLabel(b,n);og.appendChild(o)});
  fBook.appendChild(og);
}

function passageCard(p,generated){
  const d=el("article",{class:"passage"});
  const h=el("p",{class:"ref"});h.textContent=p.ref;
  const nb=el("button",{class:"notebtn"});nb.textContent="Note";nb.onclick=()=>noteFromVerse(p.ref,p.q||"");h.appendChild(nb);
  {const x=parseRange(p.ref);const lb=el("button",{class:"notebtn","aria-label":"Copy a link to "+p.ref});lb.textContent="Link";lb.onclick=()=>shareLink(verseHash(x.book,x.ch,x.v1),lb);h.appendChild(lb);}
  d.appendChild(h);
  if(generated){const g=el("p",{class:"gen"});g.textContent="Looked up by Claude for this verse. Check the wording against your own Bible.";d.appendChild(g)}
  {const x=parseRange(p.ref);const own=getPassage(x.book,x.ch,x.v1,x.v2);const qt=own||p.q;
   if(qt){const bq=el("blockquote");bq.textContent="\u201C"+qt+"\u201D";bq.appendChild(el("span",{class:"qsrc"},own?VERSIONS[VER].full:(p.qv==="dr"?VERSIONS.dr.full:"KJV")));d.appendChild(bq)}
   const dn=drNumber(x.book,x.ch,x.v1,x.v2);if(own&&dn){const q=el("p",{class:"drnum"});q.textContent=dn;d.appendChild(q)}
   const nu=nabreUrl(x.book,x.ch,x.v1);if(nu){const a=el("a",{class:"notebtn",href:nu,target:"_blank",rel:"noopener noreferrer",style:"margin:0 0 8px"});a.textContent="Read in NABRE \u2197";d.appendChild(a)}}
  p.r.forEach(r=>{
    const rd=el("div",{class:"reading"});
    const who=el("div",{class:"who"});
    const dots=el("span",{class:"dots","aria-hidden":"true"});
    r.ids.forEach(id=>dots.appendChild(el("span",{style:`--c:${byId[id].c}`,title:byId[id].name})));
    const name=el("span");name.textContent=r.who;
    who.append(dots,name);
    const tx=el("p");tx.textContent=r.t;
    rd.append(who,tx);
    if(r.s){const sl=rsrc(r.s);if(sl)rd.appendChild(sl)}
    d.appendChild(rd);
  });
  if(!generated)STUDIES.filter(st=>st.passages.includes(p.ref)).forEach(st=>{
    const sp=el("p",{class:"stlink"});const a=el("a",{href:"#jewish/"+jewishSubForStudy(st.id)});a.textContent="Bible study: "+st.title;sp.append(a);d.appendChild(sp)});
  const fa=FATHERS[p.ref];
  if(fa&&!generated){
    const box=el("div",{class:"fathers"});const h=el("p",{class:"srch"});h.textContent="Early Christian writers";box.appendChild(h);
    fa.forEach(f=>{
      const q=el("blockquote",{class:"fq"});q.textContent="\u201c"+f.q+"\u201d";box.appendChild(q);
      const c=el("p",{class:"fcite"});c.append("\u2014 "+f.who+", ");
      const a=el("a",{href:f.url,target:"_blank",rel:"noopener noreferrer"});a.textContent=f.work;c.append(a," ("+f.when+"; translated by "+f.tr+")");box.appendChild(c);
      if(f.note){const n=el("p",{class:"fnote"});n.textContent=f.note;box.appendChild(n)}
    });
    d.appendChild(box);
  }
  return d;
}

// Asking Claude about any verse
let sampleFn=null, sampleOff=false, ask={ref:null,status:null,data:null,msg:""}, ctl=null;
const looked=new Map();
if(window.claude&&claude.use){claude.use("sample").then(s=>{sampleFn=s;renderVerses()}).catch(()=>{})}

const TLIST=T.map(t=>`${t.id}: ${t.name}`).join("\n");
async function askVerse(ref){
  if(looked.has(ref)){ask={ref,status:"done",data:looked.get(ref)};renderVerses();return}
  ctl=new AbortController();
  ask={ref,status:"loading"};renderVerses();
  const prompt=`You are writing for a neutral reference app that compares how Christian traditions interpret the Bible.

Verse: ${ref}

Traditions (id: name):
${TLIST}

Reply with ONLY a JSON object in this shape:
{"found":true,"quote":"<the verse in the ${VER==="dr"?"Douay-Rheims (Challoner) version":"King James Version; for Tobit, Judith, Wisdom, Sirach, Baruch, Maccabees or 2 Esdras use the KJV Apocrypha"}; at most 60 words, use an ellipsis if longer>","readings":[{"who":"<short label for the group, e.g. 'Catholic and Orthodox'>","ids":["<tradition ids>"],"t":"<one or two plain-language sentences>"}]}

Rules:
- Group traditions that read the verse the same way into one entry, 2 to 6 entries in all.
- Every tradition id appears in exactly one entry.
- Describe each view the way that tradition would describe itself, neutrally, without saying which is right.
- If the verse isn't contested, make the first entry explain the shared reading, and add other entries only for real differences.
- If no such verse exists, reply {"found":false}.`;
  try{
    const res=await sampleFn.json(prompt,{signal:ctl.signal});
    if(!res||!res.found||!Array.isArray(res.readings)){ask={ref,status:"error",msg:`${ref} doesn't seem to exist. Check the chapter and verse numbers.`};renderVerses();return}
    const readings=res.readings.map(r=>({who:String(r.who||""),t:String(r.t||""),ids:(Array.isArray(r.ids)?r.ids:[]).filter(id=>byId[id])})).filter(r=>r.ids.length&&r.t);
    if(!readings.length)throw {code:"bad"};
    const data={ref,q:typeof res.quote==="string"?res.quote:"",r:readings};
    looked.set(ref,data);
    if(ask.ref===ref){ask={ref,status:"done",data};renderVerses()}
  }catch(e){
    if(e&&e.code==="cancelled"){ask={ref:null};renderVerses();return}
    let msg="That lookup didn't finish. Try again.";
    if(e&&e.code==="not_granted"){sampleOff=true;msg="Verse lookup needs permission to use Claude, so it's off for this visit. The saved verses below still work."}
    else if(e&&e.code==="rate_limited")msg="Too many lookups at once. Wait a minute, then try again.";
    ask={ref,status:"error",msg};renderVerses();
  }
}

let verseRange=null;
function renderAsk(ref,hasSaved){
  const box=document.getElementById("askBox");box.innerHTML="";
  if(!ref||hasSaved)return;
  const c=el("div",{class:"askcard"});
  if(ask.ref===ref&&ask.status==="done"){box.appendChild(passageCard(ask.data,true));return}
  if(ask.ref===ref&&ask.status==="loading"){
    c.innerHTML=`<div class="thinking"><span class="spin" aria-hidden="true"></span><p>Looking up how each church reads ${esc(ref)}. This can take up to a minute.</p></div>`;
    const stop=el("button",{class:"btn ghost",style:"margin-left:0"},"Stop");stop.onclick=()=>ctl&&ctl.abort();c.appendChild(stop);
    box.appendChild(c);return;
  }
  // Show the verse itself from the built-in Bible text
  try{
    const x=parseRange(ref);
    const R=verseRange&&verseRange.book===x.book&&verseRange.ch===x.ch&&verseRange.v1===x.v1?verseRange:null;
    const v2=R?R.v2:x.v1;
    const vt=getPassage(x.book,x.ch,x.v1,v2);
    if(BIBLE&&vt!==null){
      const pc=el("div",{class:"passage"});
      const h=el("p",{class:"ref"});h.textContent=R?`${ref}\u2013${R.v2}`:ref;pc.appendChild(h);
      const dn=drNumber(x.book,x.ch,x.v1,v2);if(dn){const q=el("p",{class:"drnum"});q.textContent=dn;pc.appendChild(q)}
      const bq=el("blockquote");
      if(vt)bq.textContent=vt;else{const c=el("span",{class:"combined"});c.textContent=`The ${VERSIONS[VER].name} doesn't print this as a separate verse. Its words are part of the verse just before it.`;bq.appendChild(c)}
      const qs=el("span",{class:"qsrc"});qs.textContent=VERSIONS[VER].full;bq.appendChild(qs);pc.appendChild(bq);
      if(vt){const nb=el("button",{class:"notebtn",style:"margin:0 8px 10px 0"});nb.textContent="Write a note on this passage";nb.onclick=()=>noteFromVerse(h.textContent,vt);pc.appendChild(nb)}
      const nu=nabreUrl(x.book,x.ch,x.v1);if(nu){const a=el("a",{class:"notebtn",href:nu,target:"_blank",rel:"noopener noreferrer",style:"margin:0 0 10px"});a.textContent="Read in NABRE \u2197";pc.appendChild(a)}
      box.appendChild(pc);
    }else if(BIBLE&&BI(x.book)<0&&BOOKS["Deuterocanonical (Apocrypha)"].includes(x.book)){
      const n=el("div",{class:"askcard"});n.textContent=`${x.book} isn't part of the ${VERSIONS[VER].name} text built into this app. Switch the Bible to Douay-Rheims to read it here.`;box.appendChild(n);
    }
  }catch(e){}
  const p=el("p");
  if(ask.ref===ref&&ask.status==="error"){p.textContent=ask.msg}
  else p.textContent=`There's no saved comparison of how churches read ${ref} yet.`;
  c.appendChild(p);
  if(sampleFn&&!sampleOff){
    const b=el("button",{class:"btn"});b.textContent=`Look up ${ref}`;b.onclick=()=>askVerse(ref);c.appendChild(b);
  }else if(!sampleFn){
    const n=el("p",{class:"gen",style:"margin-top:6px"});n.textContent="Looking up any verse works when this page is opened in Claude.";c.appendChild(n);
  }
  box.appendChild(c);
}

function renderVerses(){
  const book=fBook.value;
  fCh.disabled=!book; fVs.disabled=!book||!fCh.value;
  const ch=book?(parseInt(fCh.value)||0):0, vs=ch?(parseInt(fVs.value)||0):0, q=fQ.value.trim().toLowerCase();
  const list=P.filter(p=>{
    if(book&&p.book!==book)return false;
    if(ch&&p.ch!==ch)return false;
    if(vs&&(vs<p.v1||vs>p.v2))return false;
    if(q){const hay=(p.ref+" "+p.q+" "+(p.tags||"")+" "+p.r.map(r=>r.who+" "+r.t).join(" ")).toLowerCase();if(!q.split(/\s+/).every(w=>hay.includes(w)))return false}
    return true;
  });
  const ref=vs&&Object.values(BOOKS).flat().includes(book)&&/^\d+$/.test(String(ch))&&/^\d+$/.test(String(vs))?`${book} ${ch}:${vs}`:null;
  renderAsk(ref,list.length>0);
  renderVerseNotes(book,ch,vs);

  const cnt=document.getElementById("pCount");cnt.innerHTML="";
  const filtered=book||q;
  const label=el("span");
  label.textContent=list.length?(filtered?`${list.length} saved ${list.length===1?"verse":"verses"} match`:`${list.length} saved verses`):"";
  cnt.appendChild(label);
  if(filtered){const clr=el("button",{class:"mini"},"Clear");clr.onclick=()=>{fBook.value="";fCh.value="";fVs.value="";fQ.value="";renderVerses()};cnt.appendChild(clr)}

  const pl=document.getElementById("passageList");pl.innerHTML="";
  if(!list.length&&!ref){
    const e=el("p",{class:"empty"});
    e.textContent=book?(ch?`No saved verses in ${book} ${ch}. Enter a verse number to look one up.`:`No saved verses in ${book} yet. Enter a chapter and verse to look one up.`):"No saved verses match that search. Try another word, or pick a book above.";
    pl.appendChild(e);
  }
  list.forEach(p=>pl.appendChild(passageCard(p,false)));
  syncHash();
}
[fBook,fCh,fVs,fQ].forEach(x=>x.addEventListener("input",()=>{verseRange=null;renderVerses()}));
fBook.addEventListener("change",()=>{if(!fBook.value){fCh.value="";fVs.value=""}renderVerses()});
renderVerses();
syncVerUI();
setTimeout(()=>{loadBible().then(()=>{try{renderVerses()}catch(e){}})},50);
// ---------- Find: names and parables across the whole Bible ----------
async function decodeNode(id){
  // The Claude app carries the Bibles inside the page; the website loads each one only when it's needed.
  const node=document.getElementById(id);let bytes;
  if(node&&node.textContent.trim()){
    const bin=atob(node.textContent.trim());
    bytes=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)bytes[i]=bin.charCodeAt(i);
  }else{
    const r=await fetch("data/"+id+".gz");if(!r.ok)throw new Error("HTTP "+r.status);
    bytes=new Uint8Array(await r.arrayBuffer());
  }
  // If a web server already unzipped the file, it starts with JSON instead of the gzip signature.
  const zipped=bytes[0]===0x1f&&bytes[1]===0x8b;
  const data=JSON.parse(zipped?await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream("gzip"))).text():new TextDecoder().decode(bytes));
  if(node)node.textContent="";return data;
}
let loading=null;
async function loadBible(){
  if(BIBLE||bibleErr)return;
  if(loading)return loading;
  loading=(async()=>{
    try{
      const want=VER;
      if(!TEXTS[want]){const raw=await decodeNode(VERSIONS[want].node);TEXTS[want]=want==="dr"?{t:raw.t,m:raw.m,names:[...BOOKS66,...DEUT]}:{t:raw,m:null,names:BOOKS66}}
      if(want!==VER){loading=null;return loadBible()}
      const T=TEXTS[want];BIBLE=T.t;BN=T.names;VMAP=T.m;
      FLAT=[];BIBLE.forEach((chs,b)=>chs.forEach((vs,c)=>vs.forEach((t,v)=>{if(t)FLAT.push({b,c:c+1,v:v+1,t})})));
      try{wcCache.clear()}catch(e){}
      if(typeof renderWC==="function"){try{fillWcScope()}catch(e){}renderWC()}
    }catch(e){bibleErr=!(e instanceof TypeError)} // a network failure (offline) can be retried later
    loading=null;
  })();
  return loading;
}

//@include data/parables.js

// Name spellings that differ between the King James and the Douay-Rheims
const DRSPELL={noah:"Noe",elijah:"Elias",elisha:"Eliseus",isaiah:"Isaias",jeremiah:"Jeremias",ezekiel:"Ezechiel",hezekiah:"Ezechias",josiah:"Josias",joshua:"Josue",boaz:"Booz",hosea:"Osee",obadiah:"Abdias",jonah:"Jonas",micah:"Micheas",zechariah:"Zacharias",zephaniah:"Sophonias",haggai:"Aggeus",malachi:"Malachias",nebuchadnezzar:"Nabuchodonosor",mordecai:"Mardochai",shem:"Sem",ham:"Cham",japheth:"Japheth",enoch:"Henoch",methuselah:"Mathusala",zerubbabel:"Zorobabel",hagar:"Agar",rehoboam:"Roboam",uzziah:"Ozias",ahaziah:"Ochozias",judah:"Juda",zion:"Sion",ishmael:"Ismael",rebekah:"Rebecca",bathsheba:"Bethsabee",korah:"Core",jethro:"Jethro",hebron:"Hebron",gideon:"Gedeon",samuel:"Samuel",ruth:"Ruth",naomi:"Noemi",goliath:"Goliath",jonathan:"Jonathan",eli:"Heli",tobit:"Tobias",raphael:"Raphael",sennacherib:"Sennacherib",jehoshaphat:"Josaphat",nineveh:"Ninive",bethlehem:"Bethlehem",canaanite:"Chanaanite",canaan:"Chanaan",pharaoh:"Pharao",zacchaeus:"Zacheus",elizabeth:"Elizabeth",isaac:"Isaac",esau:"Esau",laban:"Laban",rachel:"Rachel",leah:"Lia",benjamin:"Benjamin",ephraim:"Ephraim",manasseh:"Manasses",zebulun:"Zabulon",naphtali:"Nephthali",asher:"Aser",issachar:"Issachar",simeon:"Simeon",reuben:"Ruben",gad:"Gad",dan:"Dan",levi:"Levi",joseph:"Joseph",ahab:"Achab",jezebel:"Jezabel",balaam:"Balaam",balak:"Balac",aaron:"Aaron",jericho:"Jericho",ai:"Hai",gilead:"Galaad",baal:"Baal",sodom:"Sodom",gomorrah:"Gomorrha",babylon:"Babylon",cyrus:"Cyrus",darius:"Darius",ezra:"Esdras",nehemiah:"Nehemias",esther:"Esther",job:"Job",abel:"Abel",cain:"Cain",lucifer:"Lucifer"};
const KJSPELL={};Object.entries(DRSPELL).forEach(([k,v])=>{if(v.toLowerCase()!==k&&!KJSPELL[v.toLowerCase()])KJSPELL[v.toLowerCase()]=k[0].toUpperCase()+k.slice(1)});
function spellingOf(t){const k=t.toLowerCase();const m=VER==="dr"?DRSPELL[k]:KJSPELL[k];return m&&m.toLowerCase()!==k?[m]:[]}
const ALIASES={
 abraham:["Abram"],abram:["Abraham"],sarah:["Sarai"],sarai:["Sarah"],jacob:["Israel"],
 peter:["Simon","Cephas"],cephas:["Peter"],paul:["Saul"],
 jesus:["Christ","Emmanuel","Immanuel","Messias"],christ:["Jesus"],
 elijah:["Elias"],elias:["Elijah"],elisha:["Eliseus"],noah:["Noe"],noe:["Noah"],
 isaiah:["Esaias"],esaias:["Isaiah"],jeremiah:["Jeremy","Jeremias"],jonah:["Jonas"],jonas:["Jonah"],hosea:["Osee"],
 matthew:["Levi"],thomas:["Didymus"],satan:["devil","Lucifer","Beelzebub"],
 daniel:["Belteshazzar"],esther:["Hadassah"],gideon:["Jerubbaal"],solomon:["Jedidiah"],joshua:["Oshea"]
};

const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const reEsc=s=>s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
function parseRange(ref){const m=ref.match(/^(.+?) (\d+):(\d+)(?:-(\d+))?$/);return {book:m[1],ch:+m[2],v1:+m[3],v2:+(m[4]||m[3])}}
function norm(s){return s.toLowerCase().replace(/[\u2019']/g,"'").replace(/^(the )?parable of (the )?/,"").replace(/^the /,"").replace(/[^a-z0-9' ]/g," ").replace(/\s+/g," ").trim()}

function findParables(q){
  const n=norm(q); if(n.length<3)return [];
  const multi=n.includes(" ");
  return PARABLES.filter(p=>{
    const keys=[norm(p.t),...p.a];
    // One word must match a parable's name or keyword exactly; phrases may match part of one
    return keys.some(k=>k===n||multi&&(k.includes(n)||n.includes(k)&&k.includes(" ")));
  });
}

// The KJV text spells some names with the æ ligature (Cæsar, Judæa, Alphæus). Treat "ae" and "æ" as the same letters.
const lig=s=>s.replace(/æ/g,"ae").replace(/Æ/g,"Ae").replace(/œ/g,"oe").replace(/Œ/g,"Oe");
function searchWords(terms){
  const parts=terms.map(t=>({t,cap:/^[A-ZÆ]/.test(t)}));
  const pat=t=>reEsc(lig(t)).replace(/ae/gi,"(?:ae|æ)").replace(/oe/gi,"(?:oe|œ)");
  const re=new RegExp("(^|[^A-Za-zÀ-ɏ])("+parts.map(p=>pat(p.t)).join("|")+")(?![A-Za-zÀ-ɏ])","gi");
  const capSet=new Set(parts.filter(p=>p.cap).map(p=>lig(p.t).toLowerCase()));
  const hits=[];let total=0;
  const per={};parts.forEach(p=>per[lig(p.t).toLowerCase()]={t:p.t,n:0,ot:0,nt:0,v:0});
  for(const row of FLAT){
    re.lastIndex=0;let m,n=0;const seen=new Set();
    while((m=re.exec(row.t))){
      const w=lig(m[2]).toLowerCase();
      if(capSet.has(w)&&!/^[A-ZÆ]/.test(m[2]))continue;
      n++;const pt=per[w];if(pt){pt.n++;isOT(row.b)?pt.ot++:pt.nt++;seen.add(w)}
    }
    seen.forEach(w=>per[w].v++);
    if(n){hits.push(row);total+=n}
  }
  return {hits,total,re,capSet,per:Object.values(per)};
}

function highlight(text,re,capSet){
  re.lastIndex=0;let out="",last=0,m;
  while((m=re.exec(text))){
    const w=lig(m[2]).toLowerCase();
    if(capSet.has(w)&&!/^[A-ZÆ]/.test(m[2]))continue;
    const st=m.index+m[1].length;
    out+=esc(text.slice(last,st))+"<mark>"+esc(m[2])+"</mark>";last=st+m[2].length;
  }
  return out+esc(text.slice(last));
}

function openVerse(book,ch,vs){
  document.querySelector('.tab[data-tab="passages"]').click();
  fBook.value=book;fCh.value=ch;fVs.value=vs;renderVerses();
  try{const sec=document.getElementById("passages");window.scrollTo({top:Math.max(0,sec.getBoundingClientRect().top+window.scrollY-60)})}catch(e){}
}

function parableCard(p){
  const d=el("article",{class:"parable"});
  const h=el("h3");h.textContent=p.t;d.appendChild(h);
  const s=el("p",{class:"ps"});s.textContent=p.s;d.appendChild(s);
  const books=[...new Set(p.r.map(r=>parseRange(r).book))];
  const told=el("p",{class:"told"});
  told.textContent=books.length>1?`Told in ${books.slice(0,-1).join(", ")} and ${books.at(-1)}`:p.r.length>1?`In ${books[0]}, in ${p.r.length} parts`:`Found only in ${books[0]}`;
  d.appendChild(told);
  p.r.forEach(ref=>{
    const {book,ch,v1,v2}=parseRange(ref);
    const det=el("details",{class:"acct"});
    const sm=el("summary");sm.innerHTML=`${esc(ref.replace("-","\u2013"))} <span>Read</span>`;
    det.appendChild(sm);
    det.addEventListener("toggle",()=>{
      sm.querySelector("span").textContent=det.open?"Hide":"Read";
      if(!det.open||det.dataset.done)return;det.dataset.done=1;
      const body=el("div",{class:"acctbody"});
      let html="";for(let v=v1;v<=v2;v++){const t=getVerse(book,ch,v);if(t)html+=`<sup>${v}</sup>${esc(t)} `}
      const dn=drNumber(book,ch,v1,v2);if(dn)html+=`<br><small class="drnum">${esc(dn)}</small>`;
      body.innerHTML=html;
      const cmp=el("button",{class:"mini link"});cmp.textContent=`Compare churches on ${book} ${ch}:${v1}`;
      cmp.onclick=()=>openVerse(book,ch,v1);
      body.appendChild(el("br"));body.appendChild(cmp);
      det.appendChild(body);
    });
    d.appendChild(det);
  });
  return d;
}

let fState={terms:[],hits:[],book:null,shown:40,re:null,capSet:null,total:0};
const out2=document.getElementById("findOut"), q2=document.getElementById("q2");

async function runFind(){
  const raw=q2.value.trim();
  out2.innerHTML="";
  if(!raw)return;
  if(!BIBLE){out2.appendChild(el("p",{class:"status"},"Opening the Bible text\u2026"));await loadBible();out2.innerHTML="";}
  if(bibleErr){out2.appendChild(el("p",{class:"status"},"This browser couldn't open the Bible text. Try updating your browser or opening the page on another device."));return}
  if(!BIBLE){out2.appendChild(el("p",{class:"status"},"The Bible text hasn't downloaded to this device yet. Connect to the internet once and it will work offline after that."));return}
  const terms=[...new Set(raw.split(",").map(t=>t.trim()).filter(t=>t.length>=2))];
  if(!terms.length){out2.appendChild(el("p",{class:"status"},"Type at least two letters."));return}

  // Parables
  const pars=[];terms.forEach(t=>findParables(t).forEach(p=>{if(!pars.includes(p))pars.push(p)}));
  // Alias suggestions
  const lowerTerms=terms.map(t=>t.toLowerCase());
  const aka=[];terms.forEach(t=>(ALIASES[t.toLowerCase()]||[]).concat(spellingOf(t)).forEach(a=>{if(!lowerTerms.includes(a.toLowerCase())&&!aka.includes(a))aka.push(a)}));

  const res=searchWords(terms);
  fState={terms,hits:res.hits,book:null,shown:40,re:res.re,capSet:res.capSet,total:res.total,per:res.per};

  if(pars.length){
    out2.appendChild(el("p",{class:"sub"},pars.length===1?"Parable":"Parables"));
    pars.forEach(p=>out2.appendChild(parableCard(p)));
  }
  const words=el("div",{id:"wordRes"});out2.appendChild(words);
  renderWords(aka,pars.length>0);
}

function renderWords(aka,hadParables){
  const box=document.getElementById("wordRes");box.innerHTML="";
  const {terms,hits,total}=fState;
  const label=terms.map(t=>`\u201c${t}\u201d`).join(" or ");
  if(hadParables||hits.length)box.appendChild(el("p",{class:"sub"},"Every verse"));
  if(!hits.length){
    const p=el("p",{class:"status"});
    p.textContent=hadParables?`No verse uses the exact words ${label}. The parable above is where the story is told.`:`No verses contain ${label} in the ${VERSIONS[VER].name}. Check the spelling; ${VER==="dr"?"the Douay-Rheims spells many names the Latin way, like Noe for Noah and Elias for Elijah":"the King James Version often uses older forms, like Elias for Elijah"}.`;
    box.appendChild(p);
  }else{
    const books=new Map();hits.forEach(h=>books.set(h.b,(books.get(h.b)||0)+1));
    const s=el("p",{class:"sumline"});
    s.textContent=`${label} appears ${total} ${total===1?"time":"times"} in ${hits.length} ${hits.length===1?"verse":"verses"} across ${books.size} ${books.size===1?"book":"books"}.`;
    box.appendChild(s);
    const fmt=n=>n.toLocaleString();
    const tb=el("table",{class:"tally"});
    let rows=`<thead><tr><th>Word</th><th>Times used</th><th>Verses</th><th>Old T.</th><th>New T.</th></tr></thead><tbody>`;
    fState.per.forEach(p=>{rows+=`<tr><td>${esc(p.t)}</td><td><b>${fmt(p.n)}</b></td><td>${fmt(p.v)}</td><td>${fmt(p.ot)}</td><td>${fmt(p.nt)}</td></tr>`});
    if(fState.per.length>1){const ot=fState.per.reduce((a,p)=>a+p.ot,0),nt=fState.per.reduce((a,p)=>a+p.nt,0);rows+=`<tr><td><b>Total</b></td><td><b>${fmt(total)}</b></td><td>${fmt(hits.length)}</td><td>${fmt(ot)}</td><td>${fmt(nt)}</td></tr>`}
    tb.innerHTML=rows+"</tbody>";box.appendChild(tb);
  }
  if(aka&&aka.length){
    const a=el("div",{class:"alias"});a.appendChild(el("span",{},"Also known as"));
    aka.forEach(n=>{const c=el("button",{class:"chip"});c.textContent="+ "+n;c.onclick=()=>{q2.value=terms.concat(n).join(", ");runFind()};a.appendChild(c)});
    box.appendChild(a);
  }
  if(!hits.length)return;

  const counts=new Map();hits.forEach(h=>counts.set(h.b,(counts.get(h.b)||0)+1));
  const max=Math.max(...counts.values());
  if(counts.size>1){
    const bars=el("div",{class:"bars",role:"group","aria-label":"Filter by book"});
    const all=el("button",{class:"bar","aria-pressed":fState.book===null});
    all.innerHTML=`<span>All books</span><span></span><span class="n">${hits.length}</span>`;
    all.onclick=()=>{fState.book=null;fState.shown=40;renderWords(aka,hadParables)};
    bars.appendChild(all);
    [...counts.keys()].sort((a,b)=>a-b).forEach(b=>{
      const n=counts.get(b);
      const btn=el("button",{class:"bar","aria-pressed":fState.book===b});
      btn.innerHTML=`<span>${esc(BN[b])}</span><span class="track"><span class="fill" style="display:block;width:${Math.max(4,n/max*100)}%"></span></span><span class="n">${n}</span>`;
      btn.onclick=()=>{fState.book=b;fState.shown=40;renderWords(aka,hadParables)};
      bars.appendChild(btn);
    });
    box.appendChild(bars);
  }
  const list=fState.book===null?hits:hits.filter(h=>h.b===fState.book);
  const ul=el("div");
  list.slice(0,fState.shown).forEach(h=>{
    const row=el("div",{class:"vrow"});
    const r=el("button",{class:"vref",title:"Compare how churches read this verse"});
    r.textContent=`${BN[h.b]} ${h.c}:${h.v}`;r.onclick=()=>openVerse(BN[h.b],h.c,h.v);
    const nb=el("button",{class:"notebtn"});nb.textContent="Note";
    nb.onclick=()=>noteFromVerse(`${BN[h.b]} ${h.c}:${h.v}`,h.t);
    const mine=notesOn(BN[h.b],h.c,h.v).length;
    const p=el("p");p.innerHTML=highlight(h.t,fState.re,fState.capSet);
    if(mine){const yb=el("button",{class:"notebtn hasnotes",title:"Open your notes on this verse"});yb.textContent=mine===1?"Your note":`Your notes (${mine})`;yb.onclick=()=>openVerse(BN[h.b],h.c,h.v);row.append(r,nb,yb,p)}
    else row.append(r,nb,p);
    ul.appendChild(row);
  });
  box.appendChild(ul);
  if(list.length>fState.shown){
    const more=el("button",{class:"btn ghost more"});more.textContent=`Show more (${list.length-fState.shown} left)`;
    more.onclick=()=>{fState.shown+=60;renderWords(aka,hadParables)};
    box.appendChild(more);
  }
}

const SUGG=["Abraham","Moses","Mary","Peter","Good Samaritan","Prodigal Son","The Sower","Lazarus"];
const sg=document.getElementById("sugg");
SUGG.forEach(w=>{const c=el("button",{class:"chip"});c.textContent=w;c.onclick=()=>{q2.value=w;runFind()};sg.appendChild(c)});
document.getElementById("go2").onclick=runFind;
q2.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();q2.blur();runFind()}});
setTimeout(loadBible,600);

//@include data/lineage.js

const tree=document.getElementById("tree");
const SRC={both:"var(--both)",mt:"var(--mt)",lk:"var(--lk)"};
const SRCNAME={both:"Matthew and Luke",mt:"Matthew only",lk:"Luke only"};
function forkSvg(join){
  const d=join?["M25 0 C25 20 50 14 50 34","M75 0 C75 20 50 14 50 34"]:["M50 0 C50 20 25 14 25 34","M50 0 C50 20 75 14 75 34"];
  return `<svg class="fork" viewBox="0 0 100 34" preserveAspectRatio="none" aria-hidden="true"><path d="${d[0]}" style="stroke:var(--mt)"/><path d="${d[1]}" style="stroke:var(--lk)"/></svg>`;
}
function nodeBtn(per,src){
  const frag=document.createDocumentFragment();
  const b=el("button",{class:"node"+(per.key?" key":"")+(per.jesus?" jesus":"")+(per.odd?" odd":""),style:`--k:${SRC[src]}`});
  b.textContent=per.n;
  if(per.k&&per.k!==per.n){const sm=el("small");sm.textContent=per.k;b.appendChild(sm)}
  b.onclick=()=>openSheet(per,src);
  frag.appendChild(b);
  if(per.w){const w=el("button",{class:"wife"});w.textContent=(per.n==="Joseph"?"husband of ":"with ")+per.w.n;w.onclick=()=>openSheet({n:per.w.n,note:per.w.note,f:per.w.f,woman:1},src);frag.appendChild(w)}
  return frag;
}
function chain(people,src){const c=el("div",{class:"chain",style:`--k:${SRC[src]}`});people.forEach(x=>c.appendChild(nodeBtn(x,src)));return c}

LINE.forEach((sec,i)=>{
  const prev=LINE[i-1];
  if(prev&&sec.type==="split")tree.insertAdjacentHTML("beforeend",forkSvg(false));
  if(prev&&prev.type==="split")tree.insertAdjacentHTML("beforeend",forkSvg(true));
  const era=el("div",{class:"era"});
  const h=el("h3");h.textContent=sec.title;const sb=el("p");sb.textContent=sec.sub;era.append(h,sb);
  tree.appendChild(era);
  if(sec.type==="one")tree.appendChild(chain(sec.people,sec.src));
  else{
    const cols=el("div",{class:"cols"});
    ["mt","lk"].forEach(k=>{const col=el("div");const ch=el("p",{class:"colhead",style:`--k:${SRC[k]}`});ch.textContent=sec[k].label;col.append(ch,chain(sec[k].people,k));cols.appendChild(col)});
    tree.appendChild(cols);
  }
});

// Generation counts, computed from the lists above
(function(){
  let mt=0,lk=0;
  LINE.forEach((sec,i)=>{
    if(sec.type==="split"){mt+=sec.mt.people.length;lk+=sec.lk.people.length}
    else{if(sec.src!=="lk")mt+=sec.people.length;lk+=sec.people.length}
  });
  document.getElementById("lcounts").innerHTML=
    `<div class="count-card" style="--k:var(--mt)"><b>${mt}</b>names in Matthew, from Abraham to Jesus</div>`+
    `<div class="count-card" style="--k:var(--lk)"><b>${lk}</b>names in Luke, from Adam to Jesus</div>`;
})();

const sheet=document.getElementById("sheet");
let sheetTerms=[];
function openSheet(per,src){
  document.getElementById("shName").textContent=per.n;
  const meta=[];
  if(per.woman)meta.push("Named by Matthew");else meta.push("Listed by "+SRCNAME[src]);
  if(per.k&&per.k!==per.n)meta.push("KJV New Testament spelling: "+per.k);
  document.getElementById("shMeta").textContent=meta.join(". ")+".";
  document.getElementById("shNote").textContent=per.note||"";
  sheetTerms=[...new Set([per.n,...(per.k?per.k.split(", "):[]),...(per.f||[])])];
  sheet.hidden=false;document.getElementById("shX").focus();
}
document.getElementById("shX").onclick=()=>{sheet.hidden=true};
document.addEventListener("keydown",e=>{if(e.key==="Escape")sheet.hidden=true});
document.querySelectorAll(".tab").forEach(t=>t.addEventListener("click",()=>{sheet.hidden=true}));
document.getElementById("shFind").onclick=()=>{
  sheet.hidden=true;
  document.querySelector('.tab[data-tab="find"]').click();
  q2.value=sheetTerms.join(", ");runFind();
};


//@include data/angels.js

// Collect every reference, sort in Bible order, number them
const ALLBOOKS=[...BOOKS66,...BOOKS["Deuterocanonical (Apocrypha)"],"2 Esdras"];
const refSet=new Set();
[ANG_RANKS,ANG_NAMED,DEM_RANKS,DEM_NAMED].forEach(list=>list.forEach(x=>(x.refs||[]).forEach(r=>refSet.add(r))));
["2 Corinthians 4:4","Ephesians 2:2","John 8:44","Matthew 4:3","Revelation 12:10"].forEach(r=>refSet.add(r));
const REFS=[...refSet].map(r=>({r,...parseRange(r)})).sort((a,b)=>ALLBOOKS.indexOf(a.book)-ALLBOOKS.indexOf(b.book)||a.ch-b.ch||a.v1-b.v1);
const refNum=new Map(REFS.map((x,i)=>[x.r,i+1]));

function verseText(x){
  if(!BIBLE)return "";
  if(BI(x.book)<0)return null;
  let h="";
  for(let v=x.v1;v<=x.v2;v++){const t=getVerse(x.book,x.ch,v);if(t)h+=`<sup>${v}</sup>${esc(t)} `}
  const dn=drNumber(x.book,x.ch,x.v1,x.v2);if(dn)h+=`<br><small class="drnum">${esc(dn)}</small>`;
  return h;
}
const refList=document.getElementById("angRefs");
REFS.forEach((x,i)=>{
  const li=el("li",{id:"aref-"+(i+1)});
  const d=el("details");
  const apoc=BOOKS66.indexOf(x.book)<0;
  d.innerHTML=`<summary><span class="num">${i+1}.</span><span>${esc(x.r.replace("-","\u2013"))}</span><span class="ab">${apoc?"Deuterocanonical":"Read"}</span></summary>`;
  d.addEventListener("toggle",async()=>{
    if(!d.open)return;
    d.querySelector(".rt")?.remove();
    const p=el("p",{class:"rt"});
    if(!BIBLE)await loadBible();
    const vtx=verseText(x);
    if(!BIBLE){p.textContent="The Bible text hasn't downloaded to this device yet. Connect to the internet once and it will work offline after that.";}
    else if(vtx===null){p.textContent=`This book isn't part of the ${VERSIONS[VER].name} text built into this app. Switch the Bible to Douay-Rheims to read it. It is read as Scripture in Catholic and Orthodox churches.`;}
    else{p.innerHTML=vtx;
      const cmp=el("button",{class:"mini link"});cmp.textContent="Compare how churches read this";cmp.onclick=()=>openVerse(x.book,x.ch,x.v1);
      p.appendChild(el("br"));p.appendChild(cmp);}
    d.appendChild(p);d.dataset.done=1;
  });
  li.appendChild(d);refList.appendChild(li);
});
function goRef(r){
  sheet.hidden=true;
  const li=document.getElementById("aref-"+refNum.get(r));if(!li)return;
  const d=li.querySelector("details");d.open=true;d.dispatchEvent(new Event("toggle"));
  li.scrollIntoView({behavior:"smooth",block:"start"});
  li.classList.remove("flash");void li.offsetWidth;li.classList.add("flash");
}

function openInfo(x,kind){
  document.getElementById("shName").textContent=x.n;
  document.getElementById("shMeta").textContent=x.r+".";
  document.getElementById("shNote").textContent=x.note||"";
  const rc=document.getElementById("shRefs");rc.innerHTML="";
  (x.refs||[]).forEach(r=>{const b=el("button",{class:"refchip"});b.innerHTML=`<sup>${refNum.get(r)}</sup>${esc(r.replace("-","\u2013"))}`;b.onclick=()=>goRef(r);rc.appendChild(b)});
  const fb=document.getElementById("shFind");
  sheetTerms=x.f!==undefined?x.f:[x.n.replace(/^The /,"")];
  if(x.n==="Satan")sheetTerms=["Satan","devil","Lucifer","Beelzebub"];
  fb.hidden=!sheetTerms.length;
  sheet.hidden=false;document.getElementById("shX").focus();
}
// Lineage sheets have no reference chips
const _openSheet=openSheet;
openSheet=function(per,src){document.getElementById("shRefs").innerHTML="";document.getElementById("shFind").hidden=false;_openSheet(per,src)};

function pyramid(boxId,ranks,cls){
  const box=document.getElementById(boxId);
  const real=ranks.filter(x=>x.n);const N=real.length;let i=0;
  ranks.forEach(x=>{
    if(x.sphere){const s=el("div",{class:"sphere"});s.textContent=x.sphere;box.appendChild(s);return}
    const w=Math.round(44+56*(i/(N-1)));
    const a=cls==="ang"?Math.round(78-55*(i/(N-1))):Math.round(95-55*(i/(N-1)));
    const b=el("button",{class:"band "+cls,style:`--w:${w}%;--a:${a}%`});
    b.innerHTML=`<b>${esc(x.n)}</b><span>${esc(x.r)}</span>`;
    b.onclick=()=>openInfo(x);box.appendChild(b);i++;
  });
}
function cards(boxId,list,color){
  const box=document.getElementById(boxId);
  list.forEach(x=>{
    const c=el("button",{class:"card",style:`--k:${color}`});
    c.innerHTML=`<b>${esc(x.n)}</b><span>${esc(x.r)}</span><span class="tag">${esc(x.tag)}</span>`;
    c.onclick=()=>openInfo(x);box.appendChild(c);
  });
}
pyramid("angPyr",ANG_RANKS,"ang");
cards("angCards",ANG_NAMED,"var(--gold)");
pyramid("demPyr",DEM_RANKS,"dem");
cards("demCards",DEM_NAMED,"var(--dem)");
// Satan's other titles, as one more card
cards("demCards",[{n:"Other titles of Satan",r:SATAN_TITLES.join(", "),tag:"Throughout Scripture",note:"Scripture calls Satan by many names: the tempter, the accuser of the brethren, the god of this world, the prince of the power of the air, and the father of lies.",refs:["Matthew 4:3","John 8:44","2 Corinthians 4:4","Ephesians 2:2","Revelation 12:10"],f:["tempter","accuser"]}],"var(--dem)");


// ---------- Word counter ----------
const STOP=new Set("the and of to that in he shall unto for i his a they be is him not them it with all thou thy was which my me but ye their have thee from as are when this out were by upon there then had so or her we an into at on you if hath one also no what these will did do up your our us those who whom she its than any because even now how been may let neither nor yet o am thereof therefore among after before every again shalt wilt art hast saith thine mine whose whereby wherefore unto came come went go hast doth hither thither until over under about would should could".split(" "));
const wcScope=document.getElementById("wcScope"),wcMode=document.getElementById("wcMode"),wcFilter=document.getElementById("wcFilter");
[["all","Whole Bible"],["ot","Old Testament"],["nt","New Testament"]].forEach(([v,t])=>wcScope.appendChild(el("option",{value:v},t)));
[["Old Testament",0],["New Testament",39]].forEach(([g,off])=>{const og=el("optgroup",{label:g});BOOKS[g].forEach((b,i)=>{const o=el("option",{value:String(off+i)});o.textContent=b;og.appendChild(o)});wcScope.appendChild(og)});
const wcCache=new Map();let wcShown=40;
function fillWcScope(){
  const old=wcScope.querySelector('optgroup[data-deut]');if(old)old.remove();
  if(BN.length>66){const og=el("optgroup",{label:"Deuterocanonical","data-deut":"1"});BN.slice(66).forEach((b,i)=>{const o=el("option",{value:String(66+i)});o.textContent=b==="Song of the Three"?"Song of the Three (Daniel 3)":b;og.appendChild(o)});wcScope.insertBefore(og,wcScope.querySelector('optgroup:last-of-type'))}
  if(!wcScope.querySelector(`option[value="${wcScope.value}"]`)||(+wcScope.value>=BN.length))wcScope.value="all";
}
function countScope(sc){
  if(wcCache.has(sc))return wcCache.get(sc);
  const rows=sc==="all"?FLAT:sc==="ot"?FLAT.filter(r=>isOT(r.b)):sc==="nt"?FLAT.filter(r=>!isOT(r.b)):FLAT.filter(r=>r.b===+sc);
  const m=new Map();let words=0;
  const re=/[A-Za-z]+/g;
  for(const r of rows){
    const toks=lig(r.t).replace(/['\u2019]s\b/g,"").match(re)||[];
    toks.forEach((tok,i)=>{
      const k=tok.toLowerCase();words++;
      let e=m.get(k);if(!e){e={k,n:0,cap:0,mid:0};m.set(k,e)}
      e.n++;
      if(i>0){e.mid++;if(/^[A-Z]/.test(tok))e.cap++}
    });
  }
  const list=[...m.values()].sort((a,b)=>b.n-a.n||a.k.localeCompare(b.k));
  list.forEach(e=>{e.name=e.mid>=3&&e.cap/e.mid>=.9;e.disp=e.name?e.k[0].toUpperCase()+e.k.slice(1):e.k});
  const res={list,words,verses:rows.length};wcCache.set(sc,res);return res;
}
function renderWC(){
  if(!FLAT)return;
  const sc=wcScope.value,res=countScope(sc);
  const fl=wcFilter.value.trim().toLowerCase();
  let list=res.list;
  if(wcMode.value==="content")list=list.filter(e=>!STOP.has(e.k)&&e.k.length>1);
  if(fl)list=list.filter(e=>e.k.startsWith(fl));
  const fmt=n=>n.toLocaleString();
  document.getElementById("wcStats").innerHTML=
    `<div class="stat"><b>${fmt(res.words)}</b>words</div><div class="stat"><b>${fmt(res.list.length)}</b>different words</div><div class="stat"><b>${fmt(res.verses)}</b>verses</div>`;
  const box=document.getElementById("wcList");box.innerHTML="";
  if(!list.length){box.appendChild(el("p",{class:"status"},"No words match that filter."));return}
  const max=list[0].n;
  if(fl){const tot=list.reduce((a,e)=>a+e.n,0);const p=el("p",{class:"sumline"});p.textContent=`Words starting with \u201c${fl}\u201d are used ${fmt(tot)} times in all, across ${list.length} forms.`;box.appendChild(p)}
  list.slice(0,wcShown).forEach(e=>{
    const rank=res.list.indexOf(e)+1;
    const b=el("button",{class:"wrow",title:"See every verse"});
    b.innerHTML=`<span class="rk">${rank}</span><span class="w">${esc(e.disp)}</span><span class="track"><span class="fill" style="width:${Math.max(2,e.n/max*100)}%"></span></span><span class="n">${fmt(e.n)}</span>`;
    b.onclick=()=>{q2.value=e.k;runFind();document.getElementById("find").scrollIntoView({behavior:"smooth"})};
    box.appendChild(b);
  });
  if(list.length>wcShown){const more=el("button",{class:"btn ghost more"});more.textContent=`Show more (${fmt(list.length-wcShown)} left)`;more.onclick=()=>{wcShown+=100;renderWC()};box.appendChild(more)}
  const note=el("p",{class:"tiny"});note.textContent="Rank is the word's position among every word in this section. Possessives like Abraham's count under Abraham, and hyphenated names like Baal-zebub count as two words. Upper and lower case count together, so \u201cLord\u201d includes LORD, Lord, and lord. Psalm titles (like \u201cA Psalm of David\u201d) are not in this text, so they aren't counted.";box.appendChild(note);
}
[wcScope,wcMode].forEach(x=>x.addEventListener("change",()=>{wcShown=40;renderWC()}));
wcFilter.addEventListener("input",()=>{wcShown=40;renderWC()});
if(FLAT)renderWC();


// ---------- Linking notes to Scripture ----------
function refAlias(n){return ({"psalm":"Psalms","ps":"Psalms","song of songs":"Song of Solomon","canticles":"Song of Solomon","revelations":"Revelation","rev":"Revelation","ecclesiasticus":"Sirach","wisdom of solomon":"Wisdom","gen":"Genesis","matt":"Matthew","mt":"Matthew","mk":"Mark","lk":"Luke","jn":"John","rom":"Romans"})[n]}
// "John 3:16", "John 3:16-18", "John 3" (whole chapter). Returns null when it isn't a Bible reference.
function parseNoteRef(str){
  const m=String(str||"").trim().replace(/\s+/g," ").match(/^(.+?)\.? (\d+)(?:\s*:\s*(\d+)(?:\s*[-\u2013\u2014]\s*(\d+))?)?$/);
  if(!m)return null;
  const name=m[1].toLowerCase();
  let book;try{book=ALLBOOKS.find(b=>b.toLowerCase()===name)||refAlias(name)}catch(e){return null}
  if(!book)return null;
  const ch=+m[2],v1=m[3]?+m[3]:null,v2=m[3]?Math.max(+m[3],m[4]?+m[4]:+m[3]):null;
  const bi=BIBLE?BI(book):-1;
  if(bi>=0){const c=BIBLE[bi][ch-1];if(!c||(v1&&v1>c.length))return null}
  const label=`${book} ${ch}`+(v1?`:${v1}`+(v2>v1?`\u2013${v2}`:""):"");
  return {book,ch,v1,v2,label,inText:bi>=0};
}
function allNotes(){try{return NOTES.list||[]}catch(e){return []}}
// Notes whose linked passage touches this book / chapter / verse
function notesOn(book,ch,v){
  return allNotes().filter(n=>{const r=parseNoteRef(n.ref);if(!r||r.book!==book)return false;if(!ch)return true;if(r.ch!==ch)return false;if(!v||!r.v1)return true;return v>=r.v1&&v<=r.v2});
}
function noteSnippet(n){return n.title||(n.body||"").replace(/[\u201c\u201d]/g,"").replace(/\s+/g," ").trim().slice(0,70)||"Untitled note"}
function openNoteById(id){const n=allNotes().find(x=>x.id===id);if(!n)return;document.querySelector('.tab[data-tab="notes"]').click();openNote(n)}
function openNoteRef(r){verseRange=r.v1&&r.v2>r.v1?{book:r.book,ch:r.ch,v1:r.v1,v2:r.v2}:null;openVerse(r.book,r.ch,r.v1||"")}
function renderVerseNotes(book,ch,vs){
  const box=document.getElementById("vNotes");if(!box)return;box.innerHTML="";
  if(!book)return;
  const list=notesOn(book,ch,vs);
  const where=vs?`${book} ${ch}:${vs}`:ch?`${book} ${ch}`:book;
  if(!list.length&&!vs)return;
  const d=el("div",{class:"mynotes"});
  const h=el("p",{class:"sub"});h.textContent=list.length?`Your notes on ${where} (${list.length})`:`Your notes on ${where}`;d.appendChild(h);
  if(list.length){
    const ul=el("div",{class:"nlinks"});
    list.sort((a,b)=>(b.updated||0)-(a.updated||0)).forEach(n=>{
      const b=el("button",{class:"nlink"});const t=el("span");t.textContent=noteSnippet(n);
      const sm=el("small");const r=parseNoteRef(n.ref);sm.textContent=(r?r.label:"")+(n.updated?" \u00b7 edited "+fmtDate(n.updated):"");
      b.append(t,sm);b.onclick=()=>openNoteById(n.id);ul.appendChild(b);
    });
    d.appendChild(ul);
  }else{const p=el("p",{class:"gen",style:"margin:0 0 8px"});p.textContent="You haven't written a note on this verse yet.";d.appendChild(p)}
  if(vs&&!document.querySelector("#askBox > .passage")){
    const nb=el("button",{class:"btn ghost",style:"margin-left:0"});nb.textContent="Write a note on this verse";
    nb.onclick=()=>{noteFromVerse(`${book} ${ch}:${vs}`,getVerse(book,ch,vs)||"")};
    d.appendChild(nb);
  }
  // Put notes right under the verse text when it's shown; otherwise above the saved comparisons
  const first=document.querySelector("#askBox > .passage");
  if(first)first.after(d);else box.appendChild(d);
}
function notesChanged(){
  try{if(!document.getElementById("passages").hidden)renderVerses()}catch(e){}
  try{if(!document.getElementById("find").hidden&&fState&&fState.hits&&fState.hits.length)renderWords(null,false)}catch(e){}
}

// ---------- Notes ----------
const NOTES={store:null,uid:null,list:[],cur:null,timer:null,saving:Promise.resolve()};
const nEls=id=>document.getElementById(id);
const LS_KEY="mr-notes-v1";
function lsRead(){try{return JSON.parse(localStorage.getItem(LS_KEY)||"[]")}catch(e){return []}}
function lsWrite(list){try{localStorage.setItem(LS_KEY,JSON.stringify(list));return true}catch(e){return false}}
function newId(){return Date.now().toString(36)+Math.random().toString(36).slice(2,7)}

async function initNotes(){
  let db=null,user=null;
  try{[db,user]=await Promise.all([claude.use("db"),claude.use("user")])}catch(e){}
  let uid=null;try{uid=user?await user.id():null}catch(e){}
  if(db&&uid){
    NOTES.store="db";NOTES.uid=uid;
    const col=db.collection("data/users/"+uid);
    NOTES.col=col;
    col.onSnapshot(snap=>{
      NOTES.list=snap.docs.map(d=>({id:d.id,...d.data()}));
      if(NOTES.cur){const fresh=NOTES.list.find(n=>n.id===NOTES.cur.id);if(fresh&&!NOTES.timer)NOTES.cur={...fresh}}
      nEls("nStore").textContent="Saved to your account, so they follow you to any device. Only you can see them.";
      renderNotes();notesChanged();
    },()=>{fallbackLocal("Couldn't reach your account, so notes are saved in this browser only.")});
  }else fallbackLocal(window.claude?"Sign in to Claude to keep notes across devices. For now they're saved in this browser only.":"Notes are saved in this browser only.");
}
function fallbackLocal(msg){
  NOTES.store="local";NOTES.list=lsRead();
  nEls("nStore").textContent=msg;renderNotes();notesChanged();
}
async function persist(n){
  const data={title:n.title||"",ref:n.ref||"",body:n.body||"",created:n.created,updated:n.updated};
  if(NOTES.store==="db"){
    NOTES.saving=NOTES.saving.then(()=>NOTES.col.doc(n.id).set(data)).then(()=>true,()=>false);
    return NOTES.saving;
  }
  const i=NOTES.list.findIndex(x=>x.id===n.id);
  if(i<0)NOTES.list.push({id:n.id,...data});else NOTES.list[i]={id:n.id,...data};
  const ok=lsWrite(NOTES.list);notesChanged();return ok;
}
async function removeNote(id){
  if(NOTES.store==="db"){try{await NOTES.col.doc(id).delete()}catch(e){return false}return true}
  NOTES.list=NOTES.list.filter(x=>x.id!==id);const ok=lsWrite(NOTES.list);notesChanged();return ok;
}
function fmtDate(t){try{return new Date(t).toLocaleString([], {month:"short",day:"numeric",year:"numeric",hour:"numeric",minute:"2-digit"})}catch(e){return ""}}
function renderNotes(){
  const box=nEls("nList");box.innerHTML="";
  const q=nEls("nSearch").value.trim().toLowerCase();
  let list=[...NOTES.list].sort((a,b)=>(b.updated||0)-(a.updated||0));
  if(q)list=list.filter(n=>((n.title||"")+" "+(n.ref||"")+" "+(n.body||"")).toLowerCase().includes(q));
  const bibleOrder=nEls("nSort").value==="bible";
  if(bibleOrder){const key=n=>{const r=parseNoteRef(n.ref);return r?[ALLBOOKS.indexOf(r.book),r.ch,r.v1||0]:[999,0,0]};list.sort((a,b)=>{const x=key(a),y=key(b);return x[0]-y[0]||x[1]-y[1]||x[2]-y[2]})}
  if(!list.length){
    const p=el("p",{class:"status"});
    p.textContent=q?"No notes match that search.":"No notes yet. Tap New note to start one, or tap Note beside any verse in the Find tab.";
    box.appendChild(p);return;
  }
  let lastBook=null;
  list.forEach(n=>{
    const r=parseNoteRef(n.ref);
    if(bibleOrder){const bk=r?r.book:"Not linked to a verse";if(bk!==lastBook){const h=el("h3",{class:"nbook"});h.textContent=bk;box.appendChild(h);lastBook=bk}}
    const item=el("div",{class:"nitem"});
    const b=el("button",{class:"nmain"});
    const t=el("b");t.textContent=n.title||(n.ref?n.ref:"Untitled note");
    const pv=el("span",{class:"np"});pv.textContent=(n.ref&&n.title&&!r?n.ref+" — ":"")+(n.body||"").replace(/\s+/g," ").slice(0,140);
    const d=el("span",{class:"nd"});d.textContent="Edited "+fmtDate(n.updated);
    b.append(t,pv,d);b.onclick=()=>openNote(n);item.appendChild(b);
    if(r){const c=el("button",{class:"refchip",title:"Read this passage"});c.textContent=r.label;c.onclick=()=>openNoteRef(r);item.appendChild(c)}
    box.appendChild(item);
  });
}
function syncRefBtn(){
  const raw=nEls("nRef").value.trim(),r=parseNoteRef(raw),pv=nEls("nRefPrev");
  nEls("nOpenRef").hidden=!r;pv.innerHTML="";
  if(!raw)return;
  if(!r){pv.textContent="Not linked to a verse. To link this note, type a reference like John 3:16, Romans 8:28-30, or Psalms 23.";return}
  const ok=el("span",{class:"ok"});ok.textContent="Linked to "+r.label;pv.appendChild(ok);
  if(!(BIBLE&&BI(r.book)>=0)){pv.appendChild(document.createTextNode(`. This book isn't in the ${VERSIONS[VER].name} text built into the app, but the note will still show up on it in the Verses tab.`));return}
  pv.appendChild(document.createTextNode(". This note will show up whenever you open this passage."));
  if(BIBLE&&r.v1&&BI(r.book)>=0){const last=Math.min(r.v2,r.v1+5);let t="";for(let v=r.v1;v<=last;v++){const x=getVerse(r.book,r.ch,v);if(x)t+=(r.v2>r.v1?v+" ":"")+x+" "}if(r.v2>last)t+="\u2026";const q=el("span",{class:"rpq"});q.textContent=t.trim();pv.appendChild(q)}
}
function openNote(n){
  NOTES.cur={...n};
  nEls("nTitle").value=n.title||"";nEls("nRef").value=n.ref||"";nEls("nBody").value=n.body||"";
  nEls("nSaved").textContent=n.updated?"Saved "+fmtDate(n.updated):"";
  syncRefBtn();
  nEls("nListView").hidden=true;nEls("nEditView").hidden=false;
}
function newNote(ref,body){
  const t=Date.now();
  openNote({id:newId(),title:"",ref:ref||"",body:body||"",created:t,updated:0});
  (ref?nEls("nBody"):nEls("nTitle")).focus();
}
function scheduleSave(){
  if(!NOTES.cur)return;
  nEls("nSaved").textContent="Saving…";
  clearTimeout(NOTES.timer);
  NOTES.timer=setTimeout(flushNote,700);
}
async function flushNote(){
  clearTimeout(NOTES.timer);NOTES.timer=null;
  const n=NOTES.cur;if(!n)return;
  n.title=nEls("nTitle").value;n.ref=nEls("nRef").value;n.body=nEls("nBody").value;
  if(!n.title.trim()&&!n.ref.trim()&&!n.body.trim()&&!n.updated){nEls("nSaved").textContent="";return}
  n.updated=Date.now();
  const ok=await persist(n);
  if(NOTES.cur&&NOTES.cur.id===n.id)nEls("nSaved").textContent=ok?"Saved "+fmtDate(n.updated):"Not saved. Check your connection; your text is still here.";
  if(NOTES.store==="local")renderNotes();
}
["nTitle","nRef","nBody"].forEach(id=>nEls(id).addEventListener("input",()=>{scheduleSave();if(id==="nRef")syncRefBtn()}));
nEls("nBack").onclick=async()=>{if(NOTES.timer)await flushNote();NOTES.cur=null;nEls("nEditView").hidden=true;nEls("nListView").hidden=false;renderNotes()};
nEls("nNew").onclick=()=>newNote();
nEls("nSearch").addEventListener("input",renderNotes);
nEls("nSort").addEventListener("change",renderNotes);
nEls("nDel").onclick=async()=>{
  const n=NOTES.cur;if(!n)return;
  if(!confirm("Delete this note? This can't be undone."))return;
  clearTimeout(NOTES.timer);NOTES.timer=null;
  if(n.updated)await removeNote(n.id);
  NOTES.cur=null;nEls("nEditView").hidden=true;nEls("nListView").hidden=false;renderNotes();
};
nEls("nOpenRef").onclick=async()=>{const r=parseNoteRef(nEls("nRef").value);if(!r)return;if(NOTES.timer)await flushNote();openNoteRef(r)};
window.addEventListener("pagehide",()=>{if(NOTES.timer)flushNote()});
function noteFromVerse(ref,text){
  document.querySelector('.tab[data-tab="notes"]').click();
  newNote(ref,text?"“"+text+"”\n\n":"");
  const b=nEls("nBody");b.setSelectionRange(b.value.length,b.value.length);
}

// ---------- Back up, move and restore notes ----------
const NOTE_LIMITS={file:5*1024*1024,count:5000,title:300,ref:120,body:200000};
function ioMsg(t){nEls("nIoMsg").textContent=t||""}
function stamp(){const d=new Date();return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")}
function cleanNotes(){return [...NOTES.list].sort((a,b)=>(a.created||0)-(b.created||0)).map(n=>({id:n.id,title:n.title||"",ref:n.ref||"",body:n.body||"",created:n.created||0,updated:n.updated||0}))}
async function offerFile(filename,data,mime){
  let dl=null;try{dl=window.claude?await claude.use("downloads"):null}catch(e){}
  if(dl){
    try{await dl.save({filename,data});return "saved"}
    catch(e){if(e&&e.code==="declined")return "declined";if(e&&e.code==="rate_limited")return "busy"}
  }
  try{
    const url=URL.createObjectURL(new Blob([data],{type:mime}));
    const a=el("a",{href:url,download:filename});document.body.appendChild(a);a.click();a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),4000);return "saved";
  }catch(e){return "failed"}
}
async function exportNotes(kind){
  if(NOTES.timer)await flushNote();
  const list=cleanNotes();
  if(!list.length){ioMsg("You don't have any notes to save yet.");return}
  let name,data,mime;
  if(kind==="md"){
    name=`bible-notes-${stamp()}.md`;mime="text/markdown";
    data="# My Bible notes\n\nSaved from Same Book, Many Readings on "+new Date().toLocaleDateString()+".\n";
    list.forEach(n=>{data+="\n---\n\n## "+(n.title||n.ref||"Untitled note").replace(/\n/g," ")+"\n\n";if(n.ref)data+="**Passage:** "+n.ref+"  \n";data+="*Last edited "+fmtDate(n.updated||n.created)+"*\n\n"+(n.body||"")+"\n"});
  }else{
    name=`bible-notes-backup-${stamp()}.json`;mime="application/json";
    data=JSON.stringify({app:"same-book-many-readings",kind:"notes",version:1,exported:new Date().toISOString(),notes:list},null,2);
  }
  const r=await offerFile(name,data,mime);
  ioMsg(r==="saved"?`Saved ${list.length} note${list.length===1?"":"s"} to ${name}.`+(kind==="md"?"":" Keep it somewhere safe; you can restore it here on any device."):r==="declined"?"Nothing was saved.":r==="busy"?"A save is already waiting for your answer.":"Your browser didn't allow the download.");
}
function readImport(text){
  let j;try{j=JSON.parse(text)}catch(e){throw new Error("That file isn't a notes backup (it isn't valid JSON).")}
  const arr=Array.isArray(j)?j:(j&&j.app==="same-book-many-readings"&&Array.isArray(j.notes))?j.notes:null;
  if(!arr)throw new Error("That file isn't a notes backup from this app.");
  if(arr.length>NOTE_LIMITS.count)throw new Error(`That backup has more than ${NOTE_LIMITS.count} notes, which is more than this app can restore at once.`);
  const out=[];let bad=0;
  arr.forEach(n=>{
    if(!n||typeof n!=="object"){bad++;return}
    const str=(v,max)=>typeof v==="string"?v.slice(0,max):"";
    const num=v=>Number.isFinite(v)&&v>0&&v<8.64e15?Math.floor(v):0;
    const x={id:typeof n.id==="string"&&/^[A-Za-z0-9_-]{1,64}$/.test(n.id)?n.id:"",
      title:str(n.title,NOTE_LIMITS.title),ref:str(n.ref,NOTE_LIMITS.ref),body:str(n.body,NOTE_LIMITS.body),created:num(n.created),updated:num(n.updated)};
    if(!x.title.trim()&&!x.ref.trim()&&!x.body.trim()){bad++;return}
    if(!x.id){let h=2166136261;for(const ch of [x.created,x.title,x.ref,x.body].join("\u0000")){h^=ch.codePointAt(0);h=Math.imul(h,16777619)>>>0}x.id="imp"+h.toString(36)}
    if(!x.created)x.created=x.updated||Date.now();if(!x.updated)x.updated=x.created;
    out.push(x);
  });
  return {notes:out,bad};
}
async function importNotes(file){
  if(!file)return;
  if(file.size>NOTE_LIMITS.file){ioMsg("That file is too large to be a notes backup.");return}
  if(!NOTES.store){ioMsg("Your notes are still opening. Try again in a moment.");return}
  let parsed;try{parsed=readImport(await file.text())}catch(e){ioMsg(e.message);return}
  if(!parsed.notes.length){ioMsg("That backup didn't contain any notes.");return}
  const have=new Map(NOTES.list.map(n=>[n.id,n]));
  const add=[],upd=[];let same=0;
  parsed.notes.forEach(n=>{const h=have.get(n.id);if(!h)add.push(n);else if((n.updated||0)>(h.updated||0))upd.push(n);else same++});
  if(!add.length&&!upd.length){ioMsg("Everything in that backup is already here. Nothing changed.");return}
  if(upd.length&&!confirm(`${upd.length} note${upd.length===1?"":"s"} in the backup ${upd.length===1?"is":"are"} newer than the copy here and will replace it. Continue?`)){ioMsg("Restore cancelled. Nothing changed.");return}
  ioMsg("Restoring…");
  let ok=0,fail=0;
  if(NOTES.store==="db"){
    for(const n of [...add,...upd]){if(await persist(n))ok++;else fail++}
  }else{
    const byId=new Map(NOTES.list.map(n=>[n.id,n]));[...add,...upd].forEach(n=>byId.set(n.id,n));
    const next=[...byId.values()];
    if(lsWrite(next)){NOTES.list=next;ok=add.length+upd.length}else fail=add.length+upd.length;
    renderNotes();notesChanged();
  }
  const parts=[];
  if(ok)parts.push(`Restored ${ok} note${ok===1?"":"s"}`+(upd.length?` (${upd.length} updated)`:"")+".");
  if(same)parts.push(`${same} ${same===1?"was":"were"} already up to date.`);
  if(parsed.bad)parts.push(`${parsed.bad} empty or unreadable entr${parsed.bad===1?"y was":"ies were"} skipped.`);
  if(fail)parts.push(`${fail} couldn't be saved`+(NOTES.store==="local"?" because this browser's storage is full or blocked.":". Check your connection and try again."));
  ioMsg(parts.join(" "));
}
nEls("nExport").onclick=()=>exportNotes("json");
nEls("nExportMd").onclick=()=>exportNotes("md");
nEls("nImportBtn").onclick=()=>nEls("nImport").click();
nEls("nImport").addEventListener("change",e=>{const f=e.target.files&&e.target.files[0];e.target.value="";importNotes(f)});
initNotes();
//@include data/saints.js

const S_FILTERS=[["all","All"],["bible","In the Bible"],["apostle","Apostles"],["early","Early Church"],["doctor","Doctors of the Church"],["martyr","Martyrs"],["americas","The Americas"],["modern","1800s to today"],["orthodox","Orthodox saints"],["ethiopian","Ethiopian saints"]];
const TRADNAME={catholic:"Catholic",orthodox:"Orthodox",anglican:"Anglican",lutheran:"Lutheran",ethiopian:"Ethiopian Orthodox"};
const MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"];
let sFilter="all",sSort="az",sCur=null;
const sEl=id=>document.getElementById(id);
function sMatch(x,q){
  if(!q)return true;
  const hay=[x.n,...(x.aka||[]),x.patron||"",x.bio].join(" ").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"");
  return q.split(/\s+/).every(w=>hay.includes(w));
}
function canonLabel(x){
  if(x.k==="canonized")return "Canonized "+x.cy;
  if(x.k==="glor")return "Glorified "+x.cy;
  return "Honored since early times";
}
function renderSaints(){
  const q=sEl("sQ").value.trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"");
  let list=SAINTS.filter(x=>(sFilter==="all"||x.tags.includes(sFilter))&&sMatch(x,q));
  const nameHit=x=>{if(!q)return 0;const nm=[x.n,...(x.aka||[])].join(" ").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");return q.split(/\s+/).every(w=>nm.includes(w))?0:1};
  const yr=x=>x.cy||0;
  if(sSort==="az")list.sort((a,b)=>nameHit(a)-nameHit(b)||a.n.localeCompare(b.n));
  else if(sSort==="new")list.sort((a,b)=>yr(b)-yr(a)||a.n.localeCompare(b.n));
  else if(sSort==="old")list.sort((a,b)=>(yr(a)||9999)-(yr(b)||9999)||a.dY-b.dY);
  else if(sSort==="lived")list.sort((a,b)=>a.dY-b.dY);
  else if(sSort==="feast"){const t=new Date(),ty=(t.getMonth()+1)*100+t.getDate();const key=x=>{const v=x.feast[0]*100+x.feast[1];return v>=ty?v-ty:v+1300-ty};list.sort((a,b)=>key(a)-key(b))}
  const box=sEl("sList");box.innerHTML="";
  sEl("sCount").textContent=list.length===SAINTS.length?`${list.length} saints`:`${list.length} of ${SAINTS.length} saints`;
  if(!list.length){box.appendChild(el("p",{class:"status"},"No saints match. Try another spelling or a different filter."));return}
  list.forEach(x=>{
    const b=el("button",{class:"scard"+(x.k==="glor"?" orth":x.k==="pre"?" pre":"")});
    const fd=`${MONTHS[x.feast[0]-1].slice(0,3)} ${x.feast[1]}`;
    b.innerHTML=`<b>${esc(x.n)}</b><span class="sl">${esc(x.life)}</span><span class="sm"><span>${esc(canonLabel(x))}</span><span>Feast ${esc(fd)}</span></span>`;
    b.onclick=()=>openSaint(x);box.appendChild(b);
  });
}
function openSaint(x){
  sCur=x;const d=sEl("sDetail");d.innerHTML="";
  const back=el("button",{class:"mini link"});back.textContent="← All saints";back.onclick=closeSaint;d.appendChild(back);
  const sl=el("button",{class:"notebtn","aria-label":"Copy a link to "+x.n});sl.textContent="Link";sl.onclick=()=>shareLink("#saints/"+x.id,sl);d.appendChild(sl);
  const h=el("h2",{class:"sname"});h.textContent=x.n;d.appendChild(h);
  if(x.aka&&x.aka.length){const a=el("p",{class:"saka"});a.textContent="Also known as "+x.aka.join(", ");d.appendChild(a)}
  const g=el("dl",{class:"sfacts"});
  const add=(k,v)=>{if(!v)return;const dt=el("dt");dt.textContent=k;const dd=el("dd");dd.textContent=v;g.append(dt,dd)};
  add("Lived",x.life);add("Feast day",x.feastTxt);add("Patron of",x.patron);
  if(x.doctor)add("Doctor of the Church",x.doctor);
  add("Honored by",(x.trad||[]).map(t=>TRADNAME[t]).join(", "));
  d.appendChild(g);
  // Path to sainthood
  const c=el("div",{class:"canon"});
  const ch=el("p",{class:"sub",style:"margin-top:0"});
  ch.textContent=x.k==="canonized"?"Canonization":x.k==="glor"?"Glorification":"Recognition";c.appendChild(ch);
  if(x.k==="canonized"||x.k==="glor"){
    const gap=x.cy-Math.round(x.dY);
    const line=el("p",{class:"cbig"});
    line.textContent=`${x.canonDate}, by ${x.by}`;c.appendChild(line);
    const span=el("div",{class:"cspan"});
    const w=Math.max(4,Math.min(100,gap/10));
    span.innerHTML=`<div class="ctrack"><span class="cbar" style="width:${w}%"></span></div><div class="clab"><span>Died ${Math.round(x.dY)}</span><span>${x.fast?"Less than a year later":gap<=1?"About a year later":"About "+gap+" years later"}</span></div>`;
    c.appendChild(span);
  }
  if(x.canonTxt){const p=el("p",{style:"margin:6px 0 0"});p.textContent=x.canonTxt;c.appendChild(p)}
  d.appendChild(c);
  const bio=el("p",{class:"sbio"});bio.textContent=x.bio;d.appendChild(bio);
  if(x.refs){
    const rh=el("p",{class:"sub"});rh.textContent="In the Bible";d.appendChild(rh);
    const rc=el("div",{class:"refchips"});
    x.refs.forEach(r=>{const b=el("button",{class:"refchip"});b.textContent=r.replace("-","–");b.onclick=()=>{const {book,ch,v1}=parseRange(r);openVerse(book,ch,v1)};rc.appendChild(b)});
    d.appendChild(rc);
  }
  const act=el("div",{class:"erow",style:"justify-content:flex-start"});
  if(x.find){const fb=el("button",{class:"btn"});fb.textContent="Find every mention";fb.onclick=()=>{document.querySelector('.tab[data-tab="find"]').click();q2.value=x.find.join(", ");runFind()};act.appendChild(fb)}
  const nb=el("button",{class:"btn ghost",style:"margin-left:0"});nb.textContent="Add a note";nb.onclick=()=>noteFromVerse(x.n,"");act.appendChild(nb);
  d.appendChild(act);
  sEl("sListView").hidden=true;d.hidden=false;window.scrollTo({top:document.querySelector("nav").offsetTop});
  syncHash();
}
function closeSaint(){sCur=null;sEl("sDetail").hidden=true;sEl("sListView").hidden=false;syncHash()}

// Today's feast
(function(){
  const t=new Date(),m=t.getMonth()+1,dd=t.getDate();
  const today=SAINTS.filter(x=>x.feast[0]===m&&x.feast[1]===dd);
  const box=sEl("sToday");
  if(!today.length){box.hidden=true;return}
  box.innerHTML=`<span>Feast today</span>`;
  today.forEach(x=>{const b=el("button",{class:"chip"});b.textContent=x.n;b.onclick=()=>openSaint(x);box.appendChild(b)});
})();

// Timeline of canonizations
(function(){
  const pts=SAINTS.filter(x=>x.k!=="pre");
  const W=1000,H=118,x0=20,x1=980,y0=900,y1=2030;
  const X=y=>x0+(y-y0)/(y1-y0)*(x1-x0);
  let svg=`<svg viewBox="0 0 ${W} ${H}" class="tl" role="group" aria-label="Timeline of canonization years, from 993 to 2025">`;
  svg+=`<line x1="${x0}" y1="70" x2="${x1}" y2="70" stroke="var(--line)" stroke-width="2"/>`;
  [1000,1200,1400,1600,1800,2000].forEach(y=>{svg+=`<line x1="${X(y)}" y1="64" x2="${X(y)}" y2="76" stroke="var(--muted)" stroke-width="1.5"/><text x="${X(y)}" y="98" text-anchor="middle" font-size="20" fill="var(--muted)" font-family="Bricolage Grotesque, sans-serif">${y}</text>`});
  const used={};
  pts.sort((a,b)=>a.cy-b.cy).forEach(x=>{
    const bucket=Math.round(X(x.cy)/14);used[bucket]=(used[bucket]||0)+1;
    const cy=70-(used[bucket]-1)*13;
    const col=x.k==="glor"?"var(--orth)":"var(--saint)";
    svg+=`<circle cx="${X(x.cy)}" cy="${cy}" r="6" fill="${col}" stroke="var(--bg)" stroke-width="1.5" data-id="${x.id}" tabindex="0" role="button" aria-label="${esc(x.n)}, ${x.cy}"><title>${esc(x.n)} (${x.cy})</title></circle>`;
  });
  svg+="</svg>";
  const box=sEl("sTimeline");box.innerHTML=svg;
  box.querySelectorAll("circle").forEach(c=>{
    const go=()=>openSaint(SAINTS.find(x=>x.id===c.dataset.id));
    c.addEventListener("click",go);c.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();go()}});
  });
  const n20=SAINTS.filter(x=>x.k==="canonized"&&x.cy>=1900).length,nk=SAINTS.filter(x=>x.k==="canonized").length;
  sEl("sTlNote").textContent=`${n20} of the ${nk} formal canonizations in this list happened after 1900. Popes in the last century have canonized far more saints than ever before; John Paul II alone canonized 482.`;
})();

const sf=sEl("sFilters");
S_FILTERS.forEach(([k,t])=>{const b=el("button",{class:"chip","aria-pressed":k===sFilter});b.textContent=t;b.onclick=()=>{sFilter=k;sf.querySelectorAll(".chip").forEach(c=>c.setAttribute("aria-pressed",c===b));renderSaints()};sf.appendChild(b)});
sEl("sQ").addEventListener("input",renderSaints);
sEl("sSort").addEventListener("change",e=>{sSort=e.target.value;renderSaints()});
document.querySelectorAll(".tab").forEach(t=>t.addEventListener("click",()=>{if(t.dataset.tab!=="saints")closeSaint()}));
renderSaints();


//@include data/other-books.js

const INC_NAME={p:"Protestant",c:"Catholic",o:"Orthodox",e:"Ethiopian"};
const INC_TXT={y:"In the Bible",a:"In an appendix",n:"Not included",u:"Not confirmed"};
const incTxt=(b,k)=>k==="e"&&b.eTxt?b.eTxt:INC_TXT[b.inc[k]];
let xbCat="all";
const xEl=id=>document.getElementById(id);
function xbRender(){
  const q=xEl("xbQ").value.trim().toLowerCase();
  let list=XBOOKS.filter(b=>(xbCat==="all"||b.cat===xbCat)&&(!q||[b.n,...(b.aka||[]),b.desc,b.why].join(" ").toLowerCase().includes(q)));
  const box=xEl("xbList");box.innerHTML="";
  xEl("xbCount").textContent=list.length===XBOOKS.length?`${list.length} books`:`${list.length} of ${XBOOKS.length} books`;
  if(!list.length){box.appendChild(el("p",{class:"status"},"No books match. Try another name, like Enoch or Thomas."));return}
  const cats=xbCat==="all"?XB_CATS:XB_CATS.filter(c=>c[0]===xbCat);
  cats.forEach(([k,label,sub])=>{
    const items=list.filter(b=>b.cat===k);if(!items.length)return;
    const h=el("h3",{class:"xbh"});h.textContent=label;box.appendChild(h);
    const p=el("p",{class:"hint"});p.textContent=sub;box.appendChild(p);
    items.forEach(b=>box.appendChild(xbCard(b)));
  });
}
function xbCard(b){
  const d=el("details",{class:"xb",id:"xb-"+b.id});
  const s=el("summary");
  const dots=["p","c","o","e"].map(k=>`<span class="inc inc-${b.inc[k]}" title="${INC_NAME[k]}: ${incTxt(b,k)}">${INC_NAME[k][0]}</span>`).join("");
  s.innerHTML=`<span class="xbt"><b>${esc(b.n)}</b><span>${esc(b.date)}</span></span><span class="incs" aria-label="${["p","c","o","e"].map(k=>INC_NAME[k]+": "+incTxt(b,k)).join(", ")}">${dots}</span>`;
  d.appendChild(s);
  const body=el("div",{class:"xbb"});
  if(b.aka){const a=el("p",{class:"saka"});a.textContent="Also called "+b.aka.join(", ");body.appendChild(a)}
  const add=(label,text,cls)=>{if(!text)return;const h=el("p",{class:"xbl"+(cls?" "+cls:"")});h.textContent=label;const p=el("p");p.textContent=text;body.append(h,p)};
  add("What it is",b.desc);
  add(b.cat==="lost"?"What happened to it":b.cat==="deutero"?"Why Protestant Bibles leave it out":b.cat==="orthodox"||b.cat==="ethiopian"?"Why most Bibles leave it out":"Why it was left out",b.why);
  add(b.cat==="deutero"||b.inc.o!=="n"||b.inc.e==="y"?"Why some churches kept it":"Its influence",b.kept);
  const tb=el("div",{class:"inctable"});
  ["p","c","o","e"].forEach(k=>{const r=el("span",{class:"inc-row inc-"+b.inc[k]});r.innerHTML=`<i></i>${INC_NAME[k]}: ${incTxt(b,k)}`;tb.appendChild(r)});
  if(b.kjv){const r=el("span",{class:"inc-row inc-a"});r.innerHTML="<i></i>1611 King James Version: In its Apocrypha section";tb.appendChild(r)}
  body.appendChild(tb);
  const refs=(b.see||[]).filter(r=>BOOKS66.includes(parseRange(r).book));
  if(refs.length){
    const h=el("p",{class:"xbl"});h.textContent=b.cat==="lost"?"Where the Bible mentions it":"Connected verses";body.appendChild(h);
    const rc=el("div",{class:"refchips"});
    refs.forEach(r=>{const x=parseRange(r);const btn=el("button",{class:"refchip"});btn.textContent=r;btn.onclick=()=>openVerse(x.book,x.ch,x.v1);rc.appendChild(btn)});
    body.appendChild(rc);
  }
  const rl=READ[b.id],nr=NOREAD[b.id];
  if(rl||nr){
    const h=el("p",{class:"xbl"});h.textContent="Read it";body.appendChild(h);
    if(rl){const wrap=el("div",{class:"reads"});rl.forEach(x=>{
      const a=el("a",{class:"readlink",href:x.u,target:"_blank",rel:"noopener noreferrer"});
      const t=el("b");t.textContent=x.l;const n=el("span");n.textContent=x.n;a.append(t,n);
      const row=el("div",{class:"readrow"});row.appendChild(a);
      if(x.v){const v=el("a",{class:"mini link",href:x.v,target:"_blank",rel:"noopener noreferrer"});v.textContent="Read in browser";row.appendChild(v)}
      wrap.appendChild(row)});body.appendChild(wrap)}
    if(nr){const p=el("p");p.textContent=nr;body.appendChild(p)}
  }
  const nb=el("button",{class:"mini link"});nb.textContent="Add a note about this book";nb.onclick=()=>noteFromVerse(b.n,"");body.appendChild(nb);
  d.appendChild(body);
  return d;
}



// Canon timeline
(function(){
  const EV=[
   {y:-150,lbl:"3rd–1st c. BC",t:"Greek Old Testament (Septuagint) in use",d:"Jews in Egypt use a Greek Bible that includes books not in the Hebrew canon. Early Christians read this version."},
   {y:100,lbl:"Around AD 100",t:"Hebrew canon settled",d:"Jewish teachers recognize 24 books, the same content as the Protestant Old Testament's 39."},
   {y:200,lbl:"Around 200",t:"Muratorian Fragment",d:"An early list of New Testament books, around 200, accepting most of today's books and setting aside the Shepherd of Hermas."},
   {y:367,t:"Athanasius's Easter letter",d:"The first known list of exactly the 27 books of today's New Testament."},
   {y:397,lbl:"393 and 397",t:"Councils of Hippo and Carthage",d:"North African councils (393, 397) list the Old Testament with the deuterocanonical books, and the 27 New Testament books."},
   {y:405,lbl:"Around 405",t:"Jerome finishes the Vulgate",d:"Jerome translates the Old Testament from Hebrew and says the extra books are for instruction, not doctrine. Latin Bibles built on his work still included them."},
   {y:1534,t:"Luther's complete Bible",d:"Luther gathers the deuterocanonical books in a section between the Testaments, “not held equal to Holy Scripture, but useful and good to read.”"},
   {y:1546,t:"Council of Trent",d:"The Catholic Church formally defines its 73-book canon, including the deuterocanonical books."},
   {y:1611,t:"King James Version",d:"Printed with 14 books of Apocrypha between the Testaments, as most English Bibles were at the time."},
   {y:1647,t:"Westminster Confession",d:"Reformed Protestants declare the Apocrypha “no part of the canon of the Scripture.” Within two centuries most Protestant Bibles dropped it."},
   {y:1672,t:"Synod of Jerusalem",d:"Orthodox bishops affirm the deuterocanonical books as Scripture."},
   {y:1945,t:"Nag Hammadi discovery",d:"Farmers in Egypt find a jar of 13 ancient books, including the Gospels of Thomas and Philip."},
   {y:1947,t:"Dead Sea Scrolls found",d:"Fragments of Tobit, Sirach, 1 Enoch, Jubilees, and Psalm 151 are found alongside the oldest known copies of the Hebrew Bible."}
  ];
  const W=1000,H=110,x0=30,x1=970,y0=-200,y1=2000;
  const X=y=>x0+(y-y0)/(y1-y0)*(x1-x0);
  let svg=`<svg viewBox="0 0 ${W} ${H}" class="tl" role="group" aria-label="Timeline of how the Bible's contents were decided">`;
  svg+=`<line x1="${x0}" y1="50" x2="${x1}" y2="50" stroke="var(--line)" stroke-width="2"/>`;
  [[-200,"200 BC"],[0,"AD 1"],[500,"500"],[1000,"1000"],[1500,"1500"],[2000,"2000"]].forEach(([y,l])=>{svg+=`<line x1="${X(y)}" y1="44" x2="${X(y)}" y2="56" stroke="var(--muted)" stroke-width="1.5"/><text x="${X(y)}" y="82" text-anchor="middle" font-size="20" fill="var(--muted)" font-family="Bricolage Grotesque, sans-serif">${l}</text>`});
  const used={};
  EV.forEach((e,i)=>{const b=Math.round(X(e.y)/16);used[b]=(used[b]||0)+1;const cy=50-(used[b]-1)*13;svg+=`<circle cx="${X(e.y)}" cy="${cy}" r="7" fill="var(--ink)" stroke="var(--bg)" stroke-width="1.5" data-i="${i}" tabindex="0" role="button" aria-label="${esc(e.t)}"><title>${esc(e.t)}</title></circle>`});
  svg+="</svg>";
  const box=xEl("xbTl");box.innerHTML=svg;
  const info=xEl("xbTlInfo");
  const show=i=>{const e=EV[i];info.innerHTML="";const b=el("b");b.textContent=(e.lbl||e.y)+": "+e.t;const p=el("span");p.textContent=" "+e.d;info.append(b,p);box.querySelectorAll("circle").forEach(c=>c.setAttribute("fill",c.dataset.i==i?"var(--saint)":"var(--ink)"))};
  box.querySelectorAll("circle").forEach(c=>{c.addEventListener("click",()=>show(+c.dataset.i));c.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();show(+c.dataset.i)}})});
  show(3);
})();

const xbf=xEl("xbFilters");
[["all","All"],...XB_CATS.map(c=>[c[0],c[1]])].forEach(([k,t])=>{const b=el("button",{class:"chip","aria-pressed":k===xbCat});b.textContent=t;b.onclick=()=>{xbCat=k;xbf.querySelectorAll(".chip").forEach(c=>c.setAttribute("aria-pressed",c===b));xbRender()};xbf.appendChild(b)});
xEl("xbQ").addEventListener("input",xbRender);
xbRender();


//@include data/church-tree.js
const FT_LANES=22, FT_W=1000, FT_LH=30, FT_TOP=24;
function ftX(y){const P=[[33,10],[1000,150],[1500,300],[2030,990]];for(let i=1;i<P.length;i++){if(y<=P[i][0]){const [a,xa]=P[i-1],[b,xb]=P[i];return xa+(y-a)/(b-a)*(xb-xa)}}return 990}
function ftY(l){return FT_TOP+l*FT_LH+14}
function drawTree(){
  const H=FT_TOP+FT_LANES*FT_LH+40;
  let g="";
  [500,1000,1500,1600,1700,1800,1900,2000].forEach(y=>{const x=ftX(y);g+=`<line x1="${x}" y1="${FT_TOP-6}" x2="${x}" y2="${H-30}" stroke="var(--line)" stroke-width="1" stroke-dasharray="2 4"/><text x="${x}" y="${H-12}" text-anchor="middle" font-size="12" fill="var(--muted)" font-family="Bricolage Grotesque, sans-serif">${y}</text>`});
  const byId=Object.fromEntries(FT.map(n=>[n.id,n]));
  // connectors first
  FT.forEach(n=>{
    const par=n.p?byId[n.p]:null;if(!par)return;
    const x=ftX(n.y),y1=ftY(par.lane),y2=ftY(n.lane);
    g+=`<path d="M${x-14} ${y1} C${x-2} ${y1}, ${x-8} ${y2}, ${x} ${y2}" fill="none" stroke="${n.c}" stroke-width="3" ${n.dashed?'stroke-dasharray="5 4"':''} opacity=".9"/>`;
  });
  FT.forEach(n=>{
    const x1=ftX(n.y),x2=ftX(n.end||2030),y=ftY(n.lane);
    const right=x1>790;
    const lx=right?x1-10:x1+9,anchor=right?"end":"start";
    g+=`<g class="ftb" data-id="${n.id}" tabindex="0" role="button" aria-label="${esc(n.n)}, ${esc(n.when)}">`+
      `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="transparent" stroke-width="22"/>`+
      `<line class="ftl" x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${n.c}" stroke-width="${n.trunk||n.id==="early"?6:4}" stroke-linecap="round"/>`+
      `<circle cx="${x1}" cy="${y}" r="6" fill="var(--bg)" stroke="${n.c}" stroke-width="3"/>`+
      `<text x="${lx}" y="${y-8}" text-anchor="${anchor}" font-size="13" font-weight="600" fill="var(--ink)" stroke="var(--surface)" stroke-width="5" stroke-linejoin="round" paint-order="stroke" font-family="Bricolage Grotesque, sans-serif">${esc(n.n)} <tspan fill="var(--muted)" font-weight="400">${n.y===33?"c. 33":n.y}</tspan></text></g>`;
  });
  const box=document.getElementById("ftSvg");
  box.innerHTML=`<svg viewBox="0 0 ${FT_W} ${H}" role="group" aria-label="Family tree of Christian churches">${g}</svg>`;
  box.querySelectorAll(".ftb").forEach(el2=>{
    const go=()=>showBranch(el2.dataset.id,true);
    el2.addEventListener("click",go);el2.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();go()}});
  });
}
function showBranch(id,scroll){
  const n=FT.find(x=>x.id===id);if(!n)return;
  document.querySelectorAll("#ftSvg .ftb").forEach(g=>g.classList.toggle("sel",g.dataset.id===id));
  const par=n.p?FT.find(x=>x.id===n.p):null;
  const d=document.getElementById("ftInfo");d.innerHTML="";d.style.setProperty("--k",n.c);
  const h=el("h3");h.textContent=n.n;d.appendChild(h);
  const m=el("p",{class:"ftmeta"});m.textContent=n.when+(n.rel?` · ${n.rel}`:par?` · Split from: ${par.n}`:n.id==="lds"?" · Arose independently":"");d.appendChild(m);
  const p=el("p");p.textContent=n.story;d.appendChild(p);
  if(n.why&&n.why.length){const wh=el("p",{class:"xbl"});wh.textContent=n.whyLabel||(n.id==="early"||n.trunk?"Key points":"Why it split");d.appendChild(wh);const ul=el("ul");n.why.forEach(w=>{const li=el("li");li.textContent=w;ul.appendChild(li)});d.appendChild(ul)}
  if(n.sides){const sh=el("p",{class:"xbl"});sh.textContent="How the churches see it today";d.appendChild(sh);const sp=el("p");sp.textContent=n.sides;d.appendChild(sp)}
  if(n.tid){const b=el("button",{class:"btn ghost",style:"margin-left:0"});b.textContent="See what this church teaches";b.onclick=()=>{const det=[...document.querySelectorAll("details.church")].find(x=>x.querySelector("h3").textContent===byId[n.tid].name);if(det){det.open=true;det.scrollIntoView({behavior:"smooth",block:"start"})}};d.appendChild(b)}
  if(scroll)d.scrollIntoView({behavior:"smooth",block:"nearest"});
}
drawTree();showBranch("orthodox",false);


//@include data/apostles.js
function refBtn(r,cls){const b=el("button",{class:cls||"refchip"});b.textContent=r.replace("-","–");b.onclick=()=>{const x=parseRange(r);verseRange=x.v2>x.v1?x:null;openVerse(x.book,x.ch,x.v1)};return b}
function showApostle(a){
  const box=document.getElementById("linApostle");box.innerHTML="";
  const h=el("h2");h.textContent=a.id==="paul"?"The family of Paul":`The family of ${a.full}`;box.appendChild(h);
  if(a.also){const p=el("p",{class:"saka"});p.textContent="Also called "+a.also;box.appendChild(p)}
  box.appendChild(el("p",{class:"apnote"},"The Bible gives no family line for any apostle the way it does for Jesus. This shows every relative Scripture mentions, with the verse for each. Tap a verse to read it."));
  const key=el("div",{class:"fkey"});
  key.innerHTML='<span><i></i>Named in the Bible</span><span><i style="border-style:dashed"></i>Worked out by comparing verses</span><span><i style="border-style:dotted;border-color:var(--muted)"></i>Mentioned, but no name given</span>';
  box.appendChild(key);
  const fam=el("div",{class:"apfam"});
  a.gens.forEach(g=>{const row=el("div",{class:"fgen"});g.forEach(n=>{
    const d=el("div",{class:"fnode"+(n.self?" self":"")+(n.kind==="inferred"?" inferred":n.kind==="unnamed"?" unnamed":"")});
    const b=el("b");b.textContent=n.n;const r=el("span",{class:"rel"});r.textContent=n.rel;d.append(b,r);
    if(n.ref)d.appendChild(refBtn(n.ref,"fref"));
    row.appendChild(d)});fam.appendChild(row)});
  box.appendChild(fam);
  const fh=el("p",{class:"sub"});fh.textContent="What the Bible says";box.appendChild(fh);
  const ul=el("ul",{class:"facts"});
  a.facts.forEach(([t,refs])=>{const li=el("li");li.appendChild(document.createTextNode(t+" "));refs.forEach(r=>li.appendChild(refBtn(r)));ul.appendChild(li)});
  box.appendChild(ul);
  if(a.unsure&&a.unsure.length){
    const uh=el("p",{class:"sub"});uh.textContent="What's uncertain";box.appendChild(uh);
    const ul2=el("ul",{class:"facts"});a.unsure.forEach(t=>{const li=el("li");li.textContent=t;ul2.appendChild(li)});box.appendChild(ul2);
    if(a.unsureRefs){const rc=el("div",{class:"refchips"});a.unsureRefs.forEach(r=>rc.appendChild(refBtn(r)));box.appendChild(rc)}
  }
  const act=el("div",{class:"erow",style:"justify-content:flex-start"});
  const fb=el("button",{class:"btn"});fb.textContent="Find every mention";
  const terms={peter:"Peter, Cephas, Bar-jona",andrew:"Andrew",jamesz:"Zebedee",john:"Zebedee",philip:"Philip",bartholomew:"Bartholomew, Nathanael",thomas:"Thomas, Didymus",matthew:"Matthew, Levi the son of Alphaeus, named Levi, Levi made",jamesa:"Alphaeus",thaddaeus:"Thaddaeus, Lebbaeus",simon:"Zelotes, Simon the Canaanite",judas:"Iscariot",matthias:"Matthias",paul:"Paul"}[a.id];
  fb.onclick=()=>{document.querySelector('.tab[data-tab="find"]').click();q2.value=terms;runFind()};
  const nb=el("button",{class:"btn ghost",style:"margin-left:0"});nb.textContent="Add a note";nb.onclick=()=>noteFromVerse(a.full,"");
  act.append(fb,nb);box.appendChild(act);
}
(function(){
  const bar=document.getElementById("linTabs");
  const items=[{id:"jesus",n:"Jesus"},...APOSTLES];
  items.forEach((a,i)=>{
    const b=el("button",{class:"chip",role:"tab","data-ap":a.id,"aria-selected":i===0?"true":"false"});b.textContent=a.n;
    b.onclick=()=>{bar.querySelectorAll(".chip").forEach(c=>c.setAttribute("aria-selected",c===b?"true":"false"));
      const j=a.id==="jesus";document.getElementById("linJesus").hidden=!j;document.getElementById("linApostle").hidden=j;if(!j)showApostle(a);syncHash()};
    bar.appendChild(b);
  });
})();

// ---------- When each tab was last checked against its sources ----------
function fmtChecked(iso){const [y,m,d]=iso.split("-").map(Number);return new Date(y,m-1,d).toLocaleDateString(undefined,{year:"numeric",month:"long",day:"numeric"})}
Object.entries(CHECKED).forEach(([tab,iso])=>{
  const sec=document.getElementById(tab);if(!sec)return;
  const p=el("p",{class:"checked"});p.textContent="Facts that change over time (leaders, splits, canonizations) last checked: "+fmtChecked(iso)+". Spot something out of date? Please report it on GitHub.";
  sec.appendChild(p);
});
{const s=document.getElementById("saintsChecked");if(s)s.textContent=fmtChecked(CHECKED.saints)}

// ---------- Bible studies ----------
function studyText(text){
  // Turns {Book 1:2} into a link that opens that verse; everything else stays plain text.
  const frag=document.createDocumentFragment();let last=0;
  text.replace(/\{([^{}]+? \d+:\d+(?:-\d+)?)\}/g,(m,ref,i)=>{
    frag.append(text.slice(last,i));
    const x=parseRange(ref);const a=el("a",{href:verseHash(x.book,x.ch,x.v1),class:"vref"});a.textContent=ref;
    frag.append("(",a,")");last=i+m.length;return m;
  });
  frag.append(text.slice(last));return frag;
}
function srcList(list,label){
  const src=el("div",{class:"srcdocs"});const sh=el("p",{class:"srch"});sh.textContent=label||"Sources";src.appendChild(sh);const ul=el("ul");
  list.forEach(([t,u])=>{const li=el("li");const a=el("a",{href:u,target:"_blank",rel:"noopener noreferrer"});a.textContent=t;li.appendChild(a);ul.appendChild(li)});
  src.appendChild(ul);return src;
}
function studyNode(st){
  const d=el("div",{class:"study",id:"study-"+st.id});
  const h=el("h3",{class:"sttitle"});h.textContent=st.title;
  const lb=el("button",{class:"notebtn"});lb.textContent="Link";lb.onclick=()=>shareLink("#jewish/"+jewishSubForStudy(st.id),lb);h.appendChild(lb);d.appendChild(h);
  const intro=el("p",{class:"stintro"});intro.textContent=st.intro;d.appendChild(intro);
  st.sections.forEach(sec=>{const hh=el("h4");hh.textContent=sec.h;d.appendChild(hh);sec.p.forEach(t=>{const p=el("p");p.appendChild(studyText(t));d.appendChild(p)})});
  d.appendChild(srcList(st.sources));
  return d;
}
function jewishSubForStudy(id){const j=JEWISH.find(x=>x.study===id);return j?j.id:JEWISH[0].id}
function openStudy(id){document.querySelector('.tab[data-tab="jewish"]').click();showJewish(jewishSubForStudy(id));return true}

// ---------- Jewish Tradition tab ----------
let jewCur=JEWISH[0].id;
function showJewish(id){
  const sec=JEWISH.find(x=>x.id===id)||JEWISH[0];jewCur=sec.id;
  document.querySelectorAll("#jewTabs .chip").forEach(c=>c.setAttribute("aria-selected",c.dataset.sub===sec.id?"true":"false"));
  const body=document.getElementById("jewBody");body.textContent="";
  if(sec.study){const st=STUDIES.find(x=>x.id===sec.study);if(st)body.appendChild(studyNode(st));syncHash();return}
  const intro=el("p",{class:"hint"});intro.textContent=sec.intro;body.appendChild(intro);
  sec.items.forEach(it=>{
    const art=el("article",{class:"jitem"});
    const h=el("h3");h.textContent=it.h;art.appendChild(h);
    it.t.forEach(t=>{const p=el("p");p.appendChild(studyText(t));art.appendChild(p)});
    if(it.texts){const p=el("p",{class:"jtexts"});const b=el("span",{class:"srclab"});b.textContent="Jewish texts: ";p.append(b,it.texts);art.appendChild(p)}
    if(it.xn){const p=el("p",{class:"jxn"});const b=el("span",{class:"srclab"});b.textContent="For Christians: ";p.append(b,studyText(it.xn));art.appendChild(p)}
    art.appendChild(srcList(it.src));
    body.appendChild(art);
  });
  syncHash();
}
(function(){
  const bar=document.getElementById("jewTabs");
  JEWISH.forEach(sec=>{const b=el("button",{class:"chip",role:"tab","data-sub":sec.id,"aria-selected":"false"});b.textContent=sec.n;b.onclick=()=>showJewish(sec.id);bar.appendChild(b)});
  showJewish(jewCur);
})();

// ---------- Today's Mass readings ----------
let todayOffset=0;
function renderToday(){
  const box=document.getElementById("today");if(!box)return;
  const now=new Date(),d=new Date(now.getFullYear(),now.getMonth(),now.getDate()+todayOffset);
  const y=d.getFullYear(),m=d.getMonth()+1,dd=d.getDate(),r=LIT.info(y,m,dd);
  box.textContent="";
  const head=el("div",{class:"tdhead"});
  const prev=el("button",{class:"mini","aria-label":"Previous day"});prev.textContent="‹";prev.onclick=()=>{todayOffset--;renderToday()};
  const next=el("button",{class:"mini","aria-label":"Next day"});next.textContent="›";next.onclick=()=>{todayOffset++;renderToday()};
  const t=el("p",{class:"tdlabel"});t.textContent=(todayOffset===0?"Today's Mass readings":"Mass readings")+" · "+d.toLocaleDateString(undefined,{weekday:"long",month:"long",day:"numeric",year:"numeric"});
  head.append(prev,t,next);box.appendChild(head);
  const nm=el("p",{class:"tdname"});nm.textContent=r.name;box.appendChild(nm);
  const meta=el("p",{class:"tdmeta"});meta.textContent=`${r.season} · Sunday readings: Year ${r.sundayCycle} · Weekday readings: Year ${r.weekdayCycle}`;box.appendChild(meta);
  const a=el("a",{href:LIT.readingsUrl(y,m,dd),target:"_blank",rel:"noopener noreferrer"});a.textContent="Read them on the USCCB website (NABRE)";
  const p=el("p",{class:"tdlink"});p.appendChild(a);
  if(todayOffset!==0){const back=el("button",{class:"mini link"});back.textContent="Back to today";back.onclick=()=>{todayOffset=0;renderToday()};p.append(" · ",back)}
  box.appendChild(p);
  const note=el("p",{class:"tdnote"});note.textContent="Calendar for the dioceses of the United States. Saints' days and other feasts are shown on the readings page.";box.appendChild(note);
}
renderToday();

// ---------- Links to a tab, verse, saint or topic ----------
// Addresses look like #John-3-16, #1-Corinthians-13, #saints/francis, #compare/salvation, #lineage/peter, #find/Melchizedek.
var LINKS_READY=false, APPLYING_HASH=false;
const PUBLIC_URL="https://epitome88.github.io/same-book-many-readings/";
const TAB_IDS=["compare","churches","passages","find","lineage","angels","saints","books","jewish","notes"];
function verseHash(book,ch,v){return "#"+book.replace(/ /g,"-")+(ch?"-"+ch:"")+(ch&&v?"-"+v:"")}
function currentHash(){
  const tab=(document.querySelector('.tab[aria-selected="true"]')||{dataset:{}}).dataset.tab||"compare";
  if(tab==="jewish")return "#jewish/"+jewCur;
  if(tab==="passages"&&fBook.value){const ch=parseInt(fCh.value)||0;return verseHash(fBook.value,ch,ch?parseInt(fVs.value)||0:0)}
  if(tab==="saints"&&sCur)return "#saints/"+sCur.id;
  if(tab==="compare")return "#compare/"+topic;
  if(tab==="lineage"){const c=document.querySelector('#lineage .chip[data-ap][aria-selected="true"]');if(c&&c.dataset.ap!=="jesus")return "#lineage/"+c.dataset.ap}
  if(tab==="find"&&q2.value.trim())return "#find/"+encodeURIComponent(q2.value.trim());
  return "#"+tab;
}
function syncHash(){
  if(!LINKS_READY||APPLYING_HASH)return;
  const h=currentHash();
  if(!location.hash&&h==="#compare/"+TOPICS[0].id)return; // keep the plain address for the opening view
  if(location.hash!==h){try{history.replaceState(null,"",h)}catch(e){}}
}
function applyHash(){
  let h="";try{h=decodeURIComponent(location.hash.slice(1))}catch(e){return}
  if(!h)return;
  APPLYING_HASH=true;
  try{
    const slash=h.indexOf("/"),a=slash<0?h:h.slice(0,slash),b=slash<0?"":h.slice(slash+1);
    const tabBtn=id=>document.querySelector('.tab[data-tab="'+id+'"]');
    if(a==="study"){openStudy(b)}
    else if(TAB_IDS.includes(a)){
      tabBtn(a).click();
      if(a==="saints"&&b){const x=SAINTS.find(s=>s.id===b);if(x)openSaint(x)}
      else if(a==="compare"&&b){const i=TOPICS.findIndex(t=>t.id===b);if(i>=0)topicChips.querySelectorAll(".chip")[i].click()}
      else if(a==="lineage"&&b){const c=[...document.querySelectorAll("#lineage .chip[data-ap]")].find(c=>c.dataset.ap===b);if(c)c.click()}
      else if(a==="find"&&b){q2.value=b.slice(0,200);runFind()}
      else if(a==="jewish"&&b){showJewish(b)}
    }else{
      const m=h.match(/^(.+?)-(\d+)(?:-(\d+))?$/)||[null,h];
      const want=m[1].replace(/-/g," ").toLowerCase();
      const book=[...fBook.options].map(o=>o.value).find(v=>v&&v.toLowerCase()===want);
      if(book){openVerse(book,m[2]||"",m[2]&&m[3]?m[3]:"")}
    }
  }catch(e){}
  finally{APPLYING_HASH=false}
}
function linkFor(hash){
  const onSite=/^https?:$/.test(location.protocol)&&!/(^|\.)(claude\.ai|claudeusercontent\.com|anthropic\.com)$/.test(location.hostname);
  return (onSite?location.origin+location.pathname:PUBLIC_URL)+hash;
}
async function shareLink(hash,btn){
  const url=linkFor(hash),old=btn.textContent;
  const done=t=>{btn.textContent=t;setTimeout(()=>{btn.textContent=old},2200)};
  try{await navigator.clipboard.writeText(url);done("Link copied");return}catch(e){}
  try{if(navigator.share){await navigator.share({url});return}}catch(e){if(e&&e.name==="AbortError")return}
  // Last resort: show the link so it can be copied by hand.
  const box=el("input",{type:"text",readonly:"",class:"linkbox","aria-label":"Link to copy"});box.value=url;
  btn.after(box);box.focus();box.select();box.addEventListener("blur",()=>box.remove());
}
document.querySelectorAll(".tab").forEach(t=>t.addEventListener("click",()=>syncHash()));
q2.addEventListener("change",()=>syncHash());
window.addEventListener("hashchange",applyHash);
applyHash();
LINKS_READY=true;
if(location.hash)syncHash();

