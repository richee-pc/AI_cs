# -*- coding: utf-8 -*-
"""수행평가 ② 예시 노트북 — 05_project_template.ipynb 를 «약수터 안심이»로 채우고 실제로 돌려 출력까지 넣는다.
python tools/src/build_example_nb.py  (AI_cs 폴더에서)  →  notebooks/05_project_example_water.ipynb
"""
import io, json, contextlib, os
import pandas as pd

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
URL = 'https://raw.githubusercontent.com/richee-pc/AI_cs/main/data/water_quality.csv'
LOCAL = os.path.join(ROOT, 'data', 'water_quality.csv')

def md(s): return {'cell_type': 'markdown', 'metadata': {}, 'source': s.strip('\n')}
def code(s): return {'cell_type': 'code', 'metadata': {}, 'execution_count': None, 'outputs': [], 'source': s.strip('\n')}

cells = [
md('''
# 📌 예시 — 수행평가 ② 완성본 · 약수터 안심이
가상의 «예시 모둠»이 프로젝트 ①~④ 뒤에 **수행평가 ②**를 끝까지 해 본 노트북이에요. 틀(`05_project_template`)의 빈칸을 이렇게 채우면 돼요.
데이터는 학교 데이터셋 «약수터 수질»(교과서 부록 · 381행)이고, 숫자는 이 노트북을 실제로 돌린 값이에요.

| 평가 요소 | 이 노트북에서 보는 것 |
|---|---|
| 요소 2 · 코랩 재구현 | ①~④ 네 단계가 **오류 없이 실행** · 셀마다 **대응하는 오렌지3 위젯 주석** · **담당자 주석** |
| 요소 3 · 비교와 개선 | **같은 지표**로 오렌지3와 코랩 수치 비교 · 개선 실험 1건(가설 · 조작 · 결과 · 해석) · 편향 유형 지목 |

> 이 예시를 **그대로 베껴 내면 안 돼요.** 우리 팀 데이터 · 우리 팀 위젯 · 내가 맡은 셀로 바꿔 쓰는 «모양 보기»용이에요.
'''),
md('''
## 우리 팀 정보 (먼저 채우기)
- 모둠: **예시 모둠** · 주제(SDG 세부 목표): **6.1 안전한 마실 물 — 약수터 수질로 부적합 위험 분류(«약수터 안심이»)**
- 맞힐 것(정답 열): **판정(적합 · 부적합)** → **분류**인가요, 예측인가요? **분류**
- 오렌지3에서 쓴 알고리즘: **Tree** (비교용으로 Logistic Regression · kNN) · 훈련 : 테스트 = 70 : 30
- 내 담당 셀: **예시 학생 B — ③ 나누기 · 모델 정의, 개선 실험** (A: ① · C: ② · D: ④)
- 수행평가 ② 1차시 «피드백 반영 계획»에서 고른 것: **투자 심사 의견 «검사 결과가 나온 뒤에 쓰는 거면, 총대장균군만 보면 되는 것 아닌가요?»** → 개선 실험의 가설로
'''),
md('''
## ① 데이터 불러오기 — 오렌지3 `File`
우리 팀은 왼쪽 📁 폴더에 CSV를 올려요. 이 예시는 누구나 바로 돌릴 수 있게 사이트에 있는 파일 주소로 불러와요.
'''),
code(f'''
# [오렌지3] File · 담당: 예시 학생 A
import pandas as pd

df = pd.read_csv('{URL}')
df.head()
'''),
code('''
# [오렌지3] Data Table · 담당: 예시 학생 A  — 열 이름과 빈칸부터 확인
print(df.columns.tolist())
print(df['판정'].value_counts())
print(df.isna().sum())
'''),
md('''
## ② 전처리 · 입력과 정답 고르기 — 오렌지3 `Edit Domain` · `Impute` · `Select Columns`
오렌지3에서 한 것과 **같게** 합니다. 프로젝트 ② 체크리스트 «X면 보완» 칸에 적은 그대로예요.
'''),
code('''
# [오렌지3] Edit Domain · 담당: 예시 학생 C  — 정답 열 «판정»에 섞인 다섯 가지 값을 둘로 통일
df['판정'] = df['판정'].replace({'Y': '1', 'N': '0', '0(여시니아)': '0'})
df['판정'] = df['판정'].map({'1': '적합', '0': '부적합'})
print(df['판정'].value_counts())
'''),
code('''
# [오렌지3] Impute (Remove rows with missing values) · 담당: 예시 학생 C
print('처리 전 행 수:', len(df))
df = df.dropna()            # 결측 5행 지우기 — 1 %라 영향이 작음 (오렌지3와 같게)
df = df.drop_duplicates()   # 중복 행 지우기
print('처리 후 행 수:', len(df))
'''),
code('''
# [오렌지3] Select Columns · 담당: 예시 학생 C  — «연번»은 번호일 뿐이라 뺌
X = df[['일반세균', '총대장균군', '분원성대장균군', '암모니아성질소', '질산성질소', '과망간산칼륨소비량']]
y = df['판정']
print(X.shape, y.shape)
'''),
md('''
## ③ 나누고 모델 정의하기 — 오렌지3 `Data Sampler` · `Tree`
'''),
code('''
# [오렌지3] Data Sampler (Fixed proportion 70%) · 담당: 예시 학생 B
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=0)
print(X_train.shape, X_test.shape)
print('테스트의 부적합 행 수:', (y_test == '부적합').sum())
'''),
code('''
# [오렌지3] Tree · 담당: 예시 학생 B
from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.linear_model import LogisticRegression, LinearRegression

model = DecisionTreeClassifier(random_state=0)
'''),
md('''
## ④ 학습하고 점수 재기 — 오렌지3 `Test and Score` (Test on test data)
우리 팀은 **분류**라서 분류 칸만 실행해요. «놓치면 안 되는 쪽» = **부적합**.
'''),
code('''
# [오렌지3] Test and Score — 분류일 때 · 담당: 예시 학생 D
from sklearn.metrics import accuracy_score, precision_score, recall_score, confusion_matrix
model.fit(X_train, y_train)
pred = model.predict(X_test)
print('정확도 CA :', round(accuracy_score(y_test, pred), 3))
print('재현율    :', round(recall_score(y_test, pred, pos_label='부적합'), 3))     # 부적합을 놓치지 않기
print('정밀도    :', round(precision_score(y_test, pred, pos_label='부적합'), 3))  # 괜한 경보 적기
# [오렌지3] Confusion Matrix — 행 = 실제, 열 = 예측 (순서: 적합, 부적합)
print(confusion_matrix(y_test, pred, labels=['적합', '부적합']))
print('기준선(전부 «적합»이라고 찍기):', round((y_test == '적합').mean(), 3))
'''),
code('''
# [오렌지3] Tree Viewer 대신 · 담당: 예시 학생 D  — 모델이 어느 열을 가장 크게 봤나
print(pd.Series(model.feature_importances_, index=X.columns).round(3).sort_values(ascending=False))
'''),
md('''
## 요소 3 · 두 모델 비교 — **같은 지표**로 나란히
| 지표 | 오렌지3 (Tree) | 코랩 (Tree) | 차이가 난다면 그 이유 |
|---|---|---|---|
| 정확도 | 0.956 | 0.965 | 오렌지3 `Data Sampler`와 코랩 `random_state=0`이 **다른 행**을 테스트로 뽑았어요 |
| «부적합» 재현율 | 0.958 (24 중 23) | 0.900 (20 중 18) | 테스트에 든 부적합 수가 24 vs 20으로 달라요 — 한 건만 놓쳐도 0.05씩 움직여요 |
| «부적합» 정밀도 | 0.852 | 0.900 | 같은 이유. 두 모델 모두 **기준선 0.823**보다 높아요 |

💡 둘 다 «총대장균군»을 가장 크게 봐요(코랩 중요도 0.94). 숫자가 조금 다른 건 나누기 때문이고, 모델이 하는 일은 같아요.
'''),
md('''
## 요소 3 · 개선 실험 한 건 — 네 칸 (피드백 + 편향)
- **받은 피드백**: 💰 투자 심사 «검사 결과가 나온 뒤에 쓰는 거면, 총대장균군만 보면 되는 것 아닌가요?»
- **편향 지목**: **확증 편향** — 우리는 정확도가 높게 나오자 «모델이 수질을 잘 안다»고 믿고 그것만 확인했어요. 반대 증거(한 열만 보는 것)를 일부러 찾아봐야 해요. 덧붙여 한 지역 · 한 기간 자료라 **선택 편향**도 있어요(한계로 적음).
- **가설**: 총대장균군이 없어도 나머지 다섯 측정값으로 부적합을 비슷하게 가려낼 것이다.
- **조작**: `Select Columns`에서 **총대장균군 열 하나만** 빼고, 나머지는 그대로(같은 나누기 · 같은 Tree).
- **결과**: 아래 셀 — 바꾸기 전 정확도 0.965 · 재현율 0.900 → 바꾼 뒤 정확도 0.779 · 재현율 0.500
- **해석**: 다른 측정값만으로는 부적합을 **절반이나 놓쳐요**. 모델은 사실상 «총대장균군 규칙»이에요. 그래서 «검사를 대신하는 AI»가 아니라, 검사 결과가 나온 날 **위험한 곳부터 안내 · 재검사 순서를 정하는 AI**로 쓰는 게 맞다는 결론을 지켰어요(해결안 그대로, 안내 문구에 «재검사 전 안내용» 추가).
'''),
code('''
# 개선 실험 · 담당: 예시 학생 B  — [오렌지3] Select Columns 에서 «총대장균군» 빼기 (한 가지만 바꿈)
cols = ['일반세균', '분원성대장균군', '암모니아성질소', '질산성질소', '과망간산칼륨소비량']
model2 = DecisionTreeClassifier(random_state=0)
model2.fit(X_train[cols], y_train)
pred2 = model2.predict(X_test[cols])
print('정확도 CA :', round(accuracy_score(y_test, pred2), 3))
print('재현율    :', round(recall_score(y_test, pred2, pos_label='부적합'), 3))
print('정밀도    :', round(precision_score(y_test, pred2, pos_label='부적합'), 3))
print(confusion_matrix(y_test, pred2, labels=['적합', '부적합']))
'''),
md('''
---
### 제출 전 점검
- [x] 위에서부터 **런타임 → 모두 실행** 했을 때 오류 없이 끝까지 돈다
- [x] 셀마다 `# [오렌지3] 위젯 이름 · 담당: 이름` 이 있다
- [x] 비교표의 지표가 오렌지3와 **같다** (정확도 · 재현율 · 정밀도)
- [x] 개선 실험 네 칸과 편향 유형을 적었다
- [x] 공유 → 링크를 선생님께 제출했다
'''),
]

