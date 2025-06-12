"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Search, MoreHorizontal, Edit, Trash2, Eye, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import products from "@/data/products";

export default function AdminDashboard() {
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredProducts, setFilteredProducts] = useState(products);

	const handleSearch = (term: string) => {
		setSearchTerm(term);
		const filtered = products.filter(
			(product) =>
				product.name.toLowerCase().includes(term.toLowerCase()) ||
				product.sku.toLowerCase().includes(term.toLowerCase()) ||
				product.category.toLowerCase().includes(term.toLowerCase())
		);
		setFilteredProducts(filtered);
	};

	const getStatusBadge = (status: string, stock: number) => {
		if (stock === 0) {
			return <Badge variant="destructive">Out of Stock</Badge>;
		}
		if (stock < 10) {
			return <Badge variant="secondary">Low Stock</Badge>;
		}
		return (
			<Badge variant="default" className="bg-green-500">
				In Stock
			</Badge>
		);
	};

	const handleDelete = (id: string) => {
		if (confirm("Are you sure you want to delete this product?")) {
			// Implement delete logic here
			console.log("Deleting product:", id);
		}
	};

	return (
		<div className="space-y-4">
			<div>
				<h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
			</div>
			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium text-gray-600">
							Total Products
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{products.length}</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium text-gray-600">
							Active Products
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{products.filter((p) => p.status === "active").length}
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium text-gray-600">
							Out of Stock
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{products.filter((p) => p.stock === 0).length}
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium text-gray-600">
							Low Stock
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{products.filter((p) => p.stock > 0 && p.stock < 10).length}
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Search and Filters */}
			<Card>
				<CardHeader>
					<div className="flex justify-between py-2">
						<div className="relative flex-1 max-w-sm">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
							<Input
								placeholder="Search products..."
								value={searchTerm}
								onChange={(e) => handleSearch(e.target.value)}
								className="pl-10"
							/>
						</div>
						<Button className="bg-red-500 hover:bg-red-600">
							<Link href="/admin/products/new">
								<div className="flex justify-between items-center">
									<Plus className="w-4 h-4 mr-2" />
									Add Product
								</div>
							</Link>
						</Button>
					</div>
				</CardHeader>
				<CardContent>
					{/* Products Table */}
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Product</TableHead>
								<TableHead>SKU</TableHead>
								<TableHead>Category</TableHead>
								<TableHead>Price</TableHead>
								<TableHead>Stock</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Created</TableHead>
								<TableHead className="text-right">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredProducts.map((product) => (
								<TableRow key={product.id}>
									<TableCell>
										<div className="flex items-center gap-3">
											<Image
												src={product.images || "/placeholder.svg"}
												alt={product.name}
												width={40}
												height={40}
												className="rounded-md"
											/>
											<div>
												<div className="font-medium">{product.name}</div>
											</div>
										</div>
									</TableCell>
									<TableCell className="font-mono text-sm">
										{product.sku}
									</TableCell>
									<TableCell>{product.category}</TableCell>
									<TableCell>${product.price}</TableCell>
									<TableCell>{product.stock}</TableCell>
									<TableCell>
										{getStatusBadge(product.status, product.stock)}
									</TableCell>
									<TableCell>{product.createdAt}</TableCell>
									<TableCell className="text-right">
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant="ghost" size="icon">
													<MoreHorizontal className="w-4 h-4" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuItem asChild>
													<Link href={`/products/${product.id}`}>
														<Eye className="w-4 h-4 mr-2" />
														View
													</Link>
												</DropdownMenuItem>
												<DropdownMenuItem asChild>
													<Link href={`/admin/products/${product.id}/edit`}>
														<Edit className="w-4 h-4 mr-2" />
														Edit
													</Link>
												</DropdownMenuItem>
												<DropdownMenuItem
													onClick={() => handleDelete(product.id)}
													className="text-red-600"
												>
													<Trash2 className="w-4 h-4 mr-2" />
													Delete
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
