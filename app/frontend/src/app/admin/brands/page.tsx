"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Plus, Search } from "lucide-react";
import { BrandModal } from "@/components/brands/BrandModal";
import type { Brand, CreateBrandData } from "@/types/brands";
import { createBrand, updateBrand, deleteBrand } from "@/app/api/brands/brands";
import useFetch from "@/utils/data-fetching";
import type { ApiResponse } from "@/types/api";
import TableBrand from "@/components/brands/TableBrand";
import StatusCard from "@/components/brands/StatusCard";

export default function BrandsPage() {
	const { data, error, isLoading, mutate } =
		useFetch<ApiResponse<Brand[]>>("/admin/brands");
	const [brands, setBrands] = useState<Brand[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedBrand, setSelectedBrand] = useState<Brand | undefined>();

	useEffect(() => {
		if (data && data.data) setBrands(data.data);
	}, [data]);

	// Filter brands based on search term
	const filteredBrands = brands.filter(
		(brand) =>
			brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			(brand.description &&
				brand.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
			brand.country.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleAddBrand = () => {
		setSelectedBrand(undefined);
		setIsModalOpen(true);
	};

	const handleEditBrand = (brand: Brand) => {
		setSelectedBrand(brand);
		setIsModalOpen(true);
	};

	const handleSaveBrand = async (brandData: CreateBrandData) => {
		try {
			console.log("Saving brand:", {
				mode: selectedBrand ? "edit" : "add",
				brandData,
				selectedBrand,
			}); // Debug log

			if (selectedBrand) {
				// Update existing brand
				const updated = await updateBrand(selectedBrand.id, brandData);
				setBrands((prev) =>
					prev.map((b) => (b.id === selectedBrand.id ? updated : b))
				);
			} else {
				// Create new brand
				const newBrand = await createBrand(brandData);
				setBrands((prev) => [...prev, newBrand]);
			}

			// Refresh the data from server
			await mutate();
		} catch (error) {
			console.error("Save failed:", error);
			throw error; // Re-throw to let modal handle the error
		}
	};

	const handleDeleteBrand = async (brandId: number) => {
		if (!confirm("Are you sure you want to delete this brand?")) return;

		try {
			await deleteBrand(brandId);
			setBrands((prev) => prev.filter((b) => b.id !== brandId));
			// Refresh the data from server
			mutate();
		} catch (error) {
			console.error("Delete failed:", error);
			alert("Failed to delete brand. Please try again.");
		}
	};

	if (error) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="text-center">
					<p className="text-red-600 mb-2">Error fetching brands</p>
					<Button onClick={() => mutate()} variant="outline">
						Try Again
					</Button>
				</div>
			</div>
		);
	}

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="text-center">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-2"></div>
					<p>Loading brands...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{/* Page Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold text-gray-900">Brands</h1>
					<p className="text-gray-600 mt-2">
						Manage product brands and manufacturers.
					</p>
				</div>
				<Button
					className="bg-red-600 hover:bg-red-700"
					onClick={handleAddBrand}
				>
					<Plus className="w-4 h-4 mr-2" />
					Add Brand
				</Button>
			</div>

			{/* Stats Cards */}
			<StatusCard brands={brands} />

			{/* Brands List */}
			<Card>
				<CardHeader>
					<CardTitle>Brand List</CardTitle>
					<CardDescription>
						Manage your product brands and their information.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex items-center space-x-2 mb-4">
						<div className="relative flex-1 max-w-sm">
							<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								placeholder="Search brands..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-8"
							/>
						</div>
					</div>

					{/* Brands Table */}
					<div className="rounded-md border">
						<TableBrand
							brands={filteredBrands}
							handleEditBrand={handleEditBrand}
							handleDeleteBrand={handleDeleteBrand}
						/>
					</div>
				</CardContent>
			</Card>

			{/* Brand Modal */}
			<BrandModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				brand={selectedBrand}
				onSave={handleSaveBrand}
				onBrandCreated={() => {
					mutate(); // Re-fetch data after successful creation/update
					setIsModalOpen(false); // Close the modal
				}}
			/>
		</div>
	);
}
