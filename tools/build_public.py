"""Build the GitHub (standalone) index.html from the Claude app file."""
import re,sys
src,dst=sys.argv[1],sys.argv[2]
s=open(src,encoding='utf-8').read()
s=s[s.index('<!DOCTYPE html>'):]
a=s.index('</body>\n</html>'); tail=s[a+len('</body>\n</html>'):]
tail=re.sub(r'(\s*</body></html>\s*)+$','\n',tail)
s=s[:a]+tail.strip('\n')+'\n</body>\n</html>\n'
assert s.count('</html>')==1 and s.count('<body>')==1
old='n.textContent="Looking up any verse works when this page is opened in Claude.";c.appendChild(n);'
assert old in s
s=s.replace(old,'n.textContent="This verse doesn\'t have a saved comparison yet. Contributions are welcome on GitHub.";c.appendChild(n);')
open(dst,'w',encoding='utf-8').write(s);print('built',dst,len(s)//1024,'KB')
