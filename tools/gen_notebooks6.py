# -*- coding: utf-8 -*-
"""노트북 20 — 데이터 탐구 ③: 교과서 Ⅱ-02 코드 ❶~⓮를 우리 모둠 데이터로 + AI Agent 결과 검증"""
import sys, os
sys.stdout.reconfigure(encoding='utf-8')
from gen_notebooks import md, code, save, RAW, KFONT

C = []
C.append(md("""
# 20 · 데이터 탐구 ③ — 교과서 Ⅱ-02 코드를 **우리 데이터**로

교과서 72~79쪽에서 배운 전처리 코드 **❶~⓮** 를 이번에는 **우리 모둠이 찾은 데이터**에 그대로 씁니다.
AI 탐구 교실의 **«데이터 정리 AI»**(과정안의 AI Agent)를 썼든 안 썼든, 이 노트북으로 **코드로 직접 하거나 · AI가 한 일을 코드로 검증**합니다.

| 신호등 | 이 시간에 AI는 |
|---|---|
| 🟢 자율적 사용 | «데이터 정리 AI»는 **우리가 정한 기준대로만** 반복 작업을 합니다. 무엇을 결측치·이상치로 볼지는 **우리가 먼저** 정했습니다(활동지 ④). |

**쓰는 법**
1. 맨 먼저 **파일 → 드라이브에 사본 저장**.
2. 아래 **⓪ 우리 모둠 설정** 칸만 고칩니다. 나머지 칸은 위에서부터 **Shift + Enter** 로 하나씩 실행하며 결과를 읽습니다.
3. 처음에는 설정을 그대로 두고 **연습용 데이터(약수터 수질, 교과서 부록 221쪽)** 로 한 바퀴 돌려 보세요.
   연습 데이터는 **판정 표기가 섞여 있고(1 · Y · 0(여시니아))**, 일부러 **두 파일로 나누고 겹치는 행**을 두어서 ❸ 변환 · ❹ 통합 · ❺❻ 중복까지 모두 실행됩니다.
4. 우리 데이터로 바꿀 때는 `파일` · `x열` · `y열` · `바꿀열` · `바꿀값` 을 우리 것으로 고칩니다(없으면 `''` · `{}`).
"""))
C.append(code(KFONT))

C.append(md("""
---
## ⓪ 우리 모둠 설정 — **이 칸만** 고치세요

활동지 ④에 적은 **전처리 기준**을 그대로 옮깁니다. 열 이름은 `df.columns` 로 본 글자와 **띄어쓰기까지** 똑같아야 합니다.
"""))
C.append(code("""
# ── 우리 모둠 설정 ──────────────────────────────
파일 = '연습'              # 연습용(약수터 수질 · 상반기). 우리 파일을 올릴 거면 '우리데이터.csv' 처럼 파일 이름
두번째파일 = '연습2'        # ❹ 통합: 합칠 파일 이름(연습은 하반기 '연습2'), 없으면 ''
x열 = '질산성질소'          # 가설의 «원인 쪽»(가로축)
y열 = '일반세균'            # 가설의 «결과 쪽»(세로축)
뺄열 = ['연번']            # ⓬ 축소: 분석에 쓰지 않을 열(번호 · 이름 · 연락처 …)
바꿀열 = '판정'            # ❸ 변환: 표기를 통일할 열, 없으면 ''
바꿀값 = {'Y': '1', 'N': '0', '0(여시니아)': '0'}   # ❸ 변환: {'옛 표기': '새 표기'} 예) {'남자': '남', '여자': '여'}
결측처리 = '삭제'           # ❽ '삭제' · '평균' · '그대로'
이상치기준 = 'IQR'          # ❿ 'IQR'(83쪽) 또는 (최소, 최대) 예) (0, 200) 또는 '그대로'
AI결과파일 = ''            # «데이터 정리 AI»에서 받은 결과 CSV 이름(검증할 때만), 없으면 ''
# ────────────────────────────────────────────
if 파일 != '연습' and 두번째파일 == '연습2':
    두번째파일 = ''                       # 우리 데이터에 연습 파일이 섞이지 않게
print('설정 완료 —', 파일, '/', x열, '→', y열)
"""))

C.append(md("""
### 우리 파일 올리기 (연습이면 건너뜀)

교과서처럼 `files.upload()` 로 올립니다. 위 설정의 `파일`(그리고 `AI결과파일`) 이름과 **똑같은 이름**의 CSV를 고르세요. 두 개를 한꺼번에 골라도 됩니다.
"""))
C.append(code("""
if 파일 != '연습' or AI결과파일:
    from google.colab import files
    올린것 = files.upload()
    print('올린 파일 :', list(올린것))
else:
    print('연습용 데이터를 씁니다 — 올릴 것 없음')
"""))

