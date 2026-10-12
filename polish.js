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
