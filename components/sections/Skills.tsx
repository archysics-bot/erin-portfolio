import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { PortfolioContent } from "@/lib/content";

export function Skills({ data }: { data: PortfolioContent["skills"] }) {
  return (
    <section id="skills" className="py-24 md:py-32">
      <Container>
        <SectionHeading eyebrow="02">{data.heading}</SectionHeading>
        <div className="grid gap-10 md:grid-cols-2">
          {data.groups.map((group) => (
            <div key={group.label} className="flex flex-col gap-4">
              <h3 className="text-sm font-medium uppercase tracking-[0.18em] text-ink-subtle">
                {group.label}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-ink/10 px-3.5 py-1.5 text-sm text-ink"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
