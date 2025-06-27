import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL + "/api/auth/logout";

export async function POST(req: NextRequest) {
	try {
		const token = req.cookies.get("auth_token")?.value;

		if (!token) {
			return NextResponse.json(
				{
					success: false,
					message: "No authentication token found",
				},
				{ status: 401 }
			);
		}

		const response = await fetch(API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			credentials: "include",
		});

		if (!response.ok) {
			return NextResponse.json(response.json(), { status: response.status });
		}
		const cookieOptions = {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			expires: new Date(0),
			path: "/",
			sameSite: "strict" as const,
		};
		const res = NextResponse.json(
			{
				success: true,
				message: "Logout successfully",
			},
			{ status: 200 }
		);

		res.cookies.set("auth_token", "", cookieOptions);
		return res;
	} catch (error) {
		console.error("Logout error:", error);
		return NextResponse.json(
			{ success: false, message: "Internal server error!" },
			{ status: 500 }
		);
	}
}
