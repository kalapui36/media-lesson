# -*- coding: utf-8 -*-
"""
카드 뉴스 타당성 판단 프로그램 - 자료 생성기
이 파일 하나만 고치면 data.js 와 sources/*.html 이 다시 만들어진다.
  실행:  python3 build.py
"""
import json, os, html

OUT = os.path.dirname(os.path.abspath(__file__))

# ---------------------------------------------------------------- 블로그 주인
# 사진 파일을 assets/people/ 에 같은 이름으로 넣으면 자동으로 나타난다.
# 사진이 없으면 이름 첫 글자가 동그라미 안에 표시된다.
PEOPLE = {
    "health": {
        "blog": "○○의 하루하루",
        "name": "○○",
        "bio": "달리기랑 축구를 좋아합니다",
        "photo": "person-health.jpg",
        "neighbors": "42",
        "cats": ["오늘의 운동", "학교 이야기", "그냥 일상"],
    },
    "meal": {
        "blog": "△△의 급식 일기",
        "name": "△△",
        "bio": "급식 시간이 제일 기다려집니다",
        "photo": "person-meal.jpg",
        "neighbors": "28",
        "cats": ["오늘의 급식", "먹은 것", "학교 이야기"],
    },
    "safety": {
        "blog": "□□의 학교 생활",
        "name": "□□",
        "bio": "쉬는 시간이 제일 좋습니다",
        "photo": "person-safety.jpg",
        "neighbors": "19",
        "cats": ["학교 이야기", "쉬는 시간", "그냥 일상"],
    },
}

