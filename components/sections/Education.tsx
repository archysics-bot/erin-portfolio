import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { google } from "@/lib/palette";
import type { PortfolioContent } from "@/lib/content";
import { Link } from "@/i18n/routing";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteEducationAction } from "@/app/actions/education";

export type EducationItem = {
  id: number;
  period: string;
  school: string;
  /** "대학원 · 도시설계 석사 · 졸업" 처럼 조합된 한 줄 설명 */
  line: string;
};

export function Education({
  data,
  items,
}: {
  data: PortfolioContent["education"];
  items: EducationItem[];
}) {
  return (
    <section id="education" className="py-24 md:py-32">
      <Container>
        <div className="flex justify-between items-end">
          <div className="flex-1">
            <SectionHeading eyebrow="02" colorIndex={1}>
              {data.heading}
            </SectionHeading>
          </div>
          <div className="mb-12">
            <Link
              href="/admin/education/new"
              className="text-sm font-semibold text-google-blue hover:text-google-blue/80 hover:underline flex items-center gap-1 transition"
            >
              + 학력 추가
            </Link>
          </div>
        </div>
        <ol className="flex flex-col gap-6 border-l border-ink/10 pl-6">
          {items.map((edu, i) => (
            <li key={i} className="relative flex flex-col gap-1">
              <span
                className={`absolute -left-[1.65rem] top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-white ${google.bg(
                  i,
                )}`}
                aria-hidden
              />
              <div className="flex justify-between items-start gap-4">
                <span className="text-xs font-medium text-ink-subtle">
                  {edu.period}
                </span>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/education/${edu.id}/edit`}
                    className="text-xs font-medium text-google-blue/80 hover:text-google-blue hover:underline transition"
                  >
                    수정
                  </Link>
                  <span className="text-ink/10 text-xs">|</span>
                  <DeleteButton
                    id={edu.id}
                    onDelete={deleteEducationAction}
                  />
                </div>
              </div>
              <span className="text-base font-medium text-ink md:text-lg">
                {edu.school}
              </span>
              <span className="text-sm leading-relaxed text-ink-muted">
                {edu.line}
              </span>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
