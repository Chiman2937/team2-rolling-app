# 📜 기초 프로젝트 README

> ![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?logo=javascript&logoColor=white&labelColor=20232a)
![css](https://img.shields.io/badge/-css-663399?logo=css&logoColor=white&labelColor=20232a)
![HTML5](https://img.shields.io/badge/-HTML5-E34F26?logo=html5&logoColor=white&labelColor=20232a)
![Node.js](https://img.shields.io/badge/-Node.js-5FA04E?logo=node.js&logoColor=white&labelColor=20232a)
![npm](https://img.shields.io/badge/-npm-CB3837?logo=npm&logoColor=white&labelColor=20232a)
![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white&labelColor=20232a)
![React_Router](https://img.shields.io/badge/-React_Router-CA4245?logo=reactrouter&logoColor=white&labelColor=20232a)
![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white&labelColor=20232a)
![SASS](https://img.shields.io/badge/-SASS-CC6699?logo=sass&logoColor=white&labelColor=20232a)

> ![Visual_Studio_Code](https://img.shields.io/badge/Visual_Studio_Code-0854C1)
![Prettier](https://img.shields.io/badge/-Prettier-F7B93E?logo=prettier&logoColor=white&labelColor=20232a)
![ESLint](https://img.shields.io/badge/-ESLint-4B32C3?logo=eslint&logoColor=white&labelColor=20232a)
![Axios](https://img.shields.io/badge/-Axios-5A29E4?logo=axios&logoColor=white&labelColor=20232a)

> ![Git](https://img.shields.io/badge/-Git-F05032?logo=git&logoColor=white&labelColor=20232a)
![GitHub](https://img.shields.io/badge/-GitHub-181717?logo=github&logoColor=white&labelColor=20232a)
![Notion](https://img.shields.io/badge/-Notion-000000?logo=notion&logoColor=white&labelColor=20232a)

---

### 💌 주제
**[롤링]** - 롤링페이퍼 문화를 웹으로 구현한 커뮤니티형 플랫폼
- [🧷 [가이드 문서]](https://codeit.notion.site/_-1d56fd228e8d8166953fc518d8a2f708)

---

### 📝 프로젝트 수행 계획서
- [🧷 [수행 계획서]](https://www.notion.so/2-2-20053353e9c18017b06af9faee681b14?source=copy_link)

---

### 🎨 디자인 시안
- [🧷 [Figma - 원본]](https://www.figma.com/design/cbZ9PNKSFg4mS7Lf1roZlp/-AAA-%E1%84%85%E1%85%A9%E1%86%AF%E1%84%85%E1%85%B5%E1%86%BC?node-id=0-1&p=f&t=ReUqQRbqJOTJmGco-0)  
- [🧷 [Figma - 복제]](https://www.figma.com/design/oqjpgLMCsvg5l4xoKPruFj/-AAA-%E1%84%85%E1%85%A9%E1%86%AF%E1%84%85%E1%85%B5%E1%86%BC--Copy-?node-id=0-1&p=f&t=n9FtuZe3s2ohiykj-0)

---

### 📅 프로젝트 현황
- [🧷 [Project Timeline]](https://www.notion.so/20453353e9c180198ea8ec6b665f1af8?v=20453353e9c180808b5d000c35cccd23&source=copy_link)

---

### 📂 폴더 구조
```markdown
📁 src/
├── 📁 assets/
│   ├── fonts/          # 프로젝트에서 사용하는 폰트 파일
│   ├── icons/          # SVG 등 아이콘 리소스
│   ├── images/         # 정적 이미지 리소스
│   └── styles/         # 전역 스타일(reset, common 등)
│
├── 📁 components/     # 재사용 가능한 공용 UI 컴포넌트 (e.g. Button, Modal 등)
│
├── 📁 constants/      # 전역 상수 정의 (e.g. API 경로, 옵션값, 메시지 등)
│
├── 📁 contexts/       # React Context API 관련 파일 관리 (e.g. AuthContext, ThemeContext)
│
├── 📁 hooks/          # 공통으로 사용하는 Custom Hook 정의 (e.g. useToggle, useDebounce 등)
│
├── 📁 pages/          # 라우트 단위 최상위 컴포넌트 정의
│                       # 예: Home.jsx, About.jsx 등
│
├── 📁 utils/          # 유틸성 함수 모음 (e.g. 날짜 포맷, 가격 포맷 등)
│
├── 📁 apis/           #
│
├── App.jsx             # 전체 애플리케이션을 구성하는 루트 컴포넌트
└── main.jsx            # React DOM 렌더링 및 앱 부트스트랩 엔트리 포인트

```

```markdown
📁 src/
├── 📁 components/                  # 모든 페이지에서 공통으로 사용하는 공용 컴포넌트
│   ├── **Button.jsx**
│   ├── **Modal.jsx**
│   └── ...
│
└── 📁 pages/                       # 라우트 단위로 관리되는 상위 페이지 컴포넌트
    └── 📁 HomePage/
        ├── HomePage.jsx             # HomePage 최상단 컴포넌트
        └── 📁 components/          # HomePage에서만 사용하는 컴포넌트
            ├── **Banner.jsx**
            └── **Card.jsx**
```

```markdown
📁 src/
└── 📁 pages/                       
    └── 📁 Home**Page**/                # 모든 최상단 컴포넌트의 이름 뒤에 Page 붙여서 관리
        └── Home**Page**.jsx 
    └── 📁 Products**Page**/  
        └── Products**Page**.jsx            
    └── 📁 Faq**Page**/     
        └── Faq**Page**.jsx         
```
