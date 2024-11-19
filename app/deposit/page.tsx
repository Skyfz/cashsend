import { Metadata } from 'next'
import DepositClient from './deposit-client'
import { auth } from "@/lib/auth"

export const metadata: Metadata = {
  title: 'Deposit | Skytrade',
  description: 'Deposit funds into your account',
}

export default async function DepositPage() {
  const session = await auth()
  
  if (!session?.user) return null;
  
  return (
    <main>
      <DepositClient 
        user={{
          id: session.user.id ?? '',
          email: session.user.email ?? ''
        }} 
        cards={session.user.id ? [{
          id: session.user.id,
          userId: session.user.id,
          cardNumber: session.user.name ?? 'Unknown',
          brand: session.user.email ?? 'Unknown'
        }] : []} 
      />
    </main>
  )
}
