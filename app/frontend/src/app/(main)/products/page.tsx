// "use client";

// import { useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";
// import Link from "next/link";
// import { ProductCard } from "@/components/products/ProductCard";
// import { Button } from "@/components/ui/button";
// import {
// 	Select,
// 	SelectContent,
// 	SelectItem,
// 	SelectTrigger,
// 	SelectValue,
// } from "@/components/ui/select";
// import { Search } from "lucide-react";
// import products from "@/data/products";

// // Sample products data
// const allProducts = products;

// const sortOptions = [
// 	{ value: "relevance", label: "Relevance" },
// 	{ value: "price-low", label: "Price: Low to High" },
// 	{ value: "price-high", label: "Price: High to Low" },
// 	{ value: "rating", label: "Customer Rating" },
// 	{ value: "newest", label: "Newest First" },
// ];

// export default function ProductsPage() {
// 	const searchParams = useSearchParams();
// 	const searchQuery = searchParams.get("q") || "";

// 	const [filteredProducts, setFilteredProducts] = useState(allProducts);
// 	const [searchTerm, setSearchTerm] = useState(searchQuery);
// 	const [selectedCategory] = useState("All");
// 	const [selectedBrands] = useState<string[]>([]);
// 	const [priceRange] = useState([0, 3000]);
// 	const [sortBy, setSortBy] = useState("relevance");
// 	const [showInStockOnly] = useState(false);

// 	useEffect(() => {
// 		setSearchTerm(searchQuery); // Update searchTerm state when searchQuery changes
// 		let filtered = allProducts;

// 		// Search filter
// 		if (searchTerm) {
// 			filtered = filtered.filter(
// 				(product) =>
// 					product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// 					product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
// 					product.brand.toLowerCase().includes(searchTerm.toLowerCase())
// 			);
// 		}
// 		// Category filter
// 		if (selectedCategory !== "All") {
// 			filtered = filtered.filter(
// 				(product) => product.category === selectedCategory
// 			);
// 		}
// 		// Brand filter
// 		if (selectedBrands.length > 0 && !selectedBrands.includes("All")) {
// 			filtered = filtered.filter((product) =>
// 				selectedBrands.includes(product.brand)
// 			);
// 		}
// 		// Price range filter
// 		filtered = filtered.filter(
// 			(product) =>
// 				product.price >= priceRange[0] && product.price <= priceRange[1]
// 		);
// 		// Stock filter
// 		if (showInStockOnly) {
// 			filtered = filtered.filter((product) => product.inStock);
// 		}
// 		// Sorting
// 		switch (sortBy) {
// 			case "price-low":
// 				filtered.sort((a, b) => a.price - b.price);
// 				break;
// 			case "price-high":
// 				filtered.sort((a, b) => b.price - a.price);
// 				break;
// 			case "rating":
// 				filtered.sort((a, b) => b.rating - a.rating);
// 				break;
// 			case "newest":
// 				filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
// 				break;
// 			default:
// 				// Keep original order for relevance
// 				break;
// 		}

// 		setFilteredProducts(filtered);
// 	}, [
// 		searchTerm,
// 		selectedCategory,
// 		selectedBrands,
// 		priceRange,
// 		sortBy,
// 		showInStockOnly,
// 		searchQuery,
// 	]);

// 	return (
// 		<div className="bg-white">
// 			<div className="container mx-auto px-4 py-8">
// 				{/* Breadcrumb */}
// 				<div className="text-sm text-gray-500 mb-8">
// 					<Link href="/" className="hover:text-gray-800">
// 						Home
// 					</Link>
// 					<span className="mx-2">/</span>
// 					<span>Products</span>
// 					{searchQuery && (
// 						<>
// 							<span className="mx-2">/</span>
// 							<span>Search: &quot;{searchQuery}&quot;</span>
// 						</>
// 					)}
// 				</div>

