# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Erin Lee(이정현)의 개인 포트폴리오 웹사이트.

- **목적**: 17년 차 서비스 기획자 Erin Lee의 경력·대표 프로젝트·수상을 한 페이지로 보여주는 단일 페이지 포트폴리오
- **언어**: 한국어 / 영어 토글 (`/ko`, `/en` — 기본 `ko`)
- **현재 상태**: 1차 스캐폴딩 완료. 미확정 항목 = 연락처, 프로필 사진, 2025년 수상의 수여 기관, 영문 카피 검수

## Tech Stack

- **Framework**: Next.js 15 (App Router) + React 19 + TypeScript (strict)
- **Styling**: Tailwind CSS v3 — 토큰은 `tailwind.config.ts`에 정의
- **i18n**: `next-intl@3.26.x` (locale-prefixed 라우팅)
- **Font**: Pretendard Variable (CDN import in `app/globals.css`)
- **Database**: Supabase (PostgreSQL) + Drizzle ORM. 클라이언트 `@supabase/ssr`(인증/세션), 데이터 쿼리 `drizzle-orm` + `postgres`

## 디렉터리 구조

- `app/[locale]/layout.tsx` — `<html lang>`, 메타데이터(`generateMetadata`), `NextIntlClientProvider`
- `app/[locale]/page.tsx` — 단일 페이지. 섹션 컴포넌트들을 순서대로 조립
- `app/globals.css` — Pretendard 임포트 + Tailwind 베이스 + body 폰트 셋업
- `components/Header.tsx`, `components/Footer.tsx` — 페이지 전역 chrome
- `components/sections/` — Hero / About / Skills / Projects / Awards 섹션 컴포넌트
- `components/ui/` — Container, SectionHeading, LanguageToggle (재사용 UI)
- `lib/content/` — 한·영 콘텐츠 + 공유 타입 (`ko.ts`, `en.ts`, `types.ts`, `index.ts`)
- `i18n/routing.ts` — `defineRouting` + `createNavigation`, `Locale` 타입 export
- `i18n/request.ts` — next-intl request config (메시지는 비워두고 콘텐츠는 별도 import)
- `middleware.ts` — `/`를 `/ko`로 리다이렉트, locale 라우팅 처리

## 아키텍처 노트

### 콘텐츠 데이터 흐름

콘텐츠는 **next-intl 메시지가 아니라** `lib/content/{locale}.ts`의 타입 안전한 객체로 관리. 페이지에서 `content[locale]`을 한 번만 읽어서 각 섹션에 슬라이스(`data.hero`, `data.about` …)를 props로 넘기는 패턴.

```tsx
// app/[locale]/page.tsx
const data = content[locale];
<Hero data={data.hero} />
<About data={data.about} />
```

각 섹션 컴포넌트의 props 타입도 `PortfolioContent["hero"]`처럼 슬라이스 타입을 직접 인용 — `types.ts`에서 키를 바꾸면 컴파일 단계에서 모든 사용처가 함께 깨지므로 누락이 없음.

### Locale 검증

`next-intl@3.26.5`에는 `hasLocale` export가 **없음** (문서/타입에는 보이지만 런타임 export X). 그래서 `layout.tsx`와 `page.tsx`에 로컬 `isLocale` 타입 가드를 둠:

```ts
function isLocale(value: string): value is Locale {
  return (routing.locales as readonly string[]).includes(value);
}
```

이후 next-intl 메이저 업데이트 시 표준 헬퍼로 교체 검토.

### 정적 렌더링

각 server component 진입에서 `setRequestLocale(locale)`을 호출해 SSG로 prerender. `generateStaticParams`는 `routing.locales`에서 자동 생성. 빌드 결과 `/ko`, `/en` 모두 static.

### 디자인 토큰

`tailwind.config.ts`에 정의된 커스텀 토큰만 일관되게 사용:

