/**
 * 인공지능 기초 활동지 수집기  v9
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
var VER = 9;

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
   토론 채점표
   「토론입론서」 탭에 들어온 제출물에서 명단을 뽑아 채점표를 만든다.
   평가 요소 네 가지는 평가 운영 계획의 「가. 인공지능 윤리 토론」과 같다.
   시트를 열면 상단에 «수행평가» 메뉴가 생긴다.
   ══════════════════════════════════════════════════════════ */

var GRADE_SHEET = '토론채점';
var GRADE_COLS = ['논제 분석과 입론서', '교차 질의와 반론·반박',
                  '최종 정리 발언', '윤리 분석과 공존 방안'];
var GRADE_LEVELS = [25, 20, 15, 10, 5, 0];   // 0 = 미실시
var CUT = [[90, 'A'], [80, 'B'], [70, 'C'], [50, 'D']];   // 그 아래는 E

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('수행평가')
    .addItem('토론 채점표 만들기 / 명단 새로고침', '토론채점표만들기')
    .addSeparator()
    .addItem('채점 결과 요약 보기', '토론채점요약')
    .addToUi();
}

/** 제출된 입론서에서 명단을 뽑아 채점표를 만든다. 이미 매긴 점수는 지우지 않는다. */
function 토론채점표만들기() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var src = ss.getSheetByName(SHEETS.debate.name);
  if (!src || src.getLastRow() < 2) {
    SpreadsheetApp.getUi().alert('아직 제출된 입론서가 없습니다.\n학생이 활동 ⑧에서 제출하면 명단이 채워집니다.');
    return;
  }

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
    list[seen[key]][4] = String(rows[i][5] || '');   // 채운 칸 (26칸 중 몇 칸)
  }
  list.sort(function (a, b) {
    return a[0] === b[0] ? (a[1] < b[1] ? -1 : 1) : (a[0] < b[0] ? -1 : 1);
  });

  var sh = ss.getSheetByName(GRADE_SHEET);
  var old = {};
  if (sh) {
    // 이미 매긴 점수와 메모를 기억해 둔다
    if (sh.getLastRow() > 2) {
      var prev = sh.getRange(3, 1, sh.getLastRow() - 2, 12).getValues();
      for (var p = 0; p < prev.length; p++) {
        var k = String(prev[p][0]) + '|' + String(prev[p][1]);
        old[k] = [prev[p][5], prev[p][6], prev[p][7], prev[p][8], prev[p][11]];
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
               '합계', '성취도', '메모'];
  var head2 = ['', '', '', '', '26칸 중',
               '25점', '25점', '25점', '25점', '100점', '', '피드백·특기사항'];
  sh.getRange(1, 1, 1, head1.length).setValues([head1])
    .setFontWeight('bold').setBackground('#DCEBFF').setFontColor('#1B49B8')
    .setVerticalAlignment('middle').setWrap(true);
  sh.getRange(2, 1, 1, head2.length).setValues([head2])
    .setFontSize(9).setFontColor('#5E708D').setBackground('#F2F8FF');
  sh.setFrozenRows(2);
  sh.setFrozenColumns(2);

  if (list.length) {
    sh.getRange(3, 1, list.length, 5).setValues(list);
    for (var r = 0; r < list.length; r++) {
      var row = 3 + r;
      var k2 = list[r][0] + '|' + list[r][1];
      if (old[k2]) {
        sh.getRange(row, 6, 1, 4).setValues([[old[k2][0], old[k2][1], old[k2][2], old[k2][3]]]);
        sh.getRange(row, 12).setValue(old[k2][4]);
      }
      // 합계 · 성취도
      sh.getRange(row, 10).setFormula('=IF(COUNT(F' + row + ':I' + row + ')=0,"",SUM(F' + row + ':I' + row + '))');
      sh.getRange(row, 11).setFormula(
        '=IF(J' + row + '="","",IF(J' + row + '>=90,"A",IF(J' + row + '>=80,"B",' +
        'IF(J' + row + '>=70,"C",IF(J' + row + '>=50,"D","E")))))');
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

  var w = [70, 130, 290, 60, 70, 110, 110, 110, 110, 70, 70, 320];
  for (var i2 = 0; i2 < w.length; i2++) sh.setColumnWidth(i2 + 1, w[i2]);
  sh.getRange(1, 1, 2, head1.length).setHorizontalAlignment('center');

  SpreadsheetApp.getUi().alert(
    '채점표를 만들었습니다.\n\n' +
    '학생 ' + list.length + '명\n\n' +
    '점수 칸(①~④)은 25 / 20 / 15 / 10 / 5 중에서 고르면 되고,\n' +
    '합계와 성취도는 자동으로 계산됩니다.\n' +
    '다시 실행해도 이미 매긴 점수는 그대로 둡니다.');
}

/** 분반별·항목별 평균과 성취도 분포를 요약해 보여 준다. */
function 토론채점요약() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(GRADE_SHEET);
  if (!sh || sh.getLastRow() < 3) {
    SpreadsheetApp.getUi().alert('채점표가 아직 없습니다. 먼저 «토론 채점표 만들기»를 실행하세요.');
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
