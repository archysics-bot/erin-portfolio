import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { google } from "@/lib/palette";
import type { PortfolioContent } from "@/lib/content";

export function About({ data }: { data: PortfolioContent["about"] }) {
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
            <h3 className="mb-6 text-sm font-medium uppercase tracking-[0.18em] text-ink-subtle">
              {data.experienceLabel}
            </h3>
            <ol className="flex flex-col gap-6 border-l border-ink/10 pl-6">
              {data.experiences.map((exp, i) => (
                <li key={i} className="relative flex flex-col gap-1">
                  <span
                    className={`absolute -left-[1.65rem] top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-white ${google.bg(
                      i,
                    )}`}
                    aria-hidden
                  />
                  <span className="text-xs font-medium text-ink-subtle">
                    {exp.period}
                  </span>
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
