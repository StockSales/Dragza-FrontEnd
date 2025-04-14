"use client";

import React, { useState, useEffect } from 'react'
import { useConfig } from "@/hooks/use-config";
import { MenuClassic } from './menu-classic';
import { MenuTwoColumn } from './menu-two-column';
import { MenuDragAble } from './menu-dragable';
import {getSession, useSession} from "next-auth/react";
import { Loader2 } from "lucide-react";

export function Menu() {
    const [config, setConfig] = useConfig();
    const { data: session, status } = useSession();
    const [isReady, setIsReady] = useState(false);

    // Make sure we don't render until we know the authentication status
    useEffect(() => {
        console.log(status, session)
        // Only set as ready when we have the full session data
        if (status !== "loading") {
            // Add a small delay to ensure the session data is fully propagated
            const timer = setTimeout(() => {
                setIsReady(true);
            }, 100);

            return () => clearTimeout(timer);
        }
    }, [status, session]);

    // Show loading state while checking
    if (status === "loading" || isReady === false) {
        return (
            <div className="flex items-center justify-center h-full w-full">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground flex justify-center items-center" />
            </div>
        );
    }

    if (status === "unauthenticated" || !session) {
        getSession()
        return (
            <Loader2 className="h-6 w-6 animate-spin flex justify-center items-center text-muted-foreground" />
        );
    }


    // Render based on selected layout
    if (config.sidebar === 'draggable') {
        return <MenuDragAble />
    }

    if (config.sidebar === 'two-column') {
        return <MenuTwoColumn />
    }

    return (
        <MenuClassic />
    );
}
