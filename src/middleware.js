
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";



export async function middleware(request) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    const { pathname } = request.nextUrl;

    if (!token) {
        console.log("Token is undefined or null");
    }

    // Allow public routes
    if (!token && (pathname === "/" || pathname === "/signup")) {
        console.log('1 side');
        return NextResponse.next();
    }

    // Protected route check
    if (!token && pathname.startsWith("/dashboard")) {
        console.log('2 side');
        return NextResponse.redirect(new URL("/", request.url));
    }

    // Redirect logged-in users away from signup
    if (token && pathname === "/signup") {
        console.log('3 side');
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    console.log('no condition');
    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/signup", "/dashboard/:path*", "/:path*"],
};
