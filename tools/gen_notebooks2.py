# -*- coding: utf-8 -*-
"""Ⅱ-02 교과서 전체(13) · Ⅱ-05 예측(14) · 분류(15) · 군집(16) 노트북 — gen_notebooks.py 의 도구를 그대로 씀"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from gen_notebooks import md, code, save, RAW, KFONT, HEAD

NB = {}
OX = lambda q, a: '<details><summary>' + q + '</summary>\n\n' + a + '\n\n</details>'

# ════════════════════════════════════════ 13 Ⅱ-02 전체
NB['13_unit2_02_preprocessing.ipynb'] = [
    md("""# 13 · Ⅱ-02 데이터 가공과 핵심 속성 추출 — 교과서 70~83쪽 전체
이 노트북 한 권에 **교과서 70~83쪽의 본문 · 옆 설명 · 실습 코드 ❶~⓮ · 읽을거리(상자그림)** 를 모두 담았습니다.
마지막에는 **80~82쪽 활동(건강검진 데이터)** 을 추가 활동으로 붙였습니다.

""" + HEAD + """

**학습 목표** (70쪽)
- 결측치와 이상치의 유무를 파악할 수 있다.
- 문제 해결에 필요한 속성이 무엇인지 선별할 수 있다.
- 데이터를 문제 해결에 적합한 형태로 전처리할 수 있다.

| 순서 | 내용 | 쪽 |
|---|---|---|
| 0 | 생각 열기 — 생일 파티 명단 | 70 |
| 1 | 전처리의 필요성과 네 가지 유형 (변환 · 통합 · 정제 · 축소) | 71 |
| 2 | 실습 ❶~⓫ — 의료비 데이터 전처리 | 72~77 |
| 3 | 실습 ⓬~⓮ — 데이터 축소와 핵심 속성(상관계수) | 78~79 |
| 4 | 읽을거리 — 상자그림과 IQR | 83 |
| 5 | **추가 활동** — 건강검진 데이터로 혈색소와 관련 깊은 속성 찾기 | 80~82 |"""),

    md("""---
## 0. 생각 열기 (70쪽)
전교 회장 **동동일**과 부회장 **동동이**는 «월별 생일자를 모아 생일 파티를 하겠다»는 공약을 냈습니다.
당선 후 두 사람은 **각자** 전교생에게 개인 정보 동의서를 받고 생년월일을 모았어요.

- 회장한테만 낸 학생 · 부회장한테만 낸 학생 · **두 사람 모두에게 낸 학생** · 아예 안 낸 학생이 섞여 있습니다.
- 그래서 **중복**도 있고 **빠진 응답**도 있고, 적은 **형태도 제각각**(070103 · 07/01/03 · 2007년 6월 15일 …)입니다.

> 🤖 «즉시 사용할 수 없는 형태로 데이터가 수집되는 일은 흔해. 수집된 데이터를 본격적으로 사용하는 단계(**본처리**)에 앞서 무엇을 해야 할까?»

이 «앞서 하는 일»이 바로 **전처리**입니다."""),

    md("""---
## 1. 데이터 전처리의 필요성과 유형 (71쪽)
데이터를 모으다 보면 특정 항목이 **없거나(결측치)**, **중복**되거나, **표현에 문제가 있는** 경우가 자주 생깁니다.
- **이상치** — 정상 범주에서 **벗어난** 값 (예: 키 973cm, 2월 31일)
- **결측치** — 기록상 **빈칸**인 값 (예: 지하철역 이용자 수에서 특정 날짜가 누락, 생년월일에서 «일»이 빠짐)

수집한 데이터를 목적에 맞게 쓰려면 대부분 **사전 가공**이 필요한데, 이것이 **전처리**입니다.
목적과 수집 상황에 따라 전처리 절차와 결과는 달라질 수 있습니다.

| 유형 | 하는 일 | 교과서 예 |
|---|---|---|
| **데이터 변환** | 표현 형태를 일관성 있게 통일 | 생년월일 070103 · 07/01/03 → 20070103 |
| **데이터 통합** | 여러 출처의 데이터를 하나로 | 백화점.csv(귤 35) + 온라인 판매.csv(귤 150) → 매출 합계(185) |
| **데이터 정제** | 이상치 · 결측치를 수정하거나 제거 | 키 772(이상치), 키 빈칸(결측치) |
| **데이터 축소** | 불필요한 데이터 제거 · 요약해 크기 줄이기 | «고객의 생일은 마트 이용 횟수 예측에 영향이 없다» → 생일 열 삭제 |

아래 네 셀은 네 가지 전처리를 **아주 작은 표**로 먼저 해 보는 것입니다. 차례로 실행하며 «전 → 후»를 비교하세요."""),
    code("""import pandas as pd

# ① 변환 — 생년월일 표현 통일
생일 = pd.DataFrame({'생일': ['070103', '07/01/03', '2007/04/07', '2007년 6월 15일']})
생일['통일'] = ['20070103', '20070103', '20070407', '20070615']   # 사람이 규칙을 정해 통일한 결과
생일"""),
    code("""# ② 통합 — 두 판매처의 기록을 하나로
백화점 = pd.DataFrame({'품목': ['귤'], '수량(박스)': [35]})
온라인 = pd.DataFrame({'품목': ['귤'], '수량(박스)': [150]})
합계 = pd.concat([백화점, 온라인]).groupby('품목', as_index=False).sum()
합계"""),
    code("""# ③ 정제 — 이상치(772)와 결측치(빈칸) 찾기
키 = pd.DataFrame({'사람': ['A', 'B', 'C', 'D', 'E'], '키': [186, 155, 772, None, 166]})
print(키)
print('결측치 개수 :', 키['키'].isnull().sum())
print('정상 범위(100~230)를 벗어난 값 :', 키[(키['키'] < 100) | (키['키'] > 230)]['키'].tolist())"""),
    code("""# ④ 축소 — 목표(연중 마트 이용 횟수 예측)와 관계없는 열 빼기
고객 = pd.DataFrame({'거주지~마트 거리': [1.2, 3.5], '생일': ['0103', '0615'], '가족 구성원 수': [4, 2], '연중 마트 이용 횟수': [52, 18]})
고객 = 고객.drop('생일', axis=1)
고객"""),
    md(OX('🧐 30초 개념 정리 (71쪽) — 눌러서 답 보기', """1. 이상치는 정상 범주에서 벗어난 값이고, 결측치는 기록상 빈칸인 값이다. → **O**
2. 데이터 ( **정제** )는 수집된 데이터의 이상치 또는 결측치를 수정하거나 제거하는 작업이다.""")),

    md("""---
## 2. 데이터 전처리 실습 (72~77쪽)
> 전처리를 **대량으로** 하려면 프로그래밍을 통한 **자동화**가 필수입니다.

**상황** — 공공의료기관에 근무하는 **나산출** 씨는 개인의 **연간 의료비 지출을 예측하는 모델**을 만들려고 데이터를 받았습니다.
(계약 번호 · 나이 · 성별 · BMI · 자녀 수 · 흡연 여부 · 연락처 · 의료비)  그런데 문제가 보입니다.
- 파일이 **두 개로 나뉘어** 있다
- **빈칸**이 있다
- **288세** 같은 이상한 데이터가 있다
- **연락처**처럼 의료비 예측과 관련 없는 항목이 있다
- 성별이 ‘여’, ‘남’, ‘남자’, ‘여자’ 등 **여러 가지로 표현**돼 있다

