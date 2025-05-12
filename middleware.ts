import { NextRequest, NextResponse } from "next/server";
import { auth0 } from "@/lib/auth/auth0-client";
import { verifyJwt } from "@/lib/auth/verify-jwt";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api")) {
    const authHeader = request.headers.get("authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Missing or invalid Authorization header" },
        { status: 401 },
      );
    }

    const token = authHeader.split(" ")[1];
    const { payload } = await verifyJwt(token);

    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith("/auth")) {
    return await auth0.middleware(request);
  }

  const session = await auth0.getSession();
  if (!session) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return await auth0.middleware(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
