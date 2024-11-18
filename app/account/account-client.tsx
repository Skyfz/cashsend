'use client'

import { useEffect } from 'react'
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import AccountForm from "@/components/account-form"
import { Session } from "next-auth"

interface AccountClientProps {
  session: Session
  isRedirected: boolean
}

export default function AccountClient({
  session,
  isRedirected
}: AccountClientProps) {
  const { toast } = useToast()
  
  useEffect(() => {
    if (isRedirected) {
      toast({
        variant: "destructive",
        title: "Profile not found",
        description: "Complete your profile before using the app.",
      })
    }
  }, [isRedirected, toast])

  return (
    <div>
      <Card className="m-4">
        <CardHeader>
          <CardTitle>Complete Your Profile</CardTitle>
          <CardDescription>Please update your information</CardDescription>
        </CardHeader>
        <CardContent className="!w-full">
          <AccountForm 
            initialData={{
              name: session.user?.name || '',
              email: session.user?.email || '',
              image: session.user?.image || '',
            }} 
          />
        </CardContent>
      </Card>
    </div>
  )
} 