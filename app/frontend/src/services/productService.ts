import useClientFetch from "@/utils/client-fetching";
import { Product, ProductResponse, ProductFilters } from "@/types/product";

// export function useProducts(filters?: ProductFilters) {
//   return useClientFetch<ProductResponse>("/products", {
//     ...filters,
//     per_page: filters?.per_page || 8,
//   });
// }

export function useProducts(filters?: Partial<ProductFilters>) {
  const defaultFilters: ProductFilters = {
    per_page: 12,
    page: 1,
    sort_by: 'created_at',
    sort_direction: 'desc',
    ...filters
  };

  // Type-safe removal of undefined values while preserving the type structure
  const cleanParams: Partial<ProductFilters> = {};
  for (const [key, value] of Object.entries(defaultFilters)) {
    if (value !== undefined) {
      cleanParams[key as keyof ProductFilters] = value;
    }
  }

  return useClientFetch<ProductResponse>("/products", cleanParams);
}

export function useProductById(id: number) {
  return useClientFetch<{ success: boolean; data: Product }>(`/products/${id}`);
}

export function useNewArrivals() {
  return useClientFetch<ProductResponse>("/products", {
    is_new: true,
    per_page: 7,
    sort_by: "created_at",
    sort_direction: "desc"
  });
}

export function useTopSelling() {
  return useClientFetch<ProductResponse>("/products", {
    is_top: 1,
    per_page: 4
  });
}


export function useSortedProducts(sortBy: string, sortDirection: 'asc' | 'desc' = 'desc', perPage: number = 12) {
  return useClientFetch<ProductResponse>("/api/v1/products", {
    sort_by: sortBy,
    sort_direction: sortDirection,
    per_page: perPage,
  });
}

export function useProductsByCategory(categoryId: number | string, perPage: number = 12) {
  return useClientFetch<ProductResponse>("/api/v1/products", {
    category_id: categoryId,
    per_page: perPage,
  });
}

export function useProductsByBrand(brandId: number | string, perPage: number = 12) {
  return useClientFetch<ProductResponse>("/api/v1/products", {
    brand_id: brandId,
    per_page: perPage,
  });
}

export function useProductsByPriceRange(min: number, max: number, perPage: number = 12) {
  return useClientFetch<ProductResponse>("/api/v1/products", {
    'price_range[min]': min,
    'price_range[max]': max,
    per_page: perPage,
  });
}