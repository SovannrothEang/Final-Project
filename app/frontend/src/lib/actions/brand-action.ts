import { createBrandSchema, FormState } from "@/lib/difinitions";
import { createBrand } from "@/utils/brands-operations";

export async function createBrandAction(state: FormState, formData: FormData) {
	if (!(formData instanceof FormData)) {
		return {
			success: false,
			errors: { error: ["Invalid Form Data"] },
		};
	}
	console.log("FormData received in createBrandAction:", {
		name: formData.get("name"),
		description: formData.get("description"),
		country: formData.get("country"),
		website_url: formData.get("website_url"),
		logo: formData.get("logo"),
		is_active: formData.get("is_active") === "true",
	});
	const validatedResult = createBrandSchema.safeParse({
		name: formData.get("name"),
		description: formData.get("description"),
		// assuming that the url is corrected
		website_url: formData.get("website_url"),
		country: formData.get("country"),
		logo: formData.get("logo"),
		is_active: formData.get("is_active") !== null,
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
		await createBrand({ ...validatedResult.data });
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
