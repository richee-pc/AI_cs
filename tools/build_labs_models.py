# -*- coding: utf-8 -*-
"""labs.html(코랩 실습실) · models.html(AI 모델 도감) 만들기 — plan.html 머리 + unit2 공통 CSS"""
import os, re, sys, hashlib
sys.stdout.reconfigure(encoding='utf-8')
SITE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))   # 저장소 맨 위(AI_cs)
HERE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'src')   # 빌드 원본
rd = lambda p: open(p, encoding='utf-8').read()
LV = hashlib.md5(open(os.path.join(SITE, 'lessons.js'), 'rb').read()).hexdigest()[:8]
plan = rd(os.path.join(SITE, 'plan.html'))
head0 = plan[:plan.index('<body>')]
common = re.search(r'<body>\r?\n(<style>.*?)</style>', rd(os.path.join(SITE, 'unit2.html')), re.S).group(1).replace('\r\n', '\n')
css = rd(os.path.join(HERE, 'labs_models.css'))
foot = plan[plan.index('<button type="button" class="totop"'):plan.index('</footer>') + len('</footer>')]
TOTOP = """<script>
(function(){ var tt = document.getElementById('toTop'); if(!tt) return;
addEventListener('scroll', function(){ tt.classList.toggle('on', scrollY > 600); }, { passive:true });
tt.addEventListener('click', function(){ scrollTo({ top:0, behavior:'smooth' }); }); })();
</script>"""


def nav(here):
    B = 'https://richee-pc.github.io/AI_cs/'
    items = [('index.html', '2학기 안내', ''), None, ('plan.html', '📅 우리 반 수업 계획', ' class="plan"'), None,
             ('unit1.html', 'Ⅰ. 인공지능의 이해', ''), ('unit2.html', 'Ⅱ. 인공지능과 학습', ''), ('unit3.html', 'Ⅲ. 사회적 영향', ''), ('unit4.html', 'Ⅳ. 프로젝트', ''), None,
             ('colab.html', '코랩 첫걸음', ''), ('labs.html', '🧪 코랩 실습실', ''), ('models.html', '📚 AI 모델 도감', ''), ('datagen.html', '🧰 데이터 공방', '')]
    out = ['<nav><div class="wrap"><div class="row">']
    for it in items:
        if it is None:
            out.append('  <span class="sep"></span>'); continue
        f, t, extra = it
        cls = ' class="here"' if f == here else extra
        out.append('  <a href="' + B + f + '"' + cls + '>' + t + '</a>')
    out.append('</div></div></nav>')
    return '\n'.join(out)


import hashlib as _h
POLISH = '<link rel="stylesheet" href="polish.css?v=%s">\n<script src="polish.js?v=%s"></script>\n' % tuple(_h.md5(open(os.path.join(SITE, f), 'rb').read()).hexdigest()[:8] for f in ('polish.css', 'polish.js'))
def page(fname, title, desc, icon, body, scripts, xcss=''):
    h = head0
    h = re.sub(r'<title>.*?</title>', '<title>' + title + '</title>', h)
    h = re.sub(r'<meta name="description"[^>]*>', '<meta name="description" content="' + desc + '">', h)
    h = re.sub(r'<meta property="og:title"[^>]*>', '<meta property="og:title" content="' + title + '">', h)
    h = re.sub(r'<meta property="og:description"[^>]*>', '<meta property="og:description" content="' + desc + '">', h)
    h = re.sub(r'(<text y=%22\.9em%22 font-size=%2290%22>).*?(</text>)', r'\g<1>' + icon + r'\g<2>', h)
    out = (h + '<body>\n' + common + css + xcss + '</style>\n\n' + body.replace('%%NAV%%', nav(fname)) + '\n\n' + foot + '\n' +
           '<script src="lessons.js?v=' + LV + '"></script>\n' + scripts + '\n' + TOTOP + '\n' + POLISH + '</body>\n</html>\n')
    open(os.path.join(SITE, fname), 'w', encoding='utf-8', newline='\n').write(out)
    print(fname, len(out.encode('utf-8')))


page('labs.html', '코랩 실습실 · 인공지능 기초', '「인공지능 기초」 교과서 Ⅱ·Ⅳ단원 코랩 실습을 단추 하나로 — 데이터 자동 불러오기, 힌트와 정답 예시가 있는 노트북 21권', '🧪',
     rd(os.path.join(HERE, 'labs_body.html')), rd(os.path.join(HERE, 'labs.js')))
page('models.html', 'AI 모델 도감 · 인공지능 기초', '선형 회귀부터 대규모 언어 모델까지 — 우리가 자주 만나는 AI 모델 26종의 원리 · 설정값 · 장단점 · 코드 · 오렌지3 위젯', '📚',
     rd(os.path.join(HERE, 'models_body.html')),
     '<script>\n' + rd(os.path.join(HERE, 'models_data.js')) + '\n' + rd(os.path.join(HERE, 'model_svgs.js')) + '\n' +
     rd(os.path.join(HERE, 'model_svgs_init.js')) + '\n</script>\n' + rd(os.path.join(HERE, 'models.js')))
page('datagen.html', '데이터 공방 · 인공지능 기초', '교육용 데이터셋 생성기 — 주제만 넣으면 열 추천 · 관계가 숨은 가상 데이터 · 결측치 · 이상치 · 오탈자 · 불균형 넣기 · CSV · JSON · Excel', '🧰',
     rd(os.path.join(HERE, 'datagen_body.html')), rd(os.path.join(HERE, 'datagen.js')).replace('%%LIB%%', rd(os.path.join(HERE, 'datagen_lib.js'))), rd(os.path.join(HERE, 'datagen.css')))
