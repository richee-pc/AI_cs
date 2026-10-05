/* ══════════════════════════════════════════════════════════════
   차시 정보 — plan.html · unit2.html · unit4.html 이 함께 씁니다(여기 한 곳만 고치면 됨).
   원본 날짜: 「2026학년도 2학기 인공지능 기초 분반별 수업일정표_수정안.xlsx」

   LES[id]  kind: u2(Ⅱ단원) · ex(데이터 탐구) · pj(프로젝트) · pa(수행평가) · et(정리·전시)
            lt: 신호등(n AI 없이 · g 초록 · y 노랑)
            steps: 오늘 열 곳을 «순서대로» — [쪽, 자리(id), 이름, 할 일]
                   쪽: u2 = unit2.html · u4 = unit4.html · ix = index.html
                   첫 칸의 쪽이 그 차시의 «집»입니다(그 쪽의 차시 탭에 나옴).
            ext: 바깥 누리집 [주소, 이름]
   CAL[반]  «날짜 수업id» 를 | 로 이음 · OFF: 모든 반이 수업 없는 날
   ?l=D1 로 열면 그 차시 탭이 열리고, ?l=all 이면 전체가 보입니다.
   ══════════════════════════════════════════════════════════════ */
(function(){
'use strict';
var LES = {
  U01:{ kind:'u2', tag:'Ⅱ-01', title:'기계학습과 데이터 수집', page:'교과서 60~69쪽',
    goal:'규칙을 사람이 적는 전통적 프로그래밍과, 데이터에서 규칙을 찾는 기계학습의 차이를 말할 수 있다. 데이터 편향이 생기는 경우와 편향 없이 모으는 방법을 말할 수 있다.',
    steps:[['u2','map','소단원 한눈에','Ⅱ-01 카드를 읽고 교과서 60~69쪽을 함께 봅니다'],['u2','terms','핵심 용어','기계학습 · 데이터 편향 낱말을 확인합니다'],['u2','story','데이터 탐구 미리 보기','다음 주 모둠 탐구 이야기를 미리 읽어 봅니다']],
    out:'나눠 주는 안내문은 보호자께 전달하기' },
  U03:{ kind:'u2', tag:'Ⅱ-03', title:'기계학습의 유형', page:'교과서 84~91쪽',
    goal:'정답이 있는지, 묶기만 하는지, 상과 벌로 배우는지에 따라 지도·비지도·강화 학습을 구분할 수 있다.',
    steps:[['u2','kinds','학습 유형 고르기','12문제를 풀고 «채점하기»를 누릅니다'],['u2','terms','핵심 용어','지도 · 비지도 · 강화 학습을 확인합니다'],['u2','hand','활동 기록지','② 칸이 채워졌는지 확인합니다']],
    out:'유형 고르기 채점 — 활동 기록지 ②' },
  U04:{ kind:'u2', tag:'Ⅱ-04', title:'기계학습 알고리즘', page:'교과서 92~99쪽',
    goal:'분류·예측·군집 알고리즘이 «어떻게 정하는지» 설명하고, 어떤 문제가 분류이고 어떤 문제가 예측인지 판별할 수 있다.',
    steps:[['u2','algo','k-최근접 이웃 · 선형 회귀','E를 끌어 보고, 경사하강법 단추를 눌러 봅니다'],['u2','kinds','유형 다시 보기','분류냐 예측이냐 다시 확인합니다'],['u2','hand','활동 기록지','③ · ④ 칸을 확인합니다']],
    out:'k-최근접 이웃 · 선형 회귀 체험 — 활동 기록지 ③④' },
  D1:{ kind:'ex', tag:'데이터 탐구 ①', title:'문제 정하기 — 무엇이 진짜 문제인가', page:'① 문제 인식 및 정의 → ② 데이터 관점 탐구 설계', lt:['n'],
    goal:'여러 문제가 얽힌 상황에서 데이터로 확인할 수 있는 문제를 정의하고, 문제 해결 가설과 필요한 데이터를 계획할 수 있다.',
    steps:[['u2','story','문제 상황 읽기','「그 여름, 우리 학교에서 생긴 일」 — 문제라고 생각하는 문장에 밑줄'],['u2','ex1','오늘 흐름과 가설 틀','나의 문제 정의 → 모둠 정의문 → 가설과 필요한 데이터']],
    out:'활동지 ①(나의 문제 정의 · 가설) · 활동지 ② 탐구 질문 정의서 앞부분' },
  D2:{ kind:'ex', tag:'데이터 탐구 ②', title:'데이터 찾기 — 믿을 수 있는 데이터인지 따진다', page:'② 데이터 관점 탐구 설계 → ③ 준비 · 교과서 64~67쪽', lt:['n'],
    goal:'가설 해결에 적합한 데이터를 수집해 적합성·신뢰성·충분성·윤리 기준으로 평가하고, 데이터 전처리 기준을 스스로 세울 수 있다.',
    steps:[['u2','ex2','데이터 찾기와 평가','검색어 카드 → 출처 기록 → 평가 체크리스트 11문항 → 전처리 기준']],
    ext:[['https://www.data.go.kr','공공데이터포털'],['https://kosis.kr','KOSIS'],['https://data.kma.go.kr','기상자료개방포털']],
    out:'활동지 ②(정의서 완성) · ③(출처와 평가 11문항) · ④ 전처리 기준 · 수집 데이터' },
  D3:{ kind:'ex', tag:'데이터 탐구 ③', title:'치우고 분석하기 — 해석은 내가 먼저', page:'③ AI 보조 데이터 탐구 · Ⅱ-02 교과서 70~83쪽', lt:['g'],
    goal:'세운 기준에 따라 데이터를 전처리하고, 시각화하여 데이터의 범위 안에서 해석하며, 모둠원의 해석을 모아 공동 해석을 도출할 수 있다.',
    steps:[['u2','ex3','오늘 흐름','전처리 → 시각화와 1차 해석(AI 없이) → 공동 해석 → 1차 자기·동료평가'],['u2','prep','전처리 체험','코랩으로 직접 치울 때 순서를 확인합니다'],['u2','lab','코랩 노트북 ①','내 데이터로 그래프를 그릴 때 엽니다']],
    out:'그래프 · 활동지 ④(1차 해석) · 공동 해석 · AI 사용 기록 · 1차 자기·동료평가', bring:'코랩(학교 구글 계정)' },
  D4:{ kind:'ex', tag:'데이터 탐구 ④', title:'AI 반문 받고 발표 — 내 판단을 지킨다', page:'④ 해결안 검증 → ⑤ AI 티치백 성찰과 공유', lt:['y'],
    goal:'데이터에 근거한 해결안을 도출하고, AI의 반문을 비판적으로 검증하여 보완하며, 과정과 판단 근거를 발표와 구술로 설명할 수 있다.',
    steps:[['u2','ex4','해결안 · AI 반문 · 발표','해결안 초안(AI 없이) → 소크라틱 AI → 티치백 → 발표와 구술']],
    out:'활동지 ⑤(해결안 · AI 반문 기록) · 발표자료 · 성찰 · 2차 자기·동료평가' },
  P1:{ kind:'pj', tag:'프로젝트 ①', title:'무엇을 풀까 — 주제 정하기', page:'① AI 연계 문제 구체화 · 교과서 180~193쪽', lt:['n','y'],
    goal:'인공지능 서비스에서 지능 에이전트의 역할을 찾고, SDGs 문제 가운데 기계학습으로 풀 수 있는 부분을 구분해 실현 가능한 주제를 정할 수 있다.',
    steps:[['u4','model','모형과 AI 신호등','오늘은 «혼자 먼저(AI 없이) → 모둠이 Co-Pilot과»'],['u4','p1','주제 정하기','17개 목표 → 나의 주제 제안서 → Co-Pilot → 주제 정의서'],['u4','data','데이터 찾는 곳','우리 주제의 데이터가 있는지 확인합니다']],
    out:'나의 주제 제안서(4항목) · 주제 정의서(활동지 ①) — 수행평가 ② 1단계 산출물' },
  P2:{ kind:'pj', tag:'프로젝트 ②', title:'어떻게 만들까 — 계획과 성공 기준', page:'② AI 모델 개발 계획 수립', lt:['g'],
    goal:'문제와 데이터의 특성에 맞춰 지도학습과 비지도학습을 비교해 학습 유형을 고르고, 측정할 수 있는 성공 기준을 넣은 계획을 세울 수 있다.',
    steps:[['u4','p2','계획과 성공 기준','지도·비지도 6문제 → 아는 것/모르는 것 → 탐구 보조 → 계획서와 성공 기준']],
    out:'개념 정리 기록 · 계획서(활동지 ②) · 다음 시간 전까지 데이터를 모둠 공유 폴더에' },
  P3:{ short:'프로젝트 ③', kind:'pj', tag:'프로젝트 ③ · Ⅱ-05', title:'오렌지3로 만들고 AI 반문으로 고치기', page:'③ 프로토타입 개발 → ④ 반복 개선 · 교과서 100~115쪽', lt:['n','y'],
    goal:'데이터 윤리를 점검한 데이터로 모델을 학습시키고 성능을 평가하며, AI의 반문을 테스트 결과로 검증하여 모델을 개선할 수 있다.',
    steps:[['u4','p3','오렌지3와 개선','데이터 점검 → 오렌지3 프로토타입 → 혼동 행렬 → AI 반문으로 개선'],['u4','data','학교 데이터','데이터를 못 올렸으면 여기서 고릅니다']],
    out:'오렌지3 워크플로 · 성능 평가 기록(④) · 회차별 변경 기록(⑤) · 1차 자기·동료평가', bring:'오렌지3 설치된 노트북' },
  P4:{ kind:'pj', tag:'프로젝트 ④', title:'발표하고 설명하고 돌아보기', page:'⑤ AI 지원 메타인지 성찰 및 발표', lt:['y'],
    goal:'과정과 결과를 근거와 함께 발표해 모델의 동작 원리와 학습 유형을 고른 이유를 구술로 설명하고, AI와 함께한 경험을 돌아볼 수 있다.',
    steps:[['u4','p4','발표 · 구술 · 성찰','개요 점검 → AI Agent 발표자료 → 2분 발표 → 구술 → 메타인지 성찰']],
    out:'발표자료(마지막 장: 출처·AI 활용) · 메타인지 성찰 · 2차 자기·동료평가', bring:'미리 써 온 발표 개요' },
  U06:{ kind:'u2', tag:'Ⅱ-06', title:'인공신경망과 딥러닝', page:'교과서 116~123쪽',
    goal:'퍼셉트론 하나로 풀리는 문제와 풀리지 않는 문제(XOR)를 구별하고, 은닉층이 왜 필요한지 설명할 수 있다.',
    steps:[['u2','nn','퍼셉트론과 XOR','AND · OR 맞추기 → XOR 실패 → 은닉층 넣기'],['u2','terms','핵심 용어','퍼셉트론 · 은닉층 · 활성화 함수'],['u2','hand','활동 기록지','⑤ 칸을 확인합니다']],
    out:'퍼셉트론 맞추기 — 활동 기록지 ⑤' },
  U07a:{ short:'Ⅱ-07 코랩①', kind:'u2', tag:'Ⅱ-07', title:'코랩 ① 데이터 불러오기·전처리', page:'교과서 124~130쪽 · 수행평가 ② 바로 전 시간',
    goal:'코랩에서 데이터를 불러와 전처리하는 코드를 읽고 실행하며, 오렌지3 위젯과 코드의 짝을 찾을 수 있다.',
    steps:[['u2','code','딥러닝 코드 읽기','어느 줄이 무슨 일을 하는지 먼저 읽습니다'],['u2','lab','코랩 노트북 ③','단추로 열어 셀을 차례로 실행합니다'],['u4','pa2','오렌지3 ↔ 코랩 대조표','다음 시간 수행평가 ②에서 씁니다']],
    out:'노트북 실행 확인', bring:'코랩(학교 구글 계정)' },
  S1:{ short:'수행② 코랩 재구현', kind:'pa', tag:'수행평가 ②', title:'코랩 재구현', page:'과정 평가 · 요소 2',
    goal:'오렌지3로 만든 우리 모델을 개인 코랩 노트북에서 불러오기 · 전처리 · 모델 정의 · 학습 네 단계로 다시 만들 수 있다.',
    steps:[['u4','pa2','대조표와 평가 요소','위젯마다 어떤 코드가 되는지 보고 셀에 주석을 답니다'],['u2','lab','코랩 노트북 ②','빈칸 노트북을 엽니다']],
    out:'개인 계정 코랩 노트북 — 셀마다 오렌지3 위젯 주석', bring:'코랩 · 우리 팀 데이터 · 오렌지3 기록' },
  S2:{ short:'수행② 비교·개선', kind:'pa', tag:'수행평가 ②', title:'두 모델 비교와 개선', page:'과정 평가 · 요소 3',
    goal:'같은 지표로 오렌지3 모델과 코랩 모델을 비교하고, 편향을 고려한 개선 실험 한 건을 가설·조작·결과·해석으로 기록할 수 있다.',
    steps:[['u4','pa2','개선 실험 네 칸','같은 지표로 비교표 → 가설 · 조작 · 결과 · 해석'],['u4','p3','혼동 행렬 계산기','재현율 · 정밀도를 확인합니다']],
    out:'비교표(같은 지표) · 개선 실험 기록 · 편향 유형 지목' },
  S3:{ short:'수행② 보고서', kind:'pa', tag:'수행평가 ②', title:'보고서와 최종 발표자료', page:'과정 평가 · 요소 4 준비 · 캔바 템플릿',
    goal:'본인 집필 구간에 판단 근거와 AI 활용 내역을 쓰고, 최종 발표자료를 완성할 수 있다.',
    steps:[['u4','pa2','AI 활용 내역 적는 법','신호등 색 · 요청 내용 · 채택 여부'],['u4','rules','약속 다시 보기','AI는 검색 · 요약까지만']],
    out:'프로젝트 보고서(집필자 표기) · 최종 발표자료' },
  S4:{ short:'수행② 발표·구술', kind:'pa', tag:'수행평가 ②', title:'발표 · 개인 구술 방어', page:'결과 평가 · 요소 4',
    goal:'모둠 발표 뒤 구술 두 문항(담당 구간 1 · 무작위 1)에 근거를 들어 답할 수 있다.',
    steps:[['u4','p4','2분 타이머 · 구술 연습','«수행평가 ② 구술» 질문을 뽑아 연습합니다'],['u4','pa2','평가 요소','요소 4를 다시 확인합니다']],
    out:'발표 · 구술 2문항' },
  S5:{ short:'피드백·성찰', kind:'et', tag:'수행평가 ② 마무리', title:'상호 피드백 · 성찰일지', page:'',
    goal:'개선 전·후 성능을 비교해 성찰일지를 쓰고, 다른 모둠 산출물에 근거 있는 피드백을 줄 수 있다.',
    steps:[['u4','rules','약속 다시 보기','서로의 기여를 구체적인 행동으로 적습니다']], out:'성찰일지 · 상호 피드백' },
  U07b:{ short:'Ⅱ-07 심화', kind:'u2', tag:'Ⅱ-07', title:'딥러닝 모델 구현 (심화)', page:'교과서 124~138쪽 · 부록 229~237쪽',
    goal:'층을 쌓아 딥러닝 모델을 만들고, 정규화가 성능을 어떻게 바꾸는지 비교할 수 있다.',
    steps:[['u2','lab','코랩 노트북 ③','정규화 전 · 후 정확도를 비교합니다'],['u2','code','코드 읽기','정규화 한 줄을 찾아봅니다']],
    out:'정확도 전·후 비교 한 줄', bring:'코랩(학교 구글 계정)' },
  UX:{ short:'Ⅱ 종합 실습', kind:'u2', tag:'Ⅱ 정리', title:'종합 실습 — 성능 비교와 모델 선택', page:'용어 · 오개념 · 확인 문제',
    goal:'기계학습과 딥러닝의 성능을 비교해 모델 선택 기준을 말하고, 단원 전체 개념을 스스로 점검할 수 있다.',
    steps:[['u2','terms','핵심 용어','모르는 낱말에 표시합니다'],['u2','miscon','헷갈리는 것 O/X','틀린 문항의 설명을 읽습니다'],['u2','check','확인 문제','스스로 점검합니다'],['u2','hand','활동 기록지','빈 칸을 채워 제출합니다(마감)']],
    out:'활동 기록지 제출(마감)' },
  EX:{ short:'지필 대비', kind:'et', tag:'지필 대비', title:'2차 지필평가 대비 정리', page:'Ⅱ 전 영역 · 12/10부터 정기고사',
    goal:'성취기준 여섯 개를 기준으로 부족한 곳을 찾아 보충할 수 있다.',
    steps:[['u2','goal','성취기준 6개','어느 기준이 약한지 표시합니다'],['u2','check','확인 문제','다시 풀어 봅니다'],['u2','miscon','헷갈리는 것 O/X','오개념을 정리합니다']], out:'' },
  MK:{ short:'전시 준비', kind:'et', tag:'Ⅳ 심화', title:'우수 산출물 고도화 · 전시 준비', page:'평가 미반영',
    goal:'우리 모둠의 AI를 더 다듬고 전시·시연을 준비할 수 있다.', steps:[['u4','p4','발표 · 시연 다시 보기','시연 30초를 준비합니다']], out:'' },
  MF:{ short:'메이커 페어', kind:'et', tag:'Ⅳ 전시', title:'AI 메이커 페어', page:'평가 미반영',
    goal:'우리 모둠의 AI를 전시·시연하고, 다른 모둠의 작품을 보며 개선 아이디어를 기록할 수 있다.', steps:[['u4','p4','발표 · 시연','전시에서 설명할 순서를 확인합니다']], out:'개선 아이디어 기록' },
  END:{ short:'학기 정리', kind:'et', tag:'학기 정리', title:'학기 총정리 · 포트폴리오 정리', page:'',
    goal:'한 학기 동안 만든 것을 모아 돌아보고, 진로와 이어 생각할 수 있다.', steps:[['ix','top','2학기 안내','한 학기를 돌아봅니다']], out:'포트폴리오' }
};
var CAL = {
  A:'10/14 U01|10/15 U03|10/16 U04|10/21 D1|10/22 D2|10/23 D3|10/28 D4|10/29 P1|10/30 P2|11/4 P3|11/5 P4|11/6 U06|11/11 U07a|11/12 S1|11/13 S2|11/18 S3|11/20 S4|11/25 S4|11/26 S5|11/27 U07b|12/2 UX|12/3 UX|12/4 EX|12/9 EX|12/16 MK|12/17 MK|12/18 MK|12/23 MF|12/24 MF|12/30 END',
  D:'10/12 U01|10/13 U03|10/16 U04|10/19 D1|10/23 D2|10/26 D3|10/27 D4|10/30 P1|11/2 P2|11/3 P3|11/6 P4|11/9 U06|11/10 U07a|11/13 S1|11/16 S2|11/17 S3|11/20 S4|11/23 S4|11/24 S4|11/27 S5|11/30 U07b|12/1 UX|12/4 UX|12/7 EX|12/8 EX|12/18 MK|12/21 MF|12/22 MF|12/28 END|12/29 END',
  E:'10/12 U01|10/13 U03|10/15 U04|10/19 D1|10/22 D2|10/26 D3|10/27 D4|10/29 P1|11/2 P2|11/3 P3|11/5 P4|11/9 U06|11/10 U07a|11/12 S1|11/16 S2|11/17 S3|11/23 S4|11/24 S4|11/26 S5|11/30 U07b|12/1 UX|12/3 UX|12/7 EX|12/8 EX|12/17 MK|12/21 MF|12/22 MF|12/24 MF|12/28 END|12/29 END'
};
var OFF = { '10/20':'전국연합학력평가', '11/19':'대학수학능력시험', '12/10':'2차 정기고사', '12/11':'2차 정기고사', '12/14':'2차 정기고사', '12/15':'2차 정기고사' };
var PAGES = { u2:'https://richee-pc.github.io/AI_cs/unit2.html', u4:'https://richee-pc.github.io/AI_cs/unit4.html', ix:'https://richee-pc.github.io/AI_cs/index.html' };
var ORDER = ['U01','U03','U04','D1','D2','D3','D4','P1','P2','P3','P4','U06','U07a','S1','S2','S3','S4','S5','U07b','UX','EX','MK','MF','END'];
var NAME = { A:'인기A', D:'인기D', E:'인기E' }, BACK = { '인기A':'A', '인기D':'D', '인기E':'E' };
var WD = '일월화수목금토';

function toDate(md){ var p = md.split('/'); return new Date(2026, +p[0]-1, +p[1]); }
function list(c){ return (CAL[c] || '').split('|').filter(Boolean).map(function(x){ var p = x.split(' '); return { md:p[0], d:toDate(p[0]), id:p[1] }; }); }
function today(){
  var t = new Date(); t.setHours(0,0,0,0);
  var q = location.search.match(/[?&]d=(\d{1,2}\/\d{1,2})/); if(q) t = toDate(q[1]);     /* 시험용: ?d=10/21 */
  return t;
}
function getCls(){
  var c = '';
  try{
    c = localStorage.getItem('ai_plan_cls') || '';
    if(!c) ['ai_u4_v1','ai_u2_v1'].some(function(k){ var o = JSON.parse(localStorage.getItem(k) || '{}'); if(o && BACK[o.cls]){ c = BACK[o.cls]; return true; } });
  }catch(e){}
  return NAME[c] ? c : '';
}
function setCls(c){
  try{
    localStorage.setItem('ai_plan_cls', c);
    ['ai_u2_v1','ai_u4_v1'].forEach(function(k){ var o = JSON.parse(localStorage.getItem(k) || '{}'); if(o && typeof o === 'object'){ o.cls = NAME[c]; localStorage.setItem(k, JSON.stringify(o)); } });
  }catch(e){}
}
function datesOf(c, id){ return list(c).filter(function(x){ return x.id === id; }); }
function home(id){ return LES[id].steps[0][0]; }
function stepUrl(id, s){ return PAGES[s[0]] + '?l=' + id + (s[1] === 'top' ? '' : '#' + s[1]); }
function openUrl(id){ return PAGES[home(id)] + '?l=' + id; }

var W1 = new Date(2026, 7, 10);
function weekNo(d){ return Math.floor((d - W1) / 864e5 / 7) + 1; }
function weekRange(n){
  var a = new Date(W1.getTime() + (n - 1) * 7 * 864e5), b = new Date(a.getTime() + 4 * 864e5);
  return (a.getMonth()+1) + '/' + a.getDate() + '(월) ~ ' + (b.getMonth()+1) + '/' + b.getDate() + '(금)';
}
function weekCls(n){ return 'wk' + (n % 4); }
/* 주마다 색 네 가지를 돌려 씁니다 · 주차 이름은 둥근 강조 글꼴(AIPop) */
var WCSS = '\
:root{--w0:#E4EEFF; --w0t:#2E62C9; --w1:#DDF4EA; --w1t:#137352; --w2:#FFEEDC; --w2t:#A9520B; --w3:#EFE8FF; --w3t:#6544B8}\
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--w0:#16294A; --w0t:#8DB8FF; --w1:#0F3326; --w1t:#6FDCAE; --w2:#3A2610; --w2t:#FFB877; --w3:#261C45; --w3t:#C2ADFF}}\
:root[data-theme="dark"]{--w0:#16294A; --w0t:#8DB8FF; --w1:#0F3326; --w1t:#6FDCAE; --w2:#3A2610; --w2t:#FFB877; --w3:#261C45; --w3t:#C2ADFF}\
.wk0{--wb:var(--w0); --wt:var(--w0t)} .wk1{--wb:var(--w1); --wt:var(--w1t)} .wk2{--wb:var(--w2); --wt:var(--w2t)} .wk3{--wb:var(--w3); --wt:var(--w3t)}\
.wkname{font-family:var(--pop); font-weight:800; letter-spacing:.01em; color:var(--wt)}\
';
(function(){ var st = document.createElement('style'); st.textContent = WCSS; (document.head || document.documentElement).appendChild(st); })();

window.AIL = { LES:LES, CAL:CAL, OFF:OFF, ORDER:ORDER, NAME:NAME, WD:WD, list:list, today:today, getCls:getCls, setCls:setCls,
  datesOf:datesOf, home:home, stepUrl:stepUrl, openUrl:openUrl, toDate:toDate, weekNo:weekNo, weekRange:weekRange, weekCls:weekCls };

/* ══════════════════════════════════════════════════════════════
   단원 쪽 «차시 탭» — <div id="lessonBar" data-page="u2"></div> 자리에 붙습니다.
   차시를 고르면 그 차시에 쓰는 구획만 보이고, «오늘 할 순서»가 번호로 나옵니다.
   ══════════════════════════════════════════════════════════════ */
var CSS = '\
.lbar{background:var(--white); border-bottom:1px solid var(--line); box-shadow:var(--sh)}\
.lbar .wrap{padding-top:12px; padding-bottom:12px}\
.lbhead{display:flex; flex-wrap:wrap; align-items:center; gap:8px 12px; margin-bottom:9px}\
.lbhead b{font-family:var(--disp); font-weight:700; font-size:1.0625rem; color:var(--ink)}\
.lbhead .pick button{font-size:.8125rem; padding:6px 12px}\
.lbhead .hintx{font-size:.8438rem; color:var(--muted)}\
.ltabs{display:flex; gap:7px; overflow-x:auto; padding:3px 2px 6px; scrollbar-width:thin}\
.ltab{flex:none; display:flex; flex-direction:column; align-items:flex-start; gap:1px; font-family:var(--sans); cursor:pointer;\
  background:var(--tint); border:2px solid var(--line); border-radius:14px; padding:7px 12px; color:var(--ink); text-align:left; transition:.15s}\
.ltab i{font-style:normal; font-size:.6875rem; font-weight:800; color:var(--muted); font-variant-numeric:tabular-nums}\
.ltab b{font-size:.875rem; font-weight:800; color:var(--blue-d); white-space:nowrap}\
.ltab:hover{border-color:var(--blue-l)}\
.ltab[aria-selected="true"]{background:var(--fill); border-color:var(--fill)}\
.ltab[aria-selected="true"] b, .ltab[aria-selected="true"] i{color:var(--on-fill)}\
.ltab.today{box-shadow:0 0 0 3px var(--warm)}\
.ltab.past{opacity:.6}\
.ltab.all{justify-content:center}\
.ltab[class*="wk"]{background:var(--wb); border-color:color-mix(in srgb,var(--wt) 35%,transparent)}\
.ltab[class*="wk"] b{color:var(--wt)}\
.ltab[class*="wk"][aria-selected="true"]{background:var(--fill); border-color:var(--fill)}.ltab[class*="wk"][aria-selected="true"] b, .ltab[class*="wk"][aria-selected="true"] i{color:var(--on-fill)}\
.lwk{flex:none; align-self:stretch; display:flex; flex-direction:column; justify-content:center; align-items:center;\
  min-width:46px; border-radius:12px; padding:4px 8px; background:var(--wb); border:2px dashed color-mix(in srgb,var(--wt) 45%,transparent); line-height:1.15}\
.lwk b{font-family:var(--pop); font-weight:800; font-size:.9375rem; color:var(--wt)}\
.lwk i{font-style:normal; font-size:.625rem; font-weight:800; color:var(--wt); opacity:.85}\
.lwk.now{border-style:solid; box-shadow:0 0 0 2px var(--wt)}\
.lwk.now i{opacity:1}\
.ltab:focus-visible{outline:2px solid var(--ink); outline-offset:2px}\
.lpanel{margin:22px auto 0; max-width:min(94vw,64rem); padding:0 22px}\
.lpcard{position:relative; background:var(--white); border:2px solid var(--fill); border-radius:24px; padding:22px 24px 20px; box-shadow:var(--sh2)}\
.lpcard .when{display:inline-block; font-size:.8125rem; font-weight:800; color:#fff; background:var(--warm); border-radius:99px; padding:3px 12px; margin-right:6px}\
.lpcard .when.n{background:var(--fill)}\
.lpcard .tg{font-size:.8438rem; font-weight:800; color:var(--blue-d)}\
.lpcard h2{margin:8px 0 2px; font-size:clamp(1.5rem,4vw,2.125rem)}\
.lpcard .pg{font-size:.9062rem; color:var(--muted); font-weight:600; margin:0 0 10px}\
.lpcard .gl{font-size:1rem; color:var(--ink); margin:0 0 14px; line-height:1.7}\
.lpcard .gl::before{content:"오늘의 목표 "; font-weight:800; color:var(--blue-d)}\
.lsteps{display:grid; gap:8px; margin:0 0 14px; counter-reset:st}\
.lstep{display:flex; gap:13px; align-items:center; text-decoration:none; color:var(--ink); background:var(--tint);\
  border:2px solid var(--line); border-radius:15px; padding:11px 14px; transition:.15s}\
.lstep:hover{border-color:var(--fill); background:var(--blue-xl); transform:translateX(3px)}\
.lstep::before{counter-increment:st; content:counter(st); flex:none; width:32px; height:32px; border-radius:50%;\
  background:var(--fill); color:var(--on-fill); font-family:var(--disp); font-weight:700; display:grid; place-items:center}\
.lstep b{display:block; font-size:1rem; font-weight:800; color:var(--blue-d)}\
.lstep span{display:block; font-size:.875rem; color:var(--ink2); line-height:1.5}\
.lstep em{margin-left:auto; flex:none; font-style:normal; font-size:.75rem; font-weight:800; color:var(--muted)}\
.linfo{display:grid; grid-template-columns:repeat(auto-fit,minmax(min(230px,100%),1fr)); gap:9px}\
.linfo>div{background:var(--tint); border-radius:13px; padding:10px 14px; font-size:.9062rem; color:var(--ink2); line-height:1.6}\
.linfo b{display:block; font-size:.8125rem; color:var(--blue-d)}\
.lext{display:flex; flex-wrap:wrap; gap:7px; margin:0 0 12px}\
.lext a{font-size:.8438rem; font-weight:700; color:var(--blue-d); background:var(--blue-xl); border:1px solid var(--blue-l); border-radius:99px; padding:5px 13px; text-decoration:none}\
.lpfoot{display:flex; flex-wrap:wrap; gap:8px; margin-top:14px}\
.lpfoot button, .lpfoot a{font-family:var(--sans); font-size:.875rem; font-weight:800; border-radius:99px; padding:8px 16px; cursor:pointer; text-decoration:none;\
  border:1px solid var(--line); background:var(--white); color:var(--blue-d)}\
body.lfocus .hero{display:none}\
section.lhide{display:none!important}\
.fcard.lhide, details.lhide{display:none!important}\
.lstepflash{animation:lflash 1.4s ease}\
@keyframes lflash{0%,100%{box-shadow:none} 30%{box-shadow:0 0 0 5px var(--warm)}}\
';

function mount(){
  var host = document.getElementById('lessonBar'); if(!host) return;
  var page = host.getAttribute('data-page');
  var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
  var ids = ORDER.filter(function(id){ return home(id) === page; });
  var cls = getCls(), t0 = today(), cur = null;
  var panel = document.createElement('div'); panel.className = 'lpanel'; panel.id = 'lessonPanel'; panel.hidden = true;
  host.parentNode.insertBefore(panel, host.nextSibling);

  function whenOf(id){
    if(!cls) return '';
    return datesOf(cls, id).map(function(x){ return x.md; }).join(' · ');
  }
  function todayId(){
    if(!cls) return null;
    var hit = list(cls).filter(function(x){ return +x.d === +t0; })[0];
    return hit ? hit.id : null;
  }
  function nextId(){
    if(!cls) return null;
    var n = list(cls).filter(function(x){ return +x.d >= +t0; })[0];
    return n ? n.id : null;
  }
  function drawBar(){
    var tid = todayId(), nid = nextId();
    var past = function(id){ var ds = datesOf(cls, id); return cls && ds.length && ds.every(function(x){ return +x.d < +t0; }); };
    host.className = 'lbar';
    host.innerHTML = '<div class="wrap"><div class="lbhead"><b>📌 차시별로 열기</b>' +
      '<span class="pick" id="lbCls">' + ['A','D','E'].map(function(c){
        return '<button type="button" data-c="' + c + '" aria-pressed="' + (c === cls ? 'true' : 'false') + '">' + NAME[c] + '</button>'; }).join('') + '</span>' +
      '<span class="hintx">' + (cls ? (tid && home(tid) === page ? '노란 테두리가 오늘 수업입니다' : (nid ? '다음 수업 — <a href="' + (home(nid) === page ? '?l=' + nid : openUrl(nid)) + '" style="font-weight:800">' + LES[nid].tag + ' (' + datesOf(cls, nid).filter(function(x){ return +x.d >= +t0; })[0].md + ') 열기</a>' : '')): '우리 반을 고르면 날짜가 나옵니다') + '</span></div>' +
      '<div class="ltabs" role="tablist" aria-label="차시">' +
      '<button type="button" class="ltab all" role="tab" data-id="" aria-selected="' + (cur ? 'false' : 'true') + '"><b>전체 보기</b></button>' +
      (function(){ var last = -1, wNow = weekNo(t0); return ids.map(function(id){
        var L = LES[id], ds = cls ? datesOf(cls, id) : [], w = ds.length ? weekNo(ds[0].d) : -1, sep = '';
        if(w > 0 && w !== last){ sep = '<span class="lwk ' + weekCls(w) + (w === wNow ? ' now' : '') + '" title="' + weekRange(w) + '"><b>' + w + '주</b><i>' + (w === wNow ? '이번 주' : (ds[0].d.getMonth()+1) + '월') + '</i></span>'; last = w; }
        return sep + '<button type="button" class="ltab' + (w > 0 ? ' ' + weekCls(w) : '') + (id === tid ? ' today' : '') + (past(id) ? ' past' : '') + '" role="tab" data-id="' + id + '" aria-selected="' + (id === cur ? 'true' : 'false') + '">' +
          '<i>' + (whenOf(id) || '&nbsp;') + '</i><b>' + (L.short || L.tag) + '</b></button>';
      }).join(''); })() + '</div></div>';
  }
  function anchorSection(a){
    var el = document.getElementById(a); if(!el) return null;
    return el.tagName === 'SECTION' ? el : el.closest('section');
  }
  function apply(){
    var secs = [].slice.call(document.querySelectorAll('main section, body > section'));
    document.querySelectorAll('.lhide').forEach(function(e){ e.classList.remove('lhide'); });
    if(!cur){ document.body.classList.remove('lfocus'); panel.hidden = true; return; }
    var L = LES[cur], mine = L.steps.filter(function(s){ return s[0] === page; });
    var keep = mine.map(function(s){ return anchorSection(s[1]); }).filter(Boolean);
    secs.forEach(function(s){ if(keep.indexOf(s) < 0) s.classList.add('lhide'); });
    /* 데이터 탐구: 그 차시 카드(와 이야기)만 */
    var ex = document.getElementById('explore');
    if(ex && keep.indexOf(ex) >= 0){
      var want = mine.map(function(s){ return s[1]; });
      var cards = [].slice.call(ex.querySelectorAll('.fcard[id^="ex"]'));
      if(want.some(function(w){ return /^ex\d$/.test(w); })) cards.forEach(function(c){ if(want.indexOf(c.id) < 0) c.classList.add('lhide'); });
      else cards.forEach(function(c){ c.classList.add('lhide'); });
      var story = document.getElementById('story');
      if(story){ if(want.indexOf('story') < 0) story.classList.add('lhide'); else story.open = true; }
    }
    document.body.classList.add('lfocus');
    var ds = cls ? datesOf(cls, cur) : [], isT = ds.some(function(x){ return +x.d === +t0; });
    var nOf = function(){ var i = ids.indexOf(cur); return [ids[i-1], ids[i+1]]; }();
    panel.hidden = false;
    panel.innerHTML = '<div class="lpcard">' +
      (isT ? '<span class="when">오늘 수업</span>' : (ds.length ? '<span class="when n">' + NAME[cls] + ' ' + ds.map(function(x){ return x.md + '(' + WD[x.d.getDay()] + ')'; }).join(' · ') + '</span>' : '')) +
      '<span class="tg">' + L.tag + '</span>' +
      '<h2>' + L.title + '</h2>' + (L.page ? '<p class="pg">' + L.page + '</p>' : '') +
      '<p class="gl">' + L.goal + '</p>' +
      '<p class="mini-h" style="margin:0 0 8px">오늘 할 순서 — 차례대로 누르세요</p>' +
      '<div class="lsteps">' + L.steps.map(function(s){
        var here = s[0] === page;
        return '<a class="lstep" href="' + (here ? '#' + s[1] : stepUrl(cur, s)) + '"' + (here ? ' data-go="' + s[1] + '"' : '') + '><span><b>' + s[2] + '</b><span>' + s[3] + '</span></span>' +
          (here ? '' : '<em>' + (s[0] === 'u2' ? 'Ⅱ단원 쪽 ↗' : s[0] === 'u4' ? 'Ⅳ단원 쪽 ↗' : '안내 쪽 ↗') + '</em>') + '</a>'; }).join('') + '</div>' +
      (L.ext ? '<div class="lext">' + L.ext.map(function(e){ return '<a href="' + e[0] + '" target="_blank" rel="noopener">' + e[1] + ' ↗</a>'; }).join('') + '</div>' : '') +
      '<div class="linfo"><div><b>준비물</b>교과서 · 충전한 노트북' + (L.bring ? ' · ' + L.bring : '') + '</div>' + (L.out ? '<div><b>끝나면 낼 것</b>' + L.out + '</div>' : '') + '</div>' +
      '<div class="lpfoot">' + (nOf[0] ? '<button type="button" data-id="' + nOf[0] + '">◀ ' + LES[nOf[0]].tag + '</button>' : '') +
        '<button type="button" data-id="">전체 보기</button>' +
        (nOf[1] ? '<button type="button" data-id="' + nOf[1] + '">' + (LES[nOf[1]].short || LES[nOf[1]].tag) + ' ▶</button>' : '') +
        '<a href="https://richee-pc.github.io/AI_cs/plan.html">📅 수업 계획</a></div></div>';
  }
  function choose(id, push){
    cur = id && LES[id] ? id : null;
    drawBar(); apply();
    if(push !== false){
      var u = location.pathname + (cur ? '?l=' + cur : '?l=all');
      try{ history.replaceState(null, '', u); }catch(e){}
    }
    /* 고른 탭이 없으면 «이번 주» 딱지가 보이게 가로로 굴림 */
    var strip = host.querySelector('.ltabs'), sel = host.querySelector(cur ? '.ltab[aria-selected="true"]' : '.lwk.now');
    if(strip && sel) strip.scrollLeft = Math.max(0, sel.offsetLeft - strip.offsetLeft - 70);
  }
  host.addEventListener('click', function(e){
    var c = e.target.closest('#lbCls button[data-c]');
    if(c){ cls = c.getAttribute('data-c'); setCls(cls); var tid = todayId(); choose(tid && home(tid) === page ? tid : cur); return; }
    var b = e.target.closest('.ltab'); if(b){ choose(b.getAttribute('data-id')); window.scrollTo({ top:0, behavior:'smooth' }); }
  });
  panel.addEventListener('click', function(e){
    var b = e.target.closest('.lpfoot button[data-id]'); if(b){ choose(b.getAttribute('data-id')); window.scrollTo({ top:0, behavior:'smooth' }); return; }
    var a = e.target.closest('.lstep[data-go]');
    if(a){ var el = document.getElementById(a.getAttribute('data-go')); if(el){ e.preventDefault(); el.scrollIntoView({ behavior:'smooth', block:'start' }); el.classList.remove('lstepflash'); void el.offsetWidth; el.classList.add('lstepflash'); } }
  });
  /* 처음 열 때: ?l= → 그 차시 · 없으면 오늘 수업이 이 쪽에 있을 때만 자동으로 */
  var q = location.search.match(/[?&]l=([A-Za-z0-9]+)/), start = null;
  if(q && q[1] !== 'all') start = LES[q[1]] ? q[1] : null;
  else if(!q){ var tid0 = todayId(); if(tid0 && home(tid0) === page) start = tid0; }
  choose(start, false);
  if(location.hash){ var h = document.getElementById(location.hash.slice(1)); if(h) setTimeout(function(){ h.scrollIntoView({ block:'start' }); }, 60); }
}
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
})();
