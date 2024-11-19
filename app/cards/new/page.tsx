import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { connectToDatabase } from "@/lib/db"
import CardForm from "./card-form"

const DB_NAME = 'sample_mflix'

export default async function NewPaymentMethod() {
  const session = await auth()
  
  if (!session?.user?.email) {
    redirect('/login')
  }

  try {
    const client = await connectToDatabase()
    const db = client.db(DB_NAME)
    
    const existingUser = await db.collection('users').findOne({
      email: session.user.email
    }, { maxTimeMS: 5000 })
    
    if (!existingUser) {
      redirect('/account?from=cards')
    }
  } catch (error) {
    console.error('Database connection error:', error)
    throw error
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <CardForm userEmail={session.user.email} />
    </div>
  )
}
