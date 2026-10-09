# -*- coding: utf-8 -*-
"""lessons.js · polish.css · polish.js 를 고친 뒤 실행 — 모든 쪽의 ?v= 를 파일 md5 앞 8자로 맞춘다(학생 브라우저가 새 파일을 받게)."""
import os, re, glob, hashlib, sys
sys.stdout.reconfigure(encoding='utf-8')
SITE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
v = lambda f: hashlib.md5(open(os.path.join(SITE, f), 'rb').read()).hexdigest()[:8]
VERS = {f: v(f) for f in ('lessons.js', 'polish.css', 'polish.js')}
for p in glob.glob(os.path.join(SITE, '*.html')):
    b = open(p, 'rb').read(); t = b.decode('utf-8')
    for f, ver in VERS.items():
        t = re.sub(re.escape(f) + r'\?v=\w+', f + '?v=' + ver, t)
    if t.encode('utf-8') != b:
        open(p, 'wb').write(t.encode('utf-8')); print('  ->', os.path.basename(p))
print(VERS)
