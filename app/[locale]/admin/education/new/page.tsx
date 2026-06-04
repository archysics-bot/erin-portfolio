import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { createEducationAction } from "@/app/actions/education";
import { EducationForm } from "@/components/admin/EducationForm";
import { Container } from "@/components/ui/Container";

function isLocale(value: string): value is Locale {
  return (routing.locales as readonly string[]).includes(value);
}

export default async function NewEducationPage({
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
        <EducationForm
          action={createEducationAction}
          title="새 학력 추가"
        />
      </Container>
    </main>
  );
}
