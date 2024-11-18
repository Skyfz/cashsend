import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  session: {
    maxAge: 30 * 60, // 15 minutes in seconds
    updateAge: 10 * 60, // Update session every 5 minutes
  },
})