// 				<div className="grid lg:grid-cols-5 gap-8">
// 					{/* Toolbar */}
// 					<div className="flex flex-col col-span-full sm:flex-row sm:items-center justify-between mb-6 gap-4">
// 						<div className="flex items-center gap-4">
// 							<span className="text-sm text-gray-600">
// 								{filteredProducts.length} products found
// 								{searchTerm && ` for "${searchTerm}"`}
// 							</span>
// 						</div>

// 						<div className="flex items-center gap-4">
// 							{/* Sort Dropdown */}
// 							<Select value={sortBy} onValueChange={setSortBy}>
// 								<SelectTrigger className="w-48">
// 									<SelectValue placeholder="Sort by" />
// 								</SelectTrigger>
// 								<SelectContent>
// 									{sortOptions.map((option) => (
// 										<SelectItem key={option.value} value={option.value}>
// 											{option.label}
// 										</SelectItem>
// 									))}
// 								</SelectContent>
// 							</Select>
// 						</div>
// 					</div>

// 					{/* Products Display */}
// 					{filteredProducts.length === 0 ? (
// 						<div className="text-center py-16 mx-auto col-span-5">
// 							<div className="text-gray-400 mb-4">
// 								<Search className="w-16 h-16 mx-auto" />
// 							</div>
// 							<h3 className="text-xl font-semibold mb-2">No products found</h3>
// 							<p className="text-gray-600 mb-6">
// 								Try adjusting your search or filter criteria
// 							</p>
// 						</div>
// 					) : (
// 						<div className="col-span-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
// 							{filteredProducts.map((product) => (
// 								<ProductCard key={product.id} {...product} />
// 							))}
// 						</div>
// 					)}

// 					{/* Load More Button */}
// 					{filteredProducts.length > 0 && (
// 						<div className="text-center mt-12 col-span-full">
// 							<Button
// 								variant="outline"
// 								className="px-8 py-6 rounded-4xl cursor-pointer"
// 							>
// 								Load More Products
// 							</Button>
// 						</div>
// 					)}
// 				</div>
// 			</div>
// 		</div>
// 	);
// }




// "use client";
// import { useState } from "react";
// import { useSearchParams } from "next/navigation";
// import Link from "next/link";
// import { ProductCard } from "@/components/products/ProductCard";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Search } from "lucide-react";
// import { useProducts } from "@/services/productService";

// const sortOptions = [
//   { value: "created_at:desc", label: "Newest First" },
//   { value: "price:asc", label: "Price: Low to High" },
//   { value: "price:desc", label: "Price: High to Low" },
//   { value: "rating:desc", label: "Customer Rating" },
//   { value: "relevance", label: "Relevance" },
// ];

// export default function ProductsPage() {
//   const searchParams = useSearchParams();
//   const searchQuery = searchParams.get("q") || "";
//   const [sortBy, setSortBy] = useState("created_at:desc");
  
//   // Extract sort parameters
//   const [sortField, sortDirection] = sortBy.includes(":") 
//     ? sortBy.split(":") 
//     : [sortBy, "desc"];

//   // Create filters object
//   const filters = {
//     search: searchQuery,
//     sort_by: sortField,
//     sort_direction: sortDirection as 'asc' | 'desc',
//     per_page: 12,
//   };

//   const { data, isLoading, error } = useProducts(filters);
//   const products = data?.data || [];
//   const totalProducts = data?.meta?.total || 0;

//   return (
//     <div className="bg-white">
//       <div className="container mx-auto px-4 py-8">
//         {/* Breadcrumb */}
//         <div className="text-sm text-gray-500 mb-8">
//           <Link href="/" className="hover:text-gray-800">
//             Home
//           </Link>
//           <span className="mx-2">/</span>
//           <span>Products</span>
//           {searchQuery && (
//             <>
//               <span className="mx-2">/</span>
//               <span>Search: &quot;{searchQuery}&quot;</span>
//             </>
//           )}
//         </div>

