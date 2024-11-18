import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  const session = await auth()
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth')
  const isPublicPage = request.nextUrl.pathname === '/' || request.nextUrl.pathname === '/login'
 
  // If user is not authenticated, only allow public and auth pages
  if (!session) {
    if (!isPublicPage && !isAuthPage) {
      return NextResponse.redirect(new URL('/', request.url))
    }
    return NextResponse.next()
  }

  // If user is authenticated...
  if (session) {
    // Don't allow access to public/auth pages (redirect to home)
    if (isAuthPage || isPublicPage) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    
    // Allow access to account and all other protected pages
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
} 
