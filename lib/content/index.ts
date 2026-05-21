import type { Locale } from "@/i18n/routing";
import type { PortfolioContent } from "./types";
import { ko } from "./ko";
import { en } from "./en";

export const content: Record<Locale, PortfolioContent> = { ko, en };

export type { PortfolioContent } from "./types";
