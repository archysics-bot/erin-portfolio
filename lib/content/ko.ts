import type { PortfolioContent } from "./types";

export const ko: PortfolioContent = {
  meta: {
    title: "이정현 · Erin Lee — 서비스 기획자 포트폴리오",
    description:
      "지도·로컬 데이터 기반 서비스를 기획하고 운영해 온 17년 차 서비스 기획자 이정현의 포트폴리오.",
  },
  nav: {
    about: "소개",
    skills: "역량",
    projects: "프로젝트",
    awards: "수상",
  },
  hero: {
    name: "이정현",
    tagline:
      "지도·로컬 데이터 기반 서비스를 기획하고 운영해 온 17년 차 서비스 기획자입니다.",
    location: "Seoul, Korea",
  },
  about: {
    heading: "About",
    paragraphs: [
      "데이터 설계부터 사업·제휴 구조화, 서비스 기획과 운영까지 — 위치 기반 서비스의 전 과정을 경험해 왔습니다.",
      "‘이동 경험(Movement Experience)’을 중심에 두고, 사용자 가치와 사업 리스크를 함께 저울질하며 의사결정을 내리는 것에 강점이 있습니다.",
      "글로벌·크로스컬처 환경에서 제휴 파트너, 정부 부처, 현장 이해관계자를 한 방향으로 정렬하는 일에 익숙합니다.",
    ],
    experienceLabel: "Experience",
    experiences: [
      {
        period: "2017 – 현재",
        org: "카카오",
        role: "ESG 상생사업 리더 · SME DX 사업 전략 · 카카오맵 사업제휴/PM · 카카오내비 기획",
      },
      {
        period: "2012 – 2015",
        org: "SK플래닛",
        role: "Tmap · Picket 서비스 기획",
      },
      {
        period: "2010 – 2012",
        org: "다음커뮤니케이션",
        role: "지도 서비스 기획",
      },
      {
        period: "2008 – 2010",
        org: "국토연구원",
        role: "GIS 데이터 연구",
      },
    ],
  },
  skills: {
    heading: "Skills",
    groups: [
      {
        label: "Service Planning",
        items: [
          "Product Strategy",
          "Service Operations",
          "Roadmap & PRD",
        ],
      },
      {
        label: "Domain",
        items: [
          "Location-based Service",
          "Map Data",
          "Mobility / Movement Experience",
        ],
      },
      {
        label: "Business",
        items: [
          "사업 제휴 · Partnership",
          "Stakeholder Management",
          "Cross-cultural / Global",
        ],
      },
      {
        label: "Impact",
        items: ["SME DX", "ESG · 상생사업", "Data Design"],
      },
    ],
  },
  projects: {
    heading: "Projects",
    items: [
      {
        title: "what3words 글로벌 연동",
        summary:
          "영국 기반 3-word address 시스템을 국내 지도 서비스에 통합. 사용자 가치와 서비스 리스크를 동시에 고려한 글로벌 기능 도입 프로젝트.",
        impact: [
          "exact-match 검색 기반으로 보안 리스크를 관리",
          "기존 주소 체계와의 하위 호환성을 유지한 연동 방식 설계",
        ],
        role: "기획 리드 · 글로벌 파트너 협상",
      },
      {
        title: "카카오 프로젝트 단골 (SME DX)",
        summary:
          "소상공인 DX 사업. 정부 부처와 현장 이해관계자 사이를 조율하며 전국 단위로 서비스를 확산.",
        impact: [
          "사용자 만족도 4.8 / 5.0",
          "OECD · UNDP 디지털 전환 우수 사례 선정",
        ],
        role: "사업 전략 총괄 · 이해관계자 리드",
      },
    ],
  },
  awards: {
    heading: "Awards",
    items: [
      {
        year: "2025",
        title: "소비자 ESG 혁신대상",
        issuer: "—",
      },
      {
        year: "2024",
        title: "동반성장위원회 위원장상 (대상)",
        issuer: "동반성장위원회",
      },
      {
        year: "2019",
        title: "국토교통부 장관 표창",
        issuer: "국토교통부",
      },
    ],
  },
  footer: {
    copyright: "© 2026 Erin Lee. All rights reserved.",
  },
};
