"use client";

import { useActionState, startTransition, useState } from "react";
import { Link } from "@/i18n/routing";
import type { Experience } from "@/drizzle/schema";

interface ExperienceFormProps {
  initialData?: Experience | null;
  action: (prevState: unknown, formData: FormData) => Promise<{ success: boolean; error?: string } | void>;
  title: string;
}

export function ExperienceForm({ initialData, action, title }: ExperienceFormProps) {
  const [isPresent, setIsPresent] = useState(!initialData || !initialData.endDate);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // React 19 useActionState
  const [, formAction, isPending] = useActionState(
    async (prevState: unknown, formData: FormData) => {
      // Add isPresent to the formData
      formData.set("isPresent", isPresent.toString());
      try {
        const result = await action(prevState, formData);
        if (result && !result.success) {
          setErrorMsg(result.error || "오류가 발생했습니다.");
          return result;
        }
      } catch {
        setErrorMsg("서버 작업 중 요류가 발생했습니다.");
      }
    },
    null
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Simple client side validation
    if (
      !formData.get("orgKo") ||
      !formData.get("orgEn") ||
      !formData.get("roleKo") ||
      !formData.get("roleEn") ||
      !formData.get("startDate")
    ) {
      setErrorMsg("모든 필수 필드(*)를 입력해 주세요.");
      return;
    }

    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 md:p-8 bg-white border border-ink/10 rounded-2xl shadow-sm mt-8">
      <h2 className="text-2xl font-bold text-ink mb-6">{title}</h2>
      
      {errorMsg && (
        <div className="mb-6 p-4 text-sm text-google-red bg-google-red/10 rounded-xl border border-google-red/20">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Organization Name (Ko & En) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-ink-muted" htmlFor="orgKo">
              회사/기관명 (한국어) <span className="text-google-red">*</span>
            </label>
            <input
              className="px-4 py-3 rounded-xl border border-ink/10 text-ink focus:outline-none focus:ring-2 focus:ring-google-blue focus:border-transparent transition"
              type="text"
              id="orgKo"
              name="orgKo"
              defaultValue={initialData?.orgKo || ""}
              placeholder="예: 카카오"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-ink-muted" htmlFor="orgEn">
              회사/기관명 (영어) <span className="text-google-red">*</span>
            </label>
            <input
              className="px-4 py-3 rounded-xl border border-ink/10 text-ink focus:outline-none focus:ring-2 focus:ring-google-blue focus:border-transparent transition"
              type="text"
              id="orgEn"
              name="orgEn"
              defaultValue={initialData?.orgEn || ""}
              placeholder="예: Kakao"
              required
            />
          </div>
        </div>

        {/* Role / Job Description (Ko & En) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-ink-muted" htmlFor="roleKo">
              직무/역할 (한국어) <span className="text-google-red">*</span>
            </label>
            <input
              className="px-4 py-3 rounded-xl border border-ink/10 text-ink focus:outline-none focus:ring-2 focus:ring-google-blue focus:border-transparent transition"
              type="text"
              id="roleKo"
              name="roleKo"
              defaultValue={initialData?.roleKo || ""}
              placeholder="예: 서비스 기획자"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-ink-muted" htmlFor="roleEn">
              직무/역할 (영어) <span className="text-google-red">*</span>
            </label>
            <input
              className="px-4 py-3 rounded-xl border border-ink/10 text-ink focus:outline-none focus:ring-2 focus:ring-google-blue focus:border-transparent transition"
              type="text"
              id="roleEn"
              name="roleEn"
              defaultValue={initialData?.roleEn || ""}
              placeholder="예: Service Planner"
              required
            />
          </div>
        </div>

        {/* Period (Start Date & End Date) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-ink-muted" htmlFor="startDate">
              입사일자 <span className="text-google-red">*</span>
            </label>
            <input
              className="px-4 py-3 rounded-xl border border-ink/10 text-ink focus:outline-none focus:ring-2 focus:ring-google-blue focus:border-transparent transition"
              type="date"
              id="startDate"
              name="startDate"
              defaultValue={initialData?.startDate || ""}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-ink-muted" htmlFor="endDate">
                퇴사일자
              </label>
              <label className="flex items-center gap-1.5 text-xs text-ink-muted cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPresent}
                  onChange={(e) => setIsPresent(e.target.checked)}
                  className="rounded border-ink/20 text-google-blue focus:ring-google-blue"
                />
                <span>재직 중</span>
              </label>
            </div>
            <input
              className={`px-4 py-3 rounded-xl border border-ink/10 text-ink focus:outline-none focus:ring-2 focus:ring-google-blue focus:border-transparent transition ${
                isPresent ? "bg-ink/5 text-ink-subtle cursor-not-allowed" : ""
              }`}
              type="date"
              id="endDate"
              name="endDate"
              disabled={isPresent}
              defaultValue={initialData?.endDate || ""}
            />
          </div>
        </div>

        {/* Sort Order */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-ink-muted" htmlFor="sortOrder">
            정렬 순서 (낮을수록 먼저 표시됨)
          </label>
          <input
            className="px-4 py-3 rounded-xl border border-ink/10 text-ink focus:outline-none focus:ring-2 focus:ring-google-blue focus:border-transparent transition"
            type="number"
            id="sortOrder"
            name="sortOrder"
            defaultValue={initialData?.sortOrder ?? 0}
            min="0"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-4 border-t border-ink/10 pt-6">
          <Link
            href="/"
            className="px-5 py-3 rounded-xl border border-ink/10 text-ink-muted hover:bg-ink/5 font-semibold text-sm transition"
          >
            취소
          </Link>
          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-3 rounded-xl bg-google-blue hover:bg-google-blue/90 text-white font-semibold text-sm disabled:opacity-50 transition shadow-sm"
          >
            {isPending ? "저장 중..." : "저장"}
          </button>
        </div>
      </form>
    </div>
  );
}
