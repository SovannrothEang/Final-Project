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

export function ServiceHighlights() {
	return (
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
	);
}
