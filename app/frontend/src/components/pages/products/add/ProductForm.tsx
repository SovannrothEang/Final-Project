"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import ProductSidebar from "../edit/ProductSidebar";

export default function ProductForm() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [images, setImages] = useState<string[]>([]);
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		shortDescription: "",
		price: "",
		comparePrice: "",
		category: "",
		brand: "",
		stock: "",
		weight: "",
		dimensions: "",
		tags: "",
		isActive: true,
		isFeatured: false,
		trackQuantity: true,
		allowBackorder: false,
	});

	const handleInputChange = (field: string, value: string | boolean) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files) {
			// In a real app, you'd upload to a service like Cloudinary or AWS S3
			Array.from(files).forEach((file) => {
				const reader = new FileReader();
				reader.onload = (e) => {
					if (e.target?.result) {
						setImages((prev) => [...prev, e.target!.result as string]);
					}
				};
				reader.readAsDataURL(file);
			});
		}
	};

	const removeImage = (index: number) => {
		setImages((prev) => prev.filter((_, i) => i !== index));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));

			console.log("Creating product:", { ...formData, images });

			// Redirect to products list
			router.push("/admin");
		} catch (error) {
			console.error("Failed to create product:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
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
								value={formData.shortDescription}
								onChange={(e) =>
									handleInputChange("shortDescription", e.target.value)
								}
								placeholder="Enter short description for product cards"
								rows={3}
							/>
						</div>
					</CardContent>
				</Card>

				{/* Product Images */}
				<Card>
					<CardHeader>
						<CardTitle>Product Images</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{/* Upload Area */}
							<div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
								<Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
								<p className="text-sm text-gray-600 mb-2">
									Drag and drop images here, or click to select
								</p>
								<input
									type="file"
									multiple
									accept="image/*"
									onChange={handleImageUpload}
									className="hidden"
									id="image-upload"
								/>
								<Button type="button" variant="outline" asChild>
									<label htmlFor="image-upload" className="cursor-pointer">
										Choose Files
									</label>
								</Button>
							</div>

							{/* Image Preview */}
							{images.length > 0 && (
								<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
									{images.map((image, index) => (
										<div key={index} className="relative group">
											<Image
												src={image || "/placeholder.svg"}
												alt={`Product image ${index + 1}`}
												width={150}
												height={150}
												className="w-full h-32 object-cover rounded-lg border"
											/>
											<Button
												type="button"
												variant="destructive"
												size="icon"
												className="absolute top-2 right-2 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
												onClick={() => removeImage(index)}
											>
												<X className="w-3 h-3" />
											</Button>
										</div>
									))}
								</div>
							)}
						</div>
					</CardContent>
				</Card>

				{/* Pricing */}
				<Card>
					<CardHeader>
						<CardTitle>Pricing</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
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
							<div className="space-y-2">
								<Label htmlFor="comparePrice">Compare at Price</Label>
								<Input
									id="comparePrice"
									type="number"
									step="0.01"
									value={formData.comparePrice}
									onChange={(e) =>
										handleInputChange("comparePrice", e.target.value)
									}
									placeholder="0.00"
								/>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Inventory */}
			</div>

			{/* Sidebar */}
			<ProductSidebar
				isLoading={isLoading}
				isActive={formData.isActive}
				brand={formData.brand}
				category={formData.category}
				handleInputChange={handleInputChange}
			/>
		</form>
	);
}
