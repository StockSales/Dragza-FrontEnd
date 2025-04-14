import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByEmail, User } from "./data";
import { defaultRouteByRole } from "./roleRoutes";

export const { auth, handlers, signIn, signOut } = NextAuth({
    session: {
        strategy: "jwt",
    },
    providers: [
        Google,
        GitHub,
        CredentialsProvider({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                if (!credentials) return null;

                const user = getUserByEmail(credentials.email as string);
                if (!user) throw new Error("User not found");

                const isMatch = user.password === credentials.password;
                if (!isMatch) throw new Error("Email or Password is not correct");

                return { ...user };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as User).role;
            }
            console.log("JWT Token:", token);
            return token;
        },
        async session({ session, token }) {
            if (token?.role) {
                session.user.role = token.role as User["role"];
            }
            return session;
        },
        async redirect({ url, baseUrl, token }) {
            if (token?.role) {
                const defaultRoute = defaultRouteByRole[token.role as string];
                if (defaultRoute) {
                    return defaultRoute;
                }
            }
            return baseUrl;
        },
    },
});
