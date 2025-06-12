import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL + "/api/verify-token";
export async function middleware(req: NextRequest) {
	const token = req.cookies.get("auth_token")?.value;
	// const token = await req.cookies.get("auth_token")?.value;
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
	const res = await fetch(API_URL, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});
	if (!res.ok) {
		const errRes = NextResponse.redirect(new URL("/login", req.url));
		errRes.cookies.set({
			name: "auth_token",
			value: "",
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
			maxAge: 0, // Expire immediately
		});
		return errRes;
	}

	return NextResponse.next();
	// try {
	// 	const decoded = jwt.verify(token, JWT_SECRET, {
	// 		complete: true,
	// 	});

	// } catch (err) {
	// 	console.error("Middleware - JWT verification failed:", err);
	// 	const loginUrl = new URL("/login", req.url);
	// 	const response = NextResponse.redirect(loginUrl);
	// 	response.cookies.set({
	// 		name: "auth_token",
	// 		value: "",
	// 		httpOnly: true,
	// 		secure: process.env.NODE_ENV === "production",
	// 		sameSite: "lax",
	// 		path: "/",
	// 		maxAge: 0, // Expire immediately
	// 	});

	// 	return response;
	// }
}

export const config = {
	matcher: ["/admin/:path*"],
};
