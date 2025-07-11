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
	Eye,
	Package,
	AlertTriangle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import useFetch from "@/utils/data-fetching";
import { ApiResponse } from "@/types/api";

export default function ProductsPage() {
	const { data, error, isLoading } =
		useFetch<ApiResponse<Product[]>>("/admin/products");
	const [productList, setProductList] = useState<Product[]>([]);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		if (data && data.data) setProductList(data.data);
	}, [data]);

	if (error) {
		return <div>Error fetching products</div>;
	}
	if (isLoading) {
		return <div>Loading products ...</div>;
	}

	// const filteredProducts = productList.filter(
	// 	(product) =>
	// 		product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
	// 		product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
	// 		product.brand.toLowerCase().includes(searchTerm.toLowerCase())
	// );

	const getStatusBadge = (active: boolean, stock: number) => {
		if (stock === 0) {
			return <Badge variant="destructive">Out of Stock</Badge>;
		}
		if (stock < 10) {
			return <Badge variant="secondary">Low Stock</Badge>;
		}
		if (!active) {
			return <Badge variant="outline">Inactive</Badge>;
		}
		return <Badge className="bg-green-500 hover:bg-green-600">In Stock</Badge>;
	};

	// const handleAddProduct = () => {
	// 	window.location.href = "/admin/products/new";
	// };

	// const handleEditProduct = (product: Product) => {
	// 	window.location.href = `/admin/products/${product.id}/edit`;
	// };

	const handleDeleteProduct = (productId: string) => {
		if (confirm("Are you sure you want to delete this product?")) {
			setProductList(productList.filter((p) => p.id !== productId));
		}
	};

	// const totalValue = productList.reduce(
	// 	(sum, product) => sum + product.price * product.stock,
	// 	0
	// );
	const activeProducts = productList.filter((p) => p.is_active).length;
	const outOfStock = productList.filter((p) => p.stock === 0).length;
	const lowStock = productList.filter(
		(p) => p.stock > 0 && p.stock < 10
	).length;

	return (
		<div className="space-y-6">
			{/* Page Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold text-gray-900">Products</h1>
					<p className="text-gray-600 mt-2">
						Manage your product inventory and listings.
					</p>
				</div>
				<Button className="bg-red-600 hover:bg-red-700" asChild>
					<Link href="/admin/products/new">
						<Plus className="w-4 h-4 mr-2" />
						Add Product
					</Link>
				</Button>
			</div>

			{/* Stats Cards */}
			<div className="grid gap-6 md:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Products
						</CardTitle>
						<Package className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{productList.length}</div>
						<p className="text-xs text-muted-foreground">+2 from last week</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Active Products
						</CardTitle>
						<Package className="h-4 w-4 text-green-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{activeProducts}</div>
						<p className="text-xs text-muted-foreground">Currently available</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
						<AlertTriangle className="h-4 w-4 text-red-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{outOfStock}</div>
						<p className="text-xs text-muted-foreground">Need restocking</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Low Stock</CardTitle>
						<AlertTriangle className="h-4 w-4 text-yellow-600" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{lowStock}</div>
						<p className="text-xs text-muted-foreground">Below 10 units</p>
					</CardContent>
				</Card>
			</div>

			{/* Products List */}
			<Card>
				<CardHeader>
					<CardTitle>Product List</CardTitle>
					<CardDescription>
						A list of all products in your store.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex items-center space-x-2 mb-4">
						<div className="relative flex-1 max-w-sm">
							<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								placeholder="Search products..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-8"
							/>
						</div>
					</div>

					{/* Products Table */}
					<div className="rounded-md border">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Product</TableHead>
									<TableHead>Category</TableHead>
									<TableHead>Brand</TableHead>
									<TableHead>Price</TableHead>
									<TableHead>Stock</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Created</TableHead>
									<TableHead className="text-right">Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{productList &&
									productList.map((product) => (
										<TableRow key={product.id}>
											<TableCell className="font-medium">
												<div className="flex items-center space-x-3">
													<Image
														src={product.image || "/placeholder.svg"}
														alt={product.name}
														width={40}
														height={40}
														className="rounded-md object-cover"
													/>
													<div>
														<div className="font-medium">{product.name}</div>
														<div className="text-sm text-gray-500 truncate max-w-[200px]">
															{product.description}
														</div>
													</div>
												</div>
											</TableCell>
											<TableCell>{product.category.name}</TableCell>
											<TableCell>{product.brand.name}</TableCell>
											<TableCell>${product.price.toFixed(2)}</TableCell>
											<TableCell>{product.stock}</TableCell>
											<TableCell>
												{getStatusBadge(product.is_active, product.stock)}
											</TableCell>
											<TableCell>
												{new Date(product.created_at).toLocaleDateString()}
											</TableCell>
											<TableCell className="text-right">
												<DropdownMenu>
													<DropdownMenuTrigger asChild>
														<Button variant="ghost" className="h-8 w-8 p-0">
															<MoreHorizontal className="h-4 w-4" />
														</Button>
													</DropdownMenuTrigger>
													<DropdownMenuContent align="end">
														<DropdownMenuItem asChild>
															<Link href={`/products/${product.id}`}>
																<Eye className="mr-2 h-4 w-4" />
																View
															</Link>
														</DropdownMenuItem>
														<DropdownMenuItem asChild>
															<Link href={`/admin/products/${product.id}/edit`}>
																<Edit className="mr-2 h-4 w-4" />
																Edit
															</Link>
														</DropdownMenuItem>
														<DropdownMenuItem
															className="text-red-600"
															onClick={() => handleDeleteProduct(product.id)}
														>
															<Trash2 className="mr-2 h-4 w-4" />
															Delete
														</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</TableCell>
										</TableRow>
									))}
							</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
