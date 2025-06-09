import { ProductCard } from "./ProductCard";
import { Button } from "@/components/ui/button";

interface Product {
	id: string;
	name: string;
	price: number;
	originalPrice?: number;
	rating: number;
	reviews: number;
	image: string;
	discount?: number;
	isNew?: boolean;
}

interface AllProductProps {
	title: string;
	products: Product[];
	showViewAll?: boolean;
	showNavigation?: boolean;
}

export function AllProduct({
	title,
	products,
	showViewAll = true,
}: AllProductProps) {
	return (
		<section className="w-[1450px] h-[1230px]">
			<div className="mb-8">
				<div className="flex items-center gap-2 mb-2">
					<div className="w-4 h-10 bg-black rounded"></div>
					<span className="font-bold text-2xl">{title}</span>
				</div>
			</div>

			{/* Category Buttons */}
			<div className="flex justify-between mb-10">
				{[
					"Laptops",
					"Desktops",
					"PC Components",
					"Monitors",
					"Accessories",
					"Networking Devices",
					"Gaming Gears",
				].map((category) => (
					<Button
						key={category}
						variant={category === "Laptops" ? "default" : "outline"}
						className={`text-lg font-semibold px-6 py-5 rounded-xl ${
							category === "Laptops" ? "bg-black hover:bg-gray-700" : ""
						}`}
					>
						{category}
					</Button>
				))}
			</div>

			{/* Product Grid: 2 Rows x 4 Columns */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
				{products.slice(0, 8).map((product) => (
					<ProductCard key={product.id} {...product} />
				))}
			</div>

			{showViewAll && (
				<div className="text-center">
					<Button variant="outline" className="px-8 py-6 rounded-4xl">
						View All Products
					</Button>
				</div>
			)}
		</section>
	);
}
