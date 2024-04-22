import NextAuth, { NextAuthConfig } from "next-auth"
import Github from "next-auth/providers/github"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/db"

export const authConfig = { 
  providers: [Github],
  adapter: DrizzleAdapter(db),
  callbacks: {
    async session({session, user}) {
      session.user.id = user.id
      return session
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const paths = ["/use/quiz", "/learn/recall"]
      const isProtected = paths.some((path) => nextUrl.pathname.startsWith(path))

      if (isProtected && !isLoggedIn) {
        const redirectUrl = new URL("api/auth/signin", nextUrl.origin)
        redirectUrl.searchParams.append("callbackUrl", nextUrl.href)
        return Response.redirect(redirectUrl)
      }
      
      return true
    },
  }
} satisfies NextAuthConfig

export const { handlers, auth, signOut } = NextAuth(authConfig)
