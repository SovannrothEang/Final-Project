import { NextRequest, NextResponse } from "next/server";

const MAX_AGE = 60 * 60 * 24 * 7; // 1 week
const API_URL = process.env.API_URL + "/api/auth/login";

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
		const data = await response.json();

		if (!response.ok) {
			return NextResponse.json(data, { status: response.status });
		}

		// Create the response
		const res = NextResponse.json(data, { status: response.status });

		// Set HTTP-only cookie
		res.cookies.set({
			name: "auth_token",
			value: data.token,
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			maxAge: MAX_AGE,
			path: "/",
			sameSite: "strict",
		});

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