### 과정 ❶ 판다스 라이브러리 사용 준비하기
> 📌 **판다스(pandas)** — 데이터 분석에 쓰는 라이브러리. 유연한 데이터 구조와 도구를 제공한다.
> `import pandas as pd` → 표 형태 데이터를 다루는 판다스를 **별칭 pd** 로 쓰겠다는 준비."""),
    code("import pandas as pd"),
    md("""### 과정 ❷ 데이터 사용 준비하기
교과서는 `files.upload()` 로 파일 두 개를 올립니다(아래 접은 칸). 우리는 **선생님 저장소 주소에서 바로** 읽습니다.

> 📌 **데이터프레임(dataframe)** — 행과 열로 이루어진 **표** 형태의 자료 구조. 행은 개별 관찰값, 열은 그 관찰값의 특성(변수).
>
> | 확장명 | 파일 읽기 함수 |
> |---|---|
> | csv | `read_csv('파일')` |
> | xls 또는 xlsx | `read_excel('파일')` |

<details><summary>교과서 방식(시험 대비) — 눌러서 보기</summary>

```python
from google.colab import files   # 01 구글 코랩의 files 모듈을 쓰기 위한 명령
files.upload()                   # 02 «파일 선택» 버튼이 나타남 → 두 파일을 한꺼번에 선택
df1 = pd.read_csv('file1.csv')   # 03 file1.csv 를 데이터프레임으로 읽어 df1 에 할당
df2 = pd.read_csv('file2.csv')   # 04 file2.csv 를 데이터프레임으로 읽어 df2 에 할당
```
</details>"""),
    code(RAW + """
df1 = pd.read_csv(주소 + 'file1.csv')
df2 = pd.read_csv(주소 + 'file2.csv')
df1"""),
    code("df2"),
    md("""**살펴보기** — df1 의 ‘성별’은 «남 · 여», df2 는 «여 · 여자 · 남자». df2 의 11번 계약은 **BMI 가 NaN(빈칸)**, df1 의 3번은 **나이 288**.

### 과정 ❸ 데이터 변환하기
> 📌 **replace()** — 속성 전체에서 특정 값을 다른 값으로 **일괄** 바꾼다. `{'바꿀 값': '새 값'}` 사전 형태로 준다.

💡 «남자» → «남», «여자» → «여»."""),
    code("""df2['성별'] = df2['성별'].replace({'남자': '남', '여자': ____})
df2""", ["'여'"]),
    md("""### 과정 ❹ 데이터 통합하기
> 📌 **concat()** — 행 방향 또는 열 방향으로 데이터를 결합. **기본값은 행 방향**(아래로 이어 붙이기).

💡 합칠 데이터프레임들을 **리스트**로 → `[df1, df2]`"""),
    code("""df = pd.concat(____)
df""", ['[df1, df2]']),
    md("""통합할 때는 **중복**과 **단위 불일치**가 없는지 확인해야 합니다. 단위 불일치는 없으니 중복을 봅니다.
위 표에서 **계약번호 6** 이 두 번 나오지요?

### 과정 ❺ 데이터 중복 확인하기
> 📌 **duplicated()** — 값마다 중복이면 True, 아니면 False
> 📌 **any()** — 하나라도 True 가 있으면 True

데이터가 많을 때는 눈으로 찾을 수 없으니 이 두 함수를 이어 씁니다."""),
    code("df['계약번호'].duplicated().any()"),
    md("""### 과정 ❻ 중복 데이터 삭제하기
`drop_duplicates()` 는 한 행만 남기고 나머지 중복 행을 지웁니다.
`keep='first'` 는 «중복된 행들 중 **첫 행**이 정상이라 가정하고 남겨라»는 뜻입니다."""),
    code("""print('삭제 전 :', df.shape)
df = df.drop_duplicates(subset='계약번호', keep='first')
print('삭제 후 :', df.shape)"""),
    md("""### 3 데이터 정제 — 결측치와 이상치를 처리하는 두 방법 (75쪽 표 Ⅱ-5)
| 방법 | 설명 |
|---|---|
| **제거** | 값을 신뢰할 수 없으면 그 값 또는 그 행 자체를 삭제 |
| **대체** | 다시 수집할 수 있으면 새 값으로, 어렵다면 **최빈값**이나 **평균** 같은 추정치로 대체 |

> 🤖 «소속 학년 · 반 같은 **범주형** 데이터는 **최빈값**으로, 키 · 손 크기 · BMI 같은 **연속형** 데이터는 **평균**으로 대체할 수 있어.»

상황을 종합해 제거와 대체 중 알맞은 것을 고릅니다. **결측치나 이상치 자체가 의미 있거나 고칠 필요가 없으면 함부로 지우거나 바꾸지 않습니다.**
(이 예제에서는 지워도 괜찮다고 가정하고 **행 단위로 삭제**합니다.)

### 과정 ❼ 결측치 찾기
> 📌 **isnull()** — 빈칸이면 True, 아니면 False
> 📌 **sum()** — 속성마다 값을 모두 더함. True 는 1, False 는 0 으로 계산 → 열마다 «빈칸 개수»

> 🤖 «`df.info()` 의 **Non-Null** 열(비어 있지 않은 값의 개수)에서도 결측치를 짐작할 수 있어.»"""),
    code("df.____().sum()", ['isnull']),
    code("df.info()"),
    md("""### 과정 ❽ 결측치 삭제하기
`dropna()` 는 결측치가 있는 **행**을 삭제합니다. `shape` (행의 개수, 열의 개수)로 줄어든 것을 확인합니다."""),
    code("""print(df.shape)
df = df.dropna()
print(df.shape)"""),
    md("""### 과정 ❾ 이상치 탐색하기 — 상자그림
> 📌 `import matplotlib.pyplot as plt` — 시각화 라이브러리 matplotlib 을 **plt** 라는 별칭으로 준비
> 🤖 «코랩에서는 `plt.show()` 가 없어도 그림이 보이지만, **원칙적으로는 적는 것이 좋아.**»
> 🤖 «matplotlib 으로 막대그래프 · 산점도 · 꺾은선그래프 · 히스토그램 · 원그래프 등 여러 가지를 그릴 수 있어.»

💡 상자그림 함수 이름은 `boxplot`"""),
    code("""import matplotlib.pyplot as plt
plt.____(df['나이'])
plt.title('age')
plt.show()""", ['boxplot']),
    md("""상자 바깥에 **200세가 넘는 점 하나**가 보입니다. (왜 그 점이 «바깥»으로 그려지는지는 아래 **4. 상자그림 읽을거리**에서!)

### 과정 ❿ 이상치 제거 및 재시각화하기
200세를 최대 수명으로 보고, ‘나이’가 **200 이하**인 행만 남깁니다.
💡 «이하»는 `<=`"""),
    code("""condition = df['나이'] ____ 200     # 01 조건: 나이가 200 이하
df = df[condition]                  # 02 조건이 True 인 행들만으로 df 를 다시 구성
plt.boxplot(df['나이'])             # 03 다시 상자그림
plt.show()                          # 04 화면에 출력
print(df.shape)""", ['<=']),
    md("""### 과정 ⓫ 전처리를 마친 데이터 저장하기
`to_csv()` 로 새 CSV 파일로 저장합니다. 계약 번호가 있으니 **index(행 번호)는 저장하지 않도록** `index=False`.
> 🤖 «왼쪽 📁 **파일** 창을 새로고침하면 저장된 파일을 볼 수 있어. 다운로드 · 이름 바꾸기 · 삭제 · 경로 복사도 거기서.»

> ⚠️ 교과서 77쪽 본문은 «총 9개의 데이터»라고 적었지만, 실제로 실행하면 **10개**입니다(78쪽 결과 표도 10행). 바로 위 `shape` 를 확인해 보세요."""),
    code("df.to_csv('combined_file.csv', index=False)"),

    md("""---
