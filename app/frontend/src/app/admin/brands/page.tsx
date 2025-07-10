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
import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Plus,
	Search,
	MoreHorizontal,
	Edit,
	Trash2,
	Award,
	Star,
} from "lucide-react";
import { BrandModal } from "@/components/admin/BrandModal";
import { Brand } from "@/types/brands";
import Image from "next/image";
import useFetch from "@/utils/data-fetching";
import { ApiResponse } from "@/types/api";

export default function BrandsPage() {
	const { data, error, isLoading } =
		useFetch<ApiResponse<Brand[]>>("/admin/brands");

	const [brands, setBrands] = useState<Brand[]>([]);
	useEffect(() => {
		if (data && data.data) setBrands(data.data);
	}, [data]);
	const [searchTerm, setSearchTerm] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
	const [modalMode, setModalMode] = useState<"add" | "edit">("add");
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
		setSelectedBrand(null);
		setModalMode("add");
		setIsModalOpen(true);
	};

	const handleEditBrand = (brand: Brand) => {
		setSelectedBrand(brand);
		setModalMode("edit");
		setIsModalOpen(true);
	};

	const handleSaveBrand = (brandData: Brand) => {
		if (modalMode === "add") {
			const newBrand = {
				...brandData,
				id: Math.max(...brands.map((b) => b.id)) + 1,
				productCount: 0,
				createdAt: new Date().toISOString().split("T")[0],
			};
			setBrands([...brands, newBrand]);
		} else {
			setBrands(
				brands.map((b) =>
					b.id === selectedBrand?.id ? { ...b, ...brandData } : b
				)
			);
		}
	};

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
			<div className="grid gap-6 md:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Brands</CardTitle>
						<Award className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{brands.length}</div>
						<p className="text-xs text-muted-foreground">+2 from last month</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Active Brands</CardTitle>
						<Star className="h-4 w-4 text-green-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{brands && brands.length > 0
								? brands.filter((b) => b.is_active).length
								: 0}
						</div>
						<p className="text-xs text-muted-foreground">Currently selling</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Products
						</CardTitle>
						<Award className="h-4 w-4 text-blue-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{brands.length > 0
								? brands.reduce((sum, b) => sum + b.products_count, 0)
								: 0}
							{/* {brands.reduce((b) => )} */}
						</div>
						<p className="text-xs text-muted-foreground">Across all brands</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Top Brand</CardTitle>
						<Star className="h-4 w-4 text-yellow-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{brands.length > 0
								? brands.reduce((prev, current) =>
										prev.products_count > current.products_count
											? prev
											: current
								  ).name
								: "N/A"}
						</div>
						<p className="text-xs text-muted-foreground">Most products</p>
					</CardContent>
				</Card>
			</div>

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
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Brand</TableHead>
									<TableHead>Description</TableHead>
									<TableHead>Country</TableHead>
									<TableHead>Products</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Website</TableHead>
									<TableHead className="text-right">Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{brands && brands.length > 0 ? (
									brands.map((brand) => (
										<TableRow key={brand.id}>
											<TableCell className="font-medium">
												<div className="flex items-center space-x-3">
													{brand.logo && (
														<Image
															src={brand.logo || "/placeholder.svg"}
															alt={brand.name}
															className="w-10 h-10 rounded-md object-cover"
														/>
													)}
													<span>{brand.name}</span>
												</div>
											</TableCell>
											<TableCell className="max-w-xs truncate">
												{brand.description}
											</TableCell>
											<TableCell>{brand.country}</TableCell>
											<TableCell>
												<Badge variant="outline">
													{brand.products_count} products
												</Badge>
											</TableCell>
											<TableCell>
												<Badge
													variant={brand.is_active ? "default" : "secondary"}
												>
													{brand.is_active ? "Active" : "Not active"}
												</Badge>
											</TableCell>
											<TableCell>
												<a
													href={`https://${brand.website_url}`}
													target="_blank"
													rel="noopener noreferrer"
													className="text-blue-600 hover:underline"
												>
													{brand.website_url}
												</a>
											</TableCell>
											<TableCell className="text-right">
												<DropdownMenu>
													<DropdownMenuTrigger asChild>
														<Button variant="ghost" className="h-8 w-8 p-0">
															<MoreHorizontal className="h-4 w-4" />
														</Button>
													</DropdownMenuTrigger>
													<DropdownMenuContent align="end">
														<DropdownMenuItem
															onClick={() => handleEditBrand(brand)}
														>
															<Edit className="mr-2 h-4 w-4" />
															Edit
														</DropdownMenuItem>
														<DropdownMenuItem
															className="text-red-600"
															onClick={() => handleDeleteBrand(brand.id)}
														>
															<Trash2 className="mr-2 h-4 w-4" />
															Delete
														</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</TableCell>
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell>&quot;No Brands&quot;</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>

			{/* Brand Modal */}
			<BrandModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSave={handleSaveBrand}
				brand={selectedBrand}
				mode={modalMode}
			/>
		</div>
	);
}
