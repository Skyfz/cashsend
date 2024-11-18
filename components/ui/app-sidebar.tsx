'use client'

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
  } from "@/components/ui/sidebar"
  
  import { Home, Search, Settings, User, LogOut, Wallet,CreditCard, LayoutDashboardIcon } from "lucide-react"

  import {
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
  
  import { signOut } from "next-auth/react"
  
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  
  import { useTheme } from "next-themes"
  import { Moon, Sun } from "lucide-react"
  import { Button } from "@/components/ui/button"
  import Link from 'next/link'
  
  // Menu items.
  const items = [
    {
      title: "Home",
      url: "/home",
      icon: Home,
    },
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Search",
      url: "/search",
      icon: Search,
    },
    {
      title: "Wallet",
      url: "/wallet",
      icon: Wallet,
    },
    {
      title: "Cards",
      url: "/cards",
      icon: CreditCard,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
    {
      title: "Account",
      url: "/account",
      icon: User,
    },
    {
      title: "Logout",
      url: "/logout",
      icon: LogOut,
    },
  ]
  
  export function AppSidebar() {
    const { setTheme, theme } = useTheme()
    const handleLogout = () => {
      signOut({
        callbackUrl: '/',
      })
    }

    return (
      <Sidebar>
        <SidebarHeader />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-2xl text-foreground mb-6">
              <Link href="/" className="hover:opacity-80 transition-opacity">
                Skytrade
              </Link>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    {item.url === '/logout' ? (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <SidebarMenuButton asChild onClick={() => console.log('Logout button clicked')}>
                            <a href="#">
                              <item.icon />
                              <span>{item.title}</span>
                            </a>
                          </SidebarMenuButton>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to log out of your account?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleLogout}>
                              Log out
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    ) : (
                      <SidebarMenuButton asChild>
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </SidebarFooter>
      </Sidebar>
    )
  }


  