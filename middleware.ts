import { NextResponse, type NextRequest } from "next/server";

const protectedUserRoutes = [
  "/checkout",
  "/account",
  "/orders",
  "/wishlist",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authId = request.cookies.get("elevara-auth")?.value;
  const role = request.cookies.get("elevara-role")?.value;

  const isUserProtected = protectedUserRoutes.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
  const isAdminRoute =
    pathname === "/admin" || pathname.startsWith("/admin/");

  if (isAdminRoute && pathname !== "/login") {
    if (!authId || role !== "admin") {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("mode", "admin");
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
  }

  if (isUserProtected) {
    if (!authId || role !== "user") {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("mode", "user");
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/checkout/:path*",
    "/account/:path*",
    "/orders/:path*",
    "/wishlist/:path*",
    "/admin/:path*",
  ],
};
