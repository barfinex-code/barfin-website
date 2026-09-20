import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const segment = request.nextUrl.pathname.split("/")[1];
  const locale = segment === "ru" || segment === "en" ? segment : "kk";
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-barfin-locale", locale);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

// Keep locale handling out of assets, API requests and crawling endpoints.
export const config = { matcher: ["/", "/ru", "/en"] };
