"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProductGallery } from "@/components/products/ProductGallery";
import { QuantitySelector } from "@/components/products/QuantitySelector";
import { Heart, Truck, RotateCcw, Star } from "lucide-react";
import { Product } from "@/types/product";

export default function ProductDetail({ product }: { product: Product }) {
	const [selectedColor, setSelectedColor] = useState("red");
	const [selectedSize, setSelectedSize] = useState("M");
	const [quantity, setQuantity] = useState(1);
	const renderStars = (rating: number) => {
		return Array.from({ length: 5 }, (_, i) => (
			<Star
				key={i}
				className={`w-4 h-4 ${
					i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
				}`}
			/>
		));
	};

	const handleAddToCart = () => {
		// Implement add to cart logic
		alert(
			`Added ${quantity} ${product.name} to cart (Color: ${selectedColor}, Size: ${selectedSize})`
		);
	};

	return (
		<>
			{/* Product Details */}
			<div className="grid md:grid-cols-2 gap-12 mb-16">
				{/* Product Gallery */}
				<ProductGallery images={product.images} />

				{/* Product Info */}
				<div>
					<h1 className="text-2xl font-semibold mb-2">{product.name}</h1>

					<div className="flex items-center gap-2 mb-4">
						<div className="flex">{renderStars(product.rating)}</div>
						<span className="text-gray-500">({product.reviews} Reviews)</span>
						<span className="text-red-500 ml-2">In Stock</span>
					</div>

					<div className="text-2xl font-semibold mb-6">
						${product.price.toFixed(2)}
					</div>

					<p className="text-gray-600 mb-6">{product.description}</p>

					{/* Color Selection */}
					<div className="mb-6">
						<h3 className="font-medium mb-2">Colours:</h3>
						<div className="flex gap-3">
							{product.options.colors.map((color) => (
								<button
									key={color}
									className={`w-6 h-6 rounded-full ${
										selectedColor === color
											? "ring-2 ring-offset-2 ring-red-500"
											: ""
									}`}
									style={{ backgroundColor: color }}
									onClick={() => setSelectedColor(color)}
									aria-label={`Select ${color} color`}
								/>
							))}
						</div>
					</div>

					{/* Size Selection */}
					<div className="mb-6">
						<h3 className="font-medium mb-2">Size:</h3>
						<div className="flex gap-3">
							{product.options.sizes.map((size) => (
								<button
									key={size}
									className={`w-10 h-10 flex items-center justify-center border rounded-md ${
										selectedSize === size
											? "bg-black text-white"
											: "bg-white text-black hover:bg-gray-100"
									}`}
									onClick={() => setSelectedSize(size)}
								>
									{size}
								</button>
							))}
						</div>
					</div>

					{/* Quantity and Add to Cart */}
					<div className="flex gap-4 mb-8">
						<QuantitySelector initialValue={quantity} onChange={setQuantity} />
						<Button
							className="bg-red-500 hover:bg-red-600 flex-1"
							onClick={handleAddToCart}
						>
							Buy Now
						</Button>
						<Button variant="outline" size="icon" className="rounded-full">
							<Heart className="h-5 w-5" />
							<span className="sr-only">Add to wishlist</span>
						</Button>
					</div>

					{/* Delivery Info */}
					<div className="space-y-4 border rounded-md p-4">
						<div className="flex gap-4">
							<Truck className="h-6 w-6 text-gray-500" />
							<div>
								<h4 className="font-medium">Free Delivery</h4>
								<p className="text-sm text-gray-500">
									Enter your postal code for Delivery Availability
								</p>
							</div>
						</div>
						<div className="flex gap-4">
							<RotateCcw className="h-6 w-6 text-gray-500" />
							<div>
								<h4 className="font-medium">Return Delivery</h4>
								<p className="text-sm text-gray-500">
									Free 30 Days Delivery Returns. Details
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
