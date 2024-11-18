import { redirect } from "next/navigation"
import Image from 'next/image'
import { BellDot } from 'lucide-react'
import Link from 'next/link'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

import { auth } from "@/lib/auth"
import { connectToDatabase } from "@/lib/db"
import { Component as LineChart } from "@/app/dashboard/components/line-chart"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const DB_NAME = 'sample_mflix'

export default async function Dashboard() {
  const session = await auth()
  
  if (session?.user) {
    let client;
    
    try {
      client = await connectToDatabase()
      await client.connect()
      const db = client.db(DB_NAME)
      
      const existingUser = await db.collection('users').findOne({
        email: session.user.email
      }, { maxTimeMS: 5000 })
      
      if (!existingUser) {
        if (client) await client.close()
        redirect('/account?from=home')
      }
      
    } catch (error) {
      console.error('Database connection error:', error)
      throw error
    } finally {
      if (client) {
        try {
          await client.close()
        } catch (error) {
          console.error('Error closing database connection:', error)
        }
      }
    }
  } else {
    redirect('/login')
  }
  
  return (
    <main className="w-full p-4 max-w-2xl mx-auto">
      <div className="w-full max-w-xl">
        <Card className="min-w-[320px] max-w-xl mx-auto">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {session?.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt="Profile picture"
                    width={50}
                    height={50}
                    className="rounded-lg"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center font-medium">
                    {session?.user?.name?.split(' ')
                      .map(name => name[0])
                      .slice(0, 2)
                      .join('')
                      .toUpperCase()}
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-bold">
                    Hello, {session?.user?.name?.split(' ')[0]}
                  </h2>
                  <p className="text-sm text-muted-foreground">Welcome back to Cashmate</p>
                </div>
              </div>
              <Popover>
                <PopoverTrigger>
                  <BellDot className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer" />
                </PopoverTrigger>
                <PopoverContent className="w-80" align="end" sideOffset={5}>
                  <div className="space-y-4 p-4">
                    <h4 className="font-medium leading-none">Notification Settings</h4>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="push">Push notifications</Label>
                      <Switch id="push" />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="email">Email notifications</Label>
                      <Switch id="email" />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="marketing">Marketing emails</Label>
                      <Switch id="marketing" />
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="w-full max-w-xl">
        <Card className="min-w-[320px] max-w-xl mx-auto mt-4">
          <CardContent className="p-8">
            <div className="flex flex-col gap-2">
              <div className="text-3xl font-bold tracking-tight subpixel-antialiased">R 5,231.89</div>
              <h3 className="text-sm font-light text-muted-foreground">Your Balance</h3>
            </div>
            <Link href="/deposit">
              <Button className="w-full mt-4">Deposit</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      <div className="w-full max-w-xl mt-4">
        <LineChart />
      </div>
    </main>
  )
}
