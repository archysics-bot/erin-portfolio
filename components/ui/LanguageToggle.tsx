"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { useTransition } from "react";

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchTo = (next: "ko" | "en") => {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div
      className="inline-flex items-center rounded-full border border-ink/10 bg-white/70 p-0.5 text-xs font-medium backdrop-blur"
      aria-disabled={isPending}
    >
      <button
        type="button"
        onClick={() => switchTo("ko")}
        className={`rounded-full px-3 py-1 transition ${
          locale === "ko"
            ? "bg-ink text-white"
            : "text-ink-muted hover:text-ink"
        }`}
        aria-pressed={locale === "ko"}
      >
        KO
      </button>
      <button
        type="button"
        onClick={() => switchTo("en")}
        className={`rounded-full px-3 py-1 transition ${
          locale === "en"
            ? "bg-ink text-white"
            : "text-ink-muted hover:text-ink"
        }`}
        aria-pressed={locale === "en"}
      >
        EN
      </button>
    </div>
  );
}
