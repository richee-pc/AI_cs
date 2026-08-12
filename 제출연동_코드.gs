/**
 * 튜링 테스트 활동지 수집기
 * 조선대학교부속고등학교 · 2026학년도 2학기 인공지능 기초
 *
 * 쓰는 법은 같은 폴더의 «제출연동_안내.md» 를 보세요.
 * 이 파일은 선생님의 구글 스프레드시트에 붙여 넣는 코드입니다.
 */

// 학생 페이지의 SUBMIT_KEY 와 반드시 같아야 합니다.
var SUBMIT_KEY = 'chosun-ai-2026';

// 기록이 쌓일 시트 이름 (없으면 자동으로 만듭니다)
var SHEET_NAME = '튜링테스트';

var HEAD = ['제출 시각', '분반', '모둠', '모둠원',
            '학생 A', '학생 B', '전달자', '관객',
            '컴퓨터 역할', '라운드 수', 'A 득표', 'B 득표', '정답률(%)',
            '모둠 예측', '맞힘 여부', '판단 이유',
            '토의 ➊ 맞힌·못 맞힌 이유', '토의 ➋ 지능의 의미',
            '자기평가 1', '자기평가 2', '질문과 답변 전체'];

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

    var sh = sheet();
    sh.appendRow([
      new Date(), d.cls || '', d.group || '', d.members || '',
      d.A || '', d.B || '', d.deliver || '', d.crowd || '',
      d.cpu || '', d.rounds || 0, d.voteA || 0, d.voteB || 0, d.rate === '' ? '' : d.rate,
      d.guess || '', d.correct || '', d.why || '',
      d.d1 || '', d.d2 || '',
      d.rub1 || '', d.rub2 || '', d.log || ''
    ]);
    return out({ ok: true });
  } catch (err) {
    return out({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// 브라우저에서 웹앱 주소를 열었을 때 살아 있는지 확인용
function doGet() {
  return out({ ok: true, msg: '수집기가 켜져 있습니다.' });
}

function sheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(HEAD);
    sh.getRange(1, 1, 1, HEAD.length)
      .setFontWeight('bold')
      .setBackground('#DCEBFF')
      .setFontColor('#1B49B8');
    sh.setFrozenRows(1);
    sh.getRange('A:A').setNumberFormat('yyyy-mm-dd hh:mm');
    // 보기 좋은 열 너비
    var w = [140, 70, 110, 200, 80, 80, 80, 140, 150, 80, 70, 70, 80,
             90, 80, 260, 260, 260, 80, 80, 420];
    for (var i = 0; i < w.length; i++) sh.setColumnWidth(i + 1, w[i]);
  }
  return sh;
}

function out(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/** 연동이 잘 되는지 시험할 때 이 함수를 한 번 실행해 보세요. */
function 테스트한줄넣기() {
  doPost({ postData: { contents: JSON.stringify({
    key: SUBMIT_KEY, cls: '인기A', group: '연결 확인용',
    members: '테스트', A: '테스트', B: '테스트', deliver: '테스트', crowd: '',
    cpu: '학생 A · 테스트', rounds: 0, voteA: 0, voteB: 0, rate: '',
    guess: '', correct: '', why: '', d1: '', d2: '', rub1: '', rub2: '',
    log: '(연결 확인용 한 줄입니다. 확인 후 지우세요.)'
  }) } });
}
