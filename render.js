/* =========================================================================
   render.js — 학생 화면과 교사 대시보드가 함께 쓰는 그리기 코드

     buildDeck(deckEl, news, marks, onUnitClick)  카드 뉴스 네 장을 그린다
     drawSheet(canvas, data)                      판단표를 캔버스에 그린다

   onUnitClick 이 없으면 읽기 전용으로 그린다. 칠한 색은 그대로 나온다.
   ========================================================================= */

var KEYS  = ['claim', 'r1', 'e1', 'r2', 'e2'];
var LABEL = { claim: '주장', r1: '이유 ①', e1: '근거 ①', r2: '이유 ②', e2: '근거 ②' };
var KIND  = { claim: 'claim', r1: 'reason', e1: 'evidence', r2: 'reason', e2: 'evidence' };
var CRIT  = {
  claim: ['주장이 가치 있고 중요한가요?'],
  reason: ['이유가 주장과 관련 있나요?', '많은 사람이 받아들일 만한 타당한 이유인가요?'],
  evidence: ['근거가 이유와 관련 있나요?', '객관적인 사실이나 정보를 활용하고 있나요?']
};
var GRADES = [['◎', '매우 그렇다'], ['○', '그렇다'], ['△', '보통이다']];
var FRAME  = '나는 ○○이라고 판단했다. 왜냐하면 ~ 때문이다.';
var ASK    = '왜 그렇게 판단했는지 써 보세요.';
var SKIN   = 'a';
/* 판단표 테마 — 색만 바뀌는 것이 아니라 생김새가 달라진다 */
var TPL = [
  { n:'파스텔', tip:'연한 색과 둥근 모서리',
    paper:'#FFFDFB', head:'#F6DCE6', headFg:'#6B3B4E', accent:'#C9738F',
    rowAlt:'#FBF5F8', line:'#EEDCE4', chip:true, emoji:false, round:true },
  { n:'또렷', tip:'진한 색과 굵은 선',
    paper:'#FFFFFF', head:'#1E2A38', headFg:'#FFFFFF', accent:'#1E2A38',
    rowAlt:'#F2F4F7', line:'#C8D0D8', chip:false, emoji:false, round:false, bold:true },
  { n:'공책', tip:'줄 공책에 적은 느낌',
    paper:'#FDFBF2', head:'#FDFBF2', headFg:'#3B4A3F', accent:'#4E7A5B',
    rowAlt:'#FDFBF2', line:'#D9D3BE', chip:false, emoji:false, round:false, note:true },
  { n:'스티커', tip:'항목마다 그림 딱지',
    paper:'#FFFFFF', head:'#2F7D4F', headFg:'#FFFFFF', accent:'#2F7D4F',
    rowAlt:'#F1F8F3', line:'#D6E7DC', chip:true, emoji:true, round:true }
];
var EMOJI = { claim:'📢', r1:'💬', e1:'🔎', r2:'💬', e2:'🔎' };
var MARKC = { claim: '#FFDE6B', reason: '#A7DEB4', evidence: '#9FC9F3' };

function el(t, c, x) { var e = document.createElement(t); if (c) e.className = c; if (x != null) e.textContent = x; return e; }
function newsById(id) { for (var i = 0; i < NEWS.length; i++) if (NEWS[i].id === id) return NEWS[i]; return null; }
function textOf(n, k) { return (k === 'e1' || k === 'e2') ? n[k].text : n[k]; }

function tint(hex, a) {
  var h = hex.replace('#', '');
  var r = parseInt(h.substr(0, 2), 16), g = parseInt(h.substr(2, 2), 16), b = parseInt(h.substr(4, 2), 16);
  return 'rgb(' + Math.round(255 - (255 - r) * a) + ',' + Math.round(255 - (255 - g) * a) + ',' + Math.round(255 - (255 - b) * a) + ')';
}
function paintTone(node, n) {
  var t = n.tone, t2 = n.tone2 || n.tone;
  node.style.setProperty('--tone', t);
  node.style.setProperty('--tone-soft', tint(t, 0.13));
  node.style.setProperty('--tone2', t2);
  node.style.setProperty('--tone2-soft', tint(t2, 0.16));
}
function motifBox(n) {
  var art = (typeof MOTIFS !== 'undefined') ? MOTIFS[n.motif] : null;
  if (!art) return null;
  var d = el('div', 'motif');
  d.innerHTML = '<svg viewBox="0 0 100 100" aria-hidden="true">' + art + '</svg>';
  return d;
}
function srcLine(ev) {
  var d = el('div', 'srcline');
  if (!ev.href) return d;
  var a = el('a', null, '출처: ' + ev.label);
  a.href = ev.href; a.target = '_blank'; a.rel = 'noopener';
  d.appendChild(a);
  return d;
}

