import { HeroSection } from "@/components/layouts/HeroSection";
import { BrandStrip } from "@/components/layouts/BrandStrip";
import { CountdownTimer } from "@/components/products/CountdownTimer";
import { ProductShowcase } from "@/components/products/ProductShowcase";
import { TestimonialSection } from "@/components/products/TestimonialSection";
import { ServiceHighlights } from "@/components/products/ServiceHighlights";
import { Button } from "@/components/ui/button";

// Sample data
const newArrivals = [
	{
		id: "1",
		name: "Razer Blade 16",
		price: 2499,
		originalPrice: 2999,
		rating: 5,
		reviews: 88,
		image: "/placeholder.svg?height=300&width=300",
		discount: 17,
	},
	{
		id: "2",
		name: "PlayStation 5",
		price: 499,
		rating: 5,
		reviews: 325,
		image: "/placeholder.svg?height=300&width=300",
		isNew: true,
	},
	{
		id: "3",
		name: "Gaming PC Build",
		price: 1899,
		rating: 5,
		reviews: 156,
		image: "/placeholder.svg?height=300&width=300",
	},
	{
		id: "4",
		name: "Gaming Keyboard",
		price: 159,
		rating: 4,
		reviews: 89,
		image: "/placeholder.svg?height=300&width=300",
	},
];

const topSelling = [
	{
		id: "5",
		name: "MSI Cyborg A15 & A17 AI",
		price: 1299,
		rating: 5,
		reviews: 145,
		image: "/placeholder.svg?height=300&width=300",
	},
	{
		id: "6",
		name: "Dell 16 Plus",
		price: 899,
		rating: 4,
		reviews: 267,
		image: "/placeholder.svg?height=300&width=300",
	},
	{
		id: "7",
		name: "Asus ROG Strix Scar 16 & 18",
		price: 2199,
		rating: 5,
		reviews: 198,
		image: "/placeholder.svg?height=300&width=300",
	},
	{
		id: "8",
		name: "Lenovo LOQ Gaming Series",
		price: 1099,
		rating: 4,
		reviews: 234,
		image: "/placeholder.svg?height=300&width=300",
	},
];

const allProducts = [
	{
		id: "9",
		name: "Gaming Headset Pro",
		price: 756.65,
		rating: 5,
		reviews: 65,
		image: "/placeholder.svg?height=300&width=300",
		discount: 35,
	},
	{
		id: "10",
		name: "Gaming Headset Pro",
		price: 756.65,
		rating: 5,
		reviews: 65,
		image: "/placeholder.svg?height=300&width=300",
		discount: 35,
	},
	{
		id: "11",
		name: "Gaming Headset Pro",
		price: 756.65,
		rating: 5,
		reviews: 65,
		image: "/placeholder.svg?height=300&width=300",
		discount: 35,
	},
	{
		id: "12",
		name: "Gaming Headset Pro",
		price: 756.65,
		rating: 5,
		reviews: 65,
		image: "/placeholder.svg?height=300&width=300",
		discount: 35,
	},
];

const testimonials = [
	{
		id: "1",
		name: "Sarah Johnson",
		review:
			"I Ordered A Gaming PC Setup And Everything Arrived Well-Packaged And Exactly As Described. The Build Quality Was Excellent. Will Definitely Shop Here Again!",
		rating: 5,
	},
	{
		id: "2",
		name: "Mike Chen",
		review:
			"Had A Few Questions Before Placing My Order And The Support Team Was Incredibly Helpful. They Guided Me Through The Options And Helped Me Pick The Best Build For My Budget.",
		rating: 5,
	},
	{
		id: "3",
		name: "Alex Rodriguez",
		review: "Fantastic customer support! Great prices and reliable products!",
		rating: 5,
	},
	{
		id: "4",
		name: "Emma Davis",
		review:
			"Found The Best Deal On A High-End Graphics Card Here. Product Was Authentic And Shipping Was Fast. Definitely Highly Recommend This Store To Any Tech Enthusiast!",
		rating: 5,
	},
	{
		id: "5",
		name: "James Wilson",
		review:
			"Been The Industry Standard For Years. Amazing Quality And Performance. Can't Go Wrong With Their Products!",
		rating: 5,
	},
];

export default function HomePage() {
	return (
		<div className="bg-white">
			<HeroSection />
			<BrandStrip />

			<div className="container mx-auto px-4">
				<CountdownTimer />

				<ProductShowcase
					title="New Arrivals"
					products={newArrivals}
					showNavigation={true}
				/>

				<ProductShowcase
					title="Top Selling"
					subtitle="This Month"
					products={topSelling}
				/>

				{/* Gaming Banner */}
				<section className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg p-12 mb-16 text-white text-center">
					<h2 className="text-4xl font-bold mb-4">CLAW & AI</h2>
					<p className="text-xl mb-6">GRIP AND GAME</p>
					<Button className="bg-white text-black hover:bg-gray-100">
						Shop Now
					</Button>
				</section>

				{/* Category Filters */}
				<section className="mb-8">
					<div className="flex items-center gap-4 mb-8">
						<div className="w-5 h-10 bg-red-500 rounded"></div>
						<h2 className="text-3xl font-semibold">All Products</h2>
					</div>

					<div className="flex gap-4 mb-8 overflow-x-auto">
						{[
							"Laptops",
							"Desktops",
							"PC Components",
							"Monitors",
							"Accessories",
							"Networking Devices",
						].map((category) => (
							<Button
								key={category}
								variant={category === "Laptops" ? "default" : "outline"}
								className={
									category === "Laptops" ? "bg-red-500 hover:bg-red-600" : ""
								}
							>
								{category}
							</Button>
						))}
					</div>
				</section>

				<ProductShowcase title="" products={allProducts} showViewAll={true} />

				<TestimonialSection testimonials={testimonials} />

				{/* Devices of The Future */}
				<section className="mb-16">
					<h2 className="text-3xl font-semibold text-center mb-12">
						Devices of The Future
					</h2>
					<div className="grid grid-cols-2 md:grid-cols-6 gap-4">
						{[...Array(6)].map((_, index) => (
							<div
								key={index}
								className="aspect-square bg-gray-100 rounded-lg overflow-hidden"
							>
								<div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
							</div>
						))}
					</div>
				</section>

				<ServiceHighlights />
			</div>
		</div>
	);
}
