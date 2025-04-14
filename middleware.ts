import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { locales } from "@/config";
import { roleRoutes, defaultRouteByRole } from "./lib/roleRoutes";

export default async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  const url = request.nextUrl.pathname;
  const defaultLocale = request.headers.get("dashcode-locale") || "en";

  const handleI18nRouting = createMiddleware({ locales, defaultLocale });
  const response = handleI18nRouting(request);
  response.headers.set("dashcode-locale", defaultLocale);

  if (token) {
    const role = token.role;
    const allowedRoutes = roleRoutes[role] || [];
    const defaultRoute = `/${defaultLocale}${defaultRouteByRole[role] || ""}`;

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