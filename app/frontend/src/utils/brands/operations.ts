import { Brand } from "@/types/brands";
import { getToken } from "@/lib/session";
import api from "../api";

export async function createBrand(productData: Partial<Brand>) {
	const token = await getToken();
	console.log("[Brand] " + productData.name);
	console.log("[Brand] " + productData.country);
	if (!token) throw new Error("No token was found");
	await api.post("/admin/brands", productData, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
}
