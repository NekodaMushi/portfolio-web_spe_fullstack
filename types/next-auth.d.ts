import NextAuth, {DefaultSession} from "next-auth";

declare module "next-auth" {
  
  interface Session {
    user: {
      id: string
    } & DefaultSession["user"]
  }
}

// Extanding the session to be able to hold user id
