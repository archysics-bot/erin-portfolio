import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { google } from "@/lib/palette";
import type { PortfolioContent } from "@/lib/content";

export function Projects({ data }: { data: PortfolioContent["projects"] }) {
  return (
    <section id="projects" className="py-24 md:py-32">
      <Container>
        <SectionHeading eyebrow="04" colorIndex={3}>
          {data.heading}
        </SectionHeading>
        <div className="flex flex-col gap-8">
          {data.items.map((project, pi) => (
            <article
              key={project.title}
              className={`group rounded-2xl border border-ink/10 p-8 transition hover:shadow-lg md:p-10 ${google.hoverBorder(
                pi,
              )}`}
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div className="flex flex-col gap-4 md:max-w-2xl">
                  <h3 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
                    {project.title}
                  </h3>
                  <p className="text-base leading-relaxed text-ink-muted">
                    {project.summary}
                  </p>
                  <ul className="mt-2 flex flex-col gap-1.5">
                    {project.impact.map((line, i) => (
                      <li
                        key={i}
                        className="relative flex items-start gap-2.5 text-sm leading-relaxed text-ink"
                      >
                        <span
                          className={`mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full ${google.bg(
                            i,
                          )}`}
                          aria-hidden
                        />
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="shrink-0 md:pt-2">
                  <span
                    className={`inline-block rounded-full border px-3 py-1 text-xs font-medium text-ink ${google.border(
                      pi,
                    )} ${google.bgSoft(pi)}`}
                  >
                    {project.role}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