## 3. 데이터 축소와 핵심 속성 추출 (78~79쪽)
**데이터 축소** — 목표와 관련 없는 데이터를 제거해 **핵심 속성만** 남기는 과정. 분석 정확도를 지키거나 높이고, 처리 시간을 줄이고, 저장 공간을 아낍니다.

- **연락처** → 의료비와 상관없음
- **계약 번호** → 중복을 거르는 데 썼지만 의료비 예측에는 필요 없음
- 나이 · 성별 · BMI · 자녀 수 · 흡연 여부 → 건강에 영향을 줄 수 있으니 **남김**

### 과정 ⓬ 데이터 축소하기
💡 `axis=1` 은 **열** 단위로 선택해 삭제하라는 뜻 (`axis=0` 이면 행)."""),
    code("""df = df.drop('연락처', axis=1)
df = df.drop('계약번호', axis=____)
df""", ['1']),
    md("""### 과정 ⓭ 핵심 속성 추출을 위한 시각화
**뚜렷한 연관성이 보이면 핵심 속성**, 아무 연관성이 없으면 핵심 속성이 아닙니다. 두 변수의 관계는 **산점도**로 봅니다.
> 📌 **산점도** — 두 변수 사이의 관계를 점으로 나타낸 그래프"""),
    code("""plt.scatter(df['나이'], df['의료비'])
plt.xlabel('age')
plt.ylabel('cost')
plt.show()"""),
    md("""나이와 의료비 사이의 연관성은 그림만으로는 찾기 어렵습니다. 그래서 연관성을 **수치로** 나타내는 **상관계수**를 씁니다.

### 과정 ⓮ 변수 간 상관관계 분석
> 📌 **상관계수(correlation coefficient)** — 두 변수 사이의 **선형 관계의 강도**를 나타내는 척도. **−1 이상 1 이하**, 절댓값이 클수록 뚜렷한 선형 관계.
> - 양수 → 함께 증가하거나 함께 감소 · 음수 → 한쪽이 늘 때 다른 쪽은 줄어듦
>
> 📌 **연속형 데이터** — 숫자로 측정된 데이터(키, 몸무게, 과목 점수)
> 📌 **범주형 데이터** — 몇 개의 항목으로 나뉜 데이터(성별 남/여, 흡연 여부 ◦/×)

`corr(numeric_only=True)` — **연속형(숫자) 속성끼리만** 상관계수를 구합니다."""),
    code("""corr = df.corr(numeric_only=True)
corr"""),
    code("""# (넓혀 보기) 상관계수를 색으로 — 히트맵
import seaborn as sns
sns.heatmap(corr, annot=True, cmap='coolwarm', vmin=-1, vmax=1)
plt.show()"""),
    md("""**해석** — 의료비와의 상관: **BMI 약 0.75** > 자녀 수 약 0.19 > 나이 약 0.10. BMI 가 의료비와 가장 큰 연관을 보입니다.

> 🤖 «실습 데이터는 **적은 수의 표본**만 썼으니 **함부로 일반화하지 않도록** 주의해. ‘BMI가 나이보다 의료비 지출과 더 큰 연관이 있다’를 일반적인 사실로 받아들이면 안 돼.»
> 그리고 상관은 **함께 움직인다**는 뜻일 뿐, **원인과 결과**는 아닙니다."""),

    md("""---
## 4. 읽을거리 — 상자그림(Box Plot)과 IQR (83쪽)
이상치는 정확한 기준을 세우기 어려워 결측치보다 찾기 어렵습니다. 오류 없이 찾으려면 그 분야의 **전문성**이 필요하고, 기준점이 없으면 완전히 **자동화하기도 어렵습니다**. 이럴 때 쓰는 도구가 **상자그림**입니다.

- 상자그림은 데이터의 **0% · 25%(Q1) · 50%(중앙값) · 75%(Q3) · 100%** 지점이 드러나게 그립니다.
- **IQR** = Q3 − Q1 (가운데 50% 데이터가 퍼진 폭)
- **Q1 − 1.5×IQR 보다 작거나, Q3 + 1.5×IQR 보다 큰** 값 → **이상치** (상자 수염 바깥의 **점**)

아래 셀은 file1 의 나이로 **직접 계산**해서, 상자그림이 왜 288을 점으로 그렸는지 확인합니다."""),
    code("""나이 = pd.read_csv(주소 + 'file1.csv')['나이']
Q1 = 나이.quantile(0.25)
Q3 = 나이.quantile(0.75)
IQR = Q3 - Q1
아래 = Q1 - 1.5 * IQR
위 = Q3 + 1.5 * IQR
print('나이 값 :', sorted(나이.tolist()))
print(f'Q1 = {Q1}, Q3 = {Q3}, IQR = {IQR}')
print(f'정상 범위 : {아래} ~ {위}')
print('이상치 :', 나이[(나이 < 아래) | (나이 > 위)].tolist())

plt.boxplot(나이)
for y, t in ((Q1, 'Q1'), (나이.median(), 'median'), (Q3, 'Q3'), (위, 'Q3+1.5*IQR')):
    plt.axhline(y, ls=':', lw=1); plt.text(1.12, y, t)
plt.show()"""),
    md("""**해 보기** — 위 셀의 288 을 60 으로 바꿔도 이상치로 나올까요? 직접 바꿔 보고 이유를 적어 보세요.

> 적어 보기:"""),
    md(OX('🧐 30초 개념 정리 · 진단하기 (82쪽) — 눌러서 보기', """- 데이터 변환 · 통합 · 정제 · 축소를 수행할 수 있는가? (상 · 중 · 하)
- 수집된 데이터를 가공하여 핵심 속성을 추출할 수 있는가? (상 · 중 · 하)
- 상관계수가 −0.9 인 두 변수는 관계가 약하다 → **X** (절댓값이 크면 강한 관계, 음수는 반대 방향)""")),

    md("""---
## 5. 추가 활동 — 생명과학과 인공지능 : 혈색소와 가장 관련 깊은 속성 찾기 (80~82쪽)
**혈색소**(헤모글로빈)는 산소와 이산화탄소를 운반하는 적혈구의 주요 성분입니다.
공공데이터포털의 «국민건강보험공단_건강검진정보»로 **혈색소와 가장 연관성이 높은 속성**을 찾아봅니다.

> 📌 **EDA(탐색적 데이터 분석)** — 데이터의 기본 특성을 시각적 · 통계적으로 파악하는 초기 분석 과정
> 🤖 교과서는 100만 명 파일(약 95MB)을 구글 드라이브의 `02/02` 폴더에 올리고 `drive.mount` 로 연결합니다(아래 접은 칸). 여기서는 같은 데이터에서 **3만 명을 무작위로 뽑은 표본**을 바로 읽습니다.

<details><summary>교과서 방식 — 드라이브 연결</summary>

```python
from google.colab import auth, drive
auth.authenticate_user()
drive.mount('/content/drive')
df = pd.read_csv('/content/drive/My Drive/02/02/국민건강보험공단_건강검진정보.csv', encoding='cp949')
```
</details>

