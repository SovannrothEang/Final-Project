// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { Plus, Search, MoreHorizontal, Edit, Trash2, Tag, Folder } from "lucide-react"
// import { CategoryModal } from "@/components/admin/CategoryModal"

// // Sample data
// const initialCategories = [
//   {
//     id: 1,
//     name: "Electronics",
//     description: "Electronic devices and gadgets",
//     productCount: 45,
//     status: "Active",
//     createdAt: "2024-01-15",
//     image: "/placeholder.svg?height=50&width=50",
//   },
//   {
//     id: 2,
//     name: "Computers",
//     description: "Laptops, desktops, and computer accessories",
//     productCount: 23,
//     status: "Active",
//     createdAt: "2024-01-10",
//     image: "/placeholder.svg?height=50&width=50",
//   },
//   {
//     id: 3,
//     name: "Shoes",
//     description: "Footwear for all occasions",
//     productCount: 67,
//     status: "Active",
//     createdAt: "2024-01-08",
//     image: "/placeholder.svg?height=50&width=50",
//   },
//   {
//     id: 4,
//     name: "Clothing",
//     description: "Men's and women's apparel",
//     productCount: 89,
//     status: "Active",
//     createdAt: "2024-01-05",
//     image: "/placeholder.svg?height=50&width=50",
//   },
//   {
//     id: 5,
//     name: "Books",
//     description: "Educational and entertainment books",
//     productCount: 12,
//     status: "Inactive",
//     createdAt: "2024-01-01",
//     image: "/placeholder.svg?height=50&width=50",
//   },
// ]

// export default function CategoriesPage() {
//   const [categories, setCategories] = useState(initialCategories)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const [selectedCategory, setSelectedCategory] = useState<any>(null)
//   const [modalMode, setModalMode] = useState<"add" | "edit">("add")

//   const filteredCategories = categories.filter(
//     (category) =>
//       category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       category.description.toLowerCase().includes(searchTerm.toLowerCase()),
//   )

//   const handleAddCategory = () => {
//     setSelectedCategory(null)
//     setModalMode("add")
//     setIsModalOpen(true)
//   }

//   const handleEditCategory = (category: any) => {
//     setSelectedCategory(category)
//     setModalMode("edit")
//     setIsModalOpen(true)
//   }

//   const handleSaveCategory = (categoryData: any) => {
//     if (modalMode === "add") {
//       const newCategory = {
//         ...categoryData,
//         id: Math.max(...categories.map((c) => c.id)) + 1,
//         productCount: 0,
//         createdAt: new Date().toISOString().split("T")[0],
//       }
//       setCategories([...categories, newCategory])
//     } else {
//       setCategories(categories.map((c) => (c.id === selectedCategory.id ? { ...c, ...categoryData } : c)))
//     }
//   }

//   const handleDeleteCategory = (categoryId: number) => {
//     if (confirm("Are you sure you want to delete this category?")) {
//       setCategories(categories.filter((c) => c.id !== categoryId))
//     }
//   }

//   return (
//     <div className="space-y-6">
//       {/* Page Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
//           <p className="text-gray-600 mt-2">Organize your products into categories.</p>
//         </div>
//         <Button className="bg-red-600 hover:bg-red-700" onClick={handleAddCategory}>
//           <Plus className="w-4 h-4 mr-2" />
//           Add Category
//         </Button>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid gap-6 md:grid-cols-4">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
//             <Folder className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{categories.length}</div>
//             <p className="text-xs text-muted-foreground">+1 from last week</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Active Categories</CardTitle>
//             <Tag className="h-4 w-4 text-green-600" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{categories.filter((c) => c.status === "Active").length}</div>
//             <p className="text-xs text-muted-foreground">Currently in use</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Products</CardTitle>
//             <Tag className="h-4 w-4 text-blue-600" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{categories.reduce((sum, c) => sum + c.productCount, 0)}</div>
//             <p className="text-xs text-muted-foreground">Across all categories</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Avg Products</CardTitle>
//             <Tag className="h-4 w-4 text-purple-600" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//               {Math.round(categories.reduce((sum, c) => sum + c.productCount, 0) / categories.length)}
//             </div>
//             <p className="text-xs text-muted-foreground">Per category</p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Categories List */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Category List</CardTitle>
//           <CardDescription>Manage your product categories and their organization.</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="flex items-center space-x-2 mb-4">
//             <div className="relative flex-1 max-w-sm">
//               <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search categories..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-8"
//               />
//             </div>
//           </div>

