import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = request.nextUrl;

    // Allow access to home and signup pages without session
    if (!token && (pathname === "/" || pathname === "/signup")) {
        return NextResponse.next(); // Continue request
    }

    // Redirect to home if trying to access protected route without session
    if (!token && pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // Redirect logged-in user from home or signup to dashboard
    if (token && (pathname === "/" || pathname === "/signup")) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Allow other requests to continue
    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/signup", "/dashboard/:path*"], // Apply middleware to these routes
};
