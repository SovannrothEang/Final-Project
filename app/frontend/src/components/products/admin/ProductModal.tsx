"use client";

import type React from "react";
import { useState, useEffect, useActionState } from "react";
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
import { Plus, Upload, X } from "lucide-react";
import Image from "next/image";
import { Checkbox } from "../../ui/checkbox";
import { initialState } from "@/lib/difinitions";
import { Product } from "@/types/product";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@radix-ui/react-select";
import { Brand } from "@/types/brands";
import { Category } from "@/types/category";
import { createProductAction } from "@/lib/actions/product-action";
import { Badge } from "@/components/ui/badge";

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
	const [state, formAction, pending] = useActionState(
		createProductAction,
		initialState
	);
	const [formData, setFormData] = useState<Partial<Product>>({
		name: "",
		brand: { id: 0, name: "" },
		category: { id: 0, name: "" },
		description: "",
		short_description: "",
		price: 0,
		stock: 0,
		discount: 0,
		is_active: true,
		is_new: false,
		is_top: false,
		options: {} as Record<string, string[]>,
		image: "",
	});

	const action = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = new FormData();
		data.append("name", formData.name || "");
		data.append("brand_id", formData.brand?.id.toString() || "");
		data.append("category_id", formData.category?.id.toString() || "");
		data.append("description", formData.description || "");
		data.append("short_description", formData.short_description || "");
		data.append("price", formData.price?.toString() || "0");
		data.append("stock", formData.stock?.toString() || "0");
		data.append("discount", formData.discount?.toString() || "0");
		data.append("is_active", formData.is_active?.toString() || "false");
		data.append("is_new", formData.is_new?.toString() || "false");
		data.append("is_top", formData.is_top?.toString() || "false");
		data.append("options", JSON.stringify(formData.options));
		data.append("image", formData.image || "");

		formAction(data);
	};
	const [logoPreview, setLogoPreview] = useState<string>("");
	const [newOptionKey, setNewOptionKey] = useState("");
	const [newOptionValue, setNewOptionValue] = useState("");

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
					options: product.options,
					image: product.image,
				});
			}
		} else {
			setFormData({
				name: "",
				brand: { id: 0, name: "" },
				category: { id: 0, name: "" },
				description: "",
				short_description: "",
				price: 0,
				stock: 0,
				discount: 0,
				is_active: true,
				is_new: false,
				is_top: false,
				options: {} as Record<string, string[]>,
				image: "",
			});
			setLogoPreview("");
			state.errors = {};
			state.success = false;
		}
	}, [isOpen, product, state]);

	useEffect(() => {
		if (state.success) {
			onProductCreated();
		}
	}, [state.success, onProductCreated]);

	// const isValidUrl = (url: string) => {
	// 	try {
	// 		new URL(url.startsWith("http") ? url : `https://${url}`);
	// 		return true;
	// 	} catch {
	// 		return false;
	// 	}
	// };

	const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setLogoPreview(reader.result as string);
				setFormData((prev) => ({ ...prev, logo: reader.result as string }));
			};
			reader.readAsDataURL(file);
		}
	};

	const removeLogo = () => {
		setLogoPreview("");
		setFormData((prev) => ({ ...prev, logo: "" }));
	};

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

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[500px]">
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
				{state.errors && "general" in state.errors && state.errors.general && (
					<span className="text-destructive">
						{state.errors.general.join(", ")}
					</span>
				)}
				<form onSubmit={action} className="space-y-4">
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
							{state.errors && "name" in state.errors && state.errors.name && (
								<p className="text-sm text-red-500">
									{state.errors.name.join(", ")}
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
							{state.errors &&
								"short_description" in state.errors &&
								state.errors.short_description && (
									<p className="text-sm text-red-500">
										{state.errors?.short_description.join(", ")}
									</p>
								)}
						</div>
					</div>

					{/* Brand and Category */}
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="brand">Brand</Label>
							<Select
								value={formData.brand?.id.toString()}
								onValueChange={(value) =>
									setFormData({
										...formData,
										brand: { id: parseInt(value), name: "" },
									})
								}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select brand" />
								</SelectTrigger>
								<SelectContent>
									{brands.map((brand) => (
										<SelectItem key={brand.id.toString()} value={brand.name}>
											{brand.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="space-y-2">
							<Label htmlFor="category">Category</Label>
							<Select
								value={formData.category?.id.toString()}
								onValueChange={(value) =>
									setFormData({
										...formData,
										category: { id: parseInt(value), name: "" },
									})
								}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select category" />
								</SelectTrigger>
								<SelectContent>
									{categories.map((category) => (
										<SelectItem key={category.id} value={category.id}>
											{category.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
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
							className="min-h-[100px]"
							rows={1}
						/>
						{state.errors &&
							"description" in state.errors &&
							state.errors.description && (
								<p className="text-sm text-red-500">
									{state.errors?.description.join(", ")}
								</p>
							)}
					</div>

					{/* Pricing and Stock */}
					<div className="grid grid-cols-3 gap-4">
						<div className="space-y-2">
							<Label htmlFor="price">Price ($) *</Label>
							<Input
								id="price"
								name="price"
								type="number"
								step="0.01"
								value={formData.price}
								onChange={(e) =>
									setFormData({
										...formData,
										price: parseFloat(e.target.value),
									})
								}
								placeholder="0.00"
							/>
							{state.errors &&
								"price" in state.errors &&
								state.errors.price && (
									<p className="text-sm text-red-500">
										{state.errors?.price.join(", ")}
									</p>
								)}
						</div>
						<div className="space-y-2">
							<Label htmlFor="discount">Discount (%)</Label>
							<Input
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
							/>
							{state.errors &&
								"discount" in state.errors &&
								state.errors.discount && (
									<p className="text-sm text-red-500">
										{state.errors?.discount.join(", ")}
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
									setFormData({ ...formData, stock: parseInt(e.target.value) })
								}
								placeholder="0"
							/>
							{state.errors &&
								"stock" in state.errors &&
								state.errors.stock && (
									<p className="text-sm text-red-500">
										{state.errors?.stock.join(", ")}
									</p>
								)}
						</div>
					</div>

					{/* Product Options */}
					<div className="space-y-4">
						<Label>Product Options</Label>
						<div className="space-y-3">
							{formData.options &&
								Object.entries(formData.options).map(([key, values]) => (
									<div
										key={key}
										className="flex items-center gap-2 p-3 border rounded-lg bg-gray-50"
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
						{state.errors && "stock" in state.errors && state.errors.stock && (
							<p className="text-sm text-red-500">
								{state.errors?.stock.join(", ")}
							</p>
						)}
					</div>

					{/* Status */}
					<div className="flex items-center space-x-2 space-y-2">
						<Label htmlFor="is_active">Active</Label>
						<Checkbox
							id="is_active"
							name="is_active"
							checked={formData.is_active || false}
							onCheckedChange={(checked: boolean) =>
								setFormData((prev) => ({
									...prev,
									is_active: checked,
								}))
							}
						/>
					</div>

					{/* Logo Upload */}
					<div className="space-y-2">
						<Label htmlFor="logo">Brand Logo</Label>
						<div className="flex items-center space-x-4">
							{logoPreview ? (
								<div className="relative">
									<Image
										src={logoPreview || "/placeholder.svg"}
										alt="Brand logo preview"
										className="w-20 h-20 object-cover rounded-md border"
									/>
									<button
										type="button"
										onClick={removeLogo}
										className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
									>
										<X className="w-3 h-3" />
									</button>
								</div>
							) : (
								<div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center">
									<Upload className="w-6 h-6 text-gray-400" />
								</div>
							)}
							<div className="flex-1">
								<Input
									id="logo"
									type="file"
									accept="image/*"
									onChange={handleLogoUpload}
									className="cursor-pointer"
								/>
								<p className="text-xs text-gray-500 mt-1">
									Upload a logo for this brand (optional)
								</p>
							</div>
						</div>
					</div>

					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={onClose}
							disabled={pending}
						>
							Cancel
						</Button>
						<Button
							type="submit"
							className="bg-red-600 hover:bg-red-700"
							disabled={pending}
						>
							{pending
								? "Saving..."
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
