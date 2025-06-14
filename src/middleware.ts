
import { jwtDecode } from "jwt-decode";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  // if (!token) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  // try {
  //   const userInfo = jwtDecode<{ role?: string; exp: number }>(token);

  //   // Check token expiration
  //   if (userInfo.exp && userInfo.exp * 1000 < Date.now()) {
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }

  //   // Check role for admin-only pages
  //   if (
  //     request.nextUrl.pathname.startsWith("/dashboard") &&
  //     userInfo.role !== "ADMIN"
  //   ) {
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }
  // } catch (error) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  return NextResponse.next(); // allow access
}

export const config = {
  matcher: ["/dashboard/:path*"], // applies to /dashboard and all nested routes
};
