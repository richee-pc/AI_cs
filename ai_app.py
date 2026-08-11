"""
2026학년도 2학기 2학년 「인공지능 기초」 학생 안내 페이지

index.html 을 그대로 읽어 Streamlit 화면에 띄운다.
안내문을 고칠 때는 index.html 만 수정하면 되고 이 파일은 건드릴 필요가 없다.

index.html 은 그 자체로 완성된 문서라 브라우저로 직접 열어도 되고,
GitHub Pages 로 배포해도 똑같이 보인다. 이 파일은 Streamlit 배포용 진입점일 뿐이다.
"""

from pathlib import Path

import streamlit as st
import streamlit.components.v1 as components

PAGE = Path(__file__).parent / "index.html"

st.set_page_config(
    page_title="인공지능 기초 · 2학기 안내",
    page_icon="🤖",
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
        "index.html 을 찾을 수 없습니다. "
        "이 파일과 같은 폴더에 index.html 이 있는지 확인하세요."
    )
    st.stop()

components.html(PAGE.read_text(encoding="utf-8"), height=900, scrolling=True)
