import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Heart, Eye } from "lucide-react";

interface ProductCardProps {
	id: string;
	name: string;
	price: number;
	originalPrice?: number;
	rating: number;
	reviews: number;
	images: string;
	discount?: number;
	isNew?: boolean;
	size?: "small" | "medium" | "large";
}

export function ProductCard({
	id,
	name,
	price,
	originalPrice,
	rating,
	reviews,
	images,
	discount,
	isNew,
	size = "medium",
}: ProductCardProps) {
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

	return (
		<Card className="group relative overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
			<Link href={`/products/${id}`}>
				<CardContent className="p-0">
					{/* Product Image */}
					<div className="relative bg-gray-100 aspect-square overflow-hidden">
						{discount && (
							<div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded z-10">
								-{discount}%
							</div>
						)}
						{isNew && (
							<div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs rounded z-10">
								NEW
							</div>
						)}

						<Image
							src={images || "/placeholder.svg"}
							alt={name}
							fill
							className="object-cover group-hover:scale-105 transition-transform duration-300"
						/>

						{/* Hover Actions */}
						<div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
							<Button size="sm" variant="secondary" className="w-8 h-8 p-0">
								<Heart className="w-4 h-4" />
							</Button>
							<Button size="sm" variant="secondary" className="w-8 h-8 p-0">
								<Eye className="w-4 h-4" />
							</Button>
						</div>

						{/* Add to Cart Button */}
						<div className="absolute bottom-0 left-0 right-0 bg-black text-white text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
							Add To Cart
						</div>
					</div>

					{/* Product Info */}
					<div className="p-4">
						<h3 className="font-medium text-sm mb-2 line-clamp-2">{name}</h3>

						<div className="flex items-center gap-2 mb-2">
							<span className="text-red-500 font-semibold">${price}</span>
							{originalPrice && (
								<span className="text-gray-500 line-through text-sm">
									${originalPrice}
								</span>
							)}
						</div>

						<div className="flex items-center gap-2">
							<div className="flex">{renderStars(rating)}</div>
							<span className="text-gray-500 text-sm">({reviews})</span>
						</div>
					</div>
				</CardContent>
			</Link>
		</Card>
	);
}
