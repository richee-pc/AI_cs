# -*- coding: utf-8 -*-
"""사이트 전체 외부 링크 모으고 상태 확인. 코랩·raw 링크는 저장소 파일 존재로 확인."""
import re, glob, os, sys, urllib.request, concurrent.futures as cf
sys.stdout.reconfigure(encoding='utf-8')
SITE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))   # 저장소 맨 위(AI_cs)
os.chdir(SITE)
urls = {}
files = glob.glob('*.html') + glob.glob('*.js') + glob.glob('notebooks/*.ipynb') + ['README.md']
for f in files:
    s = open(f, encoding='utf-8', errors='ignore').read()
    for u in re.findall(r'https?://[^\s"\'<>)\]\\`]+', s):
        u = u.rstrip('.,;*')
        if len(u) > 300 or '{' in u or '$' in u: continue
        urls.setdefault(u, set()).add(f)
local_bad, ext = [], []
for u, fs in urls.items():
    m = re.match(r'https://colab\.research\.google\.com/github/richee-pc/AI_cs/blob/main/(.+)', u)
    r = re.match(r'https://raw\.githubusercontent\.com/richee-pc/AI_cs/main/(.+)', u)
    g = re.match(r'https://richee-pc\.github\.io/AI_cs/([^?#]*)', u)
    path = (m or r or g).group(1) if (m or r or g) else None
    if path is not None:
        path = path or 'index.html'
        if path.endswith('/'): path += 'index.html'
        if path and not os.path.exists(path) and not path.endswith('data/'):
            local_bad.append((u, sorted(fs)))
    else:
        ext.append(u)
print('== 저장소 안 링크 중 파일 없음:', len(local_bad))
for u, fs in local_bad: print('  ', u, fs[:3])
SKIP = ('fonts.googleapis', 'fonts.gstatic', 'cdnjs', 'cdn.jsdelivr', 'unpkg', 'localhost', '127.0.0.1', 'example', 'forms.gle')
def chk(u):
    if any(k in u for k in SKIP): return u, 'skip'
    try:
        req = urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0'}, method='GET')
        with urllib.request.urlopen(req, timeout=15) as resp: return u, resp.status
    except urllib.error.HTTPError as e: return u, e.code
    except Exception as e: return u, type(e).__name__
with cf.ThreadPoolExecutor(16) as ex:
    res = list(ex.map(chk, sorted(set(ext))))
bad = [(u, c) for u, c in res if c not in (200, 'skip')]
print('== 외부 링크', len(ext), '개 중 문제', len(bad))
for u, c in bad: print('  ', c, u, sorted(urls[u])[:3])
