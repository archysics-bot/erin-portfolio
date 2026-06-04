export type PortfolioContent = {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    about: string;
    education: string;
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
  };
  education: {
    heading: string;
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
