import Image from "next/image";
import { Button } from "@/components/ui/button";

const products = [
	{
		title: "MSI Cyborg A15 & A17 AI",
		description: "Find the perfect gift with our exclusive PCs& tech deals.",
		image: "/TopSell1.png",
	},
	{
		title: "Dell 16 Plus",
		description: "Find the perfect gift with our exclusive PCs& tech deals.",
		image: "/TopSell2.png",
	},
	{
		title: "Asus ROG Strix Scar 16 & 18",
		description: "Find the perfect gift with our exclusive PCs& tech deals.",
		image: "/TopSell3.png",
	},
	{
		title: "Lenovo LOQ Gaming Series",
		description: "Find the perfect gift with our exclusive PCs& tech deals.",
		image: "/TopSell4.png",
	},
];

export default function TopSellingSection() {
	return (
		<section className="w-[1450px] space-y-4 py-4">
			<h2 className="text-2xl font-bold mb-8 flex items-center">
				<div className="w-4 h-10 bg-black rounded mr-2"></div>
				Top Selling
			</h2>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-3">
				{products.map((product, index) => (
					<div
						key={index}
						className="rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
					>
						<div className="relative w-full h-60">
							<Image
								src={product.image}
								alt={product.title}
								fill
								className="object-cover"
							/>
						</div>
						<div className="px-4 py-8">
							<h3 className="text-lg font-semibold mb-2">{product.title}</h3>
							<p className="text-gray-500 text-sm mb-4">
								{product.description}
							</p>
							<Button
								variant="default"
								className="rounded-full px-5 py-2 text-sm"
							>
								Shop Now
							</Button>
						</div>
					</div>
				))}
			</div>

			<div className="relative w-full h-[180px] sm:h-[250px] lg:h-[300px] rounded-xl overflow-hidden">
				<Image
					src="/Intel.jpg"
					alt="Claw AI Grip and Game"
					fill
					className="object-cover"
				/>
			</div>
		</section>
	);
}