# 실제로 돌려서 출력 넣기 (주소 대신 로컬 파일)
g = {}
n = 0
for c in cells:
    if c['cell_type'] != 'code': continue
    n += 1
    src = c['source'].replace(f"'{URL}'", repr(LOCAL) + ", encoding='utf-8-sig'")
    buf = io.StringIO()
    lines = src.rstrip().split('\n')
    last = lines[-1]
    with contextlib.redirect_stdout(buf):
        if last and not last.startswith((' ', '#', 'print', 'import', 'from')) and '=' not in last.split('(')[0]:
            exec('\n'.join(lines[:-1]), g)
            val = eval(last, g)
        else:
            exec(src, g); val = None
    outs = []
    if buf.getvalue():
        outs.append({'output_type': 'stream', 'name': 'stdout', 'text': buf.getvalue()})
    if val is not None:
        data = {'text/plain': val.to_string() if hasattr(val, 'to_string') else repr(val)}
        if hasattr(val, 'to_html'): data['text/html'] = val.to_html()
        outs.append({'output_type': 'execute_result', 'execution_count': n, 'metadata': {}, 'data': data})
    c['outputs'] = outs; c['execution_count'] = n

for c in cells:  # nbformat: source 는 줄 목록
    s = c['source']; c['source'] = [l + '\n' for l in s.split('\n')[:-1]] + [s.split('\n')[-1]]
nb = {'cells': cells, 'metadata': {'colab': {'provenance': []}, 'kernelspec': {'name': 'python3', 'display_name': 'Python 3'}, 'language_info': {'name': 'python'}}, 'nbformat': 4, 'nbformat_minor': 0}
out = os.path.join(ROOT, 'notebooks', '05_project_example_water.ipynb')
json.dump(nb, open(out, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
for c in cells:
    for o in c.get('outputs', []):
        if o['output_type'] == 'stream': print(o['text'].strip()[:400]); print('--')
