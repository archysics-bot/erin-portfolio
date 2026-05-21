export function SectionHeading({
  eyebrow,
  children,
}: {
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-12 flex flex-col gap-2">
      {eyebrow && (
        <span className="text-sm font-medium uppercase tracking-[0.18em] text-ink-subtle">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">
        {children}
      </h2>
    </div>
  );
}
