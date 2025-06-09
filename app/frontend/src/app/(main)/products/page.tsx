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
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Search, Filter, Grid, List } from "lucide-react";

// Sample products data
const allProducts = [
	{
		id: "1",
		name: "Razer Blade 16 Gaming Laptop",
		price: 2499,
		originalPrice: 2999,
		rating: 5,
		reviews: 88,
		image: "/placeholder.svg?height=300&width=300",
		discount: 17,
		category: "Laptops",
		brand: "Razer",
		inStock: true,
	},
	{
		id: "2",
		name: "PlayStation 5 Console",
		price: 499,
		rating: 5,
		reviews: 325,
		image: "/placeholder.svg?height=300&width=300",
		isNew: true,
		category: "Gaming",
		brand: "Sony",
		inStock: true,
	},
	{
		id: "3",
		name: "Custom Gaming PC Build",
		price: 1899,
		rating: 5,
		reviews: 156,
		image: "/placeholder.svg?height=300&width=300",
		category: "Desktops",
		brand: "Custom",
		inStock: true,
	},
	{
		id: "4",
		name: "Mechanical Gaming Keyboard",
		price: 159,
		rating: 4,
		reviews: 89,
		image: "/placeholder.svg?height=300&width=300",
		category: "Accessories",
		brand: "Corsair",
		inStock: true,
	},
	{
		id: "5",
		name: "MSI Cyborg A15 Gaming Laptop",
		price: 1299,
		rating: 5,
		reviews: 145,
		image: "/placeholder.svg?height=300&width=300",
		category: "Laptops",
		brand: "MSI",
		inStock: true,
	},
	{
		id: "6",
		name: "Dell XPS 16 Plus",
		price: 899,
		rating: 4,
		reviews: 267,
		image: "/placeholder.svg?height=300&width=300",
		category: "Laptops",
		brand: "Dell",
		inStock: false,
	},
	{
		id: "7",
		name: "Asus ROG Strix Gaming Laptop",
		price: 2199,
		rating: 5,
		reviews: 198,
		image: "/placeholder.svg?height=300&width=300",
		category: "Laptops",
		brand: "Asus",
		inStock: true,
	},
	{
		id: "8",
		name: "Lenovo LOQ Gaming Series",
		price: 1099,
		rating: 4,
		reviews: 234,
		image: "/placeholder.svg?height=300&width=300",
		category: "Laptops",
		brand: "Lenovo",
		inStock: true,
	},
	{
		id: "9",
		name: "Gaming Headset Pro",
		price: 756.65,
		originalPrice: 1156.65,
		rating: 5,
		reviews: 65,
		image: "/placeholder.svg?height=300&width=300",
		discount: 35,
		category: "Accessories",
		brand: "SteelSeries",
		inStock: true,
	},
	{
		id: "10",
		name: "4K Gaming Monitor",
		price: 599,
		rating: 4,
		reviews: 142,
		image: "/placeholder.svg?height=300&width=300",
		category: "Monitors",
		brand: "Samsung",
		inStock: true,
	},
	{
		id: "11",
		name: "Wireless Gaming Mouse",
		price: 89,
		rating: 4,
		reviews: 203,
		image: "/placeholder.svg?height=300&width=300",
		category: "Accessories",
		brand: "Logitech",
		inStock: true,
	},
	{
		id: "12",
		name: "RGB Gaming Chair",
		price: 299,
		rating: 4,
		reviews: 78,
		image: "/placeholder.svg?height=300&width=300",
		category: "Furniture",
		brand: "DXRacer",
		inStock: true,
	},
];

const categories = [
	"All",
	"Laptops",
	"Desktops",
	"Gaming",
	"Monitors",
	"Accessories",
	"Furniture",
];
const brands = [
	"All",
	"Razer",
	"MSI",
	"Dell",
	"Asus",
	"Lenovo",
	"Sony",
	"Samsung",
	"Corsair",
	"SteelSeries",
	"Logitech",
	"DXRacer",
	"Custom",
];
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
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
	const [priceRange, setPriceRange] = useState([0, 3000]);
	const [sortBy, setSortBy] = useState("relevance");
	const [showInStockOnly, setShowInStockOnly] = useState(false);
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
	const [showFilters, setShowFilters] = useState(false);

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
		searchQuery, // Add searchQuery to the dependency array
	]);

	const handleBrandChange = (brand: string, checked: boolean) => {
		if (brand === "All") {
			setSelectedBrands(checked ? ["All"] : []);
		} else {
			setSelectedBrands((prev) => {
				const newBrands = checked
					? [...prev.filter((b) => b !== "All"), brand]
					: prev.filter((b) => b !== brand);
				return newBrands.length === 0 ? ["All"] : newBrands;
			});
		}
	};

	const clearFilters = () => {
		setSelectedCategory("All");
		setSelectedBrands([]);
		setPriceRange([0, 3000]);
		setShowInStockOnly(false);
		setSortBy("relevance");
	};

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

				<div className="grid lg:grid-cols-4 gap-8">
					{/* Products Grid */}
					<div className="lg:col-span-3">
						{/* Toolbar */}
						<div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
							<div className="flex items-center gap-4">
								<Button
									variant="outline"
									size="sm"
									onClick={() => setShowFilters(!showFilters)}
									className="lg:hidden"
								>
									<Filter className="w-4 h-4 mr-2" />
									Filters
								</Button>
								<span className="text-sm text-gray-600">
									{filteredProducts.length} products found
									{searchTerm && ` for "${searchTerm}"`}
								</span>
							</div>

							<div className="flex items-center gap-4">
								{/* View Mode Toggle */}
								<div className="flex border rounded-md">
									<Button
										variant={viewMode === "grid" ? "default" : "ghost"}
										size="sm"
										onClick={() => setViewMode("grid")}
										className="rounded-r-none"
									>
										<Grid className="w-4 h-4" />
									</Button>
									<Button
										variant={viewMode === "list" ? "default" : "ghost"}
										size="sm"
										onClick={() => setViewMode("list")}
										className="rounded-l-none"
									>
										<List className="w-4 h-4" />
									</Button>
								</div>

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
							<div className="text-center py-16">
								<div className="text-gray-400 mb-4">
									<Search className="w-16 h-16 mx-auto" />
								</div>
								<h3 className="text-xl font-semibold mb-2">
									No products found
								</h3>
								<p className="text-gray-600 mb-6">
									Try adjusting your search or filter criteria
								</p>
							</div>
						) : (
							<div
								className={
									viewMode === "grid"
										? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
										: "space-y-4"
								}
							>
								{filteredProducts.map((product) => (
									<ProductCard key={product.id} {...product} />
								))}
							</div>
						)}

						{/* Load More Button */}
						{filteredProducts.length > 0 && (
							<div className="text-center mt-12">
								<Button variant="outline" className="px-8">
									Load More Products
								</Button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
