import ProductDetail from "@/components/products/ProductDetail";
import Link from "next/link";

// Sample product data
const product = {
	id: "g92",
	name: "Havic HV G-92 Gamepad",
	price: 192.0,
	rating: 4,
	reviews: 150,
	description:
		"PlayStation 5 Controller Skin High-quality vinyl skin with air-channel adhesive for easy bubble-free install & mess-free removal. Pressure-sensitive.",
	colors: ["red", "white"],
	sizes: ["XS", "S", "M", "L", "XL"],
	images: [
		{
			src: "/placeholder.svg?height=400&width=400",
			alt: "Havic HV G-92 Gamepad - Front View",
		},
		{
			src: "/placeholder.svg?height=400&width=400",
			alt: "Havic HV G-92 Gamepad - Side View",
		},
		{
			src: "/placeholder.svg?height=400&width=400",
			alt: "Havic HV G-92 Gamepad - Back View",
		},
		{
			src: "/placeholder.svg?height=400&width=400",
			alt: "Havic HV G-92 Gamepad - Top View",
		},
	],
};

export default async function ProductPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	return (
		<div className="bg-white">
			<div className="container mx-auto px-4 py-8">
				{/* Breadcrumb */}
				<div className="text-sm text-gray-500 mb-8">
					<Link href="/" className="hover:text-gray-800">
						Home
					</Link>
					<span className="mx-2">/</span>
					<Link href="/products" className="hover:text-gray-800">
						Products
					</Link>
					<span className="mx-2">/</span>
					<Link href={`/products/${id}`}>{product.name}</Link>
				</div>
				<ProductDetail product={product} />
			</div>
		</div>
	);
}
