"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, X, ArrowLeft } from "lucide-react";
import Link from "next/link";

const categories = [
	"Laptops",
	"Desktops",
	"Gaming",
	"Monitors",
	"Accessories",
	"Furniture",
];

const brands = [
	"Razer",
	"MSI",
	"Dell",
	"Asus",
	"Lenovo",
	"Sony",
	"Samsung",
	"Corsair",
	"SteelSeries",
	"Logitech",
	"Custom",
];

export default function NewProductPage() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [images, setImages] = useState<string[]>([]);
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		shortDescription: "",
		sku: "",
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
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center gap-4">
				<Button variant="ghost" size="icon" asChild>
					<Link href="/admin/products">
						<ArrowLeft className="w-4 h-4" />
					</Link>
				</Button>
				<div>
					<h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
					<p className="text-gray-600">Create a new product for your store</p>
				</div>
			</div>

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
					<Card>
						<CardHeader>
							<CardTitle>Inventory</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="sku">SKU</Label>
								<Input
									id="sku"
									value={formData.sku}
									onChange={(e) => handleInputChange("sku", e.target.value)}
									placeholder="Enter SKU"
								/>
							</div>

							<div className="flex items-center space-x-2">
								<Checkbox
									id="trackQuantity"
									checked={formData.trackQuantity}
									onCheckedChange={(checked) =>
										handleInputChange("trackQuantity", checked as boolean)
									}
								/>
								<Label htmlFor="trackQuantity">Track quantity</Label>
							</div>

							{formData.trackQuantity && (
								<div className="space-y-4">
									<div className="space-y-2">
										<Label htmlFor="stock">Quantity</Label>
										<Input
											id="stock"
											type="number"
											value={formData.stock}
											onChange={(e) =>
												handleInputChange("stock", e.target.value)
											}
											placeholder="0"
										/>
									</div>

									<div className="flex items-center space-x-2">
										<Checkbox
											id="allowBackorder"
											checked={formData.allowBackorder}
											onCheckedChange={(checked) =>
												handleInputChange("allowBackorder", checked as boolean)
											}
										/>
										<Label htmlFor="allowBackorder">
											Continue selling when out of stock
										</Label>
									</div>
								</div>
							)}
						</CardContent>
					</Card>

					{/* Shipping */}
					<Card>
						<CardHeader>
							<CardTitle>Shipping</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="weight">Weight (kg)</Label>
									<Input
										id="weight"
										type="number"
										step="0.01"
										value={formData.weight}
										onChange={(e) =>
											handleInputChange("weight", e.target.value)
										}
										placeholder="0.00"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="dimensions">Dimensions (L x W x H cm)</Label>
									<Input
										id="dimensions"
										value={formData.dimensions}
										onChange={(e) =>
											handleInputChange("dimensions", e.target.value)
										}
										placeholder="e.g., 30 x 20 x 10"
									/>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Sidebar */}
				<div className="space-y-6">
					{/* Product Status */}
					<Card>
						<CardHeader>
							<CardTitle>Product Status</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center space-x-2">
								<Checkbox
									id="isActive"
									checked={formData.isActive}
									onCheckedChange={(checked) =>
										handleInputChange("isActive", checked as boolean)
									}
								/>
								<Label htmlFor="isActive">Active</Label>
							</div>

							<div className="flex items-center space-x-2">
								<Checkbox
									id="isFeatured"
									checked={formData.isFeatured}
									onCheckedChange={(checked) =>
										handleInputChange("isFeatured", checked as boolean)
									}
								/>
								<Label htmlFor="isFeatured">Featured Product</Label>
							</div>
						</CardContent>
					</Card>

					{/* Product Organization */}
					<Card>
						<CardHeader>
							<CardTitle>Product Organization</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="category">Category</Label>
								<Select
									value={formData.category}
									onValueChange={(value) =>
										handleInputChange("category", value)
									}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select category" />
									</SelectTrigger>
									<SelectContent>
										{categories.map((category) => (
											<SelectItem key={category} value={category}>
												{category}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							<div className="space-y-2">
								<Label htmlFor="brand">Brand</Label>
								<Select
									value={formData.brand}
									onValueChange={(value) => handleInputChange("brand", value)}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select brand" />
									</SelectTrigger>
									<SelectContent>
										{brands.map((brand) => (
											<SelectItem key={brand} value={brand}>
												{brand}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							<div className="space-y-2">
								<Label htmlFor="tags">Tags</Label>
								<Input
									id="tags"
									value={formData.tags}
									onChange={(e) => handleInputChange("tags", e.target.value)}
									placeholder="gaming, laptop, rgb (comma separated)"
								/>
							</div>
						</CardContent>
					</Card>

					{/* Actions */}
					<Card>
						<CardContent className="pt-6">
							<div className="space-y-3">
								<Button
									type="submit"
									className="w-full bg-red-500 hover:bg-red-600"
									disabled={isLoading}
								>
									{isLoading ? "Creating..." : "Create Product"}
								</Button>
								<Button
									type="button"
									variant="outline"
									className="w-full"
									asChild
								>
									<Link href="/admin/products">Cancel</Link>
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</form>
		</div>
	);
}
