"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import api from "./api";
import { createSession, deleteSession } from "@/lib/session";
import { User } from "@/types/user";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function login(email: string, password: string): Promise<boolean> {
	try {
		const res = await api.post<{
			success: boolean;
			data: {
				token: string;
				token_expires_at: Date;
			};
		}>(
			"/api/auth/login",
			{
				email,
				password,
			},
			{
				withCredentials: true,
			}
		);
		// const response = await fetch(`${BACKEND_API_URL}/api/auth/login`, {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// 	body: JSON.stringify({ email, password }),
		// });
		// if (!response.ok) {
		// return NextResponse.json(
		// 	{
		// 		message: "Fail to login with these credentials",
		// 	},
		// 	{ status: 400 }
		// );
		// return false;
		// }
		// const resData = await response.json();
		// const { data } = resData;
		const { data } = res.data;
		if (data && data.token) {
			await createSession(data.token);
		}
		return true;
	} catch (error) {
		console.error("Internal error: " + error);
		return false;
	}
}

export async function logout() {
	try {
		await api.post("/api/auth/logout", {});
		await deleteSession();
	} catch (error) {
		console.log("[Logout] error: " + error);
	}
}

export async function fetchAccessToken() {
	const refreshTokenCookie = (await cookies()).get("refresh_token");
	if (!refreshTokenCookie) redirect("/login");

	try {
		const response = await fetch(
			`${
				process.env.BACKEND_API_URL || "http://localhost:3000/api"
			}/auth/refresh`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Cookie: `refresh_token=${refreshTokenCookie.value}`, // Manually pass refresh token
				},
			}
		);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		const { accessToken } = data;
		await createSession(accessToken);
		return { accessToken };
	} catch (error) {
		console.error("[Fetch Access Token] error:", error);
		redirect("/login");
	}
}

export async function isValidToken(token: string): Promise<boolean> {
	try {
		const response = await fetch(
			`${
				process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api"
			}/api/auth/verify-token`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return response.ok;
	} catch (error) {
		console.log("[Verify] " + error);
		return false;
	}
}