### 단계 1 · 2 — 확보하고 살펴보기"""),
    code("""hc = pd.read_csv(주소 + 'health_checkup_30k.csv')
hc.head()"""),
    md("💡 데이터프레임의 정보(열 · 자료형 · Non-Null 개수)를 출력하는 함수는?"),
    code("hc.____()", ['info']),
    md("""### 단계 3 · 데이터 전처리
결손치유무 · 치아마모증율 · 제3대구치(사랑니)이상은 **Non-Null 이 0** — 열 전체가 비어 있습니다."""),
    code("hc.isnull().sum()"),
    code("""# 건강과 직접 관련이 없는 속성
hc = hc.drop(['기준년도', '가입자일련번호', '시도코드'], axis=1)
# 열 전체가 결측치인 속성
hc = hc.drop(['결손치유무', '치아마모증율', '제3대구치(사랑니)이상'], axis=1)
# 상관계수를 적용하기 어려운 범주형 속성
hc = hc.drop(['성별', '청력(좌)', '청력(우)', '흡연상태', '음주여부', '구강검진수검여부', '치아우식증유무', '치석'], axis=1)
hc.columns"""),
    md("""💡 특정 열의 이상치를 찾는 그림 → 상자그림
> 🤖 «연습을 위해 상자그림을 참고해 **18 이상**을 이상치로 보고 뺐어. 실제 데이터를 전처리할 때는 **충분히 생각하고** 결정을 내려!»"""),
    code("""plt.____(hc['연령대코드(5세 단위)'])
plt.show()
hc = hc[hc['연령대코드(5세 단위)'] < 18]
plt.boxplot(hc['연령대코드(5세 단위)'])
plt.show()""", ['boxplot']),
    md("### 단계 4 · 상관계수를 도출하고 핵심 속성 찾기\n💡 상관계수를 구하는 함수는?"),
    code("""corr = hc.____()
corr = corr['혈색소']
print('— 양의 상관 상위 —')
print(corr.sort_values(ascending=False).head())
print('— 음의 상관 상위 —')
print(corr.sort_values(ascending=True).head())""", ['corr']),
    md("""**정리해 보기**
1. 혈색소와 양의 상관이 큰 속성 셋: ______ (교과서: 신장 0.48 · 체중 0.45 · 허리둘레 0.35)
2. 음의 상관: ______ (교과서: HDL콜레스테롤 −0.18 · 연령대 −0.14)
3. «키가 크면 혈색소가 높다»는 원인과 결과일까요? 둘 다에 영향을 주는 **성별**을 떠올려 보세요.

> 적어 보기:

---
### 정답 예시 (막혔을 때만)
- ❸ `'여'` · ❹ `[df1, df2]` · ❼ `isnull` · ❾ `boxplot` · ❿ `<=` · ⓬ `axis=1`
- 추가 활동: `info` · `boxplot` · `corr`""")]

