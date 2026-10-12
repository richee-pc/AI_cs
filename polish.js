/* polish.js — 모든 쪽 공통: 맨 위 메뉴를 «지금 쪽»이 보이게 굴리고, 옆으로 더 있으면 끝을 흐리게, 마우스 휠로 옆으로 넘기기 (2026-10-10) */
/* ?only=grade,flow — 팝업(수업 홈의 «2학기 안내» 단추) 안에서 그 구획만 보이기 */
(function(){
  var m = location.search.match(/[?&]only=([\w,-]+)/); if(!m) return;
  var want = m[1].split(',');
  var st = document.createElement('style');
  st.textContent = 'nav,.hero,footer,.totop,#lessonBar,.lbar,.lpanel{display:none!important} body{background:var(--white,#fff)!important}' +
    ' section.onlyhide{display:none!important} section{padding-top:18px!important; padding-bottom:22px!important; border:0!important}';
  document.head.appendChild(st);
  function apply(){
    [].forEach.call(document.querySelectorAll('section'), function(s){ if(want.indexOf(s.id) < 0) s.classList.add('onlyhide'); });
    [].forEach.call(document.querySelectorAll('a[href^="http"]:not([target])'), function(a){ a.target = '_top'; });
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply); else apply();
})();
/* ── 사이트 메뉴(큰 틀 → 누르면 작은 틀) ─────────────────────────────
   학생 쪽(수업 홈 · 단원 · 실습 도구 · 토론)의 맨 위 메뉴를 이 표로 다시 그립니다.
   단원 쪽에 구획을 더하거나 이름을 바꾸면 여기 표도 함께 고칩니다.        */
