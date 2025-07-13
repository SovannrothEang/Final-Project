"use client";

import type React from "react";
import { useState, useEffect, useTransition } from "react";
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
import { ImageIcon, X } from "lucide-react";
import { Brand } from "@/types/brands";
import Image from "next/image";
import { Checkbox } from "../ui/checkbox";
import { brandAction } from "@/lib/actions/brand-action";
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
	const [formData, setFormData] = useState<Partial<Brand>>({
		name: "",
		description: null,
		country: "",
		website_url: "",
		logo: null,
		is_active: 0,
	});
	const [transitionState, startTransition] = useTransition();
	const [actionState, setActionState] = useState(initialState);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [logoPreview, setLogoPreview] = useState<string | null>(null);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	useEffect(() => {
		if (isOpen) {
			if (brand) {
				setFormData({
					name: brand.name,
					description: brand.description,
					country: brand.country,
					website_url: brand.website_url,
					logo: brand.logo ? brand.logo : null,
					is_active: brand.is_active,
				});
			}
		} else {
			setFormData({
				name: "",
				description: "",
				country: "",
				website_url: "",
				logo: null,
				is_active: 0,
			});
			setLogoPreview(null);
			setSelectedFile(null);
			setActionState(initialState);
		}
	}, [isOpen, brand]);

	useEffect(() => {
		if (actionState.success) {
			onBrandCreated();
			setActionState(initialState);
			setSelectedFile(null);
			setLogoPreview(null);
		} else if (
			actionState.errors &&
			Object.keys(actionState.errors).length > 0
		) {
			console.log(
				"Brand Modal: Server action reported errors:",
				actionState.errors
			);
		}
	}, [actionState.success, actionState.errors, onBrandCreated]);
	useEffect(() => {
		return () => {
			if (logoPreview) {
				URL.revokeObjectURL(logoPreview);
			}
		};
	}, [logoPreview]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		startTransition(async () => {
			setIsSubmitting(true);
			let newLogoUrl;

			try {
				if (selectedFile) {
					if (selectedFile.size > 5 * 1024 * 1024) {
						throw new Error("File size exceeds 5MB limit");
					}
					if (!selectedFile.type.startsWith("image/")) {
						throw new Error("Only image files are allowed");
					}

					const imageFormData = new FormData();
					imageFormData.append("file", selectedFile);
					imageFormData.append("name", formData.name || "untitled");
					imageFormData.append("brandId", brand?.id?.toString() || "new");
					imageFormData.append("imageId", Date.now().toString());

					const uploadResponse = await fetch("/api/brand-upload", {
						method: "POST",
						body: imageFormData,
					});

					if (!uploadResponse.ok) {
						throw new Error("Failed to upload logo");
					}

					const imageData = await uploadResponse.json();
					newLogoUrl = imageData.url;
				}

				const dataToSend = {
					...formData,
					id: brand?.id,
					logo: newLogoUrl || formData.logo,
				};

				const formDataObj = new FormData();
				Object.entries(dataToSend).forEach(([key, value]) => {
					if (value !== undefined && value !== null) {
						formDataObj.append(
							key,
							typeof value === "object"
								? JSON.stringify(value)
								: value.toString()
						);
					}
				});

				const result = await brandAction(actionState, formDataObj);
				setActionState(result);

				if (result.success) {
					onClose();
					onBrandCreated();
				}
			} catch {
				console.error("Error during submission");
			} finally {
				setIsSubmitting(false);
				if (!actionState.success) {
					setSelectedFile(null);
				}
			}
		});
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			const file = event.target.files[0];
			setSelectedFile(file);

			const previewUrl = URL.createObjectURL(file);
			setLogoPreview(previewUrl);
		}
	};

	const removeLogo = async () => {
		if (formData.logo) {
			const imagePath = formData.logo;
			try {
				const response = await fetch("/api/brand-upload", {
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
		setLogoPreview(null);
		setFormData((prev) => ({ ...prev, logo: null }));
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
				{actionState.errors &&
					"general" in actionState.errors &&
					actionState.errors.general && (
						<span className="text-destructive">
							{actionState.errors.general.join(", ")}
						</span>
					)}
				<form onSubmit={handleSubmit} className="space-y-4">
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
						{actionState.errors &&
							"name" in actionState.errors &&
							actionState.errors.name && (
								<p className="text-sm text-red-500">
									{actionState.errors.name.join(", ")}
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
						{actionState.errors &&
							"description" in actionState.errors &&
							actionState.errors.description && (
								<p className="text-sm text-red-500">
									{actionState.errors?.description.join(", ")}
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
						{actionState.errors &&
							"country" in actionState.errors &&
							actionState.errors.country && (
								<p className="text-sm text-red-500">
									{actionState.errors.country.join(", ")}
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
						{actionState.errors &&
							"website_url" in actionState.errors &&
							actionState.errors.website_url && (
								<p className="text-sm text-red-500">
									{actionState?.errors?.website_url.join(", ")}
								</p>
							)}
					</div>

					{/* Status */}
					<div className="flex items-center space-x-2 space-y-2">
						<Label htmlFor="is_active">Active</Label>
						<Checkbox
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
					</div>

					{/* Logo Upload */}
					<div className="space-y-2 flex items-center justify-between">
						<div className="space-y-2">
							<Label htmlFor="logo">Brand Logo</Label>
							<p className="text-xs text-gray-500 mt-1">
								{isSubmitting && selectedFile
									? "Upload logo"
									: "Upload a logo (optional, less than 5MB)"}
							</p>
						</div>
						<div className="flex items-center space-x-4">
							<div className="relative flex h-24 w-24 items-center justify-center">
								<div className="relative h-24 w-24 cursor-pointer">
									<div className="absolute inset-0 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 transition-colors hover:border-gray-400">
										{logoPreview || formData.logo ? (
											<>
												<Image
													src={
														logoPreview || formData.logo || "/placeholder.svg"
													}
													alt="Brand logo preview"
													fill
													className="rounded-lg object-cover"
												/>
												<button
													type="button"
													onClick={removeLogo}
													className="absolute -right-2 -top-2 z-10 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
												>
													<X className="h-3 w-3" />
												</button>
											</>
										) : (
											<div className="flex flex-col items-center justify-center text-gray-500 gap-2">
												<ImageIcon className="h-6 w-6" />
												<span className="text-xs">Brand logo</span>
											</div>
										)}
									</div>
									<Input
										id="logo"
										type="file"
										accept="image/*"
										onChange={handleFileChange}
										className="absolute inset-0 cursor-pointer opacity-0 h-full w-full"
									/>
								</div>
							</div>
						</div>
					</div>

					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={onClose}
							disabled={isSubmitting || transitionState}
						>
							Cancel
						</Button>
						<Button
							type="submit"
							className="bg-red-600 hover:bg-red-700"
							disabled={isSubmitting || transitionState}
						>
							{isSubmitting
								? selectedFile
									? "Uploading Logo..."
									: "Saving"
								: brand
								? "Update Brand"
								: "Add Brand"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
