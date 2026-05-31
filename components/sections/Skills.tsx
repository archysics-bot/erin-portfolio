import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { google } from "@/lib/palette";
import type { PortfolioContent } from "@/lib/content";

export function Skills({ data }: { data: PortfolioContent["skills"] }) {
  return (
    <section id="skills" className="py-24 md:py-32">
      <Container>
        <SectionHeading eyebrow="02" colorIndex={1}>
          {data.heading}
        </SectionHeading>
        <div className="grid gap-10 md:grid-cols-2">
          {data.groups.map((group, gi) => (
            <div key={group.label} className="flex flex-col gap-4">
              <h3
                className={`flex items-center gap-2 text-sm font-medium uppercase tracking-[0.18em] text-ink-subtle`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${google.bg(gi)}`}
                  aria-hidden
                />
                {group.label}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item, ii) => {
                  const idx = gi + ii;
                  return (
                    <li
                      key={item}
                      className={`rounded-full border px-3.5 py-1.5 text-sm text-ink transition ${google.border(
                        idx,
                      )} ${google.bgSoft(idx)} ${google.hoverBgSoft(idx)}`}
                    >
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