- 텍스트: `text-ink` / `text-ink-muted` / `text-ink-subtle`
- 강조: `text-accent`, `bg-accent` (현재 indigo-600)
- 보더: `border-ink/10` 등 ink 알파
- 컨테이너 최대 폭: `max-w-content` (= 64rem)
- 모든 섹션 좌우 패딩은 `<Container>`로 통일

## 데이터베이스 (Supabase + Drizzle)

> **DB 관련 작업을 할 때는 먼저 `docs/db/` 폴더의 문서를 반드시 참고할 것.** 현재 스키마(ERD·테이블·컬럼·RLS)가 모두 거기에 기록되어 있으며, 스키마를 변경하면 `docs/db/`도 함께 갱신해야 한다.

- `docs/db/erd.md` — Mermaid ERD + 테이블 상세 + RLS + 변경 절차 (DB 작업의 단일 참조 문서)
- `drizzle/schema.ts` — Drizzle 테이블 정의. **스키마의 단일 진실 공급원(source of truth)**
- `lib/db.ts` — Drizzle 클라이언트(`db`). 서버에서 직접 Postgres(transaction 풀러)로 연결, RLS 우회
- `utils/supabase/{client,server,middleware}.ts` — `@supabase/ssr` 클라이언트(인증/세션용)
- `drizzle.config.ts` — drizzle-kit 설정. 마이그레이션은 `DIRECT_URL`(session 풀러) 사용
- 환경변수: `.env.local`(커밋 안 됨) / `.env.example`(템플릿). `DATABASE_URL`(6543, 런타임) + `DIRECT_URL`(5432, 마이그레이션)

### DB 작업 원칙

1. 스키마 변경은 `drizzle/schema.ts`에서 시작 → `docs/db/erd.md` 동기화 → `npm run db:push`(개발) 또는 `db:generate`+`db:migrate`
2. 신규 테이블은 **RLS 활성화 + 정책**을 직접 추가 (Drizzle은 RLS를 자동 생성하지 않음). 공개 읽기 데이터는 `for select using (true)` 정책
3. 서버 컴포넌트/액션에서 데이터는 `import { db } from "@/lib/db"`로 쿼리. 콘텐츠 흐름과 마찬가지로 **섹션 컴포넌트에 직접 주입하지 말고 상위(page)에서 읽어 props로** 전달
4. DB를 런타임에 읽는 페이지는 더 이상 SSG가 아니므로(동적 렌더) 정적 렌더링 영향 확인

```bash
npm run db:push      # 스키마를 DB에 반영 (개발)
npm run db:generate  # 마이그레이션 SQL 생성
npm run db:migrate   # 마이그레이션 적용
npm run db:studio    # Drizzle Studio
```

## 작업 가이드

### 텍스트만 바꿀 때

`lib/content/ko.ts`와 `lib/content/en.ts` 두 파일만 수정. 두 파일은 같은 `PortfolioContent` 타입을 공유하므로 한쪽에 키를 추가/삭제하면 다른 쪽도 즉시 맞춰야 빌드가 통과.

### 새 섹션 추가

1. `lib/content/types.ts`의 `PortfolioContent`에 새 키 추가
2. `ko.ts` / `en.ts`에 같은 키로 콘텐츠 작성
3. `components/sections/<Name>.tsx` 생성 — props는 `{ data: PortfolioContent["<key>"] }`
4. `app/[locale]/page.tsx`에 섹션 import 및 배치
5. `components/Header.tsx`에 nav 링크 추가 (앵커 ID 일치)

### 추가하지 말 것

- `lib/content/*.ts` **외부**에서 한국어/영어 하드코딩
- 섹션 컴포넌트 내부에서 직접 `useLocale()` / `content` import — 데이터는 상위에서 주입
- 새로운 색상·폰트 추가는 `tailwind.config.ts`에 토큰 등록 후 사용 (one-off 클래스 금지)

## 개발

```bash
npm install
npm run dev    # http://localhost:3000 → /ko 자동 리디렉션
npm run build  # /ko, /en 모두 SSG로 prerender
npm run lint
```
