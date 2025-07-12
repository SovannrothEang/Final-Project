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
  description: string | null;
  country: string;
  website_url: string;
  logo?: string | null;
  is_active: number;
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
	description: string;
	country: string;
	website?: string;
	//   image: string
	status: "Active" | "Inactive";
	logo?: string;
	//   slug?: string
}

// export interface UpdateBrandData extends Partial<CreateBrandData> {}

export interface BrandFilters {
  search?: string;
  country?: string;
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