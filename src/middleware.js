import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// Delay function
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function middleware(request) {
    let token = null;
    let attempts = 0;
    const maxAttempts = 5; // Retry 5 times
    const delayTime = 1000; // 1 second delay

    // Try fetching token with retry logic
    while (!token && attempts < maxAttempts) {
        token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

        if (token) {
            break;
        }

        attempts += 1;
        console.log(`Attempt ${attempts}: Token not found, retrying...`);

        // Wait for a specified time before retrying
        await delay(delayTime);
    }

    if (!token) {
        console.log("Token not found after multiple attempts.");
    } else {
        console.log("Token found:", token);
    }

    const { pathname } = request.nextUrl;

    // Allow public routes
    if (!token && (pathname === "/" || pathname === "/signup")) {
        console.log('Allowing public route');
        return NextResponse.next();
    }

    // Protected route check
    if (!token && pathname.startsWith("/dashboard")) {
        console.log('Redirecting to home (no token)');
        return NextResponse.redirect(new URL("/", request.url));
    }

    // Redirect logged-in users away from signup
    if (token && pathname === "/signup") {
        console.log('Redirecting to dashboard (user logged in)');
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    console.log('No condition matched, allowing route');
    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/signup", "/dashboard/:path*"],
};
