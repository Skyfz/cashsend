import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import AccountClient from '@/app/account/account-client'

export default async function AccountPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  const session = await auth()
  
  if (!session?.user) {
    redirect('/login')
  }

  return (
    <AccountClient 
      isRedirected={searchParams.redirect === 'true'}
      session={session}
    />
  )
}