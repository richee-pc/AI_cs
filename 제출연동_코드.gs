/**
 * 인공지능 기초 활동지 수집기  v11
 * 조선대학교부속고등학교 · 2026학년도 2학기 · 2학년 진로선택
 *
 * 한 스프레드시트 안에 활동별로 탭이 하나씩 생깁니다.
 *   · 튜링테스트        ← Ⅰ-01 활동 ②
 *   · AI해결안설계      ← Ⅰ-02 활동 ④
 *   · 탐색과정설계      ← Ⅰ-03 활동 ⑥
 *   · 유럽길찾기        ← Ⅰ-03 활동 ⑦
 *   · 우리동네등굣길    ← Ⅰ-04 활동 ⑧
 *   · 학교안길찾기      ← Ⅰ-05 활동 ⑨
 *   · 추론게임          ← Ⅰ-06 활동 ⑪
 *   · 토론입론서        ← Ⅲ-04 활동 ⑧ 개별 문서 A~D부 (수행평가 ① 윤리 토론)
 *   · 토론채점          ← 선생님이 «수행평가» 메뉴에서 만드는 채점표
 *   · 채점기준          ← 채점표가 «채점 근거» 문장을 가져오는 곳 (원문 5단계)
 *   · 세특도우미        ← 점수와 제출물에서 세특 초안을 뽑아 주는 곳
 *   · 규칙게임          ← Ⅰ-06 활동 ⑪ «친구와 추론 게임 주고받기»
 *                        (규칙 하나 · 규칙 사슬 · 스무고개 · 범인 찾기 · 규칙 맞히기)
 *
 * 규칙게임 탭만은 학생 페이지가 «읽기»도 합니다. 친구들이 올린 게임을
 * 목록으로 보여 주어야 하기 때문입니다. 나머지 탭은 읽히지 않습니다.
 * 부적절한 내용이 올라오면 시트에서 그 줄을 지우면 목록에서도 사라집니다.
 *
 * 쓰는 법은 같은 폴더의 «제출연동_안내.md» 를 보세요.
 */

// 학생 페이지의 SUBMIT_KEY 와 반드시 같아야 합니다.
var SUBMIT_KEY = 'chosun-ai-2026';

// 학생 페이지가 이 번호를 보고 «코드가 최신인지» 확인합니다. 건드리지 마세요.
var VER = 11;

