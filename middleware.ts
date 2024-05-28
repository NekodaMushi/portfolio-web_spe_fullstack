import NextAuth from "next-auth";
import { authConfig } from "./lib/auth/auth";
import { NextRequest, NextResponse } from "next/server";
import { rateLimiter } from "./lib/utils/chat/rate-limiter";

// NextAuth handler
export default NextAuth(authConfig).auth;

// Chat limiting rate
export async function middleware(req: NextRequest) {
  const ip = req.ip ?? '127.0.0.1';

  if (req.nextUrl.pathname.startsWith('/api/chat/message')) {
    try {
      const { success } = await rateLimiter.limit(ip);
      if (!success) return new NextResponse('Please slow down.');
    } catch (error) {
      return new NextResponse('Something went wrong, please try later.');
    }
  }


  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/api/chat/message/:path*"
  ],
};
