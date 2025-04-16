import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

// routes config for each role
import { roleRoutes, defaultRouteByRole } from "./lib/roleRoutes";
import { locales } from "@/config";

// Define your allowed roles based on roleRoutes keys
type Role = keyof typeof roleRoutes;

interface CustomToken {
  role: Role;
}

export default async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  }) as CustomToken | null;

  const url = request.nextUrl.pathname;
  const defaultLocale = request.headers.get("dashcode-locale") || "en";

  // Handle i18n routing
  const handleI18nRouting = createMiddleware({ locales, defaultLocale });
  const response = handleI18nRouting(request);
  response.headers.set("dashcode-locale", defaultLocale);

  // If token exists and has a valid role
  if (token && token.role in roleRoutes) {
    const role = token.role;
    const allowedRoutes = roleRoutes[role] || [];
    const defaultRoute = `/${defaultLocale}${defaultRouteByRole[role] || ""}`;

    // 🆕 Redirect /en or /ar directly if user is authenticated
    if (url === `/${defaultLocale}`) {
      return NextResponse.redirect(new URL(defaultRoute, request.url));
    }

    const isAllowed =
        allowedRoutes.includes("*") || allowedRoutes.includes(url);

    if (!isAllowed) {
      return NextResponse.redirect(new URL(defaultRoute, request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/", "/(ar|en)/:path*"],
};