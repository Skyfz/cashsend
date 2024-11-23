"use client";
import { Lamp } from "@/components/ui/lamp";
import { useTheme } from "next-themes";
import { FlipWords } from "@/components/ui/flip-words";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Headset, House, Info, Moon, Sun, Play} from "lucide-react";
import { FloatingNav } from "@/components/ui/floating-navbar";


export default function Home() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  
  const words = ["Fast", "Untraceable", "Secure", "Limitless", "Reliable"];
  const navItems = [
    { name: "Home", link: "/", icon: <House /> },
    { name: "About", link: "/about", icon: <Info/> },
    { name: "Contact", link: "/contact", icon: <Headset/> },
  ];

  return (
      
    <main className="relative w-full h-screen">
      <FloatingNav navItems={navItems} className="z-50"/>
      
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
              <div className="flex text-foreground p-8">
                <Button
                  variant="ghost"
                  size="lg"
                  className="min-w-[150px]"
                  onClick={() => {
                    router.push("/login");
                  }}
                >
                  <Play className="transition-all" />
                  Start
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
