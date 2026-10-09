# -*- coding: utf-8 -*-
"""교과서 코랩 실습을 우리 수업 방식으로 — notebooks/06~12
   규칙: 데이터는 raw.githubusercontent 로 바로 읽기 · 빈칸(____) 바로 위에 💡 힌트 · 정답 예시는 맨 아래 · 교과서 쪽수 표기
   SOLVE=1 로 돌리면 빈칸을 정답으로 채운 «검사용» 사본을 scratchpad/nbtest 에 만든다."""
import json, os, sys, re
sys.stdout.reconfigure(encoding='utf-8')
SITE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))   # 저장소 맨 위(AI_cs)
OUT = os.path.join(SITE, 'notebooks')
TEST = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'nbtest')   # 정답판(시험 실행용) — 저장소에 올리지 않음
RAW = "주소 = 'https://raw.githubusercontent.com/richee-pc/AI_cs/main/data/'"
KFONT = "# (그래프에 한글이 네모로 나오면 한 번만 실행)\n!pip -q install koreanize-matplotlib\nimport koreanize_matplotlib"


def md(t):
    return {'cell_type': 'markdown', 'metadata': {}, 'source': t.strip('\n').splitlines(True)}


def code(t, ans=None):
    """ans: 빈칸 ____ 을 차례로 채울 정답 목록(검사용)"""
    c = {'cell_type': 'code', 'metadata': {}, 'execution_count': None, 'outputs': [], 'source': t.strip('\n').splitlines(True)}
    c['_ans'] = ans or []
    return c


def save(name, cells, solve=False):
    out = []
    for c in cells:
        c = dict(c); ans = c.pop('_ans', None)
        if solve and c['cell_type'] == 'code':
            src = ''.join(c['source'])
            for a in ans or []:
                src = src.replace('____', a, 1)
            src = src.replace('!pip -q install koreanize-matplotlib\nimport koreanize_matplotlib', 'pass')
            c['source'] = src.splitlines(True)
        out.append(c)
    nb = {'cells': out, 'metadata': {'colab': {'provenance': []}, 'kernelspec': {'name': 'python3', 'display_name': 'Python 3'},
                                    'language_info': {'name': 'python'}}, 'nbformat': 4, 'nbformat_minor': 0}
    d = TEST if solve else OUT
    os.makedirs(d, exist_ok=True)
    s = json.dumps(nb, ensure_ascii=False, indent=1)
    if solve:
        s = s.replace("https://raw.githubusercontent.com/richee-pc/AI_cs/main/data/", SITE.replace('\\', '/') + '/data/')
    open(os.path.join(d, name), 'w', encoding='utf-8', newline='\n').write(s + '\n')


HEAD = """맨 먼저 **파일 → 드라이브에 사본 저장**을 하세요(내 드라이브에 저장돼야 고친 내용이 남습니다).
`____` 가 보이면 거기가 문제입니다. 빈칸 **바로 위 💡 힌트**를 읽고 채운 뒤 셀을 실행하세요(Shift + Enter).
교과서는 `files.upload()` 로 파일을 올리지만, 이 노트북은 **선생님 저장소에서 바로 읽어** 올릴 파일이 없습니다."""

NB = {}

