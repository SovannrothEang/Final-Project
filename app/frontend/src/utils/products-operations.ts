import { getToken } from "@/lib/session";
import { Product } from "@/types/product";
import api from "./api";

export async function createProduct(productData: Partial<Product>) {
	console.log("[Product] Creating product with data:", productData);
	const token = await getToken();
	if (!token) throw new Error("No token was found");
	try {
		await api
			.post("/admin/products", productData, {
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
export async function updateProduct(id: number, productData: Partial<Product>) {
	const token = await getToken();
	console.log("[Product] Updating product with ID:", id, "Data:", productData);
	if (!token) throw new Error("No token was found");
	try {
		await api
			.put(`/admin/product/${id}`, productData, {
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
