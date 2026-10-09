/* ══════════════════════════════════════════════════════════════
   차시 정보 — plan.html · unit2.html · unit4.html 이 함께 씁니다(여기 한 곳만 고치면 됨).
   원본 날짜: 「2026학년도 2학기 인공지능 기초 분반별 수업일정표_수정안.xlsx」

   LES[id]  kind: u2(Ⅱ단원) · ex(데이터 탐구) · pj(프로젝트) · pa(수행평가) · et(정리·전시)
            lt: 신호등(n AI 없이 · g 초록 · y 노랑)
            steps: 오늘 열 곳을 «순서대로» — [쪽, 자리(id), 이름, 할 일]
                   쪽: u2 = unit2.html · u4 = unit4.html · ix = index.html · lb = labs.html · md = models.html
                   첫 칸의 쪽이 그 차시의 «집»입니다(그 쪽의 차시 탭에 나옴).
            ext: 바깥 누리집 [주소, 이름]
            flow: (선택) 50분 흐름 [[분, 할 일], …] — 차시 탭 카드와 수업 계획 쪽에 나옵니다
   CAL[반]  «날짜 수업id» 를 | 로 이음 · OFF: 모든 반이 수업 없는 날
   ?l=D1 로 열면 그 차시 탭이 열리고, ?l=all 이면 전체가 보입니다.
   ══════════════════════════════════════════════════════════════ */
