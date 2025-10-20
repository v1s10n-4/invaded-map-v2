import { betterFetch } from "@better-fetch/fetch";
import type { Session } from "better-auth/types";
import { type NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/account"];
const authRoutes = ["/auth/sign-in", "/auth/sign-up"];

export default async function authMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Check if the route is an auth route (sign-in, sign-up)
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Get session
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") ?? "",
      },
    }
  );

  // Redirect authenticated users away from auth pages
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect unauthenticated users to sign-in
  if (isProtectedRoute && !session) {
    const signInUrl = new URL("/auth/sign-in", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
