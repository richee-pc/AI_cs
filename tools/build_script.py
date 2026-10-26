# -*- coding: utf-8 -*-
"""교사 진행 대본 만들기 — tools/src/script_<차시>.py 를 읽어
① teach.html 의 SCRIPT 블록(패드 «🎬 진행 순서 · 🎤 멘트 · 🆘 막히면»)을 바꾸고
② --html 경로를 주면 인쇄용 대본 HTML을 씁니다(--pin 은 인쇄본에만 들어감 · 공개 저장소에는 넣지 않음).
   python tools/build_script.py                       # 운영판만
   python tools/build_script.py --html 대본.html --pin 0000            # D2 인쇄본
   python tools/build_script.py --lesson D3 --html 대본3.html [--de]   # --de: D · E반 판
"""
import os, re, sys, json, html, argparse, importlib.util
sys.stdout.reconfigure(encoding='utf-8')
SITE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(SITE, 'tools', 'src')
LESSONS = ['D2', 'D2x', 'D3', 'D4', 'P1', 'P2', 'P3', 'P4']                     # 대본이 있는 차시 — script_<id>.py

def load(lid):
    sp = importlib.util.spec_from_file_location('s', os.path.join(SRC, f'script_{lid.lower()}.py'))
    m = importlib.util.module_from_spec(sp); sp.loader.exec_module(m); return m

ap = argparse.ArgumentParser(); ap.add_argument('--html'); ap.add_argument('--pin', default=''); ap.add_argument('--lesson', default='D2'); ap.add_argument('--de', action='store_true')
a = ap.parse_args()

P = os.path.join(SITE, 'teach.html'); s = open(P, encoding='utf-8').read()
KEEP = ('scr', 'run', 'say', 'stuck', 'ex', 'chk', 'code')
data, data_de, meta = {}, {}, {}
for lid in LESSONS:
    m = load(lid)
    data[lid] = [{k: v for k, v in g.items() if k in KEEP} for g in m.SEG]
    meta[lid] = {'before': m.BEFORE, 'late': m.LATE}
    if hasattr(m, 'SEG_DE'):                     # D · E반 판 — 패드는 반을 보고 고름
        data_de[lid] = [{k: v for k, v in {**g, **m.SEG_DE.get(n, {})}.items() if k in KEEP} for n, g in enumerate(m.SEG)]
    if hasattr(m, 'BEFORE_DE') or hasattr(m, 'LATE_DE'):
        meta[lid]['de'] = {'before': getattr(m, 'BEFORE_DE', m.BEFORE), 'late': getattr(m, 'LATE_DE', m.LATE)}
J = lambda o: json.dumps(o, ensure_ascii=False).replace('{PIN}', 'PIN')
block = 'var SCRIPT = ' + J(data) + ';\nvar SCRIPT_DE = ' + J(data_de) + ';\nvar SCRIPT_META = ' + J(meta) + ';'
s2 = re.sub(r'/\* SCRIPT-BEGIN.*?SCRIPT-END \*/', lambda _: '/* SCRIPT-BEGIN — tools/build_script.py 가 씀 */\n' + block + '\n/* SCRIPT-END */', s, flags=re.S)
assert s2 != s or block in s, 'teach.html 에 SCRIPT-BEGIN 표시가 없어요'
open(P, 'w', encoding='utf-8').write(s2); print('teach.html SCRIPT', {k: len(v) for k, v in data.items()})

