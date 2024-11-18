'use client'

import { useEffect } from 'react'
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { Loader2 } from "lucide-react"

export default function NotFound() {
  const router = useRouter()

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/')
    }, 500) // 3 seconds delay

    return () => clearTimeout(timeout)
  }, [router])

  return (
    <div className="w-full flex flex-col items-center p-4">
      <Card className="w-full p-4">
        <CardHeader>
          <h1 className="text-3xl font-bold">Page Not Found</h1>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button 
            className="w-full"
            variant="ghost"
            disabled
          >
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Redirecting
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
} 