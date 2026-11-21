// ---------- The Catholic liturgical calendar (dioceses of the United States) ----------
// Rules: Universal Norms on the Liturgical Year and the Calendar, nos. 19, 22, 28, 33, 38, 40 and 43–44,
// and the USCCB's yearly calendars (Epiphany on the Sunday from January 2 to 8; when that Sunday is
// January 7 or 8, the Baptism of the Lord moves to the Monday after). Feasts of saints aren't computed:
// the readings page shows each day's celebration.
const LIT=(()=>{
  const day=(y,m,d)=>new Date(Date.UTC(y,m-1,d));
  const add=(dt,n)=>new Date(dt.getTime()+n*864e5);
  const diff=(a,b)=>Math.round((a-b)/864e5);
  const ORD=["","First","Second","Third","Fourth","Fifth","Sixth","Seventh","Eighth","Ninth","Tenth","Eleventh","Twelfth","Thirteenth","Fourteenth","Fifteenth","Sixteenth","Seventeenth","Eighteenth","Nineteenth","Twentieth","Twenty-first","Twenty-second","Twenty-third","Twenty-fourth","Twenty-fifth","Twenty-sixth","Twenty-seventh","Twenty-eighth","Twenty-ninth","Thirtieth","Thirty-first","Thirty-second","Thirty-third","Thirty-fourth"];
  function easter(y){ // Gregorian computus (Meeus/Jones/Butcher)
    const a=y%19,b=Math.floor(y/100),c=y%100,d=Math.floor(b/4),e=b%4,f=Math.floor((b+8)/25),g=Math.floor((b-f+1)/3),
      h=(19*a+b-d-g+15)%30,i=Math.floor(c/4),k=c%4,l=(32+2*e+2*i-h-k)%7,m=Math.floor((a+11*h+22*l)/451),
      mo=Math.floor((h+l-7*m+114)/31),dd=((h+l-7*m+114)%31)+1;
    return day(y,mo,dd);
  }
  function adventStart(y){const n=day(y,11,30),w=n.getUTCDay();return add(n,w<=3?-w:7-w)} // Sunday on or closest to Nov 30
  function epiphany(y){const j=day(y,1,2);return add(j,(7-j.getUTCDay())%7)}                 // Sunday from Jan 2 to 8
  function baptism(y){const e=epiphany(y);return e.getUTCDate()>=7?add(e,1):add(e,7)}
  function info(y,m,d){
    const dt=day(y,m,d),sun=dt.getUTCDay()===0;
    const E=easter(y),ash=add(E,-46),pent=add(E,49),adv=adventStart(y),advPrev=adventStart(y-1);
    const lyear=dt>=adv?y+1:y; // the liturgical year is named for the year it ends in
    const out={date:dt,sundayCycle:["C","A","B"][lyear%3],weekdayCycle:lyear%2===0?"II":"I",season:"",name:""};
    const wk=(start,d0)=>Math.floor(diff(d0,start)/7)+1;
    if(dt>=adv&&dt<day(y,12,25)){out.season="Advent";const w=wk(adv,dt);out.name=sun?`${ORD[w]} Sunday of Advent`:`${ORD[w]} Week of Advent`}
    else if(dt>=day(y,12,25)){out.season="Christmas Time";
      // The Holy Family: the Sunday after Christmas, or December 30 when Christmas itself is a Sunday.
      const holyFamily=day(y,12,25).getUTCDay()===0?day(y,12,30):add(day(y,12,25),7-day(y,12,25).getUTCDay());
      out.name=d===25?"The Nativity of the Lord (Christmas)":+dt===+holyFamily?"The Holy Family of Jesus, Mary and Joseph":"Christmas Time";}
    else{
      const ep=epiphany(y),bap=baptism(y);
      if(dt<=bap){out.season="Christmas Time";
        out.name=m===1&&d===1?"Mary, the Holy Mother of God":+dt===+ep?"The Epiphany of the Lord":+dt===+bap?"The Baptism of the Lord":"Christmas Time";
      }
      else if(dt<ash){out.season="Ordinary Time";const base=bap.getUTCDay()===0?bap:ep;const w=wk(base,dt);
        out.name=sun?`${ORD[Math.floor(diff(dt,base)/7)+1]} Sunday in Ordinary Time`:`${ORD[w]} Week in Ordinary Time`}
      else if(dt<add(E,-3)){out.season="Lent";
        if(+dt===+ash)out.name="Ash Wednesday";
        else if(dt<add(ash,4))out.name="After Ash Wednesday";
        else if(+dt===+add(E,-7))out.name="Palm Sunday of the Passion of the Lord";
        else if(dt>add(E,-7))out.name="Holy Week";
        else{const w=wk(add(ash,4),dt);out.name=sun?`${ORD[w]} Sunday of Lent`:`${ORD[w]} Week of Lent`}}
      else if(dt<E){out.season="Paschal Triduum";out.name=["Holy Thursday","Good Friday","Holy Saturday"][diff(dt,add(E,-3))]}
      else if(dt<=pent){out.season="Easter Time";const w=wk(E,dt);
        out.name=+dt===+E?"Easter Sunday of the Resurrection of the Lord":+dt===+pent?"Pentecost Sunday":w===1?"Octave of Easter":sun?`${ORD[w]} Sunday of Easter`:`${ORD[w]} Week of Easter`}
      else{out.season="Ordinary Time";const king=add(adv,-7);
        const sunBefore=add(dt,-dt.getUTCDay()),w=34-Math.round(diff(king,sunBefore)/7);
        out.name=+dt===+add(pent,7)?"The Most Holy Trinity":+dt===+add(pent,14)?"The Most Holy Body and Blood of Christ":+dt===+king?"Our Lord Jesus Christ, King of the Universe":sun?`${ORD[w]} Sunday in Ordinary Time`:`${ORD[w]} Week in Ordinary Time`}
    }
    return out;
  }
  const readingsUrl=(y,m,d)=>`https://bible.usccb.org/bible/readings/${String(m).padStart(2,"0")}${String(d).padStart(2,"0")}${String(y%100).padStart(2,"0")}.cfm`;
  return {easter,adventStart,epiphany,baptism,info,readingsUrl};
})();
