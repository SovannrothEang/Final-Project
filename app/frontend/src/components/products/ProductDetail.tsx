// "use client";

// import { useState } from "react";
// import { ProductGallery } from "@/components/products/ProductGallery";
// import { Star } from "lucide-react";
// import { Product } from "@/types/product";

// export default function ProductDetail({ product }: { product: Product }) {
// 	const [selectedColor, setSelectedColor] = useState("red");
// 	const [selectedSize, setSelectedSize] = useState("M");
// 	const renderStars = (rating: number) => {
// 		return Array.from({ length: 5 }, (_, i) => (
// 			<Star
// 				key={i}
// 				className={`w-4 h-4 ${
// 					i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
// 				}`}
// 			/>
// 		));
// 	};

// 	// const handleAddToCart = () => {
// 	// 	// Implement add to cart logic
// 	// 	alert(
// 	// 		`Added ${quantity} ${product.name} to cart (Color: ${selectedColor}, Size: ${selectedSize})`
// 	// 	);
// 	// };

// 	return (
// 		<>
// 			{/* Product Details */}
// 			<div className="grid md:grid-cols-2 gap-12 mb-16">
// 				{/* Product Gallery */}
// 				<ProductGallery images={product.images} />

// 				{/* Product Info */}
// 				<div>
// 					<h1 className="text-2xl font-semibold mb-2">{product.name}</h1>

// 					<div className="flex items-center gap-2 mb-4">
// 						<div className="flex">{renderStars(product.rating)}</div>
// 						<span className="text-gray-500">({product.reviews} Reviews)</span>
// 						<span className="text-red-500 ml-2">In Stock</span>
// 					</div>

// 					<div className="text-2xl font-semibold mb-6">
// 						${product.price.toFixed(2)}
// 					</div>

// 					<p className="text-gray-600 mb-6">{product.description}</p>

// 					{/* Color Selection */}
// 					<div className="mb-6">
// 						<h3 className="font-medium mb-2">Colours:</h3>
// 						<div className="flex gap-3">
// 							{product.options.colors.map((color) => (
// 								<button
// 									key={color}
// 									className={`w-6 h-6 rounded-full ${
// 										selectedColor === color
// 											? "ring-2 ring-offset-2 ring-red-500"
// 											: ""
// 									}`}
// 									style={{ backgroundColor: color }}
// 									onClick={() => setSelectedColor(color)}
// 									aria-label={`Select ${color} color`}
// 								/>
// 							))}
// 						</div>
// 					</div>

// 					{/* Size Selection */}
// 					<div className="mb-6">
// 						<h3 className="font-medium mb-2">Size:</h3>
// 						<div className="flex gap-3">
// 							{product.options.sizes.map((size) => (
// 								<button
// 									key={size}
// 									className={`w-10 h-10 flex items-center justify-center border rounded-md ${
// 										selectedSize === size
// 											? "bg-black text-white"
// 											: "bg-white text-black hover:bg-gray-100"
// 									}`}
// 									onClick={() => setSelectedSize(size)}
// 								>
// 									{size}
// 								</button>
// 							))}
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</>
// 	);
// }

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { ArrowLeft, Star } from "lucide-react";
import * as productService from "@/services/productService";

interface ProductDetailProps {
	product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
	const [selectedStars, setSelectedStars] = useState(0);
	const router = useRouter();

	const handleVoteSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (selectedStars === 0) return;

