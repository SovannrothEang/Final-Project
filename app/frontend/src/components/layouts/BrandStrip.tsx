import Image from "next/image";

const brands = [
	{ name: "ASUS", logo: "/placeholder.svg?height=40&width=120" },
	{ name: "MSI", logo: "/placeholder.svg?height=40&width=120" },
	{ name: "Razer", logo: "/placeholder.svg?height=40&width=120" },
	{ name: "Apple", logo: "/placeholder.svg?height=40&width=120" },
	{ name: "Samsung", logo: "/placeholder.svg?height=40&width=120" },
	{ name: "Dell", logo: "/placeholder.svg?height=40&width=120" },
];

export function BrandStrip() {
	return (
		<section className="bg-black py-8 mb-16">
			<div className="container mx-auto px-4">
				<div className="flex items-center justify-between opacity-60">
					{brands.map((brand) => (
						<div key={brand.name} className="flex items-center justify-center">
							<Image
								src={brand.logo || "/placeholder.svg"}
								alt={brand.name}
								width={120}
								height={40}
								className="object-contain filter brightness-0 invert"
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
