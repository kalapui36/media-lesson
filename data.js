/* build.py 가 만든 파일입니다. 내용을 고치려면 build.py 를 고치고 다시 실행하세요. */
var NEWS = [
 {
  "id": 1,
  "kind": "가짜 전문가 블로그",
  "tone": "#E4572E",
  "tone2": "#F6A03A",
  "topic": "운동과 건강",
  "motif": "run",
  "cover": "bottom",
  "pattern": "diag",
  "claim": "학교에서 운동할 시간을 늘립시다",
  "r1": "운동을 하면 공부에 집중이 더 잘되기 때문입니다.",
  "e1": {
   "text": "운동을 꾸준히 한 학생은 그렇지 않은 학생보다 수업에 집중하는 시간이 두 배 가까이 길어졌습니다.",
   "label": "○○의 하루하루(2025), 「운동하고 오면 공부가 잘되는 것 같아요」",
   "href": "sources/blog-health.html",
   "real": false
  },
  "r2": "우리나라 청소년의 운동 시간이 부족하기 때문입니다.",
  "e2": {
   "text": "하루 60분 이상 몸을 움직이는 청소년은 남학생 네 명 중 한 명, 여학생 열 명 중 한 명 정도에 그쳤습니다.",
   "label": "질병관리청, 「청소년건강행태조사」",
   "href": "https://www.kdca.go.kr/yhs/",
   "real": true
  },
  "closing": "운동할 시간이 늘어나면 몸도 마음도 더 건강해질 것입니다."
 },
 {
  "id": 2,
  "kind": "가짜 전문가 블로그",
  "tone": "#2E8B57",
  "tone2": "#8CC63F",
  "topic": "급식과 음식물",
  "motif": "tray",
  "cover": "panel",
  "pattern": "dots",
  "claim": "음식을 남기지 맙시다",
  "r1": "음식물 쓰레기가 환경에 부담을 주기 때문입니다.",
  "e1": {
   "text": "우리나라에서 하루에 버려지는 음식물 쓰레기는 1만 4천 톤에 이르고, 이를 처리하는 과정에서 해마다 886만 톤의 온실가스가 나옵니다.",
   "label": "한국재난안전뉴스(2022), 「기후위기 대응하려면 음식쓰레기부터」",
   "href": "https://www.kdsn.co.kr/news/article.html?no=26749",
   "real": true
  },
  "r2": "남긴 음식을 처리하는 데 많은 비용이 들기 때문입니다.",
  "e2": {
   "text": "학교 한 곳에서 한 해 동안 음식물 쓰레기를 처리하는 데 드는 비용이 천만 원이 넘는다고 합니다.",
   "label": "△△의 급식 일기(2025), 「잔반통을 보고 깜짝 놀랐습니다」",
   "href": "sources/blog-meal.html",
   "real": false
  },
  "closing": "먹을 만큼만 담으면 돈도 환경도 지킬 수 있습니다."
 },
 {
  "id": 3,
  "kind": "출처 표기 없음",
  "tone": "#6C5CE7",
  "tone2": "#A8A4F0",
  "topic": "겉모습과 편견",
  "motif": "mirror",
  "cover": "quote",
  "pattern": "none",
  "claim": "사람을 겉모습으로 판단하지 맙시다",
  "r1": "외모에 대한 지나친 관심이 마음을 힘들게 하기 때문입니다.",
  "e1": {
   "text": "성인 1,008명을 조사한 연구에서, 외모 때문에 부당한 대우를 받은 적이 있는 사람일수록 외모에 대한 불안감이 더 높게 나타났습니다.",
   "label": "임인숙(2015), 「외모차별 사회의 외모불안감과 노화불안감」, 한국사회학",
   "href": "https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002028215",
   "real": true
  },
  "r2": "겉모습만 보면 그 사람의 진짜 모습을 놓치게 되기 때문입니다.",
  "e2": {
   "text": "많은 사람들이 첫인상 때문에 오해를 받은 적이 있다고 합니다.",
   "label": null,
   "href": null,
   "real": false
  },
  "closing": "겉모습이 아니라 그 사람 자체를 보는 눈이 필요합니다."
 },
 {
  "id": 4,
  "kind": "근거가 이유와 관련 없음",
  "tone": "#C0392B",
  "tone2": "#E8743B",
  "topic": "영상 시청 습관",
  "motif": "play",
  "cover": "rule",
  "pattern": "grid",
  "claim": "영상 시청 시간을 스스로 정해 둡시다",
  "r1": "영상을 오래 보면 눈 건강에 좋지 않기 때문입니다.",
  "e1": {
   "text": "초등학생이 가장 많이 이용하는 온라인 동영상 플랫폼은 유튜브인 것으로 나타났습니다.",
   "label": "한국언론진흥재단(2022), 「10대 청소년 미디어 이용 조사」",
   "href": "https://www.kpf.or.kr/front/board/boardContentsView.do?board_id=246&contents_id=29ff236264724e3fbe02e544185aac03",
   "real": true
  },
  "r2": "영상을 보는 시간이 길어지면 다른 일을 할 시간이 줄어들기 때문입니다.",
  "e2": {
   "text": "초등학교 4~6학년의 하루 평균 인터넷 이용 시간은 2019년 2시간 40분에서 2022년 5시간 40분으로 늘었습니다.",
   "label": "한국언론진흥재단(2022), 「10대 청소년 미디어 이용 조사」",
   "href": "https://www.kpf.or.kr/front/board/boardContentsView.do?board_id=246&contents_id=29ff236264724e3fbe02e544185aac03",
   "real": true
  },
  "closing": "시간을 정해 두면 영상도 즐기고 할 일도 할 수 있습니다."
 },
 {
  "id": 6,
  "kind": "근거가 이유와 관련 없음",
  "tone": "#8E44AD",
  "tone2": "#C77DDA",
  "topic": "저작권과 출처",
  "motif": "pencil",
  "cover": "center",
  "pattern": "none",
  "claim": "그림이나 글을 올릴 때 출처를 밝힙시다",
  "r1": "만든 사람의 노력이 존중받아야 하기 때문입니다.",
  "e1": {
   "text": "저작권법은 창작물을 만든 사람에게 그 권리가 있다고 정하고 있습니다.",
   "label": "법제처, 「찾기 쉬운 생활법령정보」",
   "href": "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=695&ccfNo=2&cciNo=1&cnpClsNo=1",
   "real": true
  },
  "r2": "다른 사람이 만든 것을 함부로 가져다 쓰면 안 되기 때문입니다.",
  "e2": {
   "text": "우리나라의 불법복제물 이용률은 19.1%로 조사되었습니다.",
   "label": "한국저작권보호원, 「저작권 보호 연차보고서」",
   "href": "https://www.kcopa.or.kr/lay1/bbs/S1T12C38/F/38/view.do?article_seq=6261",
   "real": true
  },
  "closing": "출처를 밝히는 것은 만든 사람에 대한 예의입니다."
 },
 {
  "id": 7,
  "kind": "공공기관 자료이나 오래됨",
  "tone": "#2D6A4F",
  "tone2": "#52A675",
  "topic": "게임 시간 관리",
  "motif": "game",
  "cover": "panel",
  "pattern": "grid",
  "claim": "게임 시간을 스스로 관리합시다",
  "r1": "밤늦게까지 게임을 하면 잠자는 시간이 줄어들기 때문입니다.",
  "e1": {
   "text": "16세 미만 청소년은 밤 12시부터 새벽 6시까지 인터넷 게임에 접속할 수 없도록 하는 제도가 시행되어, 청소년이 많이 이용하는 게임 100개 가운데 83%가 이를 적용하고 있는 것으로 나타났습니다.",
   "label": "여성가족부(2012), 「청소년 인터넷게임 건전이용제도 이행현황 점검 결과」",
   "href": "https://m.korea.kr/news/pressReleaseView.do?newsId=155809549",
   "real": true
  },
  "r2": "게임하는 시간이 길어지면 다른 일을 할 시간이 줄어들기 때문입니다.",
  "e2": {
   "text": "2025년 조사에서 인터넷과 스마트폰을 지나치게 많이 사용해 일상생활에 지장을 받는 청소년은 21만여 명으로 나타났습니다.",
   "label": "여성가족부(2025), 「청소년 미디어 이용습관 진단조사」",
   "href": "https://www.mogef.go.kr/nw/enw/nw_enw_s001d.do?mid=mda700&bbtSn=712710",
   "real": true
  },
  "closing": "스스로 시간을 정하면 게임도 즐기고 건강도 지킬 수 있습니다."
 },
 {
  "id": 9,
  "kind": "이유가 주장과 관련 약함",
  "tone": "#B5179E",
  "tone2": "#E56BC4",
  "topic": "누리 소통망",
  "motif": "chat",
  "cover": "quote",
  "pattern": "dots",
  "claim": "누리 소통망에 올리기 전에 한 번 더 생각합시다",
  "r1": "누리 소통망을 이용하는 사람이 많기 때문입니다.",
  "e1": {
   "text": "초등학생의 누리 소통망 이용률이 해마다 높아지고 있는 것으로 나타났습니다.",
   "label": "한국언론진흥재단(2022), 「10대 청소년 미디어 이용 조사」",
   "href": "https://www.kpf.or.kr/front/board/boardContentsView.do?board_id=246&contents_id=29ff236264724e3fbe02e544185aac03",
   "real": true
  },
  "r2": "한 번 올린 글은 완전히 지우기 어렵기 때문입니다.",
  "e2": {
   "text": "개인정보보호위원회는 어릴 때 올린 게시물을 지우도록 돕는 지우개 서비스를 운영하고 있으며, 시범 운영 여덟 달 동안 신청이 1만여 건 접수되었습니다.",
   "label": "개인정보보호위원회, 「지우개 서비스」",
   "href": "https://www.korea.kr/briefing/pressReleaseView.do?newsId=156610039",
   "real": true
  },
  "closing": "올리기 전 잠깐의 고민이 나중의 후회를 막아 줍니다."
 },
 {
  "id": 10,
  "kind": "출처 표기 없음",
  "tone": "#E07A5F",
  "tone2": "#F2A65A",
  "topic": "학교 안전",
  "motif": "shield",
  "cover": "badge",
  "pattern": "none",
  "claim": "친구와 놀 때 안전에 주의합시다",
  "r1": "학교에서 다치는 일이 생각보다 자주 일어나기 때문입니다.",
  "e1": {
   "text": "쉬는 시간마다 다쳐서 보건실을 찾는 학생이 있다고 합니다.",
   "label": null,
   "href": null,
   "real": false
  },
  "r2": "다치면 즐거운 시간이 그대로 끝나 버리기 때문입니다.",
  "e2": {
   "text": "학교안전공제중앙회 자료에 따르면 학교 안전사고는 체육 시간과 쉬는 시간에 많이 발생합니다.",
   "label": "학교안전공제중앙회, 「학교안전사고 통계」",
   "href": "https://www.ssia.or.kr/board/page2.php?boardid=statistics&mode=view&idx=12&sk=&sw=&offset=&category=",
   "real": true
  },
  "closing": "조금만 조심하면 끝까지 즐겁게 놀 수 있습니다."
 },
 {
  "id": 12,
  "kind": "공공기관 자료이나 오래됨 (실제 링크)",
  "tone": "#3A7D44",
  "tone2": "#92C46D",
  "topic": "음식물 쓰레기",
  "motif": "earth",
  "cover": "center",
  "pattern": "dots",
  "claim": "먹을 만큼만 담아 음식을 남기지 맙시다",
  "r1": "음식물 쓰레기가 환경에 부담을 주기 때문입니다.",
  "e1": {
   "text": "음식물 쓰레기가 썩으면서 나오는 메탄은 이산화탄소보다 훨씬 강한 온실가스여서 기후변화를 더 빠르게 만듭니다.",
   "label": "국립생태원, 「생태 이야기」",
   "href": "https://blog.naver.com/nie_korea/224010312016?trackingCode=rss",
   "real": true
  },
  "r2": "음식물 쓰레기를 처리하는 데 큰 비용이 들기 때문입니다.",
  "e2": {
   "text": "우리나라에서 버려지는 음식물 쓰레기는 하루 평균 1만 5천 톤이며, 이로 인한 경제적 손실은 한 해 18조 원에 이릅니다.",
   "label": "환경부, 「한 끼 밥상에 온실가스 4.8kg」",
   "href": "https://www.korea.kr/news/issueQAView.do?newsId=148702729",
   "real": true
  },
  "closing": "덜어 먹는 습관 하나로 돈도 환경도 지킬 수 있습니다."
 }
];
