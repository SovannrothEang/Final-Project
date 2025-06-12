"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/types/product";
import ProductImage from "./ProductImage";
import ProductPricing from "./ProductPricing";
import ProductInventory from "./ProductInventory";
import ProductSidebar from "./ProductSidebar";

export default function EditProductPage({ product }: { product: Product }) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	// const [images, setImages] = useState<string>(product.images);
	const [formData, setFormData] = useState(product);

	const handleInputChange = (field: string, value: string | boolean) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	// const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	const files = e.target.files;
	// 	if (files) {
	// 		Array.from(files).forEach((file) => {
	// 			const reader = new FileReader();
	// 			reader.onload = (e) => {
	// 				if (e.target?.result) {
	// 					setImages((prev) => [...prev, e.target!.result as string]);
	// 				}
	// 			};
	// 			reader.readAsDataURL(file);
	// 		});
	// 	}
	// };

	// const removeImage = (index: number) => {
	// 	setImages((prev) => prev.filter((_, i) => i !== index));
	// };

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// console.log("Updating product:", { ...formData, images });

			// Redirect to products list
			router.push("/admin/products");
		} catch (error) {
			console.error("Failed to update product:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className="grid grid-cols-1 lg:grid-cols-3 gap-6"
			>
				{/* Main Content */}
				<div className="lg:col-span-2 space-y-6">
					{/* Basic Information */}
					<Card>
						<CardHeader>
							<CardTitle>Basic Information</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="name">Product Name *</Label>
								<Input
									id="name"
									value={formData.name}
									onChange={(e) => handleInputChange("name", e.target.value)}
									placeholder="Enter product name"
									required
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="description">Description</Label>
								<Textarea
									id="description"
									value={formData.description}
									onChange={(e) =>
										handleInputChange("description", e.target.value)
									}
									placeholder="Enter detailed product description"
									rows={6}
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="shortDescription">Short Description</Label>
								<Textarea
									id="shortDescription"
									value={formData.description}
									onChange={(e) =>
										handleInputChange("shortDescription", e.target.value)
									}
									placeholder="Enter short description for product cards"
									rows={3}
								/>
							</div>
						</CardContent>
					</Card>

					<ProductImage />

					<ProductPricing
						price={formData.price}
						handleInputChange={handleInputChange}
					/>

					<ProductInventory
						sku={formData.sku}
						handleInputChange={handleInputChange}
					/>
				</div>

				<ProductSidebar
					isLoading={isLoading}
					brand={formData.brand}
					category={formData.category}
					handleInputChange={handleInputChange}
				/>
			</form>
		</>
	);
}
