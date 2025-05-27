import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  console.log("Token:", token);
  if (!token) {
    // Redirect jika tidak ada token
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  // Lanjutkan request jika token ada
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/users"],
};
