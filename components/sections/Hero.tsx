import { Container } from "@/components/ui/Container";
import { GOOGLE_GRADIENT } from "@/lib/palette";
import type { PortfolioContent } from "@/lib/content";

export function Hero({ data }: { data: PortfolioContent["hero"] }) {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 md:pt-48 md:pb-32">
      {/* Google 키컬러 블롭 배경 */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-google-blue/20 blur-3xl" />
        <div className="absolute top-10 right-0 h-72 w-72 rounded-full bg-google-red/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-google-yellow/20 blur-3xl" />
        <div className="absolute -bottom-16 right-1/4 h-72 w-72 rounded-full bg-google-green/20 blur-3xl" />
      </div>

      <Container>
        <div className="flex flex-col gap-6">
          <span className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.22em] text-ink-subtle">
            <span className="flex gap-1" aria-hidden>
              <span className="h-2 w-2 rounded-full bg-google-blue" />
              <span className="h-2 w-2 rounded-full bg-google-red" />
              <span className="h-2 w-2 rounded-full bg-google-yellow" />
              <span className="h-2 w-2 rounded-full bg-google-green" />
            </span>
            {data.location}
          </span>
          <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">
            <span
              className={`bg-clip-text text-transparent ${GOOGLE_GRADIENT}`}
            >
              {data.name}
            </span>
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-ink-muted md:text-xl">
            {data.tagline}
          </p>
        </div>
      </Container>
    </section>
  );
}
