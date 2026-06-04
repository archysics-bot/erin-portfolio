import { desc } from "drizzle-orm";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { content } from "@/lib/content";
import { db } from "@/lib/db";
import { education, experiences } from "@/drizzle/schema";
import {
  completionLabel,
  degreeLabel,
  presentLabel,
  schoolTypeLabel,
} from "@/lib/labels";

function isLocale(value: string): value is Locale {
  return (routing.locales as readonly string[]).includes(value);
}
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { About, type ExperienceItem } from "@/components/sections/About";
import {
  Education,
  type EducationItem,
} from "@/components/sections/Education";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Awards } from "@/components/sections/Awards";

// DB 데이터를 실시간으로 읽어오도록 동적 렌더링 설정 (revalidate = 0)
export const revalidate = 0;

const year = (d: string) => d.slice(0, 4);
const yearMonth = (d: string) => `${d.slice(0, 4)}.${d.slice(5, 7)}`;

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);

  const data = content[locale];

  // 경력 — DB에서 최신순으로
  const expRows = await db
    .select()
    .from(experiences)
    .orderBy(desc(experiences.startDate));

  const experienceItems: ExperienceItem[] = expRows.map((r) => ({
    id: r.id,
    period: `${year(r.startDate)} – ${
      r.endDate ? year(r.endDate) : presentLabel[locale]
    }`,
    org: locale === "ko" ? r.orgKo : r.orgEn,
    role: locale === "ko" ? r.roleKo : r.roleEn,
  }));

  // 학력 — DB에서 정렬 순서대로
  const eduRows = await db
    .select()
    .from(education)
    .orderBy(education.sortOrder);

  const educationItems: EducationItem[] = eduRows.map((r) => {
    const major = locale === "ko" ? r.majorKo : r.majorEn;
    const degree = r.degree ? degreeLabel[locale][r.degree] : null;
    // ko: "도시설계 석사" / en: "Master's in Urban Design"
    const majorDegree =
      major && degree
        ? locale === "ko"
          ? `${major} ${degree}`
          : `${degree} in ${major}`
        : (major ?? degree);

    const line = [
      schoolTypeLabel[locale][r.schoolType],
      majorDegree,
      r.completionStatus ? completionLabel[locale][r.completionStatus] : null,
    ]
      .filter(Boolean)
      .join(" · ");

    return {
      id: r.id,
      period: `${yearMonth(r.startDate)} – ${
        r.endDate ? yearMonth(r.endDate) : presentLabel[locale]
      }`,
      school: locale === "ko" ? r.schoolKo : r.schoolEn,
      line,
    };
  });

  return (
    <>
      <Header nav={data.nav} />
      <main id="top">
        <Hero data={data.hero} />
        <About data={data.about} experiences={experienceItems} />
        <Education data={data.education} items={educationItems} />
        <Skills data={data.skills} />
        <Projects data={data.projects} />
        <Awards data={data.awards} />
      </main>
      <Footer data={data.footer} />
    </>
  );
}
