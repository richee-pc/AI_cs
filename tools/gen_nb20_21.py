# -*- coding: utf-8 -*-
# 노트북 20(모둠 전처리) · 21(나의 시각화) 만들기 — 2026-10-22
#   20: tools/src/nb20_base.ipynb(10/21판)를 바탕으로 ⭐ 꼭 볼 코드 · 🙈 접어 둔 칸 · ✏️ 고칠 곳 · 👩‍🏫 시연 멈춤 · IQR 설명
#   21: 새로 — 모둠 전처리 파일로 각자 그래프를 골라 그리고 1차 해석
# 쓰는 법: python tools/gen_nb20_21.py   (notebooks/20_… · 21_… 를 덮어씀)
import json, os
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
base = json.load(open(os.path.join(HERE, 'src', 'nb20_base.ipynb'), encoding='utf-8'))
B = [''.join(c['source']) for c in base['cells']]

def new():
    cells = []
    def md(s):
        cells.append({'cell_type': 'markdown', 'metadata': {}, 'source': s.strip('\n')})
    def code(s, hide=None):
        meta = {}
        s = s.strip('\n')
        if hide:
            s = '#@title 🙈 ' + hide + ' — 실행만 하면 돼요 (코드는 안 봐도 돼요)\n' + s
            meta = {'cellView': 'form'}
        cells.append({'cell_type': 'code', 'metadata': meta, 'execution_count': None, 'outputs': [], 'source': s})
    return cells, md, code

def star(md, what, book):
    md(f'### ⭐ 꼭 볼 코드 — {what} <small>{book}</small>')

def stop(md, n, say):
    md(f'> 👩‍🏫 **시연 멈춤 {n}** — {say}')

