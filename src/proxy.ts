import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// ──────────────────────────────────────────────
// Route definitions
// ──────────────────────────────────────────────

/** Routes that require any authenticated user */
const protectedPatterns = [
  "/equipment",
  "/cart",
  "/borrow",
];

/** Routes that require the admin role */
const adminPatterns = ["/admin"];

// ──────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────

function isProtectedRoute(pathname: string): boolean {
  return protectedPatterns.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

function isAdminRoute(pathname: string): boolean {
  return adminPatterns.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

// ──────────────────────────────────────────────
// Proxy Middleware
// ──────────────────────────────────────────────

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Let NextAuth API calls pass through immediately
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Retrieve the JWT token securely from request cookies
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isLoggedIn = !!token;
  const originalUrl = `${pathname}${search}`;

  // ── Redirect logged-in users away from /login ──
  if (pathname === "/login" && isLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // ── Protect authenticated routes ──────────────
  if (isProtectedRoute(pathname) && !isLoggedIn) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", originalUrl);
    return NextResponse.redirect(loginUrl);
  }

  // ── Protect admin routes ──────────────────────
  if (isAdminRoute(pathname)) {
    // 1. Not logged in → redirect to /login with callbackUrl
    if (!isLoggedIn) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", originalUrl);
      return NextResponse.redirect(loginUrl);
    }

    // 2. Logged in but not an admin → redirect to /equipment
    if (token.role !== "admin") {
      return NextResponse.redirect(new URL("/equipment", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - public assets (images, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)",
  ],
};
