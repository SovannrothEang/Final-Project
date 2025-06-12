"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import products from "@/data/products";

// Sample products data
const allProducts = products;

const sortOptions = [
	{ value: "relevance", label: "Relevance" },
	{ value: "price-low", label: "Price: Low to High" },
	{ value: "price-high", label: "Price: High to Low" },
	{ value: "rating", label: "Customer Rating" },
	{ value: "newest", label: "Newest First" },
];

export default function ProductsPage() {
	const searchParams = useSearchParams();
	const searchQuery = searchParams.get("q") || "";

	const [filteredProducts, setFilteredProducts] = useState(allProducts);
	const [searchTerm, setSearchTerm] = useState(searchQuery);
	const [selectedCategory] = useState("All");
	const [selectedBrands] = useState<string[]>([]);
	const [priceRange] = useState([0, 3000]);
	const [sortBy, setSortBy] = useState("relevance");
	const [showInStockOnly] = useState(false);

	useEffect(() => {
		setSearchTerm(searchQuery); // Update searchTerm state when searchQuery changes
		let filtered = allProducts;

		// Search filter
		if (searchTerm) {
			filtered = filtered.filter(
				(product) =>
					product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
					product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
					product.brand.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}
		// Category filter
		if (selectedCategory !== "All") {
			filtered = filtered.filter(
				(product) => product.category === selectedCategory
			);
		}
		// Brand filter
		if (selectedBrands.length > 0 && !selectedBrands.includes("All")) {
			filtered = filtered.filter((product) =>
				selectedBrands.includes(product.brand)
			);
		}
		// Price range filter
		filtered = filtered.filter(
			(product) =>
				product.price >= priceRange[0] && product.price <= priceRange[1]
		);
		// Stock filter
		if (showInStockOnly) {
			filtered = filtered.filter((product) => product.inStock);
		}
		// Sorting
		switch (sortBy) {
			case "price-low":
				filtered.sort((a, b) => a.price - b.price);
				break;
			case "price-high":
				filtered.sort((a, b) => b.price - a.price);
				break;
			case "rating":
				filtered.sort((a, b) => b.rating - a.rating);
				break;
			case "newest":
				filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
				break;
			default:
				// Keep original order for relevance
				break;
		}

		setFilteredProducts(filtered);
	}, [
		searchTerm,
		selectedCategory,
		selectedBrands,
		priceRange,
		sortBy,
		showInStockOnly,
		searchQuery,
	]);

	return (
		<div className="bg-white">
			<div className="container mx-auto px-4 py-8">
				{/* Breadcrumb */}
				<div className="text-sm text-gray-500 mb-8">
					<Link href="/" className="hover:text-gray-800">
						Home
					</Link>
					<span className="mx-2">/</span>
					<span>Products</span>
					{searchQuery && (
						<>
							<span className="mx-2">/</span>
							<span>Search: &quot;{searchQuery}&quot;</span>
						</>
					)}
				</div>

				<div className="grid lg:grid-cols-5 gap-8">
					{/* Toolbar */}
					<div className="flex flex-col col-span-full sm:flex-row sm:items-center justify-between mb-6 gap-4">
						<div className="flex items-center gap-4">
							<span className="text-sm text-gray-600">
								{filteredProducts.length} products found
								{searchTerm && ` for "${searchTerm}"`}
							</span>
						</div>

						<div className="flex items-center gap-4">
							{/* Sort Dropdown */}
							<Select value={sortBy} onValueChange={setSortBy}>
								<SelectTrigger className="w-48">
									<SelectValue placeholder="Sort by" />
								</SelectTrigger>
								<SelectContent>
									{sortOptions.map((option) => (
										<SelectItem key={option.value} value={option.value}>
											{option.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>

					{/* Products Display */}
					{filteredProducts.length === 0 ? (
						<div className="text-center py-16 mx-auto col-span-5">
							<div className="text-gray-400 mb-4">
								<Search className="w-16 h-16 mx-auto" />
							</div>
							<h3 className="text-xl font-semibold mb-2">No products found</h3>
							<p className="text-gray-600 mb-6">
								Try adjusting your search or filter criteria
							</p>
						</div>
					) : (
						<div className="col-span-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
							{filteredProducts.map((product) => (
								<ProductCard key={product.id} {...product} />
							))}
						</div>
					)}

					{/* Load More Button */}
					{filteredProducts.length > 0 && (
						<div className="text-center mt-12 col-span-full">
							<Button
								variant="outline"
								className="px-8 py-6 rounded-4xl cursor-pointer"
							>
								Load More Products
							</Button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
