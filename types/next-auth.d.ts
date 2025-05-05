import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        role: "Admin" | "sales" | "inventory";
    }

    interface Session {
        user: {
            name: string;
            email: string;
            image?: string;
            role: "Admin" | "sales" | "inventory";
        };
    }
}
