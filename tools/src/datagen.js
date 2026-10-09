<script>
%%LIB%%
/* ══════════════════════════════════════════════════════════════
   데이터 공방 v2 (2026-10-07) — 교육용 데이터셋 생성기를 우리 수업에 맞게 다시 만든 것
   ① 기본 설정(학년 · 주제 · 요청사항 · 열 복잡도 · 행 수 · 그래프) ② 데이터 품질 옵션 ③ 컬럼 편집 ④ 생성 → 미리보기 · 통계 · 그래프 · 내려받기
   AI · 서버 없이 내장 사전(DG_LIB · DG_TOP)으로 주제에 맞는 열을 고르고, 숨은 요인 모형으로 «관계가 있는» 값을 만든다.
   같은 설정 + 같은 데이터 번호 = 똑같은 데이터(반 전체 공유 · 이력 복원).
   ══════════════════════════════════════════════════════════════ */
(function(){
function $(id){ return document.getElementById(id); }
function esc(t){ return String(t).replace(/[&<>"]/g, function(c){ return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]; }); }
function clip(v, a, b){ return Math.max(a, Math.min(b, v)); }
function sig(z){ return 1 / (1 + Math.exp(-z)); }
function hash(s){ var h = 2166136261; for(var i = 0; i < s.length; i++){ h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function RNG(seed){
  var a = seed >>> 0;
  function r(){ a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }
  return { r:r, u:function(a, b){ return a + (b - a) * r(); }, i:function(a, b){ return Math.floor(a + (b - a + 1) * r()); },
    n:function(){ var u = 1 - r(), v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); },
    pick:function(a){ return a[Math.floor(r() * a.length)]; } };
}
function lsGet(k){ try{ return JSON.parse(localStorage.getItem(k) || 'null'); }catch(e){ return null; } }
function lsSet(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }

var TYPES = { num:'숫자', cat:'범주', date:'날짜', bool:'참/거짓' };
var GRAPHS = [['산점도', '두 수치 변수 간 상관관계'], ['히스토그램', '수치 변수의 분포 모양'], ['막대그래프', '범주별 빈도 · 평균 비교'],
  ['꺾은선그래프', '시간에 따른 변화 추이'], ['상자그림', '사분위수 · 이상치 탐색'], ['원그래프', '범주 비율 시각화']];
var Q = [['noise', '노이즈', '수치 오차 포함'], ['miss', '결측치', '빈 값 — 결측 실습'], ['out', '이상치', '극단값 — 이상 탐지'], ['dup', '중복값', '중복 행 — 정제 실습'],
  ['imb', '클래스 불균형', '한 범주가 80% 지배'], ['typo', '오탈자', '범주값에 오탈자 삽입'], ['unit', '단위 오류', '×10 / ÷10 단위 불일치'], ['date', '형식 불일치', '날짜 형식 혼재']];
var POW = { s:{ miss:3, out:1, dup:2, typo:3, unit:1, date:10, noise:0.05 }, m:{ miss:6, out:2, dup:4, typo:6, unit:2, date:25, noise:0.1 }, l:{ miss:12, out:4, dup:8, typo:12, unit:4, date:50, noise:0.2 } };
var CX = { s:3, m:5, l:8 };
var CHIPS = ['학교 급식 만족도', '청소년 수면 패턴', '스마트폰 사용 시간', '교통 안전 인식', '환경 보호 활동', '독서 습관 조사', '교내 체육 활동', '학생 진로 희망'];

/* ── 사전 정리 ── */
var LIB = {}, LIBA = DG_LIB.map(function(e){ var o = { n:e[0], k:e[1], kw:e[2].toLowerCase().split('|'), a:e[3], pol:e[4] }; LIB[o.n] = o; return o; });
function uiType(k){ return { id:'num', year:'num', month:'num', num:'num', cat:'cat', grade:'cat', ord:'cat', bool:'bool', date:'date' }[k]; }

/* 열 이름 → 생성 규칙. 사전에 같은 이름이 있으면 그것, 없으면 이름의 낱말로 짐작 */
function spec(c, grade){
  var L = LIB[c.n];
  if(L && uiType(L.k) === c.t) return L;
  var n = c.n.toLowerCase();
  if(c.t === 'num'){
    var hit = LIBA.filter(function(o){ return uiType(o.k) === 'num' && o.k === 'num' && o.kw.some(function(k){ return k.length > 1 && n.indexOf(k) >= 0; }); })[0];
    if(hit) return { n:c.n, k:'num', a:hit.a, pol:hit.pol };
    if(/(연도|년도)$/.test(n)) return { n:c.n, k:'year', a:[2015, 2024] };
    if(/^월$|월별/.test(n)) return { n:c.n, k:'month', a:[1, 12] };
    if(/번호|학번|id$/.test(n)) return { n:c.n, k:'id' };
    var g = [[/점수|성적/, [65, 15, 0, 100, 0, '점', 1]], [/만족|인식|관심|선호|정도|평가/, [3.5, 0.9, 1, 5, 0, '1~5', 1]], [/분$/, [30, 15, 0, 180, 0, '분', 0, 1]],
      [/시간/, [2.5, 1.3, 0, 12, 1, '시간', 0, 1]], [/(비율|률|퍼센트)$/, [40, 18, 0, 100, 1, '%', 0]], [/(금액|비용|가격|요금|원)$/, [15000, 8000, 0, 100000, -2, '원', 0, 1]],
      [/(횟수|회수|빈도)$/, [4, 2.5, 0, 30, 0, '회', 0, 1]], [/(수|개수|인원)$/, [12, 6, 0, 80, 0, '개', 0, 1]], [/(거리|길이)/, [5, 3, 0, 40, 1, 'km', 0, 1]],
      [/(온도|기온)/, [18, 7, -10, 40, 1, '℃', 0]], [/(무게|체중|질량)/, [50, 12, 1, 150, 1, 'kg', 0]], [/(높이|키)/, [150, 20, 50, 250, 1, 'cm', 0]], [/(량|양)$/, [100, 40, 0, 400, 0, '', 0, 1]]];
    for(var i = 0; i < g.length; i++) if(g[i][0].test(n)) return { n:c.n, k:'num', a:g[i][1], pol:0 };
    return { n:c.n, k:'num', a:[50, 15, 0, 100, 1, '', 0] };
  }
  if(c.t === 'cat'){
    var hc = LIBA.filter(function(o){ return (o.k === 'cat' || o.k === 'ord') && o.kw.some(function(k){ return k.length > 1 && n.indexOf(k) >= 0; }); })[0];
    if(c.n === '학년') return { n:'학년', k:'grade' };
    if(hc) return { n:c.n, k:hc.k, a:hc.a, pol:hc.pol };
    if(/등급|수준|단계/.test(n)) return { n:c.n, k:'ord', a:['상', '중', '하'] };
    return { n:c.n, k:'cat', a:['가', '나', '다', '라'].map(function(x){ return c.n + ' ' + x; }) };
  }
  if(c.t === 'bool'){ var hb = LIBA.filter(function(o){ return o.k === 'bool' && o.kw.some(function(k){ return k.length > 1 && n.indexOf(k) >= 0; }); })[0];
    return { n:c.n, k:'bool', a:hb ? hb.a : [0.5], pol:hb ? hb.pol : 0 }; }
  var hd = L && L.k === 'date' ? L : null;
  return { n:c.n, k:'date', a:hd ? hd.a : ['2026-03-02', 200] };
}

/* ── 주제 → 열 추천 (내장 사전) ── */
/* 낱말 줄기: 끝의 조사 · 어미(와 · 과 · 의 · 을 · 를 · 별 · 에서 …)를 떼어 «미세먼지와» → «미세먼지» */
var STOP = ['조사', '분석', '관계', '영향', '실태', '학생', '청소년', '우리', '변화', '비교', '현황', '데이터', '결과', '기록', '습관', '활동', '정도', '여부', '따른', '대한', '관련', '지역별', '국가별', '학년별', '연도별', '학교', '동네', '우리반', '건강', '생활', '사용', '이용', '참여', '섭취', '줍기', '개체', '정보', '문제', '인식', '조사하기', '만족도', '시간', '측정', '실험', '조건'];
function stem(w){ var o = w; w = w.replace(/(에서|으로|에게|하기|하는|과의|와의|이랑|랑|와|과|의|을|를|은|는|에|로|별)$/, ''); return w.length > 1 ? w : o; }
function toks(s){ return (s || '').toLowerCase().replace(/[^0-9a-z가-힣\s]/g, ' ').split(/\s+/).filter(function(w){ return w.length > 1; }).map(stem); }
function topScore(t, text){
  var tw = toks(t[0]), sc = 0, mine = toks(text), txt = text.toLowerCase();
  tw.forEach(function(w){ if(STOP.indexOf(w) >= 0){ if(mine.indexOf(w) >= 0) sc += 0.3; return; }
    if(mine.indexOf(w) >= 0) sc += 2; else if(mine.some(function(m){ return m.length > 1 && (w.indexOf(m) >= 0 || m.indexOf(w) >= 0); })) sc += 1.2; });
  t[4].forEach(function(cn){ var L = LIB[cn]; if(L && L.kw.some(function(k){ return k.length > 1 && txt.indexOf(k) >= 0; })) sc += 0.6; });
  return sc;
}
function bestTops(text, grade){ return DG_TOP.map(function(t){ return [t, topScore(t, text) + (t[1].indexOf(grade) >= 0 ? 0.1 : 0)]; }).filter(function(x){ return x[1] >= 1.2; }).sort(function(a, b){ return b[1] - a[1]; }); }
/* 사전이 설명하지 못한 낱말 → 그 낱말로 열 만들기(«반려견» → 반려견경험여부 · 반려견만족도 · 반려견횟수) */
function uncovered(text, names){ var cover = names.map(function(n){ var L = LIB[n]; return (n + ' ' + (L ? L.kw.join(' ') : '')).toLowerCase(); }).join(' ');
  return toks(text).filter(function(w){ return STOP.indexOf(w) < 0 && !/^\d+$/.test(w) && cover.indexOf(w) < 0 && !LIBA.some(function(o){ return o.kw.indexOf(w) >= 0; }); }); }
function libHits(text){ var txt = (text || '').toLowerCase(); return LIBA.filter(function(o){ return o.k !== 'id' && o.kw.some(function(k){ return k.length > 1 && txt.indexOf(k) >= 0; }); }); }
function col(n){ var L = LIB[n]; return { n:n, t:L ? uiType(L.k) : /(여부|유무)$/.test(n) ? 'bool' : 'num' }; }
function recommend(){
  var text = st.topic + ' ' + st.req, b = bestTops(st.topic, st.grade), names = [], tgt = '', base = null, notes = [];
  if(st.topic.trim() === '*spiral'){ st.cols = [{ n:'x1', t:'num' }, { n:'x2', t:'num' }, { n:'라벨', t:'cat' }]; st.tgt = '라벨'; return; }
  if(b.length){ base = b[0][0]; names = base[4].slice(); tgt = base[5]; notes.push('«' + base[0] + '» 사전 항목을 바탕으로'); }
  libHits(text).forEach(function(o){ if(names.indexOf(o.n) < 0) names.push(o.n); });
  var un = uncovered(st.topic, names).slice(0, 2), mk = [];
  un.forEach(function(w, i){ (i === 0 ? [w + '경험여부', w + '만족도'] : [w + '횟수']).forEach(function(n){ if(names.indexOf(n) < 0) mk.push(n); }); });
  if(mk.length){ names = mk.concat(names); notes.push('사전에 없는 낱말(' + un.join(' · ') + ')로 만든 열 — 이름 · 타입을 알맞게 고쳐 쓰세요'); }
  if(!names.length) notes.push('사전에 딱 맞는 주제가 없어 일반 설문 열로 시작 — 열 이름을 고쳐 쓰세요');
  libHits(st.req).forEach(function(o){ notes.push('요청사항에서 «' + o.n + '»'); });
  /* 그래프에 맞추기 */
  var num = function(){ return names.filter(function(n){ var L = LIB[n]; return L && L.k === 'num'; }); };
  var catU = function(){ return names.filter(function(n){ var L = LIB[n]; return L && (L.k === 'cat' || L.k === 'grade'); }); };
  var g = st.graph;
  if(g === '산점도') while(num().length < 2) names.push(['참여횟수', '만족도', '선호도'].filter(function(n){ return names.indexOf(n) < 0; })[0]);
  if(g === '히스토그램' && !num().length) names.push('참여횟수');
  if((g === '막대그래프' || g === '상자그림' || g === '원그래프') && !catU().length) names.unshift(st.grade === 'e' ? '반' : '성별');
  if((g === '막대그래프' || g === '상자그림') && !num().length) names.push('만족도');
  if(g === '꺾은선그래프' && !names.some(function(n){ var L = LIB[n]; return L && /year|month|date/.test(L.k); })) names.unshift(names.indexOf('국가') >= 0 || /sdg|국가|나라|세계/.test(text.toLowerCase()) ? '연도' : '측정일');
  if(g === '꺾은선그래프' && !num().length) names.push('참여횟수');
  /* 열 복잡도에 맞추기 */
  var want = st.cx === 'c' ? clip(st.cxN, 1, 20) : CX[st.cx];
  var keep = function(n){ var L = LIB[n]; return n === tgt || (g === '꺾은선그래프' && L && /year|month|date/.test(L.k)); };
  ['학번', '반', '학년', '성별', '조사일'].forEach(function(d){ if(names.length > want && names.indexOf(d) >= 0 && !keep(d)) names.splice(names.indexOf(d), 1); });
  while(names.length > want){ var k = names.length - 1; while(k >= 0 && keep(names[k])) k--; if(k < 0) break; names.splice(k, 1); }
  var fill = (base ? DG_TOP.filter(function(t){ return t[2] === base[2]; }).reduce(function(a, t){ return a.concat(t[4]); }, []) : []).concat(['학년', '성별', '만족도', '참여횟수', '인식점수', '선호도', '행복도', '조사일']);
  for(var i = 0; i < fill.length && names.length < want; i++) if(names.indexOf(fill[i]) < 0 && fill[i] !== '학번') names.push(fill[i]);
  st.cols = names.map(col);
  st.tgt = names.indexOf(tgt) >= 0 ? tgt : '';
  st.recNote = notes.join(' · ');
  st.recTopic = st.topic;
}
function related(){
  var b = bestTops(st.topic, st.grade).map(function(x){ return x[0]; }), cat = b[0] ? b[0][2] : null, out = [];
  b.slice(1).forEach(function(t){ if(out.length < 4) out.push(t[0]); });
  DG_TOP.forEach(function(t){ if(out.length < 6 && t[2] === cat && out.indexOf(t[0]) < 0 && (!b[0] || t[0] !== b[0][0])) out.push(t[0]); });
  if(st.topic && out.length < 8) [' — 학년별 비교', ' — 성별 차이', ' — 변화 추이'].forEach(function(s){ if(out.length < 8) out.push(st.topic.replace(/ — .*/, '') + s); });
  return out;
}

/* ── 상태 ── */
var DEF = { grade:'h', topic:'', req:'', cx:'m', cxN:6, n:100, graph:'', q:{}, pow:'m', cols:[], tgt:'', seed:2026, recTopic:'', recNote:'' };
var st = JSON.parse(JSON.stringify(DEF)), last = null, showMark = true, prevN = 5;

/* ── 만들기 ── */
function generate(){
  var S = st, R = RNG(hash(JSON.stringify([S.seed, S.n, S.grade, S.topic, S.cols, S.tgt, S.graph])));
  var N = S.n, cols = S.cols.map(function(c){ var p = spec(c, S.grade); return { n:c.n, t:c.t, p:p }; });
  var rows = [], spiral = S.topic.trim() === '*spiral';
  var time = cols.filter(function(c){ return /year|month|date/.test(c.p.k); })[0];
  var grp = cols.filter(function(c){ return c.p.k === 'cat' && c.n !== S.tgt && c.p.a && c.p.a.length <= 8; })[0];
  var gEff = {}; if(grp) grp.p.a.forEach(function(v){ gEff[v] = R.n() * 0.7; });
  var load = {}, sign = {};
  cols.forEach(function(c){ var pol = c.p.pol; sign[c.n] = pol ? pol : (R.r() < 0.5 ? -1 : 1); load[c.n] = c.n === S.tgt ? 0.85 : pol ? 0.6 : R.u(0.15, 0.5);
    if(S.graph === '산점도' && c.p.k === 'num' && cols.filter(function(x){ return x.p.k === 'num'; }).slice(0, 2).indexOf(c) >= 0) load[c.n] = Math.max(load[c.n], 0.75); });
  var tgtCats = null;
  for(var i = 0; i < N; i++){
    var o = {}, F = R.n(), Tt = R.r();
    if(spiral){ var cA = R.r() < 0.5, t = Math.sqrt(R.r()) * 3 * Math.PI, s = cA ? 1 : -1;
      o.x1 = +(s * t * Math.cos(t) / 5 + R.n() * 0.1).toFixed(3); o.x2 = +(s * t * Math.sin(t) / 5 + R.n() * 0.1).toFixed(3); o.라벨 = cA ? 'A' : 'B'; rows.push(o); continue; }
    if(grp){ o[grp.n] = R.pick(grp.p.a); F += gEff[o[grp.n]]; }
    cols.forEach(function(c){
      if(c === grp) return;
      var p = c.p, k = p.k, a = p.a;
      if(k === 'id'){ o[c.n] = 1001 + i; return; }
      if(k === 'grade'){ o[c.n] = S.grade === 'e' ? R.i(1, 6) + '학년' : R.i(1, 3) + '학년'; return; }
      if(k === 'year'){ o[c.n] = Math.round(a[0] + Tt * (a[1] - a[0])); return; }
      if(k === 'month'){ o[c.n] = 1 + Math.min(11, Math.floor(Tt * 12)); return; }
      if(k === 'date'){ var d0 = new Date(a[0] + 'T00:00:00Z'), d = new Date(+d0 + Math.floor(Tt * a[1]) * 864e5);
        o[c.n] = d.toISOString().slice(0, 10); return; }
      var ld = load[c.n], z = sign[c.n] * ld * F + Math.sqrt(1 - ld * ld) * R.n();
      if(time && k === 'num'){ if(time.p.k === 'month' && /기온|수온|습도|평균기온/.test(c.n)) z += 1.3 * Math.sin((Tt * 12 - 3.5) / 12 * 2 * Math.PI);
        else if(time.p.k === 'month' && /전력/.test(c.n)) z += 1.1 * Math.cos((Tt * 12 - 0.5) / 6 * Math.PI);
        else z += (p.pol || sign[c.n]) * 1.1 * (Tt - 0.5); }
      if(k === 'num'){
        var m = typeof a[0] === 'object' ? a[0][S.grade] : a[0], sd = a[1], v = a[7] ? Math.max(a[2], m * Math.exp(z * sd / m * 0.85) - sd * 0.15) : m + sd * z;
        v = clip(v, a[2], a[3]); var dd = a[4]; v = dd >= 0 ? +v.toFixed(dd) : Math.round(v / Math.pow(10, -dd)) * Math.pow(10, -dd); o[c.n] = v; return; }
      if(k === 'ord'){ var sc = F + 0.5 * R.n(), K = a.length, q = sig(sc * 1.7), idx = Math.min(K - 1, Math.floor((1 - q) * K)); o[c.n] = a[idx]; return; }
      if(k === 'bool'){ var p0 = a[0], pr = sig(Math.log(p0 / (1 - p0)) + (p.pol || sign[c.n]) * (c.n === S.tgt ? 2 : 1.2) * F); o[c.n] = R.r() < pr ? (/여부|유무/.test(c.n) || LIB[c.n] ? '예' : '참') : (/여부|유무/.test(c.n) || LIB[c.n] ? '아니오' : '거짓'); return; }
      if(k === 'cat'){ if(c.n === S.tgt){ var K2 = a.length, q2 = sig(F * 1.6 + 0.4 * R.n()); o[c.n] = a[Math.min(K2 - 1, Math.floor((1 - q2) * K2))]; } else o[c.n] = R.pick(a); return; }
    });
    rows.push(o);
  }
  if(time && (S.graph === '꺾은선그래프' || time.p.k !== 'date')) rows.sort(function(x, y){ return x[time.n] < y[time.n] ? -1 : x[time.n] > y[time.n] ? 1 : 0; });
  /* 클래스 불균형: 정답 열(없으면 첫 범주 · 참/거짓 열)의 한 값이 80% */
  var notes = [];
  if(S.q.imb){
    var ic = cols.filter(function(c){ return c.n === S.tgt && c.t !== 'num' && c.t !== 'date'; })[0] || cols.filter(function(c){ return (c.t === 'cat' || c.t === 'bool') && c.p.k !== 'grade'; })[0];
    if(ic){ var cnt = {}; rows.forEach(function(r){ cnt[r[ic.n]] = (cnt[r[ic.n]] || 0) + 1; }); var maj = Object.keys(cnt).sort(function(x, y){ return cnt[y] - cnt[x]; })[0];
      var need = Math.round(N * 0.8), A = rows.filter(function(r){ return r[ic.n] === maj; }), B = rows.filter(function(r){ return r[ic.n] !== maj; });
      while(A.length < need && B.length){ var r0 = B.splice(Math.floor(R.r() * B.length), 1)[0]; r0[ic.n] = maj; A.push(r0); }
      while(A.length > need){ var r1 = A.splice(Math.floor(R.r() * A.length), 1)[0], other = Object.keys(cnt).filter(function(k){ return k !== maj; }); if(!other.length) break; r1[ic.n] = R.pick(other); B.push(r1); }
      notes.push('«' + ic.n + '» 열은 «' + maj + '» 값이 80%'); }
    else notes.push('범주 열이 없어 클래스 불균형은 넣지 못함');
  }
  rows.forEach(function(r, i){ r._i = i; });
  var clean = rows.map(function(r){ var c = {}; for(var k in r) c[k] = r[k]; return c; });
  /* 품질 문제 넣기 */
  var P = POW[S.pow], log = [], numc = cols.filter(function(c){ return c.p.k === 'num'; }), catc = cols.filter(function(c){ return c.t === 'cat' || c.t === 'bool'; }), dt = cols.filter(function(c){ return c.p.k === 'date'; })[0];
  var rq = (S.req || '').replace(/\s/g, '');
  var adj = function(key, base){ if(new RegExp((key === 'miss' ? '결측' : key === 'out' ? '이상치' : '중복') + '.{0,4}(적게|조금|약하게)').test(rq)) return base / 2;
    if(new RegExp((key === 'miss' ? '결측' : key === 'out' ? '이상치' : '중복') + '.{0,4}(많이|많게|강하게)').test(rq)) return base * 2; return base; };
  function cell(kind, r, c, v){ log.push({ k:kind, r:r, c:c, a:r[c], b:v }); r[c] = v; }
  var sd = {}; numc.forEach(function(c){ var a = c.p.a; sd[c.n] = a ? (typeof a[1] === 'number' ? a[1] : 1) : 1; });
  if(S.q.noise) rows.forEach(function(r){ numc.forEach(function(c){ if(R.r() < 0.5){ var dd = c.p.a[4], v = r[c.n] + R.n() * P.noise * sd[c.n]; r[c.n] = dd >= 0 ? +v.toFixed(dd) : Math.round(v / Math.pow(10, -dd)) * Math.pow(10, -dd); } }); });
  var uc = numc.filter(function(c){ return c.p.a && c.p.a[5] && !/1~|%|^$/.test(c.p.a[5]) && c.n !== S.tgt; })[0];
  if(S.q.unit){ if(uc) rows.forEach(function(r){ if(R.r() < P.unit / 100){ var f = R.r() < 0.5 ? 10 : 0.1, dd = Math.max(0, c4(uc)); cell('unit', r, uc.n, +(r[uc.n] * f).toFixed(f < 1 ? dd + 1 : dd)); } }); else notes.push('단위가 있는 숫자 열이 없어 단위 오류는 넣지 못함'); }
  function c4(c){ return c.p.a[4]; }
  if(S.q.out){ if(numc.length) rows.forEach(function(r){ if(R.r() < P.out / 100){ var c = R.pick(numc), a = c.p.a, hi = a[3], lo = a[2], v = R.r() < 0.75 ? hi + (hi - lo) * R.u(0.5, 2.5) : lo - (hi - lo) * R.u(0.2, 0.8);
      if(lo >= 0 && v < 0 && R.r() < 0.5) v = -Math.abs(r[c.n]) || -1; cell('out', r, c.n, a[4] >= 0 ? +v.toFixed(a[4]) : Math.round(v)); } }); else notes.push('숫자 열이 없어 이상치는 넣지 못함'); }
  if(S.q.typo){ if(catc.length) rows.forEach(function(r){ catc.forEach(function(c){ if(R.r() < P.typo / 100 && r[c.n] !== '') cell('typo', r, c.n, typo(r[c.n], R)); }); }); else notes.push('범주 열이 없어 오탈자는 넣지 못함'); }
  if(S.q.date){ if(dt) rows.forEach(function(r){ if(R.r() < P.date / 100){ var p = r[dt.n].split('-'), y = p[0], mo = +p[1], d = +p[2];
      cell('date', r, dt.n, R.pick([y + '/' + mo + '/' + d, y + p[1] + p[2], y + '.' + p[1] + '.' + p[2] + '.', mo + '월 ' + d + '일', p[1] + '/' + p[2] + '/' + y, y + '년 ' + mo + '월 ' + d + '일'])); } }); else notes.push('날짜 열이 없어 형식 불일치는 넣지 못함 — 열 타입을 «날짜»로 하나 추가하세요'); }
  if(S.q.miss){ var mr = adj('miss', P.miss); rows.forEach(function(r){ cols.forEach(function(c){ if(c.p.k !== 'id' && R.r() < mr / 100 / (c.n === S.tgt ? 3 : 1)) cell('miss', r, c.n, ''); }); }); }
  if(S.q.dup){ var dr = adj('dup', P.dup), D = rows.filter(function(){ return R.r() < dr / 100; });
    D.forEach(function(r){ var c = {}; for(var k in r) c[k] = r[k]; c._dup = 1; var at = rows.indexOf(r) + 1 + Math.floor(R.r() * 6); rows.splice(Math.min(at, rows.length), 0, c); log.push({ k:'dup', r:c, c:'(줄 전체)', a:'', b:'' }); }); }
  last = { cols:cols, rows:rows, clean:clean, log:log, notes:notes };
}
function typo(v, R){
  var M = { '예':['Y', 'yes', '네', 'O'], '아니오':['N', 'no', '아니요', 'X'], '참':['TRUE', 'T', '참 '], '거짓':['FALSE', 'F', '거짓 '], '남':['남자', 'M', '남 '], '여':['여자', 'F', '여 '],
    '버스':['bus', '버스 '], '지하철':['전철', '지하철 '], '자가용':['승용차', '자가용 '], '도보':['걸어서', '도보 '], '자전거':['자전기', '자전거 '] };
  if(M[v]) return R.pick(M[v]);
  v = String(v); return R.pick([v + ' ', ' ' + v, v + '.', v.length > 1 ? v.slice(0, -1) + v.slice(-1) + v.slice(-1) : v + v, v.replace(/ /g, '')]) || v + ' ';
}

/* ── 화면 ── */
function ui(){
  [].forEach.call(document.querySelectorAll('#dgGrade button'), function(b){ b.setAttribute('aria-pressed', b.getAttribute('data-g') === st.grade); });
  $('dgTopic').value = st.topic === '*spiral' ? '소용돌이(Spiral) — 신경망 연습' : st.topic; $('dgTopicN').textContent = st.topic.length;
  $('dgReq').value = st.req; $('dgReqN').textContent = st.req.length;
  [].forEach.call(document.querySelectorAll('#dgCx button'), function(b){ b.setAttribute('aria-pressed', b.getAttribute('data-c') === st.cx); });
  $('dgCxN').hidden = st.cx !== 'c'; $('dgCxNi').value = st.cxN;
  var preset = [30, 100, 500, 1000].indexOf(st.n) >= 0;
  [].forEach.call(document.querySelectorAll('#dgRows button'), function(b){ var v = b.getAttribute('data-n'); b.setAttribute('aria-pressed', v === 'c' ? !preset : +v === st.n); });
  $('dgRowsC').hidden = preset; $('dgRowsCi').value = st.n;
  [].forEach.call(document.querySelectorAll('#dgGraph button'), function(b){ b.setAttribute('aria-pressed', b.getAttribute('data-g') === st.graph); });
  $('dgGraphNote').textContent = st.graph ? ' · 열 추천과 데이터 생성에 모두 반영됩니다' : '';
  [].forEach.call(document.querySelectorAll('#dgQ button'), function(b){ b.setAttribute('aria-pressed', !!st.q[b.getAttribute('data-k')]); });
  [].forEach.call(document.querySelectorAll('#dgPow button'), function(b){ b.setAttribute('aria-pressed', b.getAttribute('data-p') === st.pow); });
  $('dgSeed').value = st.seed;
  cols();
}
function cols(){
  $('dgCols').innerHTML = st.cols.length ? st.cols.map(function(c, i){
    return '<div class="dgcrow"><span class="dgci">' + (i + 1) + '</span><input type="text" maxlength="50" value="' + esc(c.n) + '" data-i="' + i + '" aria-label="컬럼 ' + (i + 1) + ' 이름" placeholder="컬럼명 입력">' +
      '<select data-i="' + i + '" aria-label="컬럼 ' + (i + 1) + ' 타입">' + Object.keys(TYPES).map(function(t){ return '<option value="' + t + '"' + (t === c.t ? ' selected' : '') + '>' + TYPES[t] + '</option>'; }).join('') + '</select>' +
      '<label class="dgtg" title="모델 연습용 정답 열"><input type="radio" name="dgTg" data-i="' + i + '"' + (c.n === st.tgt ? ' checked' : '') + '> 정답</label>' +
      '<button type="button" class="mini gh" data-del="' + i + '" aria-label="컬럼 ' + (i + 1) + ' 삭제">삭제</button></div>'; }).join('') :
    '<p class="dgempty">주제를 입력하고 <b>✦ 컬럼 추천</b>을 누르거나<br>아래 버튼으로 직접 추가하세요.</p>';
  $('dgColN').textContent = '열 ' + st.cols.length + ' / 최대 20개';
  var w = [], names = st.cols.map(function(c){ return c.n.trim(); });
  if(names.some(function(n){ return !n; })) w.push('⚠ 컬럼명이 비어 있는 항목이 있습니다.');
  var dup = names.filter(function(n, i){ return n && names.indexOf(n) !== i; }); if(dup.length) w.push('⚠ 중복 컬럼명: ' + esc(dup.join(', ')));
  if(st.cols.length && st.recTopic && st.topic !== st.recTopic) w.push('💡 주제가 변경됐어요. <b>✦ 컬럼 추천</b>을 다시 실행해 주제에 맞는 컬럼을 받아보세요.');
  if(st.recNote && st.topic === st.recTopic) w.push('ⓘ ' + esc(st.recNote));
  $('dgColWarn').innerHTML = w.map(function(x){ return '<p>' + x + '</p>'; }).join('');
}
function valid(){
  if(!st.topic.trim()) return '주제를 입력하세요.';
  if(st.topic.length > 100) return '주제는 100자 이하여야 합니다.';
  if(!st.cols.length) return '컬럼을 1개 이상 추가하세요.';
  if(st.cols.length > 20) return '열은 최대 20개입니다. 일부를 삭제해 주세요.';
  var n = st.cols.map(function(c){ return c.n.trim(); });
  if(n.some(function(x){ return !x; })) return '컬럼명을 모두 입력하세요.';
  if(n.some(function(x, i){ return n.indexOf(x) !== i; })) return '중복된 컬럼명을 수정하세요.';
  return '';
}

/* ── 생성 → 결과 ── */
function run(fromHist){
  var e = valid(); $('dgErr').textContent = e; if(e){ $('dgErr').scrollIntoView({ block:'center', behavior:'smooth' }); return; }
  st.cols.forEach(function(c){ c.n = c.n.trim(); });
  var bar = $('dgProg'), lab = $('dgProgL'); $('dgRun').disabled = true; $('dgProgBox').hidden = false; bar.style.width = '0%';
  var steps = [['생성 준비 중', 25], ['데이터 생성 중', 70], ['품질 옵션 적용 중', 90]], k = 0;
  (function tick(){ if(k < steps.length){ lab.textContent = steps[k][0]; bar.style.width = steps[k][1] + '%'; k++; setTimeout(tick, fromHist ? 0 : 180); return; }
    try{ generate(); }catch(err){ lab.textContent = '생성 실패 — ' + err.message; $('dgRun').disabled = false; return; }
    bar.style.width = '100%'; lab.textContent = '생성 완료 — 아래에서 파일을 다운로드하거나 통계를 확인하세요.'; $('dgRun').disabled = false;
    $('dgOut').hidden = false; draw(); hist(); if(!fromHist) $('dgOut').scrollIntoView({ behavior:'smooth', block:'start' }); })();
}
function vis(v){ return v === '' ? '<i class="dgna">빈칸</i>' : esc(v); }
function draw(){
  var L = last, names = L.cols.map(function(c){ return c.n; });
  var mark = new Map(); L.log.forEach(function(x){ if(x.k !== 'dup') mark.set(x.r._i + '|' + L.rows.indexOf(x.r) + '|' + x.c, x.k); });
  $('dgSum').innerHTML = '총 <b>' + L.rows.length.toLocaleString() + '행 × ' + names.length + '열</b> · ' + esc(st.topic === '*spiral' ? '소용돌이(Spiral)' : st.topic) + ' · 데이터 번호 ' + st.seed +
    (st.tgt ? ' · 정답 열 <code>' + esc(st.tgt) + '</code>' : '') + (L.notes.length ? '<br><small>' + L.notes.map(esc).join(' · ') + '</small>' : '');
  var show = L.rows.slice(0, prevN);
  $('dgTbl').innerHTML = '<tr><th>#</th>' + L.cols.map(function(c){ var u = c.p.a && c.p.a[5]; return '<th' + (c.n === st.tgt ? ' class="tg"' : '') + '>' + esc(c.n) + '<small>' + TYPES[c.t] + (u ? ' · ' + esc(u) : '') + '</small></th>'; }).join('') + '</tr>' +
    show.map(function(r, i){ return '<tr' + (r._dup && showMark ? ' class="dgdup"' : '') + '><td class="rn">' + (i + 1) + '</td>' + names.map(function(n){ var k = showMark ? mark.get(r._i + '|' + i + '|' + n) : null;
      return '<td' + (k ? ' class="dg-' + k + '"' : '') + '>' + vis(r[n]) + '</td>'; }).join('') + '</tr>'; }).join('');
  $('dgMore').textContent = prevN === 5 ? '15줄 보기' : '상위 5행만';
  /* 통계 */
  $('dgStat').innerHTML = '<tr><th>열</th><th>타입</th><th>평균</th><th>표준편차</th><th>최솟값</th><th>최댓값</th><th>결측</th><th>고유값</th></tr>' + L.cols.map(function(c){
    var v = L.rows.map(function(r){ return r[c.n]; }), miss = v.filter(function(x){ return x === ''; }).length, u = {}; v.forEach(function(x){ if(x !== '') u[x] = 1; });
    var nv = c.t === 'num' ? v.filter(function(x){ return x !== '' && !isNaN(+x); }).map(Number) : [], m = 0, s = 0, mn = '', mx = '';
    if(nv.length){ m = nv.reduce(function(a, b){ return a + b; }, 0) / nv.length; s = Math.sqrt(nv.reduce(function(a, b){ return a + (b - m) * (b - m); }, 0) / Math.max(1, nv.length - 1));
      mn = Math.min.apply(null, nv); mx = Math.max.apply(null, nv); }
    var f = function(x){ return x === '' ? '—' : (+(+x).toFixed(2)).toLocaleString(); };
    return '<tr><td><b>' + esc(c.n) + '</b></td><td>' + TYPES[c.t] + '</td><td>' + (nv.length ? f(m) : '—') + '</td><td>' + (nv.length ? f(s) : '—') + '</td><td>' + f(mn) + '</td><td>' + f(mx) + '</td><td' + (miss ? ' class="dgw"' : '') + '>' + miss + '</td><td>' + Object.keys(u).length + '</td></tr>'; }).join('');
  /* 찾아 고칠 것 */
  var on = Q.filter(function(q){ return st.q[q[0]] && q[0] !== 'noise'; });
  $('dgTodo').innerHTML = on.length ? '<b>이 데이터에서 찾아 고칠 것</b><ul>' + on.map(function(q){ return '<li><b>' + q[1] + '</b> — ' + q[2] + '</li>'; }).join('') + '</ul><p class="hint">info() · isnull().sum() · duplicated().sum() · describe() · unique() 로 찾고, 상자그림으로 이상치를 확인하세요.</p>' :
    '<b>깨끗한 데이터입니다</b><p class="hint">바로 그래프를 그리고 모델을 만들어 보세요. 정제 실습을 하려면 ② 데이터 품질 옵션을 켜세요.</p>';
  /* 선생님용 */
  var by = {}; L.log.forEach(function(x){ by[x.k] = (by[x.k] || 0) + 1; });
  $('dgRepSum').innerHTML = Q.filter(function(q){ return by[q[0]]; }).map(function(q){ return '<span class="dgchip dg-' + q[0] + '">' + q[1] + ' ' + by[q[0]] + '</span>'; }).join('') + (L.log.length ? '' : '<span class="dgchip">넣은 문제 없음</span>');
  $('dgRep').innerHTML = L.log.length ? '<tr><th>몇째 줄</th><th>열</th><th>문제</th><th>원래 값</th><th>바뀐 값</th></tr>' + L.log.slice().sort(function(a, b){ return L.rows.indexOf(a.r) - L.rows.indexOf(b.r); }).slice(0, 300).map(function(x){
    return '<tr><td>' + (L.rows.indexOf(x.r) + 1) + '</td><td>' + esc(x.c) + '</td><td><span class="dgchip dg-' + x.k + '">' + Q.filter(function(q){ return q[0] === x.k; })[0][1] + '</span></td><td>' + vis(x.a) + '</td><td>' + vis(x.b) + '</td></tr>'; }).join('') : '';
  /* 그래프 */
  if(!$('dgGt').getAttribute('data-set')) $('dgGt').value = st.graph || (L.cols.filter(function(c){ return c.t === 'num'; }).length >= 2 ? '산점도' : '막대그래프');
  axes(); plot(); $('dgCode').textContent = code();
}
function axes(){
  var L = last, g = $('dgGt').value, num = L.cols.filter(function(c){ return c.t === 'num' && c.p.k !== 'id'; }).map(function(c){ return c.n; }),
    cat = L.cols.filter(function(c){ return c.t === 'cat' || c.t === 'bool'; }).map(function(c){ return c.n; }), tim = L.cols.filter(function(c){ return /year|month|date/.test(c.p.k); }).map(function(c){ return c.n; });
  var X = g === '산점도' || g === '히스토그램' ? num : g === '꺾은선그래프' ? (tim.length ? tim : num) : cat.length ? cat : num, Y = g === '히스토그램' || g === '원그래프' ? [] : num;
  function fill(id, a, d){ var s = $(id), cur = a.indexOf(s.value) >= 0 ? s.value : d; s.innerHTML = a.map(function(x){ return '<option' + (x === cur ? ' selected' : '') + '>' + esc(x) + '</option>'; }).join(''); s.parentNode.hidden = !a.length; }
  var best = num.slice(0, 2);
  if(g === '산점도' && num.length > 2){ var bc = -1; for(var i = 0; i < num.length; i++) for(var j = i + 1; j < num.length; j++){ var r = Math.abs(corr(num[i], num[j])); if(r > bc){ bc = r; best = [num[i], num[j]]; } } }
  fill('dgX', X, g === '산점도' ? best[0] : X[0]); fill('dgY', Y, g === '산점도' ? best[1] : (st.tgt && Y.indexOf(st.tgt) >= 0 ? st.tgt : Y[0]));
}
function nums(c){ return last.rows.map(function(r){ var v = r[c]; return v === '' || isNaN(+v) ? null : +v; }); }
function corr(a, b){ var A = nums(a), B = nums(b), p = []; A.forEach(function(v, i){ if(v !== null && B[i] !== null) p.push([v, B[i]]); });
  var n = p.length, mx = 0, my = 0; p.forEach(function(q){ mx += q[0]; my += q[1]; }); mx /= n; my /= n;
  var s1 = 0, s2 = 0, s3 = 0; p.forEach(function(q){ s1 += (q[0] - mx) * (q[1] - my); s2 += (q[0] - mx) * (q[0] - mx); s3 += (q[1] - my) * (q[1] - my); }); return s1 / Math.sqrt(s2 * s3 || 1); }
var PAL = ['var(--blue)', 'var(--warm)', 'var(--good)', '#8b5cf6', '#db2777', '#0891b2', '#ca8a04', '#64748b'];
function plot(){
  var L = last, g = $('dgGt').value, x = $('dgX').value, y = $('dgY').value, W = 640, H = 300, P = 50, s = '', note = '';
  var ax = '<line x1="' + P + '" y1="' + (H - P) + '" x2="' + (W - 10) + '" y2="' + (H - P) + '" class="fax"/><line x1="' + P + '" y1="14" x2="' + P + '" y2="' + (H - P) + '" class="fax"/>';
  var f = function(v){ return (+(+v).toFixed(2)).toLocaleString(); };
  function catKey(v){ return v === '' ? '(빈칸)' : String(v); }
  if(g === '산점도' && x && y){
    var X = nums(x), Y = nums(y), p = []; X.forEach(function(v, i){ if(v !== null && Y[i] !== null) p.push([v, Y[i], L.rows[i][st.tgt]]); });
    var x0 = Math.min.apply(null, p.map(function(q){ return q[0]; })), x1 = Math.max.apply(null, p.map(function(q){ return q[0]; })), y0 = Math.min.apply(null, p.map(function(q){ return q[1]; })), y1 = Math.max.apply(null, p.map(function(q){ return q[1]; }));
    var tc = st.tgt && L.cols.filter(function(c){ return c.n === st.tgt && c.t !== 'num'; }).length, cm = {};
    s = ax + p.slice(0, 2000).map(function(q){ var col = 'var(--blue)'; if(tc){ var k = catKey(q[2]); if(!(k in cm)) cm[k] = Object.keys(cm).length; col = PAL[cm[k] % 8]; }
      return '<circle cx="' + (P + (q[0] - x0) / (x1 - x0 || 1) * (W - P - 20)).toFixed(1) + '" cy="' + (H - P - (q[1] - y0) / (y1 - y0 || 1) * (H - P - 24)).toFixed(1) + '" r="3.5" fill="' + col + '" fill-opacity=".65"/>'; }).join('') +
      lab(f(x0), f(x1), f(y0), f(y1), x, y);
    var r = corr(x, y); note = '상관계수 r = <b>' + r.toFixed(2) + '</b> — ' + (Math.abs(r) > 0.7 ? '강한' : Math.abs(r) > 0.4 ? '뚜렷한' : Math.abs(r) > 0.2 ? '약한' : '거의 없는') + (r >= 0 ? ' 양의' : ' 음의') + ' 관계' +
      (tc ? ' · 점 색 = ' + Object.keys(cm).map(function(k){ return '<b style="color:' + PAL[cm[k] % 8] + '">' + esc(k) + '</b>'; }).join(' · ') : '') + '. 혼자 멀리 떨어진 점은 이상치일 수 있어요.';
  } else if(g === '히스토그램' && x){
    var v = nums(x).filter(function(a){ return a !== null; }), a = Math.min.apply(null, v), b = Math.max.apply(null, v), B = 16, h = new Array(B).fill(0);
    v.forEach(function(q){ h[Math.min(B - 1, Math.floor((q - a) / (b - a || 1) * B))]++; }); var m = Math.max.apply(null, h), bw = (W - P - 20) / B;
    s = ax + h.map(function(c, i){ var hh = c / m * (H - P - 30); return '<rect x="' + (P + i * bw + 1).toFixed(1) + '" y="' + (H - P - hh).toFixed(1) + '" width="' + (bw - 2).toFixed(1) + '" height="' + hh.toFixed(1) + '" fill="var(--blue-l)"/>'; }).join('') +
      '<text x="' + P + '" y="' + (H - P + 18) + '" class="ft s">' + f(a) + '</text><text x="' + (W - 10) + '" y="' + (H - P + 18) + '" class="ft s" text-anchor="end">' + f(b) + '</text><text x="' + (W / 2) + '" y="' + (H - 8) + '" class="ft s c">' + esc(x) + '</text>';
    note = '봉우리가 하나인지, 한쪽으로 꼬리가 긴지 보세요. 외따로 선 막대는 이상치 · 단위 오류일 수 있어요.';
  } else if(g === '원그래프' && x){
    var u = {}; L.rows.forEach(function(r){ var k = catKey(r[x]); u[k] = (u[k] || 0) + 1; }); var ks = Object.keys(u).sort(function(p, q){ return u[q] - u[p]; }), tot = L.rows.length, ang = -Math.PI / 2, cx = 200, cy = 150, R0 = 115;
    s = ks.map(function(k, i){ var fr = u[k] / tot, a1 = ang + fr * 2 * Math.PI, big = fr > 0.5 ? 1 : 0, d = 'M' + cx + ',' + cy + ' L' + (cx + R0 * Math.cos(ang)).toFixed(1) + ',' + (cy + R0 * Math.sin(ang)).toFixed(1) +
      ' A' + R0 + ',' + R0 + ' 0 ' + big + ' 1 ' + (cx + R0 * Math.cos(a1)).toFixed(1) + ',' + (cy + R0 * Math.sin(a1)).toFixed(1) + ' Z'; ang = a1;
      return (ks.length === 1 ? '<circle cx="' + cx + '" cy="' + cy + '" r="' + R0 + '" fill="' + PAL[0] + '"/>' : '<path d="' + d + '" fill="' + PAL[i % 8] + '" fill-opacity=".85" stroke="var(--white)" stroke-width="2"/>') +
        (i < 9 ? '<rect x="360" y="' + (40 + i * 26) + '" width="14" height="14" rx="3" fill="' + PAL[i % 8] + '"/><text x="382" y="' + (52 + i * 26) + '" class="ft s">' + esc(k.slice(0, 12)) + ' ' + Math.round(fr * 100) + '% (' + u[k] + ')</text>' : ''); }).join('');
    note = '같은 뜻인데 조각이 따로 있으면(«남» · «남자» · «M») 오탈자입니다. 한 조각이 80%면 클래스 불균형!';
  } else if(x){
    var line = g === '꺾은선그래프', box = g === '상자그림', grpv = {}, order = [];
    L.rows.forEach(function(r){ var k = catKey(r[x]); if(line && L.cols.filter(function(c){ return c.n === x && c.p.k === 'date'; }).length) k = String(r[x]).slice(0, 7); if(!(k in grpv)){ grpv[k] = []; order.push(k); }
      var yv = y ? +r[y] : 1; if(!y || (r[y] !== '' && !isNaN(yv))) grpv[k].push(yv); });
    if(line) order.sort(function(p, q){ var a = +p, b = +q; return isNaN(a) || isNaN(b) ? (p < q ? -1 : 1) : a - b; }); else order.sort(function(p, q){ return grpv[q].length - grpv[p].length; });
    order = order.filter(function(k){ return k !== '(빈칸)' || !line; }).slice(0, line ? 40 : 12);
    var st2 = order.map(function(k){ var a = grpv[k].slice().sort(function(p, q){ return p - q; }), n = a.length, mean = n ? a.reduce(function(p, q){ return p + q; }, 0) / n : 0;
      var qf = function(t){ if(!n) return 0; var i = (n - 1) * t, lo = Math.floor(i); return a[lo] + (a[Math.min(n - 1, lo + 1)] - a[lo]) * (i - lo); };
      return { k:k, n:n, mean:y ? mean : n, q1:qf(.25), md:qf(.5), q3:qf(.75), lo:a[0], hi:a[n - 1] }; });
    var vals = box ? st2.reduce(function(p, q){ return p.concat([q.lo, q.hi]); }, []) : st2.map(function(q){ return q.mean; }), v0 = box ? Math.min.apply(null, vals) : Math.min(0, Math.min.apply(null, vals)), v1 = Math.max.apply(null, vals);
    var sy = function(v){ return H - P - (v - v0) / (v1 - v0 || 1) * (H - P - 30); }, bw2 = (W - P - 20) / Math.max(1, st2.length);
    s = ax + st2.map(function(q, i){ var cx2 = P + i * bw2 + bw2 / 2, t = '';
      if(box){ var iq = q.q3 - q.q1, wl = Math.max(q.lo, q.q1 - 1.5 * iq), wh = Math.min(q.hi, q.q3 + 1.5 * iq);
        t = '<line x1="' + cx2 + '" x2="' + cx2 + '" y1="' + sy(wl) + '" y2="' + sy(wh) + '" stroke="var(--ink2)"/><rect x="' + (cx2 - bw2 * 0.3) + '" y="' + sy(q.q3) + '" width="' + bw2 * 0.6 + '" height="' + Math.max(1, sy(q.q1) - sy(q.q3)) + '" fill="var(--blue-xl)" stroke="var(--blue-d)" stroke-width="1.5"/>' +
          '<line x1="' + (cx2 - bw2 * 0.3) + '" x2="' + (cx2 + bw2 * 0.3) + '" y1="' + sy(q.md) + '" y2="' + sy(q.md) + '" stroke="var(--warm)" stroke-width="3"/>' +
          (q.lo < wl ? '<circle cx="' + cx2 + '" cy="' + sy(q.lo) + '" r="3.5" fill="var(--warm)"/>' : '') + (q.hi > wh ? '<circle cx="' + cx2 + '" cy="' + sy(q.hi) + '" r="3.5" fill="var(--warm)"/>' : ''); }
      else if(!line){ var hh = H - P - sy(q.mean); t = '<rect x="' + (cx2 - bw2 * 0.34) + '" y="' + sy(q.mean) + '" width="' + bw2 * 0.68 + '" height="' + Math.max(0, hh) + '" fill="' + PAL[i % 8] + '" fill-opacity=".8"/><text x="' + cx2 + '" y="' + (sy(q.mean) - 5) + '" class="ft s c">' + f(q.mean) + '</text>'; }
      return t + (line && st2.length > 12 && i % Math.ceil(st2.length / 10) ? '' : '<text x="' + cx2 + '" y="' + (H - P + 16) + '" class="ft s c">' + esc(q.k.slice(0, 7)) + '</text>'); }).join('');
    if(line) s += '<polyline fill="none" stroke="var(--blue)" stroke-width="3" points="' + st2.map(function(q, i){ return (P + i * bw2 + bw2 / 2).toFixed(1) + ',' + sy(q.mean).toFixed(1); }).join(' ') + '"/>' +
      st2.map(function(q, i){ return '<circle cx="' + (P + i * bw2 + bw2 / 2).toFixed(1) + '" cy="' + sy(q.mean).toFixed(1) + '" r="3.5" fill="var(--blue)"/>'; }).join('');
    s += '<text x="' + (P - 6) + '" y="' + (H - P) + '" class="ft s" text-anchor="end">' + f(v0) + '</text><text x="' + (P - 6) + '" y="36" class="ft s" text-anchor="end">' + f(v1) + '</text>' +
      '<text x="' + (P + 6) + '" y="22" class="ft s">↑ ' + (y ? esc(y) + (box ? '' : ' 평균') : '개수') + '</text>';
    note = line ? '«' + esc(x) + '»에 따라 ' + (y ? esc(y) + ' 평균' : '개수') + '이 어떻게 바뀌는지 — 오르내림의 방향을 문장으로 써 보세요.' :
      box ? '가운데 굵은 선이 중앙값, 상자가 가운데 50%, 주황 점이 이상치(1.5 × IQR 밖)입니다.' : '범주끼리 막대 높이를 견주어 보세요. 같은 뜻인데 막대가 따로 있다면 오탈자입니다.';
  }
  $('dgPlot').innerHTML = s; $('dgPlotNote').innerHTML = note;
  function lab(a, b, c, d, xn, yn){ return '<text x="' + P + '" y="' + (H - P + 18) + '" class="ft s">' + a + '</text><text x="' + (W - 20) + '" y="' + (H - P + 18) + '" class="ft s" text-anchor="end">' + b + '</text>' +
    '<text x="' + (P - 6) + '" y="' + (H - P) + '" class="ft s" text-anchor="end">' + c + '</text><text x="' + (P - 6) + '" y="26" class="ft s" text-anchor="end">' + d + '</text>' +
    '<text x="' + (W - 12) + '" y="' + (H - 10) + '" class="ft s" text-anchor="end">' + esc(xn) + ' →</text><text x="' + (P + 6) + '" y="20" class="ft s">↑ ' + esc(yn) + '</text>'; }
}

/* ── 내려받기 · 복사 · 코드 ── */
function fname(ext, clean){ var t = (st.topic === '*spiral' ? 'spiral' : st.topic).replace(/[\\/:*?"<>|#]/g, '').replace(/\s+/g, '_').slice(0, 30) || 'dataset';
  return t + '_' + last.rows.length + '행' + (clean ? '_정답' : '') + '.' + ext; }
function table(rows){ var n = last.cols.map(function(c){ return c.n; }); return [n].concat(rows.map(function(r){ return n.map(function(k){ return r[k] === undefined ? '' : r[k]; }); })); }
function csvText(rows){ return '﻿' + table(rows).map(function(r){ return r.map(function(v){ v = String(v); return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; }).join(','); }).join('\n') + '\n'; }
function save(blob, name){ var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); }, 800); }
function dlCSV(clean){ save(new Blob([csvText(clean ? last.clean : last.rows)], { type:'text/csv;charset=utf-8' }), fname('csv', clean)); }
function dlJSON(){ var n = last.cols.map(function(c){ return c.n; }); save(new Blob([JSON.stringify(last.rows.map(function(r){ var o = {}; n.forEach(function(k){ var v = r[k]; o[k] = v === '' ? null : v; }); return o; }), null, 1)], { type:'application/json' }), fname('json')); }
function dlXLSX(btn){
  function go(){ var ws = XLSX.utils.aoa_to_sheet(table(last.rows)), wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, 'data'); XLSX.writeFile(wb, fname('xlsx')); }
  if(window.XLSX) return go();
  btn.textContent = '불러오는 중…'; var s = document.createElement('script'); s.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
  s.onload = function(){ btn.textContent = '⬇ Excel'; go(); }; s.onerror = function(){ btn.textContent = '⬇ Excel'; alert('엑셀 도구를 불러오지 못했습니다. CSV를 받아 엑셀에서 여세요.'); }; document.head.appendChild(s);
}
function copy(t, btn, ok){ function done(){ var o = btn.textContent; btn.textContent = ok; setTimeout(function(){ btn.textContent = o; }, 1500); }
  if(navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(done, function(){ prompt('복사하세요', t); }); else prompt('복사하세요', t); }
function code(){
  var f = fname('csv'), num = last.cols.filter(function(c){ return c.t === 'num' && c.p.k !== 'id' && c.n !== st.tgt; }).map(function(c){ return "'" + c.n + "'"; }), tc = last.cols.filter(function(c){ return c.n === st.tgt; })[0];
  var s = "# ① 파일 올리기 — 방금 받은 " + f + " 를 고릅니다\nfrom google.colab import files\nfiles.upload()\n\nimport pandas as pd\ndf = pd.read_csv('" + f + "')\n\n" +
    "# ② 점검 — 무엇이 문제인지 먼저 찾기\ndf.info()                      # 자료형 · 빈칸 수\nprint(df.isnull().sum())       # 결측치\nprint(df.duplicated().sum())   # 중복 행\ndf.describe()                  # 최소 · 최대로 이상치 · 단위 오류 의심\n" +
    "for c in df.select_dtypes('object'):\n    print(c, df[c].unique()[:12])   # 오탈자 · 표기 불일치\n";
  if(!num.length) return s;
  if(tc && tc.t === 'num') s += "\n# ③ 정리한 뒤 예측 모델\ndf = df.drop_duplicates().dropna()\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.model_selection import train_test_split\nx = df[[" + num.join(', ') + "]]\ny = df['" + tc.n + "']\nx_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=0)\nmodel = LinearRegression().fit(x_train, y_train)\nprint('R² =', model.score(x_test, y_test))\n";
  else if(tc) s += "\n# ③ 정리한 뒤 분류 모델\ndf = df.drop_duplicates().dropna()\nfrom sklearn.tree import DecisionTreeClassifier\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import classification_report\nx = df[[" + num.join(', ') + "]]\ny = df['" + tc.n + "']\nprint(y.value_counts())        # 불균형인지 먼저\nx_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=0)\nmodel = DecisionTreeClassifier(max_depth=4, random_state=0).fit(x_train, y_train)\nprint(classification_report(y_test, model.predict(x_test)))\n";
  else s += "\n# ③ 정답 열이 없으면 — 군집\ndf = df.drop_duplicates().dropna()\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.cluster import KMeans\nx = StandardScaler().fit_transform(df[[" + num.join(', ') + "]])\nfor k in range(2, 7):\n    print(k, KMeans(n_clusters=k, n_init=10, random_state=0).fit(x).inertia_)   # 엘보\n";
  return s;
}

/* ── 이력 · 공유 링크 ── */
function snap(){ return { grade:st.grade, topic:st.topic, req:st.req, cx:st.cx, cxN:st.cxN, n:st.n, graph:st.graph, q:st.q, pow:st.pow, cols:st.cols, tgt:st.tgt, seed:st.seed }; }
function hist(){ var h = lsGet('ai_dg_hist') || [], s = snap(), key = JSON.stringify(s); h = h.filter(function(x){ return JSON.stringify(x.s) !== key; });
  h.unshift({ s:s, t:Date.now(), rc:last.rows.length }); lsSet('ai_dg_hist', h.slice(0, 8)); drawHist(); }
function drawHist(){ var h = lsGet('ai_dg_hist') || [];
  $('dgHist').innerHTML = h.length ? h.map(function(x, i){ var d = new Date(x.t);
    return '<button type="button" data-h="' + i + '"><b>' + esc(x.s.topic === '*spiral' ? '소용돌이(Spiral)' : x.s.topic) + '</b><span>' + x.rc + '행×' + x.s.cols.length + '열 · ' + (d.getMonth() + 1) + '/' + d.getDate() + ' ' + d.getHours() + ':' + ('0' + d.getMinutes()).slice(-2) + '</span></button>'; }).join('') :
    '<p class="hint">아직 만든 데이터가 없습니다.</p>'; }
function enc(){ var j = JSON.stringify(snap()); return 's=' + btoa(unescape(encodeURIComponent(j))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); }
function dec(){ var h = location.hash.slice(1); if(h.indexOf('s=') !== 0) return false;
  try{ var b = h.slice(2).replace(/-/g, '+').replace(/_/g, '/'); var o = JSON.parse(decodeURIComponent(escape(atob(b)))); for(var k in DEF) if(k in o) st[k] = o[k]; return true; }catch(e){ return false; } }
function load(s){ st = JSON.parse(JSON.stringify(DEF)); for(var k in s) st[k] = JSON.parse(JSON.stringify(s[k])); st.recTopic = st.topic; ui(); }

/* ── 주제 추천 · 연관 키워드 ── */
function suggest(){ var a = DG_TOP.filter(function(t){ return t[1].indexOf(st.grade) >= 0; }).slice(); for(var i = a.length - 1; i > 0; i--){ var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; }
  $('dgSug').innerHTML = '<b>✦ 추천 주제</b>' + a.slice(0, 8).map(function(t){ return '<button type="button" data-t="' + esc(t[0]) + '"><i>' + t[2] + '</i>' + esc(t[0]) + '</button>'; }).join(''); $('dgSug').hidden = false; }
function showRel(){ var r = related(); $('dgRel').innerHTML = r.length ? '<b>🔗 연관 키워드</b>' + r.map(function(t){ return '<button type="button" data-t="' + esc(t) + '">' + esc(t) + '</button>'; }).join('') +
  '<small>누르면 그 주제로 바꾸고 컬럼을 추천받습니다</small>' : ''; $('dgRel').hidden = !r.length; }
function setTopic(t){ st.topic = t.slice(0, 100); recommend(); ui(); showRel(); }

/* ── 템플릿 ── */
$('dgTpls').innerHTML = DG_TPL.map(function(t, i){ return '<button type="button" data-i="' + i + '"><i>' + t[1] + '</i><b>' + t[0] + '</b><span>' + t[2] + '</span><em>' + { e:'초등', m:'중등', h:'고등' }[t[4]] + ' · ' + t[5] + '행' + (t[3] === '*spiral' ? ' · 3열' : '') + '</em></button>'; }).join('');
$('dgTpls').addEventListener('click', function(e){ var b = e.target.closest('button[data-i]'); if(!b) return; var t = DG_TPL[+b.getAttribute('data-i')];
  st = JSON.parse(JSON.stringify(DEF)); st.grade = t[4]; st.topic = t[3]; st.n = t[5]; st.graph = t[6];
  var top = DG_TOP.filter(function(x){ return x[0] === t[3]; })[0], nc = top ? top[4].length : 3; st.cx = nc <= 3 ? 's' : nc <= 6 ? 'm' : 'l'; t[7].forEach(function(k){ st.q[k] = true; });
  if(top){ st.cols = top[4].map(col); st.tgt = top[5]; st.recTopic = st.topic; st.recNote = '템플릿 «' + t[0] + '»'; } else recommend();
  ui(); showRel(); $('dgTplBox').open = false; run(); });

/* ── 조작 ── */
$('dgGrade').addEventListener('click', function(e){ var b = e.target.closest('button[data-g]'); if(!b) return; st.grade = b.getAttribute('data-g'); ui(); });
$('dgTopic').addEventListener('input', function(){ st.topic = this.value.slice(0, 100); $('dgTopicN').textContent = st.topic.length; cols(); });
$('dgTopic').addEventListener('keydown', function(e){ if(e.key === 'Enter'){ e.preventDefault(); if(!st.topic.trim()){ $('dgErr').textContent = '주제를 입력하세요.'; return; } $('dgErr').textContent = ''; recommend(); ui(); showRel(); } });
$('dgSugBtn').addEventListener('click', suggest);
$('dgChips').innerHTML = CHIPS.map(function(c){ return '<button type="button" data-t="' + c + '">' + c + '</button>'; }).join('');
['dgChips', 'dgSug', 'dgRel'].forEach(function(id){ $(id).addEventListener('click', function(e){ var b = e.target.closest('button[data-t]'); if(!b) return; setTopic(b.getAttribute('data-t')); }); });
$('dgReq').addEventListener('input', function(){ st.req = this.value.slice(0, 500); $('dgReqN').textContent = st.req.length; });
$('dgCx').addEventListener('click', function(e){ var b = e.target.closest('button[data-c]'); if(!b) return; st.cx = b.getAttribute('data-c'); ui(); });
$('dgCxNi').addEventListener('change', function(){ st.cxN = clip(Math.round(+this.value) || 5, 1, 20); this.value = st.cxN; });
$('dgRows').addEventListener('click', function(e){ var b = e.target.closest('button[data-n]'); if(!b) return; var v = b.getAttribute('data-n');
  if(v === 'c'){ $('dgRowsC').hidden = false; [].forEach.call(this.querySelectorAll('button'), function(x){ x.setAttribute('aria-pressed', x === b); }); $('dgRowsCi').focus(); return; } st.n = +v; ui(); });
$('dgRowsCi').addEventListener('change', function(){ st.n = clip(Math.round(+this.value) || 100, 10, 5000); this.value = st.n; });
$('dgGraph').innerHTML = GRAPHS.map(function(g){ return '<button type="button" data-g="' + g[0] + '" title="' + g[1] + '"><b>' + g[0].replace('그래프', '') + '</b><span>' + g[1] + '</span></button>'; }).join('');
$('dgGraph').addEventListener('click', function(e){ var b = e.target.closest('button[data-g]'); if(!b) return; var g = b.getAttribute('data-g'); st.graph = st.graph === g ? '' : g; ui(); });
$('dgQ').innerHTML = Q.map(function(q){ return '<button type="button" data-k="' + q[0] + '"><b>' + q[1] + '</b><span>' + q[2] + '</span></button>'; }).join('');
$('dgQ').addEventListener('click', function(e){ var b = e.target.closest('button[data-k]'); if(!b) return; var k = b.getAttribute('data-k'); st.q[k] = !st.q[k]; ui(); });
$('dgPow').addEventListener('click', function(e){ var b = e.target.closest('button[data-p]'); if(!b) return; st.pow = b.getAttribute('data-p'); ui(); });
$('dgRec').addEventListener('click', function(){ if(!st.topic.trim()){ $('dgErr').textContent = '주제를 입력하세요.'; $('dgTopic').focus(); return; } $('dgErr').textContent = ''; recommend(); ui(); showRel(); });
$('dgAdd').addEventListener('click', function(){ if(st.cols.length >= 20){ $('dgErr').textContent = '열은 최대 20개입니다.'; return; } st.cols.push({ n:'', t:'num' }); cols(); var ins = $('dgCols').querySelectorAll('input[type=text]'); ins[ins.length - 1].focus(); });
$('dgCols').addEventListener('input', function(e){ var i = +e.target.getAttribute('data-i'); if(isNaN(i)) return;
  if(e.target.type === 'text'){ var old = st.cols[i].n; st.cols[i].n = e.target.value; if(st.tgt === old) st.tgt = e.target.value; var p = e.target.selectionStart; cols(); var el = $('dgCols').querySelector('input[type=text][data-i="' + i + '"]'); el.focus(); el.setSelectionRange(p, p); }
  else if(e.target.tagName === 'SELECT'){ st.cols[i].t = e.target.value; cols(); }
  else if(e.target.type === 'radio'){ st.tgt = st.cols[i].n; } });
$('dgCols').addEventListener('click', function(e){ var b = e.target.closest('button[data-del]'); if(!b) return; var i = +b.getAttribute('data-del'); if(st.cols[i].n === st.tgt) st.tgt = ''; st.cols.splice(i, 1); cols(); });
$('dgSeed').addEventListener('change', function(){ st.seed = clip(Math.round(+this.value) || 1, 1, 99999); this.value = st.seed; });
$('dgDice').addEventListener('click', function(){ st.seed = 1 + Math.floor(Math.random() * 99999); $('dgSeed').value = st.seed; });
$('dgRun').addEventListener('click', function(){ run(); });
$('dgReset').addEventListener('click', function(){ if(!confirm('입력과 생성 결과를 모두 지울까요? (최근 생성 이력은 남습니다)')) return; st = JSON.parse(JSON.stringify(DEF)); last = null; ui(); $('dgOut').hidden = true; $('dgProgBox').hidden = true; $('dgRel').hidden = true; $('dgSug').hidden = true; $('dgErr').textContent = ''; history.replaceState(null, '', location.pathname + location.search); });
$('dgMore').addEventListener('click', function(){ prevN = prevN === 5 ? 15 : 5; draw(); });
$('dgClip').addEventListener('click', function(){ var t = table(last.rows.slice(0, prevN)).map(function(r){ return r.join('\t'); }).join('\n'); copy(t, this, '✓ 복사됨'); });
$('dgMark').addEventListener('click', function(){ showMark = !showMark; this.setAttribute('aria-pressed', showMark); this.textContent = showMark ? '숨긴 문제 색칠 끄기(학생용 화면)' : '숨긴 문제 색칠 켜기(선생님용)'; draw(); });
$('dgGt').innerHTML = GRAPHS.map(function(g){ return '<option>' + g[0] + '</option>'; }).join('');
$('dgGt').addEventListener('change', function(){ this.setAttribute('data-set', 1); axes(); plot(); });
$('dgX').addEventListener('change', plot); $('dgY').addEventListener('change', plot);
$('dgCsv').addEventListener('click', function(){ dlCSV(false); }); $('dgCsvC').addEventListener('click', function(){ dlCSV(true); });
$('dgJson').addEventListener('click', dlJSON); $('dgXlsx').addEventListener('click', function(){ dlXLSX(this); });
$('dgLink').addEventListener('click', function(){ copy(location.href.split('#')[0] + '#' + enc(), this, '링크를 복사했어요 ✓'); });
$('dgCopy').addEventListener('click', function(){ copy($('dgCode').textContent, this, '복사했어요 ✓'); });
$('dgHist').addEventListener('click', function(e){ var b = e.target.closest('button[data-h]'); if(!b) return; var h = (lsGet('ai_dg_hist') || [])[+b.getAttribute('data-h')]; if(!h) return; load(h.s); run(true); });
drawHist();
if(dec()){ st.recTopic = st.topic; ui(); run(true); } else ui();
})();
</script>