# ════════════════════════════════════════ 14 예측
NB['14_predict_regression.ipynb'] = [
    md("""# 14 · 예측 모델 구현과 평가 — 자동차 연비 맞히기
교과서 **Ⅱ-05(100~107쪽)** 의 «데이터 분리 → 모델 학습 → 모델 평가»를 **교과서와 다른 사례**로 다시 해 봅니다.

""" + HEAD + """

**문제 정의** — 자동차의 무게 · 마력 · 배기량 · 연식으로 **연비(mpg, 갤런당 마일)** 를 맞힌다.
연비는 **숫자** → **예측(회귀)** 문제 → 지도학습.

| 단계 | 이 노트북에서 | 핵심 함수 |
|---|---|---|
| ① 불러오기 · 탐색 | 행·열 · 결측치 · 요약 통계 · 그래프 | `load_dataset` `info` `describe` `isnull` |
| ② 전처리 | 결측 행 삭제, 특성 X · 정답 y 나누기 | `dropna` `df[[...]]` |
| ③ 데이터 분리 | 훈련 80% · 테스트 20% | `train_test_split` |
| ④ 모델 학습 | 선형 회귀 | `LinearRegression()` `fit` |
| ⑤ 예측 | 테스트 데이터 · 새 자동차 | `predict` |
| ⑥ 평가 | MAE · MSE · RMSE · R² · 그래프 | `mean_absolute_error` `mean_squared_error` `r2_score` |
| ⑦ 개선 | 특성 더하기 · 다른 모델과 비교 | `RandomForestRegressor` |
| ⑧ 해석 | 결과를 문장으로 | — |"""),
    code(KFONT),
    md("""---
## ① 불러오기와 탐색
`sns.load_dataset('mpg')` — seaborn 에 들어 있는 1970~80년대 자동차 398대 데이터. 올릴 파일이 없습니다.

| 열 | 뜻 |
|---|---|
| mpg | **연비(정답)** — 클수록 기름을 덜 씀 |
| cylinders · displacement | 실린더 수 · 배기량 |
| horsepower | 마력 |
| weight | 무게(파운드) |
| acceleration | 가속 시간(0→60마일, 초) |
| model_year | 연식(70 = 1970년) |
| origin · name | 생산지 · 차 이름 |"""),
    code("""import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

df = sns.load_dataset('mpg')
print(df.shape)       # (행 개수, 열 개수)
df.head()"""),
    md("💡 열마다 빈칸이 몇 개인지 → `isnull().sum()`"),
    code("""print(df.____().sum())
df.describe()       # 숫자 열의 개수 · 평균 · 표준편차 · 최솟값 · 사분위수 · 최댓값""", ['isnull']),
    md("""**읽기** — horsepower 에 빈칸 6개. describe 의 `mean`(평균)과 `50%`(중앙값)가 비슷하면 한쪽으로 크게 치우치지 않았다는 뜻입니다.

### 그래프로 관계 보기
연비와 무게 · 마력의 관계를 산점도로 봅니다. **오른쪽 아래로 내려가면 음의 관계**(무거울수록 연비가 낮다)."""),
    code("""fig, ax = plt.subplots(1, 3, figsize=(15, 4))
for a, col in zip(ax, ['weight', 'horsepower', 'model_year']):
    a.scatter(df[col], df['mpg'], s=10, alpha=0.6)
    a.set_xlabel(col); a.set_ylabel('mpg')
plt.show()

sns.heatmap(df.corr(numeric_only=True), annot=True, fmt='.2f', cmap='coolwarm', vmin=-1, vmax=1)
plt.show()"""),
    md("""**생각해 보기 ①** 연비와 상관이 가장 큰(절댓값) 속성은? 그 부호의 뜻은?

> 적어 보기:

---
## ② 전처리 — 결측 행 삭제, X 와 y 나누기
- **X(특성 · 독립변수 · 입력)** — 힌트로 쓸 열. 두 겹 대괄호 `df[['a', 'b']]` = 열 여러 개를 표로
- **y(정답 · 종속변수 · 레이블)** — 맞힐 열. 한 겹 `df['mpg']`
💡 처음엔 특성 하나(무게)로 시작합니다 — 그래야 직선을 그림으로 볼 수 있어요."""),
    code("""df = df.dropna()
X = df[['weight']]
y = df[____]
print(X.shape, y.shape)""", ["'mpg'"]),
    md("""---
## ③ 데이터 분리 — 훈련 데이터와 테스트 데이터 (교과서 101~102쪽)
> 🤖 «모아 둔 데이터를 전부 학습에 쓰면 평가할 데이터가 없어! **일부를 미리 떼어 두자.**» — 훈련 데이터 = 공부하는 **학습지**, 테스트 데이터 = **시험지**

`train_test_split(X, y, test_size=0.2, random_state=0)`
- `test_size=0.2` → 20%를 테스트로
- `random_state=0` → 무작위로 섞되 **누가 돌려도 같게**(재현성)
- 돌려주는 것 **네 개** → 순서 주의: `X_train, X_test, y_train, y_test`"""),
    code("""from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=____, random_state=0)
print('훈련 :', X_train.shape, ' 테스트 :', X_test.shape)""", ['0.2']),
    md("""---
## ④ 모델 학습 — `fit()`
> 🤖 «`fit()` 은 단순해 보여도 그 안에서 중요한 연산이 많이 일어나! 엉성하게 틀만 있던 모델이 데이터를 학습하며 똑똑해져.»

선형 회귀는 **연비 = a × 무게 + b** 에서 오차(MSE)가 가장 작아지는 **a(기울기) · b(절편)** 를 찾습니다. 이 a, b 가 학습으로 정해지는 **파라미터**입니다."""),
    code("""from sklearn.linear_model import LinearRegression
model = LinearRegression()
model.____(X_train, y_train)
print('기울기 a :', model.coef_[0])
print('절편   b :', model.intercept_)""", ['fit']),
    md("""**해석** — 기울기가 약 −0.0077 이면 «무게가 **1000파운드** 늘 때 연비가 약 **7.7 mpg 줄어든다**»는 뜻입니다.

### (애니메이션) 경사하강법으로 직선이 맞춰지는 모습
sklearn 은 한 번에 답을 계산하지만, 원리는 «오차가 줄어드는 쪽으로 a, b 를 조금씩 옮기기»(교과서 95쪽 경사하강법)입니다. 아래 셀을 실행하면 직선이 점점 맞아 가는 **애니메이션**이 나옵니다(▶ 누르기)."""),
    code("""import numpy as np
from matplotlib import animation
from IPython.display import HTML

x = (X_train['weight'].values - 3000) / 1000      # 계산이 쉽도록 단위 조정(1000파운드)
t = y_train.values
a, b, lr = 0.0, 0.0, 0.1                           # 처음 직선 · 학습률
hist = []
for step in range(60):
    pred = a * x + b
    err = pred - t
    hist.append((a, b, (err ** 2).mean()))
    a -= lr * 2 * (err * x).mean()                 # MSE 를 a 로 미분한 방향의 반대로
    b -= lr * 2 * err.mean()

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(11, 4))
ax1.scatter(x, t, s=8, alpha=0.5); line, = ax1.plot([], [], 'r-', lw=2)
ax1.set_xlabel('weight (1000 lb, centered)'); ax1.set_ylabel('mpg')
ax2.set_xlim(0, 60); ax2.set_ylim(0, max(h[2] for h in hist) * 1.05); ax2.set_xlabel('step'); ax2.set_ylabel('MSE')
curve, = ax2.plot([], [], 'b-')
xs = np.linspace(x.min(), x.max(), 2)
def draw(i):
    a, b, m = hist[i]
    line.set_data(xs, a * xs + b)
    curve.set_data(range(i + 1), [h[2] for h in hist[:i + 1]])
    ax1.set_title(f'step {i}  a={a:.2f}  b={b:.2f}')
    return line, curve
anim = animation.FuncAnimation(fig, draw, frames=len(hist), interval=120)
plt.close()
HTML(anim.to_jshtml())"""),
    md("""**보이는 것** — 오른쪽 MSE 곡선이 빠르게 내려가다 평평해집니다. 학습률 `lr` 을 0.9 로 바꾸면? 0.005 로 바꾸면? (교과서: 너무 작으면 오래 걸리고, 너무 크면 학습에 실패할 수 있다)

---
## ⑤ 예측 — `predict()`
💡 테스트 데이터의 특성 → `model.predict(X_test)`"""),
    code("""pred = model.____(X_test)
비교 = pd.DataFrame({'실제 mpg': y_test.values[:8], '예측 mpg': pred[:8].round(1)})
비교['잔차(실제-예측)'] = (비교['실제 mpg'] - 비교['예측 mpg']).round(1)
비교""", ['predict']),
    md("""**새 자동차 예측** — 입력은 학습 때와 **같은 열 이름 · 같은 모양(2차원 표)** 이어야 합니다."""),
    code("""새차 = pd.DataFrame({'weight': [2200, 3500, 4500]})
print(model.predict(새차).round(1))"""),
    md("""---
## ⑥ 평가 — 숫자 맞히기 모델의 성능 지표 (교과서 106~107쪽)
| 지표 | 뜻 | 좋은 방향 | 함수 |
|---|---|---|---|
| **MAE** | 평균적으로 몇 mpg 빗나갔나(절댓값 평균) | 0에 가깝게 | `mean_absolute_error(실제, 예측)` |
| **MSE** | 오차 제곱의 평균 — 큰 실수에 벌을 더 줌 | 0에 가깝게 | `mean_squared_error(실제, 예측)` |
| **RMSE** | MSE 의 제곱근 — 단위가 mpg 로 돌아옴 | 0에 가깝게 | `np.sqrt(MSE)` |
| **R²** | 연비가 달라지는 정도를 모델이 몇 % 설명하나 | 1에 가깝게 | `r2_score(실제, 예측)` 또는 `model.score(X_test, y_test)` |

💡 함수 안 순서는 늘 **(실제값, 예측값)**"""),
    code("""from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
mae = mean_absolute_error(y_test, pred)
mse = mean_squared_error(____, pred)
rmse = np.sqrt(mse)
r2 = r2_score(y_test, pred)
print(f'MAE  {mae:.2f} mpg')
print(f'MSE  {mse:.2f}')
print(f'RMSE {rmse:.2f} mpg   (연비 평균 {y_test.mean():.1f} 의 {rmse / y_test.mean() * 100:.0f}%)')
print(f'R²   {r2:.3f}')
print('훈련 R²', round(model.score(X_train, y_train), 3), '/ 테스트 R²', round(model.score(X_test, y_test), 3))""", ['y_test']),
    md("""### 그래프로 평가 — ① 실제 vs 예측  ② 잔차
- ① 점들이 **대각선**에 붙을수록 잘 맞힘
- ② 잔차(실제−예측)가 0 선 위아래로 **고르게** 흩어져야 좋음. 한쪽으로 **휘어진 모양**이면 직선이 놓친 패턴이 있다는 뜻"""),
    code("""fig, ax = plt.subplots(1, 2, figsize=(12, 4))
ax[0].scatter(y_test, pred, s=12); ax[0].plot([8, 46], [8, 46], 'r--')
ax[0].set_xlabel('actual mpg'); ax[0].set_ylabel('predicted mpg'); ax[0].set_title('actual vs predicted')
ax[1].scatter(pred, y_test - pred, s=12); ax[1].axhline(0, color='r', ls='--')
ax[1].set_xlabel('predicted mpg'); ax[1].set_ylabel('residual'); ax[1].set_title('residuals')
plt.show()"""),
    md("""**생각해 보기 ②** 잔차 그래프가 «U자»로 휘어 있나요? 그렇다면 무게와 연비의 관계가 직선이 아니라 **곡선**이라는 뜻입니다.

---
## ⑦ 개선 — 특성 더하기 · 다른 모델과 비교
같은 테스트 데이터 · 같은 지표로 비교해야 공정합니다(교과서 «모델 수정»)."""),
    code("""from sklearn.ensemble import RandomForestRegressor
특성들 = ['weight', 'horsepower', 'model_year', 'displacement', 'cylinders']
X2 = df[특성들]
X2_train, X2_test, y2_train, y2_test = train_test_split(X2, y, test_size=0.2, random_state=0)

결과 = {}
for 이름, m, Xtr, Xte in [('선형 회귀(무게 하나)', LinearRegression(), X_train, X_test),
                         ('선형 회귀(특성 5개)', LinearRegression(), X2_train, X2_test),
                         ('랜덤 포레스트(특성 5개)', RandomForestRegressor(300, random_state=0), X2_train, X2_test)]:
    m.fit(Xtr, y_train if Xtr is X_train else y2_train)
    p = m.predict(Xte)
    결과[이름] = {'RMSE': np.sqrt(mean_squared_error(y_test if Xte is X_test else y2_test, p)),
                  'R²': r2_score(y_test if Xte is X_test else y2_test, p)}
pd.DataFrame(결과).T.round(3)"""),
    code("""# 다중 선형 회귀의 계수 — «다른 특성이 같을 때» 그 특성이 1 늘면 연비가 얼마나 변하나
m5 = LinearRegression().fit(X2_train, y2_train)
pd.Series(m5.coef_, index=특성들).round(4)"""),
    md("""**주의** — 계수의 크기는 **단위**에 따라 달라집니다(무게는 1파운드, 연식은 1년). 크기끼리 직접 비교하려면 표준화가 필요해요.

---
## ⑧ 결과 해석 — 문장으로 쓰기
> 우리 모델(______)은 테스트 자동차 ___대에서 **RMSE ___ mpg** 로, 평균적으로 약 ___ mpg 빗나간다. **R² ___** 은 연비가 달라지는 정도의 ___% 를 설명한다는 뜻이다.
> 무게 하나만 쓸 때보다 연식 · 마력을 더하니 RMSE 가 ___ 줄었다. 다만 1970~80년대 미국 · 유럽 · 일본 자동차 데이터라서 **요즘 자동차(하이브리드 · 전기차)에는 그대로 쓸 수 없다.**

---
### 정답 예시 (막혔을 때만)
- ① `isnull` · ② `'mpg'` · ③ `0.2` · ④ `fit` · ⑤ `predict` · ⑥ `y_test`
- 무게 하나: R² 약 0.7 · 특성 5개 선형: 약 0.8 · 랜덤 포레스트: 약 0.85~0.9 (나누기에 따라 조금 다름)""")]

