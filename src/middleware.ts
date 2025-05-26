import { NextRequest, NextResponse } from "next/server";

// Define public paths that don't require authentication
const publicPaths = [
  '/',
  '/auth/signin',
  '/dashboard',
  '/stock-ins',
  '/stock-outs',
  '/purchase-requests',
  '/purchase-orders',
  '/reminders',
];

// Define admin paths that require authentication
const adminPaths = [
  '/areas',
  '/machines',
  '/racks',
  '/kanbans',
  '/operators',
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token");

  // Allow access to public paths without redirection
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Check authentication for admin paths
  if (adminPaths.some(path => pathname.startsWith(path))) {
    if (!token) {
      const url = new URL("/", req.url);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Default behavior for other paths
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}; 