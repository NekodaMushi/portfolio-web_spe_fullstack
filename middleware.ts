
import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth/auth";
import { rateLimiter } from "./lib/utils/chat/rate-limiter";


async function chatRateLimitMiddleware(req: NextRequest) {
  const ip = req.ip ?? '127.0.0.1';

  try {
    const { success } = await rateLimiter.limit(ip);
    if (!success) return new NextResponse('Please slow down.');
  } catch (error) {
    return new NextResponse('Something went wrong, please try later.');
  }

  return NextResponse.next();
}

export async function middleware(req: NextRequest) {
  const protectedPaths = ["/use/quiz", "/use/chat", "/learn/recall"];

  if (protectedPaths.some(path => req.nextUrl.pathname.startsWith(path))) {
    const session = await auth();
    const isLoggedIn = !!session;
    

    if (!isLoggedIn) {
      const signInUrl = new URL("/api/auth/signin", req.nextUrl.origin);
      signInUrl.searchParams.set("callbackUrl", req.nextUrl.href);
      return NextResponse.redirect(signInUrl);
    }
  }

  if (req.nextUrl.pathname.startsWith('/api/ai/chat/message')) {
    return chatRateLimitMiddleware(req);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/api/ai/chat/message/:path*"
  ],
};
