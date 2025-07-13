import useClientFetch from "@/utils/client-fetching";
import {
	Brand,
	BrandFilters,
	BrandResponse,
	BrandResponseStrip,
} from "@/types/brands";

export function useBrands(filters?: BrandFilters) {
	return useClientFetch<BrandResponse>("/brands", {
		...filters,
		sort_direction: filters?.sort_direction || "asc", // default sorting
	});
}

export function useBrandById(id: number) {
	return useClientFetch<{ success: boolean; data: Brand }>(`/brands/${id}`);
}

export function useActiveBrands() {
	return useClientFetch<BrandResponse>("/brands", {
		is_active: 1,
		sort_by: "name",
		sort_direction: "asc",
	});
}

export function useBrandStrip() {
	return useClientFetch<BrandResponseStrip>("/brands", {
		sort_by: "name",
		sort_direction: "asc",
	});
}
