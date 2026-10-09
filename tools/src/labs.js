<script>
/* ══════════════════════════════════════════════════════════════
   코랩 실습실 — 교과서 실습을 단추 하나로 (labs.html)
   tool: colab · tm(티처블 머신) · orange(오렌지3) / les: lessons.js 의 차시 id(우리 반 날짜 표시)
   ══════════════════════════════════════════════════════════════ */
(function(){
var GH = 'https://colab.research.google.com/github/richee-pc/AI_cs/blob/main/notebooks/';
var RAW = 'https://raw.githubusercontent.com/richee-pc/AI_cs/main/data/';
var LABS = [
 { id:'00', need:'선택', u:'2', tool:'colab', t:'코랩 첫걸음', pg:'교과서 전 · 처음이면 여기부터', sub:'준비', les:'U05', lv:1, min:15,
   learn:'셀 실행 · 사본 저장 · 런타임 · 오류 읽는 법', model:'—', data:'없음', nb:'00_colab_first_steps.ipynb',
   more:[['https://richee-pc.github.io/AI_cs/colab.html','코랩 첫걸음 쪽(흉내 내기)']] },
 { id:'01', need:'선택', u:'2', tool:'colab', t:'데이터 전처리 실습', pg:'72~79쪽', sub:'Ⅱ-02', les:'D3', lv:1, min:30,
   learn:'변환 · 통합 · 중복 · 결측치 · 상자그림 이상치 · 상관계수(교과서 79쪽 값과 같게)', model:'—', data:'file1 · file2 (보험 계약)', nb:'01_preprocess.ipynb', sol:'01_preprocess_solution.ipynb',
   more:[['https://richee-pc.github.io/AI_cs/unit2.html#prep','단추로 먼저 해 보는 전처리 체험']] },
 { id:'20', need:'필수', u:'2', tool:'colab', t:'데이터 탐구 ③ — 교과서 Ⅱ-02 코드를 우리 데이터로', pg:'72~79쪽 ❶~⓮ · 83쪽 IQR', sub:'Ⅱ-02', les:'D3', lv:2, min:30,
   learn:'⓪ 설정 칸(파일 · 가설의 두 열 · 전처리 기준) → 읽기(cp949 자동) → 변환 · 통합 · 중복 → 결측치 · 상자그림 · IQR → 저장 → 축소 · 산점도 · 상관계수 → AI 없이 1차 해석', model:'—', data:'우리 모둠 CSV(연습: 약수터 수질)', nb:'20_data_inquiry_my_data.ipynb',
   note:'AI Agent로 전처리했다면 단계별 행 수로 AI 변경 내역을 검증합니다. 치운 파일은 Ⅳ단원 프로젝트 · 오렌지3에서 그대로 씁니다.' },
 { id:'13', need:'선택', u:'2', tool:'colab', t:'Ⅱ-02 데이터 가공과 핵심 속성 추출 — 교과서 전체', pg:'70~83쪽 + 80~82쪽 활동', sub:'Ⅱ-02', les:'D3', lv:2, min:45,
   learn:'생각 열기 → 전처리 네 가지(작은 표로) → 실습 ❶~⓮ 옆 설명까지 → 상자그림 · IQR 직접 계산 → 추가 활동(건강검진)', model:'—', data:'file1 · file2 · 건강검진 3만 명', nb:'13_unit2_02_preprocessing.ipynb',
   note:'Ⅱ-02는 데이터 탐구 ② · ③에서 우리 데이터로 배웁니다. 교과서 실습 전체는 이 노트북 한 권으로 — 데이터 탐구 ③에서 먼저 끝나면 · «Ⅱ 다시 보기» · 집에서. 01 · 06 은 같은 내용의 짧은 연습판입니다.' },
 { id:'06', need:'선택', u:'2', tool:'colab', t:'건강검진 데이터로 핵심 속성 찾기', pg:'80~82쪽 활동', sub:'Ⅱ-02', les:'UR', lv:2, min:30,
   learn:'열 33개 · 3만 명 데이터에서 축소 · 정제 → 혈색소와의 상관계수', model:'—', data:'국민건강보험공단 건강검진(3만 명 표본)', nb:'06_health_checkup.ipynb',
   note:'교과서는 100만 명(95MB)을 드라이브에 올려 씁니다. 여기서는 같은 데이터의 3만 명 표본을 바로 읽습니다.' },
 { id:'02', need:'필수', u:'2', tool:'colab', t:'예측 모델과 분류 모델 만들고 평가하기', pg:'104~112쪽', sub:'Ⅱ-05', les:'U05', lv:2, min:35,
   learn:'선형 회귀(청년 인구) · k-최근접 이웃(붓꽃) · MSE · R² · 오분류표 · 정확도', model:'선형 회귀 · kNN', data:'youth population · iris', nb:'02_model.ipynb', sol:'02_model_solution.ipynb',
   note:'3차시 «블록으로 설계하고 파이썬으로 완성하다» — 같은 예제를 오렌지3로 먼저 설계한 뒤 이 노트북으로 완성합니다.' },
 { id:'04', need:'선택', u:'2', tool:'colab', t:'다이아몬드로 모델 고르고 평가하기', pg:'114~115쪽 활동', sub:'Ⅱ-05', les:'U05', lv:2, min:25,
   learn:'무엇을 맞힐지(가격 → 예측 · 등급 → 분류) 정하고 속성을 바꿔 가며 점수 비교', model:'선형 회귀 · kNN', data:'seaborn diamonds', nb:'04_diamonds.ipynb' },
 { id:'14', need:'심화', u:'2', tool:'colab', t:'예측 모델 — 자동차 연비 맞히기', pg:'Ⅱ-05 · 교과서와 다른 사례', sub:'Ⅱ-05', les:'UR', lv:2, min:20,
   learn:'탐색 · 히트맵 → 분리 → fit · coef_ → 경사하강법 애니메이션 → predict → MAE · MSE · RMSE · R² → 잔차 그래프 → 특성 더하기 · 랜덤 포레스트 비교 → 해석 문장', model:'선형 회귀 · 랜덤 포레스트', data:'seaborn mpg(자동차 398대)', nb:'14_predict_regression.ipynb' },
 { id:'15', need:'심화', u:'2', tool:'colab', t:'분류 모델 — 타이타닉 생존자 분류', pg:'Ⅱ-05 · 교과서와 다른 사례', sub:'Ⅱ-05', les:'UR', lv:2, min:20,
   learn:'결측 대체 · 범주를 숫자로 → stratify 분리 → 세 모델 비교 · 트리 그림 → predict_proba → 혼동 행렬 · 정밀도 · 재현율 · 기준선 → 임계값 바꾸기 → 해석(편향)', model:'로지스틱 · 트리 · kNN', data:'seaborn titanic(891명)', nb:'15_classify_titanic.ipynb' },
 { id:'16', need:'심화', u:'2', tool:'colab', t:'군집 모델 — 정답 없이 와인 묶기', pg:'Ⅱ-04 · 05 · 교과서와 다른 사례', sub:'Ⅱ-05', les:'UR', lv:2, min:15,
   learn:'표준화 → 엘보 · 실루엣으로 k → k-평균 → PCA 그림 · 단계 애니메이션 → 무리마다 평균으로 이름 붙이기 → 숨긴 정답과 일치도', model:'k-평균 · PCA', data:'sklearn wine(178병)', nb:'16_cluster_wine.ipynb' },
 { id:'12', need:'심화', u:'x', tool:'colab', t:'모델 비교 실험실 — 같은 데이터, 여러 모델', pg:'Ⅱ-04 · 05 넓혀 보기', sub:'모델 도감', les:'U05', lv:3, min:30,
   learn:'분류 모델 8개 · 회귀 모델 5개를 교차 검증으로 한 번에 비교 · k-평균 + PCA', model:'로지스틱 · kNN · 트리 · 랜덤 포레스트 · 부스팅 · SVM · 나이브 베이즈 · 신경망 · k-평균', data:'펭귄(seaborn)', nb:'12_model_zoo.ipynb',
   more:[['https://richee-pc.github.io/AI_cs/models.html','📚 AI 모델 도감']] },
 { id:'17', need:'필수', u:'2', tool:'colab', t:'Ⅱ-06 · 07 인공신경망과 딥러닝 — 교과서 전체', pg:'116~139쪽', sub:'Ⅱ-06 · 07', les:'U67', lv:2, min:50,
   learn:'퍼셉트론 0.6 계산 → 활성화 함수 그래프 → XOR 실패와 은닉층 → 손실함수 · 역전파로 스스로 배우기 → 놀이터 Spiral 재현 → CNN 필터 · RNN 기억 → 독버섯 ❶~⓫ → 과적합 · 튜닝 표 → 정규화 → 괴산장터 감성 분석(VADER) → 딥러닝 vs k-NN 시간', model:'퍼셉트론 · 심층 신경망 · CNN · 감성 사전', data:'mushrooms · 괴산장터 후기 279건', nb:'17_unit2_06_07_deeplearning.ipynb',
   note:'Ⅱ-06·07 한 차시를 이 노트북 한 권으로 수업합니다. ★만 수업 시간에(약 20분), ☆는 먼저 끝낸 사람 · 집에서. 03은 독버섯만 짧게 한 연습판입니다.' },
 { id:'18', need:'필수', u:'2', tool:'colab', t:'Ⅱ 종합 실습 — 다섯 걸음으로 끝까지', pg:'63쪽 그림 Ⅱ-3 · 139~141쪽', sub:'Ⅱ 정리', les:'UX', lv:3, min:50,
   learn:'더러운 데이터 점검 → 중복 · 표기 · 이상치(범위) · 결측치 → 범주를 숫자로 → 상관계수 → 예측 모델 4 · 분류 모델 4 비교 → 전처리 전후 R²(0.13 → 0.63) → 기준선 · 재현율 → 모델 선택 문장', model:'선형 회귀 · 트리 · 랜덤 포레스트 · 로지스틱 · k-NN · 신경망', data:'학습 습관 300명(데이터 공방에서 만든 가상 데이터)', nb:'18_unit2_review_practice.ipynb',
   more:[['https://richee-pc.github.io/AI_cs/datagen.html','🧰 데이터 공방 — 다른 주제로 한 번 더']] },
 { id:'03', need:'선택', u:'2', tool:'colab', t:'독버섯을 가려내는 딥러닝 모델', pg:'126~130쪽', sub:'Ⅱ-07', les:'U67', lv:2, min:35,
   learn:'LabelEncoder · 층 쌓기(Dense) · compile · 에포크와 배치 · 손실 그래프 · 정규화(MinMax)', model:'심층 신경망', data:'mushrooms', nb:'03_deeplearning.ipynb', sol:'03_deeplearning_solution.ipynb' },
 { id:'tm1', need:'선택', u:'2', tool:'tm', t:'쓰레기 분리 배출 — 이미지 분류', pg:'131~132쪽', sub:'Ⅱ-07', les:'U67', lv:1, min:25,
   learn:'클래스 만들기 · 사진 넣기(고르게 · 다양하게) · 학습 · 틀린 사진으로 개선', model:'전이 학습(CNN)', data:'내가 찍은 사진 · 선생님 공유 폴더',
   go:[['https://teachablemachine.withgoogle.com/train/image','티처블 머신 — 이미지 프로젝트 ↗']] },
 { id:'11', need:'심화', u:'2', tool:'colab', t:'재활용 분류 프로그램 — 티처블 머신 모델을 코랩에서', pg:'133쪽', sub:'Ⅱ-07', les:'U07b', lv:2, min:20,
   learn:'keras_model.h5 · labels.txt 불러오기 → 사진 크기·값 맞추기 → 확률과 np.argmax', model:'전이 학습(CNN)', data:'위 활동에서 내보낸 모델 · 내 사진', nb:'11_teachable_machine.ipynb' },
 { id:'tm2', need:'심화', u:'2', tool:'tm', t:'새 소리 분류 — 왜가리 vs 박새', pg:'134~135쪽', sub:'Ⅱ-07', les:'U07b', lv:1, min:20,
   learn:'배경 소음 클래스 · 오디오 샘플 · 클래스 개수 맞추기 · 실시간 판별', model:'전이 학습(소리)', data:'선생님 공유 폴더(새 소리 zip 3개)',
   go:[['https://teachablemachine.withgoogle.com/train/audio','티처블 머신 — 오디오 프로젝트 ↗']] },
 { id:'or1', need:'심화', u:'2', tool:'orange', t:'쇼핑몰 후기 감성 분석', pg:'135~137쪽', sub:'Ⅱ-07', les:'U07b', lv:2, min:30,
   learn:'Text Mining 애드온 · Corpus → Preprocess Text → Sentiment Analysis → Box Plot · 워드 클라우드', model:'감성 사전(VADER)', data:'괴산장터 상품 후기 279건(영어 번역 열 포함)',
   go:[['data/goesan_reviews.csv','후기 데이터 받기(CSV) ↓','dl']],
   steps:['오렌지3 → 옵션 → 애드온에서 <b>Text</b> 설치 후 다시 켜기','<b>Corpus</b> 위젯에 받은 CSV를 열고 사용할 열은 <b>번역</b>, 언어 English','<b>Preprocess Text</b> — 소문자 · 낱말 나누기 · 불용어 빼기','<b>Sentiment Analysis</b>(Vader) → <b>Box Plot</b>으로 긍정·부정 분포','<b>Word Cloud</b>로 자주 나온 낱말 보기 · 부정 후기만 골라 읽어 개선점 찾기'] },
 { id:'19', need:'선택', u:'4', tool:'colab', t:'Ⅳ 인공지능 프로젝트 — 교과서 전체', pg:'180~210쪽', sub:'Ⅳ-01 · 02', les:'P1', lv:2, min:50,
   learn:'SDGs 17개 표와 5P 분류 → 세부 목표 · AI for Good → 함께해 보기 · 탐구 활동 → 역할 분담 · 수행 계획 → 기아 종식 예측 과정 ❶~29와 더 알아보기(2032.68 · 2054.39 · 0.933) → «믿어도 될까?» 훈련/테스트 실험 → 평가표 17항목 → 대단원 마무리', model:'선형 회귀', data:'GHI · 영양실조 · 발육 저하(136개국)', nb:'19_unit4_project.ipynb',
   note:'07은 기아 예측 부분만 짧게 한 수행평가 ② 연습판입니다.' },
 { id:'07', need:'선택', u:'4', tool:'colab', t:'기아 종식은 언제? — GHI 분석과 예측', pg:'199~208쪽', sub:'Ⅳ-02', les:'S1', lv:2, min:35,
   learn:'세 데이터 통합 · 결측치 평균 대체 · 히트맵 · 선형 회귀로 «GHI 10이 되는 해» · 외삽의 위험', model:'선형 회귀', data:'GHI · 영양실조 · 발육 저하(136개국)', nb:'07_ghi_hunger.ipynb',
   note:'수행평가 ② 노트북과 같은 «불러오기 → 전처리 → 모델 → 학습 · 평가» 순서입니다.' },
 { id:'08', need:'선택', u:'4', tool:'colab', t:'몸 상태로 스트레스 단계 분류', pg:'부록 213~218쪽', sub:'부록', les:'P3', lv:2, min:30,
   learn:'상자그림 탐색 · kNN과 의사결정트리 비교 · 트리 그림 읽기 · 모델 저장(joblib)', model:'kNN · 의사결정트리', data:'Stress-Lysis(2,001행)', nb:'08_stress_knn_tree.ipynb' },
 { id:'09', need:'선택', u:'4', tool:'colab', t:'약수터 물, 마셔도 될까?', pg:'부록 221~226쪽', sub:'부록', les:'P3', lv:2, min:30,
   learn:'표기 통일(Y/N) · 불균형 데이터 · 정확도 vs 기준선 · 부적합 재현율 · 개선 실험 한 건', model:'로지스틱 회귀', data:'약수터 수질 381곳', nb:'09_water_logistic.ipynb' },
 { id:'10', need:'심화', u:'4', tool:'colab', t:'사진으로 음식 알아보기 — Dense vs CNN', pg:'부록 229~237쪽', sub:'부록', les:'U07b', lv:3, min:40,
   learn:'사진을 숫자로(크기 · 0~1) · 펼친 신경망과 합성곱 신경망 비교 · 가중치 수 · 내 사진 분류', model:'심층 신경망 · CNN', data:'바로 실행: 꽃 사진 / 교과서: 선생님 공유 음식 사진', nb:'10_food_image.ipynb',
   note:'<b>런타임 → 런타임 유형 변경 → T4 GPU</b>를 먼저 고르세요.' },
 { id:'05', need:'필수', u:'4', tool:'colab', t:'수행평가 ② 코랩 재구현 틀', pg:'수행평가 ② · 요소 2 · 3', sub:'수행평가', les:'S1', lv:2, min:100,
   learn:'우리 팀 CSV로 불러오기 · 전처리 · 모델 정의 · 학습 + 셀마다 오렌지3 위젯 주석 · 비교표 · 개선 실험', model:'우리 모둠이 고른 모델', data:'우리 팀 데이터', nb:'05_project_template.ipynb',
   more:[['https://richee-pc.github.io/AI_cs/unit4.html#pa2','수행평가 ② 안내']] }
];
var TOOL = { colab:['코랩','k-co'], tm:['티처블 머신','k-tm'], orange:['오렌지3','k-or'] };
var UN = { '2':'Ⅱ단원', '4':'Ⅳ단원 · 부록', 'x':'넓혀 보기' };
var KEY = 'ai_labs_v1', done = {};
try{ done = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; }catch(e){}
function save(){ try{ localStorage.setItem(KEY, JSON.stringify(done)); }catch(e){} }
function $(id){ return document.getElementById(id); }
var A = window.AIL, cls = A ? A.getCls() : '', filt = 'all';
function when(les){
  if(!A || !cls || !les || !A.LES[les]) return '';
  var ds = A.datesOf(cls, les); if(!ds.length) return '';
  return A.NAME[cls] + ' ' + ds.map(function(x){ return x.md + '(' + A.WD[x.d.getDay()] + ')'; }).join(' · ') + ' · ' + (A.LES[les].short || A.LES[les].tag);
}
function card(L){
  var tl = TOOL[L.tool], lv = '●●●'.slice(0, L.lv) + '○○○'.slice(L.lv);
  var btn = '';
  if(L.nb) btn += '<a class="lbig" href="' + GH + L.nb + '" target="_blank" rel="noopener">▶ 코랩에서 열기</a>';
  if(L.sol) btn += '<a class="lsm" href="' + GH + L.sol + '" target="_blank" rel="noopener">정답 노트북</a>';
  (L.go || []).forEach(function(g){ btn += '<a class="' + (btn ? 'lsm' : 'lbig') + '" href="' + g[0] + '"' + (g[2] === 'dl' ? ' download' : ' target="_blank" rel="noopener"') + '>' + g[1] + '</a>'; });
  (L.more || []).forEach(function(g){ btn += '<a class="lsm" href="' + g[0] + '">' + g[1] + '</a>'; });
  var w = when(L.les);
  return '<article class="lab2' + (done[L.id] ? ' done' : '') + '" data-u="' + L.u + '" data-t="' + L.tool + '">' +
    '<header><span class="lneed n-' + L.need + '">' + L.need + '</span><span class="ltool ' + tl[1] + '">' + tl[0] + '</span><span class="lpg">' + L.pg + ' · ' + L.sub + '</span>' +
      '<label class="ldone"><input type="checkbox" data-id="' + L.id + '"' + (done[L.id] ? ' checked' : '') + '> 해 봤어요</label></header>' +
    '<h3>' + L.t + '</h3>' +
    (w ? '<p class="lwhen">📅 ' + w + '</p>' : '') +
    '<dl><dt>배우는 것</dt><dd>' + L.learn + '</dd><dt>모델</dt><dd>' + L.model + '</dd><dt>데이터</dt><dd>' + L.data + '</dd>' +
      '<dt>시간 · 난이도</dt><dd>' + L.min + '분 안팎 · <span class="lv" title="난이도">' + lv + '</span></dd></dl>' +
    (L.steps ? '<ol class="lsteps2">' + L.steps.map(function(s){ return '<li>' + s + '</li>'; }).join('') + '</ol>' : '') +
    (L.note ? '<p class="lnote">' + L.note + '</p>' : '') +
    '<div class="lbtns">' + btn + '</div></article>';
}
function ord(L){ var k = A ? A.ORDER.indexOf(L.les) : -1; return k < 0 ? 999 : k; }
function draw(){
  var box = $('labList');
  var items = LABS.map(function(L, i){ return [L, i]; })
    .filter(function(x){ var L = x[0]; return filt === 'all' || filt === L.tool || filt === 'todo' && !done[L.id] || filt === 'must' && L.need === '필수'; })
    .sort(function(a, b){ var R = { '필수':0, '선택':1, '심화':2 }; return ord(a[0]) - ord(b[0]) || R[a[0].need] - R[b[0].need] || a[1] - b[1]; }).map(function(x){ return x[0]; });
  var groups = [];
  items.forEach(function(L){ var g = groups[groups.length - 1]; if(!g || g.les !== L.les) groups.push(g = { les:L.les, list:[] }); g.list.push(L); });
  box.innerHTML = groups.map(function(g){
    var LL = A && A.LES[g.les], ds = A && cls ? A.datesOf(cls, g.les) : [];
    var head = (ds.length ? '<span class="lgd">' + ds.map(function(x){ return x.md + '(' + A.WD[x.d.getDay()] + ')'; }).join(' · ') + '</span>' : '') + (LL ? (LL.short || LL.tag) : '그 밖');
    return '<h2 class="lgrp">' + head + '</h2><div class="labgrid">' + g.list.map(card).join('') + '</div>';
  }).join('') || '<p class="note">조건에 맞는 실습이 없습니다.</p>';
  var n = LABS.filter(function(L){ return done[L.id]; }).length;
  $('labCount').textContent = n + ' / ' + LABS.length;
  $('labBar').style.width = Math.round(n / LABS.length * 100) + '%';
}
$('labFilt').addEventListener('click', function(e){
  var b = e.target.closest('button[data-f]'); if(!b) return;
  filt = b.getAttribute('data-f');
  [].forEach.call(this.querySelectorAll('button'), function(x){ x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
  draw();
});
$('labCls').addEventListener('click', function(e){
  var b = e.target.closest('button[data-c]'); if(!b || !A) return;
  cls = b.getAttribute('data-c'); A.setCls(cls);
  [].forEach.call(this.querySelectorAll('button'), function(x){ x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
  draw();
});
if(cls){ var cb = document.querySelector('#labCls button[data-c="' + cls + '"]'); if(cb) cb.setAttribute('aria-pressed', 'true'); }
$('labList').addEventListener('change', function(e){
  var c = e.target.closest('input[data-id]'); if(!c) return;
  done[c.getAttribute('data-id')] = c.checked; save(); draw();
});
draw();
})();
</script>
