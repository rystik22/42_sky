import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Define paths that need authentication
  const isAdminPath = path === '/admin' || 
                      (path.startsWith('/admin/') && !path.includes('/admin/auth'));
  
  // Get the token from cookies
  const token = request.cookies.get('adminToken')?.value;
  
  console.log('Path:', path, 'Token exists:', !!token, 'Is admin path:', isAdminPath); // Enhanced debug logging
  
  // If trying to access admin area without being logged in, redirect to login
  if (isAdminPath && !token) {
    console.log('Redirecting to login page');
    return NextResponse.redirect(new URL('/admin/auth', request.url));
  }
  
  // If already logged in and trying to access login page, redirect to admin dashboard
  if ((path === '/admin/auth' || path === '/admin/auth/') && token) {
    console.log('Already logged in, redirecting to dashboard');
    return NextResponse.redirect(new URL('/admin', request.url));
  }
  
  return NextResponse.next();
}

// Specify which paths this middleware applies to
export const config = {
  matcher: ['/admin', '/admin/:path*'],
};