# ───────────────────────────────────────── 06 건강검진
NB['06_health_checkup.ipynb'] = [
    md("""# 06 · 건강검진 데이터 — 혈색소와 가장 관련 깊은 속성 찾기
교과서 **80~82쪽 활동**(Ⅱ-02 데이터 가공과 핵심 속성 추출)을 우리 수업 방식으로 옮겼습니다.

""" + HEAD + """

> 원본은 공공데이터포털 «국민건강보험공단_건강검진정보»(100만 명, 약 95MB)입니다. 코랩에서 바로 열리도록 **3만 명을 무작위로 뽑은 표본**을 씁니다.
> 결과 숫자가 교과서와 조금 다를 수 있지만, 무엇이 가장 관련 깊은지는 같게 나옵니다."""),
    md("## 단계 1 · 데이터 불러오기"),
    code(RAW + """
import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv(주소 + 'health_checkup_30k.csv')
df.shape"""),
    md("## 단계 2 · 데이터 살펴보기\n💡 앞의 다섯 행은 `head()`, 열마다 자료형과 빈칸 수는 `info()` 입니다."),
    code("df.____()", ['head']),
    code("df.info()"),
    md("""## 단계 3 · 전처리
### ① 결측치 세기
💡 비어 있는 칸을 찾는 함수는 `isnull()`, 열마다 세려면 `.sum()` 을 이어 붙입니다."""),
    code("df.____().sum()", ['isnull']),
    md("""### ② 축소 — 필요 없는 열 빼기
- 건강과 직접 관련 없는 열: `기준년도`, `가입자일련번호`, `시도코드`
- 통째로 비어 있는 열: `결손치유무`, `치아마모증율`, `제3대구치(사랑니)이상`
- 상관계수를 구하기 어려운 **범주형** 열: `성별`, `흡연상태`, `음주여부`, `구강검진수검여부`, `치아우식증유무`, `치석`, `요단백`, `청력(좌)`, `청력(우)`

💡 열을 지울 때는 `axis=1`. 그리고 **`df = ` 로 다시 받아야** 지워진 채로 남습니다(가장 잦은 실수!)."""),
    code("""빼기 = ['기준년도', '가입자일련번호', '시도코드',
        '결손치유무', '치아마모증율', '제3대구치(사랑니)이상',
        '성별', '흡연상태', '음주여부', '구강검진수검여부', '치아우식증유무', '치석', '요단백', '청력(좌)', '청력(우)']
df = df.drop(빼기, axis=____)
df.columns""", ['1']),
    md("""### ③ 정제 — 이상치 확인
상자그림에서 상자 바깥 점이 이상치 후보입니다. 교과서는 연습용 기준으로 `연령대코드(5세 단위)` 가 **18 이상인 행**을 뺍니다.
(교과서도 «실제로는 충분히 생각해 정하라»고 합니다 — 정말 잘못된 값일까요?)

💡 남길 조건은 «18보다 작다» → `< 18`"""),
    code("""plt.boxplot(df['연령대코드(5세 단위)'])
plt.title('before')
plt.show()

print('전 :', len(df))
df = df[df['연령대코드(5세 단위)'] ____ 18]
print('후 :', len(df))""", ['<']),
    md("## 단계 4 · 상관계수로 핵심 속성 찾기\n💡 정렬은 `sort_values()`. 큰 것부터 보려면 `ascending=False`."),
    code("""corr = df.corr()['혈색소']
print('— 함께 커지는 속성(양의 상관) —')
print(corr.sort_values(ascending=____).head(6))
print()
print('— 반대로 움직이는 속성(음의 상관) —')
print(corr.sort_values(ascending=True).head(5))""", ['False']),
    md("""## 생각해 보기
1. 혈색소와 가장 관련 깊은 속성 두 개는? ( ______ , ______ )
2. «키가 클수록 혈색소가 높다» — 이것이 **원인과 결과**일까요? 함께 움직이게 만드는 다른 속성(예: 성별)은 없을까요?
3. 범주형인 `성별` 을 숫자(1·2)로 두면 상관계수를 구할 수는 있습니다. 그래도 빼야 할까요?

> 적어 보기:

---
### 정답 예시 (막혔을 때만)
- 단계 2 `df.head()` · 단계 3 ① `df.isnull().sum()` · ② `axis=1` · ③ `< 18` · 단계 4 `ascending=False`
- 교과서 결과처럼 **신장 · 체중 · 허리둘레**가 양의 상관, **HDL콜레스테롤 · 연령대**가 음의 상관으로 나옵니다.
- 신장과 혈색소는 둘 다 **성별**의 영향을 크게 받습니다. 남녀를 나눠 다시 상관을 구해 보면 관계가 크게 줄어듭니다 — 상관 ≠ 원인.""")]

