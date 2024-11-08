import NextAuth, { NextAuthConfig } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/db"
import getDomain from "@/lib/getDomain";

const domain = getDomain();
export const authConfig = { 
  providers: [GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }), GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),],
  adapter: DrizzleAdapter(db),
  callbacks: {
    async session({session, user}) {
      session.user.id = user.id
      return session
    },
    // needs this for google auth
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const paths = ["/use/quiz", "/use/chat","/learn/recall"]

      const isProtected = paths.some((path) => nextUrl.pathname.startsWith(path))

      if (isProtected && !isLoggedIn) {
        console.log(domain)
        const redirectUrl = new URL("api/auth/signin", domain)
        redirectUrl.searchParams.append("callbackUrl", nextUrl.href)
        return Response.redirect(redirectUrl)
      }
      
      return true
    },
  }
} satisfies NextAuthConfig

export const { handlers, auth, signOut } = NextAuth(authConfig)