# ---------------------------------------------------------------- 카드 뉴스 10편
# note: "확인필요" 는 실제 자료 확인이 필요한 출처 (세안 5장 ※ 표시)
NEWS = [
{
 "id":1, "kind":"가짜 전문가 블로그", "tone":"#E4572E", "tone2":"#F6A03A", "motif":"run", "cover":"bottom", "pattern":"diag", "topic":"운동과 건강",
 "claim":"학교에서 운동할 시간을 늘립시다",
 "closing":"운동할 시간이 늘어나면 몸도 마음도 더 건강해질 것입니다.",
 "r1":"운동을 하면 공부에 집중이 더 잘되기 때문입니다.",
 "e1":{"text":"운동을 꾸준히 한 학생은 그렇지 않은 학생보다 수업에 집중하는 시간이 두 배 가까이 길어졌습니다.",
       "label":"○○의 하루하루(2025), 「운동하고 오면 공부가 잘되는 것 같아요」", "slug":"blog-health",
       "page":{"type":"blog","person":"health",
               "title":"운동하고 오면 공부가 잘되는 것 같아요",
               "date":"2025. 4. 11.",
               "paras":["저는 요즘 아침마다 학교 운동장을 세 바퀴씩 돌고 교실에 들어갑니다.",
                        "운동을 하고 온 날은 1교시에 하나도 안 졸립니다. 제 느낌으로는 집중하는 시간이 두 배쯤 길어진 것 같습니다.",
                        "같은 반 친구들한테도 물어봤는데 비슷하다고 했습니다. 시간을 재 본 건 아니지만요.",
                        "여러분도 아침에 조금만 뛰어 보세요. 진짜 달라집니다."],
               "tags":["운동","집중력","건강한하루"], "likes":"32","comments":"7"}},
 "r2":"우리나라 청소년의 운동 시간이 부족하기 때문입니다.",
 "e2":{"text":"하루 60분 이상 몸을 움직이는 청소년은 남학생 네 명 중 한 명, 여학생 열 명 중 한 명 정도에 그쳤습니다.",
       "label":"질병관리청, 「청소년건강행태조사」", "slug":"kdca-2024",
       "real":"https://www.kdca.go.kr/yhs/",
       "page":{"type":"gov","org":"질병관리청","dept":"건강영양조사분석과",
               "nav":["기관 소개","알림·자료","정책 정보","통계·조사","국민 참여"],
               "crumb":["홈","알림·자료","통계·조사 결과"],
               "title":"2024년 청소년건강행태조사 결과",
               "date":"2024. 12. 19.", "views":"4,182",
               "paras":["질병관리청은 해마다 전국의 중·고등학생을 대상으로 청소년의 건강 행태를 조사해 그 결과를 공개하고 있습니다.",
                        "2024년 조사에서 하루 60분 이상 몸을 움직이는 신체 활동을 실천한 청소년은 남학생은 네 명 중 한 명, 여학생은 열 명 중 한 명 정도에 그친 것으로 나타났습니다.",
                        "신체 활동 실천율은 학년이 올라갈수록 낮아지는 경향을 보였습니다.",
                        "질병관리청은 청소년이 일상에서 몸을 움직일 수 있는 환경을 만드는 일이 중요하다고 밝혔습니다."],
               "attach":"2024년 청소년건강행태조사 통계집.pdf"}}
},
{
 "id":2, "kind":"가짜 전문가 블로그", "tone":"#2E8B57", "tone2":"#8CC63F", "motif":"tray", "cover":"panel", "pattern":"dots", "topic":"급식과 음식물",
 "claim":"음식을 남기지 맙시다",
 "closing":"먹을 만큼만 담으면 돈도 환경도 지킬 수 있습니다.",
 "r1":"남긴 음식을 처리하는 데 많은 비용이 들기 때문입니다.",
 "e1":{"text":"학교 한 곳에서 한 해 동안 음식물 쓰레기를 처리하는 데 드는 비용이 천만 원이 넘는다고 합니다.",
       "label":"△△의 급식 일기(2025), 「잔반통을 보고 깜짝 놀랐습니다」", "slug":"blog-meal",
       "page":{"type":"blog","person":"meal",
               "title":"잔반통을 보고 깜짝 놀랐습니다",
               "date":"2025. 5. 20.",
               "paras":["오늘 급식을 먹고 나오다가 잔반통을 봤는데 정말 깜짝 놀랐습니다. 통이 넘칠 정도로 가득 차 있었습니다.",
                        "저걸 다 치우려면 돈이 엄청 들 것 같습니다. 학교 한 곳에서 한 해에 천만 원이 넘게 든다고 어디선가 들은 적이 있습니다.",
                        "직접 찾아본 건 아니지만, 날마다 나오는 양을 보면 그 정도는 될 것 같습니다.",
                        "내일부터는 먹을 만큼만 받아 보려고 합니다."],
               "tags":["급식","음식물쓰레기","잔반줄이기"], "likes":"18","comments":"4"}},
 "r2":"음식물 쓰레기가 환경에 부담을 주기 때문입니다.",
 "e2":{"text":"우리나라에서 하루에 버려지는 음식물 쓰레기는 1만 4천 톤에 이르고, 이를 처리하는 과정에서 해마다 886만 톤의 온실가스가 나옵니다.",
       "label":"한국재난안전뉴스(2022), 「기후위기 대응하려면 음식쓰레기부터」", "slug":"me-food",
       "real":"https://www.kdsn.co.kr/news/article.html?no=26749",
       "page":{"type":"gov","org":"환경부","dept":"자원순환정책과",
               "nav":["기관 소개","정책·정보","알림·뉴스","국민 참여","자료실"],
               "crumb":["홈","정책·정보","자원순환"],
               "title":"음식물 쓰레기 줄이기, 왜 필요할까요",
               "date":"2025. 4. 2.", "views":"2,910",
               "paras":["우리나라에서 하루에 나오는 음식물 쓰레기는 약 1만 4천 톤에 이릅니다.",
                        "음식물 쓰레기를 모으고 처리하는 과정에서 해마다 885만 톤가량의 온실가스가 발생합니다.",
                        "먹을 만큼만 조리하고 담는 것만으로도 버려지는 양을 크게 줄일 수 있습니다.",
                        "가정과 학교에서 실천할 수 있는 방법은 첨부 자료에서 확인할 수 있습니다."],
               "attach":"음식물 쓰레기 줄이기 실천 안내.pdf"}}
},
{
 "id":3, "kind":"출처 표기 없음", "tone":"#6C5CE7", "tone2":"#A8A4F0", "motif":"mirror", "cover":"quote", "pattern":"none", "topic":"겉모습과 편견",
 "claim":"사람을 겉모습으로 판단하지 맙시다",
 "closing":"겉모습이 아니라 그 사람 자체를 보는 눈이 필요합니다.",
 "r1":"겉모습만 보면 그 사람의 진짜 모습을 놓치게 되기 때문입니다.",
 "e1":{"text":"많은 사람들이 첫인상 때문에 오해를 받은 적이 있다고 합니다.",
       "label":None, "slug":None, "page":None},
 "r2":"외모에 대한 지나친 관심이 마음을 힘들게 하기 때문입니다.",
 "e2":{"text":"성인 1,008명을 조사한 연구에서, 외모 때문에 부당한 대우를 받은 적이 있는 사람일수록 외모에 대한 불안감이 더 높게 나타났습니다.",
       "label":"임인숙(2015), 「외모차별 사회의 외모불안감과 노화불안감」, 한국사회학", "slug":"nhrc-look",
       "real":"https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002028215",
       "page":{"type":"gov","org":"국가인권위원회","dept":"인권교육과",
               "nav":["위원회 소개","인권 상담","인권 교육","알림·자료","참여 마당"],
               "crumb":["홈","인권 교육","교육 자료"],
               "title":"외모를 이유로 한 차별, 무엇이 문제일까요",
               "date":"2025. 6. 11.", "views":"1,336",
               "paras":["국가인권위원회는 외모를 이유로 사람을 다르게 대하는 것도 차별이 될 수 있다고 안내하고 있습니다.",
                        "특히 자라나는 청소년에게는 외모를 두고 하는 말이 자존감과 정신 건강에 오래 영향을 줄 수 있습니다.",
                        "사람은 겉모습이 아니라 생각과 행동으로 이해되어야 합니다."],
               "attach":"외모 차별 예방 인권 교육 자료.pdf"}}
},
{
 "id":4, "kind":"근거가 이유와 관련 없음", "tone":"#C0392B", "tone2":"#E8743B", "motif":"play", "cover":"rule", "pattern":"grid", "topic":"영상 시청 습관",
 "claim":"영상 시청 시간을 스스로 정해 둡시다",
 "closing":"시간을 정해 두면 영상도 즐기고 할 일도 할 수 있습니다.",
 "r1":"영상을 오래 보면 눈 건강에 좋지 않기 때문입니다.",
 "e1":{"text":"초등학생이 가장 많이 이용하는 온라인 동영상 플랫폼은 유튜브인 것으로 나타났습니다.",
       "label":"한국언론진흥재단(2022), 「10대 청소년 미디어 이용 조사」", "slug":"kpf-platform",
       "real":"https://www.kpf.or.kr/front/board/boardContentsView.do?board_id=246&contents_id=29ff236264724e3fbe02e544185aac03",
       "page":{"type":"gov","org":"한국언론진흥재단","dept":"미디어연구센터",
               "nav":["재단 소개","조사·연구","미디어 교육","지원 사업","자료실"],
               "crumb":["홈","조사·연구","미디어 이용 조사"],
               "title":"10대 청소년 미디어 이용 조사 — 동영상 플랫폼 이용 현황",
               "date":"2025. 3. 20.", "views":"3,045",
               "paras":["조사 결과 초등학생이 가장 많이 이용하는 온라인 동영상 플랫폼은 유튜브로 나타났습니다.",
                        "어떤 영상을 주로 보는지는 학년에 따라 차이가 있었습니다.",
                        "이 조사는 청소년이 어떤 매체를 얼마나 이용하는지를 알아본 것으로, 시력이나 눈 건강에 관한 내용은 다루지 않았습니다."],
               "attach":"10대 청소년 미디어 이용 조사 보고서.pdf"}},
 "r2":"영상을 보는 시간이 길어지면 다른 일을 할 시간이 줄어들기 때문입니다.",
 "e2":{"text":"초등학교 4~6학년의 하루 평균 인터넷 이용 시간은 2019년 2시간 40분에서 2022년 5시간 40분으로 늘었습니다.",
       "label":"한국언론진흥재단(2022), 「10대 청소년 미디어 이용 조사」", "slug":"kpf-time",
       "real":"https://www.kpf.or.kr/front/board/boardContentsView.do?board_id=246&contents_id=29ff236264724e3fbe02e544185aac03",
       "page":{"type":"gov","org":"한국언론진흥재단","dept":"미디어연구센터",
               "nav":["재단 소개","조사·연구","미디어 교육","지원 사업","자료실"],
               "crumb":["홈","조사·연구","미디어 이용 조사"],
               "title":"10대 청소년 미디어 이용 조사 — 이용 시간 변화",
               "date":"2022. 12. 27.", "views":"5,771",
               "paras":["초등학교 4~6학년의 하루 평균 인터넷 이용 시간은 2019년 2시간 40분에서 2022년 5시간 40분으로 늘었습니다.",
                        "이용 시간이 늘면서 학습, 놀이, 잠자는 시간에 어떤 영향을 주는지 함께 살펴볼 필요가 있습니다."],
               "attach":"청소년 미디어 이용 시간 통계.pdf"}}
},
{
 "id":6, "kind":"근거가 이유와 관련 없음", "tone":"#8E44AD", "tone2":"#C77DDA", "motif":"pencil", "cover":"center", "pattern":"none", "topic":"저작권과 출처",
 "claim":"그림이나 글을 올릴 때 출처를 밝힙시다",
 "closing":"출처를 밝히는 것은 만든 사람에 대한 예의입니다.",
 "r1":"다른 사람이 만든 것을 함부로 가져다 쓰면 안 되기 때문입니다.",
 "e1":{"text":"우리나라의 불법복제물 이용률은 19.1%로 조사되었습니다.",
       "label":"한국저작권보호원, 「저작권 보호 연차보고서」", "slug":"copyright-use",
       "real":"https://www.kcopa.or.kr/lay1/bbs/S1T12C38/F/38/view.do?article_seq=6261",
       "page":{"type":"gov","org":"한국저작권위원회","dept":"저작권교육원",
               "nav":["위원회 소개","저작권 등록","교육·연수","조사·통계","자료실"],
               "crumb":["홈","조사·통계","이용 실태 조사"],
               "title":"학생들의 인터넷 자료 이용 실태",
               "date":"2025. 5. 8.", "views":"1,944",
               "paras":["인터넷에서 그림이나 사진을 내려받아 사용해 본 적이 있다고 답한 학생이 많은 것으로 나타났습니다.",
                        "이 조사는 학생들이 인터넷 자료를 얼마나 자주 이용하는지를 알아본 것입니다.",
                        "자료를 이용할 때 지켜야 할 방법은 별도의 교육 자료에서 안내하고 있습니다."],
               "attach":"청소년 저작권 인식 조사 결과.pdf"}},
 "r2":"만든 사람의 노력이 존중받아야 하기 때문입니다.",
 "e2":{"text":"저작권법은 창작물을 만든 사람에게 그 권리가 있다고 정하고 있습니다.",
       "label":"법제처, 「찾기 쉬운 생활법령정보」", "slug":"law-copyright",
       "real":"https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=695&ccfNo=2&cciNo=1&cnpClsNo=1",
       "page":{"type":"gov","org":"국가법령정보센터","dept":"법제처",
               "nav":["법령","행정규칙","자치법규","판례·해석","별표·서식"],
               "crumb":["홈","법령","저작권법"],
               "title":"저작권법",
               "date":"현행 법령", "views":"12,507",
               "paras":["저작권법은 글, 그림, 사진, 음악처럼 사람이 만든 창작물에 대하여 그것을 만든 사람에게 권리가 있다고 정하고 있습니다.",
                        "다른 사람의 창작물을 이용할 때에는 법에서 정한 방법에 따라야 합니다."],
               "attach":"저작권법 전문.hwp"}}
},
{
 "id":7, "kind":"공공기관 자료이나 오래됨", "topic":"게임 시간 관리", "tone":"#2D6A4F", "tone2":"#52A675", "motif":"game", "cover":"panel", "pattern":"grid",
 "claim":"게임 시간을 스스로 관리합시다",
 "closing":"스스로 시간을 정하면 게임도 즐기고 건강도 지킬 수 있습니다.",
 "r1":"밤늦게까지 게임을 하면 잠자는 시간이 줄어들기 때문입니다.",
 "e1":{"text":"16세 미만 청소년은 밤 12시부터 새벽 6시까지 인터넷 게임에 접속할 수 없도록 하는 제도가 시행되어, 청소년이 많이 이용하는 게임 100개 가운데 83%가 이를 적용하고 있는 것으로 나타났습니다.",
       "label":"여성가족부(2012), 「청소년 인터넷게임 건전이용제도 이행현황 점검 결과」",
       "slug":None,
       "real":"https://m.korea.kr/news/pressReleaseView.do?newsId=155809549",
       "page":None},
 "r2":"게임하는 시간이 길어지면 다른 일을 할 시간이 줄어들기 때문입니다.",
 "e2":{"text":"2025년 조사에서 인터넷과 스마트폰을 지나치게 많이 사용해 일상생활에 지장을 받는 청소년은 21만여 명으로 나타났습니다.",
       "label":"여성가족부(2025), 「청소년 미디어 이용습관 진단조사」",
       "slug":None,
       "real":"https://www.mogef.go.kr/nw/enw/nw_enw_s001d.do?mid=mda700&bbtSn=712710",
       "page":None}
},
{
 "id":9, "kind":"이유가 주장과 관련 약함", "tone":"#B5179E", "tone2":"#E56BC4", "motif":"chat", "cover":"quote", "pattern":"dots", "topic":"누리 소통망",
 "claim":"누리 소통망에 올리기 전에 한 번 더 생각합시다",
 "closing":"올리기 전 잠깐의 고민이 나중의 후회를 막아 줍니다.",
 "r1":"누리 소통망을 이용하는 사람이 많기 때문입니다.",
 "e1":{"text":"초등학생의 누리 소통망 이용률이 해마다 높아지고 있는 것으로 나타났습니다.",
       "label":"한국언론진흥재단(2022), 「10대 청소년 미디어 이용 조사」", "slug":"kpf-sns",
       "real":"https://www.kpf.or.kr/front/board/boardContentsView.do?board_id=246&contents_id=29ff236264724e3fbe02e544185aac03",
       "page":{"type":"gov","org":"한국언론진흥재단","dept":"미디어연구센터",
               "nav":["재단 소개","조사·연구","미디어 교육","지원 사업","자료실"],
               "crumb":["홈","조사·연구","미디어 이용 조사"],
               "title":"10대 청소년 미디어 이용 조사 — 누리 소통망 이용률",
               "date":"2025. 3. 20.", "views":"2,604",
               "paras":["초등학생의 누리 소통망 이용률이 해마다 높아지고 있는 것으로 나타났습니다.",
                        "이용하는 서비스의 종류도 예전보다 다양해졌습니다."],
               "attach":"청소년 누리 소통망 이용 현황.pdf"}},
 "r2":"한 번 올린 글은 완전히 지우기 어렵기 때문입니다.",
 "e2":{"text":"개인정보보호위원회는 어릴 때 올린 게시물을 지우도록 돕는 지우개 서비스를 운영하고 있으며, 시범 운영 여덟 달 동안 신청이 1만여 건 접수되었습니다.",
       "label":"개인정보보호위원회, 「지우개 서비스」", "slug":"kisa-post",
       "real":"https://www.korea.kr/briefing/pressReleaseView.do?newsId=156610039",
       "page":{"type":"gov","org":"한국인터넷진흥원","dept":"개인정보보호본부",
               "nav":["기관 소개","이용자 안내","신고·상담","교육 자료","자료실"],
               "crumb":["홈","이용자 안내","개인정보"],
               "title":"내가 올린 글, 지우면 사라질까요",
               "date":"2025. 5. 26.", "views":"4,051",
               "paras":["인터넷에 올린 글이나 사진은 다른 사람이 복사해 옮길 수 있어, 원래 글을 지워도 다른 곳에 남을 수 있습니다.",
                        "올리기 전에 내용을 한 번 더 살펴보는 습관이 필요합니다."],
               "attach":"디지털 흔적 관리 안내서.pdf"}}
},
{
 "id":10, "kind":"출처 표기 없음", "tone":"#E07A5F", "tone2":"#F2A65A", "motif":"shield", "cover":"badge", "pattern":"none", "topic":"학교 안전",
 "claim":"친구와 놀 때 안전에 주의합시다",
 "closing":"조금만 조심하면 끝까지 즐겁게 놀 수 있습니다.",
 "r1":"학교에서 다치는 일이 생각보다 자주 일어나기 때문입니다.",
 # ↓ 가짜 블로그로 바꾸려면 아래 e1 을 지우고 e1_blog 를 e1 으로 이름만 바꾸면 된다.
 "e1":{"text":"쉬는 시간마다 다쳐서 보건실을 찾는 학생이 있다고 합니다.",
       "label":None, "slug":None, "page":None},
 "e1_blog":{"text":"쉬는 시간마다 다쳐서 보건실을 찾는 학생이 있다고 합니다.",
       "label":"□□의 학교 생활(2025), 「오늘도 보건실에 간 친구가 있었습니다」", "slug":"blog-safety",
       "page":{"type":"blog","person":"safety",
               "title":"오늘도 보건실에 간 친구가 있었습니다",
               "date":"2025. 6. 3.",
               "paras":["오늘도 쉬는 시간에 복도에서 부딪혀서 보건실에 간 친구가 있었습니다.",
                        "제가 보기에는 쉬는 시간마다 다쳐서 보건실에 가는 애가 꼭 한두 명은 있는 것 같습니다.",
                        "세어 본 건 아니지만 우리 반만 봐도 그렇습니다.",
                        "복도에서 뛰지만 않아도 많이 줄어들 것 같습니다."],
               "tags":["학교안전","쉬는시간","보건실"], "likes":"21","comments":"5"}},
 "r2":"다치면 즐거운 시간이 그대로 끝나 버리기 때문입니다.",
 "e2":{"text":"학교안전공제중앙회 자료에 따르면 학교 안전사고는 체육 시간과 쉬는 시간에 많이 발생합니다.",
       "label":"학교안전공제중앙회, 「학교안전사고 통계」", "slug":"ssif-accident",
       "real":"https://www.ssia.or.kr/board/page2.php?boardid=statistics&mode=view&idx=12&sk=&sw=&offset=&category=",
       "page":{"type":"gov","org":"학교안전공제중앙회","dept":"안전사고예방팀",
               "nav":["기관 소개","공제 급여","사고 예방","통계 자료","알림 마당"],
               "crumb":["홈","통계 자료","사고 통계"],
               "title":"학교 안전사고는 언제 많이 일어날까요",
               "date":"2025. 4. 18.", "views":"1,725",
               "paras":["학교에서 일어나는 안전사고는 체육 시간과 쉬는 시간에 많이 발생하는 것으로 나타났습니다.",
                        "사고가 일어난 장소로는 운동장과 교실이 많았습니다.",
                        "사고를 줄이려면 활동 전에 안전 수칙을 확인하는 것이 중요합니다."],
               "attach":"학교 안전사고 통계 분석.pdf"}}
},
{
 "id":12, "kind":"공공기관 자료이나 오래됨 (실제 링크)", "tone":"#3A7D44", "tone2":"#92C46D", "motif":"earth", "cover":"center", "pattern":"dots", "topic":"음식물 쓰레기",
 "claim":"먹을 만큼만 담아 음식을 남기지 맙시다",
 "closing":"덜어 먹는 습관 하나로 돈도 환경도 지킬 수 있습니다.",
 "r1":"음식물 쓰레기를 처리하는 데 큰 비용이 들기 때문입니다.",
 "e1":{"text":"우리나라에서 버려지는 음식물 쓰레기는 하루 평균 1만 5천 톤이며, 이로 인한 경제적 손실은 한 해 18조 원에 이릅니다.",
       "label":"환경부, 「한 끼 밥상에 온실가스 4.8kg」",
       "slug":None,
       "real":"https://www.korea.kr/news/issueQAView.do?newsId=148702729",
       "page":None},
 "r2":"음식물 쓰레기가 환경에 부담을 주기 때문입니다.",
 "e2":{"text":"음식물 쓰레기가 썩으면서 나오는 메탄은 이산화탄소보다 훨씬 강한 온실가스여서 기후변화를 더 빠르게 만듭니다.",
       "label":"국립생태원, 「생태 이야기」", "slug":"me-food2",
       "real":"https://blog.naver.com/nie_korea/224010312016?trackingCode=rss",
       "page":{"type":"gov","org":"환경부","dept":"자원순환정책과",
               "nav":["기관 소개","정책·정보","알림·뉴스","국민 참여","자료실"],
               "crumb":["홈","정책·정보","자원순환"],
               "title":"음식물 쓰레기와 온실가스",
               "date":"2025. 4. 2.", "views":"2,910",
               "paras":["음식물 쓰레기를 모으고 처리하는 과정에서 해마다 885만 톤가량의 온실가스가 발생합니다.",
                        "버려지는 음식물의 상당 부분은 가정과 소형 음식점에서 나옵니다.",
                        "먹을 만큼만 조리하고 담는 것만으로도 버려지는 양을 크게 줄일 수 있습니다."],
               "attach":"음식물 쓰레기 줄이기 실천 안내.pdf"}}
},
]

