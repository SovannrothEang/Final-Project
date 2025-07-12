// import ProductDetail from "@/components/products/ProductDetail";
// import Link from "next/link";
// import products from "@/data/products"; // Import the products data
// import { notFound } from "next/navigation"; // Import notFound for 404 handling

// export default async function ProductPage({
// 	params,
// }: {
// 	params: Promise<{ id: string }>; // Change params type to access id directly
// }) {
// 	// Find the product in the products array based on the id from the URL
// 	const { id } = await params;
// 	const product = products.find((p) => p.id === id);

// 	// If the product is not found, return a 404 page
// 	if (!product) {
// 		notFound();
// 	}

// 	return (
// 		<div className="bg-white">
// 			<div className="container mx-auto px-4 py-8">
// 				{/* Breadcrumb */}
// 				<div className="text-sm text-gray-500 mb-8">
// 					<Link href="/" className="hover:text-gray-800">
// 						Home
// 					</Link>
// 					<span className="mx-2">/</span>
// 					<Link href="/products" className="hover:text-gray-800">
// 						Products
// 					</Link>
// 					<span className="mx-2">/</span>
// 					{/* Use the fetched product's id and name for the breadcrumb link */}
// 					<Link href={`/products/${product.id}`}>{product.name}</Link>
// 				</div>
// 				{/* Pass the fetched product to the ProductDetail component */}
// 				<ProductDetail product={product} />
// 			</div>
// 		</div>
// 	);
// }




// app/products/[id]/page.tsx
'use client';

import { use } from 'react';
import ProductDetail from "@/components/products/ProductDetail";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useProductById } from "@/services/productService";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Unwrap the params promise
  const { id } = use(params);
  const productId = parseInt(id);
  if (isNaN(productId)) notFound();

  const { data, isLoading, error } = useProductById(productId);

  if (isLoading) return <div>Loading...</div>;
  if (error || !data?.success) notFound();

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
          <span className="text-gray-800">{data.data.name}</span>
        </div>
        
        <ProductDetail product={data.data} />
      </div>
    </div>
  );
}