//         <div className="grid lg:grid-cols-5 gap-8">
//           {/* Toolbar */}
//           <div className="flex flex-col col-span-full sm:flex-row sm:items-center justify-between mb-6 gap-4">
//             <div className="flex items-center gap-4">
//               <span className="text-sm text-gray-600">
//                 {totalProducts} products found
//                 {searchQuery && ` for "${searchQuery}"`}
//               </span>
//             </div>

//             <div className="flex items-center gap-4">
//               {/* Sort Dropdown */}
//               <Select value={sortBy} onValueChange={setSortBy}>
//                 <SelectTrigger className="w-48">
//                   <SelectValue placeholder="Sort by" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {sortOptions.map((option) => (
//                     <SelectItem key={option.value} value={option.value}>
//                       {option.label}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           {/* Products Display */}
//           {isLoading ? (
//             <div className="col-span-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
//               {Array.from({ length: 8 }).map((_, i) => (
//                 <div key={i} className="h-64 bg-gray-100 animate-pulse rounded-lg" />
//               ))}
//             </div>
//           ) : error ? (
//             <div className="text-center py-16 mx-auto col-span-5">
//               <div className="text-red-500 mb-4">Error loading products</div>
//               <p className="text-gray-600">{error.message}</p>
//             </div>
//           ) : products.length === 0 ? (
//             <div className="text-center py-16 mx-auto col-span-5">
//               <div className="text-gray-400 mb-4">
//                 <Search className="w-16 h-16 mx-auto" />
//               </div>
//               <h3 className="text-xl font-semibold mb-2">No products found</h3>
//               <p className="text-gray-600 mb-6">
//                 Try adjusting your search or filter criteria
//               </p>
//             </div>
//           ) : (
//             <>
//               <div className="col-span-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
//                 {products.map((product) => (
//                   <ProductCard key={product.id} product={product} />
//                 ))}
//               </div>

//               {/* Load More Button */}
//               {data?.meta?.last_page > data?.meta?.current_page && (
//                 <div className="text-center mt-12 col-span-full">
//                   <Button
//                     variant="outline"
//                     className="px-8 py-6 rounded-4xl cursor-pointer"
//                   >
//                     Load More Products
//                   </Button>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }





// "use client";
// import { useState } from "react";
// import { useSearchParams, useRouter, usePathname } from "next/navigation";
// import Link from "next/link";
// import { ProductCard } from "@/components/products/ProductCard";
// import { Button } from "@/components/ui/button";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import { Search, SlidersHorizontal } from "lucide-react";
// import { useProducts } from "@/services/productService";
// import { ProductFilters } from "@/types/product";

// const sortOptions = [
//   { value: "created_at:desc", label: "Newest First" },
//   { value: "created_at:asc", label: "Oldest First" },
//   { value: "name:asc", label: "Name: A to Z" },
//   { value: "name:desc", label: "Name: Z to A" },
//   { value: "price:asc", label: "Price: Low to High" },
//   { value: "price:desc", label: "Price: High to Low" },
// //   { value: "discount:asc", label: "Discount: Low to High" },
// //   { value: "discount:desc", label: "Discount: High to Low" },
// //   { value: "rating:asc", label: "Rating: Low to High" },
// //   { value: "rating:desc", label: "Rating: High to Low" },
// //   { value: "reviews_count:asc", label: "Reviews: Fewest First" },
// //   { value: "reviews_count:desc", label: "Reviews: Most First" },
// ];

// export default function ProductsPage() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
  
//   // Get all query parameters
//   const searchQuery = searchParams.get('search') || '';
//   const categoryId = searchParams.get('category_id') || '';
//   const brandId = searchParams.get('brand_id') || '';
//   const minPrice = searchParams.get('price_range[min]') || '';
//   const maxPrice = searchParams.get('price_range[max]') || '';
//   const sortBy = searchParams.get('sort_by') || 'created_at';
//   const sortDirection = searchParams.get('sort_direction') || 'desc';
//   const page = parseInt(searchParams.get('page') || '1');

