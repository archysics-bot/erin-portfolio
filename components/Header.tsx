import { Container } from "@/components/ui/Container";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import type { PortfolioContent } from "@/lib/content";

export function Header({ nav }: { nav: PortfolioContent["nav"] }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/5 bg-white/70 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <a
            href="#top"
            className="text-sm font-semibold tracking-tight text-ink"
          >
            Erin Lee
          </a>
          <nav className="hidden gap-8 text-sm text-ink-muted md:flex">
            <a href="#about" className="hover:text-ink">
              {nav.about}
            </a>
            <a href="#skills" className="hover:text-ink">
              {nav.skills}
            </a>
            <a href="#projects" className="hover:text-ink">
              {nav.projects}
            </a>
            <a href="#awards" className="hover:text-ink">
              {nav.awards}
            </a>
          </nav>
          <LanguageToggle />
        </div>
      </Container>
    </header>
  );
}
