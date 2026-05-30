import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { updateSession } from "./utils/supabase/middleware";

const handleI18nRouting = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  // 1) next-intl locale 라우팅/리다이렉트 응답을 먼저 만든다.
  const response = handleI18nRouting(request);
  // 2) 같은 응답에 Supabase 세션 쿠키를 덧입히고 세션을 갱신한다.
  return updateSession(request, response);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
