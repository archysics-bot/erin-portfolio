import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { google } from "@/lib/palette";
import type { PortfolioContent } from "@/lib/content";

export function Awards({ data }: { data: PortfolioContent["awards"] }) {
  return (
    <section id="awards" className="py-24 md:py-32">
      <Container>
        <SectionHeading eyebrow="04" colorIndex={3}>
          {data.heading}
        </SectionHeading>
        <ol className="flex flex-col">
          {data.items.map((award, i) => (
            <li
              key={`${award.year}-${award.title}`}
              className={`grid grid-cols-[5rem_1fr] gap-6 py-6 md:grid-cols-[8rem_1fr_auto] md:gap-10 ${
                i !== 0 ? "border-t border-ink/10" : ""
              }`}
            >
              <span className="flex items-center gap-2 text-base font-medium text-ink md:text-lg">
                <span
                  className={`h-2 w-2 rounded-full ${google.bg(i)}`}
                  aria-hidden
                />
                {award.year}
              </span>
              <span className="text-base text-ink md:text-lg">
                {award.title}
              </span>
              <span className="col-span-2 text-sm text-ink-muted md:col-span-1 md:text-right">
                {award.issuer}
              </span>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
