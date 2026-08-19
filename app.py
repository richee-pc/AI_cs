"""
2026학년도 2학기 2학년 「인공지능 기초」 — 옛 주소 안내판

이 Streamlit 앱은 예전에 학생에게 알려 준 주소(aichsptp.streamlit.app)로
들어온 학생을 새 주소(GitHub Pages)로 보내 주는 역할만 한다.

왜 Streamlit 을 안 쓰게 되었나
--------------------------------
안내 페이지는 index.html · unit1.html · pose.html 처럼 여러 쪽으로 나뉘어 있는데,
Streamlit 은 app.py 가 읽어 준 파일 하나만 화면에 띄울 수 있어 Ⅰ단원 수업 자료 같은
나머지 쪽은 아예 서비스되지 않았다.

게다가 Streamlit 은 페이지를 sandbox 걸린 iframe 안에서 보여 준다. 이 sandbox 에는
allow-top-navigation 이 없어서, 페이지 안의 링크를 눌러도 주소창이 바뀌지 않는다.
그래서 「Ⅰ단원 수업 자료」 링크를 눌러도 아무 반응이 없었다.
같은 이유로 자동 이동(리다이렉트)도 불가능하다 — 학생이 단추를 한 번 눌러야 한다.
(target="_blank" 로 새 탭을 여는 것은 sandbox 의 allow-popups 덕분에 동작한다.)

GitHub Pages 는 이런 제약이 없고 모든 쪽이 그대로 열린다.
"""

import streamlit as st

NEW_URL = "https://richee-pc.github.io/AI_cs/"

st.set_page_config(
    page_title="인공지능 기초 · 2학기 안내 (새 주소 안내)",
    page_icon="🤖",
    layout="centered",
    initial_sidebar_state="collapsed",
)

st.markdown(
    """
    <style>
      header[data-testid="stHeader"] { display: none; }
      [data-testid="stToolbar"] { display: none; }
      [data-testid="stDecoration"] { display: none; }
      .block-container { padding: 3.2rem 1.1rem 2rem !important; max-width: 720px !important; }

      .movecard {
        background: #FFFFFF; border: 1px solid #D7E3F2; border-radius: 20px;
        padding: 34px clamp(20px, 5vw, 44px); text-align: center;
        box-shadow: 0 2px 14px rgba(31, 74, 128, .08);
      }
      .movecard .emoji { font-size: 3rem; line-height: 1; }
      .movecard h1 {
        font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif; font-weight: 800;
        font-size: clamp(1.35rem, 4.6vw, 1.8rem); color: #1F4A80;
        margin: 14px 0 6px; line-height: 1.45;
      }
      .movecard p.lead {
        font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif;
        font-size: clamp(.95rem, 2.4vw, 1.05rem); color: #44576F;
        margin: 0 0 24px; line-height: 1.7;
      }
      .movecard a.go {
        display: inline-block; text-decoration: none; font-weight: 800;
        font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif;
        font-size: clamp(1.05rem, 3vw, 1.2rem); color: #FFFFFF !important;
        background: #2D6FD1; border-radius: 99px; padding: 15px 38px;
        box-shadow: 0 3px 10px rgba(45, 111, 209, .32);
      }
      .movecard a.go:hover { background: #245BAC; }
      .movecard .addr {
        margin-top: 22px; font-family: Consolas, monospace;
        font-size: .8rem; color: #6B7E96; word-break: break-all;
      }
      .movecard .addr b { color: #1F4A80; }
      .tipbox {
        margin-top: 18px; background: #FFF6E8; border-left: 5px solid #E8A33D;
        border-radius: 0 14px 14px 0; padding: 14px 18px;
        font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif;
        font-size: .875rem; color: #5A4A33; line-height: 1.65;
      }
      @media (prefers-color-scheme: dark) {
        .movecard { background: #132B47; border-color: #24476F; }
        .movecard h1 { color: #BBD6F7; }
        .movecard p.lead { color: #A8BDD6; }
        .movecard .addr { color: #8AA3C0; }
        .movecard .addr b { color: #BBD6F7; }
        .tipbox { background: #3A2E1C; color: #E8D8BE; }
      }
    </style>

    <div class="movecard">
      <div class="emoji">🤖</div>
      <h1>인공지능 기초 · 2학기 안내는<br>새 주소로 옮겼습니다</h1>
      <p class="lead">
        이 주소에서는 <b>Ⅰ단원 수업 자료</b>가 열리지 않습니다.<br>
        아래 단추를 눌러 새 주소로 들어오세요.
      </p>
      <a class="go" href="__NEW_URL__" target="_blank" rel="noopener">새 안내 페이지 열기 →</a>
      <div class="addr">새 주소 &nbsp;<b>__NEW_URL__</b></div>
    </div>

    <div class="tipbox">
      <b>즐겨찾기를 바꿔 주세요.</b> 새 주소를 즐겨찾기에 넣어 두면 다음부터 바로 들어올 수 있습니다.
      주소창에 직접 입력해도 됩니다. 이 주소(<b>aichsptp.streamlit.app</b>)는 더 이상 쓰지 않습니다.
    </div>
    """.replace("__NEW_URL__", NEW_URL),
    unsafe_allow_html=True,
)