var SHEETS = {

  turing: {
    name: '튜링테스트',
    head: ['제출 시각', '분반', '모둠', '모둠원',
           '학생 A', '학생 B', '전달자', '관객',
           '컴퓨터 역할', '라운드 수', 'A 득표', 'B 득표', '정답률(%)',
           '모둠 예측', '맞힘 여부', '판단 이유',
           '토의 ➊ 맞힌·못 맞힌 이유', '토의 ➋ 지능의 의미',
           '자기평가 1', '자기평가 2', '질문과 답변 전체'],
    width: [140, 70, 110, 200, 80, 80, 80, 140, 150, 80, 70, 70, 80,
            90, 80, 260, 260, 260, 80, 80, 420],
    row: function (d) {
      return [new Date(), d.cls || '', d.group || '', d.members || '',
              d.A || '', d.B || '', d.deliver || '', d.crowd || '',
              d.cpu || '', d.rounds || 0, d.voteA || 0, d.voteB || 0,
              d.rate === '' ? '' : d.rate,
              d.guess || '', d.correct || '', d.why || '',
              d.d1 || '', d.d2 || '',
              d.rub1 || '', d.rub2 || '', d.log || ''];
    }
  },

  design: {
    name: 'AI해결안설계',
    head: ['제출 시각', '분반', '모둠', '채운 칸', 'AI다움 진단',
           '① 어떤 문제인가', '② 누가 불편한가', '③ AI가 무엇을 판단하나',
           '④ 데이터 종류', '④ 어디서 구하나', '⑤ 잘 됐는지 어떻게 아나',
           '⑥ 잘못되면 어떤 일이', '⑦ 다른 모둠에서 인상 깊었던 것'],
    width: [140, 70, 110, 70, 130, 300, 220, 340, 160, 280, 240, 300, 280],
    row: function (d) {
      return [new Date(), d.cls || '', d.group || '',
              (d.filled || 0) + ' / 7', d.verdict || '',
              d.f1 || '', d.f2 || '', d.f3 || '',
              d.types || '', d.f4 || '', d.f5 || '', d.f6 || '', d.f7 || ''];
    }
  },

  puzzle: {
    name: '탐색과정설계',
    head: ['제출 시각', '분반', '모둠', '1단계 고른 핵심 요소', '2단계 맞은 칸 수',
           '3단계 고른 수행 작업', '3단계 이유', '4단계 직접 풀기'],
    width: [140, 70, 130, 320, 110, 190, 340, 170],
    row: function (d) {
      return [new Date(), d.cls || '', d.group || '', d.keys || '', d.cnt || '',
              d.pick || '', d.why || '', d.solved || ''];
    }
  },

  europe: {
    name: '유럽길찾기',
    head: ['제출 시각', '분반', '모둠', '1단계 그래프 빈칸', '3단계 갈 수 있는 나라',
           '4단계 지도에서 만든 길', '내가 찾은 길', '고른 이유',
           '자기평가 1 · 추상화', '자기평가 2 · 상태 설정'],
    width: [140, 70, 130, 200, 200, 300, 280, 300, 110, 130],
    row: function (d) {
      return [new Date(), d.cls || '', d.group || '', d.blanks || '', d.ops || '',
              d.path || '', d.ans || '', d.why || '', d.rub1 || '', d.rub2 || ''];
    }
  },

  town: {
    name: '우리동네등굣길',
    head: ['제출 시각', '분반', '모둠',
           '너비우선 살펴본 곳', '너비우선 경로', '너비우선 시간(분)',
           'A* 살펴본 곳', 'A* 경로', 'A* 시간(분)',
           '어느 쪽이 효율적인가', '너비 우선이 필요한 때',
           '자기평가 1 · 정보 이용', '자기평가 2 · 맹목적', '자기평가 3 · 차이점'],
    width: [140, 70, 130, 110, 300, 110, 100, 320, 100, 320, 300, 120, 120, 120],
    row: function (d) {
      return [new Date(), d.cls || '', d.group || '',
              d.bfsSeen || '', d.bfsPath || '', d.bfsTime || '',
              d.aSeen || '', d.aPath || '', d.aTime || '',
              d.why || '', d.when || '',
              d.rub1 || '', d.rub2 || '', d.rub3 || ''];
    }
  },

  school: {
    name: '학교안길찾기',
    head: ['제출 시각', '분반', '모둠',
           '급식실 · 최상 우선', '급식실 · A*',
           '매점 · 최상 우선', '매점 · A*',
           '대피 · 최상 우선', '대피 · A*',
           '살펴본 칸 수가 다른 이유', '불이 났을 때 길이 달라진 이유',
           '자기평가 1 · 탐색 과정 설명', '자기평가 2 · 효과 판단'],
    width: [140, 70, 130, 130, 130, 130, 130, 130, 130, 320, 320, 130, 130],
    row: function (d) {
      return [new Date(), d.cls || '', d.group || '',
              d.m0b || '', d.m0a || '', d.m1b || '', d.m1a || '', d.m2b || '', d.m2a || '',
              d.why || '', d.fire || '', d.rub1 || '', d.rub2 || ''];
    }
  },

  infer: {
    name: '추론게임',
    head: ['제출 시각', '분반', '모둠', '추론 퍼즐 점수',
           '내가 만든 게임', '그 게임의 정답', '규칙이 틀릴 수 있는 경우',
           '친구 게임에 남긴 의견'],
    width: [140, 70, 130, 110, 380, 300, 340, 420],
    row: function (d) {
      return [new Date(), d.cls || '', d.group || '', d.score || '',
              d.rule || '', d.fresh || '', d.weak || '', d.peer || ''];
    }
  },

  debate: {
    name: '토론입론서',
    // 열 순서는 학생 페이지(unit3.html)의 FIELDS 배열과 같습니다.
    // A부 = 평가 요소 ① · B부 = ② · C부 = ③ · D부 = ④
    head: ['제출 시각', '분반', '이름(모둠)', '논제', '입장', '채운 칸',
           '윤리 관점',
           'A-3 첫 관점 쟁점', 'A-3 둘째 관점 쟁점', 'A-4 주장',
           'A-5 근거 1', '근거 1 출처', 'A-5 근거 2', '근거 2 출처',
           'A-5 근거 3', '근거 3 출처', 'A-6 입론 발표 메모',
           'B-1 상대가 펼 주장', 'B-2 질문 ①', 'B-2 질문 ②', 'B-2 질문 ③',
           'B-3 나에게 올 반론', 'B-4 재반박 새 근거',
           'C-1 오간 논점 ①', 'C-2 오간 논점 ②', 'C-3 최종 정리 발언 원고',
           'C-4 말함 / 원고',
           'D-1 개발자 관점', 'D-2 사용자 관점', 'D-3 운영·관리자 관점',
           'D-4 반박당한 지점', 'D-5 주장 수정·보완',
           'D-6 실천 방안 ①', 'D-6 실천 방안 ②'],
    width: [140, 70, 120, 300, 60, 80,
            160,
            300, 300, 300,
            300, 180, 300, 180,
            300, 180, 260,
            280, 280, 280, 280,
            280, 280,
            280, 280, 420,
            100,
            280, 280, 280,
            300, 300,
            300, 300],
    row: function (d) {
      return [new Date(), d.cls || '', d.group || '', d.topic || '', d.side || '', d.done || '',
              d.views || '',
              d.v1 || '', d.v2 || '', d.cl || '',
              d.r1 || '', d.s1 || '', d.r2 || '', d.s2 || '',
              d.r3 || '', d.s3 || '', d.sp || '',
              d.b1 || '', d.q1 || '', d.q2 || '', d.q3 || '',
              d.b3 || '', d.b4 || '',
              d.n1 || '', d.n2 || '', d.fn || '',
              d.spoke || '',
              d.p1 || '', d.p2 || '', d.p3 || '',
              d.w1 || '', d.w2 || '',
              d.x1 || '', d.x2 || ''];
    }
  },

  rulegame: {
    name: '규칙게임',
    // 게임 종류가 다섯 가지라 열을 종류별로 두지 않습니다. 사람이 읽을 요약과
    // 되살릴 원본(JSON)을 나누어 담아, 종류가 늘어도 이 코드를 고칠 일이 없게 했습니다.
    head: ['제출 시각', '분반', '만든 사람(모둠)', '게임 종류',
           '문제 요약', '정답', '게임 데이터(JSON)'],
    width: [140, 70, 130, 100, 380, 240, 420],
    row: function (d) {
      return [new Date(), d.cls || '', d.group || '', d.kind || '',
              d.sum || '', d.ans || '', d.json || ''];
    }
  },

  worksheet: {
    name: '탐색학습지',
    head: ['제출 시각', '분반', '이름(모둠)',
           '1번 (가)/(나)/(다)', '2번 용어/개선기법',
           '3번 평가값/이동거리/평가개수', '4번 최단경로/총비용',
           '5번 A값/C베타/C알파/자를 단말'],
    width: [140, 70, 130, 300, 220, 220, 200, 260],
    row: function (d) {
      return [new Date(), d.cls || '', d.group || '',
              d.q1 || '', d.q2 || '', d.q3 || '', d.q4 || '', d.q5 || ''];
    }
  }
};

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
  } catch (err) {
    return out({ ok: false, error: '다른 제출을 처리 중입니다. 잠시 뒤 다시 시도해 주세요.' });
  }
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return out({ ok: false, error: '보낸 내용이 비어 있습니다.' });
    }
    var d = JSON.parse(e.postData.contents);
    if (d.key !== SUBMIT_KEY) {
      return out({ ok: false, error: '열쇠말이 맞지 않습니다.' });
    }

    // type 이 없으면 예전 페이지에서 온 것이므로 튜링테스트로 본다
    var kind = SHEETS[d.type] || SHEETS.turing;
    sheet(kind).appendRow(kind.row(d));
    return out({ ok: true, ver: VER, sheet: kind.name });

  } catch (err) {
    return out({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// 학생 페이지가 코드 버전을 확인할 때, 그리고 선생님이 주소를 눌러 볼 때.
// ?list=rulegame 이면 «규칙게임» 탭을 읽어 목록으로 돌려준다.
function doGet(e) {
  var p = (e && e.parameter) || {};
  if (p.list) {
    if (p.key !== SUBMIT_KEY) {
      return out({ ok: false, error: '열쇠말이 맞지 않습니다.' });
    }
    // 읽기를 허용하는 탭은 «규칙게임» 하나뿐입니다. 다른 탭은 열어 주지 않습니다.
    if (p.list !== 'rulegame') {
      return out({ ok: false, error: '읽을 수 없는 목록입니다.' });
    }
    return out({ ok: true, ver: VER, games: readGames(p.cls || '') });
  }
  return out({ ok: true, ver: VER, msg: '수집기가 켜져 있습니다. (v' + VER + ')' });
}

/** «규칙게임» 탭을 읽어 최신순으로 돌려준다. cls 를 주면 그 분반 것만. */
function readGames(cls) {
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEETS.rulegame.name);
  if (!sh) return [];
  var last = sh.getLastRow();
  if (last < 2) return [];
  var MAX = 300;                                   // 너무 많아지면 최근 것부터
  var n = Math.min(last - 1, MAX);
  var rows = sh.getRange(last - n + 1, 1, n, 7).getValues();
  var list = [];
  for (var i = rows.length - 1; i >= 0; i--) {     // 최신이 맨 위로
    var r = rows[i];
    var js = String(r[6] || '').trim();
    if (!js) continue;                             // 원본이 없으면 되살릴 수 없다
    if (cls && String(r[1] || '') !== cls) continue;
    list.push({
      t: r[0] ? new Date(r[0]).getTime() : 0,
      cls: String(r[1] || ''), n: String(r[2] || ''),
      kind: String(r[3] || ''), json: js
    });
  }
  return list;
}

function sheet(kind) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(kind.name);
  if (!sh) {
    sh = ss.insertSheet(kind.name);
    sh.appendRow(kind.head);
    sh.getRange(1, 1, 1, kind.head.length)
      .setFontWeight('bold')
      .setBackground('#DCEBFF')
      .setFontColor('#1B49B8');
    sh.setFrozenRows(1);
    sh.getRange('A:A').setNumberFormat('yyyy-mm-dd hh:mm');
    for (var i = 0; i < kind.width.length; i++) sh.setColumnWidth(i + 1, kind.width[i]);
  } else if (headDiffers(sh, kind)) {
    // 열 구성이 바뀐 탭 — 머리글을 손으로 고치지 않아도 되게 맞춰 준다
    sh.getRange(1, 1, 1, kind.head.length)
      .setValues([kind.head])
      .setFontWeight('bold')
      .setBackground('#DCEBFF')
      .setFontColor('#1B49B8');
    for (var j = 0; j < kind.width.length; j++) sh.setColumnWidth(j + 1, kind.width[j]);
  }
  return sh;
}

/** 지금 머리글이 코드의 head 와 다른지 (열이 늘었거나 이름이 바뀐 경우) */
function headDiffers(sh, kind) {
  var last = sh.getLastColumn();
  if (last < kind.head.length) return true;
  var now = sh.getRange(1, 1, 1, kind.head.length).getValues()[0];
  for (var i = 0; i < kind.head.length; i++) {
    if (String(now[i] || '').trim() !== kind.head[i]) return true;
  }
  return false;
}


/* ══════════════════════════════════════════════════════════
   토론 채점표 · 채점 기준 · 세특 도우미
   「토론입론서」 탭에 들어온 제출물에서 명단을 뽑아 채점표를 만든다.
   평가 요소 네 가지와 5단계 기준은 평가 운영 계획의
   「가. 인공지능 윤리 토론」 원문과 같다.
   시트를 열면 상단에 «수행평가» 메뉴가 생긴다.

   점수를 고르면 그 점수의 «기준 문장»이 채점표에 그대로 따라 붙는다.
   학생이 «왜 이 점수인가»를 물으면 그 칸을 그대로 보여 주면 된다.
   ══════════════════════════════════════════════════════════ */

var GRADE_SHEET = '토론채점';
var CRIT_SHEET  = '채점기준';
var SE_SHEET    = '세특도우미';

var GRADE_COLS = ['논제 분석과 입론서', '교차 질의와 반론·반박',
                  '최종 정리 발언', '윤리 분석과 공존 방안'];
var GRADE_LEVELS = [25, 20, 15, 10, 5, 0];   // 0 = 미실시
var CUT = [[90, 'A'], [80, 'B'], [70, 'C'], [50, 'D']];   // 그 아래는 E

/* 평가 운영 계획 원문. 채점표의 「채점 근거」 칸이 여기서 문장을 가져간다. */
var CRIT = [
  [25, '윤리 관점(투명성·공정성·책임성) 중 2가지 이상으로 쟁점을 나누어 쓰고, 근거 3가지 모두에 출처(기관·연도 또는 수치)를 밝혔으며, 입론 요약 발언에서 원고 없이 근거의 출처를 설명함',
   20, '윤리 관점 1가지로 쟁점을 나누어 쓰고, 근거 3가지 중 2가지에 출처를 밝혔으며, 주장과 근거가 서로 어긋나지 않음',
   15, '근거 3가지를 제시하였으나 출처를 밝힌 것이 1가지이거나, 근거 1가지가 주장과 연결되지 않음',
   10, '근거를 2가지 이하로 제시하였거나 출처가 없으며, 입론 요약 발언에서 자기 근거를 설명하지 못함',
   5,  '입론서를 제출하였으나 양식 6항목 중 3항목 이상이 비어 있거나 논제와 관련이 없음'],
  [25, '질의와 답변을 모두 수행하고, 질의에서 상대 논증의 전제 또는 근거의 허점을 지목하였으며, 답변에서 상대의 재질문에 새로운 근거를 들어 대응함',
   20, '질의와 답변을 모두 수행하고, 상대 논증의 허점을 지목하여 근거를 들어 반박함',
   15, '질의와 답변을 모두 수행하였으나 그중 하나가 상대 발언을 겨냥하지 못하거나 근거 없이 자기 주장을 반복함',
   10, '질의와 답변 중 한 가지만 수행함',
   5,  '질의와 답변을 하지 않았으나 토론 규칙을 지키며 상대 발언을 듣고 기록함'],
  [25, '토론 중 실제로 오간 논점을 2가지 이상 인용하여 쟁점을 정리하고, 자기 입장이 우위인 이유를 근거와 함께 제시하며 정해진 1분 안에 마침',
   20, '토론 중 오간 논점을 1가지 인용하여 쟁점을 정리하고 자기 입장을 근거와 함께 정리함',
   15, '쟁점을 정리하였으나 토론 중 오간 논점을 인용하지 못하고 입론 내용에 머무름',
   10, '발언이 자기 입론서의 문장을 그대로 반복하는 데 그침',
   5,  '최종 정리 발언에 참여하였으나 쟁점 정리 없이 소감을 말하는 데 그침'],
  [25, '개발자·사용자·운영자 세 관점에서 각각 쟁점을 분석하고, 토론에서 자신이 반박당한 지점을 밝혀 주장을 수정·보완하였으며, 실천 방안을 「누가 무엇을 한다」가 드러나게 2가지 이상 제시함',
   20, '세 관점 중 2가지 관점에서 쟁점을 분석하고, 실천 방안을 「누가 무엇을 한다」가 드러나게 1가지 이상 제시함',
   15, '한 관점에서만 쟁점을 분석하였고, 실천 방안이 「노력해야 한다」 수준의 일반 진술에 그침',
   10, '토론 내용을 요약하는 데 그치고 윤리 관점의 분석이 나타나지 않음',
   5,  '성찰문을 제출하였으나 논제와 관련이 없거나 요구 분량의 절반에 못 미침']
];

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('수행평가')
    .addItem('① 토론 채점표 만들기 / 명단 새로고침', '토론채점표만들기')
    .addItem('② 세특 초안 만들기 / 새로 고치기', '세특초안만들기')
    .addSeparator()
    .addItem('채점 결과 요약 보기', '토론채점요약')
    .addToUi();
}