C.append(md("""
---
## ❶ 판다스 준비 · ❷ 데이터 읽기 <small>72쪽</small>

**공공데이터포털 · KOSIS 에서 받은 CSV는 한글이 `cp949` 로 저장된 경우가 많습니다.**
그냥 읽으면 `UnicodeDecodeError` 가 나므로, 아래 `읽기` 는 `utf-8` 로 먼저 읽고 안 되면 `cp949` 로 다시 읽습니다.
"""))
C.append(code("""
import pandas as pd
import matplotlib.pyplot as plt
""" + RAW + """

def 읽기(이름):
    if 이름 in ('연습', '연습2'):                     # 연습용: 약수터 수질(판정 표기가 1 · Y · 0(여시니아)로 섞인 진짜 데이터)을
        w = pd.read_csv(주소 + 'water_quality.csv')     # 상반기 · 하반기 두 파일로 나눔(❹ 통합 · ❺ 중복 연습)
        return w.iloc[:200] if 이름 == '연습' else w.iloc[195:]   # 195~199행은 두 파일에 겹침 → 중복
    for 인코딩 in ['utf-8', 'cp949']:
        try:
            return pd.read_csv(이름, encoding=인코딩)
        except UnicodeDecodeError:
            pass

df = 읽기(파일)
기록 = {'처음': len(df)}          # 단계마다 행 수를 남겨 «데이터 정리 AI» 결과와 견줍니다
print(df.shape)
df.head()
"""))
C.append(code("""
print(list(df.columns))   # 열 이름 — 설정의 x열 · y열과 띄어쓰기까지 같은지 확인
df.info()                 # 자료형: 숫자여야 할 열이 object(글자)로 나오면 ❸에서 고칩니다
"""))

C.append(md("""
### 📤 «데이터 정리 AI»에 올릴 파일 만들기 (필요할 때만)

AI 탐구 교실의 «데이터 정리 AI»는 **UTF-8 CSV**(또는 엑셀)만 읽습니다. 공공데이터포털 CSV(cp949)는 그대로 올리면 글자가 깨집니다.
위에서 읽은 **원본 그대로**를 UTF-8로 다시 저장해 내려받은 뒤 올리세요.
"""))
C.append(code("""
원본 = df.copy()                      # 나중에 AI 결과와 견줄 원본
원본.to_csv('플랫폼용_utf8.csv', index=False, encoding='utf-8')
try:
    from google.colab import files
    files.download('플랫폼용_utf8.csv')
except Exception:
    print('저장함 — 플랫폼용_utf8.csv')
"""))

C.append(md("""
---
## ❸ 데이터 변환 <small>73쪽 · replace</small>

같은 뜻을 다르게 쓴 값(`남자` · `남`)을 하나로 맞춥니다.
숫자 열에 `'-'`, `'12,345'` 같은 **글자가 섞여** 있으면 `pd.to_numeric` 으로 숫자로 바꿉니다(바뀌지 않는 칸은 결측치가 됩니다 → ❼에서 셉니다).
"""))
C.append(code("""
if 바꿀열 in df.columns:
    print('바꾸기 전 :', df[바꿀열].value_counts().to_dict())
    df[바꿀열] = df[바꿀열].replace(바꿀값)
    print('바꾼 뒤   :', df[바꿀열].value_counts().to_dict())
elif 바꿀열:
    print('⚠', 바꿀열, '열이 없습니다 — 설정의 열 이름을 확인하세요')

for 열 in [x열, y열]:
    if df[열].dtype == object:
        df[열] = pd.to_numeric(df[열].astype(str).str.replace(',', ''), errors='coerce')
        print(열, '→ 숫자로 바꿈')
df[[x열, y열]].dtypes
"""))

C.append(md("""
## ❹ 데이터 통합 <small>73쪽 · concat</small>

여러 해 · 여러 지역 파일을 **위아래로 이어 붙입니다**. 열 이름이 같아야 합니다.
"""))
C.append(code("""
if 두번째파일:
    df2 = 읽기(두번째파일)
    if 바꿀열 in df2.columns:
        df2[바꿀열] = df2[바꿀열].replace(바꿀값)     # 합치기 전에 두 번째 파일도 같은 규칙으로(교과서 73쪽 순서)
    print('첫 파일 :', df.shape, ' 두 번째 파일 :', df2.shape)
    df = pd.concat([df, df2], ignore_index=True)
    print('합친 뒤 :', df.shape)
else:
    print('합칠 파일 없음 — 건너뜀')
"""))

C.append(md("""
## ❺ 중복 확인 · ❻ 중복 삭제 <small>74쪽 · duplicated · drop_duplicates</small>
"""))
C.append(code("""
print('완전히 같은 행 :', df.duplicated().sum(), '개')
df = df.drop_duplicates(keep='first')
기록['중복 삭제 후'] = len(df)
print('삭제 후 :', df.shape)
"""))

