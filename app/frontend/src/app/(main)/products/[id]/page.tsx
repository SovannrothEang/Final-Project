"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ProductGallery } from "@/components/products/ProductGallery";
import { QuantitySelector } from "@/components/products/QuantitySelector";
import { Heart, Truck, RotateCcw, Star } from "lucide-react";

// Sample product data
const product = {
	id: "g92",
	name: "Havic HV G-92 Gamepad",
	price: 192.0,
	rating: 4,
	reviews: 150,
	description:
		"PlayStation 5 Controller Skin High-quality vinyl skin with air-channel adhesive for easy bubble-free install & mess-free removal. Pressure-sensitive.",
	colors: ["red", "white"],
	sizes: ["XS", "S", "M", "L", "XL"],
	images: [
		{
			src: "/placeholder.svg?height=400&width=400",
			alt: "Havic HV G-92 Gamepad - Front View",
		},
		{
			src: "/placeholder.svg?height=400&width=400",
			alt: "Havic HV G-92 Gamepad - Side View",
		},
		{
			src: "/placeholder.svg?height=400&width=400",
			alt: "Havic HV G-92 Gamepad - Back View",
		},
		{
			src: "/placeholder.svg?height=400&width=400",
			alt: "Havic HV G-92 Gamepad - Top View",
		},
	],
};

// Sample related products
const relatedProducts = [
	{
		id: "9",
		name: "Gaming Headset Pro",
		price: 756.65,
		originalPrice: 1156.65,
		rating: 5,
		reviews: 65,
		image: "/placeholder.svg?height=300&width=300",
		discount: 35,
	},
	{
		id: "10",
		name: "Gaming Headset Pro",
		price: 756.65,
		originalPrice: 1156.65,
		rating: 5,
		reviews: 65,
		image: "/placeholder.svg?height=300&width=300",
		discount: 35,
	},
	{
		id: "11",
		name: "Gaming Headset Pro",
		price: 756.65,
		originalPrice: 1156.65,
		rating: 5,
		reviews: 65,
		image: "/placeholder.svg?height=300&width=300",
		discount: 35,
	},
	{
		id: "12",
		name: "Gaming Headset Pro",
		price: 756.65,
		originalPrice: 1156.65,
		rating: 5,
		reviews: 65,
		image: "/placeholder.svg?height=300&width=300",
		discount: 35,
	},
];

export default function ProductPage({ params }: { params: { id: string } }) {
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
		<div className="bg-white">
			<div className="container mx-auto px-4 py-8">
				{/* Breadcrumb */}
				<div className="text-sm text-gray-500 mb-8">
					<Link href="/" className="hover:text-gray-800">
						Account
					</Link>
					<span className="mx-2">/</span>
					<Link href="/gaming" className="hover:text-gray-800">
						Gaming
					</Link>
					<span className="mx-2">/</span>
					<span>{product.name}</span>
				</div>

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
								{product.colors.map((color) => (
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
								{product.sizes.map((size) => (
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
							<QuantitySelector
								initialValue={quantity}
								onChange={setQuantity}
							/>
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

				{/* Related Products */}
				<div className="mb-16">
					<h2 className="text-xl font-semibold mb-6">Related Item</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{relatedProducts.map((product) => (
							<div
								key={product.id}
								className="border rounded-md overflow-hidden group"
							>
								<div className="relative aspect-square bg-gray-100">
									{product.discount && (
										<div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded z-10">
											-{product.discount}% OFF
										</div>
									)}
									<Image
										src={product.image || "/placeholder.svg"}
										alt={product.name}
										fill
										className="object-cover group-hover:scale-105 transition-transform duration-300"
									/>
								</div>
								<div className="p-4">
									<h3 className="font-medium mb-2">{product.name}</h3>
									<div className="flex items-center gap-2 mb-2">
										<span className="text-red-500 font-semibold">
											${product.price}
										</span>
										{product.originalPrice && (
											<span className="text-gray-500 line-through text-sm">
												${product.originalPrice}
											</span>
										)}
									</div>
									<div className="flex items-center gap-2">
										<div className="flex">{renderStars(product.rating)}</div>
										<span className="text-gray-500 text-sm">
											({product.reviews})
										</span>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