# ───────────────────────────────────────── 07 기아 지수
NB['07_ghi_hunger.ipynb'] = [
    md("""# 07 · 기아 종식은 언제? — 세계 기아 지수(GHI) 분석과 예측
교과서 **Ⅳ-02 인공지능 프로젝트 199~208쪽 예제**를 우리 수업 방식으로 옮겼습니다.
수행평가 ②의 «불러오기 → 전처리 → 모델 → 학습 → 평가» 네 단계와 **같은 순서**입니다.

""" + HEAD + """

| 파일 | 내용 |
|---|---|
| `ghi.csv` | 나라별 세계 기아 지수 2000 · 2008 · 2015 · 2023 |
| `undernourished.csv` | 인구 중 영양실조 비율(%) |
| `stunting.csv` | 5세 미만 발육 저하 비율(%) |"""),
    md("## ① 데이터 불러오기"),
    code(RAW + """
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

ghi   = pd.read_csv(주소 + 'ghi.csv')
nouri = pd.read_csv(주소 + 'undernourished.csv')
stunt = pd.read_csv(주소 + 'stunting.csv')
ghi.head()"""),
    md("""## ② 전처리
💡 이번 분석에 쓰지 않는 «2015년 이후 변화» 두 열을 지웁니다. 열을 지우는 것은 `axis=1`."""),
    code("""ghi = ghi.drop(['Absolute change since 2015', '% change since 2015'], axis=____)
print('결측치\\n', ghi.isnull().sum())
print('중복 행 :', ghi.duplicated().sum())
ghi.describe()""", ['1']),
    md("""### 연도끼리의 상관 — 히트맵
나라 이름(`Country`)은 숫자가 아니라 상관계수를 못 구하니 빼고 그립니다."""),
    code("""num = ghi.drop('Country', axis=1)
sns.heatmap(num.corr(), annot=True, cmap='Blues')
plt.title('GHI correlation by year')
plt.show()"""),
    md("""### 세 데이터 합치기(통합)
열 이름이 셋 다 `2000, 2008 …` 로 같아서 그대로 붙이면 헷갈립니다. 이름을 바꾼 뒤 **옆으로**(`axis=1`) 붙입니다.
💡 빈칸은 평균으로 채웁니다 — `fillna(평균)`."""),
    code("""yrs = ['2000', '2008', '2015', '2023']
g = num.rename(columns={y: 'GHI' + y for y in yrs})
n = nouri.drop('Country', axis=1).rename(columns={y: 'Nouri' + y for y in yrs})
s = stunt.drop('Country', axis=1).rename(columns={y: 'Stunt' + y for y in yrs})
df = pd.concat([g, n, s], axis=1)
df = df.fillna(df.____())
df.corr()[['GHI2023']].sort_values('GHI2023', ascending=False)""", ['mean']),
    md("""**생각해 보기 ①** 2023년 기아 지수와 가장 관련이 깊은 것은 영양실조 비율과 발육 저하 비율 중 무엇인가요? (______)

## ③ 모델 — 연도별 «평균 기아 지수»로 몇 년에 목표에 닿을지 예측
교과서는 네 해(2000·2008·2015·2023)의 **나라 평균 GHI** 를 입력(X)으로, **연도**를 정답(y)으로 두고 선형 회귀를 합니다.
«GHI가 10(보통 수준)이 되는 해는?», «0이 되는 해는?»을 묻기 위해서입니다."""),
    code("""import numpy as np
from sklearn.linear_model import LinearRegression

X = g.mean().values.reshape(-1, 1)        # 연도별 나라 평균 GHI (4행 1열)
y = np.array([2000, 2008, 2015, 2023])     # 정답: 연도
print(X.ravel().round(2))

model = LinearRegression()
model.____(X, y)
print('기울기 :', model.coef_, ' 절편 :', model.intercept_)""", ['fit']),
    md("## ④ 예측과 평가\n💡 예측은 `predict`. 입력은 «2차원»이라 `[[10]]` 처럼 대괄호 두 겹."),
    code("""print('GHI 10 이 되는 해 :', model.____([[10]]))
print('GHI  0 이 되는 해 :', model.predict([[0]]))
print('R² :', model.score(X, y))

plt.scatter(X, y, label='data')
plt.plot(X, model.predict(X), 'r-', label='linear regression')
plt.xlabel('mean GHI'); plt.ylabel('year'); plt.legend(); plt.show()""", ['predict']),
    md("""## 비판적으로 보기 (교과서 208~209쪽 «평가 결과를 반영해 개선»)
1. 점이 **네 개뿐**입니다. R²가 0.93으로 높게 나와도 믿을 만할까요?
2. GHI 0은 지금까지 한 번도 관측된 적 없는 값입니다. 데이터 **범위 밖**을 직선으로 늘려 맞히는 것(외삽)은 어떤 위험이 있을까요?
3. 나라마다 사정이 다른데 «평균» 하나로 묶었습니다. 어떤 나라가 가려질까요? — 우리 프로젝트의 **편향 점검**과 같은 질문입니다.

> 적어 보기:

---
### 정답 예시 (막혔을 때만)
- ② `axis=1` · 통합 `df.fillna(df.mean())` · ③ `model.fit(X, y)` · ④ `model.predict([[10]])`
- 기울기가 약 **−2.17**, 절편이 약 **2054** 로 나옵니다(교과서와 같음). GHI 10 → 약 2032년, 0 → 약 2054년.
- 생각해 보기 ①: 발육 저하·영양실조 모두 높지만 값은 실행 결과로 확인하세요.""")]