/* ── 채점기준 탭 ──────────────────────────────────────────
   채점표의 「채점 근거」 칸이 이 탭을 찾아본다. 사람이 읽어도 되고,
   학생에게 그대로 보여 주어도 되는 표다.                        */
function 채점기준시트(ss) {
  var sh = ss.getSheetByName(CRIT_SHEET);
  if (sh) sh.clear(); else sh = ss.insertSheet(CRIT_SHEET);

  var rows = [['찾는 값', '평가 요소', '점수', '이 점수를 주는 기준']];
  for (var e = 0; e < 4; e++) {
    for (var k = 0; k < CRIT[e].length; k += 2) {
      rows.push([(e + 1) + '-' + CRIT[e][k],
                 (e + 1) + '. ' + GRADE_COLS[e],
                 CRIT[e][k], CRIT[e][k + 1]]);
    }
    rows.push([(e + 1) + '-0', (e + 1) + '. ' + GRADE_COLS[e], 0, '미실시 — 해당 활동에 참여하지 않음']);
  }
  sh.getRange(1, 1, rows.length, 4).setValues(rows);
  sh.getRange(1, 1, 1, 4).setFontWeight('bold')
    .setBackground('#DCEBFF').setFontColor('#1B49B8');
  sh.getRange(2, 4, rows.length - 1, 1).setWrap(true).setVerticalAlignment('top');
  sh.getRange(2, 3, rows.length - 1, 1).setHorizontalAlignment('center').setFontWeight('bold');
  sh.setColumnWidth(1, 80); sh.setColumnWidth(2, 200);
  sh.setColumnWidth(3, 60); sh.setColumnWidth(4, 720);
  sh.setFrozenRows(1);
  // 만점 줄만 초록으로
  for (var r = 2; r <= rows.length; r++) {
    if (sh.getRange(r, 3).getValue() === 25) {
      sh.getRange(r, 1, 1, 4).setBackground('#DDF6EB');
    }
  }
  return sh;
}

