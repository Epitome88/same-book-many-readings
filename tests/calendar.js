// Checks the liturgical calendar against the USCCB's published calendars.
const fs=require('fs'),path=require('path'),vm=require('vm');
const ctx={};vm.createContext(ctx);vm.runInContext(fs.readFileSync(path.join(__dirname,'../src/calendar.js'),'utf8')+';this.LIT=LIT',ctx);
const L=ctx.LIT;let fail=0;
const iso=d=>d.toISOString().slice(0,10);
const eq=(got,want,what)=>{if(got!==want){fail++;console.log(`FAIL ${what}: got ${got}, expected ${want}`)}};
// From the USCCB liturgical calendars for 2024, 2026 and 2027 (usccb.org/resources/2024cal.pdf, 2026cal.pdf, 2027cal.pdf).
const known={
  2024:{epiphany:'2024-01-07',baptism:'2024-01-08'},
  2026:{epiphany:'2026-01-04',baptism:'2026-01-11',ash:'2026-02-18',easter:'2026-04-05',pentecost:'2026-05-24',advent:'2026-11-29'},
  2027:{epiphany:'2027-01-03',baptism:'2027-01-10',ash:'2027-02-10',easter:'2027-03-28',pentecost:'2027-05-16',advent:'2027-11-28'}};
const add=(d,n)=>new Date(d.getTime()+n*864e5);
for(const [y,k] of Object.entries(known)){
  const E=L.easter(+y);
  if(k.epiphany)eq(iso(L.epiphany(+y)),k.epiphany,`${y} Epiphany`);
  if(k.baptism)eq(iso(L.baptism(+y)),k.baptism,`${y} Baptism of the Lord`);
  if(k.easter)eq(iso(E),k.easter,`${y} Easter`);
  if(k.ash)eq(iso(add(E,-46)),k.ash,`${y} Ash Wednesday`);
  if(k.pentecost)eq(iso(add(E,49)),k.pentecost,`${y} Pentecost`);
  if(k.advent)eq(iso(L.adventStart(+y)),k.advent,`${y} First Sunday of Advent`);
}
const n=(y,m,d)=>L.info(y,m,d);
eq(n(2026,1,10).sundayCycle,'A','2026 Sunday cycle');eq(n(2026,6,1).weekdayCycle,'II','2026 weekday cycle');
eq(n(2026,11,29).sundayCycle,'B','Advent 2026 Sunday cycle');eq(n(2026,11,30).weekdayCycle,'I','Advent 2026 weekday cycle');
eq(n(2027,6,1).weekdayCycle,'I','2027 weekday cycle');eq(n(2027,11,28).sundayCycle,'C','Advent 2027 Sunday cycle');
eq(n(2026,11,22).name,'Our Lord Jesus Christ, King of the Universe','Christ the King 2026');
eq(n(2026,11,21).name,'Thirty-third Week in Ordinary Time','Nov 21, 2026');
eq(n(2026,1,12).name,'First Week in Ordinary Time','Jan 12, 2026');
eq(n(2026,1,18).name,'Second Sunday in Ordinary Time','Jan 18, 2026');
eq(n(2024,1,9).name,'First Week in Ordinary Time','Jan 9, 2024 (Baptism on Monday)');
eq(n(2024,1,14).name,'Second Sunday in Ordinary Time','Jan 14, 2024');
eq(n(2026,3,29).name,'Palm Sunday of the Passion of the Lord','Palm Sunday 2026');
eq(n(2026,4,2).name,'Holy Thursday','Holy Thursday 2026');
eq(n(2026,3,8).name,'Third Sunday of Lent','Mar 8, 2026');
eq(n(2026,11,29).name,'First Sunday of Advent','Advent 2026');
eq(n(2026,5,25).name,'Eighth Week in Ordinary Time','Monday after Pentecost 2026');
eq(n(2022,12,30).name,'The Holy Family of Jesus, Mary and Joseph','Dec 30, 2022 (Christmas on Sunday)');
eq(n(2026,12,27).name,'The Holy Family of Jesus, Mary and Joseph','Dec 27, 2026');
eq(L.readingsUrl(2018,3,4),'https://bible.usccb.org/bible/readings/030418.cfm','readings URL');
// Every day for 30 years gets a season and a name.
for(let y=2000;y<2030;y++)for(let d=new Date(Date.UTC(y,0,1));d.getUTCFullYear()===y;d=add(d,1)){const r=L.info(y,d.getUTCMonth()+1,d.getUTCDate());if(!r.season||!r.name||/undefined/.test(r.name)){fail++;console.log('FAIL',iso(d),JSON.stringify(r));if(fail>5)process.exit(1)}}
console.log(fail?`${fail} calendar check(s) failed`:'Calendar matches the USCCB calendars');process.exit(fail?1:0);
