// import { NextRequest, NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { auth0 } from "./auth0/client";
// import { verifyJwt } from "./auth0/utils/jwt";

export async function middleware(request: NextRequest) {
  // const { pathname } = request.nextUrl;

  // if (pathname.startsWith("/api")) {
  //   const unauthorized = (message: string) =>
  //     NextResponse.json({ error: message }, { status: 401 });

  //   const authHeader = request.headers.get("authorization");
  //   if (!authHeader?.startsWith("Bearer ")) {
  //     return unauthorized("Missing or invalid Authorization header");
  //   }

  //   const token = authHeader.split(" ")[1];

  //   try {
  //     const payload = await verifyJwt(token);
  //     if (!payload?.sub) {
  //       return NextResponse.json(
  //         { error: "Invalid token: missing subject (sub)" },
  //         { status: 401 },
  //       );
  //     }
  //     return NextResponse.next();
  //   } catch {
  //     return NextResponse.json(
  //       { error: "Invalid or expired token" },
  //       { status: 401 },
  //     );
  //   }
  // }

  return auth0.middleware(request);
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
