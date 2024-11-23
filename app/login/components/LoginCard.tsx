"use client"

import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { ChevronLeft, Mail } from "lucide-react"
import Link from "next/link"
import {  
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import FlickeringGrid from "@/components/ui/flickering-grid"
import { googleSignIn, githubSignIn} from "@/app/actions/auth"
import { useState, useEffect } from "react"

export default function LoginCard() {
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 })

  useEffect(() => {
    setDimensions({
      height: window.innerHeight,
      width: window.innerWidth
    })
  }, [])

  return (
    <div className="h-screen w-screen flex items-center justify-center relative overflow-hidden">
      <FlickeringGrid
        className="absolute -z-10"
        squareSize={5}
        gridGap={15}
        color="gray"
        maxOpacity={0.5}
        flickerChance={0.9}
        height={dimensions.height}
        width={dimensions.width}
      />
      <Card className="w-full max-w-xl p-4 m-4 relative z-10">
        <div className="w-full flex flex-col p-4">
          <CardHeader className="p-4">
            <div className="flex flex-row items-center justify-between relative">
              <Link href="/" className="text-muted-foreground hover:text-foreground absolute">
                <Button variant="ghost" className="h-14 w-14">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </Link>
              <CardTitle className="font-bold text-2xl w-full text-center pb-2">Welcome back</CardTitle>
            </div>
            <CardDescription className="text-center">Sign in to your account to continue</CardDescription>
          </CardHeader>
          
          <CardContent className="flex flex-col">
            {/* <form action={resendSignIn} className="flex flex-col gap-4 justify-center max-w-[340px] w-full mx-auto">
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="h-14 text-center"
              />
              <Button 
                className="w-full h-14 hover:bg-accent hover:text-accent-foreground"
                variant="outline" 
                type="submit"
              >
                <Mail className="mr-2"/>
                Sign in with email
              </Button>
            </form> */}

            <div className="relative flex justify-center items-center py-4 max-w-[340px] w-full mx-auto">
              <div className="absolute w-full border-t" />
              <span className="relative bg-background px-2 text-muted-foreground text-sm pb-4">Quick sign in with</span>
            </div>

            <form action={googleSignIn} className="flex justify-center pb-4 max-w-[340px] w-full mx-auto">
              <Button 
                className="w-full h-14 hover:bg-accent hover:text-accent-foreground"
                variant="outline" 
                type="submit"
              >
                <FcGoogle className="mr-2"/>
                Google
              </Button>
            </form>
            <form action={githubSignIn} className="flex justify-center max-w-[340px] w-full mx-auto">
              <Button 
                className="w-full h-14 hover:bg-accent hover:text-accent-foreground"
                variant="outline" 
                type="submit"
              >
                <FaGithub className="mr-2"/>
                GitHub
              </Button>
            </form>
          </CardContent>
        </div>
      </Card>
    </div>
  )
} 