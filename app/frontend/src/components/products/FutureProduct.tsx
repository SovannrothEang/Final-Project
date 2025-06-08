import Image from "next/image";
import { Truck, Headphones, Shield } from "lucide-react";

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

const deviceImages = [
	"/Future1.png",
	"/Future2.png",
	"/Future3.png",
	"/Future4.png",
	"/Future5.png",
	"/Future6.png",
];

export function FutureProduct() {
	return (
		<>
			<section className="mb-16">
				<h2 className="text-3xl font-semibold text-center mb-12">
					Devices of The Future
				</h2>
				<div className="grid grid-cols-2 md:grid-cols-6 gap-4">
					{deviceImages.map((imgSrc, index) => (
						<div
							key={index}
							className="aspect-square bg-gray-100 rounded-lg overflow-hidden"
						>
						 <Image
                                src={imgSrc}
                                alt={`Future device ${index + 1}`}
                                width={300}
                                height={300}
                                className="w-full h-full object-cover"
                            />
						</div>
					))}
				</div>
			</section>

			<section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
				{services.map((service, index) => (
					<div key={index} className="text-center">
						<div className="w-20 h-20 mx-auto mb-4 bg-black rounded-full flex items-center justify-center">
							<div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
								<service.icon className="w-6 h-6 text-black" />
							</div>
						</div>
						<h3 className="font-semibold mb-2">{service.title}</h3>
						<p className="text-sm text-gray-600">{service.description}</p>
					</div>
				))}
			</section>
		</>
	);
}
