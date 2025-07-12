"use client";

import type React from "react";
import { useState, useEffect, useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
// import {
// 	Select,
// 	SelectContent,
// 	SelectItem,
// 	SelectTrigger,
// 	SelectValue,
// } from "@/components/ui/select";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Upload, X } from "lucide-react";
import { Brand } from "@/types/brands";
import Image from "next/image";
import { Checkbox } from "../ui/checkbox";
import { createBrandAction } from "@/lib/actions/brand-action";
import { initialState } from "@/lib/difinitions";

export function BrandModal({
	isOpen,
	onClose,
	brand,
	onBrandCreated,
}: {
	isOpen: boolean;
	onClose: () => void;
	brand: Brand | undefined;
	onBrandCreated: () => void;
}) {
	const [state, action, pending] = useActionState(
		createBrandAction,
		initialState
	);
	const [formData, setFormData] = useState<Partial<Brand>>({
		name: "",
		description: "",
		country: "",
		website_url: "",
		logo: "",
		is_active: false,
	});
	const [logoPreview, setLogoPreview] = useState<string>("");

	useEffect(() => {
		if (isOpen) {
			if (brand) {
				setFormData({
					name: brand.name,
					description: brand.description,
					country: brand.country,
					website_url: brand.website_url,
					logo: brand.logo,
					is_active: brand.is_active,
				});
			}
		} else {
			setFormData({
				name: "",
				description: "",
				country: "",
				website_url: "",
				logo: "",
				is_active: false,
			});
			setLogoPreview("");
			state.errors = {};
			state.success = false;
		}
	}, [isOpen, brand, state]);

	useEffect(() => {
		if (state.success) {
			onBrandCreated();
		}
	}, [state.success, onBrandCreated]);

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

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>{brand ? "Edit Brand" : "Add New Brand"}</DialogTitle>
					<DialogDescription>
						{brand
							? "Update the brand information below."
							: "Create a new brand to organize your products."}
					</DialogDescription>
				</DialogHeader>
				{state.errors && "general" in state.errors && state.errors.general && (
					<span className="text-destructive">
						{state.errors.general.join(", ")}
					</span>
				)}
				<form action={action} className="space-y-4">
					{/* Brand Name */}
					<div className="space-y-2">
						<Label htmlFor="name">Name</Label>
						<Input
							id="name"
							name="name"
							value={formData.name}
							onChange={(e) =>
								setFormData((prev) => ({ ...prev, name: e.target.value }))
							}
							placeholder="Enter brand name"
						/>
						{state.errors && "name" in state.errors && state.errors.name && (
							<p className="text-sm text-red-500">
								{state.errors.name.join(", ")}
							</p>
						)}
					</div>

					{/* Description */}
					<div className="space-y-2">
						<Label htmlFor="description">Description</Label>
						<Textarea
							id="description"
							name="description"
							value={formData.description ? formData.description : ""}
							onChange={(e) =>
								setFormData((prev) => ({
									...prev,
									description: e.target.value,
								}))
							}
							placeholder="Enter brand description"
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

					{/* Country */}
					<div className="space-y-2">
						<Label htmlFor="country">Country</Label>
						<Input
							id="country"
							name="country"
							value={formData.country}
							onChange={(e) =>
								setFormData((prev) => ({
									...prev,
									country: e.target.value,
								}))
							}
							placeholder="Enter the country of the Brand"
						/>
						{/* <Select
							name="country"
							value={formData.country}
							onValueChange={(value) =>
								setFormData((prev) => ({ ...prev, country: value }))
							}
						>
							<SelectTrigger>
								<SelectValue placeholder="Select country" />
							</SelectTrigger>
							<SelectContent>
								{countries.map((country) => (
									<SelectItem key={country} value={country}>
										{country}
									</SelectItem>
								))}
							</SelectContent>
						</Select> */}
						{state.errors &&
							"country" in state.errors &&
							state.errors.country && (
								<p className="text-sm text-red-500">
									{state.errors.country.join(", ")}
								</p>
							)}
					</div>

					{/* Website */}
					<div className="space-y-2">
						<Label htmlFor="website_url">Website</Label>
						<Input
							id="website_url"
							name="website_url"
							value={formData.website_url}
							onChange={(e) =>
								setFormData((prev) => ({
									...prev,
									website_url: e.target.value,
								}))
							}
							placeholder="https://www.example.com"
						/>
						{state.errors &&
							"website_url" in state.errors &&
							state.errors.website_url && (
								<p className="text-sm text-red-500">
									{state?.errors?.website_url.join(", ")}
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
							{pending ? "Saving..." : brand ? "Update Brand" : "Add Brand"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
