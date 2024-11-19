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
import { googleSignIn, githubSignIn } from "@/app/actions/auth"

export default function LoginCard() {

  return (
    <div className="h-screen w-screen flex items-center justify-center relative overflow-hidden">
      <FlickeringGrid
        className="absolute -z-10"
        squareSize={5}
        gridGap={15}
        color="gray"
        maxOpacity={0.5}
        flickerChance={0.1}
        height={window.innerHeight}
        width={window.innerWidth}
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
              <CardTitle className="font-bold text-2xl w-full text-center pb-2">Log in</CardTitle>
            </div>
            <CardDescription className="text-center pb-4">Choose your service provider</CardDescription>
          </CardHeader>
          
          <CardContent className="flex flex-col">
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