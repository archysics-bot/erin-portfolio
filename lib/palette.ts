// Google 키컬러 사이클 헬퍼.
// Tailwind JIT가 정적으로 스캔할 수 있도록 반드시 "전체 클래스명"을 그대로 나열한다.
// (문자열 동적 조합 금지 — 클래스가 purge됨)

export const GOOGLE_ORDER = ["blue", "red", "yellow", "green"] as const;

const text = [
  "text-google-blue",
  "text-google-red",
  "text-google-yellow",
  "text-google-green",
];

const bg = [
  "bg-google-blue",
  "bg-google-red",
  "bg-google-yellow",
  "bg-google-green",
];

const border = [
  "border-google-blue",
  "border-google-red",
  "border-google-yellow",
  "border-google-green",
];

const bgSoft = [
  "bg-google-blue/10",
  "bg-google-red/10",
  "bg-google-yellow/10",
  "bg-google-green/10",
];

const hoverBgSoft = [
  "hover:bg-google-blue/20",
  "hover:bg-google-red/20",
  "hover:bg-google-yellow/20",
  "hover:bg-google-green/20",
];

const hoverBorder = [
  "hover:border-google-blue",
  "hover:border-google-red",
  "hover:border-google-yellow",
  "hover:border-google-green",
];

const hoverText = [
  "hover:text-google-blue",
  "hover:text-google-red",
  "hover:text-google-yellow",
  "hover:text-google-green",
];

const pick = (arr: string[], i: number) => arr[i % arr.length];

/** index를 4색(파랑·빨강·노랑·초록)으로 순환 매핑 */
export const google = {
  text: (i: number) => pick(text, i),
  bg: (i: number) => pick(bg, i),
  border: (i: number) => pick(border, i),
  bgSoft: (i: number) => pick(bgSoft, i),
  hoverBgSoft: (i: number) => pick(hoverBgSoft, i),
  hoverBorder: (i: number) => pick(hoverBorder, i),
  hoverText: (i: number) => pick(hoverText, i),
};

/** Google 4색 대각선 그라데이션 (배경/텍스트 클립용) */
export const GOOGLE_GRADIENT =
  "bg-[linear-gradient(120deg,#4285F4_0%,#EA4335_38%,#FBBC05_68%,#34A853_100%)]";