# ════════════════════════════════════════ 15 분류
NB['15_classify_titanic.ipynb'] = [
    md("""# 15 · 분류 모델 구현과 평가 — 타이타닉 생존자 분류
교과서 **Ⅱ-05(108~112쪽)** 의 분류 모델 구현과 평가를 **다른 사례**로 해 봅니다.

""" + HEAD + """

**문제 정의** — 1912년 타이타닉호 승객의 객실 등급 · 성별 · 나이 · 동승 가족 · 요금으로 **생존(1) / 사망(0)** 을 분류한다.
정답이 두 갈래 → **이진 분류** → 지도학습.

> ⚠️ 실제 사고로 희생된 사람들의 기록입니다. 숫자 뒤에 사람이 있다는 것을 기억하고, «누가 살아남기 쉬웠는가»가 **당시 사회의 불평등**(객실 등급, «여성과 아이 먼저»)을 보여 준다는 점도 함께 생각해 봅니다(Ⅲ단원 윤리와 연결).

| 단계 | 핵심 함수 |
|---|---|
| ① 탐색 | `load_dataset` `value_counts` `groupby().mean()` |
| ② 전처리 | `fillna` `map` `get_dummies` |
| ③ 분리 | `train_test_split(..., stratify=y)` |
| ④ 학습 | `LogisticRegression` `DecisionTreeClassifier` `KNeighborsClassifier` |
| ⑤ 예측 | `predict` `predict_proba` |
| ⑥ 평가 | `accuracy_score` `confusion_matrix` `classification_report` |
| ⑦ 해석 | 기준선 · 정밀도/재현율 · 임계값 · 특성 해석 |"""),
    code(KFONT),
    md("## ① 불러오기와 탐색"),
    code("""import pandas as pd, numpy as np
import seaborn as sns
import matplotlib.pyplot as plt

df = sns.load_dataset('titanic')
df = df[['survived', 'pclass', 'sex', 'age', 'sibsp', 'parch', 'fare', 'embarked']]
print(df.shape)
df.head()"""),
    md("""| 열 | 뜻 |
|---|---|
| survived | **정답** 1 생존 · 0 사망 |
| pclass | 객실 등급 1 · 2 · 3 |
| sex | 성별 |
| age | 나이 |
| sibsp · parch | 함께 탄 형제·배우자 수 · 부모·자녀 수 |
| fare | 요금 |
| embarked | 탑승 항구 C · Q · S |

💡 생존자 비율 → `value_counts(normalize=True)`"""),
    code("""print(df['survived'].____(normalize=True).round(3))
print(df.groupby('sex')['survived'].mean().round(3))
print(df.groupby('pclass')['survived'].mean().round(3))""", ['value_counts']),
    code("""fig, ax = plt.subplots(1, 3, figsize=(15, 4))
sns.barplot(data=df, x='sex', y='survived', ax=ax[0])
sns.barplot(data=df, x='pclass', y='survived', ax=ax[1])
sns.histplot(data=df, x='age', hue='survived', bins=30, ax=ax[2])
plt.show()"""),
    md("""**읽기** — 전체 생존율 약 38%. 성별 · 객실 등급에 따라 크게 다릅니다. → 이 둘이 **핵심 속성**일 가능성이 큽니다.

**기준선(baseline)** — 아무것도 안 배우고 «**전부 사망**»이라고만 찍어도 정확도가 약 **62%**! 우리 모델은 이것보다 확실히 나아야 의미가 있습니다.

---
## ② 전처리 — 결측치 · 범주를 숫자로
- `age` 결측 → **중앙값**으로 대체(연속형) · `embarked` 결측 → **최빈값**(범주형) — Ⅱ-02 표 Ⅱ-5
- 모델은 글자를 못 읽으니 `sex` → 0/1 로 (`map`)
- `embarked` 처럼 순서 없는 범주는 열 여러 개(0/1)로 펼침 (`get_dummies`, 원-핫 인코딩)"""),
    code("""print(df.isnull().sum())
df['age'] = df['age'].fillna(df['age'].median())
df['embarked'] = df['embarked'].fillna(df['embarked'].mode()[0])
df['sex'] = df['sex'].map({'male': 0, 'female': ____})
df = pd.get_dummies(df, columns=['embarked'], dtype=int)
df.head()""", ['1']),
    md("""---
## ③ 데이터 분리 — `stratify=y`
`stratify=y` 를 주면 훈련 · 테스트 양쪽의 **생존 비율이 같게** 나뉩니다(불균형 데이터에서 중요)."""),
    code("""from sklearn.model_selection import train_test_split
X = df.drop('survived', axis=1)
y = df['survived']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=____)
print(X_train.shape, X_test.shape, '훈련 생존율', y_train.mean().round(3), '테스트 생존율', y_test.mean().round(3))""", ['y']),
    md("""---
## ④ 학습 — 세 모델을 같은 조건으로
- **로지스틱 회귀** — 점수를 S자 곡선에 넣어 **생존 확률**로 (Ⅱ-04 농구 슛 예제와 같은 원리)
- **의사결정트리** — 예/아니요 질문으로 나눔 (`max_depth=3` 으로 깊이 제한)
- **k-최근접 이웃** — 가까운 5명의 다수결. **거리 기반이라 단위를 맞추는 `StandardScaler`** 를 앞에 붙임"""),
    code("""from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier, plot_tree
from sklearn.neighbors import KNeighborsClassifier
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

log = LogisticRegression(max_iter=1000).fit(X_train, y_train)
tree = DecisionTreeClassifier(max_depth=3, random_state=0).fit(X_train, y_train)
knn = make_pipeline(StandardScaler(), KNeighborsClassifier(n_neighbors=5)).fit(X_train, y_train)

for 이름, m in [('로지스틱', log), ('트리', tree), ('kNN', knn)]:
    print(f'{이름:5s} 훈련 {m.score(X_train, y_train):.3f}  테스트 {m.score(X_test, y_test):.3f}')
print('기준선(전부 사망)', round(1 - y_test.mean(), 3))"""),
    code("""plt.figure(figsize=(16, 6))
plot_tree(tree, feature_names=list(X.columns), class_names=['died', 'survived'], filled=True, fontsize=8)
plt.show()"""),
    md("""**트리 읽기** — 맨 위 질문(가장 먼저 나누는 속성)이 무엇인가요? `samples` 는 그 칸에 들어온 승객 수, `value` 는 [사망, 생존] 수입니다.

---
## ⑤ 예측 — `predict` 와 `predict_proba`
- `predict` → 0 또는 1
- `predict_proba` → **[사망 확률, 생존 확률]**. 생존 확률이 0.5 를 넘으면 1 로 분류합니다."""),
    code("""prob = log.predict_proba(X_test)[:, 1]
pred = log.predict(X_test)
pd.DataFrame({'실제': y_test.values[:10], '예측': pred[:10], '생존 확률': prob[:10].round(2)})"""),
    md("""---
## ⑥ 평가 — 정확도 · 혼동 행렬 · 정밀도 · 재현율 (교과서 108~112쪽)
**혼동 행렬(오분류표)**
|  | 예측 사망(0) | 예측 생존(1) |
|---|---|---|
| **실제 사망(0)** | 맞힘(TN) | 헛경보(FP) |
| **실제 생존(1)** | 놓침(FN) | 맞힘(TP) |

- **정확도** = 맞힌 수 ÷ 전체
- **정밀도** = «생존이라고 한 것» 중 진짜 생존 = TP ÷ (TP + FP)
- **재현율** = 진짜 생존자 중 찾아낸 비율 = TP ÷ (TP + FN)
- **F1** = 정밀도와 재현율의 조화 평균
💡 혼동 행렬 함수 → `confusion_matrix(실제, 예측)`"""),
    code("""from sklearn.metrics import accuracy_score, confusion_matrix, classification_report, ConfusionMatrixDisplay
print('정확도 :', round(accuracy_score(y_test, pred), 3))
cm = ____(y_test, pred)
print(cm)
ConfusionMatrixDisplay(cm, display_labels=['died', 'survived']).plot(cmap='Blues')
plt.show()
print(classification_report(y_test, pred, target_names=['died', 'survived']))""", ['confusion_matrix']),
    md("""**classification_report 읽기** — `precision` 정밀도 · `recall` 재현율 · `f1-score` · `support` 그 집단의 실제 개수. `accuracy` 줄이 정확도.

### 임계값(threshold) 바꿔 보기
«생존 확률 0.5 이상이면 생존»이라는 기준을 **0.3** 으로 낮추면? → 생존이라고 하는 경우가 늘어 **재현율 ↑ · 정밀도 ↓**. 구조 대상을 놓치면 안 되는 상황이라면 어느 쪽이 나을까요?"""),
    code("""from sklearn.metrics import precision_score, recall_score
for th in [0.3, 0.5, 0.7]:
    p = (prob >= th).astype(int)
    print(f'임계값 {th}  정확도 {accuracy_score(y_test, p):.3f}  정밀도 {precision_score(y_test, p):.3f}  재현율 {recall_score(y_test, p):.3f}')"""),
    md("""### 어떤 속성이 중요했나 — 로지스틱 계수와 트리 중요도
- 로지스틱 계수 **+** 는 생존 확률을 높이는 쪽, **−** 는 낮추는 쪽
- 트리 `feature_importances_` 는 나누는 데 얼마나 많이 쓰였는가"""),
    code("""pd.DataFrame({'로지스틱 계수': log.coef_[0].round(3), '트리 중요도': tree.feature_importances_.round(3)}, index=X.columns).sort_values('트리 중요도', ascending=False)"""),
    md("""### 새 승객 예측
💡 열 순서와 이름이 학습 때와 같아야 합니다(`X.columns`)."""),
    code("""새 = pd.DataFrame([[3, 0, 25, 0, 0, 7.9, 0, 0, 1],      # 3등실 · 남 · 25세 · 혼자 · S항
                   [1, 1, 30, 1, 0, 80.0, 1, 0, 0]],   # 1등실 · 여 · 30세 · 배우자와 · C항
                  columns=X.columns)
print(log.predict_proba(새)[:, 1].round(2))"""),
    md("""---
## ⑦ 결과 해석 — 문장으로
> 로지스틱 회귀 모델은 테스트 승객 ___명에서 정확도 ___로, 기준선(전부 사망 ___)보다 ___ 높다.
> 생존자 재현율은 ___ 로, 실제 생존자 ___명 중 ___명을 놓쳤다. 임계값을 0.3 으로 낮추면 재현율이 ___ 까지 오르지만 정밀도는 ___ 로 떨어진다.
> 가장 중요한 속성은 ___ 와 ___ 였다. 이것은 «모델이 공정하다»는 뜻이 아니라, **당시 구조 과정의 불평등이 데이터에 그대로 담겼다**는 뜻이다 — 이런 데이터로 오늘날 사람을 판정하면 안 된다(데이터 편향, Ⅱ-01 · Ⅲ-04).

---
### 정답 예시 (막혔을 때만)
- ① `value_counts` · ② `1` · ③ `stratify=y` · ⑥ `confusion_matrix`
- 세 모델 모두 테스트 정확도 약 0.78~0.82 — 기준선 0.62 보다 확실히 높음""")]

