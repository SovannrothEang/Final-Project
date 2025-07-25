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
	Tag,
	Folder,
} from "lucide-react";
import { CategoryModal } from "@/components/admin/CategoryModal";
import type { Category, CreateCategoryData } from "@/types/category";
import {
	createCategory,
	updateCategory,
	deleteCategory,
} from "@/app/api/category/category";
import useFetch from "@/utils/data-fetching";
import type { ApiResponse } from "@/types/api";
import Image from "next/image";

export default function CategoriesPage() {
	const { data, error, isLoading, mutate } =
		useFetch<ApiResponse<Category[]>>("/admin/categories");
	const [categories, setCategories] = useState<Category[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState<Category | null>(
		null
	);
	const [modalMode, setModalMode] = useState<"add" | "edit">("add");

	useEffect(() => {
		if (data && data.data) {
			setCategories(data.data);
		}
	}, [data]);

	// Filter categories based on search term
	const filteredCategories = categories.filter(
		(category) =>
			category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			category.description.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleAddCategory = () => {
		setSelectedCategory(null);
		setModalMode("add");
		setIsModalOpen(true);
	};

	const handleEditCategory = (category: Category) => {
		setSelectedCategory(category);
		setModalMode("edit");
		setIsModalOpen(true);
	};

	const handleSaveCategory = async (categoryData: CreateCategoryData) => {
		try {
			console.log("Saving category:", {
				mode: modalMode,
				categoryData,
				selectedCategory,
			}); // Debug log

			if (modalMode === "add") {
				const newCategory = await createCategory(categoryData);
				setCategories((prev) => [...prev, newCategory]);
			} else if (selectedCategory) {
				// Make sure we have the category ID
				if (!selectedCategory.id) {
					throw new Error("Category ID is missing for update operation");
				}

				const updated = await updateCategory(selectedCategory.id, categoryData);
				setCategories((prev) =>
					prev.map((c) => (c.id === selectedCategory.id ? updated : c))
				);
			}

			// Refresh the data from server
			await mutate();
			setIsModalOpen(false);
		} catch (error) {
			console.error("Save failed:", error);

			// Show error to user
			const errorMessage =
				error instanceof Error ? error.message : "Unknown error occurred";
			alert(`Operation failed: ${errorMessage}`);
		}
	};

	const handleDeleteCategory = async (categoryId: string) => {
		if (!confirm("Are you sure you want to delete this category?")) return;

		try {
			await deleteCategory(categoryId);
			setCategories((prev) => prev.filter((c) => c.id !== categoryId));
			// Refresh the data from server
			mutate();
		} catch (error) {
			console.error("Delete failed:", error);
			// You might want to show an error toast here
		}
	};

	if (error) {
		return (
			<div className="flex items-center justify-center h-64">
				<div className="text-center">
					<p className="text-red-600 mb-2">Error fetching categories</p>
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
					<p>Loading categories...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold text-gray-900">Categories</h1>
					<p className="text-gray-600 mt-2">
						Organize your products into categories.
					</p>
				</div>
				<Button
					className="bg-red-600 hover:bg-red-700"
					onClick={handleAddCategory}
				>
					<Plus className="w-4 h-4 mr-2" />
					Add Category
				</Button>
			</div>

			{/* Stats Cards */}
			<div className="grid gap-6 md:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Categories
						</CardTitle>
						<Folder className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{categories.length}</div>
						<p className="text-xs text-muted-foreground">+1 from last week</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Active Categories
						</CardTitle>
						<Tag className="h-4 w-4 text-green-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{categories.filter((c) => c.is_active).length}
						</div>
						<p className="text-xs text-muted-foreground">Currently in use</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Products
						</CardTitle>
						<Tag className="h-4 w-4 text-blue-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{categories.reduce((sum, c) => sum + (c.products_count || 0), 0)}
						</div>
						<p className="text-xs text-muted-foreground">
							Across all categories
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Avg Products</CardTitle>
						<Tag className="h-4 w-4 text-purple-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{Math.round(
								categories.reduce(
									(sum, c) => sum + (c.products_count || 0),
									0
								) / (categories.length || 1)
							)}
						</div>
						<p className="text-xs text-muted-foreground">Per category</p>
					</CardContent>
				</Card>
			</div>

			{/* Table and Search */}
			<Card>
				<CardHeader>
					<CardTitle>Category List</CardTitle>
					<CardDescription>
						Manage your product categories and their organization.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex items-center space-x-2 mb-4">
						<div className="relative flex-1 max-w-sm">
							<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								placeholder="Search categories..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-8"
							/>
						</div>
					</div>

					<div className="rounded-md border">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Category</TableHead>
									<TableHead>Description</TableHead>
									<TableHead>Products</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Created</TableHead>
									<TableHead className="text-right">Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredCategories && filteredCategories.length > 0 ? (
									filteredCategories.map((category) => (
										<TableRow key={category.id}>
											<TableCell className="font-medium">
												<div className="flex items-center space-x-3">
													<Image
														src={
															category.logo ||
															"/placeholder.svg?height=40&width=40"
														}
														alt={category.name}
														width={40}
														height={40}
														className="w-10 h-10 rounded-md object-cover"
													/>
													<span>{category.name}</span>
												</div>
											</TableCell>
											<TableCell className="max-w-xs truncate">
												{category.description}
											</TableCell>
											<TableCell>
												<Badge variant="outline">
													{category.products_count || 0} products
												</Badge>
											</TableCell>
											<TableCell>
												<Badge
													variant={category.is_active ? "default" : "secondary"}
												>
													{category.is_active ? "Active" : "Inactive"}
												</Badge>
											</TableCell>
											<TableCell>
												{new Date(category.created_at).toLocaleDateString()}
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
															onClick={() => handleEditCategory(category)}
														>
															<Edit className="mr-2 h-4 w-4" />
															Edit
														</DropdownMenuItem>
														<DropdownMenuItem
															className="text-red-600"
															onClick={() => handleDeleteCategory(category.id)}
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
										<TableCell colSpan={6} className="text-center py-8">
											{searchTerm
												? "No categories found matching your search."
												: "No categories found."}
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>

			{/* Category Modal */}
			<CategoryModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSave={handleSaveCategory}
				category={selectedCategory}
				mode={modalMode}
			/>
		</div>
	);
}
