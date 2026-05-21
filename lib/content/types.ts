export type PortfolioContent = {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    about: string;
    skills: string;
    projects: string;
    awards: string;
  };
  hero: {
    name: string;
    tagline: string;
    location: string;
  };
  about: {
    heading: string;
    paragraphs: string[];
    experienceLabel: string;
    experiences: {
      period: string;
      org: string;
      role: string;
    }[];
  };
  skills: {
    heading: string;
    groups: {
      label: string;
      items: string[];
    }[];
  };
  projects: {
    heading: string;
    items: {
      title: string;
      summary: string;
      impact: string[];
      role: string;
    }[];
  };
  awards: {
    heading: string;
    items: {
      year: string;
      title: string;
      issuer: string;
    }[];
  };
  footer: {
    copyright: string;
  };
};