/** 제출된 문서에서 명단을 뽑아 채점표를 만든다. 이미 매긴 점수는 지우지 않는다. */
function 토론채점표만들기() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var src = ss.getSheetByName(SHEETS.debate.name);
  if (!src || src.getLastRow() < 2) {
    SpreadsheetApp.getUi().alert('아직 제출된 문서가 없습니다.\n학생이 활동 ⑧에서 제출하면 명단이 채워집니다.');
    return;
  }
  채점기준시트(ss);

  // 제출물에서 (분반, 이름) 뽑기 — 같은 학생이 여러 번 냈으면 마지막 것만
  var rows = src.getRange(2, 1, src.getLastRow() - 1, 6).getValues();  // 시각·분반·이름·논제·입장·채운 칸
  var seen = {}, list = [];
  for (var i = 0; i < rows.length; i++) {
    var cls = String(rows[i][1] || '').trim();
    var nm = String(rows[i][2] || '').trim();
    if (!nm) continue;
    var key = cls + '|' + nm;
    if (seen[key] === undefined) { seen[key] = list.length; list.push([cls, nm, '', '', '']); }
    list[seen[key]][2] = String(rows[i][3] || '');   // 논제
    list[seen[key]][3] = String(rows[i][4] || '');   // 입장
    list[seen[key]][4] = String(rows[i][5] || '');   // 채운 칸
  }
  list.sort(function (a, b) {
    return a[0] === b[0] ? (a[1] < b[1] ? -1 : 1) : (a[0] < b[0] ? -1 : 1);
  });

  var sh = ss.getSheetByName(GRADE_SHEET);
  var old = {};
  if (sh) {
    // 이미 매긴 점수와 메모를 기억해 둔다
    if (sh.getLastRow() > 2) {
      var prev = sh.getRange(3, 1, sh.getLastRow() - 2, 13).getValues();
      for (var p = 0; p < prev.length; p++) {
        var k = String(prev[p][0]) + '|' + String(prev[p][1]);
        old[k] = [prev[p][5], prev[p][6], prev[p][7], prev[p][8], prev[p][12]];
      }
    }
    sh.clear();
    sh.clearConditionalFormatRules();
  } else {
    sh = ss.insertSheet(GRADE_SHEET);
  }

  // ── 머리글 두 줄 ──
  var head1 = ['분반', '이름(모둠)', '논제', '입장', '채운 칸',
               '① ' + GRADE_COLS[0], '② ' + GRADE_COLS[1],
               '③ ' + GRADE_COLS[2], '④ ' + GRADE_COLS[3],
               '합계', '성취도', '채점 근거 (자동)', '관찰 메모'];
  var head2 = ['', '', '', '', '26칸 중',
               '25점', '25점', '25점', '25점', '100점', '',
               '고른 점수의 기준 문장이 그대로 들어옵니다',
               '토론 중 눈에 띈 모습 — 세특에 쓰입니다'];
  sh.getRange(1, 1, 1, head1.length).setValues([head1])
    .setFontWeight('bold').setBackground('#DCEBFF').setFontColor('#1B49B8')
    .setVerticalAlignment('middle').setWrap(true);
  sh.getRange(2, 1, 1, head2.length).setValues([head2])
    .setFontSize(9).setFontColor('#5E708D').setBackground('#F2F8FF').setWrap(true);
  sh.setFrozenRows(2);
  sh.setFrozenColumns(2);

  if (list.length) {
    sh.getRange(3, 1, list.length, 5).setValues(list);
    for (var r = 0; r < list.length; r++) {
      var row = 3 + r;
      var k2 = list[r][0] + '|' + list[r][1];
      if (old[k2]) {
        sh.getRange(row, 6, 1, 4).setValues([[old[k2][0], old[k2][1], old[k2][2], old[k2][3]]]);
        sh.getRange(row, 13).setValue(old[k2][4]);
      }
      // 합계 · 성취도
      sh.getRange(row, 10).setFormula('=IF(COUNT(F' + row + ':I' + row + ')=0,"",SUM(F' + row + ':I' + row + '))');
      sh.getRange(row, 11).setFormula(
        '=IF(J' + row + '="","",IF(J' + row + '>=90,"A",IF(J' + row + '>=80,"B",' +
        'IF(J' + row + '>=70,"C",IF(J' + row + '>=50,"D","E")))))');
      // 채점 근거 — 고른 점수의 기준 문장을 「채점기준」 탭에서 가져온다
      sh.getRange(row, 12).setFormula(근거수식(row));
    }
    // 점수 칸 드롭다운
    var rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(GRADE_LEVELS, true)
      .setAllowInvalid(false)
      .setHelpText('25 / 20 / 15 / 10 / 5 중에서 고르세요 (0 = 미실시)')
      .build();
    sh.getRange(3, 6, list.length, 4).setDataValidation(rule)
      .setHorizontalAlignment('center').setFontWeight('bold');
    sh.getRange(3, 5, list.length, 1).setHorizontalAlignment('center');
    sh.getRange(3, 10, list.length, 2).setHorizontalAlignment('center').setFontWeight('bold');
    sh.getRange(3, 12, list.length, 2).setWrap(true).setVerticalAlignment('top').setFontSize(9);

    // 성취도 색
    var rng = sh.getRange(3, 11, list.length, 1);
    var rules = [];
    var colors = [['A', '#DDF6EB', '#11734C'], ['B', '#DCEBFF', '#1B49B8'],
                  ['C', '#FFF1DF', '#9C5409'], ['D', '#FDE9E7', '#C8362F'],
                  ['E', '#F1D5D2', '#8A241E']];
    for (var c = 0; c < colors.length; c++) {
      rules.push(SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo(colors[c][0])
        .setBackground(colors[c][1]).setFontColor(colors[c][2])
        .setRanges([rng]).build());
    }
    sh.setConditionalFormatRules(rules);
  }

  var w = [70, 130, 260, 60, 70, 105, 105, 105, 105, 65, 65, 460, 300];
  for (var i2 = 0; i2 < w.length; i2++) sh.setColumnWidth(i2 + 1, w[i2]);
  sh.getRange(1, 1, 2, head1.length).setHorizontalAlignment('center');

  SpreadsheetApp.getUi().alert(
    '채점표를 만들었습니다.\n\n' +
    '학생 ' + list.length + '명\n\n' +
    '점수 칸(①~④)은 25 / 20 / 15 / 10 / 5 중에서 고르면 되고,\n' +
    '합계·성취도와 «채점 근거»는 자동으로 채워집니다.\n\n' +
    '「채점 근거」 칸에는 고른 점수의 기준 문장이 그대로 들어옵니다.\n' +
    '학생이 점수를 물으면 그 칸을 보여 주시면 됩니다.\n' +
    '기준 원문은 새로 만들어진 «채점기준» 탭에 있습니다.\n\n' +
    '다시 실행해도 이미 매긴 점수와 관찰 메모는 그대로 둡니다.');
}

