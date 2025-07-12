export interface Product {
	id: number;
	name: string;
	brand: { id: number; name: string };
	category: { id: number; name: string };
	description: string | null;
	short_description: string | null;
	price: number;
	stock: number;
	options: Record<string, string[]>;
	discount: number;
	image: string | null;
	is_active: boolean;
	in_stock: boolean;
	is_top: boolean;
	is_new: boolean;
	review: number;
	rateing: number;
	created_at: string;
	updated_at: string;
}

export interface CreateProductData {
	name: string;
	image: string[];
	brand_id: string;
	category_id: string;
	description: string;
	short_description?: string;
	stock: number;
	options: {
		color: string[];
		size: string[];
	};
	price: number;
	discount: number;
	is_top: boolean;
	rating: number;
	review: number;
}

// export interface UpdateProductData extends Partial<CreateProductData> {}

export interface ProductFilters {
	search?: string;
	category_id?: string;
	brand_id?: string;
	status?: "active" | "inactive";
	min_price?: number;
	max_price?: number;
	in_stock?: boolean;
	page?: number;
	per_page?: number;
}

export interface ProductResponse {
	data: Product[];
	meta: {
		current_page: number;
		last_page: number;
		per_page: number;
		total: number;
		from: number;
		to: number;
	};
}
