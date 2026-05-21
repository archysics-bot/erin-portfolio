# erin-portfolio

Erin Lee(이정현)의 개인 포트폴리오 웹사이트. Next.js 15 · TypeScript · Tailwind CSS · next-intl(한/영) 기반.

## 시작하기

```bash
npm install
npm run dev
```

서버가 뜨면 [http://localhost:3000](http://localhost:3000) 으로 접속하세요. 자동으로 `/ko`로 리디렉션됩니다. 우측 상단 토글로 `/en`과 전환할 수 있습니다.

## 콘텐츠 수정

자기소개·경력·프로젝트·수상 텍스트는 모두 아래 두 파일에서 관리합니다:

- `lib/content/ko.ts` — 한국어
- `lib/content/en.ts` — 영어

두 파일은 `lib/content/types.ts`의 `PortfolioContent` 타입을 공유하므로, 한 쪽에서 키를 바꾸면 다른 쪽도 함께 맞춰주세요.

## 스크립트

- `npm run dev` — 개발 서버
- `npm run build` — 프로덕션 빌드
- `npm run start` — 빌드된 결과 실행
- `npm run lint` — ESLint 실행