# ---------------------------------------------------------------- 문제 쌍 위치 섞기
# 여기 적힌 편은 카드 2와 카드 3을 맞바꿔, 문제가 두 번째 쌍으로 간다.
# 모든 편에서 문제가 첫 번째 쌍에 있으면 "앞쪽이 이상하더라"는 요령이 생기므로 섞는다.
SWAP = {2, 3, 6, 12}

DISCLAIMER = ""

# ---------------------------------------------------------------- 템플릿
def e(s):
    return html.escape(s, quote=True)

def page_shell(title, body, extra_class=""):
    return f"""<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>{e(title)}</title>
<link rel="stylesheet" href="source.css">
</head>
<body class="{extra_class}">
{body}
<script>
document.querySelectorAll('img.avatar').forEach(function(img){{
  img.addEventListener('error', function(){{
    var d = document.createElement('div');
    d.className = img.className + ' avatar-fallback';
    d.textContent = img.dataset.initial || '?';
    img.replaceWith(d);
  }});
}});
</script>
</body>
</html>
"""

def gov_page(p):
    nav = "".join(f"<li>{e(x)}</li>" for x in p["nav"])
    crumb = " <span>›</span> ".join(e(x) for x in p["crumb"])
    old_bar = ""
    if p.get("old"):
        year = p["date"].split(".")[0].strip()
        old_bar = f"""
  <div class="oldbar">
    <strong>{e(year)}년에 등록된 자료입니다.</strong>
    <span>그 뒤에 바뀐 내용은 담겨 있지 않습니다. 최신 자료는 자료실에서 확인하시기 바랍니다.</span>
  </div>"""
    paras = "\n".join(f"    <p>{e(x)}</p>" for x in p["paras"])
    body = f"""<header class="gnb">
  <div class="gnb-in">
    <div class="org">{e(p['org'])}</div>
    <ul class="nav">{nav}</ul>
  </div>
</header>
<div class="crumb-bar"><div class="in">{crumb}</div></div>
<main class="doc">
  <h1>{e(p['title'])}</h1>
  <div class="doc-meta">
    <span><b>등록일</b> {e(p['date'])}</span>
    <span><b>담당 부서</b> {e(p['dept'])}</span>
    <span><b>조회</b> {e(p['views'])}</span>
  </div>{old_bar}
  <div class="doc-body">
{paras}
  </div>
  <div class="attach"><span class="clip">첨부</span>{e(p['attach'])}</div>
</main>
<footer class="gov-foot">
  <div class="in">
    <div class="foot-org">{e(p['org'])}</div>
    <div class="foot-line">누리집 이용 안내 · 개인정보 처리 방침 · 저작권 정책</div>
  </div>
</footer>"""
    return page_shell(p["title"] + " | " + p["org"], body, "gov")

