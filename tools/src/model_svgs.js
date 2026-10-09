/* 모델 그림 26종 — 원리를 한눈에(움직이는 SVG). window.MODEL_SVG[id] = '<svg…>' · 색은 .mv 아래 CSS 클래스 */
(function(){
var A = function(body, cap){ return '<svg class="mv" viewBox="0 0 240 150" role="img" aria-label="' + cap + '">' + body + '</svg>'; };
function pts(list, cls, r){ return list.map(function(p){ return '<circle class="' + cls + '" cx="' + p[0] + '" cy="' + p[1] + '" r="' + (r || 5) + '"/>'; }).join(''); }
var BL = [[40,40],[55,62],[35,75],[70,45],[60,85],[45,100]], OR = [[150,60],[175,45],[165,85],[190,75],[200,105],[180,115]];
var S = {};

S.linreg = A('<line class="ax" x1="20" y1="135" x2="230" y2="135"/><line class="ax" x1="20" y1="135" x2="20" y2="10"/>' +
  pts([[40,118],[65,104],[90,98],[115,80],[140,74],[165,58],[190,46],[215,30]], 'a') +
  '<g class="res"><line x1="65" y1="104" x2="65" y2="108"/><line x1="90" y1="98" x2="90" y2="94"/><line x1="140" y1="74" x2="140" y2="73"/><line x1="190" y1="46" x2="190" y2="49"/></g>' +
  '<line class="fitl" x1="25" y1="125" x2="230" y2="30"><animate attributeName="y1" values="70;140;125" dur="3s" repeatCount="indefinite"/><animate attributeName="y2" values="70;10;30" dur="3s" repeatCount="indefinite"/></line>' +
  '<text class="t" x="28" y="20">오차가 가장 작은 직선을 찾는 중…</text>', '선형 회귀: 점들 사이를 지나는 직선');

S.poly = A('<line class="ax" x1="20" y1="135" x2="230" y2="135"/>' + pts([[30,110],[55,70],[80,50],[105,48],[130,62],[155,88],[180,100],[205,90],[225,60]], 'a') +
  '<path class="fitl draw" d="M25,120 C60,30 120,30 150,85 S210,110 228,55"/><text class="t" x="28" y="20">x², x³ 을 더해 곡선으로</text>', '다항 회귀: 휘어진 곡선');

S.ridge = A('<text class="t" x="18" y="18">가중치(막대)가 너무 커지지 않게 벌점</text>' +
  [0,1,2,3,4,5].map(function(i){ var h = [70,20,95,40,60,30][i], h2 = [38,14,45,24,32,18][i], x = 30 + i * 33;
    return '<rect class="bar" x="' + x + '" width="20" y="' + (130 - h) + '" height="' + h + '"><animate attributeName="height" values="' + h + ';' + h2 + ';' + h + '" dur="3.4s" repeatCount="indefinite"/><animate attributeName="y" values="' + (130 - h) + ';' + (130 - h2) + ';' + (130 - h) + '" dur="3.4s" repeatCount="indefinite"/></rect>'; }).join('') +
  '<line class="ax" x1="20" y1="130" x2="230" y2="130"/><text class="t s" x="150" y="146">alpha ↑ → 막대 ↓</text>', '릿지·라쏘: 가중치를 줄이는 규제');

S.logreg = A('<line class="ax" x1="20" y1="125" x2="230" y2="125"/><line class="half" x1="20" y1="75" x2="230" y2="75"/><text class="t s" x="200" y="71">50%</text>' +
  pts([[40,25],[60,25],[100,25]], 'g', 6) + pts([[120,125],[160,125]], 'b', 6) +
  '<path class="fitl" d="M20,27 C80,27 95,30 110,75 S150,123 230,124"/>' +
  '<circle class="mov" r="7"><animateMotion dur="4s" repeatCount="indefinite" path="M20,27 C80,27 95,30 110,75 S150,123 230,124"/></circle>' +
  '<text class="t s" x="30" y="145">골대 가까이 → 슛 성공 확률 높음 🏀</text>', '로지스틱 회귀: S자 확률 곡선');

S.knn = A(pts(BL, 'a') + pts(OR, 'b') + pts([[108,72],[125,58],[92,92]], 'b') +
  '<circle class="ring" cx="112" cy="76" r="10"><animate attributeName="r" values="6;34;34;6" dur="4s" repeatCount="indefinite"/></circle>' +
  '<path class="star" d="M112,66 l3,7 7,1 -5,5 1,7 -6,-3 -6,3 1,-7 -5,-5 7,-1z"/><text class="t" x="18" y="140">새 점 ★ 주변 k=3개의 다수결 → 주황</text>', 'k-최근접 이웃: 가까운 k개의 다수결');

S.tree = A('<rect class="nd" x="85" y="8" width="70" height="24" rx="6"/><text class="t c" x="120" y="24">소득 높음?</text>' +
  '<line class="br" x1="100" y1="32" x2="60" y2="58"/><line class="br" x1="140" y1="32" x2="180" y2="58"/><text class="t s" x="66" y="48">아니요</text><text class="t s" x="160" y="48">예</text>' +
  '<rect class="nd" x="25" y="58" width="70" height="24" rx="6"/><text class="t c" x="60" y="74">직장인?</text>' +
  '<rect class="lf g" x="148" y="58" width="64" height="24" rx="6"><animate attributeName="opacity" values="0;1;1" dur="3s" repeatCount="indefinite"/></rect><text class="t c w" x="180" y="74">승인</text>' +
  '<line class="br" x1="45" y1="82" x2="30" y2="108"/><line class="br" x1="75" y1="82" x2="95" y2="108"/>' +
  '<rect class="lf b" x="5" y="108" width="54" height="24" rx="6"/><text class="t c w" x="32" y="124">거절</text><rect class="lf b" x="70" y="108" width="54" height="24" rx="6"/><text class="t c w" x="97" y="124">거절</text>' +
  '<circle class="mov" r="6"><animateMotion dur="3s" repeatCount="indefinite" path="M120,20 L180,70"/></circle>', '의사결정트리: 예/아니요 질문');

S.rf = A([0,1,2].map(function(i){ var x = 18 + i * 72, c = i === 1 ? 'b' : 'a';
    return '<g transform="translate(' + x + ',10)"><circle class="tn" cx="28" cy="10" r="8"/><line class="br" x1="28" y1="18" x2="14" y2="36"/><line class="br" x1="28" y1="18" x2="42" y2="36"/><circle class="tn" cx="14" cy="40" r="7"/><circle class="tn" cx="42" cy="40" r="7"/><rect class="vote ' + c + '" x="12" y="60" width="32" height="18" rx="5"><animate attributeName="opacity" values="0;1" dur="1s" begin="' + i * 0.5 + 's" fill="freeze"/></rect><text class="t c w" x="28" y="73">' + (c === 'a' ? 'A' : 'B') + '</text></g>'; }).join('') +
  '<path class="br" d="M46,92 L120,112 M118,92 L120,112 M190,92 L120,112"/><rect class="vote a" x="88" y="112" width="64" height="26" rx="8"/><text class="t c w" x="120" y="130">다수결 A</text>', '랜덤 포레스트: 여러 트리의 다수결');

S.gb = A('<text class="t" x="16" y="18">틀린 만큼(잔차)을 다음 트리가 고친다</text>' +
  [0,1,2,3].map(function(i){ var x = 22 + i * 54, h = [80,48,26,12][i];
    return '<rect class="bar" x="' + x + '" y="' + (128 - h) + '" width="30" height="' + h + '"><animate attributeName="opacity" values="0.2;1" dur="0.8s" begin="' + i * 0.6 + 's" fill="freeze"/></rect><text class="t s c" x="' + (x + 15) + '" y="144">트리' + (i + 1) + '</text>' +
      (i < 3 ? '<text class="t c" x="' + (x + 42) + '" y="90">→</text>' : ''); }).join('') + '<text class="t s" x="160" y="40">오차 ↓</text>', '그레이디언트 부스팅: 잔차를 줄여 감');

S.svm = A('<polygon class="band" points="95,10 150,10 145,140 90,140"/><line class="fitl" x1="122" y1="10" x2="118" y2="140"/>' +
  '<line class="mg" x1="95" y1="10" x2="90" y2="140"/><line class="mg" x1="150" y1="10" x2="145" y2="140"/>' + pts(BL, 'a') + pts(OR, 'b') +
  '<circle class="sv" cx="88" cy="70" r="9"/><circle class="sv" cx="150" cy="60" r="9"/>' + pts([[88,70]], 'a') + pts([[150,60]], 'b') +
  '<text class="t s" x="96" y="148">여백(마진)이 가장 넓게</text>', 'SVM: 가장 넓은 여백의 경계');

S.nb = A('<line class="ax" x1="10" y1="120" x2="230" y2="120"/>' +
  '<path class="bell a" d="M10,120 C50,120 60,30 85,30 S120,120 160,120"/><path class="bell b" d="M80,120 C120,120 130,45 155,45 S190,120 230,120"/>' +
  '<line class="half" x1="140" y1="20" x2="140" y2="120"><animate attributeName="x1" values="60;180;60" dur="5s" repeatCount="indefinite"/><animate attributeName="x2" values="60;180;60" dur="5s" repeatCount="indefinite"/></line>' +
  '<text class="t s" x="14" y="140">«무료» 단어 확률 × «당첨» 확률 × … → 더 큰 쪽</text>', '나이브 베이즈: 확률을 곱해 비교');

S.kmeans = A(pts([[40,40],[55,55],[35,65],[60,35],[48,48]], 'g0') + pts([[170,40],[190,55],[180,30],[200,45]], 'g1') + pts([[100,110],[120,120],[90,125],[115,100],[130,112]], 'g2') +
  '<g class="cen"><path d="M-7,0 L7,0 M0,-7 L0,7"/><animateTransform attributeName="transform" type="translate" values="120,40;55,48;48,48;48,48" dur="4s" repeatCount="indefinite"/></g>' +
  '<g class="cen"><path d="M-7,0 L7,0 M0,-7 L0,7"/><animateTransform attributeName="transform" type="translate" values="60,110;170,60;185,43;185,43" dur="4s" repeatCount="indefinite"/></g>' +
  '<g class="cen"><path d="M-7,0 L7,0 M0,-7 L0,7"/><animateTransform attributeName="transform" type="translate" values="200,120;140,110;111,113;111,113" dur="4s" repeatCount="indefinite"/></g>' +
  '<text class="t s" x="16" y="145">✚ 중심이 무리의 평균으로 이동 → 멈춤</text>', 'k-평균: 중심이 이동하며 묶음');

S.hier = A(pts([[30,125],[55,125],[85,125],[110,125],[150,125],[175,125],[205,125]], 'a', 4) +
  '<path class="den draw" d="M30,125 V100 H55 V125 M42,100 V75 H85 V125 M150,125 V105 H175 V125 M162,105 V80 H205 V125 M64,75 V50 H110 V125 M87,50 V25 H183 V80"/>' +
  '<line class="half" x1="10" y1="62" x2="230" y2="62"/><text class="t s" x="150" y="58">여기서 자르면 2무리</text>', '계층적 군집: 덴드로그램');

S.dbscan = A(pts([[40,50],[50,60],[45,40],[60,48],[55,70],[38,65]], 'g0') + pts([[150,90],[165,100],[160,80],[175,92],[150,108],[180,110]], 'g1') +
  '<circle class="eps" cx="50" cy="55" r="20"/><circle class="eps" cx="165" cy="95" r="20"/>' + pts([[110,30],[205,30],[100,130]], 'nz') +
  '<text class="t s" x="108" y="22">잡음</text><text class="t s" x="16" y="145">반경 안이 빽빽하면 한 무리, 외톨이는 잡음</text>', 'DBSCAN: 밀도로 묶기');

S.pca = A(pts([[40,110],[60,98],[75,92],[95,80],[110,74],[130,62],[150,55],[170,42],[190,35],[70,85],[120,70],[160,52]], 'a', 4) +
  '<g><line class="pc" x1="30" y1="118" x2="205" y2="28"/><animateTransform attributeName="transform" type="rotate" values="-30 118 73;0 118 73;0 118 73" dur="4s" repeatCount="indefinite"/></g>' +
  '<text class="t" x="150" y="130">PC1 = 가장 넓게</text><text class="t" x="150" y="146">퍼진 방향</text>', '주성분 분석: 퍼진 방향으로 축 찾기');

S.assoc = A('<rect class="nd" x="15" y="45" width="60" height="30" rx="8"/><text class="t c" x="45" y="65">🍜 라면</text>' +
  '<rect class="nd" x="165" y="20" width="60" height="30" rx="8"/><text class="t c" x="195" y="40">💧 생수</text><rect class="nd" x="165" y="80" width="60" height="30" rx="8"/><text class="t c" x="195" y="100">🥤 콜라</text>' +
  '<path class="arw draw" d="M77,55 L162,36"/><path class="arw draw" d="M77,65 L162,92"/><text class="t s" x="95" y="38">신뢰도 70%</text><text class="t s" x="95" y="100">신뢰도 45%</text>' +
  '<text class="t s" x="16" y="140">«라면을 사면 생수도» 같은 규칙 찾기</text>', '연관 규칙: 함께 사는 상품');

S.cf = A(['', '라면', '콜라', '생수'].map(function(h, j){ return '<text class="t c" x="' + (60 + j * 45) + '" y="22">' + h + '</text>'; }).join('') +
  '<text class="t" x="20" y="50">A</text><text class="t" x="20" y="82">B</text>' +
  [[1,1,1],[1,1,0]].map(function(r, i){ return r.map(function(v, j){ var x = 90 + j * 45, y = 36 + i * 32;
    return '<rect class="cell' + (v ? ' on' : '') + '" x="' + x + '" y="' + y + '" width="34" height="24" rx="5"/>' + (v ? '<text class="t c w" x="' + (x + 17) + '" y="' + (y + 17) + '">✓</text>' : '<text class="t c" x="' + (x + 17) + '" y="' + (y + 17) + '">?</text>'); }).join(''); }).join('') +
  '<rect class="cell rec" x="180" y="68" width="34" height="24" rx="5"><animate attributeName="opacity" values="0.2;1;0.2" dur="2s" repeatCount="indefinite"/></rect><text class="t c" x="197" y="85">★</text>' +
  '<text class="t s" x="16" y="125">A와 B는 취향이 비슷 → B에게 생수 추천</text>', '협업 필터링: 비슷한 사람의 선택');

S.perceptron = A('<circle class="tn" cx="30" cy="40" r="12"/><text class="t c" x="30" y="44">x₁</text><circle class="tn" cx="30" cy="105" r="12"/><text class="t c" x="30" y="109">x₂</text>' +
  '<line class="wt" x1="42" y1="42" x2="108" y2="70"/><line class="wt" x1="42" y1="103" x2="108" y2="78"/><text class="t s" x="60" y="48">w₁</text><text class="t s" x="60" y="104">w₂</text>' +
  '<circle class="sum" cx="120" cy="74" r="16"/><text class="t c" x="120" y="79">Σ</text><line class="br" x1="136" y1="74" x2="160" y2="74"/>' +
  '<path class="fitl" d="M160,90 H180 V58 H205"/><text class="t s" x="160" y="108">계단 함수</text><text class="t c" x="222" y="62">1</text>' +
  '<circle class="mov" r="5"><animateMotion dur="2.4s" repeatCount="indefinite" path="M42,42 L108,70 L136,74 L205,58"/></circle>' +
  '<text class="t s" x="16" y="140">가중합이 기준을 넘으면 1</text>', '퍼셉트론: 가중합과 계단 함수');

S.mlp = A((function(){ var L = [[30,[35,75,115]],[90,[25,58,92,125]],[150,[25,58,92,125]],[210,[75]]], s = '';
    for(var a = 0; a < L.length - 1; a++) L[a][1].forEach(function(y1){ L[a + 1][1].forEach(function(y2){ s += '<line class="wt" x1="' + L[a][0] + '" y1="' + y1 + '" x2="' + L[a + 1][0] + '" y2="' + y2 + '"/>'; }); });
    L.forEach(function(l, k){ l[1].forEach(function(y){ s += '<circle class="tn' + (k === 0 ? ' in' : k === 3 ? ' out' : '') + '" cx="' + l[0] + '" cy="' + y + '" r="9"/>'; }); });
    s += '<circle class="mov" r="5"><animateMotion dur="2s" repeatCount="indefinite" path="M30,75 L90,58 L150,92 L210,75"/></circle><circle class="mov" r="5"><animateMotion dur="2s" begin="1s" repeatCount="indefinite" path="M30,35 L90,125 L150,25 L210,75"/></circle>';
    return s; })() + '<text class="t s" x="12" y="146">입력층 → 은닉층 2개 → 출력층</text>', '심층 신경망: 층을 쌓은 신경망');

S.cnn = A((function(){ var s = ''; for(var i = 0; i < 6; i++) for(var j = 0; j < 6; j++) s += '<rect class="px' + ((i + j) % 3 === 0 ? ' d' : '') + '" x="' + (14 + j * 14) + '" y="' + (20 + i * 14) + '" width="13" height="13"/>';
    s += '<rect class="flt" x="14" y="20" width="41" height="41"><animate attributeName="x" values="14;56;14;56" dur="4s" repeatCount="indefinite" calcMode="discrete"/><animate attributeName="y" values="20;20;62;62" dur="4s" repeatCount="indefinite" calcMode="discrete"/></rect>';
    for(var a = 0; a < 2; a++) for(var b = 0; b < 2; b++) s += '<rect class="fm" x="' + (130 + b * 22) + '" y="' + (40 + a * 22) + '" width="20" height="20"/>';
    s += '<text class="t c" x="112" y="66">→</text><text class="t c" x="196" y="66">→ 🐱</text><text class="t s" x="14" y="122">3×3 필터가 훑으며</text><text class="t s" x="14" y="138">무늬(특징)를 찾는다</text><text class="t s" x="128" y="98">특징 지도</text>'; return s; })(), '합성곱 신경망: 필터로 훑기');

S.rnn = A(['나는', '학교에', '간다'].map(function(w, i){ var x = 25 + i * 70;
    return '<rect class="nd" x="' + x + '" y="60" width="50" height="30" rx="8"/><text class="t c" x="' + (x + 25) + '" y="80">h' + (i + 1) + '</text><text class="t c" x="' + (x + 25) + '" y="120">' + w + '</text><line class="br" x1="' + (x + 25) + '" y1="105" x2="' + (x + 25) + '" y2="92"/>' + (i < 2 ? '<path class="arw" d="M' + (x + 52) + ',75 L' + (x + 68) + ',75"/>' : ''); }).join('') +
  '<circle class="mov" r="5"><animateMotion dur="3s" repeatCount="indefinite" path="M50,62 L120,62 L190,62"/></circle><text class="t s" x="20" y="40">앞의 기억(h)을 들고 다음 단어로</text>', '순환 신경망: 기억을 이어 받기');

S.transformer = A(['그', '고양이는', '배고파서', '울었다'].map(function(w, i){ return '<rect class="nd" x="' + (10 + i * 57) + '" y="100" width="52" height="26" rx="7"/><text class="t c" x="' + (36 + i * 57) + '" y="118">' + w + '</text>'; }).join('') +
  '<path class="att" d="M207,100 C190,40 80,40 65,100" stroke-width="5"><animate attributeName="opacity" values="0.3;1;0.3" dur="2.5s" repeatCount="indefinite"/></path>' +
  '<path class="att" d="M207,100 C195,60 135,60 122,100" stroke-width="2.5"/><path class="att" d="M207,100 C200,75 30,40 36,100" stroke-width="1"/>' +
  '<text class="t s" x="12" y="24">«울었다»가 문장 전체를 주목(어텐션) — 굵을수록 강하게</text>', '트랜스포머: 어텐션');

S.llm = A('<rect class="bub" x="12" y="14" width="150" height="30" rx="12"/><text class="t" x="22" y="34">오늘 날씨가 정말 …</text>' +
  [['좋다', 62], ['덥다', 22], ['춥다', 9], ['파랗다', 4]].map(function(o, i){ var y = 58 + i * 20;
    return '<text class="t s" x="22" y="' + (y + 12) + '">' + o[0] + '</text><rect class="bar' + (i ? '' : ' hi') + '" x="70" y="' + y + '" height="14" width="' + o[1] * 1.8 + '"><animate attributeName="width" values="0;' + o[1] * 1.8 + '" dur="1.4s" repeatCount="indefinite"/></rect><text class="t s" x="' + (76 + o[1] * 1.8) + '" y="' + (y + 12) + '">' + o[0 + 1] + '%</text>'; }).join('') +
  '<text class="t s" x="150" y="140">다음 단어 확률</text>', '대규모 언어 모델: 다음 단어 맞히기');

S.gan = A('<rect class="nd" x="10" y="50" width="60" height="40" rx="8"/><text class="t c" x="40" y="68">생성자</text><text class="t c s" x="40" y="83">위조범</text>' +
  '<rect class="img" x="95" y="30" width="34" height="34" rx="4"/><text class="t c s" x="112" y="78">가짜</text><rect class="img real" x="95" y="95" width="34" height="34" rx="4"/><text class="t c s" x="112" y="145">진짜</text>' +
  '<rect class="nd" x="160" y="50" width="70" height="40" rx="8"/><text class="t c" x="195" y="68">판별자</text><text class="t c s" x="195" y="83">감정사</text>' +
  '<path class="arw" d="M72,68 L93,50"/><path class="arw" d="M131,48 L158,62"/><path class="arw" d="M131,110 L158,80"/>' +
  '<text class="t s" x="150" y="112"><tspan>진짜? 가짜?</tspan><animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite"/></text>' +
  '<rect class="img" x="95" y="30" width="34" height="34" rx="4"><animate attributeName="opacity" values="0.15;0.8;0.15" dur="3s" repeatCount="indefinite"/></rect>', 'GAN: 위조범과 감정사의 대결');

S.diffusion = A([0,1,2,3].map(function(i){ var x = 14 + i * 56, s = '<rect class="img" x="' + x + '" y="40" width="46" height="46" rx="5"/>';
    for(var k = 0; k < 18 - i * 6; k++){ var h = (k * 37 + i * 11) % 40, v = (k * 53 + i * 7) % 40; s += '<rect class="nz" x="' + (x + 3 + h) + '" y="' + (43 + v) + '" width="3" height="3"/>'; }
    if(i >= 2) s += '<circle class="g" cx="' + (x + 23) + '" cy="63" r="' + (i === 2 ? 9 : 14) + '"/>';
    return s + (i < 3 ? '<text class="t c" x="' + (x + 52) + '" y="66">→</text>' : ''); }).join('') +
  '<text class="t s" x="14" y="110">잡음에서 시작해 잡음을 조금씩 걷어 내며</text><text class="t s" x="14" y="126">그림을 만든다(글 프롬프트가 방향을 정함)</text>', '확산 모델: 잡음 걷어 내기');

S.rl = A((function(){ var s = ''; for(var i = 0; i < 3; i++) for(var j = 0; j < 5; j++) s += '<rect class="cell" x="' + (14 + j * 40) + '" y="' + (12 + i * 36) + '" width="38" height="34" rx="5"/>';
    s += '<text class="t c" x="193" y="105">🏁</text><text class="t c" x="113" y="69">🔥</text>';
    s += '<text style="font-size:20px" x="20" y="38">🤖<animateMotion dur="4s" repeatCount="indefinite" path="M0,0 L40,0 L40,72 L80,72 L120,72 L160,72"/></text>';
    s += '<text class="t s" x="14" y="140">+10 출구 · −10 함정 · −1 한 걸음 → 보상이 큰 길 학습</text>'; return s; })(), '강화 학습: 보상으로 길 찾기');

S.transfer = A('<rect class="frozen" x="12" y="30" width="140" height="70" rx="10"/><text class="t c" x="82" y="58">❄ 미리 학습된 CNN</text><text class="t c s" x="82" y="78">수백만 장으로 배운 «눈»</text>' +
  '<path class="arw" d="M154,65 L170,65"/><rect class="head" x="172" y="45" width="56" height="40" rx="8"><animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite"/></rect><text class="t c w" x="200" y="62">새 출력층</text><text class="t c w s" x="200" y="77">우리 3종</text>' +
  '<text class="t s" x="14" y="124">적은 사진(수십 장)으로 마지막 층만 학습</text><text class="t s" x="14" y="140">= 티처블 머신의 원리</text>', '전이 학습: 마지막 층만 새로');

window.MODEL_SVG = S;
window.MODEL_SVG_CSS = '.mv{width:100%;height:auto;display:block;background:var(--tint);border-radius:12px;overflow:visible}' +
  '.mv .t{font-family:var(--sans);font-size:11px;fill:var(--ink2)}.mv .t.s{font-size:9.5px}.mv .t.c{text-anchor:middle}.mv .t.w{fill:#fff;font-weight:800}' +
  '.mv .ax{stroke:var(--muted);stroke-width:1.2}.mv .a{fill:var(--blue)}.mv .b{fill:var(--warm)}.mv .g{fill:var(--good)}' +
  '.mv .g0{fill:#2F6FEC}.mv .g1{fill:#E8862A}.mv .g2{fill:#1E9E6A}.mv .nz{fill:#9aa5b1}' +
  '.mv .fitl{fill:none;stroke:var(--warm);stroke-width:3;stroke-linecap:round}.mv .half{stroke:var(--muted);stroke-dasharray:4 4}' +
  '.mv .res line{stroke:var(--warm);stroke-width:1.5;stroke-dasharray:2 2}.mv .bar{fill:var(--blue-l)}.mv .bar.hi{fill:var(--good)}' +
  '.mv .mov{fill:var(--good);stroke:#fff;stroke-width:2}.mv .ring{fill:none;stroke:var(--good);stroke-width:2;stroke-dasharray:4 3}.mv .star{fill:#FFD43B;stroke:#8a6d00}' +
  '.mv .nd{fill:var(--white);stroke:var(--blue-d);stroke-width:1.5}.mv .br{stroke:var(--muted);stroke-width:1.5;fill:none}.mv .lf.g{fill:var(--good)}.mv .lf.b{fill:var(--warm)}' +
  '.mv .tn{fill:var(--white);stroke:var(--blue-d);stroke-width:1.5}.mv .tn.in{fill:var(--blue-xl)}.mv .tn.out{fill:var(--good-bg)}.mv .vote.a{fill:var(--blue)}.mv .vote.b{fill:var(--warm)}' +
  '.mv .band{fill:var(--good-bg);opacity:.8}.mv .mg{stroke:var(--good);stroke-dasharray:4 3;stroke-width:1.5}.mv .sv{fill:none;stroke:var(--ink);stroke-width:2}' +
  '.mv .bell{fill:none;stroke-width:3}.mv .bell.a{stroke:var(--blue)}.mv .bell.b{stroke:var(--warm)}' +
  '.mv .cen path{stroke:#111;stroke-width:3}.mv .den{fill:none;stroke:var(--blue-d);stroke-width:2}.mv .eps{fill:var(--good-bg);fill-opacity:.4;stroke:var(--good);stroke-dasharray:3 3}' +
  '.mv .pc{stroke:var(--warm);stroke-width:3}.mv .arw{fill:none;stroke:var(--muted);stroke-width:2;marker-end:url(#mvArr)}' +
  '.mv .cell{fill:var(--white);stroke:var(--line)}.mv .cell.on{fill:var(--blue)}.mv .cell.rec{fill:#FFD43B}' +
  '.mv .wt{stroke:var(--line);stroke-width:1.2}.mv .sum{fill:var(--blue-xl);stroke:var(--blue-d);stroke-width:1.5}' +
  '.mv .px{fill:var(--white);stroke:var(--line);stroke-width:.6}.mv .px.d{fill:var(--blue-l)}.mv .flt{fill:var(--warm);fill-opacity:.18;stroke:var(--warm);stroke-width:2.5}.mv .fm{fill:var(--good);opacity:.7}' +
  '.mv .att{fill:none;stroke:var(--warm)}.mv .bub{fill:var(--white);stroke:var(--blue-d)}.mv .img{fill:var(--white);stroke:var(--muted)}.mv .img.real{fill:var(--good-bg)}' +
  '.mv .frozen{fill:var(--blue-xl);stroke:var(--blue-d);stroke-dasharray:5 3}.mv .head{fill:var(--good)}' +
  '.mv .draw{stroke-dasharray:600;stroke-dashoffset:600;animation:mvdraw 3.5s ease infinite}@keyframes mvdraw{60%,100%{stroke-dashoffset:0}}' +
  '@media (prefers-reduced-motion:reduce){.mv .draw{animation:none;stroke-dashoffset:0}}';
})();
