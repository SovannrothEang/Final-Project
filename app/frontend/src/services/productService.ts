import useFetch from "@/utils/client-fetching";
import { Product, ProductResponse, ProductFilters } from "@/types/product";

export function useProducts(filters?: ProductFilters) {
  return useFetch<ProductResponse>("/products", {
    ...filters,
    per_page: filters?.per_page || 8,
  });
}

export function useProductById(id: number) {
  return useFetch<{ success: boolean; data: Product }>(`/products/${id}`);
}

export function useNewArrivals() {
  return useFetch<ProductResponse>("/products", {
    is_new: true,
    per_page: 7,
    sort_by: "created_at",
    sort_direction: "desc"
  });
}

export function useTopSelling() {
  return useFetch<ProductResponse>("/products", {
    is_top: 1,
    per_page: 4
  });
}