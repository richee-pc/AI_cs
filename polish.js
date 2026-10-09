/* polish.js — 모든 쪽 공통: 맨 위 메뉴를 «지금 쪽»이 보이게 굴리고, 옆으로 더 있으면 끝을 흐리게, 마우스 휠로 옆으로 넘기기 (2026-10-10) */
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