if a.html:
    m = load(a.lesson)
    if a.de:                                     # D · E반 인쇄본 — TITLE_DE · BEFORE_DE · LATE_DE · SEG_DE{번호: 바꿀 칸}
        for k in ('TITLE', 'BEFORE', 'LATE'): setattr(m, k, getattr(m, k + '_DE', getattr(m, k)))
        for n, ov in getattr(m, 'SEG_DE', {}).items(): m.SEG[n] = {**m.SEG[n], **ov}
    i = s2.index("{ id:'%s'," % a.lesson); j = s2.find('{ id:', i + 5); j = j if j > 0 else s2.index('\n];', i)   # 마지막 차시면 배열 끝까지
    segs = re.findall(r"^   \[(\d+),'((?:[^'\\]|\\.)*)','(\w)'", s2[i:j], re.M)
    assert len(segs) == len(m.SEG), (len(segs), len(m.SEG))
    NOGLYPH = {'🖥 ': '', '🆘': '⚠', '🔗 ': '', '⛶ ': '', '📱 ': '', '🖥': ''}   # 인쇄 글꼴에 없는 그림 문자
    def e(x):
        x = x.replace('{PIN}', a.pin or 'PIN')
        for k, v in NOGLYPH.items(): x = x.replace(k, v)
        return html.escape(x)
    LT = {'n': ('AI 없이', 'n'), 'g': ('초록 · 자료 찾기 AI', 'g'), 'y': ('노랑 · ' + {'D2': '데이터 정리 AI', 'D2x': '데이터 정리 AI', 'D3': '질문하는 AI', 'D4': '발표 연습 AI', 'P1': '주제 정하기 AI', 'P2': '—', 'P3': '질문하는 AI', 'P4': '돌아보기 AI'}[a.lesson], 'y')}
    tg = lambda c, g: f'<span class="tag {LT[c][1]}">' + ('노랑 · ' + g['tool'] if c == 'y' and g.get('tool') else LT[c][0]) + '</span>'   # tool: 그 활동만 다른 노랑 도구
    rows = ''.join(f'<tr><td class="t">{g["t"]}</td><td>{e(t)}</td><td>{tg(c, g)}</td><td>{e(g["scr"])}</td></tr>'
                   for (mn, t, c), g in zip(segs, m.SEG))
    cards = ''
    for (mn, t, c), g in zip(segs, m.SEG):
        li = lambda xs: ''.join(f'<li>{e(x)}</li>' for x in xs)
        cards += (f'<section class="seg"><header><b class="tm">{g["t"]}</b><b class="ti">{e(t)}</b>'
                  f'{tg(c, g)}<span class="scr">빔: {e(g["scr"])}</span></header>'
                  f'<div class="cols"><div><h4>🎬 진행 순서</h4><ol>{li(g["run"])}</ol>'
                  + (f'<h4>✅ 넘어가기 전 확인</h4><ul class="ok">{li(g["chk"])}</ul>' if g['chk'] else '') +
                  f'</div><div><h4>🎤 이렇게 말해요</h4>' + ''.join(f'<p class="say">{e(x)}</p>' for x in g['say']) + '</div></div>'
                  + (f'<div class="code"><b>💻 코랩 코드 설명 — 빔에서 짚을 줄</b><table>' + ''.join(f'<tr><td><code>{e(c)}</code></td><td>{e(d)}</td></tr>' for c, d in g['code']) + '</table></div>' if g.get('code') else '')
                  + (f'<div class="stuck"><b>⚠ 막히면</b><ul>{li(g["stuck"])}</ul></div>' if g['stuck'] else '')
                  + ('<div class="ex">' + ''.join(f'<figure><img src="file:///{os.path.join(SITE, p).replace(os.sep, "/")}"><figcaption>빔 예시 · {e(c)}</figcaption></figure>' for p, c in g.get('ex', [])) + '</div>' if g.get('ex') else '')
                  + '</section>')
    page = f'''<!doctype html><html lang="ko"><head><meta charset="utf-8"><title>{e(m.TITLE)} — 진행 대본</title><style>
@page{{size:A4; margin:9mm 10mm}} *{{box-sizing:border-box}}
body{{font-family:"Malgun Gothic","Noto Sans KR",sans-serif; font-size:8.9pt; line-height:1.42; color:#1d2433; margin:0}}
h1{{font-size:16pt; margin:0 0 2px}} .sub{{color:#4a5568; margin:0 0 8px}}
h2{{font-size:11.5pt; margin:8px 0 5px; padding:4px 10px; background:#eef3fc; border-left:5px solid #2f6fdb; border-radius:0 6px 6px 0}}
table{{width:100%; border-collapse:collapse; margin:4px 0}} th,td{{border:1px solid #c9d1de; padding:2px 6px; text-align:left; vertical-align:top}}
th{{background:#f1f4f9}} td.t{{font-weight:700; white-space:nowrap; width:50px}}
ul,ol{{margin:2px 0; padding-left:17px}} li{{margin:1px 0}}
.tag{{display:inline-block; padding:0 7px; border-radius:9px; font-size:8pt; font-weight:700; white-space:nowrap}}
.tag.n{{background:#eceff4; color:#4a5568}} .tag.g{{background:#d9f3e3; color:#137a4b}} .tag.y{{background:#fff1b8; color:#7a5800}}
.seg{{border:1px solid #cfd6e3; border-radius:9px; margin:0 0 7px; break-inside:avoid; overflow:hidden}}
.seg header{{display:flex; gap:8px; align-items:center; flex-wrap:wrap; background:#f3f6fb; padding:4px 10px; border-bottom:1px solid #dde3ee}}
.tm{{font-size:12pt; color:#1b4fc4; min-width:54px}} .ti{{font-size:10.5pt}} .scr{{margin-left:auto; color:#4a5568; font-size:8.4pt}}
.cols{{display:grid; grid-template-columns:40% 60%; gap:0}} .cols>div{{padding:5px 10px}} .cols>div+div{{border-left:1px dashed #d5dbe6}}
h4{{margin:2px 0 2px; font-size:8.8pt; color:#4a5568}}
.say{{margin:0 0 4px; padding:3px 8px; background:#eef4ff; border-radius:6px; color:#173f9e}}
.ok li{{color:#1f7a45; font-weight:700}}
.stuck{{background:#fff7e0; border-top:1px solid #f0dfae; padding:4px 10px}} .stuck ul{{margin:0}}
.note{{background:#fdecec; border-left:4px solid #d64545; padding:5px 10px; margin:6px 0; border-radius:0 6px 6px 0}}
.ex{{display:flex; gap:8px; padding:5px 10px; border-top:1px dashed #d5dbe6}} .ex figure{{margin:0; text-align:center}} .ex img{{height:120px; border:1px solid #d5dbe6; border-radius:5px}} .ex figcaption{{font-size:7.6pt; color:#4a5568}}
.code{{border-top:1px dashed #d5dbe6; padding:4px 10px; background:#f6f8fc}} .code table{{margin:2px 0}} .code td{{font-size:8.4pt}} .code code{{font-family:Consolas,monospace; font-size:8.2pt; color:#7a2e9e; white-space:nowrap}}
.pg{{break-before:page}}
</style></head><body>
<h1>{e(m.TITLE)} — 진행 대본</h1>
<p class="sub">활동마다 <b>빔에 띄울 화면 · 🎬 선생님이 누를 순서 · 🎤 학생에게 할 말 · ✅ 넘어가기 전 확인 · ⚠ 막히면</b>. 운영판 패드에도 같은 내용이 지금 활동에 맞춰 떠요.</p>
<h2>수업 전 (쉬는 시간)</h2><ul>{''.join(f'<li>{e(x)}</li>' for x in m.BEFORE)}</ul>
<h2>한눈에 — 50분</h2><table><tr><th>시간</th><th>활동</th><th>신호등</th><th>빔 화면</th></tr>{rows}</table>
<div class="note">{e(m.LATE)}</div>
<h2 class="pg">활동별 대본</h2>{cards}
</body></html>'''
    open(a.html, 'w', encoding='utf-8').write(page); print('대본', a.html)
