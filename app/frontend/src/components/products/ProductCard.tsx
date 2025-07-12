// import Image from "next/image";
// import Link from "next/link";
// import { Card, CardContent } from "@/components/ui/card";
// import { Star } from "lucide-react";

// interface ProductCardProps {
// 	id: string;
// 	name: string;
// 	price: number;
// 	originalPrice?: number;
// 	rating: number;
// 	reviews: number;
// 	images: string;
// 	discount?: number;
// 	isNew?: boolean;
// 	size?: "small" | "medium" | "large";
// }

// export function ProductCard({
// 	id,
// 	name,
// 	price,
// 	originalPrice,
// 	rating,
// 	reviews,
// 	images,
// }: // discount,
// // isNew,
// // size = "medium",
// ProductCardProps) {
// 	const renderStars = (rating: number) => {
// 		return Array.from({ length: 5 }, (_, i) => (
// 			<Star
// 				key={i}
// 				className={`w-4 h-4 ${
// 					i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
// 				}`}
// 			/>
// 		));
// 	};

// 	return (
// 		<Card className="group relative overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
// 			<Link href={`/products/${id}`}>
// 				<CardContent className="p-0">
// 					{/* Product Image */}
// 					<div className="relative bg-gray-100 aspect-[4/3] overflow-hidden">
// 						{/* Discount */}
// 						{/* {discount && (
// 							<div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded z-10">
// 								-{discount}%
// 							</div>
// 						)} */}

// 						{/* New Item */}
// 						{/* {isNew && (
// 							<div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs rounded z-10">
// 								NEW
// 							</div>
// 						)} */}

// 						<Image
// 							src={images || "/placeholder.svg"}
// 							alt={name}
// 							fill
// 							className="object-contain group-hover:scale-105 transition-transform duration-300"
// 						/>
// 					</div>

// 					{/* Product Info */}
// 					<div className="p-4">
// 						<h3 className="font-medium text-sm mb-2 line-clamp-2">{name}</h3>

// 						<div className="flex items-center gap-2 mb-2">
// 							<span className="text-red-500 font-semibold">${price}</span>
// 							{originalPrice && (
// 								<span className="text-gray-500 line-through text-sm">
// 									${originalPrice}
// 								</span>
// 							)}
// 						</div>

// 						<div className="flex items-center gap-2">
// 							<div className="flex">{renderStars(rating)}</div>
// 							<span className="text-gray-500 text-sm">({reviews})</span>
// 						</div>
// 					</div>
// 				</CardContent>
// 			</Link>
// 		</Card>
// 	);
// }



// import Image from "next/image";
// import Link from "next/link";
// import { Card, CardContent } from "@/components/ui/card";
// import { Star } from "lucide-react";
// import { Product } from "@/types/product";

// interface ProductCardProps {
//   product: Product;
// }

// export function ProductCard({ product }: ProductCardProps) {
//   const renderStars = (rating: number) => {
//     return Array.from({ length: 5 }, (_, i) => (
//       <Star
//         key={i}
//         className={`w-4 h-4 ${
//           i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
//         }`}
//       />
//     ));
//   };

//   return (
//     <Card className="group relative overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
//       <Link href={`/products/${product.id}`}>
//         <CardContent className="p-0">
//           {/* Product Image */}
//           <div className="relative bg-gray-100 aspect-[4/3] overflow-hidden">
//             {product.discount > 0 && (
//               <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded z-10">
//                 -{product.discount}%
//               </div>
//             )}
//             {product.is_new && (
//               <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 text-xs rounded z-10">
//                 NEW
//               </div>
//             )}
//             <Image
//               src={product.image || "/placeholder.svg"}
//               alt={product.name}
//               fill
//               className="object-contain group-hover:scale-105 transition-transform duration-300"
//             />
//           </div>

//           {/* Product Info */}
//           <div className="p-4">
//             <h3 className="font-medium text-sm mb-2 line-clamp-2">{product.name}</h3>
//             <p className="text-xs text-gray-500 mb-2">{product.brand.name}</p>
            
//             <div className="flex items-center gap-2 mb-2">
//               <span className="text-red-500 font-semibold">${product.price}</span>
//               {product.discount > 0 && (
//                 <span className="text-gray-500 line-through text-sm">
//                   ${(product.price / (1 - product.discount/100)).toFixed(2)}
//                 </span>
//               )}
//             </div>

//             <div className="flex items-center gap-2">
//               <div className="flex">{renderStars(product.rating)}</div>
//               <span className="text-gray-500 text-sm">({product.reviews})</span>
//             </div>
//           </div>
//         </CardContent>
//       </Link>
//     </Card>
//   );
// }




import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const renderStars = (rating: number = 0) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <Card className="group relative overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/products/${product.id}`}>
        <CardContent className="p-0">
          {/* Product Image */}
          <div className="relative bg-gray-100 aspect-[4/3] overflow-hidden">
            {/* {product.discount && product.discount > 0 && (
              <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded z-10">
                - {product.discount}%
              </div>
            )} */}

			{product.discount > 0 && (
				<div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded z-10">
					- {product.discount}%
				</div>
			)}
            {product.is_new && (
              <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 text-xs rounded z-10">
                NEW
              </div>
            )}
            <Image
              src={product.image || "/placeholder.svg"}
            //   alt={product.name}
              alt=''
              fill
              className="object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Product Info */}
          <div className="p-4">
            <h3 className="font-medium text-sm mb-2 line-clamp-2">{product.name}</h3>
            {product.brand?.name && (
              <p className="text-xs text-gray-500 mb-2">{product.brand.name}</p>
            )}
            
            <div className="flex items-center gap-2 mb-2">
              {product.price && (
                <>
                  <span className="text-red-500 font-semibold">${(product.price * (1 - product.discount/100)).toFixed(2)}</span>
                  {(product.discount > 0) && (
                    <span className="text-gray-500 line-through text-sm">
                      ${product.price}
                    </span>
                  )}
                </>
              )}
            </div>

            {(product.rating || product.reviews) && (
              <div className="flex items-center gap-2">
                <div className="flex">{renderStars(product.rating)}</div>
                {product.reviews && (
                  <span className="text-gray-500 text-sm">({product.reviews})</span>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}