/** 한 줄의 「채점 근거」 수식 */
function 근거수식(row) {
  var part = [];
  var col = ['F', 'G', 'H', 'I'], num = ['①', '②', '③', '④'];
  for (var e = 0; e < 4; e++) {
    var c = col[e] + row;
    part.push('IF(' + c + '="","","' + num[e] + ' "&' + c + '&"점 · "&' +
              'IFERROR(VLOOKUP("' + (e + 1) + '-"&' + c + ",'" + CRIT_SHEET + "'!$A:$D,4,FALSE),\"\"))");
  }
  return '=IF(COUNT(F' + row + ':I' + row + ')=0,"",TEXTJOIN(CHAR(10)&CHAR(10),TRUE,' +
         part.join(',') + '))';
}

/* ══════════════════════════════════════════════════════════
   세특 도우미
   점수와 학생이 낸 글에서 «관찰된 사실»만 뽑아 초안을 짜 준다.
   초안은 어디까지나 초안이다 — 선생님이 고쳐 「최종본」 칸에 넣는다.
   점수나 드롭다운을 바꾸면 메뉴에서 한 번 더 눌러 새로 고친다.
   ══════════════════════════════════════════════════════════ */

/* 점수 단계별로 «무엇을 했는지»를 세특 말투(…함/…음)로 적어 둔 것.
   평가 기준의 표현을 학생의 «행동»으로 바꾸어 옮겼다. */