# ───────────────────────────────────────── 08 스트레스
NB['08_stress_knn_tree.ipynb'] = [
    md("""# 08 · 몸 상태로 스트레스 단계 분류하기 — k-최근접 이웃 vs 의사결정트리
교과서 **부록 213~218쪽** 선택 활동입니다. 데이터를 못 구한 모둠의 프로젝트 출발점으로도 씁니다.

""" + HEAD + """

| 열 | 뜻 |
|---|---|
| Humidity | 피부 습도 |
| Temperature | 체온(화씨) |
| Step count | 걸음 수 |
| Stress Level | **정답** — 0 낮음 · 1 보통 · 2 높음 |"""),
    md("## ① 불러오기와 탐색"),
    code(RAW + """
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

df = pd.read_csv(주소 + 'stress_lysis.csv')
print(df.shape)
print(df.groupby('Stress Level')['Temperature'].agg(['count', 'min', 'max']))
sns.boxplot(data=df, x='Stress Level', y='Humidity')
plt.show()"""),
    md("""**생각해 보기** 상자그림을 보면 스트레스 단계마다 습도가 어떻게 다른가요? 이 데이터는 모델이 맞히기 쉬울까요, 어려울까요?

## ② 입력(X)과 정답(y), 훈련·테스트 나누기
💡 정답 열을 뺀 나머지가 X → `drop('Stress Level', axis=1)`. 테스트는 30% → `test_size=0.3`."""),
    code("""from sklearn.model_selection import train_test_split

print(df.isna().sum().sum(), '개 결측치')
x = df.drop('Stress Level', axis=1)
y = df['Stress Level']
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=____, random_state=42, stratify=y)
x_train.shape, x_test.shape""", ['0.3']),
    md("## ③ k-최근접 이웃\n💡 분류 모델 이름은 `KNeighborsClassifier`."),
    code("""from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score

knn = ____(n_neighbors=5)
knn.fit(x_train, y_train)
print('kNN 정확도 :', accuracy_score(y_test, knn.predict(x_test)))""", ['KNeighborsClassifier']),
    md("## ④ 의사결정트리 — 그림으로 판단 과정 보기\n💡 트리 깊이를 3으로 제한하면 그림이 읽기 쉬워집니다 → `max_depth=3`."),
    code("""from sklearn.tree import DecisionTreeClassifier, plot_tree

tree = DecisionTreeClassifier(max_depth=____, random_state=28)
tree.fit(x_train, y_train)
print('트리 정확도 :', accuracy_score(y_test, tree.predict(x_test)))

plt.figure(figsize=(14, 6))
plot_tree(tree, feature_names=list(x.columns), class_names=['low', 'mid', 'high'], filled=True, fontsize=8)
plt.show()""", ['3']),
    md("""## ⑤ 비교와 해석
- 두 모델의 정확도는? kNN ______ · 트리 ______
- 트리의 맨 위 질문(가장 먼저 나누는 속성)은? ______ → 이 속성이 스트레스를 가장 잘 가른다는 뜻입니다.
- 점수 차가 작다면 어느 모델을 고르겠나요? 이유는?  (힌트: Ⅱ단원 «모델 고르는 다섯 걸음»)

## ⑥ (선택) 모델 저장하고 새 값 넣어 보기"""),
    code("""import joblib
joblib.dump(tree, 'stress_tree.pkl')
model = joblib.load('stress_tree.pkl')

습도, 체온, 걸음 = 20.0, 90.0, 150      # 값을 바꿔 보세요
pred = model.predict(pd.DataFrame([[습도, 체온, 걸음]], columns=x.columns))[0]
print(['스트레스 낮은 단계', '스트레스 조심 단계', '스트레스 주의 단계'][pred])"""),
    md("""---
### 정답 예시 (막혔을 때만)
- ② `test_size=0.3` · ③ `KNeighborsClassifier` · ④ `max_depth=3`
- 이 데이터는 단계가 아주 깔끔하게 나뉘어 두 모델 모두 0.99 안팎이 나옵니다. **너무 높으면 의심도 해 보세요** — 실제 측정값일까, 만든 데이터일까? (출처 확인!)""")]

