import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        role: "admin" | "sales" | "inventory";
    }

    interface Session {
        user: {
            name: string;
            email: string;
            image?: string;
            role: "admin" | "sales" | "inventory";
        };
    }
}
