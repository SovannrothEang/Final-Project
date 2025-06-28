import {
	Category,
	CreateCategoryData,
	UpdateCategoryData,
	//   CategoryFilters,
	CategoryResponse,
} from "@/types/category";

// const API_URL = process.env.API_BASE_URL?.replace(/\/$/, "") || ""
// const API_URL = `${process.env.API_BASE_URL}/api/v1/categories`
// const API_URL = process.env.API_BASE_URL + "/api/v1/categories";
// const API_URL = `${API_BASE}/api/v1/categories`
const API_URL = `${process.env.API_BASE_URL}/api/v1/categories`;

// export async function fetchCategories(filters?: CategoryFilters): Promise<Category[]> {
//   const query = filters
//     ? `?${new URLSearchParams(
//         Object.entries(filters).reduce<Record<string, string>>((acc, [key, value]) => {
//           if (value !== undefined) acc[key] = String(value)
//           return acc
//         }, {})
//       ).toString()}`
//     : ""

//   const res = await fetch(`${API_BASE_URL}${query}`)
//   if (!res.ok) throw new Error("Failed to fetch categories")
//   const data: CategoryResponse = await res.json()
//   return data.data
// }

export async function fetchCategories(): Promise<Category[]> {
	const res = await fetch(API_URL, {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	});
	if (!res.ok) throw new Error("Failed to fetch categories ...!");
	const result: CategoryResponse = await res.json();
	return result.data;
}

export async function createCategory(
	payload: CreateCategoryData
): Promise<Category> {
	const res = await fetch(API_URL, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});
	if (!res.ok) throw new Error("Failed to create category");
	return await res.json();
}

export async function updateCategory(
	id: string,
	payload: UpdateCategoryData
): Promise<Category> {
	const res = await fetch(`${API_URL}/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});
	if (!res.ok) throw new Error("Failed to update category");
	return await res.json();
}

export async function deleteCategory(id: string): Promise<void> {
	const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
	if (!res.ok) throw new Error("Failed to delete category");
}