# ───────────────────────────────────────── 09 수질
NB['09_water_logistic.ipynb'] = [
    md("""# 09 · 약수터 물, 마셔도 될까? — 로지스틱 회귀와 재현율
교과서 **부록 221~226쪽** 선택 활동입니다. 데이터 탐구 이야기의 «약수터 음용 부적합» 실마리와 이어집니다.

""" + HEAD + """

정답 `판정` 은 **1 = 적합(마셔도 됨) · 0 = 부적합**. 그런데 표기가 `Y`, `N`, `0(여시니아)` 처럼 섞여 있어 **전처리**가 먼저입니다."""),
    md("## ① 불러오기"),
    code(RAW + """
import pandas as pd

df = pd.read_csv(주소 + 'water_quality.csv')
df = df.drop('연번', axis=1)
df['판정'].value_counts()"""),
    md("""## ② 변환 — 판정 표기 통일
💡 `Y` 는 적합(1), `N` 과 `0(여시니아)` 는 부적합(0). 글자 `'1'`, `'0'` 도 숫자로 바꿔야 합니다 → 마지막에 `astype(int)`."""),
    code("""df['판정'] = df['판정'].replace({'Y': '1', 'N': '0', '0(여시니아)': '0'})
df['판정'] = df['판정'].astype(____)
print(df['판정'].value_counts())
print(df.isna().sum())
df = df.dropna()""", ['int']),
    md("""**생각해 보기 ①** 적합과 부적합의 개수가 비슷한가요? 크게 차이 나면 «정확도»만 보면 어떤 함정이 있을까요? (Ⅱ-05 해석 함정 1번)

## ③ 나누기 · 학습
💡 두 갈래(적합/부적합) 판정 → `LogisticRegression`"""),
    code("""from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression

x = df.drop('판정', axis=1)
y = df['판정']
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.3, random_state=42, stratify=y)

model = ____(max_iter=1000)
model.fit(x_train, y_train)""", ['LogisticRegression']),
    md("## ④ 평가 — 정확도만 보면 안 되는 이유\n💡 «부적합(0)»을 놓치면 위험합니다. 0에 대한 재현율을 보려면 `pos_label=0`."),
    code("""from sklearn.metrics import accuracy_score, recall_score, confusion_matrix

pred = model.predict(x_test)
print('정확도            :', round(accuracy_score(y_test, pred), 3))
print('기준선(전부 적합) :', round((y_test == 1).mean(), 3))
print('부적합 재현율     :', round(recall_score(y_test, pred, pos_label=____), 3))
print(confusion_matrix(y_test, pred, labels=[0, 1]))   # 행: 실제 0·1 / 열: 예측 0·1""", ['0']),
    md("""## ⑤ 개선 실험 한 건 (수행평가 ② 요소 3 연습)
- **가설** 부적합이 적어서 모델이 «적합» 쪽으로 쏠린다.
- **조작** `class_weight='balanced'` 로 적은 쪽에 무게를 더 준다.
- **결과 · 해석** 아래를 실행하고 재현율과 정확도가 어떻게 바뀌는지 적어 보세요."""),
    code("""m2 = LogisticRegression(max_iter=1000, class_weight='balanced').fit(x_train, y_train)
p2 = m2.predict(x_test)
print('정확도        :', round(accuracy_score(y_test, p2), 3))
print('부적합 재현율 :', round(recall_score(y_test, p2, pos_label=0), 3))"""),
    md("""## ⑥ (선택) 새 값으로 판정해 보기"""),
    code("""항목 = list(x.columns)
값 = [10, 0, 0, 0.0, 2.0, 0.5]          # 일반세균, 총대장균군, 분원성대장균군, 암모니아성질소, 질산성질소, 과망간산칼륨소비량
p = m2.predict(pd.DataFrame([값], columns=항목))[0]
print('마셔도 돼요' if p == 1 else '마시면 안 돼요')"""),
    md("""---
### 정답 예시 (막혔을 때만)
- ② `astype(int)` · ③ `LogisticRegression` · ④ `pos_label=0`
- 적합이 약 300, 부적합이 약 80으로 **불균형**입니다. 정확도가 기준선(약 0.79)과 비슷하면 «많은 쪽으로 찍기»와 다를 바 없습니다.
- `class_weight='balanced'` 는 적은 쪽(부적합)을 놓칠 때 벌을 더 줍니다. 이 데이터에서는 결과가 거의 그대로일 수 있습니다 — 그렇다면 **놓친 부적합 샘플**을 혼동 행렬로 찾아 어떤 수치였는지 살펴보는 것이 다음 개선입니다. 마시는 물에서는 정확도와 재현율 중 무엇이 더 중요할까요?""")]

