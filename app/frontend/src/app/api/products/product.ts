import { Product, ProductResponse } from "@/types/product";

// const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/products`;
const API_URL = `http://localhost:8000/api/v1/products`;

export async function fetchProducts(): Promise<Product[]> {
	const res = await fetch(API_URL, {
		method: "GET",
		headers: { "Content-Type": "application/json" },
		cache: "force-cache",
	});
	if (!res.ok) throw new Error("Fail to fetch products...");
	const result: ProductResponse = await res.json();
	return result.data;
}
