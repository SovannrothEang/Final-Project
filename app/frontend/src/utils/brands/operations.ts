import { Brand } from "@/types/brands";
import { getToken } from "@/lib/session";
import api from "../api";

export async function createBrand(productData: Partial<Brand>) {
	const token = await getToken();
	console.log("[Brand] " + productData.name);
	console.log("[Brand] " + productData.country);
	if (!token) throw new Error("No token was found");
	try {
		await api
			.post("/admin/brands", productData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.catch(function (error) {
				if (
					error.response &&
					error.response.data &&
					error.response.data.errors
				) {
					const errorMessages: string[] = [];
					for (const key in error.response.data.errors) {
						if (Array.isArray(error.response.data.errors[key])) {
							errorMessages.push(...error.response.data.errors[key]);
						}
					}
					throw errorMessages;
				}
				throw error;
			});
	} catch (error) {
		throw error;
	}
}
