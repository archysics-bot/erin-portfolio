import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { routing, type Locale } from "@/i18n/routing";
import { db } from "@/lib/db";
import { experiences } from "@/drizzle/schema";
import { updateExperienceAction } from "@/app/actions/experiences";
import { ExperienceForm } from "@/components/admin/ExperienceForm";
import { Container } from "@/components/ui/Container";

function isLocale(value: string): value is Locale {
  return (routing.locales as readonly string[]).includes(value);
}

export default async function EditExperiencePage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);

  const itemId = parseInt(id, 10);
  if (isNaN(itemId)) notFound();

  // Fetch the item
  const item = await db
    .select()
    .from(experiences)
    .where(eq(experiences.id, itemId))
    .then((rows) => rows[0]);

  if (!item) notFound();

  // Bind the ID to the update action
  const updateActionWithId = updateExperienceAction.bind(null, itemId);

  return (
    <main className="py-12 bg-ink/[0.02] min-h-screen">
      <Container>
        <ExperienceForm
          initialData={item}
          action={updateActionWithId}
          title="경력사항 수정"
        />
      </Container>
    </main>
  );
}
