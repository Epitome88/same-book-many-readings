import re,os,json,sys
SRC=sys.argv[1]
files=sorted(f for f in os.listdir(SRC) if f.endswith('.sfm'))
skip={'FRT','INT','BAK','GLO','XXA'}
out={}
def clean(t):
    t=re.sub(r'\\f .*?\\f\*','',t)
    t=re.sub(r'\\x .*?\\x\*','',t)
    t=re.sub(r'\\rq .*?\\rq\*','',t)
    t=re.sub(r'\\vp .*?\\vp\*','',t)
    t=re.sub(r'\\w ([^|\\]*)(\|[^\\]*)?\\w\*',r'\1',t)
    t=re.sub(r'\\[a-z0-9]+\*?',' ',t)
    t=t.replace('\u00a0',' ')
    return re.sub(r'\s+',' ',t).strip()
for f in files:
    code=f.split('-')[1]
    if code in skip: continue
    raw=open(os.path.join(SRC,f),encoding='utf-8').read()
    book={};ch=None;v=None
    for line in raw.split('\n'):
        line=line.rstrip()
        m=re.match(r'\\c (\d+)',line)
        if m: ch=int(m.group(1));book[ch]={};v=None;continue
        m=re.match(r'\\v (\d+)(?:-\d+)?\s?(.*)',line)
        if m and ch:
            v=int(m.group(1));book[ch][v]=m.group(2);continue
        m=re.match(r'\\(p|q\d?|m|pi\d?|li\d?|nb|pmo|pm|b)\b ?(.*)',line)
        if m and v is not None and ch:
            if m.group(2): book[ch][v]+=' '+m.group(2)
            continue
        if re.match(r'\\(cl|cd|s\d?|d|ip|im|ili|rem|qa|h\d?|toc\d|mt\d?|mte\d?|id|ide|periph|imte\d?|is\d?|tr|tc\d|tcr\d|ms\d?|mr|r)\b',line):
            if line.startswith('\\c'): pass
            # headings end the current verse's continuation
            if not line.startswith('\\d'): v=None if line.startswith(('\\cd','\\cl','\\s')) else v
            continue
    out[code]={c:{vv:clean(t) for vv,t in vs.items()} for c,vs in book.items()}
json.dump(out,open('dr_native.json','w'))
print(len(out),'books')
tot=sum(len(vs) for b in out.values() for vs in b.values());print('verses',tot)
empty=[(b,c,v) for b,bb in out.items() for c,vs in bb.items() for v,t in vs.items() if not t];print('empty',len(empty),empty[:10])
bad=[(b,c,v,t[:60]) for b,bb in out.items() for c,vs in bb.items() for v,t in vs.items() if '\\' in t or '|' in t];print('markup left',len(bad),bad[:5])
