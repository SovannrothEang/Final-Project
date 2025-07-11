import z from "zod";

export type FormState = {
	success: boolean;
	fields?: Record<string, string | string[]>;
	errors?: Record<string, string[] | undefined>;
};

export const initialState: FormState = {
	success: false,
	fields: {},
	errors: {},
};

export const createBrandSchema = z.object({
	name: z
		.string()
		.trim()
		.min(2, "2 or more characters")
		.nonempty("name is required"),
	description: z.string().nullable(),
	country: z.string().nonempty("Country is required"),
	website_url: z.string().nonempty("Website url is required"),
	logo: z.string().nullable(),
	is_active: z.boolean().default(true),
});

export const createCategory = z.object({
	name: z.string().trim().min(5, "5 or more charactres needed"),
	description: z.string().trim(),
});