//   // State for filters
//   const [searchTerm, setSearchTerm] = useState(searchQuery);
//   const [showFilters, setShowFilters] = useState(false);

//   // Create filters object
//   const filters = {
//     search: searchQuery,
//     category_id: categoryId,
//     brand_id: brandId,
//     'price_range[min]': minPrice ? Number(minPrice) : undefined,
//     'price_range[max]': maxPrice ? Number(maxPrice) : undefined,
//     sort_by: sortBy,
//     sort_direction: sortDirection as 'asc' | 'desc',
//     page,
//     per_page: 12
//   };

//   const { data, isLoading, error } = useProducts(filters);
//   const products = data?.data || [];
//   const totalProducts = data?.meta?.total || 0;
//   const currentPage = data?.meta?.current_page || 1;
//   const lastPage = data?.meta?.last_page || 1;

//   // Update URL when filters change
//   const updateFilters = (newFilters: Partial<ProductFilters>) => {
// 	const params = new URLSearchParams();
	
// 	// If we're not clearing all filters, preserve the existing ones
// 	if (Object.keys(newFilters).length > 0) {
// 		Object.entries(filters).forEach(([key, value]) => {
// 		if (value !== undefined && value !== '') {
// 			params.set(key, String(value));
// 		}
// 		});
// 	}
	
// 	// Apply new filters (or none if clearing)
// 	Object.entries(newFilters).forEach(([key, value]) => {
// 		if (value === undefined || value === '') {
// 		params.delete(key);
// 		} else {
// 		params.set(key, String(value));
// 		}
// 	});

// 	// Reset to page 1 when filters change (unless page is explicitly set)
// 	if (!('page' in newFilters)) {
// 		params.set('page', '1');
// 	}

// 	router.push(`${pathname}?${params.toString()}`);
//   };

//   const clearAllFilters = () => {
// 	setSearchTerm('');
// 	updateFilters({
// 		search: undefined,
// 		category_id: undefined,
// 		brand_id: undefined,
// 		'price_range[min]': undefined,
// 		'price_range[max]': undefined,
// 		sort_by: 'created_at',
// 		sort_direction: 'desc',
// 		page: 1
// 	});
//   };

//   // Handle search submit
//   const handleSearch = () => {
//     updateFilters({ search: searchTerm });
//   };

