# tools — 사이트 고치는 도구

학생이 보는 쪽(`*.html`)은 이 폴더 없이도 그대로 동작합니다. 여기는 **쪽을 다시 만들거나 점검할 때** 쓰는 도구입니다.
모든 스크립트는 저장소 기준 경로를 씁니다(어느 컴퓨터 · 클라우드에서도 `python tools/○○.py`).

필요한 것: Python 3.9+ · `pip install fonttools brotli` (글꼴) · `pip install nbformat nbclient pandas scikit-learn matplotlib seaborn` (노트북 시험 실행)

## 무엇을 고칠 때 무엇을 쓰나

| 고칠 것 | 고치는 곳 | 그다음 |
|---|---|---|
| 차시 · 날짜 · 오늘 할 순서 · 50분 흐름 | `lessons.js` (맨 위 `LES` · `CAL` · `ORDER`) | `python tools/bump.py` |
| 코랩 실습실 카드(필수/선택/심화 · 차시) | `tools/src/labs.js` · `labs_body.html` | `python tools/build_labs_models.py` |
| AI 모델 도감 | `tools/src/models_*.js` · `models_body.html` | `python tools/build_labs_models.py` |
| 데이터 공방 | `tools/src/datagen*.js` · `datagen_body.html` · `datagen.css` | `python tools/build_labs_models.py` |
| 단원 쪽(unit1~4) · 첫 화면 · 수업 계획 · 교사용(teach) | 그 `.html` 을 **직접** 고침 | 새 글자를 썼으면 `python tools/refont.py` |
| 모든 쪽 공통 모양 | `polish.css` · `polish.js` | `python tools/bump.py` |
| 코랩 노트북 | `tools/gen_notebooks*.py` (아래 주의) | `python tools/gen_notebooks6.py` 처럼 그 파일만 |

마지막에는 늘 `python tools/linkcheck.py` (차시 단계 · 쪽 안 링크 점검, 마지막 줄이 `done` 이면 통과).
외부 링크까지 보려면 `python tools/extlinks.py` (ChatGPT · Claude · Canva 403 은 자동 점검 차단이라 괜찮음).

## 주의

- **글꼴**: 쪽에 쓰는 글꼴은 `font/*.woff2`(엘리스 글꼴을 쓰는 글자만 잘라 담은 것). 새 제목 · 본문 글자를 넣었으면 `refont.py` 로 다시 잘라야 다른 글꼴이 섞이지 않습니다.
  본문 글꼴(디지털배움)의 `—` 는 줄 위쪽에 붙어 «¯»처럼 보여서 `refont.py` 가 `–` 모양으로 바꿔 끼웁니다.
- **노트북 생성기**: 다시 돌리면 그 노트북을 통째로 새로 씁니다. `02_model.ipynb`(🧱 오렌지3 대응표 칸)처럼 만든 뒤 손으로 고친 노트북이 있으니,
  돌린 뒤 `git diff notebooks/` 로 손으로 고친 칸이 사라지지 않았는지 꼭 확인합니다. 정답판은 `tools/nbtest/`(저장소에 안 올림)에 만들어지고 `nbrun.py` 로 실행해 봅니다.
- **`lessons.js` 안의 CSS** 는 작은따옴표 JS 문자열입니다. CSS 안에서는 큰따옴표만(`content:"✓"`).
- **unit2.html** 은 줄 끝이 CRLF 입니다. 스크립트로 고칠 때 줄 끝을 바꾸지 않게 합니다.
- `teach.html` 은 처음 빌드 뒤 직접 고쳐 왔으므로 빌드 스크립트가 없습니다(직접 고침).
