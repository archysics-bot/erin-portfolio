import { createServerClient } from "@supabase/ssr";
import type { NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

/**
 * next-intl이 생성한 response에 Supabase 세션 쿠키를 덧입히고 세션을 갱신한다.
 * 루트 middleware.ts에서 locale 라우팅 처리 후 호출하는 용도.
 */
export const updateSession = async (
  request: NextRequest,
  response: NextResponse,
) => {
  const supabase = createServerClient(supabaseUrl!, supabaseKey!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          request.cookies.set(name, value);
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  // createServerClient와 getUser() 사이에 다른 로직을 넣지 말 것 (세션 갱신 보장).
  await supabase.auth.getUser();

  return response;
};
