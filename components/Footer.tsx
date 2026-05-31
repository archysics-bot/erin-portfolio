import { Container } from "@/components/ui/Container";
import type { PortfolioContent } from "@/lib/content";

export function Footer({ data }: { data: PortfolioContent["footer"] }) {
  return (
    <footer className="border-t border-ink/5 py-10">
      <Container>
        <div className="flex items-center gap-3">
          <span className="flex gap-1" aria-hidden>
            <span className="h-2 w-2 rounded-full bg-google-blue" />
            <span className="h-2 w-2 rounded-full bg-google-red" />
            <span className="h-2 w-2 rounded-full bg-google-yellow" />
            <span className="h-2 w-2 rounded-full bg-google-green" />
          </span>
          <p className="text-xs text-ink-subtle">{data.copyright}</p>
        </div>
      </Container>
    </footer>
  );
}
