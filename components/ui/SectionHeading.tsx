import { google } from "@/lib/palette";

export function SectionHeading({
  eyebrow,
  colorIndex = 0,
  children,
}: {
  eyebrow?: string;
  /** Google 4색 중 어떤 색을 강조에 쓸지 (0=파랑,1=빨강,2=노랑,3=초록) */
  colorIndex?: number;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-12 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <span
          className={`h-1.5 w-8 rounded-full ${google.bg(colorIndex)}`}
          aria-hidden
        />
        {eyebrow && (
          <span
            className={`text-sm font-semibold uppercase tracking-[0.18em] ${google.text(
              colorIndex,
            )}`}
          >
            {eyebrow}
          </span>
        )}
      </div>
      <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">
        {children}
      </h2>
    </div>
  );
}
