<script>
/* AI 모델 도감 — MODELS(models_data.js)를 카드로 · 갈래 거르기 · 찾기 · #id 로 바로 열기 */
(function(){
var GH = 'https://colab.research.google.com/github/richee-pc/AI_cs/blob/main/notebooks/';
var FAM = { reg:'회귀(숫자 예측)', cls:'분류', uns:'비지도', dl:'딥러닝', gen:'생성형', rl:'강화 학습', how:'학습 방법' };
var TB = { 2:['★ 교과서 본문','t2'], 1:['☆ 교과서에 이름','t1'], 0:['넓혀 보기','t0'] };
function $(id){ return document.getElementById(id); }
function esc(t){ return String(t).replace(/[&<>"]/g, function(c){ return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]; }); }
var filt = 'all', q = '';
$('mdTb').textContent = MODELS.filter(function(m){ return m.tb === 2; }).length + '종';
function strip(h){ return h.replace(/<[^>]+>/g, ''); }
function text(m){ return [m.name, m.en, strip(m.one), m.like, m.how.join(' '), m.key, m.par.map(function(p){ return p.join(' '); }).join(' '), m.pro.join(' '), m.con.join(' '), m.use.join(' '), m.ow, FAM[m.fam]].join(' ').toLowerCase(); }
function card(m){
  var t = TB[m.tb];
  var viz = (window.MODEL_SVG || {})[m.id] || '';
  return '<details class="mdc" id="m-' + m.id + '" data-f="' + m.fam + '">' +
    '<summary>' + (viz ? '<span class="mdthumb" aria-hidden="true">' + viz + '</span>' : '<span class="mdi" aria-hidden="true">' + m.icon + '</span>') + '<span class="mdh"><b>' + m.name + '</b><i>' + m.en + '</i>' +
      '<span class="mdone">' + m.one + '</span></span>' +
      '<span class="mdtags"><span class="mdfam">' + FAM[m.fam] + '</span><span class="tbm ' + t[1] + '">' + t[0] + '</span></span></summary>' +
    '<div class="mdbody">' + (viz ? '<div class="mdviz">' + viz + '</div>' : '') +
      (m.p ? '<p class="mdp">📘 교과서 ' + m.p + '</p>' : '') +
      '<p class="mdlike"><b>비유</b>' + m.like + '</p>' +
      '<div class="mdcols"><div><h4>어떻게 정하나</h4><ol>' + m.how.map(function(h){ return '<li>' + h + '</li>'; }).join('') + '</ol>' +
        '<p class="mdkey"><b>핵심</b>' + esc(m.key) + '</p></div>' +
      '<div><h4>사람이 정하는 설정값</h4><ul class="mdpar">' + m.par.map(function(p){ return '<li><code>' + esc(p[0]) + '</code> ' + p[1] + '</li>'; }).join('') + '</ul>' +
        '<h4>잘하는 것</h4><ul class="pro">' + m.pro.map(function(x){ return '<li>' + x + '</li>'; }).join('') + '</ul>' +
        '<h4>조심할 것</h4><ul class="con">' + m.con.map(function(x){ return '<li>' + x + '</li>'; }).join('') + '</ul></div></div>' +
      '<p class="mduse"><b>어디에 쓰이나</b>' + m.use.join(' · ') + '</p>' +
      '<div class="codebox"><div class="codetop"><b>코드 (scikit-learn · keras)</b><span>오렌지3: ' + esc(m.ow) + '</span></div><pre>' + esc(m.sk) + '</pre></div>' +
      (m.nb ? '<div class="fgo" style="margin-top:10px">' + m.nb.map(function(n){ return '<a href="' + GH + n + '.ipynb" target="_blank" rel="noopener">▶ 코랩 ' + n.replace(/_/g, ' ') + '</a>'; }).join('') +
        '<a href="https://richee-pc.github.io/AI_cs/labs.html">🧪 코랩 실습실</a></div>' : '') +
    '</div></details>';
}
function draw(){
  var list = MODELS.filter(function(m){
    var okf = filt === 'all' || (filt === 'tb' ? m.tb === 2 : filt === 'rl' ? (m.fam === 'rl' || m.fam === 'how') : m.fam === filt);
    return okf && (!q || text(m).indexOf(q) >= 0);
  });
  $('mdList').innerHTML = list.length ? list.map(card).join('') : '<p class="note">찾는 모델이 없습니다. 다른 낱말로 찾아보세요.</p>';
  if(q && list.length <= 3) [].forEach.call($('mdList').querySelectorAll('details'), function(d){ d.open = true; });
}
$('mdFam').addEventListener('click', function(e){
  var b = e.target.closest('button[data-f]'); if(!b) return;
  filt = b.getAttribute('data-f');
  [].forEach.call(this.querySelectorAll('button'), function(x){ x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
  draw();
});
$('mdQ').addEventListener('input', function(){ q = this.value.trim().toLowerCase(); draw(); });
$('mdOpen').addEventListener('click', function(){ [].forEach.call(document.querySelectorAll('#mdList details'), function(d){ d.open = true; }); });
$('mdClose').addEventListener('click', function(){ [].forEach.call(document.querySelectorAll('#mdList details'), function(d){ d.open = false; }); });
draw();
function fromHash(){
  var h = location.hash.slice(1); if(!h) return;
  var d = document.getElementById(h.indexOf('m-') === 0 ? h : 'm-' + h);
  if(d && d.tagName === 'DETAILS'){ d.open = true; setTimeout(function(){ d.scrollIntoView({ block:'start' }); }, 50); }
}
fromHash(); addEventListener('hashchange', fromHash);
})();
</script>