# ───────────────────────────────────────── 10 음식 사진
NB['10_food_image.ipynb'] = [
    md("""# 10 · 사진으로 음식 알아보기 — 펼친 신경망(Dense) vs 합성곱 신경망(CNN)
교과서 **부록 229~237쪽**(흰쌀밥과 흑미밥 분류 → 영양 정보 알려 주기)을 우리 수업 방식으로 옮겼습니다.

맨 먼저 **런타임 → 런타임 유형 변경 → T4 GPU** 를 고르세요(학습이 몇 배 빨라집니다). 그리고 **파일 → 드라이브에 사본 저장**.

사진 데이터는 두 가지 중 하나로 씁니다.
- **A. 바로 실행** — 공개 꽃 사진(데이지 · 해바라기) 두 종류를 자동으로 내려받아 같은 과정을 연습합니다.
- **B. 교과서 음식 사진** — 선생님이 공유한 드라이브 폴더 `food`(train/test 안에 01 흰쌀밥 · 07 흑미밥)를 내 드라이브에 바로가기로 추가한 뒤 B 셀을 실행합니다."""),
    md("## ① 사진 준비 — A 또는 B 중 하나만 실행"),
    code("""# A. 바로 실행 — 꽃 사진 두 종류
import tensorflow as tf, pathlib, shutil, random, os
p = pathlib.Path(tf.keras.utils.get_file('flower_photos', 'https://storage.googleapis.com/download.tensorflow.org/example_images/flower_photos.tgz', untar=True))
# 텐서플로 판마다 풀리는 위치가 달라서 «daisy» 폴더가 있는 곳을 찾습니다
src = next(d.parent for d in list(p.parent.rglob('daisy')) if d.is_dir())
random.seed(0)
for cls in ['daisy', 'sunflowers']:
    files = sorted((src / cls).glob('*.jpg')); random.shuffle(files)
    for part, chunk in (('train', files[:200]), ('test', files[200:260])):
        d = pathlib.Path('/content/food') / part / cls; d.mkdir(parents=True, exist_ok=True)
        for f in chunk: shutil.copy(f, d)
train_dir, test_dir = '/content/food/train', '/content/food/test'
print(os.listdir(train_dir))"""),
    code("""# B. 교과서 음식 사진 — 선생님 공유 폴더를 «드라이브에 바로가기 추가» 한 뒤
from google.colab import drive
drive.mount('/content/drive')
train_dir = '/content/drive/MyDrive/food/train'     # 폴더 위치가 다르면 고치세요
test_dir  = '/content/drive/MyDrive/food/test'"""),
    md("""## ② 사진을 숫자로 — 크기 맞추고 0~1로 나누기
💡 픽셀 값 0~255 를 0~1 로 → `1/255`. 사진 크기는 150×150."""),
    code("""import tensorflow as tf
size = (150, 150)
train = tf.keras.utils.image_dataset_from_directory(train_dir, image_size=size, batch_size=32, label_mode='categorical', seed=1)
test  = tf.keras.utils.image_dataset_from_directory(test_dir,  image_size=size, batch_size=32, label_mode='categorical', shuffle=False)
names = train.class_names
print(names)
scale = tf.keras.layers.Rescaling(____)
train = train.map(lambda x, y: (scale(x), y)); test = test.map(lambda x, y: (scale(x), y))""", ['1/255']),
    md("""## ③ 모델 1 — 사진을 한 줄로 펼쳐 넣는 신경망(교과서 233쪽)
150×150×3 = **67,500개** 숫자를 한 줄로 펼쳐(Flatten) 은닉층 두 개에 넣습니다.
💡 출력층 뉴런 수 = 분류할 종류 수 → `len(names)`. 여러 종류 중 하나 → `softmax`."""),
    code("""from tensorflow.keras import layers, models
m1 = models.Sequential([
    layers.Input(shape=(150, 150, 3)),
    layers.Flatten(),
    layers.Dense(128, activation='relu'),
    layers.Dense(128, activation='relu'),
    layers.Dense(____, activation='softmax'),
])
m1.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
m1.summary()
h1 = m1.fit(train, epochs=10, validation_data=test)""", ['len(names)']),
    md("""## ④ 모델 2 — 합성곱 신경망 CNN(교과서 236쪽)
사진을 펼치기 전에 **작은 창(필터)으로 훑어 무늬를 찾고(Conv2D) → 줄이는(MaxPool)** 층을 넣습니다.
💡 필터 크기는 3×3 → `kernel_size=3`."""),
    code("""m2 = models.Sequential([
    layers.Input(shape=(150, 150, 3)),
    layers.Conv2D(32, kernel_size=____, activation='relu'),
    layers.MaxPooling2D(2),
    layers.Conv2D(64, kernel_size=3, activation='relu'),
    layers.MaxPooling2D(2),
    layers.Flatten(),
    layers.Dropout(0.3),
    layers.Dense(64, activation='relu'),
    layers.Dense(len(names), activation='softmax'),
])
m2.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
m2.summary()
h2 = m2.fit(train, epochs=10, validation_data=test)""", ['3']),
    md("## ⑤ 비교 — 학습 곡선과 테스트 정확도"),
    code("""import matplotlib.pyplot as plt
for h, name in ((h1, 'Dense'), (h2, 'CNN')):
    plt.plot(h.history['val_accuracy'], label=name)
plt.xlabel('epoch'); plt.ylabel('test accuracy'); plt.legend(); plt.show()
print('Dense :', m1.evaluate(test, verbose=0)[1])
print('CNN   :', m2.evaluate(test, verbose=0)[1])
print('가중치 수 — Dense', m1.count_params(), '/ CNN', m2.count_params())"""),
    md("""**생각해 보기** 어느 모델이 더 정확한가요? 가중치(파라미터) 수는 어느 쪽이 더 많나요? 왜 사진에는 CNN이 유리할까요?

## ⑥ (선택) 내 사진 한 장 분류하기"""),
    code("""from google.colab import files
import numpy as np
up = files.upload(); fname = list(up.keys())[0]
img = tf.keras.utils.load_img(fname, target_size=(150, 150))
x = tf.keras.utils.img_to_array(img)[None] / 255
p = m2.predict(x)[0]
print({n: round(float(v), 3) for n, v in zip(names, p)}, '→', names[int(np.argmax(p))])"""),
    md("""---
### 정답 예시 (막혔을 때만)
- ② `Rescaling(1/255)` · ③ `Dense(len(names), …)` · ④ `kernel_size=3`
- 보통 **CNN이 더 정확하면서 가중치는 훨씬 적습니다**. Dense는 픽셀 하나하나를 따로 보지만, CNN은 «가장자리 · 무늬»처럼 위치가 달라도 같은 특징을 찾기 때문입니다.
- 교과서 음식 사진은 종류마다 30장뿐이라 정확도가 들쭉날쭉합니다 — **데이터 양**이 성능을 좌우한다는 것을 확인할 수 있습니다.""")]

