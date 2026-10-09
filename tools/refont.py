# -*- coding: utf-8 -*-
"""제목(엘리스 DX 넬리)·본문(엘리스 디지털배움) 글꼴을 «한글 2,350자 + 사이트 모든 쪽에 쓰인 글자»로 다시 잘라 담는다.
제목 글꼴이 804자뿐이라 새 제목 글자가 다른 글꼴로 섞여 보이던 문제를 고친다. 바뀐 파일은 ?v= 를 md5 앞 8자로 올린다."""
import os, re, glob, hashlib, sys
sys.stdout.reconfigure(encoding='utf-8')
from fontTools.ttLib import TTFont
from fontTools import subset
SITE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))   # 저장소 맨 위(AI_cs)
SRC = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'fonts')   # 원본 글꼴(엘리스)
JOBS = [('disp-med', 'EliceDXNeolli-Medium.ttf'), ('disp-bold', 'EliceDXNeolli-Bold.ttf'),
        ('body-reg', 'EliceDigitalBaeum_Regular.ttf'), ('body-bold', 'EliceDigitalBaeum_Bold.ttf')]
base = set(TTFont(os.path.join(SITE, 'font', 'body-reg.woff2')).getBestCmap())
used = set()
for f in glob.glob(os.path.join(SITE, '*.html')) + glob.glob(os.path.join(SITE, '*.js')):   # lessons.js 글자도
    used |={ord(c) for c in open(f, encoding='utf-8').read()}
want = base | {c for c in used if c >= 0x20}
want |= set(range(0xAC00, 0xD7A4)) & base          # KS X 1001 2,350 (body-reg 와 같은 집합)
vers = {}
for name, src in JOBS:
    font = TTFont(os.path.join(SRC, src))
    have = set(font.getBestCmap())
    uni = sorted(want & have)
    opt = subset.Options(); opt.flavor = 'woff2'; opt.layout_features = ['*']; opt.name_IDs = ['*']; opt.notdef_outline = True; opt.hinting = False; opt.desubroutinize = True
    sub = subset.Subsetter(opt); sub.populate(unicodes=uni); sub.subset(font)
    # 디지털배움의 — (U+2014) 글리프는 줄 위쪽에 붙어 «¯»처럼 보임 → 같은 글꼴의 – (U+2013) 모양으로 바꿔 끼움
    if name.startswith('body'):
        for t in font['cmap'].tables:
            if t.isUnicode() and 0x2013 in t.cmap and 0x2014 in t.cmap: t.cmap[0x2014] = t.cmap[0x2013]
    out = os.path.join(SITE, 'font', name + '.woff2')
    prev = TTFont(out).getBestCmap()
    dash_ok = not name.startswith('body') or prev.get(0x2014) == prev.get(0x2013)
    if set(uni) <= set(prev) and dash_ok:
        print(name, 'already up to date'); continue
    old = hashlib.md5(open(out, 'rb').read()).hexdigest()[:8]
    font.flavor = 'woff2'; font.save(out)
    new = hashlib.md5(open(out, 'rb').read()).hexdigest()[:8]
    vers[name] = (old, new)
    print(name, len(uni), 'glyphs', os.path.getsize(out), 'bytes', old, '->', new)
for f in glob.glob(os.path.join(SITE, '*.html')):
    b = open(f, 'rb').read().decode('utf-8'); t = b
    for name, (old, new) in vers.items():
        t = t.replace('font/%s.woff2?v=%s' % (name, old), 'font/%s.woff2?v=%s' % (name, new))
    if t != b:
        open(f, 'wb').write(t.encode('utf-8')); print('  ver ->', os.path.basename(f))
