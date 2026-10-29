# -*- coding: utf-8 -*-
"""프롬프트 카드(tools/src/prompts_pj.py) → unit4.html 차시 카드 · aitour 원본(body.html) 단계 카드
사용: python tools/build_prompts.py [aitour 원본 폴더]  — 원본 폴더를 주면 body.html도 다시 씀(그 뒤 build.py로 aitour.html)
"""
import html, os, re, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src'))
from prompts_pj import TOOLS, CARDS

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LT = {'y': ('노랑', 'y'), 'g': ('초록', 'g')}

def fill(t):
    return re.sub(r'\[([^\]]+)\]', r'<mark>[\1]</mark>', html.escape(t, quote=False))

def card(key, tour=False):
    title, lt, when, items, dont = TOOLS[key]
    rows = ''.join(
        f'<div class="pr"><span class="pn">{html.escape(n)}</span><p class="pt">{fill(t)}</p>'
        f'<button type="button" class="cpb" data-t="{html.escape(t)}">복사</button></div>' for n, t in items)
    head = f'<b><i>💬 프롬프트 카드</i> {title} <span class="plt plt-{LT[lt][1]}">{LT[lt][0]}</span> <small>{html.escape(when)}</small></b>'
    tail = f'<span class="eg">[ ] 안만 우리 말로 바꿔요 · ✗ 쓰지 않기: {html.escape(dont)}</span>'
    if tour:
        return f'<div class="pcard">{head}{rows}{tail}</div>'
    return f'<div class="ws pcard">{head}<div>{rows}{tail}</div></div>'

def put(s, tag, inner):
    a, b = f'<!--PR:{tag}-->', f'<!--/PR:{tag}-->'
    assert s.count(a) == 1 and s.count(b) == 1, tag
    i, j = s.index(a) + len(a), s.index(b)
    return s[:i] + inner + s[j:]

p = os.path.join(ROOT, 'unit4.html')
s = open(p, encoding='utf-8').read()
for les, keys in CARDS.items():
    s = put(s, les, ''.join(card(k) for k in keys))
open(p, 'w', encoding='utf-8').write(s)
print('unit4', {k: len(v) for k, v in CARDS.items()})

if len(sys.argv) > 1:
    b = os.path.join(sys.argv[1], 'body.html')
    t = open(b, encoding='utf-8').read()
    for k in TOOLS:
        t = put(t, k, card(k, tour=True))
    open(b, 'w', encoding='utf-8').write(t)
    print('aitour body', len(TOOLS))
