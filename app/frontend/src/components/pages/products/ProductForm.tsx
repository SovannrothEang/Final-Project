"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/types/product";
import ProductImage from "./edit/ProductImage";
import ProductSidebar from "./edit/ProductSidebar";

const defaultProduct: Product = {
	id: "",
	name: "",
	image: "", // Assuming single image for now; adjust if multiple images are needed
	description: "",
	short_description: "",
	brand: "",
	category: "",
	price: 0,
	stock: 0,
	option: {
		color: [],
		size: [],
	},
	discount: 0,
	status: "inactive", // or whatever default you prefer
	in_stock: true,
	is_active: true,
	is_new: false,
	is_top: 0,
	review: 0,
	created_at: new Date().toISOString(),
	updated_at: new Date().toISOString(),
};

export default function ProductForm({ product }: { product?: Product }) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	// const [images, setImages] = useState<string>(product.images);
	const [formData, setFormData] = useState<Product>({
		...defaultProduct,
		...product,
		option: {
			...defaultProduct.option,
			...(product?.option || {}), // Ensure nested option is merged correctly
		},
	});

	const handleInputChange = (
		field: string,
		value: string | number | boolean | { color: string[]; size: string[] }
	) => {
		if (field === "option") {
			// Handle nested object update
			setFormData((prev) => ({
				...prev,
				option: value as { color: string[]; size: string[] },
			}));
		} else {
			// Handle regular field update
			setFormData((prev) => ({ ...prev, [field]: value }));
		}
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
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="price">Price *</Label>
									<Input
										id="price"
										type="number"
										step="0.01"
										value={formData.price}
										onChange={(e) => handleInputChange("price", e.target.value)}
										placeholder="0.00"
										required
									/>
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="stock">Quantity</Label>
								<Input
									id="stock"
									type="number"
									value={formData.stock}
									onChange={(e) => handleInputChange("stock", e.target.value)}
									placeholder="0"
								/>
							</div>
						</CardContent>
					</Card>

					<ProductImage />
				</div>

				<ProductSidebar
					isLoading={isLoading}
					isActive={formData.is_active}
					brand={formData.brand}
					category={formData.category}
					handleInputChange={handleInputChange}
				/>
			</form>
		</>
	);
}
