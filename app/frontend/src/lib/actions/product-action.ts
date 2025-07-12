import { createProductSchema, FormState } from "@/lib/difinitions";
import { createProduct } from "@/utils/products-operations";

export async function createProductAction(
	state: FormState,
	formData: FormData
) {
	if (!(formData instanceof FormData)) {
		return {
			success: false,
			errors: { error: ["Invalid Form Data"] },
		};
	}
	console.log("FormData received in createBrandAction:", {
		name: formData.get("name"),
		brand_id: formData.get("brand_id"),
		category_id: formData.get("category_id"),
		price: formData.get("price"),
		description: formData.get("description"),
		short_description: formData.get("short_description"),
		options: formData.get("options"),
		discount: formData.get("discount"),
		stock: formData.get("stock"),
		is_top: formData.get("is_top"),
		image: formData.get("image"),
		is_active: formData.get("is_active"),
		rating: formData.get("rating"),
		reviews: formData.get("reviews"),
	});

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

	const validatedResult = createProductSchema.safeParse({
		name: formData.get("name"),
		brand_id: formData.get("brand_id"),
		category_id: formData.get("category_id"),
		price: formData.get("price"),
		description: formData.get("description"),
		short_description: formData.get("short_description"),
		options: parsedOptions,
		discount: formData.get("discount"),
		stock: formData.get("stock"),
		is_top: formData.get("is_top"),
		image: formData.get("image"),
		is_active: formData.get("is_active"),
		rating: formData.get("rating"),
		reviews: formData.get("reviews"),
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
		await createProduct({ ...validatedResult.data });
		console.log("[Create Brand Action] success");
		return {
			success: true,
		};
	} catch (error) {
		console.error("[Brand action] error: ", error);
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