C.append(md("""
---
## 🤖 «데이터 정리 AI»를 썼다면 — 여기서 대조합니다

«데이터 정리 AI»에 맡길 때 요청 문장 틀(Ⅱ단원 쪽 데이터 탐구 ③과 같음):

> «(파일)에서 열은 ( ), ( )만 남겨 줘. 빈칸은 ( )로 처리하고, 이상치는 ( ) 기준으로 처리해 줘. **바꾼 내용을 표로** 보여 줘.»

«데이터 정리 AI»가 보여 준 **변경 내역**을 아래 표에 옮겨 적고, 이어지는 ❼~❿ 코드 결과(맨 끝 «단계별 행 수»)와 견줍니다.
**숫자가 다르면** — AI가 기준에 없는 일을 했거나, 우리가 기준을 다르게 전했다는 뜻입니다. 거절하고 다시 지시합니다.

| | 데이터 정리 AI가 말한 것 | 코드로 확인한 것 | 같은가? |
|---|---|---|---|
| 지운 결측치 행 수 | | | |
| 처리한 이상치 개수 | | | |
| 남은 행 수 | | | |
"""))

C.append(md("""
---
## ❼ 결측치 찾기 <small>75쪽 · isnull().sum()</small>
"""))
C.append(code("""
df.isnull().sum()
"""))
C.append(md("""
## ❽ 결측치 처리 <small>76쪽 · dropna · fillna</small>

설정의 `결측처리` 를 따릅니다. **지우면 n이 줄어듭니다** — 그래프 아래에 줄어든 n을 꼭 적으세요.
"""))
C.append(code("""
if 결측처리 == '삭제':
    df = df.dropna(subset=[x열, y열])
elif 결측처리 == '평균':
    df[x열] = df[x열].fillna(df[x열].mean())
    df[y열] = df[y열].fillna(df[y열].mean())
기록['결측 처리 후'] = len(df)
print(결측처리, '→', df.shape)
"""))

C.append(md("""
## ❾ 이상치 탐색 — 상자그림 <small>76쪽 · 83쪽 IQR</small>

상자 밖의 점이 **이상치 후보**입니다. 기준선은 **Q1 − 1.5×IQR**, **Q3 + 1.5×IQR**(83쪽 읽을거리).
"""))
C.append(code("""
plt.boxplot(df[y열])
plt.title(y열 + ' 상자그림')
plt.show()

Q1, Q3 = df[y열].quantile(0.25), df[y열].quantile(0.75)
IQR = Q3 - Q1
아래, 위 = Q1 - 1.5 * IQR, Q3 + 1.5 * IQR
후보 = df[(df[y열] < 아래) | (df[y열] > 위)]
print(f'Q1={Q1:.2f}  Q3={Q3:.2f}  IQR={IQR:.2f}  →  정상 범위 {아래:.2f} ~ {위:.2f}')
print('이상치 후보 :', len(후보), '개')
후보.head(10)
"""))
C.append(md("""
> **지우기 전에 사람이 판단합니다.** 후보 하나하나가 **측정 · 입력 오류**(키 772cm)인가, **실제로 극단적인 값**(폭염일의 기록적 기온)인가?
> 실제 값이라면 지우지 않는 것이 맞을 때가 많습니다. 판단 이유를 활동지 ④에 한 줄.
>
> 연습 데이터로 돌리면 후보가 **50개 넘게**(약 7분의 1) 나옵니다. 일반세균은 대부분 0이라 상자가 납작하기 때문입니다.
> 이걸 IQR로 다 지워도 될까요? — **기준을 기계적으로 적용하면 안 되는 이유**가 바로 이것입니다.
"""))

C.append(md("""
## ❿ 이상치 처리 · 다시 그리기 <small>77쪽 · 조건으로 행 고르기</small>
"""))
C.append(code("""
if 이상치기준 == 'IQR':
    조건 = (df[y열] >= 아래) & (df[y열] <= 위)
elif isinstance(이상치기준, tuple):
    조건 = (df[y열] >= 이상치기준[0]) & (df[y열] <= 이상치기준[1])
else:
    조건 = df[y열].notnull() | df[y열].isnull()      # '그대로' — 모두 남김
df = df[조건]
기록['이상치 처리 후'] = len(df)
plt.boxplot(df[y열])
plt.title(y열 + ' 상자그림 (처리 후)')
plt.show()
print(df.shape)
"""))

C.append(md("""
## ⓫ 저장 <small>77쪽 · to_csv</small>

치운 데이터를 저장합니다. 이 파일을 **Ⅳ단원 프로젝트 · 오렌지3**에서도 그대로 씁니다.
"""))
C.append(code("""
df.to_csv('우리데이터_전처리.csv', index=False, encoding='utf-8-sig')   # utf-8-sig: 엑셀에서 열어도 한글이 안 깨짐
try:
    from google.colab import files
    files.download('우리데이터_전처리.csv')
except Exception:
    print('저장함 — 코랩 왼쪽 📁 폴더에서 내려받을 수 있습니다')
"""))

