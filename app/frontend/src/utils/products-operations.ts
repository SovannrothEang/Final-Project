import { getToken } from "@/lib/session";
import { Product } from "@/types/product";
import api from "./api";

export async function createProduct(productData: Partial<Product>) {
	const token = await getToken();
	console.log("[Product] " + productData);
	if (!token) throw new Error("No token was found");
	try {
		await api
			.post("/admin/categories", productData, {
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
