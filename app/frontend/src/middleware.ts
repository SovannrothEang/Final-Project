import { NextRequest, NextResponse } from "next/server";
import { deleteSession, verifySession } from "./lib/session";

export async function middleware(req: NextRequest) {
	// const token = await req.cookies.get("auth_token")?.value;
	const protectedPath = ["/admin", "/admin/*"];
	const nextPath = req.nextUrl.pathname;
	const isProtected = protectedPath.some((path) => nextPath.startsWith(path));
	if (!isProtected) {
		return NextResponse.next();
	}
	// Validate the token
	if (await verifySession()) {
		return NextResponse.next();
	}

	deleteSession();
	return NextResponse.redirect(new URL("/login", req.url));
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