//   // Pagination handlers
//   const handleNextPage = () => {
//     updateFilters({ page: currentPage + 1 });
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const handlePrevPage = () => {
//     updateFilters({ page: currentPage - 1 });
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <div className="bg-white">
//       <div className="container mx-auto px-4 py-8">
//         {/* Breadcrumb */}
//         <div className="text-sm text-gray-500 mb-8">
//           <Link href="/" className="hover:text-gray-800">Home</Link>
//           <span className="mx-2">/</span>
//           <span>Products</span>
//           {searchQuery && (
//             <>
//               <span className="mx-2">/</span>
//               <span>Search: &quot;{searchQuery}&quot;</span>
//             </>
//           )}
//         </div>

//         <div className="grid lg:grid-cols-5 gap-8">
//           {/* Filters Sidebar */}
//           <div className="lg:col-span-1">
//             <Button 
//               variant="outline" 
//               className="lg:hidden mb-4 w-full"
//               onClick={() => setShowFilters(!showFilters)}
//             >
//               <SlidersHorizontal className="mr-2 h-4 w-4" />
//               {showFilters ? 'Hide Filters' : 'Show Filters'}
//             </Button>
            
//             <div className={`${showFilters ? 'block' : 'hidden'} lg:block space-y-6`}>
//               <div>
//                 <h3 className="font-medium mb-2">Search</h3>
//                 <div className="flex gap-2">
//                   <Input
//                     placeholder="Search products..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
//                   />
//                   <Button onClick={handleSearch}>
//                     <Search className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </div>

//               <div>
//                 <h3 className="font-medium mb-2">Price Range</h3>
//                 <div className="grid grid-cols-2 gap-2">
//                   <Input
//                     placeholder="Min"
//                     type="number"
//                     value={minPrice}
//                     onChange={(e) => updateFilters({ 'price_range[min]': Number(e.target.value) })}
//                   />
//                   <Input
//                     placeholder="Max"
//                     type="number"
//                     value={maxPrice}
//                     onChange={(e) => updateFilters({ 'price_range[max]': Number(e.target.value) })}
//                   />
//                 </div>
//               </div>

//               {/* Add more filters for category, brand etc as needed */}
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="lg:col-span-4">
//             {/* Toolbar */}
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
//               <div className="flex items-center gap-4">
//                 <span className="text-sm text-gray-600">
//                   {totalProducts} products found
//                   {searchQuery && ` for "${searchQuery}"`}
//                 </span>
//               </div>

// 			  <div className="flex items-center gap-4">
// 				<Select 
// 					value={`${sortBy}:${sortDirection}`}
// 					onValueChange={(value) => {
// 					const [sortBy, sortDirection] = value.split(':');
// 					updateFilters({ 
// 						sort_by: sortBy, 
// 						sort_direction: sortDirection as 'asc' | 'desc',
// 						page: 1 // Reset to first page when changing sort
// 					});
// 					}}
// 				>
// 					<SelectTrigger className="w-48">
// 					<SelectValue placeholder="Sort by" />
// 					</SelectTrigger>
// 					<SelectContent>
// 					{sortOptions.map((option) => (
// 						<SelectItem key={option.value} value={option.value}>
// 						{option.label}
// 						</SelectItem>
// 					))}
// 					</SelectContent>
// 				</Select>
// 			  </div>
//             </div>

//             {/* Products Display */}
//             {isLoading ? (
//               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
//                 {Array.from({ length: 12 }).map((_, i) => (
//                   <div key={i} className="h-64 bg-gray-100 animate-pulse rounded-lg" />
//                 ))}
//               </div>
//             ) : error ? (
//               <div className="text-center py-16">
//                 <div className="text-red-500 mb-4">Error loading products</div>
//                 <p className="text-gray-600">{error.message}</p>
//               </div>
//             ) : products.length === 0 ? (
//               <div className="text-center py-16">
//                 <div className="text-gray-400 mb-4">
//                   <Search className="w-16 h-16 mx-auto" />
//                 </div>
//                 <h3 className="text-xl font-semibold mb-2">No products found</h3>
//                 <p className="text-gray-600 mb-6">
//                   Try adjusting your search or filter criteria
//                 </p>
//                 <Button variant="outline" onClick={clearAllFilters}>
// 					Clear all filters
// 				</Button>
//               </div>
//             ) : (
//               <>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
//                   {products.map((product) => (
//                     <ProductCard key={product.id} product={product} />
//                   ))}
//                 </div>

//                 {/* Pagination */}
//                 {lastPage > 1 && (
//                   <div className="flex items-center justify-center gap-4 mt-12">
//                     <Button
//                       variant="outline"
//                       disabled={currentPage <= 1}
//                       onClick={handlePrevPage}
//                     >
//                       Previous
//                     </Button>
//                     <span className="text-sm text-gray-600">
//                       Page {currentPage} of {lastPage}
//                     </span>
//                     <Button
//                       variant="outline"
//                       disabled={currentPage >= lastPage}
//                       onClick={handleNextPage}
//                     >
//                       Next
//                     </Button>
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useProducts } from "@/services/productService";
import { useBrands } from "@/services/brandService";
import { useCategories } from "@/services/categoryService";
import { ProductFilters } from "@/types/product";
import { Category } from "@/types/category";
import { Brand } from "@/types/brands";