var SE_CLAUSE = [
  { 25:'윤리 관점 두 가지 이상으로 쟁점을 나누고 근거 세 가지에 모두 출처를 밝혀 입론을 구성하였으며, 발표에서 원고 없이 근거의 출처를 설명함',
    20:'윤리 관점을 세워 쟁점을 나누고 근거 대부분에 출처를 밝혀 주장과 어긋나지 않는 입론을 구성함',
    15:'근거 세 가지를 갖추어 입론을 구성함',
    10:'주장과 근거를 갖추어 입론을 작성함',
    5 :'입론 작성 활동에 참여함' },
  { 25:'교차 질의에서 상대 논증의 전제와 근거의 허점을 지목해 질문하고, 상대의 재질문에는 새로운 근거를 들어 대응함',
    20:'교차 질의에서 상대 논증의 허점을 지목하고 근거를 들어 반박함',
    15:'교차 질의에서 질문과 답변에 모두 참여함',
    10:'교차 질의에서 질문과 답변 중 한 가지를 수행함',
    5 :'토론 규칙을 지키며 상대의 발언을 끝까지 듣고 기록함' },
  { 25:'최종 정리 발언에서 토론 중 오간 논점을 두 가지 이상 인용해 쟁점을 정리하고 자기 입장이 우위인 이유를 근거와 함께 제시함',
    20:'최종 정리 발언에서 토론 중 오간 논점을 인용해 쟁점을 정리함',
    15:'최종 정리 발언에서 쟁점을 정리함',
    10:'최종 정리 발언에 참여함',
    5 :'최종 정리 순서에 참여함' },
  { 25:'토론 뒤 성찰에서 개발자·사용자·운영자 세 관점으로 쟁점을 분석하고, 자신이 반박당한 지점을 밝혀 주장을 수정·보완함',
    20:'토론 뒤 성찰에서 두 관점으로 쟁점을 분석하고 실천 방안을 구체적으로 제시함',
    15:'토론 뒤 성찰에서 한 관점으로 쟁점을 분석하고 실천 방안을 제시함',
    10:'토론 내용을 정리하여 성찰함',
    5 :'성찰 활동에 참여함' }
];

var SE_STRONG = {
  '':'',
  '자료 조사':'근거를 찾을 때 기관과 연도를 확인해 신뢰할 수 있는 자료를 골라내는 모습이 두드러짐',
  '논리 전개':'주장과 근거의 연결을 스스로 점검하며 논리를 촘촘하게 세우는 모습이 두드러짐',
  '반박 대응':'예상하지 못한 질문에도 침착하게 새로운 근거를 찾아 대응하는 순발력이 돋보임',
  '쟁점 정리':'여러 갈래로 흩어진 논의를 핵심 쟁점으로 묶어 정리하는 능력이 돋보임',
  '윤리적 성찰':'기술의 편익과 위험을 함께 저울질하며 판단을 유보할 줄 아는 태도를 보임',
  '경청과 기록':'상대의 발언을 끝까지 듣고 정확히 기록해 이후 논의에 활용하는 태도가 돋보임',
  '팀 조율':'팀 안에서 발언 순서와 역할을 조율하며 협력을 이끄는 모습을 보임',
  '자료의 재해석':'찾은 자료를 그대로 옮기지 않고 자기 말로 바꾸어 설명하는 힘이 있음'
};

var SE_GROW = {
  '':'',
  '입장 전환 경험':'무작위로 배정받은 입장이 평소 생각과 달랐음에도 근거를 갖추어 논리를 세우는 경험을 통해 사고의 폭을 넓힘',
  '주장 수정':'토론에서 반박당한 지점을 인정하고 자신의 주장을 스스로 고쳐 쓰는 지적 정직함을 보임',
  '준비의 효과 확인':'충분한 사전 조사가 발언의 설득력으로 이어진다는 것을 스스로 확인함',
  '발표 자신감':'여러 사람 앞에서 말하는 부담을 준비로 이겨 내며 발언 태도가 눈에 띄게 나아짐',
  '관점의 확장':'개발자·사용자·운영자로 자리를 바꾸어 보며 하나의 기술을 여러 자리에서 바라보게 됨'
};

function 등급문장(e, score) {
  var x = String(score === null || score === undefined ? '' : score).trim();
  if (x === '' || isNaN(Number(x))) return '';
  return SE_CLAUSE[e][Number(x)] || '';
}

