import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { auth } from "@/lib/auth"
import { Providers } from '@/components/providers'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthenticatedLayout } from "@/app/components/layouts/authenticated-layout";
import { SpeedInsights } from "@vercel/speed-insights/next"


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
  title: "Cashsend",
  description: "Investing Automation",
};

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
            <Providers>
              <AuthenticatedLayout>
                {children}
              </AuthenticatedLayout>
            </Providers>
          ) : (
            <UnauthenticatedLayout>
              {children}
            </UnauthenticatedLayout>
          )}
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  )
}