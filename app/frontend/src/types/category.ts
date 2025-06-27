// export interface Category {
// 	id: number;
// 	name: string;
//     type: string;
//     createdAt: string;
// }

// export type CategoryList = Category[];

export interface Category {
  id: string
  name: string
  description: string
  is_active: boolean
//   image?: string
  created_at: string
  updated_at: string
}

export interface CreateCategoryData {
  name: string
  description: string
  is_active: boolean
//   image?: string
}

export interface UpdateCategoryData extends Partial<CreateCategoryData> {}

export interface CategoryFilters {
  search?: string
  status?: "Active" | "Inactive"
  parent_id?: string
  page?: number
  per_page?: number
}

export interface CategoryResponse {
  data: Category[]
//   meta: {
//     current_page: number
//     last_page: number
//     per_page: number
//     total: number
//   }
}
