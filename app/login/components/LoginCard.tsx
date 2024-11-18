"use client"

import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import {  
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import FlickeringGrid from "@/components/ui/flickering-grid"
import { useState, useEffect } from "react"
import { googleSignIn, githubSignIn } from "@/app/actions/auth"

export default function LoginCard() {
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 })

  useEffect(() => {
    setDimensions({
      height: window.innerHeight,
      width: window.innerWidth
    })

    const handleResize = () => {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="h-screen w-screen flex items-center justify-center relative overflow-hidden">
      <FlickeringGrid
        className="absolute inset-0 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
        squareSize={2}
        gridGap={2}
        color="#06B6D4"
        maxOpacity={0.8}
        flickerChance={0.1}
        height={dimensions.height}
        width={dimensions.width}
      />
      <Card className="glassCard w-full max-w-xl p-4 m-4">
        
        <div className="w-full flex flex-col p-4">
          <CardHeader className="p-4">
            <div className="flex flex-row items-center justify-between relative">
              <Link href="/" className="text-muted-foreground hover:text-foreground absolute">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </Link>
              <CardTitle className="font-bold text-2xl w-full text-center">Log in</CardTitle>
            </div>
            <CardDescription className="text-center pb-4">Choose your service provider</CardDescription>
          </CardHeader>
          
          <CardContent className="flex flex-col">
            <form action={googleSignIn} className="flex justify-center pb-4 max-w-[340px] w-full mx-auto">
              <Button className="w-full" variant="outline" type="submit">
                <FcGoogle/>
                Google
              </Button>
            </form>
            <form action={githubSignIn} className="flex justify-center max-w-[340px] w-full mx-auto">
              <Button className="w-full" variant="outline" type="submit">
                <FaGithub />
                GitHub
              </Button>
            </form>
          </CardContent>
        </div>
      </Card>
    </div>
  )
} 