# ════════════════════════════════════════ 16 군집
NB['16_cluster_wine.ipynb'] = [
    md("""# 16 · 군집 모델 구현과 해석 — 정답 없이 와인 묶기
교과서 **Ⅱ-04 k-평균(97쪽)** 을 코랩으로 직접 구현하고, Ⅱ-05 처럼 **결과를 평가 · 해석**합니다.

""" + HEAD + """

**문제 정의** — 와인 178병의 화학 성분 13가지만 보고, **정답(품종)을 모르는 채로** 비슷한 와인끼리 묶는다.
정답을 쓰지 않음 → **비지도학습 · 군집화**. (정답은 마지막에 «채점용»으로만 꺼내 봅니다.)

| 단계 | 핵심 함수 |
|---|---|
| ① 불러오기 · 탐색 | `load_wine` `describe` |
| ② 전처리 — 단위 맞추기 | `StandardScaler().fit_transform` |
| ③ k 고르기 | `inertia_`(엘보) · `silhouette_score` |
| ④ 군집 학습 | `KMeans(n_clusters=k).fit_predict` |
| ⑤ 시각화 | `PCA(2)` · 애니메이션 |
| ⑥ 해석 | 군집별 평균 → 이름 붙이기 |
| ⑦ 평가 | 실제 품종과 비교 `crosstab` `adjusted_rand_score` |
| ⑧ 새 와인 | `predict` |"""),
    code(KFONT),
    md("## ① 불러오기와 탐색"),
    code("""import pandas as pd, numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import load_wine

wine = load_wine()
X = pd.DataFrame(wine.data, columns=wine.feature_names)
정답 = wine.target            # 0·1·2 품종 — 군집에는 쓰지 않고 마지막 채점에만!
print(X.shape)
X.describe().T[['mean', 'min', 'max']].round(2)"""),
    md("""**읽기** — `proline` 은 수백~1600, `hue` 는 0.5~1.7. 열마다 **단위와 크기**가 크게 다릅니다.
k-평균은 **거리**로 묶으니, 그대로 두면 숫자가 큰 proline 하나가 묶음을 혼자 정해 버립니다.

---
## ② 전처리 — 표준화(단위 맞추기)
`StandardScaler` — 열마다 «평균 0, 표준편차 1»로 바꿉니다. (Ⅱ-02 의 «변환»)
💡 학습과 변환을 한 번에 → `fit_transform`"""),
    code("""from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()
Z = scaler.____(X)
print(Z.mean(axis=0).round(2)[:5], Z.std(axis=0).round(2)[:5])""", ['fit_transform']),
    md("""---
## ③ k 는 몇 개로? — 엘보 방법과 실루엣 점수
k 는 **사람이 정하는 하이퍼파라미터**(교과서 97쪽). 두 가지 단서로 고릅니다.
- **엘보(팔꿈치)** — k 를 늘릴수록 «점과 중심 사이 거리 제곱의 합»(`inertia_`)이 줄어드는데, **확 꺾이는 지점**이 알맞은 k
- **실루엣 점수** — «내 무리와는 가깝고, 옆 무리와는 먼 정도» (−1 ~ 1, **클수록 잘 묶임**)"""),
    code("""from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
ks = range(2, 9)
inertia, sil = [], []
for k in ks:
    km = KMeans(n_clusters=k, n_init=10, random_state=0).fit(Z)
    inertia.append(km.inertia_)
    sil.append(silhouette_score(Z, km.labels_))
fig, ax = plt.subplots(1, 2, figsize=(11, 3.5))
ax[0].plot(ks, inertia, 'o-'); ax[0].set_xlabel('k'); ax[0].set_title('elbow (inertia)')
ax[1].plot(ks, sil, 'o-'); ax[1].set_xlabel('k'); ax[1].set_title('silhouette')
plt.show()
print('실루엣이 가장 큰 k :', list(ks)[int(np.argmax(sil))])"""),
    md("""---
## ④ 군집 학습 — `fit_predict`
💡 무리 수 k → `n_clusters`"""),
    code("""km = KMeans(____=3, n_init=10, random_state=0)
무리 = km.fit_predict(Z)
print(pd.Series(무리).value_counts().sort_index())""", ['n_clusters']),
    md("""---
## ⑤ 시각화 — 13차원을 2차원으로(PCA) · 애니메이션
열이 13개라 그대로는 못 그립니다. **PCA** 로 정보를 최대한 살린 **두 축**으로 줄여 그립니다(모델 도감 «주성분 분석»)."""),
    code("""from sklearn.decomposition import PCA
pca = PCA(2)
P = pca.fit_transform(Z)
C = pca.transform(km.cluster_centers_)
plt.scatter(P[:, 0], P[:, 1], c=무리, cmap='viridis', s=18)
plt.scatter(C[:, 0], C[:, 1], c='red', marker='X', s=200, label='centers')
plt.xlabel('PC1'); plt.ylabel('PC2'); plt.legend(); plt.title('k-means clusters')
plt.show()
print('두 축이 담은 정보 :', (pca.explained_variance_ratio_.sum() * 100).round(1), '%')"""),
    md("""### (애니메이션) 교과서 97쪽 네 단계 — 초기 중심 → 할당 → 갱신 → 반복
2차원으로 줄인 점들 위에서 k-평균을 **한 걸음씩** 돌려 봅니다. ▶ 를 누르세요."""),
    code("""from matplotlib import animation
from IPython.display import HTML
rng = np.random.default_rng(3)
cent = P[rng.choice(len(P), 3, replace=False)]      # ① 초기 중심(무작위)
frames = []
for it in range(8):
    d = ((P[:, None, :] - cent[None]) ** 2).sum(-1)
    lab = d.argmin(1)                                 # ② 할당: 가장 가까운 중심
    frames.append((cent.copy(), lab.copy()))
    new = np.array([P[lab == j].mean(0) for j in range(3)])   # ③ 갱신: 무리의 평균으로
    if np.allclose(new, cent): break                  # ④ 바뀌지 않으면 멈춤
    cent = new
fig, ax = plt.subplots(figsize=(6, 5))
def draw(i):
    ax.clear(); c, l = frames[i]
    ax.scatter(P[:, 0], P[:, 1], c=l, cmap='viridis', s=15)
    ax.scatter(c[:, 0], c[:, 1], c='red', marker='X', s=250)
    ax.set_title(f'iteration {i + 1}')
anim = animation.FuncAnimation(fig, draw, frames=len(frames), interval=900)
plt.close()
HTML(anim.to_jshtml())"""),
    md("""---
## ⑥ 해석 — 무리마다 평균을 보고 «이름» 붙이기
군집은 번호(0 · 1 · 2)만 줄 뿐, **뜻은 사람이 붙입니다.** 원래 단위의 평균을 비교해 보세요."""),
    code("""X['무리'] = 무리
요약 = X.groupby('무리')[['alcohol', 'malic_acid', 'color_intensity', 'hue', 'flavanoids', 'proline']].mean().round(2)
요약"""),
    md("""**이름 붙여 보기** — 예: «알코올·프롤린 높은 무리», «색이 옅고 알코올 낮은 무리», «색이 진하고 플라보노이드 낮은 무리» …

> 무리 0: ______ · 무리 1: ______ · 무리 2: ______

---
## ⑦ 평가 — 숨겨 둔 정답과 비교하기
비지도학습에는 원래 «정답률»이 없습니다. 이번엔 마침 정답(품종)이 있어 **얼마나 비슷하게 묶었는지** 확인만 해 봅니다.
- `pd.crosstab(무리, 정답)` — 행: 우리가 만든 무리 / 열: 실제 품종
- `adjusted_rand_score` — 두 묶음이 얼마나 일치하나 (1 완전 일치 · 0 우연 수준). **번호가 달라도 묶음이 같으면 1**"""),
    code("""from sklearn.metrics import adjusted_rand_score
print(pd.crosstab(무리, 정답, rownames=['무리'], colnames=['실제 품종']))
print('일치도(ARI) :', round(adjusted_rand_score(정답, 무리), 3))"""),
    code("""# 비교 실험 — 표준화를 안 하면?
무리2 = KMeans(n_clusters=3, n_init=10, random_state=0).fit_predict(X.drop(columns='무리'))
print('표준화 없이 ARI :', round(adjusted_rand_score(정답, 무리2), 3))"""),
    md("""**생각해 보기** — 표준화를 했을 때와 안 했을 때 일치도가 얼마나 다른가요? 왜 그럴까요? (힌트: proline 의 숫자 크기)

---
## ⑧ 새 와인은 어느 무리?
새 데이터도 **같은 scaler 로 변환한 뒤** `predict` 합니다."""),
    code("""새와인 = X.drop(columns='무리').iloc[[0, 70, 150]]      # 예시로 세 병을 다시 넣어 봄
print(km.predict(scaler.transform(새와인)))"""),
    md("""---
## 결과 해석 — 문장으로
> 와인 178병을 화학 성분 13가지로 표준화한 뒤 k-평균(k=___)으로 묶었다. 실루엣 점수는 ___ 로 k=___ 일 때 가장 높았다.
> 무리 ___ 는 알코올과 프롤린이 높은 와인, 무리 ___ 는 … 이었다. 숨겨 둔 품종과 비교하니 일치도(ARI)가 ___ 로 **정답 없이도 품종을 거의 되찾았다.**
> 표준화를 하지 않으면 일치도가 ___ 로 떨어졌다 — 거리 기반 모델은 **단위 맞추기**가 필수다.

---
### 정답 예시 (막혔을 때만)
- ② `fit_transform` · ④ `n_clusters`
- k=3 에서 실루엣이 가장 크고, ARI 는 약 0.9 · 표준화 없이 약 0.37""")]

if __name__ == '__main__':
    for name, cells in NB.items():
        save(name, cells)
        save(name, cells, solve=True)
        print('saved', name, len(cells))
