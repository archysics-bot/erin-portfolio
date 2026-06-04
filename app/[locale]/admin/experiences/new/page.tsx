import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { createExperienceAction } from "@/app/actions/experiences";
import { ExperienceForm } from "@/components/admin/ExperienceForm";
import { Container } from "@/components/ui/Container";

function isLocale(value: string): value is Locale {
  return (routing.locales as readonly string[]).includes(value);
}

export default async function NewExperiencePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);

  return (
    <main className="py-12 bg-ink/[0.02] min-h-screen">
      <Container>
        <ExperienceForm
          action={createExperienceAction}
          title="새 경력 추가"
        />
      </Container>
    </main>
  );
}
