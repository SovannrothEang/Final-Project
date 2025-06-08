import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter, faLinkedinIn, faInstagram} from '@fortawesome/free-brands-svg-icons';
import {
	Store,
	DollarSign,
	ShoppingBag,
	Banknote,
	Truck,
	Headphones,
	Shield,
} from "lucide-react";

export default function AboutPage() {
	const stats = [
		{
			icon: Store,
			value: "10.5k",
			label: "Sellers active our site",
			highlighted: false,
		},
		{
			icon: DollarSign,
			value: "33k",
			label: "Monthly Product Sale",
			highlighted: true,
		},
		{
			icon: ShoppingBag,
			value: "45.5k",
			label: "Customer active in our site",
			highlighted: false,
		},
		{
			icon: Banknote,
			value: "25k",
			label: "Annual gross sale in our site",
			highlighted: false,
		},
	];

	const team = [
		{
			name: "Tom Cruise",
			position: "Founder & Chairman",
			image: "/Person1.png",
		},
		{
			name: "Emma Watson",
			position: "Managing Director",
			image: "/Person2.png",
		},
		{
			name: "Will Smith",
			position: "Product Designer",
			image: "/Person3.png",
		},
	];

	const services = [
		{
			icon: Truck,
			title: "FREE AND FAST DELIVERY",
			description: "Free delivery for all orders over $140",
		},
		{
			icon: Headphones,
			title: "24/7 CUSTOMER SERVICE",
			description: "Friendly 24/7 customer support",
		},
		{
			icon: Shield,
			title: "MONEY BACK GUARANTEE",
			description: "We return money within 30 days",
		},
	];

	return (
		<div className="min-h-screen">
			<div className="container mx-auto px-4 py-8">
				{/* Breadcrumb */}
				<div className="text-sm text-gray-500 mb-8 pl-10">
					<Link href="/" className="hover:text-gray-800">
						Home
					</Link>
					<span className="mx-2">/</span>
					<span>Contact</span>
				</div>

			{/* Our Story Section */}
			<section className="grid lg:grid-cols-2 gap-20 items-center mb-20 pl-12">
				<div>
					<h1 className="text-4xl font-semibold mb-6">Our Story</h1>
					<div className="space-y-4 text-gray-600">
						<p>
							Launched in 2015, Exclusive is South Asia&apos;s premier online
							shopping marketplace with an active presence in Bangladesh.
							Supported by wide range of tailored marketing, data and service
							solutions, Exclusive has 10,500 sellers and 300 brands and
							serves 3 millions customers across the region.
						</p>
						<p>
							Exclusive has more than 1 Million products to offer, growing at
							a very fast. Exclusive offers a diverse assortment in categories
							ranging from consumer.
						</p>
					</div>
				</div>

				{/* Full Image in Pink Box */}
				<div className="relative min-h-[400px]">
					<div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-pink-500 rounded-lg overflow-hidden">
						<Image
							src="/About.jpg"
							alt="Two women shopping with bags"
							fill
							className="object-cover"
							priority
						/>
					</div>
				</div>
			</section>

				{/* Statistics Section */}
				<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-15 px-20 mb-20">
					{stats.map((stat, index) => (
						<Card
							key={index}
							className={`text-center p-12 border-2 ${
								stat.highlighted
									? "bg-red-700 hover:bg-red-500 text-white border-red-500"
									: "border-gray-200 hover:border-red-500 hover:bg-red-500 hover:text-white"
							} transition-colors`}
						>
							<CardContent className="p-0">
								<div
									className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
										stat.highlighted ? "bg-white/20" : "bg-black"
									}`}
								>
									<stat.icon
										className={`w-8 h-8 ${
											stat.highlighted ? "text-white" : "text-white"
										}`}
									/>
								</div>
								<div className="text-2xl font-bold mb-2">{stat.value}</div>
								<div className="text-sm">{stat.label}</div>
							</CardContent>
						</Card>
					))}
				</section>

				{/* Team Section */}
				<section className=" px-20 pb-10">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-16">
						{team.map((member, index) => (
							<div key={index} className="text-center">
								<div className="bg-gray-200 mb-4 min-h-[550px] flex items-end justify-center">
									<Image
										src={member.image || "/placeholder.svg"}
										alt={member.name}
										width={250}
										height={300}
										className="object-cover"
									/>
								</div>
								<h3 className="text-xl font-semibold mb-1">{member.name}</h3>
								<p className="text-gray-600 mb-3">{member.position}</p>
								<div className="flex justify-center gap-3">
									<div className="w-6 h-6 bg-white rounded">
										<FontAwesomeIcon
											icon={faXTwitter}
											className="w-6 h-6 text-black"
										/>
									</div>
									<div className="w-6 h-6 bg-white rounded">
										<FontAwesomeIcon
											icon={faInstagram}
											className="w-6 h-6 text-black"
										/>
									</div>
									<div className="w-6 h-6 bg-white rounded">
										<FontAwesomeIcon
											icon={faLinkedinIn}
											className="w-6 h-6 text-black"
										/>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Pagination dots */}
					<div className="flex justify-center gap-2 mt-8">
						{[...Array(5)].map((_, index) => (
							<div
								key={index}
								className={`w-3 h-3 rounded-full ${
									index === 1 ? "bg-red-500" : "bg-gray-300"
								}`}
							/>
						))}
					</div>
				</section>

				{/* Services Section */}
				<section className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-20 pb-10 pt-4">
					{services.map((service, index) => (
						<div key={index} className="text-center">
							<div className="w-20 h-20 mx-auto bg-black rounded-full flex items-center justify-center">
								<div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
									<service.icon className="w-6 h-6 text-black" />
								</div>
							</div>
							<h3 className="font-semibold mb-2 mt-2">{service.title}</h3>
							<p className="text-sm text-gray-600">{service.description}</p>
						</div>
					))}
				</section>
			</div>
		</div>
	);
}
