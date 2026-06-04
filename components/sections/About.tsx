import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { google } from "@/lib/palette";
import type { PortfolioContent } from "@/lib/content";
import { Link } from "@/i18n/routing";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteExperienceAction } from "@/app/actions/experiences";

export type ExperienceItem = {
  id: number;
  period: string;
  org: string;
  role: string;
};

export function About({
  data,
  experiences,
}: {
  data: PortfolioContent["about"];
  experiences: ExperienceItem[];
}) {
  return (
    <section id="about" className="py-24 md:py-32">
      <Container>
        <SectionHeading eyebrow="01" colorIndex={0}>
          {data.heading}
        </SectionHeading>
        <div className="grid gap-16 md:grid-cols-5">
          <div className="md:col-span-3 flex flex-col gap-5">
            {data.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-base leading-relaxed text-ink-muted md:text-lg"
              >
                {p}
              </p>
            ))}
          </div>
          <div className="md:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-medium uppercase tracking-[0.18em] text-ink-subtle">
                {data.experienceLabel}
              </h3>
              <Link
                href="/admin/experiences/new"
                className="text-xs font-semibold text-google-blue hover:text-google-blue/80 hover:underline flex items-center gap-1 transition"
              >
                + 경력 추가
              </Link>
            </div>
            <ol className="flex flex-col gap-6 border-l border-ink/10 pl-6">
              {experiences.map((exp, i) => (
                <li key={i} className="relative flex flex-col gap-1">
                  <span
                    className={`absolute -left-[1.65rem] top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-white ${google.bg(
                      i,
                    )}`}
                    aria-hidden
                  />
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-xs font-medium text-ink-subtle">
                      {exp.period}
                    </span>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/experiences/${exp.id}/edit`}
                        className="text-xs font-medium text-google-blue/80 hover:text-google-blue hover:underline transition"
                      >
                        수정
                      </Link>
                      <span className="text-ink/10 text-xs">|</span>
                      <DeleteButton
                        id={exp.id}
                        onDelete={deleteExperienceAction}
                      />
                    </div>
                  </div>
                  <span className="text-base font-medium text-ink">
                    {exp.org}
                  </span>
                  <span className="text-sm leading-relaxed text-ink-muted">
                    {exp.role}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
