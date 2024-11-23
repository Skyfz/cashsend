"use client";
import { Lamp } from "@/components/ui/lamp";
import { useTheme } from "next-themes";
import { FlipWords } from "@/components/ui/flip-words";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Moon, Sun, User } from "lucide-react";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  
  const words = ["Fast", "Untraceable", "Secure", "Limitless", "Reliable"];
 

    return (
      <main className="relative w-full h-screen">
        {/* Background Layer (Bottom) */}
        <div className="w-full h-screen">
          <div className="absolute inset-0 w-full h-full z-0">
            <BackgroundGradientAnimation />
          </div>

          {/* Text Layer (Top) */}
          <div className="absolute inset-0 w-full h-full z-20 flex flex-col items-center justify-center">
            <div className="flex text-4xl mx-auto text-secondary">
              <FlipWords words={words} className="md:text-6xl lg:text-8xl" />
              <div className="md:text-6xl lg:text-8xl font-light">Money</div>
            </div>
              <div className="flex text-secondary p-6">
                <Button
                  variant="ghost"
                  size="lg"
                  className="min-w-[150px]"
                  onClick={() => {
                    router.push("/login");
                  }}
                >
                  <User className="transition-all" />
                  Log In
                </Button>
                
                <Button
                  variant="ghost"
                  size="lg"
                  className="min-w-[150px]"
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                  <Sun className="transition-all dark:hidden" />
                  <Moon className="transition-all hidden dark:block" />
                  Theme
                </Button>
              </div>
          </div>
        </div>
        
        <div className="flex justify-center items-center">
          <Lamp />
        </div>
      </main>
    );
}
