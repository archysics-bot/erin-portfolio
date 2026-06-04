"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { experiences } from "@/drizzle/schema";

export async function createExperienceAction(prevState: unknown, formData: FormData) {
  const orgKo = formData.get("orgKo") as string;
  const orgEn = formData.get("orgEn") as string;
  const roleKo = formData.get("roleKo") as string;
  const roleEn = formData.get("roleEn") as string;
  const startDate = formData.get("startDate") as string;
  const isPresent = formData.get("isPresent") === "true";
  const endDate = isPresent ? null : (formData.get("endDate") as string || null);
  const sortOrderRaw = formData.get("sortOrder");
  const sortOrder = sortOrderRaw ? parseInt(sortOrderRaw as string, 10) : 0;

  if (!orgKo || !orgEn || !roleKo || !roleEn || !startDate) {
    return { success: false, error: "모든 필수 필드를 입력해주세요." };
  }

  try {
    await db.insert(experiences).values({
      orgKo,
      orgEn,
      roleKo,
      roleEn,
      startDate,
      endDate,
      sortOrder,
    });
  } catch (err: unknown) {
    console.error("Error creating experience:", err);
    return { success: false, error: "데이터베이스 저장 중 오류가 발생했습니다." };
  }

  revalidatePath("/[locale]", "layout");
  redirect("/");
}

export async function updateExperienceAction(id: number, prevState: unknown, formData: FormData) {
  const orgKo = formData.get("orgKo") as string;
  const orgEn = formData.get("orgEn") as string;
  const roleKo = formData.get("roleKo") as string;
  const roleEn = formData.get("roleEn") as string;
  const startDate = formData.get("startDate") as string;
  const isPresent = formData.get("isPresent") === "true";
  const endDate = isPresent ? null : (formData.get("endDate") as string || null);
  const sortOrderRaw = formData.get("sortOrder");
  const sortOrder = sortOrderRaw ? parseInt(sortOrderRaw as string, 10) : 0;

  if (!orgKo || !orgEn || !roleKo || !roleEn || !startDate) {
    return { success: false, error: "모든 필수 필드를 입력해주세요." };
  }

  try {
    await db
      .update(experiences)
      .set({
        orgKo,
        orgEn,
        roleKo,
        roleEn,
        startDate,
        endDate,
        sortOrder,
        updatedAt: new Date(),
      })
      .where(eq(experiences.id, id));
  } catch (err: unknown) {
    console.error("Error updating experience:", err);
    return { success: false, error: "데이터베이스 수정 중 오류가 발생했습니다." };
  }

  revalidatePath("/[locale]", "layout");
  redirect("/");
}

export async function deleteExperienceAction(id: number) {
  try {
    await db.delete(experiences).where(eq(experiences.id, id));
    revalidatePath("/[locale]", "layout");
    return { success: true };
  } catch (err: unknown) {
    console.error("Error deleting experience:", err);
    return { success: false, error: "삭제 중 오류가 발생했습니다." };
  }
}
