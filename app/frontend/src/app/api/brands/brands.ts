import type {
	Brand,
	CreateBrandData,
	UpdateBrandData,
	BrandResponse,
} from "@/types/brands";
import { getToken } from "@/lib/session";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_URL = `${API_BASE}/api/v1/admin/brands`;

// Helper function to get authenticated headers
async function getAuthHeaders() {
	const token = await getToken();
	return {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	};
}

// Helper function to prepare data for API (only send the fields your API expects)
function convertBrandDataForAPI(data: CreateBrandData) {
	return {
		name: data.name,
		description: data.description,
		country: data.country,
		website_url: data.website_url,
		is_active: data.is_active, // Keep as boolean
		logo: data.logo, // Include logo field
	};
}

export async function fetchBrands(): Promise<Brand[]> {
	const headers = await getAuthHeaders();
	const res = await fetch(`${API_URL}?name=&country=&is_active=&user_id=`, {
		method: "GET",
		headers,
	});

	if (!res.ok) throw new Error("Failed to fetch brands");
	const result: BrandResponse = await res.json();
	return result.data;
}

export async function createBrand(payload: CreateBrandData): Promise<Brand> {
	const headers = await getAuthHeaders();
	const apiPayload = convertBrandDataForAPI(payload);

	const res = await fetch(API_URL, {
		method: "POST",
		headers,
		body: JSON.stringify(apiPayload),
	});

	if (!res.ok) {
		const errorText = await res.text();
		console.error("Create failed:", {
			status: res.status,
			statusText: res.statusText,
			error: errorText,
			payload: apiPayload,
		});

		// Try to parse error response for more details
		try {
			const errorData = JSON.parse(errorText);
			console.error("Validation errors:", errorData);
			throw new Error(`Failed to create brand: ${JSON.stringify(errorData)}`);
		} catch {
			throw new Error(
				`Failed to create brand: ${res.status} ${res.statusText} - ${errorText}`
			);
		}
	}

	const result = await res.json();
	console.log("Create response:", result); // Debug log

	return result.data || result;
}

export async function updateBrand(
	id: number,
	payload: UpdateBrandData
): Promise<Brand> {
	const headers = await getAuthHeaders();
	const apiPayload = convertBrandDataForAPI(payload);

	const res = await fetch(`${API_URL}/${id}`, {
		method: "PUT",
		headers,
		body: JSON.stringify(apiPayload),
	});

	if (!res.ok) {
		const errorText = await res.text();
		console.error("Update failed:", {
			status: res.status,
			statusText: res.statusText,
			error: errorText,
			payload: apiPayload,
		});

		try {
			const errorData = JSON.parse(errorText);
			console.error("Validation errors:", errorData);
			throw new Error(`Failed to update brand: ${JSON.stringify(errorData)}`);
		} catch {
			throw new Error(
				`Failed to update brand: ${res.status} ${res.statusText} - ${errorText}`
			);
		}
	}

	const result = await res.json();
	console.log("Update response:", result); // Debug log

	return result.data || result;
}

export async function deleteBrand(id: number): Promise<void> {
	const headers = await getAuthHeaders();
	const res = await fetch(`${API_URL}/${id}`, {
		method: "DELETE",
		headers,
	});

	if (!res.ok) throw new Error("Failed to delete brand");
}