def blog_page(p, person):
    paras = "\n".join(f"    <p>{e(x)}</p>" for x in p["paras"])
    tags = " ".join(f"<span>#{e(t)}</span>" for t in p["tags"])
    cats = "".join(f"<li>{e(c)}</li>" for c in person["cats"])
    ini = person["name"][0] if person["name"] else "?"
    photo = "../assets/people/" + person["photo"]
    body = f"""<header class="blog-top">
  <div class="in">
    <div class="bname">{e(person['blog'])}</div>
    <ul class="bmenu"><li>블로그 홈</li><li>글 목록</li><li>안부 글</li><li>이웃</li></ul>
  </div>
</header>
<div class="blog-wrap">
  <main class="post">
    <div class="cat-line">{e(person['cats'][0])}</div>
    <h1>{e(p['title'])}</h1>
    <div class="byline">
      <img class="avatar sm" src="{e(photo)}" alt="{e(person['name'])}" data-initial="{e(ini)}">
      <span class="who">{e(person['name'])}</span>
      <span class="dot">·</span>
      <span class="when">{e(p['date'])}</span>
    </div>
{paras}
    <div class="tags">{tags}</div>
    <div class="react"><span>공감 {e(p['likes'])}</span><span>댓글 {e(p['comments'])}</span></div>
  </main>
  <aside class="side">
    <div class="pcard">
      <img class="avatar lg" src="{e(photo)}" alt="{e(person['name'])}" data-initial="{e(ini)}">
      <div class="pname">{e(person['name'])}</div>
      <div class="pbio">{e(person['bio'])}</div>
      <div class="pstat">이웃 {e(person['neighbors'])}명</div>
      <button type="button" class="pbtn">이웃 추가</button>
    </div>
    <div class="pbox">
      <h2>카테고리</h2>
      <ul class="cats">{cats}</ul>
    </div>
  </aside>
</div>"""
    return page_shell(p["title"] + " : " + person["blog"], body, "blog")

