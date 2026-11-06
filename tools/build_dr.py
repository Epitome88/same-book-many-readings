import json,re
V='../dl/vrs/examples/'
eng=json.load(open(V+'eng.json'));vul=json.load(open(V+'vul.json'))
dr=json.load(open('dr_native.json'))
kjv=json.load(open('kjv.json'))
CODES=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL",
"MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV"]
DRCODE={"JAS":"JAM"}  # file code differences
def parse(r):
    m=re.match(r'^(\w+) (\d+):(\d+)([a-z]?)(?:-(\d+))?$',r)
    if not m: return None
    b,c,v1,suf,v2=m.groups()
    if suf: return None
    v1=int(v1);v2=int(v2) if v2 else v1
    return [(b,int(c),v) for v in range(v1,v2+1)]
def expand(mp):
    out={}
    for k,v in mp.items():
        a=parse(k);bb=parse(v)
        if not a or not bb: continue
        if len(a)==len(bb): pairs=list(zip(a,bb))
        elif len(bb)==1: pairs=[(x,bb[0]) for x in a]
        elif len(a)==1: pairs=[(a[0],y) for y in bb]
        else: pairs=list(zip(a,bb))+[(x,bb[-1]) for x in a[len(bb):]]
        for x,y in pairs: out.setdefault(x,[]).append(y)
    return out
E2O=expand(eng['mappedVerses']); V2O=expand(vul['mappedVerses'])
O2V={}
for x,ys in V2O.items():
    for y in ys: O2V.setdefault(y,[]).append(x)
def vulOf(ref):
    b=ref[0]
    if b=='EST': return [ref]   # Esther 1-10:3 shares numbering
    if b=='DAN':
        c,v=ref[1],ref[2]
        if c==3 and v>=24: return [('DAN',3,v+67)]
        if c==4 and v<=3: return [('DAN',3,v+97)]
        if c==4: return [('DAN',4,v-3)]
        return [ref]
    out=[]
    for o in E2O.get(ref,[ref]):
        if o in O2V: out+=O2V[o]
        elif o not in V2O: out.append(o)
    return out
def drtext(r):
    b,c,v=r; b=DRCODE.get(b,b)
    return dr.get(b,{}).get(str(c),{}).get(str(v))
DR=[];used=set();refmap={};missing=[]
for bi,code in enumerate(CODES):
    book=[]
    for ci,chap in enumerate(kjv[bi]):
        cv=[]
        for vi,_ in enumerate(chap):
            e=(code,ci+1,vi+1);vs=vulOf(e);txt=[];vk=[]
            for r in vs:
                t=drtext(r)
                if t and r not in used: txt.append(t);used.add(r);vk.append(r)
                elif t and r in used: vk.append(r)
            if not vs or not any(drtext(r) for r in vs): missing.append(e)
            cv.append(' '.join(txt))
            dk=(DRCODE.get(code,code) if False else code)
            if vk and (vk[0][1],vk[0][2])!=(ci+1,vi+1) or (vk and vk[0][0]!=code and not (code=='JAS')):
                refmap[f"{bi}:{ci+1}:{vi+1}"]=[vk[0][1],vk[0][2]] + ([vk[-1][2]] if len(vk)>1 and vk[-1][1]==vk[0][1] and vk[-1][2]!=vk[0][2] else [])
        book.append(cv)
    DR.append(book)
# orphans: DR verses in canonical 66 books never used
orph=[]
for bi,code in enumerate(CODES):
    b=DRCODE.get(code,code)
    for c,vs in dr[b].items():
        for v,t in vs.items():
            r=(code,int(c),int(v))
            if r not in used: orph.append(r)

# where each used DR verse landed
landed={}
for bi,code in enumerate(CODES):
    for ci,chap in enumerate(kjv[bi]):
        for vi,_ in enumerate(chap):
            for r in vulOf((code,ci+1,vi+1)):
                landed.setdefault(r,(bi,ci,vi))
extra_dr={('DAN',3,v) for v in range(24,91)}|{('DAN',13,v) for v in range(1,70)}|{('DAN',14,v) for v in range(1,60)}
extra_dr|={('EST',10,v) for v in range(4,30)}|{('EST',c,v) for c in range(11,17) for v in range(1,60)}
merged=0
pre={}
for r in sorted(orph,key=lambda x:(CODES.index(x[0]),x[1],x[2])):
    if r in extra_dr: continue
    b,c,v=r;t=drtext(r)
    prev=next(((b,c,pv) for pv in range(v-1,0,-1) if (b,c,pv) in landed),None)
    nxt=next(((b,c,nv) for nv in range(v+1,200) if (b,c,nv) in landed),None)
    if prev and v>1 and not (b=='PSA' and v<=3 and not prev):
        bi,ci,vi=landed[prev];DR[bi][ci][vi]=(DR[bi][ci][vi]+' '+t).strip()
    elif nxt:
        pre.setdefault(landed[nxt],[]).append(t)
    else: print('unplaced',r);continue
    merged+=1
