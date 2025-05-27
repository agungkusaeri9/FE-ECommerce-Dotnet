import { NextRequest, NextResponse } from "next/server";

// Public paths yang bebas akses tanpa login
const publicPaths = [
  "/",
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token");

  // Jika request ke public path, biarkan lanjut
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Cek apakah path dimulai dengan /admin
  if (pathname.startsWith("/admin")) {
    if (!token) {
      const url = new URL("/", req.url);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/admin",
  ],
};
