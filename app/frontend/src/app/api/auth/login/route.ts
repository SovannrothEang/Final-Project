import { createSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "/api/auth/login";

export async function POST(request: NextRequest) {
	try {
		const requestBody = await request.json();
		const response = await fetch(API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(requestBody),
		});
		const resData = await response.json();

		if (!response.ok) {
			return NextResponse.json(resData, { status: response.status });
		}

		// Create the response
		const res = NextResponse.json(resData, { status: response.status });
		if (resData && resData.data.token) {
			const token = resData.data.token;
			await createSession(token);
		}

		// Set HTTP-only cookie
		// res.cookies.set({
		// 	name: "auth_token",
		// 	value: token,
		// 	httpOnly: true,
		// 	secure: process.env.NODE_ENV === "production",
		// 	maxAge: MAX_AGE,
		// 	path: "/",
		// 	sameSite: "strict",
		// });

		return res;
	} catch (err) {
		console.error(err);
		return NextResponse.json(
			{
				success: false,
				message: err instanceof Error ? err.message : "Internal server error",
			},
			{ status: 500 }
		);
	}
}
