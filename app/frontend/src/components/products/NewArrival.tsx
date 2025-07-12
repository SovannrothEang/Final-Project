// "use client";
// import { useEffect, useState } from "react";
// const products = [
// 	{
// 		name: "Razer Blade 16",
// 		desc: "Unleash the Night. Power in Every Pulse.",
// 		img: "/Razer.png",
// 	},
// 	{
// 		name: "Speakers",
// 		desc: "Hear the Distinction.",
// 		img: "/Speaker.png",
// 	},
// 	{
// 		name: "Monitor",
// 		desc: "TUF Monitor",
// 		img: "/Monitor.png",
// 	},
// 	{
// 		name: "Keyboard",
// 		desc: "A note of luxury.",
// 		img: "/KeyBoard.png",
// 	},
// 	{
// 		name: "Head Phone",
// 		desc: "Hear the Intensity.",
// 		img: "/HeadPhone.png",
// 	},
// 	{
// 		name: "PlayStation 5",
// 		desc: "Black and White version of the PS5 coming out on sale",
// 		img: "/PlayStation.png",
// 	},
// 	{
// 		name: "PC",
// 		desc: "Bold Performance. Timeless Design.",
// 		img: "/PC.png",
// 	},
// ];

// type NewArrivalProps = {
// 	title: string;
// };

// export function NewArrival({ title }: NewArrivalProps) {
// 	const [time, setTime] = useState<string>("");
	
// 		useEffect(() => {
// 			const update = () => setTime(new Date().toLocaleTimeString());
// 			update();
// 			const interval = setInterval(update, 1000);
// 			return () => clearInterval(interval);
// 		}, []);
	
// 	return (
// 		<section className="h-[1800px] sm:h-[1000px] w-full mb-12 md:h-[1200px] lg:h-[660px]">
// 			<div className="mb-8">
// 				<div className="flex items-center gap-2 mb-2">
// 					<div className="w-4 h-10 bg-black rounded"></div>
// 					<span className="font-bold text-2xl">{title}</span>
// 					<span className="text-2xl text-gray-500 ml-3">{time}</span>
// 				</div>
// 			</div>

// 			<div
// 				className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 auto-rows-fr gap-4 py-4"
// 				style={{ height: "calc(100% - 80px)" }}
// 			>
// 				{/* Left tall feature card */}
// 				<div className="lg:row-span-3 lg:col-span-3 rounded-xl shadow-lg overflow-hidden">
// 					<ProductCard product={products[0]} />
// 				</div>

// 				{/* 4 small boxes */}
// 				{[1, 2, 3, 4].map((i) => (
// 					<div
// 						key={products[i].name}
// 						className="rounded-xl shadow-lg overflow-hidden lg:row-span-1 lg:col-span-1"
// 					>
// 						<ProductCard product={products[i]} isSmall />
// 					</div>
// 				))}

// 				{/* Two medium tall cards */}
// 				<div className="lg:row-span-2 lg:col-span-2 rounded-xl shadow-lg overflow-hidden">
// 					<ProductCard product={products[5]} />
// 				</div>
// 				<div className="lg:row-span-2 lg:col-span-2 rounded-xl shadow-lg overflow-hidden">
// 					<ProductCard product={products[6]} />
// 				</div>
// 			</div>
// 		</section>
// 	);
// }

// function ProductCard({
//     product,
//     isSmall = false,
// }: {
//     product: (typeof products)[number];
//     isSmall?: boolean;
// }) {
//     return (
//         <div
//             className={`
//                 h-full w-full bg-black bg-contain bg-no-repeat bg-center relative text-white
//                 transition-transform duration-300
//                 hover:scale-105 hover:shadow-2xl
//                 active:scale-95
//                 group
//             `}
//             style={{ backgroundImage: `url(${product.img})` }}
//             tabIndex={0} // for keyboard accessibility
//         >
//             {/* Optional dark overlay for readability */}
//             <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-40 group-active:opacity-50 transition-opacity duration-300" />