# ───────────────────────────────────────── 11 티처블 머신
NB['11_teachable_machine.ipynb'] = [
    md("""# 11 · 티처블 머신 모델을 코랩에서 쓰기 — 재활용 분류 프로그램
교과서 **131~133쪽**(컴퓨터 비전을 활용한 쓰레기 분리 배출 · 재활용 분류 프로그램)을 우리 수업 방식으로 옮겼습니다.

**순서**
1. [티처블 머신](https://teachablemachine.withgoogle.com/train/image) → 이미지 프로젝트 → 클래스 `플라스틱 · 유리 · 종이`에 사진 넣기 → 모델 학습
2. **모델 내보내기 → Tensorflow 탭 → Keras → 모델 다운로드** → zip 안의 `keras_model.h5` 와 `labels.txt`
3. 이 노트북에서 두 파일과 분류할 사진을 올리기

> 사진은 각 클래스를 **비슷한 개수**로, 밝기 · 각도 · 배경을 **다양하게**. 한쪽으로 쏠리면 모델도 쏠립니다(데이터 편향)."""),
    md("## ① 모델 파일 올리기 (`keras_model.h5`, `labels.txt` 두 개를 함께 선택)"),
    code("""!pip -q install tf_keras
import tf_keras
from google.colab import files
files.upload()
# 티처블 머신 파일에 있는 옛 설정값(groups)을 새 판이 못 읽는 문제를 피하는 줄
class DW(tf_keras.layers.DepthwiseConv2D):
    def __init__(self, **kw):
        kw.pop('groups', None); super().__init__(**kw)
model = tf_keras.models.load_model('keras_model.h5', compile=False, custom_objects={'DepthwiseConv2D': DW})
names = [l.strip().split(' ', 1)[-1] for l in open('labels.txt', encoding='utf-8')]
print(names)"""),
    md("""## ② 사진 올려서 분류하기
티처블 머신 모델은 **224×224 크기**, 픽셀 값을 **−1~1** 로 바꿔 넣어야 합니다.
💡 가장 큰 확률의 번호를 찾는 함수 → `np.argmax`"""),
    code("""import numpy as np
from PIL import Image, ImageOps
up = files.upload(); fname = list(up.keys())[0]
img = ImageOps.fit(Image.open(fname).convert('RGB'), (224, 224))
x = (np.asarray(img, dtype=np.float32) / 127.5 - 1)[None]
p = model.predict(x)[0]
for n, v in zip(names, p): print(f'{n:8s} {v:.3f}')
print('→ 이 사진은', names[____(p)], '(으)로 추정됩니다')
img""", ['np.argmax']),
    md("""## ③ 생각해 보기 (교과서 132쪽 «모델 개선하기»)
- 틀리게 분류한 사진은 어떤 특징이 있나요? (각도 · 빛 · 배경 · 라벨 오류)
- 그 경우의 사진을 **더 모아 다시 학습**하면 나아지나요? 바꾼 것과 결과를 한 줄로 적어 보세요.
- 티처블 머신은 이미 많은 사진으로 학습한 모델에 우리 사진을 «조금 더» 가르칩니다 — 이것을 **전이 학습**이라고 합니다(AI 모델 도감 참고).

> 적어 보기:

---
### 정답 예시 (막혔을 때만)
- ② `names[np.argmax(p)]`
- `load_model` 에서 오류가 나면 ① 셀의 `tf_keras` 설치 줄을 먼저 실행했는지 확인하세요(새 텐서플로와 티처블 머신 형식의 차이 때문).""")]

