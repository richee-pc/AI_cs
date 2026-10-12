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
})();
