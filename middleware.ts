import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

/*
 * Middleware for handling authentication and authorization
 * This code runs on every request to protected routes
 * It checks if the user is authenticated and has the required permissions
 * If not, it redirects them to the appropriate page
 * 
 * @param request - The incoming request object
 * @returns NextResponse
 */
export async function middleware(request: NextRequest) {
  console.log('🔒 Middleware: Checking authentication...')
  // Get the token from the request
  const token = await getToken({ req: request })
  console.log('🎫 Token:', token)
  
  // PROTECT API ROUTES
  // All API routes require authentication
  if (request.nextUrl.pathname.startsWith('/api')) {
    console.log('🛡️ Protecting API route:', request.nextUrl.pathname)
    if (!token) {
      console.log('❌ No token found - Access Denied!')
      return new NextResponse(
        JSON.stringify({ error: 'Authentication required' }),
        { status: 401 }
      )
    }
    console.log('✅ Access granted to public/auth page')
    console.log(`🔍 User is attempting to access: ${request.nextUrl.pathname}`);

    return NextResponse.next()
  }

  // PROTECT ADMIN ROUTES
  // Only users with admin role can access these routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    console.log('👑 Checking admin access:', request.nextUrl.pathname)
    if (!token || token.role !== 'admin') {
      console.log('🚫 Non-admin access attempt - redirecting to login')
      return NextResponse.redirect(new URL('/auth/signin', request.url))
    }
    console.log('✅ Admin access granted')
    return NextResponse.next()
  }

  console.log('🟢 Public route - access granted')
  // Allow all other routes
  return NextResponse.next()
}

// Configure which routes use this middleware
export const config = {
  matcher: [
    '/api/:path*',
    '/admin/:path*'
    // Add other protected paths here
  ]
} 
