import json,re
d=json.load(open('dr_eng.json'));DR=d['DR'];kjv=json.load(open('kjv.json'))
STOP=set("the and of to in that he his him for unto shall be is was a it they them i with not all their which my me thou thee thy ye you your from as are by but this upon have had said were there when then so or o lord god what we our us her she will an no on one also out up who even before at hath one into came come went made let do did doth these those".split())
def norm(w):
    w=w.lower()
    for a,b in [('eth',''),('est',''),('ed',''),('ing',''),('es',''),('s','')]:
        if len(w)>5 and w.endswith(a): return w[:-len(a)]+b
    return w
def bag(t): return {norm(w) for w in re.findall(r"[A-Za-z]+",t) if w.lower() not in STOP and len(w)>2}
def sim(a,b):
    A,B=bag(a),bag(b)
    if not A or not B: return None
    return len(A&B)/min(len(A),len(B))
CODES=["GEN","EXO","LEV","NUM","DEU","JOS","JDG","RUT","1SA","2SA","1KI","2KI","1CH","2CH","EZR","NEH","EST","JOB","PSA","PRO","ECC","SNG","ISA","JER","LAM","EZK","DAN","HOS","JOL","AMO","OBA","JON","MIC","NAM","HAB","ZEP","HAG","ZEC","MAL","MAT","MRK","LUK","JHN","ACT","ROM","1CO","2CO","GAL","EPH","PHP","COL","1TH","2TH","1TI","2TI","TIT","PHM","HEB","JAS","1PE","2PE","1JN","2JN","3JN","JUD","REV"]
flag=[];allsims=[]
for bi in range(66):
    for ci,ch in enumerate(kjv[bi]):
        sims=[];shift=[0,0,0]
        for vi,t in enumerate(ch):
            dt=DR[bi][ci][vi] if vi<len(DR[bi][ci]) else ''
            s0=sim(t,dt)
            if s0 is None: continue
            sims.append(s0)
            for k,o in enumerate((-1,1)):
                j=vi+o
                if 0<=j<len(DR[bi][ci]):
                    s1=sim(t,DR[bi][ci][j])
                    if s1 is not None and s1>s0+0.15: shift[k]+=1
        if sims:
            m=sum(sims)/len(sims);allsims+=sims
            if m<0.30 or max(shift)>len(sims)*0.3: flag.append((CODES[bi],ci+1,round(m,2),shift,len(sims)))
print('verses compared',len(allsims),'mean sim',round(sum(allsims)/len(allsims),3))
print('flagged chapters',len(flag))
for f in flag: print(f)
