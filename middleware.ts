import { NextRequest, NextResponse } from 'next/server';
import NextAuth from "next-auth";
import { authConfig } from "./lib/auth/auth";

const allowedOrigins = ['chrome-extension://ioomejjdkadblgacinlbjcigcakifnbf'];

export async function middleware(request: NextRequest) {
  const origin = request.headers.get('origin');

  if (origin && allowedOrigins.includes(origin)) {
    const response = NextResponse.next();
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.headers.set('Access-Control-Max-Age', '86400');

    if (request.method === 'OPTIONS') {
      return response;
    }

    return response;
  }

  return NextResponse.next();
}

export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

