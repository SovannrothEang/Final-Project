// export interface Category {
// 	id: number;
// 	name: string;
//     type: string;
//     createdAt: string;
// }

// export type CategoryList = Category[];

// export interface Category {
// 	id: string;
// 	name: string;
// 	description?: string;
// 	products_count: number;
// 	is_active: boolean;
// 	logo?: string;
// 	created_at: string;
// 	updated_at: string;
// }

// export interface CreateCategoryData {
// 	name: string;
// 	description: string;
// 	is_active: boolean;
// 	//   image?: string
// }

// export type UpdateCategoryData = Partial<CreateCategoryData>;

// export interface CategoryFilters {
// 	search?: string;
// 	status?: "Active" | "Inactive";
// 	parent_id?: string;
// 	page?: number;
// 	per_page?: number;
// }

// export interface CategoryResponse {
// 	data: Category[];
// }



export interface Category {
  id: string
  name: string
  description: string
  is_active: boolean
  logo?: string
  products_count?: number
  created_at: string
  updated_at?: string
}

export interface CreateCategoryData {
  name: string
  description: string
  is_active: boolean
  logo?: string
}

export interface UpdateCategoryData extends CreateCategoryData {
  
}

export interface CategoryResponse {
  data: Category[]
  message?: string
  success?: boolean
}

export interface CategoryFilters {
  search?: string
  is_active?: boolean
  limit?: number
  offset?: number
}
