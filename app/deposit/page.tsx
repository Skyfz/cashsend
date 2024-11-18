import { Metadata } from 'next'
import DepositClient from './deposit-client'
import { auth } from "@/lib/auth"

export const metadata: Metadata = {
  title: 'Deposit | Your App Name',
  description: 'Deposit funds into your account',
}

export default async function DepositPage() {
  const session = await auth()
  
  return (
    <main>
      <DepositClient user={session?.user} />
    </main>
  )
}