//           {/* Categories Table */}
//           <div className="rounded-md border">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Category</TableHead>
//                   <TableHead>Description</TableHead>
//                   <TableHead>Products</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead>Created</TableHead>
//                   <TableHead className="text-right">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredCategories.map((category) => (
//                   <TableRow key={category.id}>
//                     <TableCell className="font-medium">
//                       <div className="flex items-center space-x-3">
//                         <img
//                           src={category.image || "/placeholder.svg"}
//                           alt={category.name}
//                           className="w-10 h-10 rounded-md object-cover"
//                         />
//                         <span>{category.name}</span>
//                       </div>
//                     </TableCell>
//                     <TableCell className="max-w-xs truncate">{category.description}</TableCell>
//                     <TableCell>
//                       <Badge variant="outline">{category.productCount} products</Badge>
//                     </TableCell>
//                     <TableCell>
//                       <Badge variant={category.status === "Active" ? "default" : "secondary"}>{category.status}</Badge>
//                     </TableCell>
//                     <TableCell>{new Date(category.createdAt).toLocaleDateString()}</TableCell>
//                     <TableCell className="text-right">
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <Button variant="ghost" className="h-8 w-8 p-0">
//                             <MoreHorizontal className="h-4 w-4" />
//                           </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end">
//                           <DropdownMenuItem onClick={() => handleEditCategory(category)}>
//                             <Edit className="mr-2 h-4 w-4" />
//                             Edit
//                           </DropdownMenuItem>
//                           <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteCategory(category.id)}>
//                             <Trash2 className="mr-2 h-4 w-4" />
//                             Delete
//                           </DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Category Modal */}
//       <CategoryModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onSave={handleSaveCategory}
//         category={selectedCategory}
//         mode={modalMode}
//       />
//     </div>
//   )
// }

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
import { Category, CreateCategoryData } from "@/types/category";
import {
	createCategory,
	updateCategory,
	deleteCategory,
} from "@/app/api/category/category";
import useFetch from "@/utils/data-fetching";
import { ApiResponse } from "@/types/api";
import Image from "next/image";

export default function CategoriesPage() {
	const { data, error, isLoading } =
		useFetch<ApiResponse<Category[]>>("/admin/categories");
	const [categories, setCategories] = useState<Category[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState<Category | null>(
		null
	);
	const [modalMode, setModalMode] = useState<"add" | "edit">("add");

	useEffect(() => {
		if (data && data.data) setCategories(data.data);
	}, [data]);

	if (error) {
		return <div>Error fetching categories</div>;
	}
	if (isLoading) {
		return <div>Loading categories ...</div>;
	}

	// const filteredCategories = categories.filter(
	// 	(category) =>
	// 		category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
	// 		category.description.toLowerCase().includes(searchTerm.toLowerCase())
	// );

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
			if (modalMode === "add") {
				const newCategory = await createCategory(categoryData);
				setCategories((prev) => [...prev, newCategory]);
			} else if (selectedCategory) {
				const updated = await updateCategory(selectedCategory.id, categoryData);
				setCategories((prev) =>
					prev.map((c) => (c.id === selectedCategory.id ? updated : c))
				);
			}
			setIsModalOpen(false);
		} catch (error) {
			console.error("Save failed:", error);
		}
	};

	const handleDeleteCategory = async (categoryId: string) => {
		if (!confirm("Are you sure you want to delete this category?")) return;

		try {
			await deleteCategory(categoryId);
			setCategories((prev) => prev.filter((c) => c.id !== categoryId));
		} catch (error) {
			console.error("Delete failed:", error);
		}
	};

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
							{categories.reduce((sum, c) => sum + c.products_count || 0, 0)}
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
								categories.reduce((sum, c) => sum + c.products_count || 0, 0) /
									(categories.length || 1)
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
								{categories && categories.length > 0 ? (
									categories.map((category) => (
										<TableRow key={category.id}>
											<TableCell className="font-medium">
												<div className="flex items-center space-x-3">
													<Image
														src={category.logo || "/placeholder.svg"}
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
													variant={
														category.is_active === true
															? "default"
															: "secondary"
													}
												>
													{category.is_active == true ? "Active" : "In-active"}
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
										<TableCell>&quot;No Category&quot;</TableCell>
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
