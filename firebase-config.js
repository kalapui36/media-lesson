/* =========================================================================
   firebase-config.js — 파이어베이스 설정

   이 값들은 공개되어도 되는 정보입니다. 접근 제한은 데이터베이스 규칙이 합니다.
   규칙은 2026년 9월 23일 오전 9시가 지나면 자동으로 잠기도록 해 두었습니다.
   날짜를 미루려면 파이어베이스 콘솔 → Realtime Database → 규칙에서
   숫자(밀리초)를 바꾸고 게시하면 됩니다.

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

/* 한 수업에 하나씩 쓰는 방 이름.
   다른 학급에서 같은 프로그램을 쓰려면 이 이름만 바꾸면 기록이 섞이지 않는다. */
var FB_ROOM = "6-3";
