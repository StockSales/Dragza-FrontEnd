import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken')?.value;
  const userRole = request.cookies.get('userRole')?.value;

  const url = request.nextUrl;

  // Only redirect if user hits the root or login page
  if (url.pathname === '/' || url.pathname === '/login') {
    if (!token) {
      return NextResponse.next(); // stay on login
    }

    // Redirect to role-based dashboard
    if (userRole === 'Admin') {
      return NextResponse.redirect(new URL('/dashboard/analytics', request.url));
    } else if (userRole === 'inventory') {
      return NextResponse.redirect(new URL('/dashboard/order-list', request.url));
    } else if (userRole === 'sales') {
      return NextResponse.redirect(new URL('/dashboard/sales', request.url));
    }
  }

  return NextResponse.next(); // allow all other pages
}

export const config = {
  matcher: ["/", "/(ar|en)/:path*"],
};
