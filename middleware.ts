import { auth } from "@/auth";
import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicRoutes,
} from "./route";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
    const { nextUrl } = request;
    const isLoggedIn = await auth();

    const isApiRoute = nextUrl.pathname.startsWith("/api");
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    // Exclude all API routes from authentication checks
    if (isApiRoute) {
        return NextResponse.next();
    }

    // If user is trying to access auth routes while logged in
    if (isAuthRoute) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return NextResponse.next();
    }

    // If user is not logged in and trying to access a protected route
    if (!isLoggedIn && !isPublicRoute) {
        return NextResponse.redirect(new URL('/auth/signin', nextUrl));
    }

    // If user is logged in and trying to access public route
    if (isLoggedIn && isPublicRoute) {
        return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!.+\\.[\\w]+$|_next).*)", // Match all routes except static files
        "/",
        "/(api|trpc)(.*)",            // Include API and trpc routes explicitly
    ],
};
