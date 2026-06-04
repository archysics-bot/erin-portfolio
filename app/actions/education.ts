"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { education } from "@/drizzle/schema";

export async function createEducationAction(prevState: unknown, formData: FormData) {
  const schoolKo = formData.get("schoolKo") as string;
  const schoolEn = formData.get("schoolEn") as string;
  const schoolType = formData.get("schoolType") as "high_school" | "university" | "graduate";
  const majorKo = (formData.get("majorKo") as string) || null;
  const majorEn = (formData.get("majorEn") as string) || null;
  const degree = (formData.get("degree") as "bachelor" | "master" | "doctorate" || null);
  const startDate = formData.get("startDate") as string;
  const isPresent = formData.get("isPresent") === "true";
  const endDate = isPresent ? null : (formData.get("endDate") as string || null);
  const completionStatus = (formData.get("completionStatus") as "graduated" | "completed" || null);
  const sortOrderRaw = formData.get("sortOrder");
  const sortOrder = sortOrderRaw ? parseInt(sortOrderRaw as string, 10) : 0;

  if (!schoolKo || !schoolEn || !schoolType || !startDate) {
    return { success: false, error: "모든 필수 필드를 입력해주세요." };
  }

  try {
    await db.insert(education).values({
      schoolKo,
      schoolEn,
      schoolType,
      majorKo,
      majorEn,
      degree,
      startDate,
      endDate,
      completionStatus,
      sortOrder,
    });
  } catch (err: unknown) {
    console.error("Error creating education:", err);
    return { success: false, error: "데이터베이스 저장 중 오류가 발생했습니다." };
  }

  revalidatePath("/[locale]", "layout");
  redirect("/");
}

export async function updateEducationAction(id: number, prevState: unknown, formData: FormData) {
  const schoolKo = formData.get("schoolKo") as string;
  const schoolEn = formData.get("schoolEn") as string;
  const schoolType = formData.get("schoolType") as "high_school" | "university" | "graduate";
  const majorKo = (formData.get("majorKo") as string) || null;
  const majorEn = (formData.get("majorEn") as string) || null;
  const degree = (formData.get("degree") as "bachelor" | "master" | "doctorate" || null);
  const startDate = formData.get("startDate") as string;
  const isPresent = formData.get("isPresent") === "true";
  const endDate = isPresent ? null : (formData.get("endDate") as string || null);
  const completionStatus = (formData.get("completionStatus") as "graduated" | "completed" || null);
  const sortOrderRaw = formData.get("sortOrder");
  const sortOrder = sortOrderRaw ? parseInt(sortOrderRaw as string, 10) : 0;

  if (!schoolKo || !schoolEn || !schoolType || !startDate) {
    return { success: false, error: "모든 필수 필드를 입력해주세요." };
  }

  try {
    await db
      .update(education)
      .set({
        schoolKo,
        schoolEn,
        schoolType,
        majorKo,
        majorEn,
        degree,
        startDate,
        endDate,
        completionStatus,
        sortOrder,
        updatedAt: new Date(),
      })
      .where(eq(education.id, id));
  } catch (err: unknown) {
    console.error("Error updating education:", err);
    return { success: false, error: "데이터베이스 수정 중 오류가 발생했습니다." };
  }

  revalidatePath("/[locale]", "layout");
  redirect("/");
}

export async function deleteEducationAction(id: number) {
  try {
    await db.delete(education).where(eq(education.id, id));
    revalidatePath("/[locale]", "layout");
    return { success: true };
  } catch (err: unknown) {
    console.error("Error deleting education:", err);
    return { success: false, error: "삭제 중 오류가 발생했습니다." };
  }
}
