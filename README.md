# OPEN API 웹앱

OPEN API에서 데이터를 가져와 React 상태 관리와 UI 표준에 맞게 출력하는 웹앱

## 실행 환경

- Node.js LTS
- Vite + React
- 추가 라이브러리 없음 (최소 구성)

## 프로젝트 구조

```
openapi-app/
 ┣ src/
 ┃ ┣ components/
 ┃ ┃ ┗ Weather.jsx
 ┃ ┣ App.jsx
 ┃ ┣ main.jsx
 ┃ ┗ index.css
```

## 로컬 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

## 빌드

```bash
npm run build
```

빌드 결과물은 `dist` 폴더에 생성됩니다.

## 배포 방법

### Vercel 배포

1. [Vercel](https://vercel.com)에 가입/로그인
2. 새 프로젝트 생성
3. GitHub 저장소 연결 또는 프로젝트 폴더 업로드
4. 자동으로 배포됨 (vercel.json 설정 파일 사용)

### Netlify 배포

1. [Netlify](https://www.netlify.com)에 가입/로그인
2. 새 사이트 생성
3. GitHub 저장소 연결 또는 프로젝트 폴더 드래그 앤 드롭
4. 빌드 설정:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. 배포 버튼 클릭

### GitHub Pages 배포

1. `package.json`에 배포 스크립트 추가:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
2. `gh-pages` 패키지 설치: `npm install --save-dev gh-pages`
3. GitHub 저장소에 푸시
4. `npm run deploy` 실행

## 사용 API

- Open-Meteo API (날씨 정보)
  - API 키 불필요
  - 서울 지역 날씨 정보 표시