(function(){
  'use strict';
  var B = 'https://richee-pc.github.io/AI_cs/';
  var MEGA_PAGES = ['plan.html', 'unit1.html', 'unit2.html', 'unit3.html', 'unit4.html', 'labs.html', 'models.html', 'datagen.html', 'debate.html'];
  var here = (location.pathname.split('/').pop() || 'index.html');
  if(/[?&]only=/.test(location.search) || MEGA_PAGES.indexOf(here) < 0) return;
  var nav = document.querySelector('nav'), row = nav && nav.querySelector('.row'); if(!row) return;
  var M = [
    { t:'Ⅰ. 인공지능의 이해', p:'unit1.html', d:'탐색 · 지식 표현과 추론', items:[['flow','차시별 순서'],['slides','슬라이드'],['act','수업 활동'],['sim','탐색 시뮬레이터'],['terms','핵심 용어'],['check','확인 문제']] },
    { t:'Ⅱ. 인공지능과 학습', p:'unit2.html', d:'데이터 · 기계학습 · 모델 구현 · 딥러닝', items:[['learn','📘 교과서로 배우기'],['explore','데이터 탐구'],['prep','전처리 체험'],['kinds','학습 유형'],['algo','k-최근접 이웃 · 선형 회귀'],['models','모델 고르기 · 오렌지3'],['algolab','알고리즘 실험실'],['blocks','블록 → 파이썬'],['implement','구현 · 평가'],['nn','퍼셉트론'],['code','코랩 코드 읽기'],['lab','코랩 실습'],['terms','용어'],['check','확인 문제']] },
    { t:'Ⅲ. 사회적 영향', p:'unit3.html', d:'윤리 · 편향 · 인간과 AI의 공존', items:[['goal','배울 것'],['flow','차시별 순서'],['act','수업 활동'],['life','우리 삶'],['ethics','인공지능 윤리'],['inside','왜 틀리나'],['cases','실제 사례'],['myfeed','내 피드 진단'],['debate','토론 준비'],['terms','핵심 용어'],['check','확인 문제'],['debate.html','🗣️ 수행평가 ① 토론 안내']] },
    { t:'Ⅳ. 프로젝트', p:'unit4.html', d:'SDGs 문제를 AI로 · 수행평가 ②', items:[['learn','📘 교과서로 배우기'],['model','모형과 신호등'],['p1','① 주제 정하기'],['p2','② 계획'],['p3','③④ 오렌지3 · 개선'],['p4','⑤ 발표 · 성찰'],['pa2','수행평가 ②'],['wrap4','대단원 마무리'],['data','데이터 찾기'],['rules','꼭 지킬 것']] },
    { t:'🧪 실습 도구', d:'코랩 · 모델 · 데이터', items:[['colab.html','🐍 코랩 첫걸음'],['labs.html','🧪 코랩 실습실'],['models.html','📚 AI 모델 도감'],['datagen.html','🧰 데이터 공방'],['type.html','⌨️ 자판 깨우기'],['pose.html','🕹️ 동작 게임 만들기']] },
    { t:'📖 2학기 안내', d:'누르면 수업 홈에서 자세히 열림', items:[['plan.html?info=overview','📌 과목 한눈에'],['plan.html?info=grade','🏅 성적은 이렇게'],['plan.html?info=flow','🧩 배우는 순서'],['plan.html?info=months','🗓️ 학기 일정'],['plan.html?info=class','📅 우리 반 날짜'],['plan.html?info=pa1','📝 수행평가 · 정기고사'],['plan.html?info=ai','🚦 AI 사용 규칙'],['plan.html?info=tools','🔑 계정 · 프로그램']] }
  ];
  function href(g, it){ var x = it[0]; return x.indexOf('.html') > 0 ? B + x : B + g.p + '#' + x; }
  function fileOf(u){ return u.replace(B, '').split(/[?#]/)[0]; }
  var homeA = '<a class="homelink' + (here === 'plan.html' ? ' here' : '') + '" href="' + B + 'plan.html">🏠 우리 반 수업 홈</a>';
  var html = homeA + '<span class="sep"></span>' + M.map(function(g, gi){
    var mine = g.p === here || g.items.some(function(it){ return it[0].indexOf('.html') > 0 && fileOf(it[0]) === here && it[0].indexOf('?') < 0; });
    return '<button type="button" class="mgb' + (mine ? ' here' : '') + '" data-g="' + gi + '" aria-expanded="false">' + g.t + ' <i aria-hidden="true">▾</i></button>';
  }).join('');
  row.innerHTML = html; row.classList.add('mega');
  var panel = document.createElement('div'); panel.className = 'mgpanel'; panel.hidden = true;
  (nav.querySelector('.wrap') || nav).appendChild(panel);
  var openG = -1;
  function close(){ openG = -1; panel.hidden = true; [].forEach.call(row.querySelectorAll('.mgb'), function(b){ b.setAttribute('aria-expanded', 'false'); }); }
  function open(gi){
    var g = M[gi]; openG = gi;
    [].forEach.call(row.querySelectorAll('.mgb'), function(b){ b.setAttribute('aria-expanded', +b.getAttribute('data-g') === gi ? 'true' : 'false'); });
    panel.innerHTML = '<div class="mghead"><b>' + g.t + '</b><span>' + (g.d || '') + '</span>' + (g.p ? '<a class="mgfirst" href="' + B + g.p + '">단원 처음으로 →</a>' : '') + '<button type="button" class="mgx" aria-label="닫기">✕</button></div>' +
      '<div class="mggrid">' + g.items.map(function(it){
        var u = href(g, it), info = (it[0].match(/info=(\w+)/) || [])[1];
        return '<a href="' + u + '"' + (info ? ' data-info="' + info + '"' : '') + '>' + it[1] + '</a>'; }).join('') + '</div>';
    panel.hidden = false;
  }
  row.addEventListener('click', function(e){
    var b = e.target.closest('.mgb'); if(!b) return;
    var gi = +b.getAttribute('data-g'); if(openG === gi) close(); else open(gi);
  });
  panel.addEventListener('click', function(e){
    if(e.target.closest('.mgx')){ close(); return; }
    if(e.target.closest('a')) setTimeout(close, 0);
  });
  document.addEventListener('click', function(e){ if(openG >= 0 && !e.target.closest('nav')) close(); });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape' && openG >= 0) close(); });
})();
(function(){
  'use strict';
  var row = document.querySelector('nav .row'); if(!row) return;
  /* «🏠 우리 반 수업 홈»을 메뉴 맨 앞에(없으면 만들어서) */
  var home = row.querySelector('a[href$="plan.html"]');
  if(!home){ home = document.createElement('a'); home.href = 'https://richee-pc.github.io/AI_cs/plan.html'; home.textContent = '🏠 우리 반 수업 홈'; }
  home.classList.add('homelink');
  if(row.firstElementChild !== home){ row.insertBefore(home, row.firstChild); var sp = document.createElement('span'); sp.className = 'sep'; row.insertBefore(sp, home.nextSibling); }
  /* 넓은 화면에서 메뉴가 두 줄 이상이면 위에 붙어 다니지 않게(화면을 가리지 않게) */
  function tall(){ var nav = row.closest('nav'); if(nav) nav.classList.toggle('navtall', innerWidth >= 760 && row.offsetHeight > 70); }
  tall(); addEventListener('resize', tall);
  function edge(){
    var max = row.scrollWidth - row.clientWidth;
    row.classList.toggle('more-l', row.scrollLeft > 4);
    row.classList.toggle('more-r', row.scrollLeft < max - 4);
  }
  var here = row.querySelector('a.here');
  if(here && row.scrollWidth > row.clientWidth){
    row.scrollLeft = Math.max(0, here.offsetLeft - row.offsetLeft - (row.clientWidth - here.offsetWidth) / 2);
  }
  row.addEventListener('scroll', edge, { passive:true });
  addEventListener('resize', edge);
  row.addEventListener('wheel', function(e){
    if(row.scrollWidth <= row.clientWidth || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    e.preventDefault(); row.scrollLeft += e.deltaY;
  }, { passive:false });
  edge();
  /* 좁은 화면: ◀ ▶ 단추로 넘기기 */
  var wrap = row.parentNode, bl = document.createElement('button'), br = document.createElement('button');
  bl.type = br.type = 'button'; bl.className = 'navbtn l'; br.className = 'navbtn r'; bl.textContent = '◀'; br.textContent = '▶';
  bl.setAttribute('aria-label', '메뉴 왼쪽으로'); br.setAttribute('aria-label', '메뉴 오른쪽으로');
  wrap.appendChild(bl); wrap.appendChild(br);
  function btns(){ var max = row.scrollWidth - row.clientWidth; bl.hidden = row.scrollLeft <= 4; br.hidden = row.scrollLeft >= max - 4; }
  bl.addEventListener('click', function(){ row.scrollBy({ left:-row.clientWidth * .7, behavior:'smooth' }); });
  br.addEventListener('click', function(){ row.scrollBy({ left:row.clientWidth * .7, behavior:'smooth' }); });
  row.addEventListener('scroll', btns, { passive:true }); addEventListener('resize', btns); btns();
})();
/* 어느 쪽에서든 «🏠 수업 홈» */
(function(){
  if(/[?&]only=/.test(location.search) || /(^|\/)plan\.html$/.test(location.pathname) || document.body.classList.contains('hub')) return;
  var a = document.createElement('a'); a.className = 'homefab'; a.href = 'https://richee-pc.github.io/AI_cs/plan.html'; a.innerHTML = '🏠 <span>수업 홈</span>';
  a.setAttribute('aria-label', '우리 반 수업 홈으로'); document.body.appendChild(a);
})();
