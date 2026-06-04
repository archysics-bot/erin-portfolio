import type { Locale } from "@/i18n/routing";

// DB enum 코드 → 로케일별 표시 라벨 (docs/db/erd.md의 매핑표와 일치)

export const schoolTypeLabel: Record<Locale, Record<string, string>> = {
  ko: { high_school: "고등학교", university: "대학교", graduate: "대학원" },
  en: {
    high_school: "High School",
    university: "University",
    graduate: "Graduate School",
  },
};

export const degreeLabel: Record<Locale, Record<string, string>> = {
  ko: { bachelor: "학사", master: "석사", doctorate: "박사" },
  en: { bachelor: "Bachelor's", master: "Master's", doctorate: "Doctorate" },
};

export const completionLabel: Record<Locale, Record<string, string>> = {
  ko: { graduated: "졸업", completed: "수료" },
  en: { graduated: "Graduated", completed: "Completed" },
};

export const presentLabel: Record<Locale, string> = {
  ko: "현재",
  en: "Present",
};
