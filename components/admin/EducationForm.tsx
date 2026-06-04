"use client";

import { useActionState, startTransition, useState } from "react";
import { Link } from "@/i18n/routing";
import type { Education } from "@/drizzle/schema";

interface EducationFormProps {
  initialData?: Education | null;
  action: (prevState: unknown, formData: FormData) => Promise<{ success: boolean; error?: string } | void>;
  title: string;
}

export function EducationForm({ initialData, action, title }: EducationFormProps) {
  const [isPresent, setIsPresent] = useState(!initialData || !initialData.endDate);
  const [schoolType, setSchoolType] = useState<string>(initialData?.schoolType || "university");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // React 19 useActionState
  const [, formAction, isPending] = useActionState(
    async (prevState: unknown, formData: FormData) => {
      formData.set("isPresent", isPresent.toString());
      try {
        const result = await action(prevState, formData);
        if (result && !result.success) {
          setErrorMsg(result.error || "오류가 발생했습니다.");
          return result;
        }
      } catch {
        setErrorMsg("서버 작업 중 오류가 발생했습니다.");
      }
    },
    null
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    const form = e.currentTarget;
    const formData = new FormData(form);

    if (
      !formData.get("schoolKo") ||
      !formData.get("schoolEn") ||
      !formData.get("schoolType") ||
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
        {/* School Name (Ko & En) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-ink-muted" htmlFor="schoolKo">
              학교명 (한국어) <span className="text-google-red">*</span>
            </label>
            <input
              className="px-4 py-3 rounded-xl border border-ink/10 text-ink focus:outline-none focus:ring-2 focus:ring-google-blue focus:border-transparent transition"
              type="text"
              id="schoolKo"
              name="schoolKo"
              defaultValue={initialData?.schoolKo || ""}
              placeholder="예: 홍익대학교"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-ink-muted" htmlFor="schoolEn">
              학교명 (영어) <span className="text-google-red">*</span>
            </label>
            <input
              className="px-4 py-3 rounded-xl border border-ink/10 text-ink focus:outline-none focus:ring-2 focus:ring-google-blue focus:border-transparent transition"
              type="text"
              id="schoolEn"
              name="schoolEn"
              defaultValue={initialData?.schoolEn || ""}
              placeholder="예: Hongik University"
              required
            />
          </div>
        </div>

        {/* School Type */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-ink-muted" htmlFor="schoolType">
            학교 구분 <span className="text-google-red">*</span>
          </label>
          <select
            className="px-4 py-3 rounded-xl border border-ink/10 text-ink bg-white focus:outline-none focus:ring-2 focus:ring-google-blue focus:border-transparent transition"
            id="schoolType"
            name="schoolType"
            value={schoolType}
            onChange={(e) => setSchoolType(e.target.value)}
            required
          >
            <option value="high_school">고등학교</option>
            <option value="university">대학교</option>
            <option value="graduate">대학원</option>
          </select>
        </div>

        {/* Show Major / Degree only if it's not high school */}
        {schoolType !== "high_school" && (
          <>
            {/* Major (Ko & En) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-ink-muted" htmlFor="majorKo">
                  전공 (한국어)
                </label>
                <input
                  className="px-4 py-3 rounded-xl border border-ink/10 text-ink focus:outline-none focus:ring-2 focus:ring-google-blue focus:border-transparent transition"
                  type="text"
                  id="majorKo"
                  name="majorKo"
                  defaultValue={initialData?.majorKo || ""}
                  placeholder="예: 도시공학과"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-ink-muted" htmlFor="majorEn">
                  전공 (영어)
                </label>
                <input
                  className="px-4 py-3 rounded-xl border border-ink/10 text-ink focus:outline-none focus:ring-2 focus:ring-google-blue focus:border-transparent transition"
                  type="text"
                  id="majorEn"
                  name="majorEn"
                  defaultValue={initialData?.majorEn || ""}
                  placeholder="예: Urban Engineering"
                />
              </div>
            </div>

            {/* Degree */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-ink-muted" htmlFor="degree">
                학위
              </label>
              <select
                className="px-4 py-3 rounded-xl border border-ink/10 text-ink bg-white focus:outline-none focus:ring-2 focus:ring-google-blue focus:border-transparent transition"
                id="degree"
                name="degree"
                defaultValue={initialData?.degree || ""}
              >
                <option value="">선택 안 함</option>
                <option value="bachelor">학사</option>
                <option value="master">석사</option>
                <option value="doctorate">박사</option>
              </select>
            </div>
          </>
        )}

        {/* Period (Start Date & End Date) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-ink-muted" htmlFor="startDate">
              입학일자 <span className="text-google-red">*</span>
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
                졸업일자
              </label>
              <label className="flex items-center gap-1.5 text-xs text-ink-muted cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPresent}
                  onChange={(e) => setIsPresent(e.target.checked)}
                  className="rounded border-ink/20 text-google-blue focus:ring-google-blue"
                />
                <span>재학 중</span>
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

        {/* Completion Status */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-ink-muted" htmlFor="completionStatus">
            졸업 / 수료 상태
          </label>
          <select
            className="px-4 py-3 rounded-xl border border-ink/10 text-ink bg-white focus:outline-none focus:ring-2 focus:ring-google-blue focus:border-transparent transition"
            id="completionStatus"
            name="completionStatus"
            defaultValue={initialData?.completionStatus || ""}
          >
            <option value="">선택 안 함</option>
            <option value="graduated">졸업</option>
            <option value="completed">수료</option>
          </select>
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
