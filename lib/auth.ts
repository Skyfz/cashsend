import { NextAuthConfig } from "next-auth"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import client from "@/lib/db"

if (!process.env.AUTH_GOOGLE_ID || !process.env.AUTH_GOOGLE_SECRET || !process.env.AUTH_GITHUB_ID || !process.env.AUTH_GITHUB_SECRET) {
  throw new Error('Missing OAuth Credentials')
}

export const authConfig: NextAuthConfig = {
  adapter: MongoDBAdapter(client),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl + "/dashboard"
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnLogin = nextUrl.pathname.startsWith('/login')
      
      if (isLoggedIn && isOnLogin) {
        return Response.redirect(new URL('/dashboard', nextUrl))
      }
      
      if (!isLoggedIn && !isOnLogin) {
        return Response.redirect(new URL('/login', nextUrl))
      }
      
      return true
    }
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.AUTH_SECRET,
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}