/* ---------- 카드 뉴스 네 장 ---------- */
function buildDeck(deck, n, marks, onUnitClick) {
  marks = marks || {};
  deck.innerHTML = '';

  function unit(k, txt) {
    function cls() { return 'unit' + (marks[k] ? ' mk-' + marks[k] : ''); }
    if (!onUnitClick) return el('div', cls(), txt);
    var b = el('button', cls(), txt);
    b.onclick = function () { onUnitClick(k); b.className = cls(); };
    return b;
  }
  function card(no, cls, build) {
    var c = el('div', 'cn' + (cls ? ' ' + cls : ''));
    paintTone(c, n);
    if (cls !== 'end') { var nb = el('div', 'no'); nb.setAttribute('data-n', no); c.appendChild(nb); }
    var m = motifBox(n); if (m) c.appendChild(m);
    var i = el('div', 'in');
    if (cls === 'cover') i.appendChild(el('div', 'cvlabel', n.topic || '카드 뉴스'));
    build(i);
    c.appendChild(i);
    if (cls === 'end') c.appendChild(el('div', 'sign', '개봉 카드 뉴스'));
    return c;
  }

  deck.appendChild(card(1, 'cover', function (b) { b.appendChild(unit('claim', n.claim)); }));
  [['r1', 'e1'], ['r2', 'e2']].forEach(function (pr, idx) {
    deck.appendChild(card(idx + 2, 'body', function (b) {
      var R = el('div', 'blk-reason'); R.appendChild(unit(pr[0], n[pr[0]])); b.appendChild(R);
      var E = el('div', 'blk-evid'); E.appendChild(unit(pr[1], n[pr[1]].text));
      E.appendChild(srcLine(n[pr[1]])); b.appendChild(E);
    }));
  });
  deck.appendChild(card(4, 'end', function (b) { b.appendChild(unit('closing', n.closing)); }));
}

/* ---------- 판단표 ---------- */
var TAIL = '.,!?」』)·…';
function wrapText(ctx, text, maxW) {
  var lines = [], line = '';
  for (var i = 0; i < text.length; i++) {
    var ch = text[i];
    if (ch === '\n') { lines.push(line); line = ''; continue; }
    if (ctx.measureText(line + ch).width > maxW && line) {
      if (TAIL.indexOf(ch) >= 0) { line += ch; continue; }
      lines.push(line); line = ch;
    } else line += ch;
  }
  if (line) lines.push(line);
  return lines;
}

function rrect(ctx,x,y,w,h,r){
  if(!r){ctx.rect(x,y,w,h);return;}
  ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);
  ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();
}

