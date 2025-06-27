// export interface Product {
// 	id: string;
// 	name: string;
// 	brand: string;
// 	sku: string;
// 	price: number;
// 	description: string;
// 	options: { colors: string[]; sizes: string[] };
// 	discount: number;
// 	stock: number;
// 	inStock: boolean;
// 	isNew: boolean;
// 	category: string;
// 	status: string;
// 	rating: number;
// 	reviews: number;
// 	images: string;
// 	createdAt: string;
// }
// // image: { src: string; alt: string };

// export interface Product{
// 	id: number;
// 	name: string;
// 	category: number; // store category id
// 	price: number;
// 	description: string;
// 	options: {
// 		series: string[];
// 		colors: string[];
// 		sizes: string[];
// 	};
// 	discount: number;
// 	stock: number;
// 	inStock: boolean;
// 	isNew: boolean;
// 	isTop: boolean;
// 	status: string;
// 	rating: number;
// 	reviews: number;
// 	images: string;
// 	createdAt: string;
// 	updatedAt: string;
// }

// export type ProductList = Product[];


export interface Product {
  id: string
  name: string
  image: string[]
  description: string
  short_description?: string
  brand: string
  category: string
  price: number
  stock: number
  option: {
	color: string[]
	size: string[]
  }
  discount: number
  status: string
  in_stock: boolean
  is_new: boolean
  is_top: number
  review: number
  created_at: string
  updated_at: string
}

export interface CreateProductData {
  name: string
  image: string[]
  brand_id: string
  category_id: string
  description: string
  short_description?: string
  stock: number
  options: {
	color: string[]
	size: string[]
  }
  price: number
  discount: number
  is_top: boolean
  rating: number
  review: number
}

export interface UpdateProductData extends Partial<CreateProductData> {}

export interface ProductFilters {
  search?: string
  category_id?: string
  brand_id?: string
  status?: "active" | "inactive"
  min_price?: number
  max_price?: number
  in_stock?: boolean
  page?: number
  per_page?: number
}

export interface ProductResponse {
  data: Product[]
  meta: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}

