// middleware.ts (project root)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// protect these paths
const PROTECTED = [/^\/students(\/|$)/, /^\/api\/students(\/|$)/];

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const needsAuth = PROTECTED.some((re) => re.test(path));
  if (!needsAuth) return NextResponse.next();

  const cookie = req.cookies.get("teacher")?.value;
  if (cookie === "1") return NextResponse.next();

  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = "/login";
  loginUrl.search = "";
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/students/:path*", "/api/students/:path*"],
};
