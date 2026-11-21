"""Build the GitHub Pages site from the Claude app file.

Usage: python3 -I build_public.py app.html OUTDIR
Writes OUTDIR/index.html, the Bible texts as OUTDIR/data/*.gz (loaded only when needed),
and the offline files (service worker, manifest, icons) from the pwa/ folder next to this script.
"""
import re,sys,os,base64,hashlib,json,shutil
src,out=sys.argv[1],sys.argv[2]
here=os.path.dirname(os.path.abspath(__file__))
s=open(src,encoding='utf-8').read()
s=s[s.index('<!DOCTYPE html>'):]
a=s.index('</body>\n</html>'); tail=s[a+len('</body>\n</html>'):]
tail=re.sub(r'(\s*</body></html>\s*)+$','\n',tail)
s=s[:a]+tail.strip('\n')+'\n</body>\n</html>\n'
assert s.count('</html>')==1 and s.count('<body>')==1
old='n.textContent="Looking up any verse works when this page is opened in Claude.";c.appendChild(n);'
assert old in s
s=s.replace(old,'n.textContent="This verse doesn\'t have a saved comparison yet. Contributions are welcome on GitHub.";c.appendChild(n);')

# 1. Move the Bible texts out of the page.
os.makedirs(os.path.join(out,'data'),exist_ok=True)
data_files=[];h=hashlib.sha256()
def pull(m):
    raw=base64.b64decode(m.group(2).strip())
    open(os.path.join(out,'data',m.group(1)+'.gz'),'wb').write(raw)
    h.update(raw);data_files.append('data/'+m.group(1)+'.gz');return ''
s,n=re.subn(r'<script type="application/octet-stream" id="(\w+)">(.*?)</script>\n?',pull,s,flags=re.S)
assert n==2,n
dver=h.hexdigest()[:10]
old='const r=await fetch("data/"+id+".gz");'
assert s.count(old)==1
s=s.replace(old,'const r=await fetch("data/"+id+".gz?v='+dver+'");')
data_urls=[f+'?v='+dver for f in sorted(data_files)]

# 2. Installable, offline-capable app.
head='''<meta name="description" content="How thirteen Christian traditions read the same Bible, side by side.">
<meta name="theme-color" content="#F2F3F6" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#141925" media="(prefers-color-scheme: dark)">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" href="icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
'''
anchor='<title>Same Book, Many Readings</title>\n'
assert s.count(anchor)==1;s=s.replace(anchor,anchor+head)
reg='<script>if("serviceWorker"in navigator&&(location.protocol==="https:"||location.hostname==="localhost"))addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));</script>\n'
s=s.replace('\n</body>\n</html>\n','\n'+reg+'</body>\n</html>\n')
open(os.path.join(out,'index.html'),'w',encoding='utf-8').write(s)

pwa=os.path.join(here,'pwa')
for f in ['manifest.webmanifest','icon.svg','icon-192.png','icon-512.png','icon-maskable-512.png','apple-touch-icon.png']:
    shutil.copy(os.path.join(pwa,f),os.path.join(out,f))
ver=hashlib.sha256(s.encode()+dver.encode()).hexdigest()[:10]
sw=open(os.path.join(pwa,'sw.js'),encoding='utf-8').read().replace('__VERSION__',ver).replace('__DATA_FILES__',json.dumps(data_urls))
open(os.path.join(out,'sw.js'),'w',encoding='utf-8').write(sw)
print('built',out,'index',len(s.encode())//1024,'KB; data',[f+' '+str(os.path.getsize(os.path.join(out,f))//1024)+'KB' for f in data_files],'version',ver)
