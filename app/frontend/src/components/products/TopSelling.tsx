// import Image from "next/image";
// import { Button } from "@/components/ui/button";

// const products = [
//     {
//         title: "MSI Cyborg A15 & A17 AI",
//         description: "Find the perfect gift with our exclusive PCs& tech deals.",
//         image: "/TopSell1.png",
//     },
//     {
//         title: "Dell 16 Plus",
//         description: "Find the perfect gift with our exclusive PCs& tech deals.",
//         image: "/TopSell2.png",
//     },
//     {
//         title: "Asus ROG Strix Scar 16 & 18",
//         description: "Find the perfect gift with our exclusive PCs& tech deals.",
//         image: "/TopSell3.png",
//     },
//     {
//         title: "Lenovo LOQ Gaming Series",
//         description: "Find the perfect gift with our exclusive PCs& tech deals.",
//         image: "/TopSell4.png",
//     },
// ];

// export default function TopSellingSection() {
//     return (
//         <section className="space-y-4 mb-12">
//             <h2 className="text-2xl font-bold mb-8 flex items-center">
//                 <div className="w-4 h-10 bg-black rounded mr-2"></div>
//                 Top Selling
//             </h2>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-3">
//                 {products.map((product, index) => (
//                     <div
//                         key={index}
//                         className={`
//                             rounded-xl border border-gray-200 shadow-sm
//                             hover:shadow-2xl hover:scale-105 active:scale-95
//                             transition-transform duration-300
//                             overflow-hidden group
//                         `}
//                         tabIndex={0}
//                     >
//                         <div className="relative w-full h-60">
//                             <Image
//                                 src={product.image}
//                                 alt={product.title}
//                                 fill
//                                 className="object-cover group-hover:scale-110 transition-transform duration-300"
//                             />
//                             <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
//                         </div>
//                         <div className="px-4 py-8">
//                             <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
//                             <p className="text-gray-500 text-sm mb-4">
//                                 {product.description}
//                             </p>
//                             <Button
//                                 variant="default"
//                                 className="rounded-full px-5 py-2 text-sm hover:bg-black hover:text-white active:bg-gray-800 transition-colors duration-200"
//                             >
//                                 Shop Now
//                             </Button>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             <div className="relative w-full h-[180px] sm:h-[250px] lg:h-[300px] rounded-xl overflow-hidden mt-8 group">
//                 <Image
//                     src="/Intel.jpg"
//                     alt="Claw AI Grip and Game"
//                     fill
//                     className="object-cover group-hover:scale-105 transition-transform duration-300"
//                 />
//                 <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
//             </div>
//         </section>
//     );
// }



// --------------------------------------------------------------------------------------------



import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useTopSelling } from "@/services/productService";
import { Product } from "@/types/product";

export default function TopSellingSection() {
    const { data: productsResponse, isLoading, error } = useTopSelling();
    const products: Product[] = productsResponse?.data || [];

    if (isLoading) return <div>Loading top selling products...</div>;
    if (error) return <div>Error loading top selling products</div>;

    return (
        <section className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold mb-8 flex items-center">
                <div className="w-4 h-10 bg-black rounded mr-2"></div>
                Top Selling
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-3">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className={`
                            rounded-xl border border-gray-200 shadow-sm
                            hover:shadow-2xl hover:scale-105 active:scale-95
                            transition-transform duration-300
                            overflow-hidden group
                        `}
                        tabIndex={0}
                    >
                        <div className="relative w-full h-60">
                            {product.discount > 0 && (
                                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded z-10">
                                    -{product.discount}%
                                </div>
                            )}
                            <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                        </div>
                        <div className="px-4 py-8">
                            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                            <p className="text-gray-500 text-sm mb-4">
                                {product.short_description || product.description?.substring(0, 60) + '...'}
                            </p>
                            <Button
                                variant="default"
                                className="rounded-full px-5 py-2 text-sm hover:bg-black hover:text-white active:bg-gray-800 transition-colors duration-200"
                            >
                                Shop Now
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="relative w-full h-[180px] sm:h-[250px] lg:h-[300px] rounded-xl overflow-hidden mt-8 group">
                <Image
                    src="/Intel.jpg"
                    alt="Claw AI Grip and Game"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            </div>
        </section>
    );
}