"use client";

import type React from "react";
import { useState, useEffect, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Plus, X } from "lucide-react";
import Image from "next/image";
import { initialState } from "@/lib/difinitions";
import { Product } from "@/types/product";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "../../ui/select";
import { Brand } from "@/types/brands";
import { Category } from "@/types/category";
import { productAction } from "@/lib/actions/product-action";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

export function ProductModal({
	isOpen,
	onClose,
	product,
	brands,
	categories,
	onProductCreated,
}: {
	isOpen: boolean;
	onClose: () => void;
	product: Product | undefined;
	brands: Brand[];
	categories: Category[];
	onProductCreated: () => void;
}) {
	const [formData, setFormData] = useState<Partial<Product>>({
		name: "",
		brand: undefined,
		category: undefined,
		description: "",
		short_description: "",
		price: 0,
		stock: 0,
		discount: 0,
		is_active: 1,
		is_new: false,
		is_top: 1,
		options: {} as Record<string, string[]>,
		image: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [transitionState, startTransition] = useTransition();
	const [actionState, setActionState] = useState(initialState);

	const [newOptionKey, setNewOptionKey] = useState("");
	const [newOptionValue, setNewOptionValue] = useState("");

	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			const file = event.target.files[0];
			setSelectedFile(file);

			const previewUrl = URL.createObjectURL(file);
			setImagePreview(previewUrl);
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);
		let newImageUrl;
		try {
			if (selectedFile) {
				const imageFormData = new FormData();
				imageFormData.append("file", selectedFile);
				imageFormData.append("name", formData.name || "untitled");
				imageFormData.append("productId", product?.id?.toString() || "new");
				imageFormData.append("imageId", Date.now().toString());

				const uploadResponse = await fetch("/api/upload", {
					method: "POST",
					body: imageFormData,
				});

				if (!uploadResponse.ok) {
					throw new Error("Failed to upload image");
				}

				const imageData = await uploadResponse.json();
				// setFormData((prev) => ({ ...prev, image: imageData.url }));
				newImageUrl = imageData.url;
			}

			const dataToSend = {
				...formData,
				brand_id: formData.brand?.id,
				category_id: formData.category?.id,
				id: product?.id,
				image: newImageUrl,
			};

			delete dataToSend.brand;
			delete dataToSend.category;

			startTransition(async () => {
				const formDataObj = new FormData();
				Object.entries(dataToSend).forEach(([key, value]) => {
					if (value !== undefined && value !== null) {
						if (key === "image") {
							formDataObj.append("image", value ? value.toString() : "");
						} else {
							formDataObj.append(
								key,
								typeof value === "object"
									? JSON.stringify(value)
									: value.toString()
							);
						}
					}
				});
				const result = await productAction(actionState, formDataObj);
				setActionState(result);
				setIsSubmitting(false);
				setSelectedFile(null);
			});
		} catch (error) {
			console.error("Error during submission:", error);
			setIsSubmitting(false);
		}
	};

	useEffect(() => {
		if (isOpen) {
			if (product) {
				setFormData({
					name: product.name,
					brand: product.brand,
					category: product.category,
					description: product.description,
					short_description: product.short_description,
					price: product.price,
					stock: product.stock,
					discount: product.discount,
					is_active: product.is_active,
					is_new: product.is_new,
					is_top: product.is_top,
					options: Array.isArray(product.options) ? {} : product.options,
					image: product.image,
				});
			}
		} else {
			setFormData({
				name: "",
				brand: undefined,
				category: undefined,
				description: "",
				short_description: "",
				price: 0,
				stock: 0,
				discount: 0,
				is_active: 1,
				is_new: false,
				is_top: 0,
				options: {} as Record<string, string[]>,
				image: "",
			});
			setActionState(initialState);
			setSelectedFile(null);
			setImagePreview(null);
		}
	}, [isOpen, product]);
	useEffect(() => {
		if (actionState.success) {
			onProductCreated();
			setActionState(initialState);
			setSelectedFile(null);
			setImagePreview(null);
		} else if (
			actionState.errors &&
			Object.keys(actionState.errors).length > 0
		) {
			console.log(
				"ProductModal: Server action reported errors:",
				actionState.errors
			);
		}
	}, [actionState.success, actionState.errors, onProductCreated]);
	useEffect(() => {
		return () => {
			if (imagePreview) {
				URL.revokeObjectURL(imagePreview);
			}
		};
	}, [imagePreview]);

	const addOption = () => {
		if (newOptionKey && newOptionValue) {
			const values = newOptionValue
				.split(",")
				.map((v) => v.trim())
				.filter((v) => v);
			setFormData({
				...formData,
				options: {
					...formData.options,
					[newOptionKey]: values,
				},
			});
			setNewOptionKey("");
			setNewOptionValue("");
		}
	};
	const removeOption = (key: string) => {
		const newOptions = { ...formData.options };
		delete newOptions[key];
		setFormData({ ...formData, options: newOptions });
	};
	const removeImage = async () => {
		if (formData.image) {
			const imagePath = formData.image;
			try {
				const response = await fetch("/api/upload", {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ imagePath }),
				});

				if (!response.ok) {
					throw new Error("Failed to delete image from server");
				}
			} catch (error) {
				console.error("Error deleting image:", error);
			}
		}
		setSelectedFile(null);
		setImagePreview(null);
		setFormData((prev) => ({ ...prev, image: "" }));
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[500px] md:max-w-[700px] max-h-lx">
				<DialogHeader>
					<DialogTitle>
						{product ? "Edit Product" : "Add New Product"}
					</DialogTitle>
					<DialogDescription>
						{product
							? "Update the Product information below."
							: "Create a new Product to organize your products."}
					</DialogDescription>
				</DialogHeader>
				{actionState.errors &&
					"general" in actionState.errors &&
					actionState.errors.general && (
						<span className="text-destructive text-sm">
							{actionState.errors.general.join(", ")}
						</span>
					)}
				<form onSubmit={handleSubmit} className="space-y-4">
					{/* For ID */}
					<input type="hidden" name="id" value={product?.id || ""} />
					{/* Name */}
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="name">Product Name</Label>
							<Input
								id="name"
								value={formData.name}
								onChange={(e) =>
									setFormData({ ...formData, name: e.target.value })
								}
								placeholder="Enter product name"
								required
							/>
							{actionState.errors &&
								"name" in actionState.errors &&
								actionState.errors.name && (
									<p className="text-sm text-red-500">
										{actionState.errors.name.join(", ")}
									</p>
								)}
						</div>

						{/* Brief description */}
						<div className="space-y-2">
							<Label htmlFor="short_description">Short Description</Label>
							<Input
								id="short_description"
								value={
									formData.short_description ? formData.short_description : ""
								}
								onChange={(e) =>
									setFormData({
										...formData,
										short_description: e.target.value,
									})
								}
								placeholder="Brief product description"
							/>
							{actionState.errors &&
								"short_description" in actionState.errors &&
								actionState.errors.short_description && (
									<p className="text-sm text-red-500">
										{actionState.errors?.short_description.join(", ")}
									</p>
								)}
						</div>
					</div>

					{/* Brand and Category */}
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<Label htmlFor="brand">Brand</Label>
								<Select
									value={formData.brand?.id.toString() || ""}
									onValueChange={(value) => {
										const selectedBrand = brands.find(
											(b) => b.id.toString() === value
										);
										setFormData({
											...formData,
											brand: selectedBrand,
										});
									}}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select brand" />
									</SelectTrigger>
									<SelectContent>
										{brands.map((brand) => (
											<SelectItem key={brand.id} value={brand.id.toString()}>
												{brand.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
							{actionState.errors &&
								"brand_id" in actionState.errors &&
								actionState.errors.brand_id && (
									<span className="text-destructive text-sm">
										{actionState.errors.brand_id.join(", ")}
									</span>
								)}
						</div>
						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<Label htmlFor="category">Category</Label>
								<Select
									value={formData.category?.id.toString() || ""}
									onValueChange={(value) => {
										const selectedCategory = categories.find(
											(c) => c.id.toString() === value
										);
										setFormData({
											...formData,
											category: selectedCategory
												? {
														id: Number(selectedCategory.id),
														name: selectedCategory.name,
												  }
												: undefined,
										});
									}}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select category" />
									</SelectTrigger>
									<SelectContent>
										{categories.map((category) => (
											<SelectItem
												key={category.id}
												value={category.id.toString()}
											>
												{category.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
							{actionState.errors &&
								"category_id" in actionState.errors &&
								actionState.errors.category_id && (
									<span className="text-destructive text-sm">
										{actionState.errors.category_id.join(", ")}
									</span>
								)}
						</div>
					</div>

					{/* Description */}
					<div className="space-y-2">
						<Label htmlFor="description">Description</Label>
						<Textarea
							id="description"
							value={formData.description ? formData.description : ""}
							onChange={(e) =>
								setFormData({ ...formData, description: e.target.value })
							}
							placeholder="Enter detailed product description"
							className="min-h-[70px]"
							rows={1}
						/>
						{actionState.errors &&
							"description" in actionState.errors &&
							actionState.errors.description && (
								<p className="text-sm text-red-500">
									{actionState.errors?.description.join(", ")}
								</p>
							)}
					</div>

					<div className="grid grid-cols-2 gap-2">
						{/* Image Upload */}
						<div className="space-y-4">
							<Label htmlFor="image">Image</Label>
							<div
								className="relative flex h-32 w-32 cursor-pointer items-center
							justify-center rounded-lg border-2 border-dashed border-gray-300 transition-colors hover:border-gray-400"
							>
								{imagePreview || formData.image ? (
									<>
										<Image
											src={imagePreview || formData.image || "/placeholder.svg"}
											alt="Image preview"
											fill
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
											className="rounded-lg object-cover"
											// width={128}
											// height={128}
										/>
										<button
											type="button"
											onClick={removeImage}
											className="z-10 cursor-pointer absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
										>
											<X className="h-3 w-3" />
										</button>
									</>
								) : (
									<div className="flex flex-col items-center justify-center text-gray-500">
										<Plus className="h-8 w-8" />
										<span className="mt-1 text-sm">Add Image</span>
									</div>
								)}
								<Input
									id="image"
									type="file"
									accept="image/*"
									onChange={handleFileChange}
									className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
								/>
							</div>
							<p className="text-xs text-gray-500 mt-1">
								{isSubmitting && selectedFile
									? "Uploading image..."
									: "Upload a product image less than 5MB"}
							</p>
						</div>
						{/* Pricing and Stock */}
						<div className="grid grid-rows-3 gap-4">
							<div className="space-y-2">
								<Label htmlFor="price">Price ($) *</Label>
								<Input
									id="price"
									name="price"
									type="number"
									step="0.01"
									// value={formData.price}
									value={formData.price === 0 ? "" : formData.price}
									// onChange={(e) =>
									// 	setFormData({
									// 		...formData,
									// 		price: parseFloat(e.target.value),
									// 	})
									// }
									onChange={(e) => {
										const val = e.target.value;
										setFormData({
											...formData,
											price: val === "" ? 0 : parseFloat(val),
										});
									}}
									placeholder="0.00"
								/>
								{actionState.errors &&
									"price" in actionState.errors &&
									actionState.errors.price && (
										<p className="text-sm text-red-500">
											{actionState.errors?.price.join(", ")}
										</p>
									)}
							</div>
							<div className="space-y-2">
								<Label htmlFor="discount">Discount (%)</Label>
								{/* <Input
								id="discount"
								name="discount"
								type="number"
								min="0"
								max="100"
								value={formData.discount}
								onChange={(e) =>
									setFormData({
										...formData,
										discount: parseInt(e.target.value),
									})
								}
								placeholder="0 %"
							/> */}
								<Input
									id="discount"
									name="discount"
									type="number"
									min="0"
									max="100"
									value={formData.discount === 0 ? "" : formData.discount}
									onChange={(e) => {
										const val = e.target.value;
										setFormData({
											...formData,
											discount: val === "" ? 0 : parseInt(val),
										});
									}}
									placeholder="0 %"
								/>
								{actionState.errors &&
									"discount" in actionState.errors &&
									actionState.errors.discount && (
										<p className="text-sm text-red-500">
											{actionState.errors?.discount.join(", ")}
										</p>
									)}
							</div>
							<div className="space-y-2">
								<Label htmlFor="stock">Stock Quantity *</Label>
								<Input
									id="stock"
									name="stock"
									type="number"
									min="0"
									value={formData.stock}
									onChange={(e) =>
										setFormData({
											...formData,
											stock: parseInt(e.target.value),
										})
									}
									placeholder="0"
								/>
								{actionState.errors &&
									"stock" in actionState.errors &&
									actionState.errors.stock && (
										<p className="text-sm text-red-500">
											{actionState.errors?.stock.join(", ")}
										</p>
									)}
							</div>
						</div>
					</div>

					{/* Product Options */}
					<div className="space-y-4">
						<Label>Product Options</Label>
						<div className="space-y-2">
							{formData.options &&
								Object.entries(formData.options).map(([key, values]) => (
									<div
										key={key}
										className="flex items-center gap-2 px-3 py-1.5 border rounded-lg bg-gray-50"
									>
										<span className="font-medium text-sm">{key}:</span>
										<div className="flex gap-1 flex-wrap">
											{values.map((value, index) => (
												<Badge
													key={index}
													variant="secondary"
													className="text-xs"
												>
													{value}
												</Badge>
											))}
										</div>
										<Button
											type="button"
											variant="ghost"
											size="sm"
											onClick={() => removeOption(key)}
										>
											<X className="h-4 w-4" />
										</Button>
									</div>
								))}
						</div>
						<div className="flex gap-2">
							<Input
								placeholder="Option name (e.g., color, size)"
								value={newOptionKey}
								onChange={(e) => setNewOptionKey(e.target.value)}
							/>
							<Input
								placeholder="Values (comma-separated)"
								value={newOptionValue}
								onChange={(e) => setNewOptionValue(e.target.value)}
							/>
							<Button type="button" onClick={addOption} variant="outline">
								<Plus className="h-4 w-4" />
							</Button>
						</div>
						<input
							type="hidden"
							name="options"
							value={JSON.stringify(formData.options)}
						/>
						{actionState.errors &&
							"options" in actionState.errors &&
							actionState.errors.options && (
								<p className="text-sm text-red-500">
									{actionState.errors?.options.join(", ")}
								</p>
							)}
					</div>

					{/* Status */}
					<div className="flex items-center space-x-2 space-y-2">
						<Switch
							id="is_active"
							name="is_active"
							checked={formData.is_active === 1 ? true : false}
							onCheckedChange={(checked: boolean) =>
								setFormData((prev) => ({
									...prev,
									is_active: checked ? 1 : 0,
								}))
							}
						/>
						<Label htmlFor="is_active">Active</Label>
					</div>

					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							className="cursor-pointer"
							onClick={onClose}
							disabled={isSubmitting || transitionState}
						>
							Cancel
						</Button>
						<Button
							type="submit"
							className="bg-red-600 hover:bg-red-700 cursor-pointer"
							disabled={isSubmitting || transitionState}
						>
							{isSubmitting
								? selectedFile
									? "Uploading Image..."
									: "Saving..."
								: product
								? "Update Product"
								: "Add Product"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
