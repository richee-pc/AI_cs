/**
 * 인공지능 기초 활동지 수집기  v4
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
 *
 * 쓰는 법은 같은 폴더의 «제출연동_안내.md» 를 보세요.
 */

// 학생 페이지의 SUBMIT_KEY 와 반드시 같아야 합니다.
var SUBMIT_KEY = 'chosun-ai-2026';

// 학생 페이지가 이 번호를 보고 «코드가 최신인지» 확인합니다. 건드리지 마세요.
var VER = 4;

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
           '내가 만든 규칙', '새로 알 수 있는 사실', '이 규칙이 틀릴 수 있는 경우'],
    width: [140, 70, 130, 110, 380, 340, 340],
    row: function (d) {
      return [new Date(), d.cls || '', d.group || '', d.score || '',
              d.rule || '', d.fresh || '', d.weak || ''];
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

// 학생 페이지가 코드 버전을 확인할 때, 그리고 선생님이 주소를 눌러 볼 때
function doGet() {
  return out({ ok: true, ver: VER, msg: '수집기가 켜져 있습니다. (v' + VER + ')' });
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
  }
  return sh;
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
