import { NextRequest, NextResponse } from "next/server";

const MAX_AGE = 60 * 60 * 24 * 7; // 1 week

export default async function handler(req: NextRequest) {
	if (req.method !== "POST") {
		return NextResponse.json(
			{
				success: false,
				message: "Method not allowed",
			},
			{ status: 405 }
		);
	}

	const apiUrl = (process.env.API_URL as string) + "/api/login";

	try {
		const response = await fetch(apiUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(req.body),
		});
		const data = await response.json();

		// checking whether the response is ok
		if (!response.ok) {
			throw new Error(data.message || "Login failed");
		}
		const token = data.token;

		// Making the response
		const res = NextResponse.json(
			{
				success: true,
				message: "Login successfully",
			},
			{ status: 200 }
		);

		// Set HTTP-only cookie
		res.cookies.set({
			name: "auth_token",
			value: token,
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax", // or 'strict' depending on your setup
			path: "/",
			maxAge: MAX_AGE,
		});

		return res;
	} catch (err) {
		return NextResponse.json(
			{
				success: false,
				message:
					err instanceof Error ? err.message : "An unknown error occurred",
			},
			{ status: 500 }
		);
	}
}
