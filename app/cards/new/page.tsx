import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import CardForm from "./card-form"

export default async function NewPaymentMethod() {
  const session = await auth()
  
  if (!session?.user) {
    redirect('/login')
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <CardForm/>
    </div>
  )
}