/** 채점표와 제출물을 읽어 세특 초안을 만든다. 이미 적은 최종본은 지우지 않는다. */
function 세특초안만들기() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var gs = ss.getSheetByName(GRADE_SHEET);
  if (!gs || gs.getLastRow() < 3) {
    SpreadsheetApp.getUi().alert('채점표가 아직 없습니다.\n먼저 «① 토론 채점표 만들기»를 실행하세요.');
    return;
  }
  var src = ss.getSheetByName(SHEETS.debate.name);

  // 학생이 낸 글에서 세특에 쓸 만한 것만 골라 둔다 (마지막 제출 기준)
  var mine = {};
  if (src && src.getLastRow() > 1) {
    var d = src.getRange(2, 1, src.getLastRow() - 1, 34).getValues();
    for (var i = 0; i < d.length; i++) {
      var nm = String(d[i][2] || '').trim();
      if (!nm) continue;
      mine[String(d[i][1] || '').trim() + '|' + nm] = {
        views: String(d[i][6] || '').trim(),      // 윤리 관점
        act:   String(d[i][32] || '').trim(),     // D-6 실천 방안 ①
        beat:  String(d[i][30] || '').trim()      // D-4 반박당한 지점
      };
    }
  }

  var G = gs.getRange(3, 1, gs.getLastRow() - 2, 13).getValues();

  var sh = ss.getSheetByName(SE_SHEET);
  var keep = {};
  if (sh) {
    if (sh.getLastRow() > 1) {
      var pv = sh.getRange(2, 1, sh.getLastRow() - 1, 12).getValues();
      for (var p = 0; p < pv.length; p++) {
        keep[String(pv[p][0]) + '|' + String(pv[p][1])] =
          [pv[p][6], pv[p][7], pv[p][8], pv[p][11]];   // 두드러진 점 · 성장 · 한 줄 · 최종본
      }
    }
    sh.clear();
    sh.clearConditionalFormatRules();
  } else {
    sh = ss.insertSheet(SE_SHEET);
  }

  var head = ['분반', '이름(모둠)', '논제', '입장', '합계', '성취도',
              '두드러진 점', '성장·변화', '선생님 한 줄',
              '세특 초안 (자동)', '글자 수', '최종본 (고쳐 쓰는 칸)'];
  sh.getRange(1, 1, 1, head.length).setValues([head])
    .setFontWeight('bold').setBackground('#DCEBFF').setFontColor('#1B49B8').setWrap(true);
  sh.setFrozenRows(1);
  sh.setFrozenColumns(2);

  var body = [], done = 0;
  for (var r = 0; r < G.length; r++) {
    var cls = String(G[r][0] || ''), nm = String(G[r][1] || '');
    if (!nm) continue;
    var k = cls + '|' + nm;
    var old = keep[k] || ['', '', '', ''];
    // G[r][12] = 채점표 M열 「관찰 메모」 · old[2] = 세특도우미 I열 「선생님 한 줄」
    var txt = 세특문장(G[r], mine[k], old[0], old[1], old[2], G[r][12]);
    if (txt) done++;
    body.push([cls, nm, G[r][2], G[r][3], G[r][9], G[r][10],
               old[0], old[1], old[2], txt, '', old[3]]);
  }
  if (!body.length) {
    SpreadsheetApp.getUi().alert('채점표에 학생이 없습니다.');
    return;
  }
  sh.getRange(2, 1, body.length, head.length).setValues(body);

  // 드롭다운 두 칸
  function pick(col, obj, help) {
    var opts = [];
    for (var key in obj) if (key) opts.push(key);
    sh.getRange(2, col, body.length, 1).setDataValidation(
      SpreadsheetApp.newDataValidation().requireValueInList(opts, true)
        .setAllowInvalid(true).setHelpText(help).build());
  }
  pick(7, SE_STRONG, '토론에서 가장 두드러진 점을 하나 고르세요 (비워도 됩니다)');
  pick(8, SE_GROW, '이 학생에게 남은 변화를 하나 고르세요 (비워도 됩니다)');

  for (var b = 0; b < body.length; b++) {
    var row = 2 + b;
    sh.getRange(row, 11).setFormula('=IF(L' + row + '="",LEN(J' + row + '),LEN(L' + row + '))');
  }
  sh.getRange(2, 10, body.length, 1).setWrap(true).setVerticalAlignment('top').setFontSize(9);
  sh.getRange(2, 12, body.length, 1).setWrap(true).setVerticalAlignment('top');
  sh.getRange(2, 9, body.length, 1).setWrap(true).setVerticalAlignment('top');
  sh.getRange(2, 11, body.length, 1).setHorizontalAlignment('center').setFontWeight('bold');

  // 500자를 넘으면 빨갛게
  sh.setConditionalFormatRules([
    SpreadsheetApp.newConditionalFormatRule()
      .whenNumberGreaterThan(500)
      .setBackground('#FDE9E7').setFontColor('#C8362F')
      .setRanges([sh.getRange(2, 11, body.length, 1)]).build()
  ]);

  var w = [70, 120, 240, 55, 60, 60, 130, 130, 240, 560, 70, 560];
  for (var i3 = 0; i3 < w.length; i3++) sh.setColumnWidth(i3 + 1, w[i3]);

  SpreadsheetApp.getUi().alert(
    '세특 초안을 만들었습니다.\n\n' +
    '학생 ' + body.length + '명 · 초안이 만들어진 학생 ' + done + '명\n' +
    '(점수를 하나도 매기지 않은 학생은 초안이 비어 있습니다)\n\n' +
    '［쓰는 순서］\n' +
    '1. «두드러진 점»과 «성장·변화»를 드롭다운에서 고릅니다.\n' +
    '2. «선생님 한 줄»에 그 학생만의 장면을 적습니다.\n' +
    '3. 메뉴에서 «② 세특 초안 만들기»를 한 번 더 누릅니다.\n' +
    '4. J열 초안을 L열 «최종본»에 옮겨 고쳐 씁니다.\n\n' +
    '초안은 500자를 넘지 않게 맞춥니다. 넘칠 것 같으면\n' +
    '관점·성장 문장부터 덜어 내고, 점수에서 나온 네 문장과\n' +
    '선생님이 적은 한 줄은 끝까지 남깁니다.\n\n' +
    '초안은 점수와 학생이 낸 글에서 «확인된 사실»만으로 짰습니다.\n' +
    '보지 않은 모습은 적혀 있지 않으니, 마지막 손질은 선생님 몫입니다.');
}

/* 받침이 있으면 «을/과», 없으면 «를/와». 따옴표와 문장부호는 떼고 본다. */
function 받침(s) {
  s = String(s).replace(/[^가-힣a-zA-Z0-9]+$/, '');
  if (!s) return false;
  var c = s.charCodeAt(s.length - 1);
  if (c >= 0xAC00 && c <= 0xD7A3) return (c - 0xAC00) % 28 !== 0;
  return true;
}
function 을를(s) { return 받침(s) ? '을' : '를'; }

/** 한 학생의 세특 초안 문장을 짠다.
    세특은 과목당 500자다. 넘치면 «덜 중요한 것부터» 덜어 낸다.
    pri 가 클수록 먼저 덜어 낸다. 점수에서 나온 네 문장과
    선생님이 직접 적은 것은 마지막까지 남긴다. */
