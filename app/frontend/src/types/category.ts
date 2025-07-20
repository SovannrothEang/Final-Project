export interface Category {
	id: string;
	name: string;
	description: string;
	is_active: boolean;
	logo?: string;
	products_count?: number;
	created_at: string;
	updated_at?: string;
}

export interface CreateCategoryData {
	name: string;
	description: string;
	is_active: boolean;
	logo?: string;
}

// export interface UpdateCategoryData extends CreateCategoryData {}
export type UpdateCategoryData = CreateCategoryData;

export interface CategoryResponse {
	data: Category[];
	message?: string;
	success?: boolean;
}

export interface CategoryFilters {
	search?: string;
	is_active?: boolean;
	limit?: number;
	offset?: number;
}
