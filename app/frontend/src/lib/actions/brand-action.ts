import { createBrand, updateBrand } from "@/app/api/brands/brands";
import { createBrandSchema, FormState } from "@/lib/difinitions";

export async function brandAction(state: FormState, formData: FormData) {
	if (!(formData instanceof FormData)) {
		return {
			success: false,
			errors: { error: ["Invalid Form Data"] },
		};
	}
	const brandId = formData.get("id");
	const validatedResult = createBrandSchema.safeParse({
		name: formData.get("name"),
		description: formData.get("description"),
		website_url: formData.get("website_url"),
		country: formData.get("country"),
		logo: formData.get("logo") || "",
		is_active: formData.get("is_active") === "1",
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
		const brandData = {
			...validatedResult.data,
			logo: validatedResult.data.logo || "",
			is_active: validatedResult.data.is_active,
		};
		if (brandId) {
			await updateBrand(parseInt(brandId.toString()), brandData);
		} else {
			await createBrand(brandData);
		}
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
