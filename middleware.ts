import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  // Debug session info
  const session = await auth()
  console.log('🔍 Debug - Session:', session ? 'Authenticated' : 'Not authenticated')

  // Debug URL info
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth')
  const isPublicPage = request.nextUrl.pathname === '/' || request.nextUrl.pathname === '/login'
  console.log('🔍 Debug - Path:', {
    path: request.nextUrl.pathname,
    isAuthPage,
    isPublicPage
  })
 
  // If user is not authenticated, only allow public and auth pages
  if (!session) {
    console.log('⚠️ No session - Checking access permissions...')
    if (!isPublicPage && !isAuthPage) {
      console.log('🚫 Access denied - Redirecting to home')
      return NextResponse.redirect(new URL('/', request.url))
    }
    console.log('✅ Access granted to public/auth page')
    return NextResponse.next()
  }

  // If user is authenticated...
  console.log('👤 User authenticated - Checking access permissions...')
  if (isAuthPage || isPublicPage) {
    console.log('🔄 Redirecting authenticated user to dashboard')
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
    
  console.log('✅ Access granted to protected page')
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
} 