C.append(md("""
### 단계별 행 수 — «데이터 정리 AI» 표와 견주기
"""))
C.append(code("""
for 단계, 수 in 기록.items():
    print(f'{단계:10s} {수:6d} 행')
"""))

C.append(md("""
### 🔍 «데이터 정리 AI» 결과 파일을 코드로 검증 (결과 CSV를 받았을 때)

AI가 돌려준 파일을 교과서 코드(❺ `duplicated` · ❼ `isnull().sum()` · ❾ 상자그림)로 다시 열어 봅니다. **우리 기준대로 됐는지는 코드가 증명합니다.**
"""))
C.append(code("""
if AI결과파일:
    ai = 읽기(AI결과파일)
    print('원본       :', 원본.shape, ' → AI 결과 :', ai.shape, ' / 우리 코드 :', df.shape)
    print('AI 결과 중복 행 :', ai.duplicated().sum())
    print('AI 결과 결측치  :')
    print(ai.isnull().sum()[ai.isnull().sum() > 0])
    if y열 in ai.columns:
        plt.boxplot([pd.to_numeric(ai[y열], errors='coerce').dropna(), df[y열]], labels=['AI 결과', '우리 코드'])
        plt.title(y열 + ' — AI 결과와 우리 코드 비교')
        plt.show()
else:
    print('AI 결과 파일 없음 — 건너뜀')
"""))
C.append(md("""
> 행 수 · 결측치 · 상자그림이 **우리 기준과 다르면** «데이터 정리 AI»에 «○○열의 빈칸은 평균이 아니라 삭제였어. 다시 해 줘»처럼 **거절하고 다시 지시**하고, 활동지 AI 사용 기록에 한 줄 남깁니다.
"""))

C.append(md("""
---
## ⓬ 데이터 축소 <small>78쪽 · drop(axis=1)</small>

가설과 관계없는 열(번호 · 이름 · 연락처 · 개인을 알아볼 수 있는 정보)을 뺍니다.
"""))
C.append(code("""
df = df.drop([열 for 열 in 뺄열 if 열 in df.columns], axis=1)
print(list(df.columns))
"""))

C.append(md("""
## ⓭ 핵심 속성을 찾는 시각화 <small>79쪽 · scatter</small>

그래프 제목에 **n(표본 수)** 을 함께 적습니다.
"""))
C.append(code("""
plt.scatter(df[x열], df[y열], alpha=0.6)
plt.xlabel(x열)
plt.ylabel(y열)
plt.title(f'{x열}와 {y열} (n={len(df)})')
plt.show()
"""))

C.append(md("""
## ⓮ 상관관계 분석 <small>79쪽 · corr</small>

**1에 가까우면** 함께 늘고, **−1에 가까우면** 하나가 늘 때 다른 하나가 줄고, **0 근처면** 관계가 약합니다.
"""))
C.append(code("""
corr = df.corr(numeric_only=True)
print(f'우리 가설의 상관계수  {x열} ↔ {y열} : {corr.loc[x열, y열]:.3f}')
print()
print(f'— {y열} 과 관련이 큰 속성 —')
print(corr[y열].drop(y열).sort_values(key=abs, ascending=False).head())
"""))
C.append(code("""
# (넓혀 보기) 상관계수를 색으로 — 히트맵
import seaborn as sns
sns.heatmap(corr, annot=True, fmt='.2f', cmap='coolwarm', vmin=-1, vmax=1)
plt.show()
"""))

C.append(md("""
---
## ✍️ 1차 해석 — **AI 없이** 먼저 (활동지 ④)

**그래프 자가 점검** — ☐ 축을 잘라 차이를 부풀리지 않았다 ☐ n을 적었다 ☐ 상관을 원인과 결과로 말하지 않았다 ☐ 불리한 데이터도 남겼다

- 그래프에서 보이는 것: «________ 와 ________ 는 함께 ________ (상관계수 ____, n=____).»
- 데이터가 말하지 않는 것: «________ 때문이라고는 말할 수 없다(________ 의 영향).»

**AI 사용 기록 한 줄** — 어떤 도구에 · 무엇을 맡겼고 · 결과를 받아들였나/거절했나 · 그 이유

> 교과서 원래 예제(의료비 file1 · file2)로 ❶~⓮를 다시 보려면 **노트북 13**, 80~82쪽 혈색소 활동도 노트북 13 맨 끝에 있습니다.
"""))

if __name__ == '__main__':
    save('20_data_inquiry_my_data.ipynb', C)
    save('20_data_inquiry_my_data.ipynb', C, solve=True)
    print('saved', len(C))
