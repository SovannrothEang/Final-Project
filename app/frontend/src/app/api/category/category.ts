// import {
// 	Category,
// 	CreateCategoryData,
// 	UpdateCategoryData,
// 	//   CategoryFilters,
// 	CategoryResponse,
// } from "@/types/category";

// // const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") || ""
// // const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/categories`
// // const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "/api/v1/categories";
// // const API_URL = `${API_BASE}/api/v1/categories`
// const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/categories`;

// // export async function fetchCategories(filters?: CategoryFilters): Promise<Category[]> {
// //   const query = filters
// //     ? `?${new URLSearchParams(
// //         Object.entries(filters).reduce<Record<string, string>>((acc, [key, value]) => {
// //           if (value !== undefined) acc[key] = String(value)
// //           return acc
// //         }, {})
// //       ).toString()}`
// //     : ""

// //   const res = await fetch(`${NEXT_PUBLIC_API_BASE_URL}${query}`)
// //   if (!res.ok) throw new Error("Failed to fetch categories")
// //   const data: CategoryResponse = await res.json()
// //   return data.data
// // }

// export async function fetchCategories(): Promise<Category[]> {
// 	const res = await fetch(API_URL, {
// 		method: "GET",
// 		headers: { "Content-Type": "application/json" },
// 	});
// 	if (!res.ok) throw new Error("Failed to fetch categories ...!");

// 	const result: CategoryResponse = await res.json();
// 	return result.data;
// }

// export async function createCategory(
// 	payload: CreateCategoryData
// ): Promise<Category> {
// 	const res = await fetch(API_URL, {
// 		method: "POST",
// 		headers: { "Content-Type": "application/json" },
// 		body: JSON.stringify(payload),
// 	});
// 	if (!res.ok) throw new Error("Failed to create category");
// 	return await res.json();
// }

// export async function updateCategory(
// 	id: string,
// 	payload: UpdateCategoryData
// ): Promise<Category> {
// 	const res = await fetch(`${API_URL}/${id}`, {
// 		method: "PUT",
// 		headers: { "Content-Type": "application/json" },
// 		body: JSON.stringify(payload),
// 	});
// 	if (!res.ok) throw new Error("Failed to update category");
// 	return await res.json();
// }

// export async function deleteCategory(id: string): Promise<void> {
// 	const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
// 	if (!res.ok) throw new Error("Failed to delete category");
// }




import type { Category, CreateCategoryData, CategoryResponse } from "@/types/category"
import { getToken } from "@/lib/session"

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL
const API_URL = `${API_BASE}/api/v1/admin/categories`

// Helper function to get authenticated headers
async function getAuthHeaders() {
  const token = await getToken()
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }
}

export async function fetchCategories(): Promise<Category[]> {
  const headers = await getAuthHeaders()
  const res = await fetch(API_URL, {
    method: "GET",
    headers,
  })

  if (!res.ok) throw new Error("Failed to fetch categories")
  const result: CategoryResponse = await res.json()
  return result.data
}

export async function createCategory(payload: CreateCategoryData): Promise<Category> {
  const headers = await getAuthHeaders()

  console.log("Creating category:", payload) // Debug log

  const res = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const errorText = await res.text()
    console.error("Create failed:", { status: res.status, statusText: res.statusText, error: errorText })
    throw new Error(`Failed to create category: ${res.status} ${res.statusText}`)
  }

  const result = await res.json()
  console.log("Create response:", result) // Debug log

  return result.data || result
}

export async function updateCategory(id: string, payload: CreateCategoryData): Promise<Category> {
  const headers = await getAuthHeaders()

  console.log("Updating category:", { id, payload }) // Debug log

  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const errorText = await res.text()
    console.error("Update failed:", { status: res.status, statusText: res.statusText, error: errorText })
    throw new Error(`Failed to update category: ${res.status} ${res.statusText}`)
  }

  const result = await res.json()
  console.log("Update response:", result) // Debug log

  // Handle different response formats - some APIs return the data directly, others wrap it
  return result.data || result
}

export async function deleteCategory(id: string): Promise<void> {
  const headers = await getAuthHeaders()
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers,
  })

  if (!res.ok) throw new Error("Failed to delete category")
}
