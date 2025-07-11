import { createBrandSchema, FormState } from "@/lib/difinitions";
import { createBrand } from "./operations";

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
		website_url: formData.get("website_url"),
		country: formData.get("country"),
		logo: formData.get("logo"),
		is_active: formData.get("is_active") === "true",
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
		console.log("[Create Product Action] success");
		return {
			success: true,
		};
	} catch (error) {
		console.error("[Product action] error: ", error);
		return {
			success: false,
			errors: {
				general: [
					error instanceof Error
						? error.message
						: "An unexpected error occurred during creating product.",
				],
			},
		};
	}
}
