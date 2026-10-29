# -*- coding: utf-8 -*-
"""project.html — 인공지능 프로젝트 ①~④ + 수행평가 ② 한 탭 (today4.html 같은 «오늘 순서» 쪽)
원본: tools/src/project_steps.py(단계) · tools/src/prompts_pj.py(프롬프트 카드) · lessons.js SCHED(반별 날짜)
사용: python tools/build_project.py  → project.html
"""
import html, json, os, re, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src'))
from project_steps import LESSONS, L, TOP
from prompts_pj import TOOLS

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WHO = {'me': ('w-me', '👤 모두 각자'), 'team': ('w-team', '👥 모둠'), 'lead': ('w-one', '👑 모둠장'), 'all': ('w-all', '🙌 다 같이')}
ALT = {'cc3otn': '모둠 입력 탭에 네 사람 칸을 채운 화면', 'kpjm3r': '화면이 낮아 이름 칸이 안 보이는 모습 — Ctrl − 로 줄이기',
       'ylskv2': '자료 찾기 AI가 출처와 검색어를 알려 준 화면', '4g5tgr': '1차 자기 · 동료평가 화면', '4n1ngp': '질문하는 AI — PDF를 안 올리면 뜨는 알림',
       '6pck3o': '발표자료 AI 일곱 칸 개요', 'z2gjav': '모둠장 승인 단추', '005mzk': '돌아보기 AI 첫 화면', 'h8n0hi': '2차 평가는 돌아보기 다음에 열려요'}

def fill(t):
    return re.sub(r'\[([^\]]+)\]', r'<mark>[\1]</mark>', html.escape(t, quote=False))

def card(key):
    title, lt, when, items, dont = TOOLS[key]
    rows = ''.join(f'<div class="pr"><span class="pn">{html.escape(n)}</span><p class="pt">{fill(t)}</p>'
                   f'<button type="button" class="cpb" data-t="{html.escape(t)}">복사</button></div>' for n, t in items)
    c = {'y': ('plt-y', '노랑'), 'g': ('plt-g', '초록')}[lt]
    return (f'<details class="pcard"><summary><b>💬 프롬프트 카드</b> {title} <span class="plt {c[0]}">{c[1]}</span> <small>눌러서 열기 · [ ]만 바꿔 복사</small></summary>'
            f'{rows}<span class="eg">✗ 쓰지 않기: {html.escape(dont)}</span></details>')

def link(k):
    u, t = L[k]
    ext = u.startswith('http') or u.endswith('.html') or '.html#' in u
    return f'<a class="go" href="{html.escape(u)}" target="_blank" rel="noopener">{t}</a>'

sec = []
for key, tag, title, plat, steps in LESSONS:
    tot = steps[-1][1]
    out = [f'<section class="les" id="L-{key}" data-key="{key}" hidden>',
           f'<div class="lhead"><h2>{tag} · {html.escape(title)}</h2>' + (f'<span class="plat">{html.escape(plat)}</span>' if plat else '') + '</div>',
           f'<div class="prog"><div class="track"><i></i></div><p>0 / {len(steps)} 단계</p></div>']
    for i, (s, e, h, who, body, pk, imgs, links) in enumerate(steps, 1):
        wc, wt = WHO[who]
        im = ''.join(f'<img src="img/pj/{n}.jpg" alt="{ALT.get(n, "")}" loading="lazy">' for n in (imgs or []))
        if imgs and len(imgs) == 2:
            im = f'<div class="pair">{im}</div>'
        lk = f'<div class="golist">{"".join(link(k) for k in links)}</div>' if links else ''
        out.append(f'<div class="step" data-s="{s}" data-e="{e}"><div class="head"><span class="num">{i}</span><h3>{h}</h3><span class="time">{s}–{e}분</span></div>'
                   f'<span class="who {wc}">{wt}</span>{body}{card(pk) if pk else ""}{im}{lk}'
                   f'<label class="chk"><input type="checkbox"> 했어요</label></div>')
    assert tot == 50, key
    out.append('</section>')
    sec.append('\n'.join(out))

js = open(os.path.join(ROOT, 'lessons.js'), encoding='utf-8').read()
sched = {}
for c in 'ADE':
    m = re.search(r"\n\s*%s:'([^']+)'" % c, js)
    sched[c] = [x.split(' ') for x in m.group(1).split('|')]
keys = [l[0] for l in LESSONS]
sched = {c: [[d, k] for d, k in v if k in keys] for c, v in sched.items()}
for c, v in sched.items():
    assert [k for _, k in v] == keys, (c, v)

tabs = ''.join(f'<button type="button" class="lt" data-k="{k}"><b>{t}</b><span data-d="{k}"></span></button>' for k, t, *_ in LESSONS)
top = ''.join(f'<a href="{html.escape(L[k][0])}" target="_blank" rel="noopener"><b>{L[k][1]}</b></a>' for k in TOP)

tpl = open(os.path.join(ROOT, 'tools', 'src', 'project_tpl.html'), encoding='utf-8').read()
page = (tpl.replace('<!--TABS-->', tabs).replace('<!--TOP-->', top).replace('<!--LESSONS-->', '\n'.join(sec))
        .replace('/*SCHED*/', json.dumps(sched, ensure_ascii=False)))
open(os.path.join(ROOT, 'project.html'), 'w', encoding='utf-8').write(page)
print('project.html', {k: len(s) for k, _, _, _, s in LESSONS})