# ---------------------------------------------------------------- 실행
def main():
    sdir = os.path.join(OUT, "sources")
    os.makedirs(sdir, exist_ok=True)
    made = []
    for n in NEWS:
        for key in ("e1", "e2", "e1_blog"):
            ev = n.get(key)
            if not ev or not ev.get("page") or ev.get("real"):
                continue
            p = ev["page"]
            if p["type"] == "gov":
                doc = gov_page(p)
            else:
                doc = blog_page(p, PEOPLE[p["person"]])
            path = os.path.join(sdir, ev["slug"] + ".html")
            with open(path, "w", encoding="utf-8") as f:
                f.write(doc)
            made.append(ev["slug"])

    # data.js — 프로그램이 읽는 자료 (페이지 본문은 빼고 링크만)
    slim = []
    for n in NEWS:
        def ev(k):
            x = n[k]
            href = x.get("real") or (("sources/" + x["slug"] + ".html") if x["slug"] else None)
            return {"text": x["text"], "label": x["label"], "href": href,
                    "real": bool(x.get("real"))}
        if n["id"] in SWAP:
            r1, e1, r2, e2 = n["r2"], ev("e2"), n["r1"], ev("e1")
        else:
            r1, e1, r2, e2 = n["r1"], ev("e1"), n["r2"], ev("e2")
        slim.append({"id": n["id"], "kind": n["kind"], "tone": n["tone"], "tone2": n.get("tone2",n["tone"]), "topic": n.get("topic",""),
                     "motif": n.get("motif",""), "cover": n.get("cover","center"), "pattern": n.get("pattern","none"),
                     "claim": n["claim"], "r1": r1, "e1": e1,
                     "r2": r2, "e2": e2, "closing": n["closing"]})
    with open(os.path.join(OUT, "data.js"), "w", encoding="utf-8") as f:
        f.write("/* build.py 가 만든 파일입니다. 내용을 고치려면 build.py 를 고치고 다시 실행하세요. */\n")
        f.write("var NEWS = " + json.dumps(slim, ensure_ascii=False, indent=1) + ";\n")

    print("출처 페이지", len(made), "개 생성:", ", ".join(made))
    print("data.js 생성 완료 —", len(slim), "편")

if __name__ == "__main__":
    main()
