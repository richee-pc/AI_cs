# -*- coding: utf-8 -*-
"""Ⅱ 대단원 마무리 · 종합 실습(18) — 데이터 공방에서 만든 더러운 데이터로 다섯 걸음 끝까지 · gen_notebooks.py 도구 사용"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from gen_notebooks import md, code, save, RAW, KFONT, HEAD

NB = {}
OX = lambda q, a: '<details><summary>' + q + '</summary>\n\n' + a + '\n\n</details>'
WEB = 'https://richee-pc.github.io/AI_cs/'
DG = WEB + 'datagen.html'

NB['18_unit2_review_practice.ipynb'] = [
    md("""# 18 · Ⅱ 대단원 마무리 — 종합 실습: 다섯 걸음으로 끝까지
교과서 **63쪽 그림 Ⅱ-3 «기계학습을 이용한 문제 해결 절차»** 다섯 걸음을, **일부러 더럽힌 데이터** 하나로 처음부터 끝까지 혼자 해 봅니다.
마지막에는 **같은 데이터로 예측 모델과 분류 모델을 견주어 «모델 고르기»** 를 하고, 139~141쪽 대단원 마무리 문제와 이어 봅니다.

""" + HEAD + """

> 📦 데이터: 학생 300명의 **학습 습관과 시험 점수(가상 데이터)**. 우리 수업의 [🧰 데이터 공방](""" + DG + """)에서
> 학습 습관 템플릿에 결측 · 이상치 · 중복 · 오탈자 · 단위 · 날짜 문제를 넣어 만든 연습용 파일입니다. 다른 주제로 한 번 더 하고 싶으면 데이터 공방에서 «Ⅱ-02 전처리» 템플릿으로 새로 만들어 보세요.

| 걸음 | 교과서 63쪽 | 이 노트북 |
|---|---|---|
| ① | 문제 정의 | 무엇을 맞힐까 — 점수(숫자)? 합격(범주)? |
| ② | 데이터 선정 · 수집 · 전처리 | 점검 → 정제(중복 · 이상치 · 결측치) → 변환(표기 · 범주 → 숫자) → 축소 → 핵심 속성 |
| ③ | 기계학습 유형과 알고리즘 선정 | 정답 열의 모양으로 고르기 |
| ④ | 모델 생성 | 모델 네 개씩 학습 |
| ⑤ | 성능 평가 및 수정 | MSE · R² / 정확도 · 정밀도 · 재현율 → 전처리 효과 확인 → 모델 선택 |

> 🤖 «순서대로 진행하기 어려운 상황이 된다면 전 단계로 돌아가서 다시 작업을 수행할 수 있어!» (63쪽 옆)"""),

    md("""---
## ① 문제 정의
같은 데이터라도 **무엇을 맞힐지**에 따라 문제의 종류가 달라집니다.
- **문제 A** — 습관으로 **시험 점수(숫자)** 를 맞힌다 → ?
- **문제 B** — 습관으로 **60점 이상인지(예 / 아니오)** 를 가려낸다 → ?

<details><summary>답 — 눌러서 보기</summary>

A 는 정답이 숫자라서 **지도 학습 · 예측(회귀)**, B 는 정답이 범주라서 **지도 학습 · 분류**입니다. 정답 열이 아예 없다면 **비지도 학습 · 군집**이었겠지요.
</details>"""),

    md("""---
