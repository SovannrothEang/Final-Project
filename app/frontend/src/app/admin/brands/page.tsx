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
import { Brand } from "@/types/brands";
import useFetch from "@/utils/data-fetching";
import { ApiResponse } from "@/types/api";
import TableBrand from "@/components/brands/TableBrand";
import StatusCard from "@/components/brands/StatusCard";

export default function BrandsPage() {
	const { data, error, isLoading, mutate } =
		useFetch<ApiResponse<Brand[]>>("/admin/brands");

	const [brands, setBrands] = useState<Brand[]>([]);
	useEffect(() => {
		if (data && data.data) setBrands(data.data);
	}, [data]);

	const [searchTerm, setSearchTerm] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedBrand, setSelectedBrand] = useState<Brand | undefined>();
	// const [isFormOpen, setIsFormOpen] = useState(false);
	if (error) {
		return <div>Error fetching brands</div>;
	}
	if (isLoading) {
		return <div>Loading brands ...</div>;
	}
	// const filteredBrands = brands.filter(
	// 	(brand) =>
	// 		brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
	// 		brand.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
	// 		brand.country.toLowerCase().includes(searchTerm.toLowerCase())
	// );

	const handleAddBrand = () => {
		setSelectedBrand(undefined);
		setIsModalOpen(true);
	};

	const handleEditBrand = (brand: Brand) => {
		setSelectedBrand(brand);
		setIsModalOpen(true);
	};

	// const handleSaveBrand = (brandData: Brand) => {
	// 	if (modalMode === "add") {
	// 		const newBrand = {
	// 			...brandData,
	// 			id: Math.max(...brands.map((b) => b.id)) + 1,
	// 			productCount: 0,
	// 			createdAt: new Date().toISOString().split("T")[0],
	// 		};
	// 		setBrands([...brands, newBrand]);
	// 	} else {
	// 		setBrands(
	// 			brands.map((b) =>
	// 				b.id === selectedBrand?.id ? { ...b, ...brandData } : b
	// 			)
	// 		);
	// 	}
	// };
	// const handleSaveBrand = (brandData: Partial<Brand>) => {
	// 	console.log("Saving brand:", brandData);
	// 	// setIsFormOpen(false);
	// 	setSelectedBrand(undefined);
	// };

	const handleDeleteBrand = (brandId: number) => {
		if (confirm("Are you sure you want to delete this brand?")) {
			setBrands(brands.filter((b) => b.id !== brandId));
		}
	};

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
							brands={brands}
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
				onBrandCreated={() => {
					mutate(); // Re-fetch data after successful creation/update
					setIsModalOpen(false); // Close the modal
				}}
			/>
		</div>
	);
}
