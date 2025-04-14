// lib/roleRoutes.ts

export const roleRoutes: Record<string, string[]> = {
    admin: ["*"],
    inventory: [
        "/en/dashboard/product-list",
        "/ar/dashboard/product-list",
        "/en/dashboard/inventory-management",
        "/ar/dashboard/inventory-management",
        "/en/dashboard/order-list",
        "/ar/dashboard/order-list"
    ],
    sales: ["/en/dashboard/sales", "/en/dashboard/customer-list", "/ar/dashboard/sales", "/ar/dashboard/customer-list"]
};

export const defaultRouteByRole: Record<string, string> = {
    admin: "/dashboard/analytics",
    inventory: "/dashboard/inventory-management",
    sales: "/dashboard/sales",
};