for (bi,ci,vi),ts in pre.items(): DR[bi][ci][vi]=(' '.join(ts)+' '+DR[bi][ci][vi]).strip()
print('merged orphans',merged)
def drchap(code,c):
    vs=dr[code][str(c)]; return [vs.get(str(v),'') for v in range(1,max(map(int,vs))+1)]
# Esther additions: extend chapter 10 and add 11-16
est=CODES.index('EST')
for v in range(4,len(dr['EST']['10'])+1): DR[est][9].append(dr['EST']['10'][str(v)])
for c in range(11,17): DR[est].append(drchap('EST',c))
dan=CODES.index('DAN')
for c in (13,14): DR[dan].append(drchap('DAN',c))
def native(code): return [drchap(code,c) for c in range(1,len(dr[code])+1) if dr[code].get(str(c))]
print('gaps in deutero:',[(code,c,v) for code in ['TOB','JDT','WIS','SIR','BAR','1MA','2MA'] for c,vs in dr[code].items() if vs for v in range(1,max(map(int,vs))+1) if str(v) not in vs])
for code in ['TOB','JDT','WIS','SIR','BAR','1MA','2MA']: DR.append(native(code))
DR.append([[dr['DAN']['3'][str(v)] for v in range(24,91)]])

# --- word-overlap realignment for chapters the tables get wrong ---
import importlib.util
STOP=set("the and of to in that he his him for unto shall be is was a it they them i with not all their which my me thou thee thy ye you your from as are by but this upon have had said were there when then so or o lord god what we our us her she will an no on one also out up who even before at hath into came come went made let do did doth these those".split())
def bag(t): return {w.lower()[:6] for w in re.findall(r"[A-Za-z]+",t) if w.lower() not in STOP and len(w)>2}
def sim(a,b):
    A,B=bag(a),bag(b)
    return len(A&B)/max(1,min(len(A),len(B))) if A and B else 0
def realign(bi,c,code,dc,skip=()):
    K=kjv[bi][c-1]; D=[(v,t) for v,t in sorted(((int(v),t) for v,t in dr[code][str(dc)].items())) if v not in skip]
    n,m=len(K),len(D); NEG=-1e9
    best=[[NEG]*m for _ in range(n)]; back=[[0]*m for _ in range(n)]
    for j in range(m): best[0][j]=sim(K[0],D[j][1])-0.05*j
    for i in range(1,n):
        for j in range(m):
            for pj in (j,j-1,j-2):
                if 0<=pj<m and best[i-1][pj]>NEG:
                    sc=best[i-1][pj]+(sim(K[i],D[j][1]) if pj!=j else 0)
                    if sc>best[i][j]: best[i][j]=sc;back[i][j]=pj
    j=max(range(m),key=lambda j:best[n-1][j]); path=[0]*n
    for i in range(n-1,-1,-1): path[i]=j; j=back[i][j]
    out=['']*n; seen=set()
    for i,j in enumerate(path):
        if j not in seen: out[i]=D[j][1]; seen.add(j)
    for j in range(m):   # DR verses the path skipped: attach to the verse before
        if j not in seen:
            i=max([k for k,p in enumerate(path) if p<j] or [0]); out[i]=(out[i]+' '+D[j][1]).strip()
    DR[bi][c-1]=out
    for i,j in enumerate(path):
        key=f"{bi}:{c}:{i+1}"
        if D[j][0]!=i+1 or dc!=c: refmap[key]=[dc,D[j][0]]
        else: refmap.pop(key,None)
realign(CODES.index('1TH'),4,'1TH',4); realign(CODES.index('2TH'),2,'2TH',2); realign(CODES.index('JON'),2,'JON',2,skip=(1,))
DR[CODES.index('JON')][0][16]=dr['JON']['2']['1'];refmap[f"{CODES.index('JON')}:1:17"]=[2,1]
json.dump({'DR':DR,'refmap':refmap,'missing':missing,'orph':orph},open('dr_eng.json','w'))
print('missing eng verses',len(missing),missing[:20])
print('orphan DR verses',len(orph))
from collections import Counter
print(Counter((o[0]) for o in orph).most_common(20))
print('refmap entries',len(refmap))
