import Image from "next/image";

const brands = [
	{ name: "ASUS", logo: "/AsusLogo.png" },
	{ name: "MSI", logo: "/MsiLogo.png" },
	{ name: "Razer", logo: "/RazerLogo.png" },
	{ name: "Apple", logo: "/MacLogos.png" },
	{ name: "Samsung", logo: "/SamsungLogo.png" },
	{ name: "Dell", logo: "/DellLogos.png" },
];

export function BrandStrip() {
	return (
		<section className="bg-black w-full h-[100px] flex items-center justify-center">
			<div className="container mx-auto px-4">
				<div className="flex items-center justify-between opacity-60 gap-4">
					{brands.map((brand) => (
						<div
							key={brand.name}
							className="flex items-center justify-center p-2 rounded-lg w-[240px] h-[80px]"
						>
							<Image
								src={brand.logo}
								alt={brand.name}
								width={120}
								height={40}
								className="object-contain w-[100%] h-[100%] "
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
