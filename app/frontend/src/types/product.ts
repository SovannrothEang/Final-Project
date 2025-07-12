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
  id: number;
  name: string;
  brand: { id: number; name: string };
  category: { id: number; name: string };
  description: string;
  short_description: string;
  price: number;
  stock: number;
  options: {
    color: string[];
    size: string[];
    [key: string]: string[]; 
  };
  discount: number;
  image: string | null;
  in_stock: boolean;
  is_top: number;
  is_new: boolean;
  is_active: number;
  status: string;
  rating: number;
  reviews: number;
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

// export interface ProductFilters {
// 	search?: string;
// 	category_id?: string;
// 	brand_id?: string;
// 	status?: "active" | "inactive";
// 	min_price?: number;
// 	max_price?: number;
// 	in_stock?: boolean;
// 	page?: number;
// 	per_page?: number;
// }

export interface ProductFilters {
  search?: string;
  category_id?: string | number;
  brand_id?: string | number;
  status?: string;
  'price_range[min]'?: number;
  'price_range[max]'?: number;
  'date_range[start]'?: string; // YYYY-MM-DD
  'date_range[end]'?: string;   // YYYY-MM-DD
  sort_by?: string;
  sort_direction?: 'asc' | 'desc';
  per_page?: number;
  page?: number;
}

export interface ProductResponse {
  success: boolean;
  data: Product[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    sort: {
      by: string;
      direction: string;
    };
    filters: {
      search: string | null;
      category_id: string | null;
      brand_id: string | null;
      status: string | null;
      price_range: {
        min: number | null;
        max: number | null;
      };
      date_range: {
        start: string | null;
        end: string | null;
      };
      sort_by: string | null;
      sort_direction: string | null;
      per_page: number | null;
    };
  };
}
