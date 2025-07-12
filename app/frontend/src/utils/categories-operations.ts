import { getToken } from "@/lib/session";
import { Category } from "@/types/category";
import api from "./api";

export async function createCategory(categoryData: Partial<Category>) {
	const token = await getToken();
	console.log("[Category] " + categoryData);
	if (!token) throw new Error("No token was found");
	try {
		await api
			.post("/admin/categories", categoryData, {
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