# ───────────────────────────────────────── 12 모델 비교 실험실
NB['12_model_zoo.ipynb'] = [
    md("""# 12 · 모델 비교 실험실 — 같은 데이터, 여러 모델
«AI 모델 도감»에 나온 모델들을 **같은 데이터 · 같은 나누기 · 같은 지표**로 한꺼번에 돌려 봅니다.
Ⅱ-04 «모델 고르는 다섯 걸음»의 4~5걸음을 코드로 해 보는 노트북입니다.

""" + HEAD + """

데이터: 남극 **펭귄 세 종**(Adelie · Chinstrap · Gentoo)의 부리 길이 · 부리 깊이 · 날개 길이 · 몸무게 — seaborn에 들어 있습니다."""),
    md("## ① 불러오기 · 전처리"),
    code(KFONT),
    code("""import pandas as pd, seaborn as sns, matplotlib.pyplot as plt
df = sns.load_dataset('penguins').dropna()
X = df[['bill_length_mm', 'bill_depth_mm', 'flipper_length_mm', 'body_mass_g']]
y = df['species']
print(X.shape, y.value_counts().to_dict())"""),
    md("""## ② 분류 모델 여덟 개를 한 번에
💡 거리를 재는 모델(kNN · SVM · 신경망)은 단위를 맞춰야 공정합니다 → `StandardScaler` 를 앞에 붙이는 `make_pipeline`.
💡 교차 검증은 데이터를 다섯 번 나눠 다섯 번 시험 → `cv=5`."""),
    code("""from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import cross_val_score
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.svm import SVC
from sklearn.naive_bayes import GaussianNB
from sklearn.neural_network import MLPClassifier

S = StandardScaler
모델 = {
  '로지스틱 회귀':   make_pipeline(S(), LogisticRegression(max_iter=1000)),
  'k-최근접 이웃':   make_pipeline(S(), KNeighborsClassifier(5)),
  '의사결정트리':    DecisionTreeClassifier(max_depth=4, random_state=0),
  '랜덤 포레스트':   RandomForestClassifier(200, random_state=0),
  '그레이디언트 부스팅': GradientBoostingClassifier(random_state=0),
  'SVM':            make_pipeline(S(), SVC()),
  '나이브 베이즈':   GaussianNB(),
  '신경망(MLP)':     make_pipeline(S(), MLPClassifier((32, 16), max_iter=2000, random_state=0)),
}
결과 = {}
for 이름, m in 모델.items():
    점수 = cross_val_score(m, X, y, cv=____)
    결과[이름] = 점수.mean()
    print(f'{이름:12s} 평균 정확도 {점수.mean():.3f}  (±{점수.std():.3f})')""", ['5']),
    code("""pd.Series(결과).sort_values().plot.barh(xlim=(0.8, 1.0), title='cross-validation accuracy')
plt.show()"""),
    md("""**생각해 보기 ①** 점수 차가 0.02 안쪽인 모델이 몇 개인가요? 그중 무엇을 고르겠나요? (설명하기 쉬운 쪽?)

## ③ 같은 데이터, 회귀 모델 — 몸무게 맞히기
이 표는 **종별로 줄지어 정렬**돼 있습니다. 섞지 않고 다섯 토막을 내면 «Gentoo만 모인 토막»으로 시험 보게 되어 점수가 엉망이 됩니다. 그래서 `KFold(shuffle=True)` 로 **섞어서** 나눕니다(`train_test_split` 은 원래 섞어 줍니다).

💡 회귀 점수는 R². `scoring='r2'`."""),
    code("""from sklearn.linear_model import LinearRegression, Ridge
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor
from sklearn.neighbors import KNeighborsRegressor
from sklearn.model_selection import KFold
섞어나누기 = KFold(5, shuffle=True, random_state=0)
Xr = df[['bill_length_mm', 'bill_depth_mm', 'flipper_length_mm']]
yr = df['body_mass_g']
회귀 = {'선형 회귀': LinearRegression(), '릿지': Ridge(1.0), 'kNN 회귀': make_pipeline(S(), KNeighborsRegressor(5)),
        '회귀 트리': DecisionTreeRegressor(max_depth=4, random_state=0), '랜덤 포레스트 회귀': RandomForestRegressor(200, random_state=0)}
for 이름, m in 회귀.items():
    점수 = cross_val_score(m, Xr, yr, cv=섞어나누기, scoring=____).mean()
    print(f'{이름:10s} R² {점수:.3f}')""", ["'r2'"]),
    md("""## ④ 비지도 — 정답 없이 묶어 보면 종이 나뉠까? (k-평균 + PCA)
정답(종)을 **숨기고** 네 숫자만으로 세 무리를 만든 뒤, 실제 종과 얼마나 겹치는지 봅니다.
PCA는 네 숫자를 **두 축으로 줄여** 그림으로 볼 수 있게 합니다."""),
    code("""from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
Z = StandardScaler().fit_transform(X)
무리 = KMeans(n_clusters=3, n_init=10, random_state=0).fit_predict(Z)
print(pd.crosstab(무리, y))          # 행: 만든 무리 / 열: 실제 종
P = PCA(2).fit_transform(Z)
plt.scatter(P[:, 0], P[:, 1], c=무리, cmap='viridis', s=15)
plt.title('k-means clusters on 2 PCA axes'); plt.show()"""),
    md("""**생각해 보기 ②** 정답을 한 번도 안 보고 만든 무리가 실제 종과 얼마나 맞나요? 잘 안 나뉜 두 종은 무엇이고, 왜 그럴까요?

---
### 정답 예시 (막혔을 때만)
- ② `cv=5` · ③ `scoring='r2'`
- ③ 에서 `cv=5`(섞지 않음)로 바꿔 보면 R²가 크게 떨어집니다 — **데이터를 나누는 방법**도 결과를 바꿉니다.
- 펭귄 데이터는 쉬운 편이라 대부분 0.95 이상입니다. 이럴 땐 **가장 단순하고 설명하기 쉬운 모델**(로지스틱 회귀 · 트리)을 고르는 것이 «다섯 걸음»의 결론입니다.
- k-평균은 Gentoo는 거의 정확히 묶지만, **Adelie와 Chinstrap** 은 몸 크기가 비슷해 섞이기 쉽습니다.""")]

if __name__ == '__main__':
    for name, cells in NB.items():
        save(name, cells)
        save(name, cells, solve=True)
        print('saved', name, len(cells))