const sortOptions = [
  { value: "created_at:desc", label: "Newest First" },
  { value: "created_at:asc", label: "Oldest First" },
  { value: "name:asc", label: "Name: A to Z" },
  { value: "name:desc", label: "Name: Z to A" },
  { value: "price:asc", label: "Price: Low to High" },
  { value: "price:desc", label: "Price: High to Low" },
];

export default function ProductsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get query parameters
  const searchQuery = searchParams.get('search') ?? '';
  const categoryId = searchParams.get('category_id') ?? '';
  const brandId = searchParams.get('brand_id') ?? '';
  const minPrice = searchParams.get('price_range[min]') ?? '';
  const maxPrice = searchParams.get('price_range[max]') ?? '';
  const sortBy = searchParams.get('sort_by') ?? 'created_at';
  const sortDirection = searchParams.get('sort_direction') ?? 'desc';
  const page = parseInt(searchParams.get('page') ?? '1');

  // State
  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch data
  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useCategories();
  const { data: brandsResponse, isLoading: brandsLoading, error: brandsError } = useBrands();
  const brands = brandsResponse?.data ?? []; // Extract Brand[] from BrandResponse
  const { data, isLoading, error } = useProducts({
    search: searchQuery,
    category_id: categoryId,
    brand_id: brandId,
    'price_range[min]': minPrice ? Number(minPrice) : undefined,
    'price_range[max]': maxPrice ? Number(maxPrice) : undefined,
    sort_by: sortBy,
    sort_direction: sortDirection as 'asc' | 'desc',
    page,
    per_page: 12,
  });

  const products = data?.data ?? [];
  const totalProducts = data?.meta?.total ?? 0;
  const currentPage = data?.meta?.current_page ?? 1;
  const lastPage = data?.meta?.last_page ?? 1;

  // Sync search term with URL param
  useEffect(() => {
    setSearchTerm(searchQuery);
  }, [searchQuery]);

  // Update URL with new filters
  const updateFilters = (newFilters: Partial<ProductFilters>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value === undefined || value === '') {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    if (!('page' in newFilters)) {
      params.set('page', '1');
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    router.push(pathname, { scroll: false });
  };

  const handleSearch = () => {
    updateFilters({ search: searchTerm, page: 1 });
  };

  // Pagination handlers
  const handleNextPage = () => {
    updateFilters({ page: currentPage + 1 });
  };

  const handlePrevPage = () => {
    updateFilters({ page: currentPage - 1 });
  };

  // Calculate active filters
  const activeFilters = [
    searchQuery,
    categoryId,
    brandId,
    minPrice,
    maxPrice
  ].filter(Boolean).length;

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Mobile Filter Bar */}
        <div className="lg:hidden mb-6 flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters {activeFilters > 0 && `(${activeFilters})`}
          </Button>
          <div className="w-full max-w-xs">
            <Select 
              value={`${sortBy}:${sortDirection}`}
              onValueChange={(value) => {
                const [sortBy, sortDirection] = value.split(':');
                updateFilters({ 
                  sort_by: sortBy, 
                  sort_direction: sortDirection as 'asc' | 'desc',
                  page: 1
                });
              }}
            >
              <SelectTrigger>
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

        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-gray-800">Home</Link>
          <span className="mx-2">/</span>
          <span>Products</span>
          {searchQuery && (
            <>
              <span className="mx-2">/</span>
              <span>Search: {searchQuery}</span>
            </>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block lg:w-64 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Filters</h2>
              {activeFilters > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearAllFilters}
                  className="text-sm text-gray-500 hover:text-gray-800"
                >
                  Clear all
                </Button>
              )}
            </div>

            {/* Search */}
            <div>
              <h3 className="font-medium mb-2">Search</h3>
              <div className="flex gap-2">
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button onClick={handleSearch}>
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-medium mb-2">Price Range</h3>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Min"
                  type="number"
                  value={minPrice}
                  onChange={(e) => updateFilters({ 'price_range[min]': Number(e.target.value) || undefined })}
                />
                <Input
                  placeholder="Max"
                  type="number"
                  value={maxPrice}
                  onChange={(e) => updateFilters({ 'price_range[max]': Number(e.target.value) || undefined })}
                />
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-medium mb-2">Categories</h3>
              {categoriesLoading ? (
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" />
                  ))}
                </div>
              ) : categoriesError ? (
                <div className="text-sm text-red-500">Error loading categories</div>
              ) : categories && categories.length > 0 ? (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {categories.map((category: Category) => (
                    <div key={category.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`category-${category.id}`}
                        checked={categoryId === category.id}
                        onChange={() => {
                          updateFilters({
                            category_id: categoryId === category.id ? undefined : category.id,
                            page: 1
                          });
                        }}
                        className="mr-2 rounded text-primary focus:ring-primary h-4 w-4"
                      />
                      <label 
                        htmlFor={`category-${category.id}`} 
                        className="text-sm cursor-pointer select-none"
                      >
                        {category.name} ({category.products_count})
                      </label>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-500">No categories available</div>
              )}
            </div>

            {/* Brands */}
            <div>
              <h3 className="font-medium mb-2">Brands</h3>
              {brandsLoading ? (
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" />
                  ))}
                </div>
              ) : brandsError ? (
                <div className="text-sm text-red-500">Error loading brands</div>
              ) : brands && brands.length > 0 ? (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {brands.map((brand: Brand) => (
                    <div key={brand.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`brand-${brand.id}`}
                        checked={brandId === String(brand.id)}
                        onChange={() => {
                          updateFilters({
                            brand_id: brandId === String(brand.id) ? undefined : String(brand.id),
                            page: 1
                          });
                        }}
                        className="mr-2 rounded text-primary focus:ring-primary h-4 w-4"
                      />
                      <label 
                        htmlFor={`brand-${brand.id}`} 
                        className="text-sm cursor-pointer select-none"
                      >
                        {brand.name} ({brand.products_count})
                      </label>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-500">No brands available</div>
              )}
            </div>
          </div>

          {/* Mobile Filters Overlay */}
          {showFilters && (
            <div className="fixed inset-0 z-50 lg:hidden bg-black/50">
              <div className="absolute inset-y-0 left-0 w-80 max-w-[80%] bg-white p-4 overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setShowFilters(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Mobile filter content */}
                <div className="space-y-6 pb-20">
                  {/* Search */}
                  <div>
                    <h3 className="font-medium mb-2">Search</h3>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                      />
                      <Button onClick={handleSearch}>
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h3 className="font-medium mb-2">Price Range</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="Min"
                        type="number"
                        value={minPrice}
                        onChange={(e) => updateFilters({ 'price_range[min]': Number(e.target.value) || undefined })}
                      />
                      <Input
                        placeholder="Max"
                        type="number"
                        value={maxPrice}
                        onChange={(e) => updateFilters({ 'price_range[max]': Number(e.target.value) || undefined })}
                      />
                    </div>
                  </div>

                  {/* Categories */}
                  <div>
                    <h3 className="font-medium mb-2">Categories</h3>
                    {categoriesLoading ? (
                      <div className="space-y-2">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" />
                        ))}
                      </div>
                    ) : categoriesError ? (
                      <div className="text-sm text-red-500">Error loading categories</div>
                    ) : categories && categories.length > 0 ? (
                      <div className="space-y-2">
                        {categories.map((category: Category) => (
                          <div key={category.id} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`m-category-${category.id}`}
                              checked={categoryId === category.id}
                              onChange={() => {
                                updateFilters({
                                  category_id: categoryId === category.id ? undefined : category.id,
                                  page: 1
                                });
                              }}
                              className="mr-2 rounded text-primary focus:ring-primary h-4 w-4"
                            />
                            <label 
                              htmlFor={`m-category-${category.id}`} 
                              className="text-sm cursor-pointer select-none"
                            >
                              {category.name} ({category.products_count})
                            </label>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500">No categories available</div>
                    )}
                  </div>

                  {/* Brands */}
                  <div>
                    <h3 className="font-medium mb-2">Brands</h3>
                    {brandsLoading ? (
                      <div className="space-y-2">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" />
                        ))}
                      </div>
                    ) : brandsError ? (
                      <div className="text-sm text-red-500">Error loading brands</div>
                    ) : brands && brands.length > 0 ? (
                      <div className="space-y-2">
                        {brands.map((brand: Brand) => (
                          <div key={brand.id} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`m-brand-${brand.id}`}
                              checked={brandId === String(brand.id)}
                              onChange={() => {
                                updateFilters({
                                  brand_id: brandId === String(brand.id) ? undefined : String(brand.id),
                                  page: 1
                                });
                              }}
                              className="mr-2 rounded text-primary focus:ring-primary h-4 w-4"
                            />
                            <label 
                              htmlFor={`m-brand-${brand.id}`} 
                              className="text-sm cursor-pointer select-none"
                            >
                              {brand.name} ({brand.products_count})
                            </label>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500">No brands available</div>
                    )}
                  </div>
                </div>

                {/* Mobile filter footer */}
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1" 
                    onClick={() => setShowFilters(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="flex-1" 
                    onClick={() => setShowFilters(false)}
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {/* Active Filters */}
            {(searchQuery || categoryId || brandId || minPrice || maxPrice) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {searchQuery && (
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    Search: {searchQuery}
                    <button 
                      onClick={() => updateFilters({ search: undefined })}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                {categoryId && categories?.find(c => c.id === categoryId) && (
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Category: {categories.find(c => c.id === categoryId)?.name}
                    <button 
                      onClick={() => updateFilters({ category_id: undefined })}
                      className="ml-2 text-blue-500 hover:text-blue-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                {brandId && brands?.find(b => String(b.id) === brandId) && (
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Brand: {brands.find(b => String(b.id) === brandId)?.name}
                    <button 
                      onClick={() => updateFilters({ brand_id: undefined })}
                      className="ml-2 text-green-500 hover:text-green-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                {minPrice && (
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    Min: ${minPrice}
                    <button 
                      onClick={() => updateFilters({ 'price_range[min]': undefined })}
                      className="ml-2 text-purple-500 hover:text-purple-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                {maxPrice && (
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    Max: ${maxPrice}
                    <button 
                      onClick={() => updateFilters({ 'price_range[max]': undefined })}
                      className="ml-2 text-purple-500 hover:text-purple-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Toolbar - Desktop */}
            <div className="hidden lg:flex items-center justify-between mb-6">
              <div className="text-sm text-gray-600">
                {totalProducts} products found
                {searchQuery && ` for "${searchQuery}"`}
              </div>
              <div className="flex items-center gap-4">
                <Select 
                  value={`${sortBy}:${sortDirection}`}
                  onValueChange={(value) => {
                    const [sortBy, sortDirection] = value.split(':');
                    updateFilters({ 
                      sort_by: sortBy, 
                      sort_direction: sortDirection as 'asc' | 'desc',
                      page: 1
                    });
                  }}
                >
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
            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="h-64 bg-gray-100 animate-pulse rounded-lg" />
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-16">
                <div className="text-red-500 mb-4">Error loading products</div>
                <p className="text-gray-600">{error.message}</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <Button variant="outline" onClick={clearAllFilters}>
                  Clear all filters
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {lastPage > 1 && (
                  <div className="flex items-center justify-center gap-4 mt-12">
                    <Button
                      variant="outline"
                      disabled={currentPage <= 1}
                      onClick={handlePrevPage}
                    >
                      Previous
                    </Button>
                    <span className="text-sm text-gray-600">
                      Page {currentPage} of {lastPage}
                    </span>
                    <Button
                      variant="outline"
                      disabled={currentPage >= lastPage}
                      onClick={handleNextPage}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}