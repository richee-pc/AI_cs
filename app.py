"""
2026학년도 2학기 3학년 「자료구조」 수행평가 1
'비선형구조-알고리즘 연결고리 발견하기' 학생 안내 페이지

page.html 을 그대로 읽어 Streamlit 화면에 띄운다.
안내문을 고칠 때는 page.html 만 수정하면 되고 이 파일은 건드릴 필요가 없다.
"""

from pathlib import Path

import streamlit as st
import streamlit.components.v1 as components

PAGE = Path(__file__).parent / "page.html"

st.set_page_config(
    page_title="비선형구조-알고리즘 연결고리 발견하기",
    page_icon="🔗",
    layout="wide",
    initial_sidebar_state="collapsed",
)

# Streamlit 기본 여백·헤더를 걷어내고, 안내 페이지가 화면 전체를 쓰도록 한다.
st.markdown(
    """
    <style>
      header[data-testid="stHeader"] { display: none; }
      [data-testid="stToolbar"] { display: none; }
      [data-testid="stDecoration"] { display: none; }
      .block-container { padding: 0 !important; max-width: 100% !important; }
      [data-testid="stAppViewContainer"] > .main { padding: 0 !important; }
      iframe[title="streamlit.components.v1.html"] {
        height: 100vh !important;
        width: 100% !important;
        border: none;
      }
    </style>
    """,
    unsafe_allow_html=True,
)

if not PAGE.exists():
    st.error(
        "page.html 을 찾을 수 없습니다. "
        "이 파일과 같은 폴더에 page.html 이 있는지 확인하세요."
    )
    st.stop()

fragment = PAGE.read_text(encoding="utf-8")

document = f"""<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>html,body{{margin:0;padding:0}}</style>
</head>
<body>
{fragment}
</body>
</html>"""

components.html(document, height=900, scrolling=True)
