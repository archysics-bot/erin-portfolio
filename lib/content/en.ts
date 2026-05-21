import type { PortfolioContent } from "./types";

export const en: PortfolioContent = {
  meta: {
    title: "Erin Lee — Service Planner Portfolio",
    description:
      "Portfolio of Erin Lee (Jung-Hyun Lee), a service planner with 17 years of experience in map and location-based products.",
  },
  nav: {
    about: "About",
    skills: "Skills",
    projects: "Projects",
    awards: "Awards",
  },
  hero: {
    name: "Erin Lee",
    tagline:
      "Service planner with 17 years of experience designing and operating map and location-based products.",
    location: "Seoul, Korea",
  },
  about: {
    heading: "About",
    paragraphs: [
      "From data design and partnership structuring to service planning and operations — I've worked across the full lifecycle of location-based products.",
      "I center decisions around the “movement experience,” balancing user value against business and security risk.",
      "I'm comfortable aligning global partners, government agencies, and on-the-ground stakeholders toward a single direction.",
    ],
    experienceLabel: "Experience",
    experiences: [
      {
        period: "2017 – Present",
        org: "Kakao",
        role: "ESG / Shared-growth lead · SME DX strategy · Kakao Map partnerships & PM · Kakao Navi planning",
      },
      {
        period: "2012 – 2015",
        org: "SK Planet",
        role: "Service planning for Tmap and Picket",
      },
      {
        period: "2010 – 2012",
        org: "Daum Communications",
        role: "Map service planning",
      },
      {
        period: "2008 – 2010",
        org: "Korea Research Institute for Human Settlements",
        role: "GIS data research",
      },
    ],
  },
  skills: {
    heading: "Skills",
    groups: [
      {
        label: "Service Planning",
        items: ["Product Strategy", "Service Operations", "Roadmap & PRD"],
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
          "Partnerships",
          "Stakeholder Management",
          "Cross-cultural / Global",
        ],
      },
      {
        label: "Impact",
        items: ["SME DX", "ESG / Shared Growth", "Data Design"],
      },
    ],
  },
  projects: {
    heading: "Projects",
    items: [
      {
        title: "what3words Global Integration",
        summary:
          "Integrated the UK-based three-word address system into a domestic map service — a global-feature rollout that balanced user value with service risk.",
        impact: [
          "Managed security risk through an exact-match search approach",
          "Preserved backward compatibility with the existing address scheme",
        ],
        role: "Planning lead · Global partner negotiation",
      },
      {
        title: "Kakao Project Danggol (SME DX)",
        summary:
          "SME digital-transformation program. Coordinated between government agencies and on-the-ground stakeholders to scale the service nationwide.",
        impact: [
          "User satisfaction of 4.8 / 5.0",
          "Selected as an OECD · UNDP digital-transformation case study",
        ],
        role: "Business strategy lead · Stakeholder lead",
      },
    ],
  },
  awards: {
    heading: "Awards",
    items: [
      {
        year: "2025",
        title: "Consumer ESG Innovation Award",
        issuer: "—",
      },
      {
        year: "2024",
        title: "Grand Prize, Korea Commission for Corporate Partnership",
        issuer: "Korea Commission for Corporate Partnership",
      },
      {
        year: "2019",
        title: "Minister's Commendation",
        issuer: "Ministry of Land, Infrastructure and Transport",
      },
    ],
  },
  footer: {
    copyright: "© 2026 Erin Lee. All rights reserved.",
  },
};