(function(){
'use strict';
var LES = {
  U00:{ short:'고사 확인 · 사전 검사', kind:'et', tag:'Ⅱ 시작 준비', title:'1차 정기고사 확인 · 연구 수업 사전 검사 · 동의서', page:'Ⅱ단원 첫 시간 · 교과서 진도 없음 · 다음 두 차시에 Ⅱ-01 · 03 · 04 → 오렌지3 · Ⅱ-05',
    goal:'1차 정기고사 결과를 확인하고, 이어지는 AI 집중 수업(데이터 탐구 4 · 프로젝트 4)의 흐름을 알며, 사전 검사와 동의서를 마칠 수 있다.',
    flow:[[12,'1차 정기고사 답안 · 점수 확인 · 이의 신청 안내'],[8,'Ⅱ단원과 AI 집중 수업 8차시 안내 — 소단원 한눈에 · 우리 반 수업 계획'],[10,'연구 설명문 함께 읽기(교실 게시) → 동의서 배부 — 학생 + 보호자 서명, 다음 시간까지 제출'],[15,'연구 사전 검사 — 구글 설문 · 3종 · 1~5점 · 약 15분'],[5,'다음 시간 예고 — 머핀과 치와와, 규칙으로 가를 수 있을까?']],
    steps:[['u2','irb','연구 수업 안내 · 설명문','«설명문 전체 보기»로 읽고, 동의서는 학생 + 보호자 서명 → 다음 시간까지'],['u2','goal','Ⅱ단원 미리 보기','성취기준 6개와 단원 흐름을 훑어봅니다'],['u2','map','소단원 한눈에','일곱 걸음 중 다음 두 차시에 배울 곳(Ⅱ-01 · 03 · 04 · 05)을 찾아봅니다']],
    ext:[['https://forms.gle/Tnbh7QWMFvyeDY6r9','📝 사전 검사(약 15분)']],
    out:'사전 검사 응답 · 동의서(학생 + 보호자 서명)는 다음 시간까지 제출 — 참여하지 않아도 수업은 똑같이 하고 불이익은 없습니다' },
  U01:{ short:'Ⅱ-01·03·04', kind:'u2', tag:'Ⅱ-01 · 03 · 04', title:'기계학습 · 학습 유형 · 알고리즘 — 01 → 03 → 04', page:'교과서 60~63쪽 · 84~99쪽 · 성취기준 02-01 · 02-03 · Ⅱ-01 데이터 부분(63~69쪽)은 데이터 탐구 ②, Ⅱ-02는 데이터 탐구 ③에서',
    goal:'전통적 프로그래밍과 기계학습의 차이를 말하고, 문제에 맞는 학습 유형을 구분하며, 분류 · 예측 · 군집 알고리즘이 각각 어떻게 답을 정하는지 설명할 수 있다.',
    flow:[[2,'도입 — 머핀과 치와와, 규칙으로 가를 수 있을까?'],[8,'Ⅱ-01 · 규칙 vs 데이터(그림 Ⅱ-1) · 스팸 두 방식(표 Ⅱ-1) · 다섯 단계(그림 Ⅱ-3) · 파라미터'],[12,'Ⅱ-03 · 유형 지도 · 독립 · 종속변수 · 미로 로봇(탐험과 이용) · 학습 유형 12문제 채점'],[20,'Ⅱ-04 · 알고리즘 다섯 가지 → 로지스틱 회귀 · 의사결정트리 · k-평균 체험 → k-최근접 이웃 · 선형 회귀 직접 움직이기'],[5,'한눈에 비교 · 고르기 도우미'],[3,'정리 — 활동 기록지 ② · ③ · ④']],
    steps:[['u2','learn01','교과서로 배우기 · Ⅱ-01 앞부분','그림 Ⅱ-1 → 스팸 두 방식 → 다섯 단계 → 파라미터 (좋은 데이터 · 수집 · 편향은 데이터 탐구 ②에서)'],['u2','learn03','교과서로 배우기 · Ⅱ-03','유형 지도 → 독립 · 종속변수 → 미로 로봇(탐험과 이용)'],['u2','kinds','학습 유형 고르기','12문제 «채점하기»(활동 기록지 ②)'],['u2','learn04','교과서로 배우기 · Ⅱ-04','알고리즘 다섯 가지 → 로지스틱 회귀 · 의사결정트리 · k-평균 체험 → 30초 확인'],['u2','algo','k-최근접 이웃 · 선형 회귀','E를 끌어 보고, 경사하강법 단추를 눌러 봅니다'],['u2','models','모델 도감 · 고르기 도우미','한눈에 비교 → 다섯 걸음으로 고르기 (오렌지3는 다음 차시 «블록으로 설계»에서)'],['u2','algolab','알고리즘 실험실','먼저 끝나면 — 결정 경계 · 회귀 과적합 · 용어 풀이 · 수학'],['u2','hand','활동 기록지','② · ③ · ④ 칸을 확인합니다'],['md','list','AI 모델 도감','교과서 다섯 모델 말고도 랜덤 포레스트 · SVM · 신경망을 찾아봅니다']],
    out:'학습 유형 고르기 채점 · k-최근접 이웃 · 선형 회귀 체험 — 활동 기록지 ② · ③ · ④' },
  U05:{ short:'Ⅱ-05 블록 → 파이썬', kind:'u2', tag:'Ⅱ-05', title:'블록으로 설계하고 파이썬으로 완성하다 — 모델 구현', page:'교과서 100~115쪽 · 성취기준 02-04 · 교과서 예시(청년 인구 예측 · 붓꽃 분류) 그대로',
    goal:'데이터 분리 → 모델 학습 → 모델 평가 과정을 오렌지3 블록으로 설계하고 같은 과정을 파이썬 코드로 구현하며, 예측 · 분류 모델의 성능 지표(MSE · R² · 정확도 · 정밀도 · 재현율)를 해석할 수 있다.',
    flow:[[3,'도입 · 구현 과정 애니메이션(101~103쪽) — 데이터 분리 → 학습 → 평가 → 수정'],[12,'블록으로 설계 · 오렌지3 — ① 청년 인구: File → Data Sampler → Linear Regression → Test and Score(MSE · R²) ② 붓꽃: File → Data Sampler → kNN(+Tree · Logistic) → Confusion Matrix'],[5,'블록 ↔ 코드 짝짓기 — Data Sampler = train_test_split · 모델 블록 = fit() · Test and Score = predict() · score()'],[22,'파이썬으로 완성 · 노트북 02(104~112쪽) — 청년 인구 선형 회귀(계수 · MSE · R² 약 0.64) → 붓꽃 kNN(오분류표 · 정확도 · 정밀도 · 재현율) → 오렌지3 점수와 견주기'],[5,'성능 지표 정리 · 예제 2 클래식 음악 오분류표로 정확도 · 정밀도 · 재현율 계산(111쪽)'],[3,'정리 · «블록과 코드, 언제 무엇을 쓸까?» 한 줄']],
    steps:[['u2','blocks','블록으로 설계 → 파이썬으로 완성','설계도 ① 청년 인구 · ② 붓꽃 → 블록 ↔ 코드 짝짓기 → 노트북 02 → 점수 견주기'],['u2','learn05','교과서로 배우기 · Ⅱ-05','구현 과정 애니메이션 → 성능 지표 → 예제 2 클래식 음악 오분류표'],['u2','implement','구현 아홉 걸음 · 평가 해석','코드와 위젯 짝 → 점수 계산기 → 해석 함정'],['u2','hand','활동 기록지','«블록과 코드» 한 줄과 점수 견주기를 남깁니다'],['lb','labs','코랩 실습실','먼저 끝나면 04 다이아몬드(114~115쪽 활동)']],
    ext:[['https://colab.research.google.com/github/richee-pc/AI_cs/blob/main/notebooks/02_model.ipynb','▶ 코랩 · 02 예측 · 분류(교과서 104~112쪽)'],['https://colab.research.google.com/github/richee-pc/AI_cs/blob/main/notebooks/04_diamonds.ipynb','▶ 코랩 · 04 다이아몬드(114~115쪽 활동)']],
    out:'오렌지3 설계도 두 개의 점수 · 노트북 02 사본 — 오렌지3 점수와 견준 한 줄', bring:'오렌지3 설치된 노트북 · 코랩(학교 구글 계정)' },
  D1:{ kind:'ex', tag:'데이터 탐구 ①', title:'문제 정하기 — 무엇이 진짜 문제인가', page:'① 문제 인식 및 정의 → ② 데이터 관점 탐구 설계', lt:['n'],
    goal:'여러 문제가 얽힌 상황에서 데이터로 확인할 수 있는 문제를 정의하고, 문제 해결 가설과 필요한 데이터를 계획할 수 있다.',
    steps:[['u2','story','문제 상황 읽기','「그 여름, 우리 학교에서 생긴 일」 — 문제라고 생각하는 문장에 밑줄'],['u2','ex1','오늘 흐름과 가설 틀','나의 문제 정의 → 모둠 정의문 → 가설과 필요한 데이터']],
    out:'활동지 ①(나의 문제 정의 · 가설) · 활동지 ② 탐구 질문 정의서 앞부분' },
  D2:{ kind:'ex', tag:'데이터 탐구 ②', title:'데이터 찾기 — 믿을 수 있는 데이터인지 따진다', page:'② 데이터 관점 탐구 설계 → ③ 준비 · 교과서 Ⅱ-01 63~69쪽(좋은 데이터 · 확보 · 편향)을 이 시간에 배웁니다', lt:['n'],
    goal:'가설 해결에 적합한 데이터를 수집해 적합성·신뢰성·충분성·윤리 기준으로 평가하고, 데이터 전처리 기준을 스스로 세울 수 있다.',
    flow:[[2,'지난 차시 돌아보기 — 문제 정의문 피드백'],[6,'빅데이터 특징 떠올리기 + 교과서 Ⅱ-01 · 좋은 데이터 네 기준(63쪽) · 데이터 편향(66쪽) — 평가 체크리스트와 짝짓기'],[15,'데이터 찾기 — 확보하는 두 가지 길 · 출처와 사용 제한(64~67쪽) → 검색어로 수집 → 출처 · 속성표'],[13,'평가 체크리스트 11문항 → 탐구 질문 정의서 완성 → 계획 승인'],[10,'전처리 기준 세우기 — 기준마다 변환 · 통합 · 정제 · 축소(Ⅱ-02 71쪽) 이름 붙이기'],[4,'한 줄 공유 · 다음 차시 안내']],
    steps:[['u2','ex2','데이터 찾기와 평가','검색어 카드 → 출처 기록 → 평가 체크리스트 11문항 → 전처리 기준(변환 · 통합 · 정제 · 축소)'],['u2','learn01','교과서로 배우기 · Ⅱ-01 데이터 부분','좋은 데이터 네 기준 → 데이터 확보 두 길 · 출처와 사용 제한 → 편향 — 체크리스트와 짝지어 봅니다'],['u2','learn02','Ⅱ-02 · 전처리 네 가지','전처리 기준에 변환 · 통합 · 정제 · 축소 이름을 붙입니다']],
    ext:[['https://www.data.go.kr','공공데이터포털'],['https://kosis.kr','KOSIS'],['https://data.kma.go.kr','기상자료개방포털']],
    out:'활동지 ②(정의서 완성) · ③(출처와 평가 11문항) · ④ 전처리 기준 · 수집 데이터' },
  D3:{ kind:'ex', tag:'데이터 탐구 ③', title:'치우고 분석하기 — 해석은 내가 먼저', page:'③ AI 보조 데이터 탐구 · 교과서 Ⅱ-02 70~83쪽(이상치 · 결측치 · 상자그림 · 상관계수)을 이 시간에 배웁니다', lt:['g'],
    goal:'세운 기준에 따라 데이터를 전처리하고, 시각화하여 데이터의 범위 안에서 해석하며, 모둠원의 해석을 모아 공동 해석을 도출할 수 있다.',
    flow:[[5,'이 그래프, 믿어도 될까? — 시각화 오류 사례 + 상자그림으로 이상치 보기(Ⅱ-02 83쪽 IQR)'],[10,'전처리 — AI Agent 사전 프롬프팅 → 세운 기준대로 결측치 · 이상치 처리(71~76쪽) → 변경 내역 확인'],[20,'역할별 시각화 · 상관 분석(Ⅱ-02 상관계수 78~79쪽) → AI 없이 1차 해석 → 필요할 때 AI 탐구 보조'],[10,'공동 해석 → 1차 자기 · 동료평가'],[5,'공동 해석 한 문장 공유 · 다음 차시 안내']],
    steps:[['u2','ex3','오늘 흐름','전처리 → 시각화와 1차 해석(AI 없이) → 공동 해석 → 1차 자기·동료평가'],['u2','prep','전처리 체험','코랩으로 직접 치울 때 순서를 확인합니다'],['u2','learn02','교과서로 배우기 · Ⅱ-02','이상치와 결측치 → 상자그림 · IQR → 상관계수 — 내 데이터에 바로 씁니다'],['u2','lab','코랩 노트북 ①','내 데이터로 그래프를 그릴 때 엽니다']],
    ext:[['https://colab.research.google.com/github/richee-pc/AI_cs/blob/main/notebooks/13_unit2_02_preprocessing.ipynb','코랩 13 · Ⅱ-02 교과서 실습 전체(먼저 끝나면 · 집에서)']],
    out:'그래프 · 활동지 ④(1차 해석) · 공동 해석 · AI 사용 기록 · 1차 자기·동료평가', bring:'코랩(학교 구글 계정)' },
  D4:{ kind:'ex', tag:'데이터 탐구 ④', title:'AI 반문 받고 발표 — 내 판단을 지킨다', page:'④ 해결안 검증 → ⑤ AI 티치백 성찰과 공유', lt:['y'],
    goal:'데이터에 근거한 해결안을 도출하고, AI의 반문을 비판적으로 검증하여 보완하며, 과정과 판단 근거를 발표와 구술로 설명할 수 있다.',
    steps:[['u2','ex4','해결안 · AI 반문 · 발표','해결안 초안(AI 없이) → 소크라틱 AI → 티치백 → 발표와 구술']],
    ext:[['https://forms.gle/n7BamjdjZyLfD44UA','📝 1차 사후 검사(데이터 탐구 4차시 끝 · 약 10분)']],
    out:'활동지 ⑤(해결안 · AI 반문 기록) · 발표자료 · 성찰 · 2차 자기·동료평가 · 1차 사후 검사' },
  P1:{ kind:'pj', tag:'프로젝트 ①', title:'무엇을 풀까 — 주제 정하기', page:'① AI 연계 문제 구체화 · 교과서 180~193쪽', lt:['n','y'],
    goal:'인공지능 서비스에서 지능 에이전트의 역할을 찾고, SDGs 문제 가운데 기계학습으로 풀 수 있는 부분을 구분해 실현 가능한 주제를 정할 수 있다.',
    steps:[['u4','learn41','교과서로 배우기 · Ⅳ-01','SDGs와 5P → AI for Good → 주제를 뽑아내는 길 → 30초 확인'],['u4','model','모형과 AI 신호등','오늘은 «혼자 먼저(AI 없이) → 모둠이 Co-Pilot과»'],['u4','p1','주제 정하기','17개 목표 → 나의 주제 제안서 → Co-Pilot → 주제 정의서'],['u4','sdgGame','교과서 활동 · 186~193쪽','세부 목표 · 분야별 AI와 SDG · SDG 주사위 여행 · 탐구 활동 1단계 조사 메모'],['u4','data','데이터 찾는 곳','우리 주제의 데이터가 있는지 확인합니다']],
    ext:[['https://colab.research.google.com/github/richee-pc/AI_cs/blob/main/notebooks/19_unit4_project.ipynb','코랩 19 · Ⅳ단원 교과서 전체']],
    out:'나의 주제 제안서(4항목) · 주제 정의서(활동지 ①) — 수행평가 ② 1단계 산출물' },
  P2:{ kind:'pj', tag:'프로젝트 ②', title:'어떻게 만들까 — 계획과 성공 기준', page:'② AI 모델 개발 계획 수립', lt:['g'],
    goal:'문제와 데이터의 특성에 맞춰 지도학습과 비지도학습을 비교해 학습 유형을 고르고, 측정할 수 있는 성공 기준을 넣은 계획을 세울 수 있다.',
    steps:[['u4','learn42','교과서로 배우기 · Ⅳ-02','협력 여섯 단계와 역할 → 기아 예측 예제 → 비판적으로 보기'],['u4','p2','계획과 성공 기준','지도·비지도 6문제 → 아는 것/모르는 것 → 탐구 보조 → 계획서와 성공 기준'],['u4','plan5','교과서 활동 · 195~196쪽','역할 분담표 → 수행 계획 다섯 단계(교과서 예시와 견주기) → 30초 빈칸'],['u2','models','모델 고르는 다섯 걸음','계획서 «학습 유형과 알고리즘» 칸의 근거로 씁니다']],
    ext:[['https://colab.research.google.com/github/richee-pc/AI_cs/blob/main/notebooks/19_unit4_project.ipynb','코랩 19 · Ⅳ단원 교과서 전체']],
    out:'개념 정리 기록 · 계획서(활동지 ②) · 다음 시간 전까지 데이터를 모둠 공유 폴더에' },
  P3:{ short:'프로젝트 ③', kind:'pj', tag:'프로젝트 ③', title:'오렌지3로 만들고 AI 반문으로 고치기', page:'③ 프로토타입 개발 → ④ 반복 개선 · Ⅱ-04 · 05에서 배운 모델 비교와 평가 해석을 우리 데이터에', lt:['n','y'],
    goal:'데이터 윤리를 점검한 데이터로 모델을 학습시키고 성능을 평가하며, AI의 반문을 테스트 결과로 검증하여 모델을 개선할 수 있다.',
    steps:[['lb','orange','오렌지3 따라 하기','막히면 7번(우리 팀 데이터 불러오기) · 2번(분류) · 6번(설정 바꾸며 최적 찾기)'],['u4','p3','오렌지3와 개선','데이터 점검 → 오렌지3 프로토타입 → 혼동 행렬 → AI 반문으로 개선'],['u4','data','학교 데이터','데이터를 못 올렸으면 여기서 고릅니다'],['u4','learn43','부록 선택 활동','스트레스 · 약수터 · 건강한 식사 — 어떤 지표로 잴까'],['u2','implement','평가 해석 함정 여섯','성능 평가 기록을 쓰기 전에 «기준선 · 과적합 · 재현율»을 다시 봅니다']],
    out:'오렌지3 워크플로 · 성능 평가 기록(④) · 회차별 변경 기록(⑤) · 1차 자기·동료평가', bring:'오렌지3 설치된 노트북' },
  P4:{ kind:'pj', tag:'프로젝트 ④', title:'발표하고 설명하고 돌아보기', page:'⑤ AI 지원 메타인지 성찰 및 발표', lt:['y'],
    goal:'과정과 결과를 근거와 함께 발표해 모델의 동작 원리와 학습 유형을 고른 이유를 구술로 설명하고, AI와 함께한 경험을 돌아볼 수 있다.',
    steps:[['u4','p4','발표 · 구술 · 성찰','개요 점검 → AI Agent 발표자료 → 2분 발표 → 구술 → 메타인지 성찰'],['u4','evalSheet','프로젝트 평가표 17항목 · 209쪽','자기 평가 → 다른 모둠 동료 평가 → 진단'],['u4','wrap4','Ⅳ 대단원 마무리 · 210쪽','자가 진단 → 개념도 빈칸 → ➊➋➌']],
    ext:[['https://forms.gle/LJ7CrHKBUDdF4Eqp6','📝 2차 사후 검사(프로젝트 4차시 끝 · 약 10분)']],
    out:'발표자료(마지막 장: 출처·AI 활용) · 메타인지 성찰 · 2차 자기·동료평가 · 2차 사후 검사', bring:'미리 써 온 발표 개요' },
  U67:{ short:'Ⅱ-06·07 신경망', kind:'u2', tag:'Ⅱ-06 · 07', title:'인공신경망과 딥러닝 구현', page:'교과서 116~139쪽 · 성취기준 02-05 · 02-06 · 수행평가 ② 바로 전 시간',
    goal:'퍼셉트론의 계산과 은닉층이 필요한 이유(XOR) · 손실함수와 오차 역전파를 설명하고, 코랩에서 케라스로 층을 쌓은 딥러닝 모델을 만들어 손실 그래프 · 과적합 · 정규화로 성능을 평가하며, 딥러닝과 다른 기계학습의 차이(성능 · 시간 · 특징 추출)를 비교할 수 있다.',
    flow:[[5,'생각 열기 — 1940년대 생각이 왜 2000년대에야? · 인공지능 ⊃ 기계학습 ⊃ 딥러닝'],[15,'Ⅱ-06 그림으로 — 퍼셉트론 0.6 · 활성화 함수 손잡이 · XOR 실패 → 은닉층 · 순전파/역전파 · 합성곱 실험'],[20,'코랩 17 ★ — 1-1 퍼셉트론 · 1-4 XOR → 독버섯 ❶~⓫ → 정규화(0.975 → 0.991)'],[10,'Ⅱ-07 정리 — 손실 그래프 · 과적합 · 딥러닝 vs 기계학습 · 30초 확인 · 다음 시간 수행평가 ② 준비']],
    steps:[['u2','learn06','교과서로 배우기 · Ⅱ-06','연표 → 퍼셉트론 그림 → 활성화 함수 → 신경망 · 역전파 그림 → CNN 실험 → 놀이터 기록지'],['u2','nn','퍼셉트론과 XOR','AND · OR 맞추기 → XOR 실패 → 은닉층 넣기'],['u2','learn07','교과서로 배우기 · Ⅱ-07','구현 순서 → 버섯 신경망 그림 → 손실 그래프 · 과적합 → 정규화 → 문제 해결 셋 → 딥러닝 vs 기계학습'],['u2','lab','코랩 노트북 17','Ⅱ-06 · 07 교과서 전체 — ★만 수업 시간에'],['u4','pa2','오렌지3 ↔ 코랩 대조표','다음 시간 수행평가 ②에서 씁니다'],['lb','labs','코랩 실습실','티처블 머신 쓰레기 · 새 소리 · 오렌지 감성 분석(131~137쪽)']],
    ext:[['https://colab.research.google.com/github/richee-pc/AI_cs/blob/main/notebooks/17_unit2_06_07_deeplearning.ipynb','코랩 17 · Ⅱ-06·07 전체'],['https://playground.tensorflow.org','텐서플로 놀이터(122쪽)']],
    out:'놀이터 기록지(1 · 2단계 손실) · 노트북 17 ★ 실행 확인(독버섯 정확도 · 정규화 뒤 정확도)', bring:'코랩(학교 구글 계정)' },
  S1:{ short:'수행② ① 코랩 재구현', kind:'pa', tag:'수행평가 ② · 1/4', title:'코랩 재구현', page:'요소 2 · 교과서 Ⅳ-02 기아 예측 예제(196~208쪽)와 같은 순서',
    goal:'오렌지3로 만든 우리 모델을 개인 코랩 노트북에서 불러오기 · 전처리 · 모델 정의 · 학습 네 단계로 다시 만들 수 있다.',
    flow:[[5,'수행평가 ② 안내 — 네 차시 일정 · 요소 2~4 · AI는 검색 · 요약만'],[8,'교과서 기아 예측 예제로 네 단계 훑기 — 우리 노트북과 같은 순서'],[32,'개인 노트북 — 우리 팀 데이터로 네 단계, 셀마다 오렌지3 위젯 · 담당 주석'],[5,'실행 확인 · 공유 링크 제출']],
    steps:[['u4','pa2','수행평가 ② 노트북 틀 · 대조표','틀을 열어 사본 저장 → 우리 팀 데이터로 네 단계 → 셀마다 위젯 · 담당 주석'],['u4','learn42','교과서 기아 예측 예제','데이터 → 전처리 → 선형 회귀 → 평가의 흐름을 먼저 봅니다'],['u2','implement','구현 아홉 걸음','막히는 걸음의 «자주 막히는 곳»을 봅니다'],['u2','lab','코랩 노트북 ② (연습)','막히면 교과서 예제 노트북과 견주어 봅니다'],['lb','labs','교과서 기아 예측 노트북','07 GHI — 우리 노트북과 같은 네 단계']],
    out:'개인 계정 코랩 노트북(공유 링크) — 셀마다 오렌지3 위젯 · 담당 주석', bring:'코랩 · 우리 팀 데이터 · 오렌지3 기록' },
  S2:{ short:'수행② ② 비교·개선', kind:'pa', tag:'수행평가 ② · 2/4', title:'두 모델 비교와 개선', page:'요소 3 · 사회적 영향(편향)을 고려한 개선',
    goal:'같은 지표로 오렌지3 모델과 코랩 모델을 비교하고, 편향을 고려한 개선 실험 한 건을 가설·조작·결과·해석으로 기록할 수 있다.',
    flow:[[5,'같은 지표 · 같은 테스트 데이터인지 확인'],[15,'비교표 — 오렌지3 수치와 코랩 수치를 나란히, 차이가 나면 이유 한 줄'],[25,'개선 실험 한 건 — 편향 유형 지목 → 가설 · 조작 · 결과 · 해석'],[5,'노트북 저장 · 다음 시간 보고서 집필 구간 정하기']],
    steps:[['u4','pa2','비교표 · 개선 실험 네 칸','수행평가 ② 노트북 틀 아래쪽 — 같은 지표로 비교 → 가설 · 조작 · 결과 · 해석'],['u2','implement','점수 계산기 · 해석 함정','기준선 · 과적합 · 재현율로 결과를 해석합니다'],['u4','p3','혼동 행렬 계산기','재현율 · 정밀도를 확인합니다']],
    out:'비교표(같은 지표) · 개선 실험 기록 · 편향 유형 지목' },
  S3:{ short:'수행② ③ 보고서·구술①', kind:'pa', tag:'수행평가 ② · 3/4', title:'보고서 · 발표자료 + 구술 ① 담당 구간', page:'요소 4 · 보고서는 수업 시간 안에 씁니다(과제 아님)',
    goal:'본인 집필 구간에 판단 근거와 AI 활용 내역을 쓰고 최종 발표자료를 완성하며, 담당 구간 구술 문항에 근거를 들어 답할 수 있다.',
    flow:[[5,'보고서 틀 · 집필 구간 확인 · AI 활용 내역 적는 법'],[35,'보고서 집필 + 캔바 템플릿 발표자료 — 그동안 선생님이 모둠을 돌며 한 사람씩 «담당 구간 1문항» 구술(모둠당 약 5분)'],[10,'발표자료 마지막 장(출처 · AI 활용 범위) · 다음 시간 발표 순서 추첨']],
    steps:[['u4','pa2','AI 활용 내역 적는 법','신호등 색 · 요청 내용 · 채택 여부'],['u4','p4','구술 연습','«내가 쓴 구간을 왜 그렇게 했는가»를 근거와 함께'],['u4','rules','약속 다시 보기','AI는 검색 · 요약까지만']],
    out:'프로젝트 보고서(집필자 표기) · 최종 발표자료 · 구술 ① 담당 구간' },
  S4:{ short:'수행② ④ 발표·구술②', kind:'pa', tag:'수행평가 ② · 4/4', title:'모둠 발표 + 구술 ② 무작위', page:'요소 4 · 모든 반 11/20 전에 끝납니다',
    goal:'모둠 발표에서 문제 정의부터 개선까지를 설명하고, 무작위로 뽑힌 구술 문항에 근거를 들어 답할 수 있다.',
    flow:[[3,'발표 순서 · 규칙 · 상호평가 방법'],[40,'7모둠 × (발표 2분 + 모둠원 한 사람씩 무작위 구술 1문항 약 30초)'],[7,'상호평가(교과서 209쪽 평가표 세 영역) · 미응시자 확인']],
    steps:[['u4','p4','2분 타이머 · 구술 연습','«수행평가 ② 구술» 질문을 뽑아 연습합니다'],['u4','pa2','평가 요소','요소 4를 다시 확인합니다'],['u4','learn42','교과서 평가표(209쪽)','상호평가 세 영역을 확인합니다']],
    out:'발표 · 구술 ② · 상호평가' },
  S5:{ short:'피드백·성찰', kind:'et', tag:'수행평가 ② 마무리', title:'상호 피드백 · 성찰일지', page:'평가 미반영 · 결석으로 못 한 구술은 이 시간에 보충',
    goal:'개선 전·후 성능을 비교해 성찰일지를 쓰고, 다른 모둠 산출물에 근거 있는 피드백을 줄 수 있다.',
    steps:[['u4','rules','약속 다시 보기','서로의 기여를 구체적인 행동으로 적습니다'],['u4','learn42','교과서 평가표(209쪽)','우리 모둠을 세 영역으로 돌아봅니다']], out:'성찰일지 · 상호 피드백' },
  U07b:{ short:'Ⅱ-07 심화', kind:'u2', tag:'Ⅱ-07', title:'딥러닝 모델 구현 (심화)', page:'교과서 124~138쪽 · 부록 229~237쪽',
    goal:'층을 쌓아 딥러닝 모델을 만들고, 정규화가 성능을 어떻게 바꾸는지 비교할 수 있다.',
    steps:[['u2','lab','코랩 노트북 ③','정규화 전 · 후 정확도를 비교합니다'],['u2','learn07','교과서로 배우기 · Ⅱ-07','과적합 · 정규화 · 하이퍼파라미터 다시 보기'],['u2','code','코드 읽기','정규화 한 줄을 찾아봅니다']],
    out:'정확도 전·후 비교 한 줄', bring:'코랩(학교 구글 계정)' },
  UR:{ short:'Ⅱ 다시 보기', kind:'u2', tag:'Ⅱ 다시 보기', title:'Ⅱ-01~05 다시 보기 — 첫 주에 빠르게 지난 곳', page:'교과서 60~115쪽 · 데이터 탐구 · 프로젝트에서 한 것과 이어서',
    goal:'10월 둘째 주에 몰아서 배운 Ⅱ-01 · 03~05와 데이터 탐구에서 배운 Ⅱ-01 · 02를 직접 한 일과 이어 다시 정리하고, 수업 시간에 넘어간 활동으로 약한 개념을 스스로 보충할 수 있다.',
    steps:[['u2','map','소단원 한눈에','일곱 걸음에서 내가 직접 해 본 곳에 표시합니다'],['u2','learn01','Ⅱ-01 넘어간 활동','표본 뽑기 시뮬레이션 · 데이터 누리집(67쪽) · 조사 문제 찾기(68~69쪽)'],['u2','learn02','Ⅱ-02 다시 — IQR · 상관계수 · 혈색소 활동','데이터 탐구 ③에서 내가 쓴 기준과 견주고, 노트북 13 끝의 80~82쪽 활동을 합니다'],['u2','learn03','Ⅱ-03 넘어간 활동','추천 시스템(88쪽) · 사례 30개 분류'],['u2','models','모델 도감','프로젝트에서 고른 모델과 고르지 않은 모델을 비교합니다'],['u2','implement','해석 함정 여섯','틀린 문항의 설명을 읽습니다'],['u2','miscon','헷갈리는 것 O/X','오개념을 정리합니다'],['u2','check','확인 문제','스스로 점검합니다']],
    ext:[['https://colab.research.google.com/github/richee-pc/AI_cs/blob/main/notebooks/13_unit2_02_preprocessing.ipynb','코랩 13 · Ⅱ-02 + 혈색소 활동'],['https://colab.research.google.com/github/richee-pc/AI_cs/blob/main/notebooks/16_cluster_wine.ipynb','코랩 16 · 군집(와인)'],['https://colab.research.google.com/github/richee-pc/AI_cs/blob/main/notebooks/14_predict_regression.ipynb','코랩 14 · 예측(연비)'],['https://colab.research.google.com/github/richee-pc/AI_cs/blob/main/notebooks/15_classify_titanic.ipynb','코랩 15 · 분류(타이타닉)']],
    out:'확인 문제 스스로 채점' },
  UX:{ short:'Ⅱ 종합 실습', kind:'u2', tag:'Ⅱ 정리', title:'대단원 마무리 · 종합 실습 — 다섯 걸음과 모델 선택', page:'교과서 139~141쪽 · 63쪽 그림 Ⅱ-3 · 두 차시',
    goal:'단원 자가 진단과 개념도로 Ⅱ단원 전체를 정리하고 학습 내용 평가 12문항(서술형 포함)을 풀며, 더러운 데이터로 문제 정의 → 전처리 → 알고리즘 선정 → 모델 생성 → 성능 평가 및 수정을 끝까지 수행해 예측 · 분류 모델을 근거를 들어 고를 수 있다.',
    flow:[[10,'1차시 · 자가 진단(상 · 중 · 하) → 개념도 빈칸 — 약한 소단원 표시'],[35,'1차시 · 학습 내용 평가 12문항 — 객관식 바로 채점 · 서술형 3문항은 예시 답안과 채점 포인트로 견주기'],[5,'1차시 · 틀린 개념 → 핵심 용어 · 헷갈리는 것 O/X'],[50,'2차시 · 코랩 18 종합 실습 — 더러운 데이터 점검 · 정제 → 예측 모델 4 · 분류 모델 4 → 전처리 전후 R² → 모델 선택 문장']],
    steps:[['u2','wrapup','대단원 마무리','자가 진단 → 개념도 → 12문항 → 종합 실습'],['u2','terms','핵심 용어','틀린 문항의 낱말을 다시 봅니다'],['u2','miscon','헷갈리는 것 O/X','오개념을 정리합니다'],['dg','make','데이터 공방','먼저 끝낸 사람 — 다른 주제로 한 번 더'],['u2','hand','활동 기록지','빈 칸을 채워 제출합니다(마감)']],
    ext:[['https://colab.research.google.com/github/richee-pc/AI_cs/blob/main/notebooks/18_unit2_review_practice.ipynb','코랩 18 · 종합 실습'],['https://richee-pc.github.io/AI_cs/datagen.html','🧰 데이터 공방']],
    out:'12문항 자가 채점 · 서술형 3문항(활동지) · 코랩 18 모델 선택 문장 · 활동 기록지 제출(마감)' },
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
  A:'10/14 U00|10/15 U01|10/16 U05|10/21 D1|10/22 D2|10/23 D3|10/28 D4|10/29 P1|10/30 P2|11/4 P3|11/5 P4|11/6 U67|11/11 S1|11/12 S2|11/13 S3|11/18 S4|11/20 S5|11/25 U07b|11/26 UR|11/27 UR|12/2 UX|12/3 UX|12/4 EX|12/9 EX|12/16 MK|12/17 MK|12/18 MK|12/23 MF|12/24 MF|12/30 END',
  D:'10/12 U00|10/13 U01|10/16 U05|10/19 D1|10/23 D2|10/26 D3|10/27 D4|10/30 P1|11/2 P2|11/3 P3|11/6 P4|11/9 U67|11/10 S1|11/13 S2|11/16 S3|11/17 S4|11/20 S5|11/23 U07b|11/24 UR|11/27 UR|11/30 UX|12/1 UX|12/4 EX|12/7 EX|12/8 EX|12/18 MK|12/21 MF|12/22 MF|12/28 END|12/29 END',
  E:'10/12 U00|10/13 U01|10/15 U05|10/19 D1|10/22 D2|10/26 D3|10/27 D4|10/29 P1|11/2 P2|11/3 P3|11/5 P4|11/9 U67|11/10 S1|11/12 S2|11/16 S3|11/17 S4|11/23 S5|11/24 U07b|11/26 UR|11/30 UR|12/1 UX|12/3 UX|12/7 EX|12/8 EX|12/17 MK|12/21 MF|12/22 MF|12/24 MF|12/28 END|12/29 END'
};
var OFF = { '10/20':'전국연합학력평가', '11/19':'대학수학능력시험', '12/10':'2차 정기고사', '12/11':'2차 정기고사', '12/14':'2차 정기고사', '12/15':'2차 정기고사' };
var PAGES = { u2:'https://richee-pc.github.io/AI_cs/unit2.html', u4:'https://richee-pc.github.io/AI_cs/unit4.html', ix:'https://richee-pc.github.io/AI_cs/index.html',
  lb:'https://richee-pc.github.io/AI_cs/labs.html', md:'https://richee-pc.github.io/AI_cs/models.html', dg:'https://richee-pc.github.io/AI_cs/datagen.html' };
var PNAME = { u2:'Ⅱ단원 쪽', u4:'Ⅳ단원 쪽', ix:'안내 쪽', lb:'코랩 실습실', md:'모델 도감', dg:'데이터 공방' };
var ORDER = ['U00','U01','U05','D1','D2','D3','D4','P1','P2','P3','P4','U67','S1','S2','S3','S4','S5','U07b','UR','UX','EX','MK','MF','END'];
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
function flowHtml(L){
  if(!L.flow || !/[?&]t=1(&|$)/.test(location.search)) return '';     /* 학생 화면엔 숨김 · 교사는 주소 끝에 ?t=1 (예: plan.html?t=1) */
  return '<div class="lflow"><b>50분 흐름</b>' + L.flow.map(function(f){ return '<div><em>' + f[0] + '′</em><span>' + f[1] + '</span></div>'; }).join('') + '</div>';
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
.lflow{display:grid; gap:5px; margin:0 0 14px}\
.lflow div{display:flex; gap:10px; align-items:baseline; font-size:.875rem; color:var(--ink2); line-height:1.55}\
.lflow em{flex:none; min-width:38px; font-style:normal; font-weight:800; color:var(--blue-d); font-variant-numeric:tabular-nums}\
.lflow b{font-size:.8125rem; color:var(--muted); font-weight:800}\
';
(function(){ var st = document.createElement('style'); st.textContent = WCSS; (document.head || document.documentElement).appendChild(st); })();

window.AIL = { LES:LES, CAL:CAL, OFF:OFF, ORDER:ORDER, NAME:NAME, WD:WD, list:list, today:today, getCls:getCls, setCls:setCls,
  datesOf:datesOf, flowHtml:flowHtml, home:home, stepUrl:stepUrl, openUrl:openUrl, toDate:toDate, weekNo:weekNo, weekRange:weekRange, weekCls:weekCls };

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
    if(window.AIL_onFocus) window.AIL_onFocus(mine.map(function(s){ return s[1]; }));
    document.body.classList.add('lfocus');
    var ds = cls ? datesOf(cls, cur) : [], isT = ds.some(function(x){ return +x.d === +t0; });
    var nOf = function(){ var i = ids.indexOf(cur); return [ids[i-1], ids[i+1]]; }();
    panel.hidden = false;
    panel.innerHTML = '<div class="lpcard">' +
      (isT ? '<span class="when">오늘 수업</span>' : (ds.length ? '<span class="when n">' + NAME[cls] + ' ' + ds.map(function(x){ return x.md + '(' + WD[x.d.getDay()] + ')'; }).join(' · ') + '</span>' : '')) +
      '<span class="tg">' + L.tag + '</span>' +
      '<h2>' + L.title + '</h2>' + (L.page ? '<p class="pg">' + L.page + '</p>' : '') +
      '<p class="gl">' + L.goal + '</p>' + flowHtml(L) +
      '<p class="mini-h" style="margin:0 0 8px">오늘 할 순서 — 차례대로 누르세요</p>' +
      '<div class="lsteps">' + L.steps.map(function(s){
        var here = s[0] === page;
        return '<a class="lstep" href="' + (here ? '#' + s[1] : stepUrl(cur, s)) + '"' + (here ? ' data-go="' + s[1] + '"' : '') + '><span><b>' + s[2] + '</b><span>' + s[3] + '</span></span>' +
          (here ? '' : '<em>' + (PNAME[s[0]] || '안내 쪽') + ' ↗' + '</em>') + '</a>'; }).join('') + '</div>' +
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
    if(a){ var el = document.getElementById(a.getAttribute('data-go')); if(el){ e.preventDefault(); reveal(el.id); el.classList.remove('lstepflash'); void el.offsetWidth; el.classList.add('lstepflash'); } }
  });

  /* ── 쪽 안의 자리로 가기 ──────────────────────────────
     차시 탭으로 숨긴 구획이면 «전체 보기»로 풀고, 소단원 탭(.lpane) 안이면 그 탭을 열고, 접힌 <details> 는 펼친 뒤 간다.
     https://…/AI_cs/unit2.html#prep 처럼 이 쪽 자신을 가리키는 주소도 새로 읽지 않고 쪽 안에서 움직인다. */
  function sectionHidden(el){ return !!el.closest('.lhide'); }
  function reveal(id){
    var el = document.getElementById(id); if(!el) return false;
    if(cur && sectionHidden(el)) choose(null);
    var pane = el.classList.contains('lpane') ? el : el.closest('.lpane');
    if(pane && pane.hidden){
      try{ history.replaceState(null, '', location.pathname + location.search + '#' + pane.id); }catch(err){}
      dispatchEvent(new HashChangeEvent('hashchange'));
    }
    var d = el.tagName === 'DETAILS' ? el : el.closest('details');
    while(d){ d.open = true; d = d.parentElement ? d.parentElement.closest('details') : null; }
    setTimeout(function(){ el.scrollIntoView({ behavior:'smooth', block:'start' }); }, 40);
    return true;
  }
  function samePage(href){
    if(!href) return null;
    if(href.charAt(0) === '#') return href.length > 1 ? href.slice(1) : null;
    var m = href.match(/^(?:https:\/\/richee-pc\.github\.io\/AI_cs\/)?([\w-]+\.html)(\?[^#]*)?#(.+)$/);
    var mine = location.pathname.split('/').pop() || 'index.html';
    if(m && m[1] === mine && !(m[2] && /[?&]l=/.test(m[2]))) return m[3];
    return null;
  }
  document.addEventListener('click', function(e){
    if(e.defaultPrevented || e.button || e.ctrlKey || e.metaKey || e.shiftKey) return;
    var a = e.target.closest('a[href]'); if(!a || a.target === '_blank' || a.classList.contains('lstep')) return;
    var id = samePage(a.getAttribute('href')); if(!id) return;
    id = decodeURIComponent(id);
    var el = document.getElementById(id); if(!el) return;
    var plain = a.getAttribute('href').charAt(0) === '#';
    var blocked = (cur && sectionHidden(el)) || !!el.closest('.lpane[hidden]') || !!el.closest('details:not([open])') || (el.tagName === 'DETAILS' && !el.open);
    if(plain && !blocked) return;              /* 평소 링크는 브라우저에 맡김 */
    e.preventDefault();
    reveal(id);
    if(!el.classList.contains('lpane')) try{ history.replaceState(null, '', location.pathname + location.search + '#' + id); }catch(err){}
  });

  /* 처음 열 때: ?l= → 그 차시 · 없으면 오늘 수업이 이 쪽에 있을 때만 자동으로(#자리로 들어왔으면 접지 않음) */
  var q = location.search.match(/[?&]l=([A-Za-z0-9]+)/), start = null;
  if(q && q[1] !== 'all') start = LES[q[1]] ? q[1] : null;
  else if(!q && !location.hash){ var tid0 = todayId(); if(tid0 && home(tid0) === page) start = tid0; }
  choose(start, false);
  if(location.hash) setTimeout(function(){ reveal(decodeURIComponent(location.hash.slice(1))); }, 60);
}
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
})();
