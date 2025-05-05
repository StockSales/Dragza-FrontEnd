// lib/roleRoutes.ts

import {jwtDecode} from "jwt-decode";

export function getRoleFromToken(): string | null {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        const decoded: any = jwtDecode(token);
        return decoded.role;
    } catch {
        return null;
    }
}

export const roleRoutes: Record<string, string[]> = {
    Admin: ["*"],
    inventory: [
        "/en/dashboard/product-list",
        "/ar/dashboard/product-list",
        "/en/dashboard/order-list",
        "/ar/dashboard/order-list",
        "/ar/dashboard/return-list",
        "/en/dashboard/return-list",
        "/en/dashboard/sales",
        "/ar/dashboard/sales",
    ],
    sales: ["/en/dashboard/sales", "/en/dashboard/register", "/ar/dashboard/sales", "/ar/dashboard/register"]
};

export const defaultRouteByRole: Record<string, string> = {
    admin: "/dashboard/analytics",
    inventory: "/dashboard/order-list",
    sales: "/dashboard/sales",
};
