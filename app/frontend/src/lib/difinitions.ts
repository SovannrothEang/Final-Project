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

export const createProductSchema = z.object({
	name: z
		.string()
		.trim()
		.min(2, "2 or more characters")
		.nonempty("name is required"),
	brand_id: z.number().int().positive("Brand ID must be a positive integer"),
	category_id: z
		.number()
		.int()
		.positive("Category ID must be a positive integer"),
	price: z
		.number()
		.positive("Price must be a positive number")
		.max(99999999.99, "Price is too large"),
	description: z.string().nullable(),
	short_description: z.string().nullable(),
	options: z.record(z.array(z.string())),
	discount: z.number().int().min(0).default(0),
	stock: z.number().int().min(0).default(0),
	is_top: z.boolean().default(false),
	image: z.string().nullable(),
	is_active: z.boolean().default(true),
	rating: z.number().int().min(0).max(5).default(0),
	reviews: z.number().int().min(0).default(0),
});

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