function 세특문장(row, sub, strong, grow, memo, watch) {
  var topic = String(row[2] || '').trim();
  var side = String(row[3] || '').trim();
  var sc = [row[5], row[6], row[7], row[8]];

  // 실제로 «숫자»가 들어 있는 칸만 채점된 것으로 본다.
  // 공백 한 칸이 잘못 들어가 있어도 초안이 만들어지지 않게 한다.
  var any = false;
  for (var i = 0; i < 4; i++) {
    var x = String(sc[i]).trim();
    if (x !== '' && !isNaN(Number(x))) any = true;
  }
  if (!any) return '';

  var part = [];
  function add(pri, text) { if (text) part.push({ p: pri, t: text }); }

  var t = topic || '인공지능 윤리 쟁점';
  add(0, '‘' + t + '’' + 을를(t) + ' 논제로 한 인공지능 윤리 토론에 ' +
         (side ? side + ' 측으로 ' : '') + '참여함');

  // 무엇을 했는지 — 점수 단계에서 뽑는다
  for (var e = 0; e < 4; e++) add(1, 등급문장(e, sc[e]));

  // 선생님이 직접 본 것 — 채점표의 「관찰 메모」와 세특도우미의 「선생님 한 줄」.
  // 두 곳에 같은 말을 적어 두었으면 한 번만 넣는다.
  // 「선생님 한 줄」은 세특을 쓰려고 일부러 적은 것이므로 끝까지 남기고,
  // 자리가 모자라면 「관찰 메모」부터 덜어 낸다 (pri 1.5 > 1).
  var 본것 = {};
  [[watch, 1.5], [memo, 1]].forEach(function (m) {
    var x = String(m[0] === null || m[0] === undefined ? '' : m[0]).trim().replace(/[.。]\s*$/, '');
    if (x && !본것[x]) { 본것[x] = 1; add(m[1], x); }
  });

  // 학생이 낸 글에서 구체적인 것
  if (sub) {
    if (sub.act && Number(sc[3]) >= 15) {
      var a = 줄임(sub.act, 45);
      add(2, '실천 방안으로 ‘' + a + '’' + 을를(a) + ' 제시함');
    }
    if (sub.views && Number(sc[0]) >= 20) {
      var vs = String(sub.views).split('·').map(function (x) { return x.trim(); })
                 .filter(function (x) { return x; });
      if (vs.length === 1) {
        add(4, '쟁점을 「' + vs[0] + '」 관점에서 살펴봄');
      } else if (vs.length > 1) {
        add(4, '쟁점을 ' + vs.map(function (x) { return '「' + x + '」'; }).join(' · ') +
               ' ' + vs.length + '가지 관점으로 나누어 살펴봄');
      }
    }
  }

  if (strong && SE_STRONG[strong]) add(2, SE_STRONG[strong]);
  if (grow && SE_GROW[grow]) add(3, SE_GROW[grow]);

  function 이어붙이기(list) {
    return list.map(function (x) { return x.t; }).join('. ') + '.';
  }
  var txt = 이어붙이기(part);
  // 500자를 넘으면 pri 가 큰 것부터 하나씩 뺀다 (같은 pri 면 뒤엣것부터)
  while (txt.length > 500) {
    var worst = -1, wp = -1;
    for (var q = 0; q < part.length; q++) {
      if (part[q].p > 0 && part[q].p >= wp) { wp = part[q].p; worst = q; }
    }
    if (worst < 0) break;
    part.splice(worst, 1);
    txt = 이어붙이기(part);
  }
  return txt;
}

function 줄임(s, n) {
  s = String(s).replace(/\s+/g, ' ').trim();
  return s.length <= n ? s : s.slice(0, n - 1) + '…';
}

/** 분반별·항목별 평균과 성취도 분포를 요약해 보여 준다. */
function 토론채점요약() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(GRADE_SHEET);
  if (!sh || sh.getLastRow() < 3) {
    SpreadsheetApp.getUi().alert('채점표가 아직 없습니다. 먼저 «① 토론 채점표 만들기»를 실행하세요.');
    return;
  }
  var v = sh.getRange(3, 1, sh.getLastRow() - 2, 11).getValues();
  var byCls = {}, dist = { A: 0, B: 0, C: 0, D: 0, E: 0 }, done = 0;
  var sum = [0, 0, 0, 0], cnt = [0, 0, 0, 0];
  for (var i = 0; i < v.length; i++) {
    var cls = String(v[i][0] || '(분반없음)');
    if (!byCls[cls]) byCls[cls] = { n: 0, done: 0, total: 0 };
    byCls[cls].n++;
    for (var k = 0; k < 4; k++) {
      var x = v[i][5 + k];
      if (typeof x === 'number' && x > 0) { sum[k] += x; cnt[k]++; }
    }
    var tot = v[i][9], gr = String(v[i][10] || '');
    if (typeof tot === 'number' && tot > 0) {
      done++; byCls[cls].done++; byCls[cls].total += tot;
      if (dist[gr] !== undefined) dist[gr]++;
    }
  }
  var msg = '전체 ' + v.length + '명 중 ' + done + '명 채점 완료\n\n';
  msg += '［항목별 평균］\n';
  for (var k2 = 0; k2 < 4; k2++) {
    msg += '  ' + (k2 + 1) + '. ' + GRADE_COLS[k2] + ' : ' +
           (cnt[k2] ? (sum[k2] / cnt[k2]).toFixed(1) : '-') + ' / 25\n';
  }
  msg += '\n［성취도 분포］\n  ';
  msg += ['A', 'B', 'C', 'D', 'E'].map(function (x) { return x + ' ' + dist[x] + '명'; }).join(' · ');
  msg += '\n\n［분반별 평균］\n';
  for (var c2 in byCls) {
    msg += '  ' + c2 + ' : ' + (byCls[c2].done ? (byCls[c2].total / byCls[c2].done).toFixed(1) : '-') +
           '점 (' + byCls[c2].done + '/' + byCls[c2].n + '명)\n';
  }
  SpreadsheetApp.getUi().alert(msg);
}


function out(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/** 연동이 잘 되는지 시험할 때 이 함수를 한 번 실행해 보세요. 탭마다 한 줄씩 들어갑니다. */
function 테스트한줄넣기() {
  var note = '(연결 확인용 한 줄입니다. 확인 후 지우세요.)';
  ['turing', 'design', 'puzzle', 'europe', 'town', 'school', 'infer'].forEach(function (t) {
    doPost({ postData: { contents: JSON.stringify({
      key: SUBMIT_KEY, type: t, cls: '점검', group: '연결 확인용',
      members: note, why: note, f1: note, ans: note, keys: note, bfsPath: note,
      m0b: note, rule: note
    }) } });
  });
}
