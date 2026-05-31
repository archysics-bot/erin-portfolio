import { Container } from "@/components/ui/Container";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import type { PortfolioContent } from "@/lib/content";

export function Header({ nav }: { nav: PortfolioContent["nav"] }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/70 backdrop-blur">
      {/* Google 4색 키컬러 바 */}
      <div className="flex h-1 w-full" aria-hidden>
        <span className="flex-1 bg-google-blue" />
        <span className="flex-1 bg-google-red" />
        <span className="flex-1 bg-google-yellow" />
        <span className="flex-1 bg-google-green" />
      </div>
      <div className="border-b border-ink/5">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <a
              href="#top"
              className="text-sm font-semibold tracking-tight text-ink"
            >
              Erin Lee
            </a>
            <nav className="hidden gap-8 text-sm text-ink-muted md:flex">
              <a href="#about" className="transition hover:text-google-blue">
                {nav.about}
              </a>
              <a href="#skills" className="transition hover:text-google-red">
                {nav.skills}
              </a>
              <a href="#projects" className="transition hover:text-google-yellow">
                {nav.projects}
              </a>
              <a href="#awards" className="transition hover:text-google-green">
                {nav.awards}
              </a>
            </nav>
            <LanguageToggle />
          </div>
        </Container>
      </div>
    </header>
  );
}
