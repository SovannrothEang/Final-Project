export interface Brand {
	id: number;
	name: string;
	description: string | null;
	country: string;
	website_url: string;
	logo?: string | null;
	is_active: number; // Your API returns 1/0
	user_id: number;
	products_count: number;
	created_at: string;
	updated_at: string;
}

export interface BrandStripItem {
	id: number;
	name: string;
	logo: string;
}

export interface CreateBrandData {
	name: string;
	description: string | null;
	country: string;
	website_url: string;
	logo: string | null;
	is_active: boolean;
}

// export interface UpdateBrandData extends CreateBrandData {}
export type UpdateBrandData = CreateBrandData;

export interface BrandFilters {
	search?: string;
	country?: string;
	is_active?: boolean;
	user_id?: number;
	sort_direction?: "asc" | "desc";
}

export interface BrandResponse {
	success: boolean;
	data: Brand[];
}

export interface BrandResponseStrip {
	success: boolean;
	data: BrandStripItem[];
}
