"use client";

import { useEffect } from "react";
import {usePathname, useRouter} from "@/i18n/routing";
import { getRoleFromToken, roleRoutes, defaultRouteByRole } from "@/lib/roleRoutes";

const RoleGuard = () => {
    const router = useRouter();
    const pathname = usePathname()

    useEffect(() => {
        const role = getRoleFromToken();
        const allowedRoutes = roleRoutes[role || ""] || [];

        if (!allowedRoutes.includes("*") && !allowedRoutes.includes(pathname)) {
            router.push(defaultRouteByRole[role || ""]);
        }
    }, [pathname]);

    return null;
};

export default RoleGuard;
