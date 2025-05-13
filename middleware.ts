import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { locales } from '@/config';
import { roleRoutes, defaultRouteByRole } from '@/lib/roleRoutes';

/**
 * Get the locale from the URL path
 */
function getLocaleFromPath(pathname: string): string | null {
  const pathnameSegments = pathname.split('/');
  const firstSegment = pathnameSegments[1];
  return locales.includes(firstSegment) ? firstSegment : null;
}

/**
 * Get the path without locale prefix
 */
function getPathWithoutLocale(pathname: string): string {
  const locale = getLocaleFromPath(pathname);
  if (locale) {
    return pathname.substring(locale.length + 1) || '/';
  }
  return pathname;
}

/**
 * Check if a route is allowed for a specific role
 */
function isRouteAllowed(pathname: string, role: string): boolean {
  const allowedRoutes = roleRoutes[role] || [];
  const pathWithoutLocale = getPathWithoutLocale(pathname);

  return allowedRoutes.some(route => {
    // Handle exact matches and wildcard patterns
    if (route.endsWith('*')) {
      const baseRoute = route.slice(0, -1);
      return pathWithoutLocale === '/' || pathWithoutLocale.startsWith(baseRoute);
    }
    return route === pathWithoutLocale;
  });
}

export default async function middleware(request: NextRequest) {
  // Parse config cookie for RTL preference
  const config = request.cookies.get('config');
  let isRtl = false;
  try {
    isRtl = config ? JSON.parse(config.value || '{}').isRtl : false;
  } catch (e) {
    // In case of JSON parsing error, default to false
  }

  // Get locale preferences
  const preferredLocale = isRtl ? 'ar' : 'en';
  const headerLocale = request.headers.get('dashcode-locale');
  const defaultLocale = headerLocale && locales.includes(headerLocale) ? headerLocale : preferredLocale;

  // Create the internationalization middleware
  const intlMiddleware = createIntlMiddleware({
    locales,
    defaultLocale,
    localePrefix: 'always'
  });

  const { pathname } = request.nextUrl;
  const urlLocale = getLocaleFromPath(pathname);
  const currentLocale = urlLocale || defaultLocale;

  // Get authentication info
  const token = request.cookies.get('authToken')?.value;
  const userRole = request.cookies.get('userRole')?.value;
  const userId = request.cookies.get('userId')?.value;

  // STEP 1: Handle direct root access
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
  }

  // STEP 2: Handle locale-only paths for authenticated users
  if (urlLocale && pathname === `/${urlLocale}` && token && userRole && userId) {
    const defaultRoute = defaultRouteByRole[userRole];
    if (defaultRoute) {
      return NextResponse.redirect(new URL(`/${currentLocale}${defaultRoute}`, request.url));
    }
  }

  // STEP 3: Handle authentication and role-based access
  if (token && userRole) {
    try {
      // Admin can access everything
      if (userRole === 'Admin') {
        const response = await intlMiddleware(request);
        response.headers.set('dashcode-locale', currentLocale);
        return response;
      }

      // Check if the route is allowed for the user's role
      if (!isRouteAllowed(pathname, userRole)) {
        // If not allowed, redirect to user's home page
        return NextResponse.redirect(new URL(`/${currentLocale}/`, request.url));
      }
    } catch (e) {
      // On any error during authentication, redirect to login
      return NextResponse.redirect(new URL(`/${currentLocale}/login`, request.url));
    }
  }

  // STEP 4: Apply internationalization middleware for all other cases
  const response = await intlMiddleware(request);
  response.headers.set('dashcode-locale', currentLocale);
  return response;
}

export const config = {
  // Match all routes except static assets and API routes
  matcher: ['/((?!api|_next/static|_next/image|_next/scripts|favicon.ico).*)'],
};