# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Erin Lee(이정현)의 개인 포트폴리오 웹사이트.

- **목적**: 17년 차 서비스 기획자 Erin Lee의 경력·대표 프로젝트·수상을 한 페이지로 보여주는 포트폴리오
- **언어**: 한국어 / 영어 토글 (`/ko`, `/en`)

## Tech Stack

- **Framework**: Next.js 15 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS v3
- **i18n**: `next-intl` (locale-prefixed 라우팅, 메시지는 `lib/content/{ko,en}.ts`의 타입 안전 객체로 관리)
- **Font**: Pretendard Variable (CDN)

## 디렉터리 구조

- `app/[locale]/` — locale-scoped layout/page (메타데이터, 폰트, html lang 설정 포함)
- `components/sections/` — Hero / About / Skills / Projects / Awards 섹션 컴포넌트
- `components/ui/` — Container, SectionHeading, LanguageToggle 공통 UI
- `lib/content/` — 한·영 콘텐츠 (`ko.ts`, `en.ts`, `types.ts`)
- `i18n/` — next-intl routing 및 request config
- `middleware.ts` — locale 라우팅 미들웨어

## 콘텐츠 수정 가이드

본문/연도/프로젝트 등을 바꿀 때는 **컴포넌트가 아니라 `lib/content/{ko,en}.ts`** 만 수정하면 됩니다. 두 파일 모두 `PortfolioContent` 타입을 따르므로 한 쪽을 바꾸면 다른 쪽도 동일 키로 맞춰야 합니다.

## 개발

```bash
npm install
npm run dev   # http://localhost:3000 → /ko 리디렉션
npm run build
npm run lint
```
