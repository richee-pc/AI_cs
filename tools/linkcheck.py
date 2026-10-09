# -*- coding: utf-8 -*-
import re, glob, sys, os
sys.stdout.reconfigure(encoding='utf-8')
os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
pages = {f: open(f, encoding='utf-8').read() for f in glob.glob('*.html')}
ids = {f: set(re.findall(r'\bid="([^"]+)"', t)) for f, t in pages.items()}
for f, t in pages.items():
    ids[f] |= set(re.findall(r"id=\\?[\"']([A-Za-z0-9_-]+)", t))
js = open('lessons.js', encoding='utf-8').read()
P = {'u2': 'unit2.html', 'u4': 'unit4.html', 'ix': 'index.html', 'lb': 'labs.html', 'md': 'models.html', 'dg': 'datagen.html'}
for pg, anc, name in re.findall(r"\['(u2|u4|ix|lb|md|dg)','([^']+)','([^']+)'", js):
    if anc != 'top' and anc not in ids[P[pg]]:
        print('STEP', pg, anc, name)
B = 'https://richee-pc.github.io/AI_cs/'
for f, t in pages.items():
    for sc in re.findall(r'<script[^>]*>(.*?)</script>', t, flags=re.S):
        for h in re.findall(r"href=\\?[\"']([^\"'\\]+)", sc):
            if h.startswith(B):
                pg, _, frag = h[len(B):].partition('#'); pg = pg.split('?')[0] or 'index.html'
                if not os.path.exists(pg): print('JS 파일없음', f, h)
                elif frag and frag not in ids[pg]: print('JS id없음', f, h)
            elif h.startswith('#') and len(h) > 1 and h[1:] not in ids[f]:
                print('JS id없음', f, h)
print('done')