//             {/* Content */}
//             <div className="relative z-10 h-full p-4 flex flex-col justify-end">
//                 <h3 className={`${isSmall ? "text-lg" : "text-2xl"} font-bold`}>
//                     {product.name}
//                 </h3>
//                 <p className={`pt-1 ${isSmall ? "text-xs" : "text-sm"} text-white`}>
//                     {product.desc}
//                 </p>
//                 <button
//                     className={`underline font-semibold pt-2 mt-2 text-left text-white ${
//                         isSmall ? "text-sm" : "text-base"
//                     } hover:text-gray-300 active:text-green-400 transition-colors duration-200`}
//                 >
//                     Shop Now
//                 </button>
//             </div>
//         </div>
//     );
// }

// --------



"use client";
import { useEffect, useState } from "react";
import { useNewArrivals } from "@/services/productService";
import Link from "next/link";
import { Product } from "@/types/product"; // Import your Product type

interface NewArrivalProps {
  title: string;
}

export function NewArrival({ title }: NewArrivalProps) {
  const [time, setTime] = useState<string>("");
  const { data: productsResponse, isLoading, error } = useNewArrivals();

  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString());
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) return <div>Loading new arrivals...</div>;
  if (error) return <div>Error loading new arrivals</div>;

  const products: Product[] = productsResponse?.data || [];

  return (
    <section className="h-[1800px] sm:h-[1000px] w-full mb-12 md:h-[1200px] lg:h-[660px]">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-4 h-10 bg-black rounded"></div>
          <span className="font-bold text-2xl">{title}</span>
          <span className="text-2xl text-gray-500 ml-3">{time}</span>
        </div>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 auto-rows-fr gap-4 py-4"
        style={{ height: "calc(100% - 80px)" }}
      >
        {/* Left tall feature card */}
        {products[0] && (
          <div className="lg:row-span-3 lg:col-span-3 rounded-xl shadow-lg overflow-hidden">
            <ProductCard product={products[0]} />
          </div>
        )}

        {/* 4 small boxes */}
        {products.slice(1, 5).map((product) => (
          <div
            key={product.id}
            className="rounded-xl shadow-lg overflow-hidden lg:row-span-1 lg:col-span-1"
          >
            <ProductCard product={product} isSmall />
          </div>
        ))}

        {/* Two medium tall cards */}
        {products[5] && (
          <div className="lg:row-span-2 lg:col-span-2 rounded-xl shadow-lg overflow-hidden">
            <ProductCard product={products[5]} />
          </div>
        )}
        {products[6] && (
          <div className="lg:row-span-2 lg:col-span-2 rounded-xl shadow-lg overflow-hidden">
            <ProductCard product={products[6]} />
          </div>
        )}
      </div>
    </section>
  );
}

interface ProductCardProps {
  product: Pick<Product, 'id' | 'name' | 'description' | 'short_description' | 'image'>;
  isSmall?: boolean;
}

function ProductCard({ product, isSmall = false }: ProductCardProps) {
  return (
    <div
      className={`
        h-full w-full bg-black bg-contain bg-no-repeat bg-center relative text-white
        transition-transform duration-300
        hover:scale-105 hover:shadow-2xl
        active:scale-95
        group
      `}
      style={{ backgroundImage: `url(${product.image || '/placeholder.svg'})` }}
      tabIndex={0}
    >
      <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-40 group-active:opacity-50 transition-opacity duration-300" />

      <div className="relative z-10 h-full p-4 flex flex-col justify-end">
        <h3 className={`${isSmall ? "text-lg" : "text-2xl"} font-bold`}>
          {product.name}
        </h3>
        <p className={`pt-1 ${isSmall ? "text-xs" : "text-sm"} text-white`}>
          {product.short_description || product.description?.substring(0, 60) + '...'}
        </p>
        <Link
          href={`/products/${product.id}`}
          className={`underline font-semibold pt-2 mt-2 text-left text-white ${
            isSmall ? "text-sm" : "text-base"
          } hover:text-gray-300 active:text-green-400 transition-colors duration-200`}
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
}