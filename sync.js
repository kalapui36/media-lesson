/* =========================================================================
   sync.js — 기기 사이로 오가는 것들

   하는 일
     · 선착순 선점  : 먼저 누른 모둠만 그 카드 뉴스를 가져간다
     · 제출         : 모둠의 판단을 교사 대시보드로 보낸다
     · 초기화       : 교사가 전체 기록을 지운다

   파이어베이스에 연결되지 않으면 스스로 물러나서, 이 기기 안에서만 동작한다.
   그래도 수업은 그대로 굴러가고 선점은 한 기기 안에서만 적용된다.
   Sync.online 으로 지금 어느 상태인지 알 수 있다.
   ========================================================================= */
var Sync = (function () {
  var db = null, online = false, ready = false;
  var pickCbs = [], subCbs = [], stateCbs = [];
  var lastPicks = {}, lastSubs = {};

  function base() { return "lesson/" + (typeof FB_ROOM !== "undefined" ? FB_ROOM : "room"); }
  function fire(list, arg) { for (var i = 0; i < list.length; i++) { try { list[i](arg); } catch (e) {} } }
  function setOnline(v) { if (online !== v) { online = v; fire(stateCbs, v); } }

  function init() {
    if (ready) return;
    ready = true;
    if (typeof FB_ON === "undefined" || !FB_ON) { setOnline(false); return; }
    if (typeof firebase === "undefined" || !firebase.initializeApp) { setOnline(false); return; }
    try {
      if (!firebase.apps || !firebase.apps.length) firebase.initializeApp(FB_CONFIG);
      db = firebase.database();
      db.ref(".info/connected").on("value", function (s) { setOnline(!!s.val()); });
      db.ref(base() + "/picks").on("value", function (s) {
        lastPicks = s.val() || {}; fire(pickCbs, lastPicks);
      }, function () { setOnline(false); });
      db.ref(base() + "/submissions").on("value", function (s) {
        lastSubs = s.val() || {}; fire(subCbs, lastSubs);
      }, function () { setOnline(false); });
    } catch (e) { db = null; setOnline(false); }
  }

  return {
    init: init,
    get online() { return online; },

    /* 연결 상태가 바뀔 때 알려 준다 */
    onState: function (cb) { stateCbs.push(cb); cb(online); },

    /* 선점 현황이 바뀔 때 알려 준다.  {newsId: 모둠번호} */
    onPicks: function (cb) { pickCbs.push(cb); cb(lastPicks); },
    picks: function () { return lastPicks; },

    /* 선착순으로 집는다.  성공하면 cb(true), 이미 다른 모둠이 집었으면 cb(false, 모둠번호) */
    claim: function (newsId, group, prevId, cb) {
      if (!db || !online) { cb(true); return; }
      var ref = db.ref(base() + "/picks/" + newsId);
      ref.transaction(function (cur) {
        if (cur === null || cur === group) return group;
        return;                       // 그대로 두고 실패 처리
      }, function (err, committed, snap) {
        if (err) { cb(true); return; } // 통신이 막히면 막지 않는다
        if (committed) {
          if (prevId && prevId !== newsId) {
            db.ref(base() + "/picks/" + prevId).transaction(function (c) {
              return c === group ? null : c;
            });
          }
          cb(true);
        } else {
          cb(false, snap ? snap.val() : null);
        }
      });
    },

    /* 모둠의 판단을 제출한다 */
    submit: function (group, payload, cb) {
      if (!db || !online) { if (cb) cb(false); return; }
      payload.ts = Date.now();
      db.ref(base() + "/submissions/" + group).set(payload, function (err) {
        if (cb) cb(!err);
      });
    },

    /* 제출 현황이 바뀔 때 알려 준다.  {모둠번호: 판단내용} */
    onSubmissions: function (cb) { subCbs.push(cb); cb(lastSubs); },
    submissions: function () { return lastSubs; },

    /* 교사용 — 한 모둠 또는 전체 지우기 */
    clearGroup: function (group, cb) {
      if (!db) { if (cb) cb(false); return; }
      var picks = lastPicks, jobs = [];
      for (var id in picks) if (picks[id] === group) jobs.push(db.ref(base() + "/picks/" + id).remove());
      jobs.push(db.ref(base() + "/submissions/" + group).remove());
      Promise.all(jobs).then(function () { if (cb) cb(true); }, function () { if (cb) cb(false); });
    },
    clearAll: function (cb) {
      if (!db) { if (cb) cb(false); return; }
      db.ref(base()).remove(function (err) { if (cb) cb(!err); });
    }
  };
})();
