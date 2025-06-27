"use client";

import type React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ProductForm from "@/components/pages/products/add/ProductForm";

// const categories = [
// 	"Laptops",
// 	"Desktops",
// 	"Gaming",
// 	"Monitors",
// 	"Accessories",
// 	"Furniture",
// ];

// const brands = [
// 	"Razer",
// 	"MSI",
// 	"Dell",
// 	"Asus",
// 	"Lenovo",
// 	"Sony",
// 	"Samsung",
// 	"Corsair",
// 	"SteelSeries",
// 	"Logitech",
// 	"Custom",
// ];

export default function NewProductPage() {
	const router = useRouter();

	return (
		<div className="space-y-6">
			<div className="flex items-center gap-4">
				<Button variant="ghost" size="icon" onClick={() => router.back()}>
					<Link href="/admin">
						<ArrowLeft className="w-4 h-4" />
					</Link>
				</Button>
				<div>
					<h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
					<p className="text-gray-600">Create a new product for your store</p>
				</div>
			</div>

			<ProductForm />
		</div>
	);
}