		try {
			const response = await productService.vote(product.id, selectedStars);
			if (response.success) {
				setSelectedStars(0);
				router.refresh();
			} else {
				alert(
					`Failed to submit vote: ${response.data?.message || "Unknown error"}`
				);
			}
		} catch (error: unknown) {
			// Use 'unknown' for better type safety
			if (error instanceof Error) {
				alert(`Error submitting vote: ${error.message}`);
			} else {
				alert("Error submitting vote: An unknown error occurred.");
			}
		}
	};

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			{/* Back Button */}
			<div className="mb-6">
				<Link href="/products">
					<Button variant="ghost" className="flex items-center gap-2 text-sm">
						<ArrowLeft className="h-4 w-4" />
						Back to Products
					</Button>
				</Link>
			</div>

			{/* Product Content */}
			<div className="grid gap-12 md:grid-cols-2">
				{/* Product Image */}
				<div className="bg-gray-50 rounded-lg overflow-hidden">
					{product.image ? (
						<div className="relative aspect-square">
							<Image
								src={product.image}
								alt={product.name}
								fill
								className="object-contain"
								priority
							/>
						</div>
					) : (
						<div className="aspect-square flex items-center justify-center bg-gray-100">
							<span className="text-gray-400">No Image Available</span>
						</div>
					)}
				</div>

				{/* Product Information */}
				<div className="space-y-6">
					{/* Basic Info */}
					<div className="space-y-3">
						<div className="flex items-center gap-2">
							{product.is_new && (
								<span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
									New Arrival
								</span>
							)}
							{product.is_top && (
								<span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
									Popular
								</span>
							)}
						</div>

						<h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

						<div className="flex items-center gap-4">
							<div className="flex items-center">
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										className={`h-5 w-5 ${
											i < Math.floor(product.rating)
												? "fill-yellow-400 text-yellow-400"
												: "text-gray-300"
										}`}
									/>
								))}
								<span className="ml-1 text-sm text-gray-500">
									({product.reviews} reviews)
								</span>
							</div>
							<span className="text-sm text-gray-500">
								Brand: {product.brand.name}
							</span>
						</div>
					</div>

					{/* Pricing */}
					<div className="space-y-1">
						<div className="flex items-baseline gap-3">
							<span className="text-3xl font-semibold text-gray-900">
								${(product.price * (1 - product.discount / 100)).toFixed(2)}
							</span>
							{product.discount > 0 && (
								<>
									<span className="text-lg text-gray-500 line-through">
										${product.price.toFixed(2)}
									</span>
									<span className="text-sm font-medium text-green-600">
										{product.discount}% OFF
									</span>
								</>
							)}
						</div>
						<p
							className={`text-sm ${
								product.in_stock ? "text-green-600" : "text-red-600"
							}`}
						>
							{product.in_stock
								? `${product.stock} available in stock`
								: "Currently out of stock"}
						</p>
					</div>

					{/* Divider */}
					<div className="border-t border-gray-200"></div>

					{/* Description */}
					<div className="space-y-3">
						<h2 className="text-lg font-medium text-gray-900">Description</h2>
						<p className="text-gray-700">{product.description}</p>
						{product.short_description && (
							<p className="text-gray-700">{product.short_description}</p>
						)}
					</div>

					{/* Product Options */}
					{product.options &&
						Object.entries(product.options).some(
							([, values]) => values.length > 0
						) && (
							<div className="space-y-4">
								<h2 className="text-lg font-medium text-gray-900">Options</h2>
								<div className="space-y-4">
									{Object.entries(product.options).map(
										([key, values]) =>
											values.length > 0 && (
												<div key={key}>
													<h3 className="text-sm font-medium text-gray-700 capitalize mb-2">
														{key}
													</h3>
													<div className="flex flex-wrap gap-2">
														{values.map((value) => (
															<span
																key={value}
																className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
															>
																{value}
															</span>
														))}
													</div>
												</div>
											)
									)}
								</div>
							</div>
						)}

					{/* Product Specifications */}
					<div className="border-t border-gray-200 pt-6">
						<h2 className="text-lg font-medium text-gray-900 mb-4">
							Specifications
						</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
							<div>
								<p className="text-gray-500">Product ID</p>
								<p className="text-gray-900">{product.id}</p>
							</div>
							<div>
								<p className="text-gray-500">Category</p>
								<p className="text-gray-900">{product.category.name}</p>
							</div>
							<div>
								<p className="text-gray-500">Status</p>
								<p className="text-gray-900 capitalize">{product.status}</p>
							</div>
							<div>
								<p className="text-gray-500">Last Updated</p>
								<p className="text-gray-900">
									{new Date(product.updated_at).toLocaleDateString("en-US", {
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
								</p>
							</div>
							{/* Star Rating Form */}
							<div className="space-y-3">
								<h2 className="text-lg font-medium text-gray-900">
									Rate this product
								</h2>
								<form
									onSubmit={handleVoteSubmit}
									className="flex items-center gap-4"
								>
									<div className="flex">
										{[...Array(5)].map((_, i) => (
											<Star
												key={i}
												className={`h-6 w-6 cursor-pointer ${
													i < selectedStars
														? "fill-yellow-400 text-yellow-400"
														: "text-gray-300"
												}`}
												onClick={() => setSelectedStars(i + 1)}
											/>
										))}
									</div>
									<Button type="submit" disabled={selectedStars === 0}>
										Submit Vote
									</Button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
