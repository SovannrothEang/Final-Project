import { HeroSection } from "@/components/layouts/HeroSection";
import { BrandStrip } from "@/components/layouts/BrandStrip";
import { AllProduct } from "@/components/products/AllProduct";
import { TestimonialSection } from "@/components/products/TestimonialSection";
import { FutureProduct } from "@/components/products/FutureProduct";
import { NewArrival } from '@/components/products/NewArrival';
import TopSellingSection from "@/components/products/TopSelling";
import { ClawBanner } from "@/components/products/ClawBanner";


// Sample data
const allProducts = [
	{
		id: "9",
		name: "Gaming Headset Pro",
		price: 756.65,
		rating: 5,
		reviews: 65,
		image: "/pcDemo.jpg",
		discount: 35,
	},
	{
		id: "10",
		name: "Gaming Headset Pro",
		price: 756.65,
		rating: 5,
		reviews: 65,
		image: "/pcDemo.jpg",
		discount: 35,
	},
	{
		id: "11",
		name: "Gaming Headset Pro",
		price: 756.65,
		rating: 5,
		reviews: 65,
		image: "/pcDemo.jpg",
		discount: 35,
	},
	{
		id: "12",
		name: "Gaming Headset Pro",
		price: 756.65,
		rating: 5,
		reviews: 65,
		image: "/pcDemo.jpg",
		discount: 35,
	},
	{
		id: "13",
		name: "Gaming Headset Pro",
		price: 756.65,
		rating: 5,
		reviews: 65,
		image: "/pcDemo.jpg",
		discount: 35,
	},
	{
		id: "14",
		name: "Gaming Headset Pro",
		price: 756.65,
		rating: 5,
		reviews: 65,
		image: "/pcDemo.jpg",
		discount: 35,
	},
	{
		id: "15",
		name: "Gaming Headset Pro",
		price: 756.65,
		rating: 5,
		reviews: 65,
		image: "/pcDemo.jpg",
		discount: 35,
	},
	{
		id: "16",
		name: "Gaming Headset Pro",
		price: 756.65,
		rating: 5,
		reviews: 65,
		image: "/pcDemo.jpg",
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
		review: "The support team was super helpful. They guided me through the options and helped me pick the best build for my budget.",
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
		<div className="">
			<HeroSection />
			<BrandStrip />

			<div className="container mx-auto px-8 pt-10">
				{/* <ProductShowcase
					title="New Arrivals"
					products={newArrivals}
					showNavigation={true}
				/> */}
				<NewArrival title="New Arrivals" />
				<TopSellingSection/>
				<AllProduct
			
					title="All Products"
					products={allProducts}
					
				/>
					
				

				{/* Gaming Banner */}
				<ClawBanner/>
				

				{/* <ProductShowcase title="" products={allProducts} showViewAll={true} /> */}

				<TestimonialSection testimonials={testimonials} />

				{/* Devices of The Future */}
				
				<FutureProduct />
			</div>
		</div>
	);
}
