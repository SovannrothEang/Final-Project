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
import { Plus, Search, Package, AlertTriangle } from "lucide-react";
import { Product } from "@/types/product";
import useFetch from "@/utils/data-fetching";
import { ApiResponse } from "@/types/api";
import TableProduct from "@/components/products/TableProduct";
import { ProductModal } from "@/components/products/admin/ProductModal";
import { Brand } from "@/types/brands";
import { Category } from "@/types/category";
import useClientFetch from "@/utils/client-fetching";
import { deleteProduct } from "@/utils/products-operations";

export default function ProductsPage() {
	const { data, error, isLoading, mutate } =
		useFetch<ApiResponse<Product[]>>("/admin/products");
	const [products, setProducts] = useState<Product[]>([]);
	const [brands, setBrands] = useState<Brand[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();

	useEffect(() => {
		if (data && data.data) setProducts(data.data);
	}, [data]);

	//Get all Brands
	const { data: brandsData } = useClientFetch<ApiResponse<Brand[]>>("/brands");
	useEffect(() => {
		if (brandsData && brandsData.data) setBrands(brandsData.data);
	}, [brandsData]);
	//Get all categories
	const { data: categoriesData } =
		useClientFetch<ApiResponse<Category[]>>("/categories");
	useEffect(() => {
		if (categoriesData && categoriesData.data)
			setCategories(categoriesData.data);
	}, [categoriesData]);

	if (error) {
		return <div>Error fetching products</div>;
	}
	if (isLoading) {
		return <div>Loading products ...</div>;
	}

	const filteredProducts = products.filter(
		(product) =>
			product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			product.category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			product.brand.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleAddProduct = () => {
		setSelectedProduct(undefined);
		setIsModalOpen(true);
	};

	const handleEdit = (product: Product) => {
		setSelectedProduct(product);
		setIsModalOpen(true);
	};

	const handleDelete = async (productId: number) => {
		if (!confirm("Are you sure you want to delete this brand?")) return;
		const imagePath = products.find((b) => b.id === productId)?.image;
		if (imagePath) {
			try {
				const response = await fetch("/api/upload", {
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
		try {
			await deleteProduct(productId);
		} catch (error) {
			alert("Fail to delete product: " + error);
		}
		setProducts(products.filter((p) => p.id !== productId));
		mutate();
	};

	// const totalValue = products.reduce(
	// 	(sum, product) => sum + product.price * product.stock,
	// 	0
	// );
	const activeProducts = products.filter((p) => p.is_active).length;
	const outOfStock = products.filter((p) => p.stock === 0).length;
	const lowStock = products.filter((p) => p.stock > 0 && p.stock < 10).length;

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
				<Button
					onClick={handleAddProduct}
					className="bg-red-600 hover:bg-red-700 cursor-pointer"
				>
					<Plus className="w-4 h-4 mr-2" />
					Add Product
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
						<div className="text-2xl font-bold">{products.length}</div>
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
						<TableProduct
							products={filteredProducts}
							handleEdit={handleEdit}
							handleDelete={handleDelete}
						/>
					</div>
				</CardContent>
			</Card>

			<ProductModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				product={selectedProduct}
				brands={brands}
				categories={categories}
				onProductCreated={() => {
					mutate();
					setIsModalOpen(false);
				}}
			/>
		</div>
	);
}
