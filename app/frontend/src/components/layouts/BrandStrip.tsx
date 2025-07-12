// "use client";
// import Image from "next/image";

// const brands = [
//     { name: "ASUS", logo: "/AsusLogo.png" },
//     { name: "MSI", logo: "/MsiLogo.png" },
//     { name: "Razer", logo: "/RazerLogo.png" },
//     { name: "Apple", logo: "/MacLogos.png" },
//     { name: "Samsung", logo: "/SamsungLogo.png" },
//     { name: "Dell", logo: "/DellLogos.png" },
// ];

// // Duplicate the brands array for seamless looping
// const scrollingBrands = [...brands, ...brands];

// export function BrandStrip() {
//     return (
//         <section className="bg-black w-full h-[100px] flex items-center justify-center overflow-hidden">
//             <div className="container mx-auto px-4">
//                 <div className="relative w-full overflow-hidden">
//                     <div
//                         className="flex items-center gap-8 animate-scroll-x"
//                         style={{
//                             width: "max-content",
//                             animation: "scroll-x 18s linear infinite",
//                         }}
//                     >
//                         {scrollingBrands.map((brand, idx) => (
//                             <div
//                                 key={brand.name + idx}
//                                 className="flex items-center justify-center p-2 rounded-lg w-[180px] h-[80px]"
//                             >
//                                 <Image
//                                     src={brand.logo}
//                                     alt={brand.name}
//                                     width={120}
//                                     height={40}
//                                     className="object-contain w-full h-full"
//                                 />
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//             <style jsx global>{`
//                 @keyframes scroll-x {
//                     0% {
//                         transform: translateX(0);
//                     }
//                     100% {
//                         transform: translateX(-50%);
//                     }
//                 }
//                 .animate-scroll-x {
//                     will-change: transform;
//                 }
//             `}</style>
//         </section>
//     );
// }



// -------------------------------------------------------------------


"use client";
import Image from "next/image";
import { useBrandStrip } from "@/services/brandService";
import { useEffect, useState } from "react";
import { BrandStripItem } from "@/types/brands";

export function BrandStrip() {
  const { data, isLoading, error } = useBrandStrip();
  const [displayBrands, setDisplayBrands] = useState<BrandStripItem[]>([]);
  const [apiError, setApiError] = useState<string | null>(null);

  // Local fallback brands
  const localBrands: BrandStripItem[] = [
    { id: 1, name: "ASUS", logo: "/AsusLogo.png" },
    { id: 2, name: "MSI", logo: "/MsiLogo.png" },
    { id: 3, name: "Razer", logo: "/RazerLogo.png" },
    { id: 4, name: "Apple", logo: "/MacLogos.png" },
    { id: 5, name: "Samsung", logo: "/SamsungLogo.png" },
    { id: 6, name: "Dell", logo: "/DellLogos.png" },
  ];

  useEffect(() => {
    if (error) {
      console.error("API Error:", error);
      setApiError(error.message || "Failed to load brands");
      setDisplayBrands(localBrands);
    } else if (data?.data?.length) {
      setDisplayBrands(
        data.data.map((brand: BrandStripItem) => ({
          id: brand.id,
          name: brand.name,
          logo: brand.logo || '/placeholder-brand.svg'
        }))
      );
    } else {
      setDisplayBrands(localBrands);
    }
  }, [data, error]);

  // Duplicate for seamless scrolling
  const scrollingBrands = [...displayBrands, ...displayBrands];

  return (
    <section className="bg-black w-full h-[100px] flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="relative w-full overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center h-[80px] text-white">
              Loading brands...
            </div>
          ) : apiError ? (
            <div className="flex items-center justify-center h-[80px] text-yellow-500">
              Using local brands ({apiError})
            </div>
          ) : (
            <div
              className="flex items-center gap-8 animate-scroll-x"
              style={{
                width: "max-content",
                animation: "scroll-x 18s linear infinite",
              }}
            >
              {scrollingBrands.map((brand, idx) => (
                <div
                  key={`${brand.id}-${idx}`}
                  className="flex items-center justify-center p-2 rounded-lg w-[180px] h-[80px] bg-gray-900"
                >
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={120}
                    height={40}
                    className="object-contain w-full h-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder-brand.svg';
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <style jsx global>{`
        @keyframes scroll-x {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll-x {
          will-change: transform;
        }
      `}</style>
    </section>
  );
}