def save(cells, name):
    for c in cells:
        lines = c['source'].split('\n')
        c['source'] = [l + '\n' for l in lines[:-1]] + [lines[-1]]
    nb = {'cells': cells, 'metadata': {'colab': {'provenance': [], 'toc_visible': True},
          'kernelspec': {'name': 'python3', 'display_name': 'Python 3'}, 'language_info': {'name': 'python'}},
          'nbformat': 4, 'nbformat_minor': 0}
    json.dump(nb, open(os.path.join(ROOT, 'notebooks', name), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(name, 'cells', len(cells))

LEGEND = r'''
| 표시 | 뜻 | 할 일 |
|---|---|---|
| ✏️ | **고칠 곳** | 오른쪽 칸(또는 따옴표 안)만 바꿔요 |
| ⭐ | **꼭 볼 코드** — 교과서 Ⅱ-02 핵심 | 선생님 설명을 들으며 코드 한 줄 한 줄 읽어요 |
| 🙈 | **접어 둔 칸** — 파일 읽기 · 검사 도우미 | 안 봐도 돼요. 제목만 보이고 실행은 그대로 돼요 |
| 👩‍🏫 | **시연 멈춤** | 선생님이 여기서 멈추고 설명해요 |
'''

# ═════════════════════════════ 노트북 20 · 모둠 전처리 ═════════════════════════════
cells, md, code = new()
md(r'''
# 20 · 데이터 탐구 ② — 모둠 전처리 (교과서 Ⅱ-02 코드로)

> 👥 **모둠에서 한 사람(코랩 담당)** 이 우리 모둠 데이터로 돌려요. 같은 시간에 **모둠 대표는 «데이터 정리 AI»** 에 같은 기준을 줍니다.
> 두 결과를 견준 뒤, 맨 아래 **⓫ «우리데이터_전처리.csv»** 를 📁 모둠 데이터 폴더에 올리면 → 모둠원 **모두가 노트북 21에서 각자 그래프**를 그려요.

**쓰는 법** ① 파일 → **드라이브에 사본 저장** ② **✏️ ⓪ 설정**만 고치기 ③ **런타임 → 모두 실행**(`Ctrl+F9`) — 파일 선택 창이 뜨면 우리 파일 ④ 결과를 위에서부터 읽기 · 🛑 빨간 안내가 나오면 그 말대로 ⓪을 고치고 다시 모두 실행
''' + LEGEND + r'''

> 👩‍🏫 **선생님 시연** — 연습 데이터(약수터 수질) 그대로 **위에서부터 `Shift+Enter`로 한 칸씩**. 🙈 칸은 설명 없이 넘기고, **👩‍🏫 시연 멈춤 ①~⑥** 에서만 멈춰 설명해요(약 5분).
> 연습 결과: 처음 381행 → 결측 처리 376행 → IQR 처리 322행.
''')
code(B[1].split('\n', 1)[1], hide='그래프 한글 글꼴')
md(r'''
---
## ✏️ ⓪ 우리 모둠 설정 — **이 칸만** 고쳐요

> 🧒 **쉬운 말** — 오른쪽에 입력 칸이 보이면 거기에, 안 보이면 따옴표 `' '` 안의 글자만 바꿔요. 열 이름은 ❷에 나오는 이름과 **띄어쓰기까지 똑같이**.
> 처음엔 그대로 두고 연습 데이터로 한 번 돌려 봐도 돼요.

| 설정 | 무엇을 적나 | 예 |
|---|---|---|
| `파일` | 📁 폴더에서 받은 우리 파일 이름(.csv · .xlsx) | `폭염일수.csv` |
| `x열` · `y열` | 가설의 **원인 쪽**(가로축) · **결과 쪽**(세로축) — **숫자** 열 | `폭염일수` · `환자수` |
| `두번째파일` · `합치는방법` · `기준열` | 파일이 둘이면 — **아래로**(같은 열, 다른 해) · **옆으로**(다른 기관 자료를 날짜 · 연도 · 지역으로 맞춤) | `환자수.csv` · `옆으로` · `연도` |
| `두번째기준열` | 두 번째 파일에서 그 열 이름이 다를 때(기상청 «일시» ↔ «날짜») | `일시` |
| `세로로` | KOSIS처럼 **연도가 옆으로 늘어선 표**면 이름 열 | `시도별` |
| `결측처리` · `이상치기준` | 활동지 «전처리 기준»에 적은 **우리 기준** (`범위`면 아래 최소 · 최대) | `삭제` · `IQR` |
''')
code(r'''
# ✏️ ── 우리 모둠 설정 ── 오른쪽 칸(또는 따옴표 안)만 고쳐요 ───────────────────
파일 = '연습'                 #@param {type:"string"}
두번째파일 = '연습2'           #@param {type:"string"}
합치는방법 = '아래로'          #@param ["아래로", "옆으로"]
기준열 = ''                   #@param {type:"string"}
두번째기준열 = ''              #@param {type:"string"}
세로로 = ''                   #@param {type:"string"}
x열 = '질산성질소'             #@param {type:"string"}
y열 = '일반세균'               #@param {type:"string"}
뺄열 = ['연번']               #@param {type:"raw"}
바꿀열 = '판정'               #@param {type:"string"}
바꿀값 = {'Y': '1', 'N': '0', '0(여시니아)': '0'}   #@param {type:"raw"}
결측처리 = '삭제'              #@param ["삭제", "평균", "그대로"]
이상치기준 = 'IQR'             #@param ["IQR", "범위", "그대로"]
범위최소 = 0                  #@param {type:"number"}
범위최대 = 200                #@param {type:"number"}
AI결과파일 = ''               #@param {type:"string"}
# ── 여기 아래는 고치지 않아요 ──────────────────────────────────────────────
if 이상치기준 == '범위':
    이상치기준 = (범위최소, 범위최대)
if isinstance(기준열, str) and ',' in 기준열:          # '시도별, 연도' 처럼 두 개면 목록으로
    기준열 = [s.strip() for s in 기준열.split(',')]
if 파일 != '연습' and 두번째파일 == '연습2':
    두번째파일 = ''                       # 우리 데이터에 연습 파일이 섞이지 않게
print('설정 완료 —', 파일, '/', x열, '→', y열, '/ 결측', 결측처리, '/ 이상치', 이상치기준)
''')
md(B[4])
code(B[5], hide='우리 파일 올리기')
md(r'''
---
## ❶ 판다스 준비 · ❷ 데이터 읽기 <small>72쪽</small>

> 🧒 **쉬운 말** — 판다스(pandas)는 «표를 다루는 도구 상자»예요. 교과서처럼 `df = pd.read_csv('파일.csv')` 한 줄로 파일을 **표(df)** 로 읽어요.
> 아래 🙈 칸은 그 한 줄을 대신해서 **글자 저장 방식(utf-8 · cp949) · 엑셀 · 맨 위 제목 줄 · 가로형 표**까지 알아서 처리해 줘요.
''')
code(B[7], hide='❶ 판다스 준비 · ❷ 파일 읽기 도우미')
star(md, '표 모양 보기 (행 · 열)', '72쪽 · head · shape')
code(r'''
print('행(줄) 수, 열(칸) 수 :', df.shape)   # (행, 열) — 행 하나 = 날 · 사람 · 지역 하나
df.head()                                    # 맨 위 5줄만 보기
''')
stop(md, '①', '«표 = 행 × 열». `df.shape` 의 앞 숫자가 **n(데이터 개수)** — 그래프 해석에 꼭 함께 적어요. 열 이름이 ⓪의 x열 · y열과 같아야 해요.')
code(B[8], hide='열 이름과 종류 보기(⓪에 적을 이름 확인)')
md(B[9])
code(B[10], hide='«데이터 정리 AI»용 파일 만들기 · 내려받기')
md(B[11])
code(B[12], hide='❸ 표기 통일 · 숫자로 바꾸기')
md(B[13])
code(B[14], hide='❹ 두 파일 합치기')
md('---\n## ❺ 중복 확인 · ❻ 중복 삭제 <small>74쪽 · duplicated · drop_duplicates</small>\n\n> 🧒 **쉬운 말** — 완전히 똑같은 줄이 두 번 들어 있으면 하나만 남겨요(같은 날을 두 번 센 실수).')
star(md, '중복 찾기 · 지우기', '74쪽')
code(B[16])
md(B[17])
md(B[18])
star(md, '빈칸(결측치) 세기', '75쪽 · isnull().sum()')
code(B[19])
stop(md, '②', '`isnull()` = 빈칸이면 True, `.sum()` = True 개수 세기 → **열마다 빈칸 수**. 연습 데이터는 y열에 빈칸 5개.')
md(B[20])
star(md, '빈칸 처리 — 지우기(dropna) · 채우기(fillna)', '76쪽')
code(B[21])
stop(md, '③', '`dropna` = 빈칸 있는 줄 **지우기**(381 → 376) · `fillna(평균)` = 평균으로 **채우기**(줄 수는 그대로, 대신 값이 «만들어진» 것). 어느 쪽이 우리 가설에 정직한지가 «전처리 기준»이에요.')
md('---\n## ❾ 이상치 탐색 — 상자그림 · IQR <small>76쪽 · 83쪽</small>')
star(md, '상자그림 그리기', '76쪽 · boxplot')
code(r'''
plt.boxplot(df[y열])                  # 상자그림: 상자 = 가운데 절반, 수염 밖 점 = 튀는 값 후보
plt.title(y열 + ' 상자그림')
plt.show()
''')
md(r'''
### 📏 IQR — «튀는 값»의 기준선을 숫자로 정하는 법 <small>83쪽 읽을거리</small>

값을 **작은 것부터 줄 세우고** 네 덩어리로 나눠요.

| 이름 | 뜻 | 상자그림에서 |
|---|---|---|
| **Q1** (1사분위수) | 아래에서 **25%** 지점 | 상자의 **아래 변** |
| 중앙값 (Q2) | 딱 **가운데(50%)** | 상자 안의 선 |
| **Q3** (3사분위수) | 아래에서 **75%** 지점 | 상자의 **위 변** |
| **IQR** = Q3 − Q1 | **가운데 절반이 퍼진 너비** | 상자의 **높이** |

**기준선** — `Q1 − 1.5 × IQR` 보다 작거나 `Q3 + 1.5 × IQR` 보다 크면 **«튀는 값(이상치) 후보»**.

> 🧒 **예** — 하루 아이스크림 판매량 10일: `96 101 104 110 115 118 126 127 138 1480`
> Q1 = 105.5, Q3 ≈ 126.8 → **IQR ≈ 21.3** → 기준선 `105.5 − 1.5×21.3 ≈ 73.6` ~ `126.8 + 1.5×21.3 ≈ 158.6`
> → **1480** 만 선 밖 → 후보! (입력 실수 148 이었을까? 진짜 축제 날이었을까?)

> 왜 «평균 ± 얼마»가 아니라 IQR일까? 평균은 1480 같은 튀는 값에 **끌려가지만**, Q1 · Q3 는 거의 안 움직여서 기준선이 흔들리지 않아요.
''')
star(md, 'IQR 계산 · 후보 찾기', '83쪽 · quantile')
code(r'''
Q1, Q3 = df[y열].quantile(0.25), df[y열].quantile(0.75)     # 아래 25% 지점 · 위 25% 지점
IQR = Q3 - Q1                                               # 가운데 절반의 너비(상자 높이)
아래, 위 = Q1 - 1.5 * IQR, Q3 + 1.5 * IQR                    # 이보다 작거나 크면 «튀는 값» 후보
후보 = df[(df[y열] < 아래) | (df[y열] > 위)]                 # 조건으로 줄 고르기( | = 또는)
print(f'Q1={Q1:.2f}  Q3={Q3:.2f}  IQR={IQR:.2f}  →  정상 범위 {아래:.2f} ~ {위:.2f}')
print('이상치 후보 :', len(후보), '개')
후보.head(10)
''')
stop(md, '④', '위 표의 아이스크림 예로 **Q1 · Q3 · IQR · 기준선**을 칠판처럼 짚고 → 실제 출력의 숫자와 맞춰 봐요. «후보»일 뿐 **지울지는 사람이 판단**.')
md(B[24])
md(B[25])
star(md, '조건으로 줄 고르기 — 이상치 처리', '77쪽')
code(B[26])
stop(md, '⑤', '핵심은 `df = df[조건]` 한 줄 — **조건이 참인 줄만 남겨요**(376 → 322). `\'그대로\'`를 고르면 실제 극단값을 지우지 않아요. 처리 후 상자그림이 어떻게 달라졌는지 보여 주기.')
md(B[34])
star(md, '쓰지 않을 열 빼기', '78쪽 · drop')
code(B[35])
md(B[27] + '\n\n> 📁 **코랩 담당** — 내려받은 **«우리데이터_전처리.csv»** 를 **모둠 데이터 폴더에 올려요**(데이터 정리 AI와 견주어 고친 최종본). 모둠원은 이 파일로 **노트북 21** 에서 각자 그래프를 그려요.')
star(md, '저장하기', '77쪽 · to_csv')
code(B[28])
stop(md, '⑥', '`to_csv` 로 깨끗한 표를 파일로. 이 파일 하나를 📁 폴더에 두고 **모둠원 모두가 같은 데이터로** 그래프를 그린다는 것 — 그래서 전처리는 모둠이 한 번만.')
md(B[29])
code(B[30], hide='단계별 행 수(활동지 «전처리 기준» 칸에 옮겨 적기)')
md(B[31])
code(B[32], hide='«데이터 정리 AI» 결과와 줄 단위로 견주기')
md(B[33])
md(r'''
---
## ✅ 여기까지가 모둠 전처리 — 다음은 **노트북 21 «나의 시각화와 1차 해석»** (각자)

[▶ 노트북 21 열기](https://colab.research.google.com/github/richee-pc/AI_cs/blob/main/notebooks/21_data_inquiry_my_graph.ipynb) — 📁 폴더의 «우리데이터_전처리.csv» 로 **내가 고른 그래프**를 그려요.

**오늘 꼭 익힐 코드 (⭐ 정리)**

| 교과서 | 코드 | 하는 일 |
|---|---|---|
| 72쪽 | `pd.read_csv('파일.csv')` · `df.shape` · `df.head()` | 읽기 · 표 모양 보기 |
| 74쪽 | `df.duplicated().sum()` · `df.drop_duplicates()` | 중복 세기 · 지우기 |
| 75쪽 | `df.isnull().sum()` | 열마다 빈칸 세기 |
| 76쪽 | `df.dropna()` · `df[열].fillna(값)` | 빈칸 지우기 · 채우기 |
| 76 · 83쪽 | `plt.boxplot()` · `quantile(0.25)` · `IQR` | 튀는 값 찾기 |
| 77쪽 | `df = df[조건]` · `df.to_csv()` | 조건으로 줄 고르기 · 저장 |
''')
save(cells, '20_data_inquiry_my_data.ipynb')

# ═════════════════════════════ 노트북 21 · 나의 시각화 ═════════════════════════════
cells, md, code = new()
md(r'''
# 21 · 데이터 탐구 ② — 나의 시각화와 1차 해석 (각자)

> 👤 **각자** 해요. 모둠이 만든 **«우리데이터_전처리.csv»**(📁 모둠 데이터 폴더)로 **우리 모둠 문제에 맞는 그래프를 내가 골라** 그리고, **AI 없이** 먼저 해석해요.
> 같은 데이터라도 **그래프를 무엇으로 그리느냐에 따라 보이는 것이 달라져요** — 모둠원끼리 다른 그래프를 고르면 3차시 «공동 해석»이 풍성해져요.

> 🧭 **어디서 출발?** 1차시에 쓴 슬라이드 **«탐구 질문 정의서 ② — 역할 분담»** 의 **내 «맡은 분석(그래프) · 쓸 열»** 부터 그려 봐요. 더 맞는 그래프가 보이면 바꿔도 돼요 — 대신 **바꾼 이유**를 해석에 적어요.

**쓰는 법** ① 파일 → **드라이브에 사본 저장** ② 📁 폴더에서 «우리데이터_전처리.csv» 를 **내 컴퓨터로 내려받기** ③ **✏️ ⓪ 설정** — 파일 · x열 · y열 · **그래프 종류** ④ **런타임 → 모두 실행** → 파일 선택 ⑤ 그래프를 캡처(`Win+Shift+S`)해 슬라이드 **«나의 시각화와 1차 해석»** 에 붙이기 (칸에 «코랩 20 캡처»라고 적혀 있어도 **이 노트북 그래프**를 붙여요)
''' + LEGEND + r'''

> 👩‍🏫 **선생님 시연** — 연습 데이터(7월 기온 · 아이스크림 판매량)로 `그래프 = '전부 보기'` 를 골라 **모두 실행** → 그래프를 하나씩 내려가며 «언제 쓰나 · 어떻게 읽나»만 짚어요(약 4분).
''')
code(B[1].split('\n', 1)[1], hide='그래프 한글 글꼴')
md(r'''
---
## ✏️ ⓪ 나의 설정 — **이 칸만** 고쳐요

| 그래프 | 이럴 때 | 우리 모둠 예 |
|---|---|---|
| **산점도** | 두 숫자가 **함께 움직이는지** | 기온 ↔ 전력 사용량 |
| **산점도+추세선** | 위 + 기울기(얼마나 늘어나나) | 열대야일수 ↔ 수면시간 |
| **선 그래프** | **시간에 따라** 어떻게 변했나(날짜 · 연도 열 필요) | 연도별 폭염일수 |
| **막대(구간 평균)** | x를 **낮음 · 중간 · 높음**으로 나눠 y 평균 비교 | 기온 구간별 평균 판매량 |
| **막대(항목별 평균)** | **글자 열**(요일 · 지역 · 지점)마다 y 평균 비교 | 요일별 평균 판매량 |
| **상자그림(구간별)** | 구간마다 y가 **얼마나 퍼졌는지**까지 | 강수량 구간별 남조류 수 |
| **히스토그램** | y값이 **어디에 많이 몰렸는지**(분포) | 하루 전력 사용량 분포 |
| **히트맵** | 숫자 열이 여럿일 때 **어느 쌍이 관련 큰지** 한눈에 | 기온 · 습도 · 사용량 |

> 💡 고르기 어려우면 `전부 보기` 로 다 그려 보고, **우리 가설을 가장 정직하게 보여 주는 것**을 하나 골라 캡처해요.
''')
code(r'''
# ✏️ ── 나의 설정 ── 오른쪽 칸(또는 따옴표 안)만 고쳐요 ─────────────────────
파일 = '연습'                  #@param {type:"string"}
x열 = '최고기온'               #@param {type:"string"}
y열 = '판매량'                 #@param {type:"string"}
그래프 = '전부 보기'            #@param ["산점도", "산점도+추세선", "선 그래프", "막대(구간 평균)", "막대(항목별 평균)", "상자그림(구간별)", "히스토그램", "히트맵", "전부 보기"]
시간열 = '날짜'                #@param {type:"string"}
항목열 = '요일'                #@param {type:"string"}
구간수 = 3                    #@param {type:"integer"}
# ── 여기 아래는 고치지 않아요 ──────────────────────────────────────────────
고른것 = lambda 이름: 그래프 in (이름, '전부 보기')
print('설정 완료 —', 파일, '/', x열, '→', y열, '/', 그래프)
''')
md('### 📁 «우리데이터_전처리.csv» 올리기 (연습이면 건너뜀)\n\n> 📁 모둠 데이터 폴더에서 내려받은 파일을 **파일 선택**으로 골라요.')
code(r'''
if 파일 != '연습':
    from google.colab import files
    올린것 = files.upload()
    print('올린 파일 :', list(올린것))
else:
    print('연습용 데이터를 씁니다 — 올릴 것 없음')
''', hide='파일 올리기')
code(r'''
import os, re, difflib
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

class 멈춤(Exception):                  # 🛑 안내만 보여 주고 «모두 실행»을 여기서 멈춤
    def _render_traceback_(self):
        return ['🛑 ' + str(self)]

def 파일찾기(이름):
    if os.path.exists(이름):
        return 이름
    있는것 = [f for f in os.listdir('.') if f.lower().endswith(('.csv', '.xlsx', '.xls'))]
    머리 = os.path.splitext(이름)[0].replace(' ', '')
    비슷 = [f for f in 있는것 if f.replace(' ', '').startswith(머리)]
    if 비슷:
        return sorted(비슷, key=len)[0]
    raise 멈춤(f'«{이름}» 파일을 못 찾았어요. 올린 파일: {있는것} — ⓪ 파일 이름을 똑같이 적어요.')

if 파일 == '연습':                      # 연습: 7월 최고기온 · 아이스크림 판매량(빈칸 1 · 튀는 값 1480을 미리 정리한 것)
    df = pd.read_csv('https://raw.githubusercontent.com/richee-pc/AI_cs/main/data/example_icecream_hot_days.csv')
    df = df.dropna()
    df = df[df['판매량'] < 1000]
else:
    경로 = 파일찾기(파일)
    if 경로.lower().endswith(('.xlsx', '.xls')):
        df = pd.read_excel(경로)
    else:
        for 인코딩 in ('utf-8-sig', 'cp949', 'euc-kr'):
            try:
                df = pd.read_csv(경로, encoding=인코딩); break
            except UnicodeDecodeError:
                continue
df.columns = [str(c).strip() for c in df.columns]
for 열 in (x열, y열):
    if 열 not in df.columns:
        비슷 = difflib.get_close_matches(열, list(df.columns), n=3, cutoff=0.4)
        raise 멈춤(f'⓪에 적은 «{열}» 열이 없어요.' + (f' 혹시 {비슷}?' if 비슷 else '') + f'\n   이 중에서 골라요: {list(df.columns)}')
    if not pd.api.types.is_numeric_dtype(df[열]):
        df[열] = pd.to_numeric(df[열].astype(str).str.replace(r'[,%\s]', '', regex=True), errors='coerce')
df = df.dropna(subset=[x열, y열])
n = len(df)
print(f'불러온 표: {df.shape} — 그래프에 쓰는 데이터 n = {n}')
if n < 10:
    print(f'⚠ 데이터가 {n}개뿐이에요. 그래프 · 상관계수를 해석할 때 «n이 작다»를 꼭 함께 적어요.')
''', hide='파일 읽기 · 숫자 정리 도우미')
star(md, '데이터 한눈에 보기 — 기술 통계', 'describe')
code(r'''
df[[x열, y열]].describe().round(2)    # 개수(count) · 평균(mean) · 표준편차(std) · 최솟값 · 사분위수 · 최댓값
''')
stop(md, '①', '`describe()` 한 줄로 **n · 평균 · 최소 · 최대 · Q1(25%) · 중앙값 · Q3(75%)**. 그래프를 그리기 전에 «값이 어느 범위인지» 먼저 봐요.')

md(r'''
---
## 📈 그래프 고르기 — 고른 것만 그려져요 (`전부 보기`면 모두)

> 각 그래프 칸은 **⭐ 짧은 코드**예요. 그래프 그리는 기본 모양은 모두 같아요 — **`plt.그래프종류(x값, y값)` → 제목 · 축 이름 → `plt.show()`**
''')
md(r'''
### 1. 산점도 <small>79쪽 · scatter</small>
**언제** 두 숫자가 함께 움직이는지 · **읽는 법** 점들이 오른쪽 위로 모이면 «함께 늘어남», 오른쪽 아래로 «반대로», 흩어지면 «관계 약함» · **조심** 점 하나하나가 행 하나 — n을 제목에
''')
code(r'''
if 고른것('산점도') or 고른것('산점도+추세선'):
    plt.scatter(df[x열], df[y열], alpha=0.6)
    if 고른것('산점도+추세선'):
        기울기, 절편 = np.polyfit(df[x열], df[y열], 1)          # 점들에 가장 잘 맞는 직선(1차식)
        xs = np.linspace(df[x열].min(), df[x열].max(), 50)
        plt.plot(xs, 기울기 * xs + 절편, color='red')
        print(f'추세선: {x열}이(가) 1 늘 때 {y열}은(는) 평균 {기울기:.2f}씩 변해요')
    plt.xlabel(x열); plt.ylabel(y열)
    plt.title(f'{x열}와 {y열} (n={n})')
    plt.show()
''')
md(r'''
### 2. 선 그래프 — 시간에 따른 변화 <small>plot</small>
**언제** 날짜 · 연도 순서대로 변화를 볼 때 (⓪ `시간열`) · **읽는 법** 오르내림 · 계절 · 추세 · **조심** 세로축이 0에서 시작하지 않으면 변화가 **과장돼** 보여요
''')
code(r'''
if 고른것('선 그래프'):
    if 시간열 in df.columns:
        시간 = pd.to_datetime(df[시간열].astype(str).str.replace(r'[./]', '-', regex=True), errors='coerce', format='mixed')
        if 시간.notna().mean() < 0.8:                                   # 날짜가 아니면 연도 같은 숫자로
            시간 = pd.to_numeric(df[시간열], errors='coerce')
        흐름 = df.assign(_t=시간).dropna(subset=['_t']).sort_values('_t')
        plt.plot(흐름['_t'], 흐름[y열], marker='o')
        plt.ylim(bottom=0)                                              # 세로축 0부터 — 과장 막기
        plt.xlabel(시간열); plt.ylabel(y열)
        plt.title(f'{시간열}에 따른 {y열} (n={len(흐름)})')
        plt.xticks(rotation=45)
        plt.show()
    else:
        print(f'⚠ 선 그래프: «{시간열}» 열이 없어요 — ⓪ 시간열에 날짜 · 연도 열 이름을 적어요. 지금 열: {list(df.columns)}')
''')
md(r'''
### 3. 막대 — x를 구간으로 나눠 y 평균 비교 <small>cut · groupby · bar</small>
**언제** «x가 높은 날엔 y가 더 많을까?»를 **한눈에** · **읽는 법** 막대 높이 = 그 구간의 y 평균, 위 숫자 = 그 구간의 날 수 · **조심** 구간을 어떻게 나누느냐(⓪ `구간수`)에 따라 모양이 달라져요
''')
code(r'''
if 고른것('막대(구간 평균)'):
    구간 = pd.qcut(df[x열], q=구간수, duplicates='drop')                # 개수가 비슷하게 구간 나누기
    표 = df.groupby(구간, observed=True)[y열].agg(['mean', 'count'])
    이름 = [f'{c.left:.1f}~{c.right:.1f}' for c in 표.index]
    막대 = plt.bar(이름, 표['mean'])
    for m, k in zip(막대, 표['count']):
        plt.text(m.get_x() + m.get_width() / 2, m.get_height(), f'n={k}', ha='center', va='bottom')
    plt.xlabel(x열 + ' 구간'); plt.ylabel(y열 + ' 평균')
    plt.title(f'{x열} 구간별 {y열} 평균')
    plt.show()
''')
md(r'''
### 4. 막대 — 항목별 평균 <small>groupby · bar</small>
**언제** 글자 열(요일 · 지역 · 측정 지점)마다 비교할 때 (⓪ `항목열`) · **읽는 법** 어느 항목이 크고 작은지 · **조심** 항목마다 개수(n)가 다르면 평균을 그대로 믿기 어려워요
''')
code(r'''
if 고른것('막대(항목별 평균)'):
    if 항목열 in df.columns:
        표 = df.groupby(항목열)[y열].agg(['mean', 'count']).sort_values('mean', ascending=False)
        막대 = plt.bar(표.index.astype(str), 표['mean'])
        for m, k in zip(막대, 표['count']):
            plt.text(m.get_x() + m.get_width() / 2, m.get_height(), f'n={k}', ha='center', va='bottom')
        plt.xlabel(항목열); plt.ylabel(y열 + ' 평균')
        plt.title(f'{항목열}별 {y열} 평균')
        plt.xticks(rotation=45)
        plt.show()
    else:
        print(f'⚠ 막대(항목별): «{항목열}» 열이 없어요 — ⓪ 항목열에 글자 열 이름을 적어요. 지금 열: {list(df.columns)}')
''')
md(r'''
### 5. 상자그림 — 구간별 퍼짐 비교 <small>76쪽 · boxplot</small>
**언제** 평균만이 아니라 **얼마나 들쭉날쭉한지**까지 비교 · **읽는 법** 상자 위치 = 대부분의 값, 상자 높이 = 퍼짐, 점 = 튀는 값 · **조심** 구간마다 n이 적으면 상자가 불안정해요
''')
code(r'''
if 고른것('상자그림(구간별)'):
    구간 = pd.qcut(df[x열], q=구간수, duplicates='drop')
    묶음 = [g[y열].values for _, g in df.groupby(구간, observed=True)]
    이름 = [f'{c.left:.1f}~{c.right:.1f}' for c in 구간.cat.categories]
    plt.boxplot(묶음)
    plt.xticks(range(1, len(이름) + 1), 이름)
    plt.xlabel(x열 + ' 구간'); plt.ylabel(y열)
    plt.title(f'{x열} 구간별 {y열}의 퍼짐')
    plt.show()
''')
md(r'''
### 6. 히스토그램 — 값이 어디에 몰렸나 <small>hist</small>
**언제** y값의 **분포**(대부분 어느 값 근처인지, 한쪽으로 치우쳤는지) · **읽는 법** 막대가 높은 곳 = 그 값 근처의 날이 많음 · **조심** 막대 개수(bins)를 바꾸면 모양이 달라져요
''')
code(r'''
if 고른것('히스토그램'):
    plt.hist(df[y열], bins=10, edgecolor='white')
    plt.axvline(df[y열].mean(), color='red', linestyle='--', label=f'평균 {df[y열].mean():.1f}')
    plt.legend()
    plt.xlabel(y열); plt.ylabel('개수')
    plt.title(f'{y열}의 분포 (n={n})')
    plt.show()
''')
md(r'''
### 7. 히트맵 — 숫자 열끼리 상관계수 한눈에 <small>79쪽 · corr</small>
**언제** 숫자 열이 셋 이상일 때 · **읽는 법** 빨강 = 함께 늘어남(+), 파랑 = 반대로(−), 흰색 = 관계 약함(0) · **조심** 색이 진해도 **원인과 결과는 아니에요**
''')
code(r'''
if 고른것('히트맵'):
    숫자표 = df.select_dtypes('number')
    if 숫자표.shape[1] >= 2:
        import seaborn as sns
        sns.heatmap(숫자표.corr(), annot=True, fmt='.2f', cmap='coolwarm', vmin=-1, vmax=1)
        plt.title('숫자 열끼리 상관계수')
        plt.show()
    else:
        print('⚠ 히트맵: 숫자 열이 2개 이상이어야 해요.')
''')
md(r'''
---
## ⓮ 상관계수 — 그래프와 함께 꼭 적는 숫자 <small>79쪽 · corr</small>

> −1 ~ 1. **1 가까이** = 함께 늘어남 · **−1 가까이** = 하나가 늘면 다른 하나가 줄어듦 · **0 근처** = 관계 약함 (대략 |r| ≥ 0.7 강함 · 0.3~0.7 보통 · 0.3 미만 약함)
''')
star(md, '상관계수 구하기', '79쪽 · corr')
code(r'''
r = df[x열].corr(df[y열])                       # 두 열의 상관계수
print(f'{x열} ↔ {y열} 상관계수 r = {r:.3f}   (n = {n})')
세기 = '강한' if abs(r) >= 0.7 else '보통' if abs(r) >= 0.3 else '약한'
방향 = '함께 늘어나는(+)' if r > 0 else '반대로 움직이는(−)'
print(f'→ {세기} {방향} 관계' + ('' if n >= 10 else f'  ⚠ n={n}로 적어서 우연일 수 있어요'))
''')
stop(md, '②', '그래프는 **모양**, 상관계수는 **숫자** — 둘을 함께 적어야 해석이 정직해요. **상관 ≠ 원인과 결과**(아이스크림과 익사 사고는 둘 다 «더위» 때문).')
md(r'''
---
## (심화) 제3의 변수 찾기 <small>먼저 끝났으면</small>

> x와 y가 함께 움직여도 **둘 다에 영향을 주는 다른 것**(제3의 변수)이 있을 수 있어요. 표에 있는 다른 숫자 열과 y의 상관계수를 봐요 — 큰 것이 있으면 «데이터가 말하지 않는 것»에 적어요.
''')
code(r'''
다른열 = df.select_dtypes('number').drop(columns=[x열, y열], errors='ignore')
if 다른열.shape[1]:
    print(f'{y열} 과(와) 다른 숫자 열의 상관계수 (절댓값 큰 순)')
    print(다른열.corrwith(df[y열]).round(3).sort_values(key=abs, ascending=False).to_string())
else:
    print('다른 숫자 열이 없어요 — 제3의 변수 후보는 말로 적어 봐요(예: 요일 · 휴가철 · 날씨)')
''')
md(r'''
### 🧑‍💻 도전 — 내 손으로 그래프 한 줄 (선택 · 1학기 «정보»를 배운 학생)

> 위 ⭐ 코드를 본떠 **빈칸을 채워** 직접 그려 봐요. 안 해도 괜찮아요. 막히면 `#`을 지우기 전 상태로 두면 «모두 실행»에 영향이 없어요.
''')
code(r'''
# 예 1) 세 번째 열로 색을 나눈 산점도
# plt.scatter(df[x열], df[y열], c=df['____'], cmap='viridis'); plt.colorbar(label='____')
# plt.xlabel(x열); plt.ylabel(y열); plt.title(f'____ (n={n})'); plt.show()

# 예 2) 기간 · 지역 하나만 골라 다시 그리기
# 일부 = df[df['____'] == '____']
# plt.scatter(일부[x열], 일부[y열]); plt.title(f'____ (n={len(일부)})'); plt.show()
''')
md(r'''
---
## ✍️ 1차 해석 — **AI 없이** 먼저 (슬라이드 «나의 시각화와 1차 해석»)

**그래프 자가 점검** — ☐ 세로축을 잘라 차이를 부풀리지 않았다 ☐ n을 적었다 ☐ 상관을 원인과 결과로 말하지 않았다 ☐ 불리한 데이터도 남겼다

- **내가 고른 그래프와 이유**: «________ 그래프를 고른 까닭은 ________ 을(를) 보이기 위해서다.» (1차시 «맡은 분석»에서 바꿨다면 바꾼 이유도)
- **그래프에서 직접 본 것**(근거 수치 하나 이상): «________ 가 높을수록 ________ 는 ________ (r = ____, n = ____).»
- **나의 1차 해석**: «그래서 ________ 라고 생각한다.»
- **이 데이터가 말하지 않는 것**: «________ 때문이라고는 말할 수 없다(________ 의 영향 · ________ 기간/지역만).»

> 💬 3차시에 모둠원 그래프를 모아 **«어떤 그래프가 우리 가설을 가장 정직하게 보여 주나»** 를 함께 정해요. 다른 그래프를 고른 친구와 해석이 다르면 — 그게 좋은 토의거리예요.
''')
save(cells, '21_data_inquiry_my_graph.ipynb')
