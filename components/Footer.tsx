import { Container } from "@/components/ui/Container";
import type { PortfolioContent } from "@/lib/content";

export function Footer({ data }: { data: PortfolioContent["footer"] }) {
  return (
    <footer className="border-t border-ink/5 py-10">
      <Container>
        <p className="text-xs text-ink-subtle">{data.copyright}</p>
      </Container>
    </footer>
  );
}
