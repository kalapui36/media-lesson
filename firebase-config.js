/* =========================================================================
   firebase-config.js — 파이어베이스 설정

   이 값들은 공개되어도 되는 정보입니다. 접근 제한은 데이터베이스 규칙이 합니다.
   데이터베이스 규칙에 만료 시각을 넣어 두었습니다. 그 시각이 지나면 자동으로 잠깁니다.
   날짜를 바꾸려면 파이어베이스 콘솔 → Realtime Database → 규칙에서
   숫자(밀리초)를 고치고 게시하면 됩니다.

   FB_ON 을 false 로 두면 파이어베이스를 쓰지 않고 기기 안에서만 동작합니다.
   당일 학교망이 막혔을 때 여기만 false 로 바꾸면 수업은 그대로 굴러갑니다.
   ========================================================================= */
var FB_ON = true;

var FB_CONFIG = {
  apiKey: "AIzaSyD2Lm_r3SPHrvqWvXEdKZf5Y1H7yB9Xggg",
  authDomain: "media-lesson.firebaseapp.com",
  databaseURL: "https://media-lesson-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "media-lesson",
  storageBucket: "media-lesson.firebasestorage.app",
  messagingSenderId: "14143928832",
  appId: "1:14143928832:web:5a17cbbceba534dda876e5"
};

/* 방 이름 — 학급마다 따로 쓰는 칸.
   주소에 ?room=6-1 처럼 붙이면 그 방을 쓰고, 없으면 아래 기본값을 쓴다.
   방이 다르면 모둠 확정·제출·설정·블로그 사진이 모두 따로 저장된다. */
var FB_ROOM_DEFAULT = "6-3";
var FB_ROOM = (function () {
  try {
    var r = new URLSearchParams(location.search).get("room");
    if (r) {
      r = r.trim().replace(/[^0-9A-Za-z가-힣._-]/g, "");
      if (r) return r;
    }
  } catch (e) {}
  return FB_ROOM_DEFAULT;
})();
