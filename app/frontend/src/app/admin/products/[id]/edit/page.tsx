import EditProduct from "@/components/pages/products/edit/EditPage";
import { Button } from "@/components/ui/button";
import products from "@/data/products";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditProductPage({
	params,
}: {
	params: { id: string };
}) {
	const product = products.find((p) => p.id === params.id);

	if (!product) {
		notFound();
	}

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center gap-4">
				<Button variant="ghost" size="icon" asChild>
					<Link href="/admin">
						<ArrowLeft className="w-4 h-4" />
					</Link>
				</Button>
				<div>
					<h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
					<p className="text-gray-600">Update product information</p>
				</div>
			</div>

			<EditProduct product={product} />
		</div>
	);
}
