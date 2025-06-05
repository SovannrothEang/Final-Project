import { ProductCard } from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

interface ProductShowcaseProps {
	title: string;
	subtitle?: string;
	products: Product[];
	showViewAll?: boolean;
	showNavigation?: boolean;
}

export function ProductShowcase({
	title,
	subtitle,
	products,
	showViewAll = true,
	showNavigation = false,
}: ProductShowcaseProps) {
	return (
		<section className="mb-16">
			<div className="flex items-center justify-between mb-8">
				<div>
					<div className="flex items-center gap-4 mb-2">
						<div className="w-5 h-10 bg-red-500 rounded"></div>
						<span className="text-red-500 font-semibold">{subtitle}</span>
					</div>
					<h2 className="text-3xl font-semibold">{title}</h2>
				</div>

				{showNavigation && (
					<div className="flex gap-2">
						<Button variant="outline" size="sm" className="w-10 h-10 p-0">
							<ChevronLeft className="w-4 h-4" />
						</Button>
						<Button variant="outline" size="sm" className="w-10 h-10 p-0">
							<ChevronRight className="w-4 h-4" />
						</Button>
					</div>
				)}
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
				{products.map((product) => (
					<ProductCard key={product.id} {...product} />
				))}
			</div>

			{showViewAll && (
				<div className="text-center">
					<Button variant="outline" className="px-8">
						View All Products
					</Button>
				</div>
			)}
		</section>
	);
}
