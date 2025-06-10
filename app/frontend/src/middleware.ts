import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export function middleware(req: NextRequest) {
	const token = req.cookies.get("auth_token")?.value;

	const protectedPath = ["/admin", "/admin/*"];
	const nextPath = req.nextUrl.pathname;
	const isProtected = protectedPath.some((path) => nextPath.startsWith(path));
	if (!isProtected) {
		return NextResponse.next();
	}

	if (!token) {
		return NextResponse.redirect(new URL("/login", req.url));
	}

	// Validate the token
	try {
		const decoded = jwt.verify(token, JWT_SECRET);

		return NextResponse.next();
	} catch (err) {
		// Token is invalid or expired
		const loginUrl = new URL("/login", req.url);
		// Clear the invalid cookie
		const response = NextResponse.redirect(loginUrl);
		response.cookies.set({
			name: "auth_token",
			value: "",
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
			maxAge: 0, // Expire immediately
		});

		return response;
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/admin/:path*"],
};
