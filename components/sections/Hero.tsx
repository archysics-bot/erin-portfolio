import { Container } from "@/components/ui/Container";
import type { PortfolioContent } from "@/lib/content";

export function Hero({ data }: { data: PortfolioContent["hero"] }) {
  return (
    <section className="pt-32 pb-24 md:pt-48 md:pb-32">
      <Container>
        <div className="flex flex-col gap-6">
          <span className="text-sm font-medium uppercase tracking-[0.22em] text-ink-subtle">
            {data.location}
          </span>
          <h1 className="text-5xl font-semibold tracking-tight text-ink md:text-7xl">
            {data.name}
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-ink-muted md:text-xl">
            {data.tagline}
          </p>
        </div>
      </Container>
    </section>
  );
}
