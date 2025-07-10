"use server";
import { cookies } from "next/headers";

export const getToken = async () => {
	const token = (await cookies()).get("auth_token")?.value;
	return token;
};
