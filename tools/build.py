"""Build the app from src/.

    python3 tools/build.py            # the website: index.html, sw.js, manifest and icons in the repo root
    python3 tools/build.py --claude   # one self-contained file with both Bibles inside: dist/app.html
    python3 tools/build.py --check    # fail if the committed website files are out of date

Sources:
  src/index.html   page structure; pulls in the files below with /*@include ...*/ and //@include ... markers
  src/styles.css   all styling
  src/app.js       app behavior
  src/data/*.js    the content: traditions, passages, sources, saints, lineage, angels, books, church tree
  src/pwa/         offline support (service worker, manifest, icons)
  data/*.gz        the Bible texts (gzipped JSON), built by the other scripts in tools/
"""
import base64,hashlib,json,os,re,shutil,sys
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC=os.path.join(ROOT,'src')
BIBLES=['kjvdata','drdata']

def read(p): return open(p,encoding='utf-8').read()

def expand(text,depth=0):
    assert depth<5,'includes nested too deeply'
    def inc(m):
        rel=m.group(1)
        path=os.path.normpath(os.path.join(SRC,rel))
        assert path.startswith(SRC+os.sep),f'include outside src/: {rel}'
        return expand(read(path).rstrip('\n'),depth+1)
    text=re.sub(r'^[ \t]*//@include ([\w./-]+)[ \t]*$',inc,text,flags=re.M)
    text=re.sub(r'/\*@include ([\w./-]+)\*/',inc,text)
    return text

def page():
    s=expand(read(os.path.join(SRC,'index.html')))
    assert '@include' not in s.replace('//@include','')  # nothing left unexpanded
    return s

def bible_bytes(name): return open(os.path.join(ROOT,'data',name+'.gz'),'rb').read()

def build_claude():
    s=page()
    for b in BIBLES:
        s=s.replace(f'@@BIBLE {b}@@',base64.b64encode(bible_bytes(b)).decode())
    assert '@@BIBLE' not in s
    os.makedirs(os.path.join(ROOT,'dist'),exist_ok=True)
    out=os.path.join(ROOT,'dist','app.html');open(out,'w',encoding='utf-8').write(s)
    return {'dist/app.html':s.encode()}

def build_site():
    s=page()
    s,n=re.subn(r'<script type="application/octet-stream" id="\w+">@@BIBLE \w+@@</script>\n?','',s);assert n==len(BIBLES)
    old='n.textContent="Looking up any verse works when this page is opened in Claude.";c.appendChild(n);'
    assert old in s
    s=s.replace(old,'n.textContent="This verse doesn\'t have a saved comparison yet. Contributions are welcome on GitHub.";c.appendChild(n);')
    h=hashlib.sha256()
    for b in BIBLES:h.update(bible_bytes(b))
    dver=h.hexdigest()[:10]
    old='const r=await fetch("data/"+id+".gz");';assert s.count(old)==1
    s=s.replace(old,'const r=await fetch("data/"+id+".gz?v='+dver+'");')
    head='''<meta name="description" content="How thirteen Christian traditions read the same Bible, side by side.">
<meta name="theme-color" content="#F2F3F6" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#141925" media="(prefers-color-scheme: dark)">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" href="icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
'''
    anchor='<title>Same Book, Many Readings</title>\n';assert s.count(anchor)==1
    s=s.replace(anchor,anchor+head)
    reg='<script>if("serviceWorker"in navigator&&(location.protocol==="https:"||location.hostname==="localhost"))addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));</script>\n'
    assert s.endswith('\n</body>\n</html>\n');s=s[:-len('</body>\n</html>\n')]+reg+'</body>\n</html>\n'
    files={'index.html':s.encode()}
    pwa=os.path.join(SRC,'pwa')
    for f in ['manifest.webmanifest','icon.svg','icon-192.png','icon-512.png','icon-maskable-512.png','apple-touch-icon.png']:
        files[f]=open(os.path.join(pwa,f),'rb').read()
    ver=hashlib.sha256(files['index.html']+dver.encode()).hexdigest()[:10]
    data_urls=[f'data/{b}.gz?v={dver}' for b in sorted(BIBLES,key=lambda b:'data/'+b+'.gz')]
    files['sw.js']=read(os.path.join(pwa,'sw.js')).replace('__VERSION__',ver).replace('__DATA_FILES__',json.dumps(data_urls)).encode()
    return files

if __name__=='__main__':
    if '--claude' in sys.argv:
        build_claude();print('built dist/app.html')
    elif '--check' in sys.argv:
        stale=[f for f,b in build_site().items() if not os.path.exists(os.path.join(ROOT,f)) or open(os.path.join(ROOT,f),'rb').read()!=b]
        if stale:
            print('These built files are out of date: '+', '.join(stale)+'\nRun: python3 tools/build.py and commit the result.');sys.exit(1)
        print('Built files are up to date.')
    else:
        for f,b in build_site().items(): open(os.path.join(ROOT,f),'wb').write(b)
        print('built the website files')
