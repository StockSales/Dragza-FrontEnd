import { NextRequest, NextResponse } from 'next/server';
import { roleRoutes, defaultRouteByRole } from '@/lib/roleRoutes';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ===== 1. Handle "/" root path: Redirect to /en or /ar based on config cookie =====
  if (pathname === '/') {
    const config = request.cookies.get('config');
    const isRtl = config ? JSON.parse(config.value).isRtl : false;
    const locale = isRtl ? 'ar' : 'en';
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  // ===== 2. Prevent access to /en or /ar directly when already authenticated =====
  if ((pathname === '/en' || pathname === '/ar')) {
    const token = request.cookies.get('authToken')?.value;
    const userRole = request.cookies.get('userRole')?.value;
    const userId = request.cookies.get('userId')?.value;

    if (token && userRole && userId) {
      const defaultRoute = defaultRouteByRole[userRole];
      if (defaultRoute) {
        return NextResponse.redirect(new URL(`/${pathname.slice(1)}${defaultRoute}`, request.url));
      }
    }
  }

  // ===== 3. Role-based route protection =====
  const token = request.cookies.get('authToken')?.value;
  if (token) {
    try {
      const role: string | undefined = request.cookies.get('userRole')?.value;

      // Admins can access everything
      if (role === 'Admin') return NextResponse.next();

      const allowedRoutes = roleRoutes[role as string] || [];
      const isAllowed = allowedRoutes.includes(pathname);

      if (!isAllowed) {
        return NextResponse.redirect(new URL(`/${pathname.split('/')[1]}/`, request.url));
      }
    } catch (e) {
      return NextResponse.redirect(new URL('/en/login', request.url));
    }
  }

  return NextResponse.next();
}

// Apply middleware only to relevant paths
export const config = {
  matcher: ['/', '/en/:path*', '/ar/:path*'],
};