function drawSheet(cv, data) {
  var n = newsById(data.newsId); if (!n) return;
  var t = TPL[data.tpl || 0] || TPL[0];
  var W = 880, M = 34, S = 2, F = "'Pretendard','Noto Sans KR','Malgun Gothic',sans-serif";
  var ctx = cv.getContext('2d');
  var IN = W - 2 * M;
  var cw = [104, 300, 78, IN - 104 - 300 - 78];
  var cx = [M, M + cw[0], M + cw[0] + cw[1], M + cw[0] + cw[1] + cw[2]];
  var marks = data.marks || {}, judge = data.judge || {};
  var LH = 30, FS = 18;

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.font = FS + 'px ' + F;
  var rows = [];
  KEYS.forEach(function (k) {
    var a = wrapText(ctx, textOf(n, k), cw[1] - 26);
    var j = judge[k] || {};
    var b = wrapText(ctx, j.r || '', cw[3] - 26);
    rows.push({ k:k, a:a, b:b, g:j.g || '', mk:marks[k] || '',
                h: Math.max(Math.max(a.length, b.length) * LH + 30, 66) });
  });
  ctx.font = '19px ' + F;
  var finalLines = wrapText(ctx, data.final || '', IN - 48);

  var head = 124, thead = 46, foot = 58;
  var tableH = rows.reduce(function (s, r) { return s + r.h; }, 0);
  var finalH = finalLines.length * LH + 66;
  var H = head + 26 + thead + tableH + 26 + finalH + foot;

  cv.width = W * S; cv.height = H * S;
  cv.style.aspectRatio = W + ' / ' + H;
  ctx.setTransform(S, 0, 0, S, 0, 0);
  ctx.textBaseline = 'top';

  /* 바탕 */
  ctx.fillStyle = t.paper; ctx.fillRect(0, 0, W, H);

  /* 머리 */
  ctx.fillStyle = t.head; ctx.fillRect(0, 0, W, head);
  if (t.note) { ctx.fillStyle = t.accent; ctx.fillRect(0, head - 5, W, 5); }
  ctx.fillStyle = t.note ? t.accent : t.headFg;
  ctx.font = '800 31px ' + F;
  ctx.fillText('카드 뉴스 타당성 판단표', M, 26);
  ctx.font = '700 21px ' + F;
  var gt = data.group + '모둠';
  ctx.fillText(gt, W - M - ctx.measureText(gt).width, 28);
  ctx.fillStyle = t.note ? '#5D6A60' : t.headFg;
  ctx.globalAlpha = t.note ? 1 : .92;
  ctx.font = '500 20px ' + F;
  ctx.fillText(wrapText(ctx, n.claim, IN - 220)[0], M, 72);
  if (data.members) {
    ctx.font = '400 15px ' + F;
    wrapText(ctx, data.members, 300).slice(0, 2).forEach(function (L, i) {
      ctx.fillText(L, W - M - ctx.measureText(L).width, 58 + i * 21);
    });
  }
  ctx.globalAlpha = 1;

  /* 표 머리 */
  var y = head + 26;
  ctx.beginPath(); ctx.fillStyle = t.rowAlt;
  rrect(ctx, M, y, IN, thead, t.round ? 12 : 0); ctx.fill();
  ctx.fillStyle = t.accent; ctx.font = '700 17px ' + F;
  ['구분', '카드 뉴스의 내용', '판단', '그렇게 판단한 까닭'].forEach(function (h, i) {
    ctx.fillText(h, cx[i] + 13, y + 13);
  });
  y += thead;

  /* 본문 */
  rows.forEach(function (r, idx) {
    if (!t.note && idx % 2 === 1) { ctx.fillStyle = t.rowAlt; ctx.fillRect(M, y, IN, r.h); }
    ctx.strokeStyle = t.line; ctx.lineWidth = t.bold ? 1.6 : 1;
    if (t.note) ctx.setLineDash([5, 5]);
    ctx.beginPath(); ctx.moveTo(M, y + .5); ctx.lineTo(W - M, y + .5); ctx.stroke();
    ctx.setLineDash([]);

    /* 구분 — 칠한 색과 이름 */
    var lx = cx[0] + 13, ly = y + 19;
    if (t.emoji) {
      ctx.font = '19px ' + F;
      ctx.fillText(EMOJI[r.k] || '', lx, ly - 1);
      lx += 26;
    } else if (r.mk) {
      ctx.fillStyle = MARKC[r.mk];
      ctx.beginPath(); rrect(ctx, lx, ly + 2, 12, 12, 3); ctx.fill();
      lx += 19;
    } else {
      ctx.strokeStyle = t.line;
      ctx.beginPath(); rrect(ctx, lx + .5, ly + 2.5, 11, 11, 3); ctx.stroke();
      lx += 19;
    }
    if (t.chip) {
      ctx.font = '700 15px ' + F;
      var tw = ctx.measureText(LABEL[r.k]).width;
      ctx.fillStyle = r.mk ? MARKC[r.mk] : t.rowAlt;
      ctx.beginPath(); rrect(ctx, lx - 5, ly - 3, tw + 14, 25, 12); ctx.fill();
      ctx.fillStyle = '#2b3642';
      ctx.fillText(LABEL[r.k], lx + 2, ly + 2);
    } else {
      ctx.fillStyle = '#1B2430'; ctx.font = '700 17px ' + F;
      ctx.fillText(LABEL[r.k], lx, ly);
    }

    ctx.font = FS + 'px ' + F; ctx.fillStyle = '#2b3642';
    r.a.forEach(function (L, i) { ctx.fillText(L, cx[1] + 13, y + 18 + i * LH); });
    ctx.font = '800 30px ' + F; ctx.fillStyle = t.accent;
    ctx.fillText(r.g, cx[2] + 22, y + 13);
    ctx.font = FS + 'px ' + F; ctx.fillStyle = '#2b3642';
    r.b.forEach(function (L, i) { ctx.fillText(L, cx[3] + 13, y + 18 + i * LH); });
    y += r.h;
  });
  ctx.strokeStyle = t.line; ctx.lineWidth = t.bold ? 1.6 : 1;
  ctx.beginPath(); ctx.moveTo(M, y + .5); ctx.lineTo(W - M, y + .5); ctx.stroke();

  /* 최종 판단 */
  y += 26;
  ctx.fillStyle = t.rowAlt;
  ctx.beginPath(); rrect(ctx, M, y, IN, finalH, t.round ? 14 : 0); ctx.fill();
  ctx.fillStyle = t.accent; ctx.fillRect(M, y, t.round ? 0 : 6, finalH);
  ctx.fillStyle = t.accent; ctx.font = '700 17px ' + F;
  ctx.fillText((t.emoji ? '⭐ ' : '') + '모둠의 최종 판단', M + 22, y + 18);
  ctx.fillStyle = '#1B2430'; ctx.font = '19px ' + F;
  finalLines.forEach(function (L, i) { ctx.fillText(L, M + 22, y + 50 + i * LH); });
  y += finalH;

  /* 꼬리 */
  ctx.fillStyle = '#9AA7B2'; ctx.font = '14px ' + F;
  ctx.fillText('서울개봉초등학교 6학년 3반 · 국어 3. 보거나 듣고 판단해요', M, y + 20);
}
