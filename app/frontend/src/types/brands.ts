// export interface Brand {
// 	id: number;
// 	name: string;
//     company: string;
//     createdAt: string;
// }

// export type BrandList = Brand[];

export interface Brand {
	id: number;
	name: string;
	description: string;
	country: string;
	website_url?: string;
	logo?: string;
	is_active: boolean;
	user_id: number;
	//   image: string
	//   slug?: string
	products_count: number;
	created_at: string;
	updated_at: string;
}

export interface CreateBrandData {
	name: string;
	description: string;
	country: string;
	website?: string;
	//   image: string
	status: "Active" | "Inactive";
	logo?: string;
	//   slug?: string
}

export interface UpdateBrandData extends Partial<CreateBrandData> {}

// export interface BrandFilters {
//   search?: string
//   status?: "Active" | "Inactive"
//   country?: string
//   page?: number
//   per_page?: number
// }

export interface BrandResponse {
	data: Brand[];
	//   meta: {
	//     current_page: number
	//     last_page: number
	//     per_page: number
	//     total: number
	//   }
}
