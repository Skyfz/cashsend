import NextAuth from "next-auth"
import Resend from "next-auth/providers/resend"
import Google from "next-auth/providers/google"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import client from "@/lib/db"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),
  providers: [Google, Resend],
  session: {
    maxAge: 30 * 60, // 15 minutes in seconds
    updateAge: 10 * 60, // Update session every 5 minutes
  },
  
})