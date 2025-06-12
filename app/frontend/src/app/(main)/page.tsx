import { HeroSection } from "@/components/layouts/HeroSection";
import { BrandStrip } from "@/components/layouts/BrandStrip";
import { AllProduct } from "@/components/products/AllProduct";
import { FutureProduct } from "@/components/products/FutureProduct";
import { NewArrival } from "@/components/products/NewArrival";
import TopSellingSection from "@/components/products/TopSelling";
import { ClawBanner } from "@/components/products/ClawBanner";
import products from "@/data/products";

// Sample data
const allProducts = products;

export default function HomePage() {
	return (
		<>
			<HeroSection />
			<BrandStrip />

			<div className="container mx-auto px-8 pt-10">
				{/* <ProductShowcase
					title="New Arrivals"
					products={newArrivals}
					showNavigation={true}
				/> */}
				<NewArrival title="New Arrivals" />
				<TopSellingSection />
				<AllProduct title="All Products" products={allProducts} />

				{/* Gaming Banner */}
				<ClawBanner />

				{/* <ProductShowcase title="" products={allProducts} showViewAll={true} /> */}

				{/* Devices of The Future */}
				<FutureProduct />
			</div>
		</>
	);
}