## ② 데이터 선정 · 수집 · 전처리
### 2-1 불러오기"""),
    code(KFONT + """
""" + RAW + """
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

df = pd.read_csv(주소 + 'ux_study_habits.csv')
print(df.shape)
df.head(12)"""),
    md("""벌써 수상한 것이 보이나요? 빈칸, `29.7` 시간 공부, `2026/5/21` 과 `20260519` 가 섞인 날짜, «예 · Y · 네»…

### 2-2 점검 — 고치기 전에 먼저 «무엇이 문제인지» 목록 만들기
💡 빈칸: 열마다 **빈칸 수**를 세는 함수 — `isnull()` 뒤에 무엇을 붙이면 «합계»가 될까요?"""),
    code("""df.info()
print('\\n열마다 빈칸 :\\n', df.isnull().____())
print('\\n완전히 같은 줄 :', df.duplicated().sum(), '개')""", ['sum']),
    code("""df.describe().round(2)        # 최소 · 최대에서 말이 안 되는 값을 찾아보세요"""),
    code("""for 열 in ['아침식사', '학원']:
    print(열, df[열].unique())      # 같은 뜻인데 다르게 적힌 것"""),
    md("""**내가 찾은 문제 적기** (셀을 두 번 눌러 고치세요)
- 결측치:
- 중복:
- 이상치 · 단위 오류:
- 표기 불일치:
- 날짜 형식:

### 2-3 정제 ① — 중복 지우기
💡 빈칸: «중복(duplicates)을 지운다(drop)» — 그리고 **`df = ` 로 다시 받아야** 지워진 채로 남습니다."""),
    code("""print('지우기 전 :', len(df))
df = df.____()
print('지운 뒤   :', len(df))""", ['drop_duplicates']),
    md("""### 2-4 축소 — 문제와 관련 없는 열 빼기
`번호` 는 학생을 구분할 뿐이고, `조사일` 은 형식까지 뒤죽박죽입니다. 둘 다 **점수와 관련(관련성)** 이 없으니 뺍니다.
> 날짜가 꼭 필요하다면 `pd.to_datetime(df['조사일'], format='mixed', errors='coerce')` 로 통일할 수 있지만, «5월 17일» 처럼 해가 없는 것은 끝내 비게 됩니다."""),
    code("""df = df.drop(['번호', '조사일'], axis=1)
df.columns.tolist()"""),
    md("""### 2-5 변환 ① — 표기 통일하기
앞뒤 빈칸을 먼저 지우고(`str.strip()`), 같은 뜻의 다른 표기를 하나로 바꿉니다.

💡 빈칸: 사전 `{'바꿀 것': '바꿀 값'}` 을 받아 값을 바꾸는 함수 — Ⅱ-02 실습 ❸ 에서 썼어요."""),
    code("""df['아침식사'] = df['아침식사'].str.strip().replace({'Y': '예', 'yes': '예', '네': '예', 'N': '아니오', 'no': '아니오', '아니요': '아니오'})
df['학원'] = df['학원'].str.strip().____({'O': '다님', 'X': '안 다님', '안다님': '안 다님'})
for 열 in ['아침식사', '학원']:
    print(열, df[열].unique())""", ['replace']),
    md("""### 2-6 정제 ② — 이상치 · 단위 오류 찾기
상자그림으로 먼저 봅니다. 상자에서 **멀리 혼자 떨어진 점**이 이상치 후보입니다."""),
    code("""숫자열 = ['공부시간', '수면시간', '스마트폰', '결석일수', '시험점수']
df[숫자열].plot(kind='box', subplots=True, layout=(1, 5), figsize=(14, 3.4), sharey=False)
plt.tight_layout(); plt.show()"""),
    md("""IQR 로 기계적으로 지울 수도 있지만, 여기서는 **상식으로 «말이 되는 범위»** 를 정하는 편이 정확합니다.
`29.7` 시간 공부(하루는 24시간!)는 단위가 10배로 잘못 적힌 것, `-37` 점은 있을 수 없는 점수입니다.
범위를 벗어난 값은 **빈칸(NaN)으로 바꾼 뒤** 다음 걸음에서 채웁니다.

💡 빈칸: «사이에 있나?» 를 묻는 함수 — 영어로 «between»."""),
    code("""범위 = {'공부시간': (0, 8), '수면시간': (3, 11), '스마트폰': (0, 12), '결석일수': (0, 20), '시험점수': (0, 100)}
for 열, (낮, 높) in 범위.items():
    벗어남 = df[열].notnull() & ~df[열].____(낮, 높)
    print(f'{열:5} 범위 밖 {벗어남.sum()}개 →', df.loc[벗어남, 열].tolist())
    df.loc[벗어남, 열] = np.nan""", ['between']),
    md("""> 🤔 `0.02` 시간(÷10 단위 오류)은 범위 안이라 **걸러지지 않았습니다.** 규칙만으로 모든 오류를 찾을 수는 없어요 — 그래서 **데이터를 모을 때부터** 정확성이 중요합니다(Ⅱ-01 좋은 데이터의 기준).

### 2-7 정제 ③ — 결측치 다루기
- **정답(시험점수)이 빈 줄**은 배울 수 없으니 **지웁니다.**
- 속성의 빈칸은 숫자는 **중앙값**, 범주는 **가장 많은 값(최빈값)** 으로 채웁니다(이상치에 덜 흔들리는 중앙값).

💡 빈칸: 빈칸을 채우는(fill) 함수."""),
    code("""df = df.dropna(subset=['시험점수'])
for 열 in ['공부시간', '수면시간', '스마트폰', '결석일수']:
    df[열] = df[열].____(df[열].median())
for 열 in ['아침식사', '학원']:
    df[열] = df[열].fillna(df[열].mode()[0])
print(len(df), '줄 남음 · 남은 빈칸', df.isnull().sum().sum(), '개')""", ['fillna']),
    md("""### 2-8 변환 ② — 범주를 숫자로
모델은 숫자만 먹습니다. «예/아니오», «다님/안 다님» 처럼 **둘 중 하나**면 1 / 0 으로 바꾸면 됩니다."""),
    code("""df['아침식사'] = (df['아침식사'] == '예').astype(int)
df['학원'] = (df['학원'] == '다님').astype(int)
df.head()"""),
    md("""### 2-9 핵심 속성 — 점수와 얼마나 관련 있나 (상관계수, Ⅱ-02 실습 ⓮)"""),
    code("""상관 = df.corr()['시험점수'].drop('시험점수').sort_values()
print(상관.round(3))
상관.plot(kind='barh', color=['tab:red' if v < 0 else 'tab:blue' for v in 상관])
plt.title('시험점수와의 상관계수'); plt.axvline(0, color='k', lw=.8); plt.show()"""),
    md("""> 공부 시간이 가장 큰 양(+)의 관계, 스마트폰이 음(−)의 관계일 거예요. 그런데 **상관은 인과가 아닙니다** — «스마트폰을 줄이면 점수가 오른다»는 이 데이터만으론 말할 수 없어요.
> 수면시간은 상관이 작게 나와도 **«너무 적거나 너무 많으면 낮은»** 곡선 모양일 수 있습니다(직선 관계만 재는 상관계수의 한계).

---
## ③ 기계학습 유형과 알고리즘 선정

| 문제 | 정답 열 | 유형 | 후보 알고리즘 | 성능 지표 |
|---|---|---|---|---|
| A 점수 맞히기 | 숫자 | 지도 · **예측** | 선형 회귀 · 의사결정트리 · 랜덤 포레스트 · 신경망 | **MSE**(작을수록) · **R²**(1에 가까울수록) |
| B 60점 이상? | 범주 | 지도 · **분류** | 로지스틱 회귀 · k-NN · 의사결정트리 · 신경망 | **정확도 · 정밀도 · 재현율** |

> ⚠ 교과서 141쪽 7번처럼 **지표를 잘못 고르는** 일이 흔합니다. 예측 모델에 정밀도를 쓰거나, 분류 모델에 MSE 를 쓰면 안 돼요.

---
## ④ 모델 생성 · ⑤ 성능 평가 — 문제 A (예측)
k-NN · 신경망처럼 **거리나 가중치 크기에 민감한 모델**은 단위를 맞춰야 하므로 `StandardScaler` 를 앞에 붙입니다(Ⅱ-07 정규화와 같은 이유).

💡 빈칸: 결정계수(R²)를 계산하는 함수 — `r2` 와 `score` 를 밑줄로."""),
    code("""from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor
from sklearn.neural_network import MLPRegressor
from sklearn.metrics import mean_squared_error, r2_score
import warnings; warnings.filterwarnings('ignore')

x = df.drop('시험점수', axis=1)
y = df['시험점수']
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=0)

예측모델 = {
    '선형 회귀': LinearRegression(),
    '의사결정트리': DecisionTreeRegressor(max_depth=4, random_state=0),
    '랜덤 포레스트': RandomForestRegressor(n_estimators=200, random_state=0),
    '신경망(16-8)': make_pipeline(StandardScaler(), MLPRegressor((16, 8), max_iter=3000, random_state=0)),
}
결과A = []
for 이름, m in 예측모델.items():
    m.fit(x_train, y_train)
    p = m.predict(x_test)
    결과A.append((이름, mean_squared_error(y_test, p), ____(y_test, p)))
표A = pd.DataFrame(결과A, columns=['모델', 'MSE', 'R²']).round(3).sort_values('R²', ascending=False)
표A""", ['r2_score']),
    md("""선형 회귀의 **기울기**를 보면 «무엇이 점수를 얼마나 올리고 내리는지» 설명할 수 있습니다(설명 가능성)."""),
    code("""lr = 예측모델['선형 회귀']
pd.Series(lr.coef_, index=x.columns).round(2).sort_values()"""),
    md("""### 전처리가 정말 효과가 있었을까? — «수정» 확인
**원본 데이터**에서 빈칸 줄만 지우고(중복 · 이상치 · 표기는 그대로) 똑같이 선형 회귀를 해 봅니다."""),
    code("""원본 = pd.read_csv(주소 + 'ux_study_habits.csv')[['공부시간', '수면시간', '스마트폰', '결석일수', '시험점수']].dropna()
xo_tr, xo_te, yo_tr, yo_te = train_test_split(원본.drop('시험점수', axis=1), 원본['시험점수'], test_size=0.2, random_state=0)
대충 = LinearRegression().fit(xo_tr, yo_tr)
print('전처리 없이   R² =', round(r2_score(yo_te, 대충.predict(xo_te)), 3))
print('전처리 한 뒤  R² =', round(r2_score(y_test, lr.predict(x_test)), 3))"""),
    md("""> 이상치 몇 개가 직선을 크게 비틀어 놓습니다. **«데이터를 어떻게 다듬느냐가 성능을 가른다»** — Ⅱ단원 전체를 꿰는 한 줄입니다.

---
## ④ · ⑤ 문제 B (분류) — 같은 데이터, 정답만 바꾸기
💡 빈칸: 60점 **이상**이면 1."""),
    code("""yb = (df['시험점수'] ____ 60).astype(int)
print(yb.value_counts())
print('«모두 60점 미만»이라고만 찍어도 정확도 :', round((yb == 0).mean(), 3), '← 기준선')""", ['>=']),
    md("""두 범주의 개수가 꽤 차이 납니다. 이럴 때 **정확도만 보면 속기 쉬워서** 정밀도와 재현율을 함께 봅니다. 나눌 때 `stratify` 로 비율도 맞춰요."""),
    code("""from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.neural_network import MLPClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, confusion_matrix

xb_train, xb_test, yb_train, yb_test = train_test_split(x, yb, test_size=0.2, random_state=0, stratify=yb)
분류모델 = {
    '로지스틱 회귀': make_pipeline(StandardScaler(), LogisticRegression()),
    'k-NN (k=5)': make_pipeline(StandardScaler(), KNeighborsClassifier(5)),
    '의사결정트리': DecisionTreeClassifier(max_depth=3, random_state=0),
    '신경망(16-8)': make_pipeline(StandardScaler(), MLPClassifier((16, 8), max_iter=3000, random_state=0)),
}
결과B = []
for 이름, m in 분류모델.items():
    p = m.fit(xb_train, yb_train).predict(xb_test)
    결과B.append((이름, accuracy_score(yb_test, p), precision_score(yb_test, p), recall_score(yb_test, p)))
표B = pd.DataFrame(결과B, columns=['모델', '정확도', '정밀도', '재현율']).round(3).sort_values('정확도', ascending=False)
표B"""),
    code("""최고 = 표B.iloc[0]['모델']
print(최고, '의 오분류표 (행 = 실제 0 · 1, 열 = 예측 0 · 1)')
print(confusion_matrix(yb_test, 분류모델[최고].predict(xb_test)))"""),
    md("""의사결정트리는 **판단 규칙을 그림으로** 보여 줍니다(설명이 필요할 때 유리)."""),
    code("""from sklearn.tree import plot_tree
plt.figure(figsize=(14, 5))
plot_tree(분류모델['의사결정트리'], feature_names=list(x.columns), class_names=['60 미만', '60 이상'], filled=True, fontsize=9)
plt.show()"""),
    md("""---
## ⑤ 모델 선택 — 점수 하나로만 고르지 않기
| 기준 | 생각할 것 |
|---|---|
| **성능** | 표A 의 R², 표B 의 정확도 · 재현율 — 차이가 아주 작다면? |
| **설명** | 학생 · 선생님에게 «왜?»를 말해 줘야 한다면 선형 회귀 · 트리 |
| **시간 · 크기** | 데이터 300줄 — 딥러닝이 꼭 필요할까?(138쪽: 딥러닝은 데이터가 많을 때 강하고, 학습이 오래 걸림) |
| **틀렸을 때의 피해** | «60점 미만인데 이상이라고» 하면 도움이 필요한 학생을 놓친다 → 무엇을 우선할까? |

**나의 결론 쓰기** (셀을 두 번 눌러 고치세요)
> 문제 A 에는 ___ 모델을 고르겠다. 왜냐하면 R² 가 ___ 이고 ___ 때문이다.
> 문제 B 에는 ___ 모델을 고르겠다. 정확도는 ___, 재현율은 ___ 이며, ___ 을(를) 더 중요하게 보았다.
> 전처리 전후 R² 는 ___ → ___ 로 바뀌었다. 가장 효과가 컸던 전처리는 ___ 라고 생각한다."""),

    md("""---
## 대단원 마무리 문제와 이어 보기 (140~141쪽)
"""),
    md(OX('7번 — 지표를 알맞게 고른 학생은? (눌러서 확인)', """- 마스크 착용 **여부** 분류 → 정확도 ✅
- 복숭아 수확**량** 예측 → 정밀도 ❌ (예측은 MSE · R²)
- 레서판다 / 대왕판다 **분류** → 평균제곱오차 ❌ (분류는 정확도 · 정밀도 · 재현율)
- 멀리뛰기 **기록** 예측 → 결정계수 ✅

이 노트북의 문제 A(예측)와 B(분류)에서 쓴 지표와 똑같은 기준입니다.""")),
    md(OX('12번 — 해양 쓰레기를 줄이는 AI 모델 설계해 보기 (예시 보기)', """다섯 걸음에 맞춰 써 보세요.
1. **문제 정의**: 바닷가 사진에서 쓰레기 종류(플라스틱 · 그물 · 캔 …)를 가려내 수거 우선순위를 정한다 → **분류**
2. **데이터**: 드론 · 휴대폰으로 찍은 해안 사진 + 사람이 붙인 종류 레이블 — 날씨 · 시간 · 해안이 **다양하게**, 종류별로 **고르게**
3. **알고리즘**: 사진이므로 **합성곱 신경망(CNN)** 또는 티처블 머신(전이 학습)
4. **모델 생성**: 훈련 80% · 테스트 20%
5. **평가 · 수정**: 정확도와 함께 **놓치면 위험한 종류(그물 — 해양 생물 얽힘)의 재현율**을 본다

다른 예: 해류 · 강수량 · 축제 일정으로 **해변별 쓰레기 양(숫자)을 예측**해 수거 인력을 미리 배치 → 예측 · 선형 회귀 · MSE""")),
    md("""> 🖐 대단원 마무리 12문항 전체와 자가 진단 · 개념도 빈칸은 [Ⅱ단원 수업 자료 — 대단원 마무리](""" + WEB + """unit2.html#wrapup)에서 눌러 가며 풀 수 있어요.
> 🧰 다른 주제로 한 번 더 하고 싶으면 [데이터 공방](""" + WEB + """datagen.html)에서 «전처리 심화»로 새 데이터를 만들어 이 노트북의 순서를 그대로 따라가 보세요.

---
### 정답 예시 (막혔을 때만)
- 2-2 `sum` · 2-3 `drop_duplicates` · 2-5 `replace` · 2-6 `between` · 2-7 `fillna`
- 문제 A `r2_score` · 문제 B `>=`
- 문제 A 는 보통 **선형 회귀**가 R² 0.63 정도로 가장 좋고 설명도 쉽습니다(데이터가 «직선 + 잡음»으로 만들어졌기 때문). 전처리 없이 하면 R² 가 0.13 까지 떨어집니다. 문제 B 는 로지스틱 회귀가 정확도 0.87 · 재현율 0.89 로 가장 좋습니다(기준선 0.69).""")]

if __name__ == '__main__':
    for name, cells in NB.items():
        save(name, cells)
        save(name, cells, solve=True)
        print('saved', name, len(cells))
