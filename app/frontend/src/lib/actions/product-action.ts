import { productSchema, FormState } from "@/lib/difinitions";
import { createProduct, updateProduct } from "@/utils/products-operations";

export async function productAction(state: FormState, formData: FormData) {
	if (!(formData instanceof FormData)) {
		return {
			success: false,
			errors: { error: ["Invalid Form Data"] },
		};
	}
	let parsedOptions: Record<string, string[]> = {};
	const optionsString = formData.get("options");
	if (typeof optionsString === "string" && optionsString) {
		try {
			parsedOptions = JSON.parse(optionsString);
		} catch {
			return {
				success: false,
				errors: { options: ["Invalid options format"] },
			};
		}
	}
	// Get ID
	const productId = formData.get("id");
	// Parse values
	const price = Number(formData.get("price"));
	const discount = Number(formData.get("discount"));
	const stock = Number(formData.get("stock"));
	const brand_id = Number(formData.get("brand_id"));
	const category_id = Number(formData.get("category_id"));
	const rating = Number(formData.get("rating")); // Assuming rating is also from form data
	const reviews = Number(formData.get("reviews")); // Assuming reviews is also from form data

	const is_top = formData.get("is_top") === "on";
	const is_active = formData.get("is_active") === "true";

	const validatedResult = productSchema.safeParse({
		name: formData.get("name"),
		brand_id: brand_id,
		category_id: category_id,
		price: price,
		description: formData.get("description"),
		short_description: formData.get("short_description"),
		options: parsedOptions,
		discount: discount,
		stock: stock,
		image: formData.get("image"),
		is_top: is_top,
		is_active: is_active,
		rating: rating,
		reviews: reviews,
	});
	if (!validatedResult.success) {
		const errors = validatedResult.error.flatten().fieldErrors;
		const fields: Record<string, string> = {};

		for (const key of Object.keys(formData)) {
			const value = formData.get(key);
			if (value !== null) {
				fields[key] = value.toString();
			}
		}
		return {
			success: false,
			fields,
			errors,
		};
	}
	try {
		if (productId) {
			await updateProduct(parseInt(productId.toString()), validatedResult.data);
			console.log("[Update Product Action] success");
		} else {
			await createProduct({ ...validatedResult.data });
			console.log("[Create Product] success");
		}
		return {
			success: true,
		};
	} catch (error) {
		console.error("[Product action] error: ", error);
		let errorMessage: string;
		if (error instanceof Error) {
			errorMessage = error.message;
		} else if (typeof error === "string") {
			errorMessage = error;
		} else if (Array.isArray(error)) {
			errorMessage = error.join(",\n");
		} else {
			errorMessage = "An unexpected error occurred during creating brand.";
		}
		return {
			success: false,
			errors: {
				general: [errorMessage],
			},
		};
	}
}
