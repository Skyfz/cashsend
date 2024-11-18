import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/app-sidebar"
import { auth } from "@/lib/auth"
import { Toaster } from "@/components/ui/toaster"
import { Providers } from '@/components/providers'
import { ThemeProvider } from '@/components/theme-provider'
import { BreadcrumbNav } from "@/components/breadcrumb-nav"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Skytrade",
  description: "Investing Automation",
};

function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <SidebarProvider className="flex">
        <AppSidebar />
        <main className="w-full p-4 max-w-2xl mx-auto">
          <div className="flex max-w-xl items-center ml-4">
            <SidebarTrigger />
            <BreadcrumbNav />
          </div>
          <div>
            {children}
          </div>
        </main> 
        <Toaster />
      </SidebarProvider>
    </Providers>
  )
}

function UnauthenticatedLayout({ children }: { children: React.ReactNode }) {
  return (
      <main className="min-h-screen">
        {children}
      </main>
  )
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {session ? (
            <AuthenticatedLayout>
              {children}
            </AuthenticatedLayout>
          ) : (
            <UnauthenticatedLayout>
              {children}
            </UnauthenticatedLayout>
          )}
        </ThemeProvider>
      </body>
    </html>
  )
}