"use client";

import { useTransition } from "react";

interface DeleteButtonProps {
  id: number;
  onDelete: (id: number) => Promise<{ success: boolean; error?: string }>;
  confirmMessage?: string;
  label?: string;
}

export function DeleteButton({
  id,
  onDelete,
  confirmMessage = "정말 삭제하시겠습니까?",
  label = "삭제",
}: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    if (window.confirm(confirmMessage)) {
      startTransition(async () => {
        const result = await onDelete(id);
        if (!result.success) {
          alert(result.error || "삭제 작업 중 오류가 발생했습니다.");
        }
      });
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="text-xs font-medium text-google-red/80 hover:text-google-red hover:underline transition disabled:opacity-50"
    >
      {isPending ? "삭제 중..." : label}
    </button>
  );
}
