"use client";
import Image from "next/image";

const brands = [
    { name: "ASUS", logo: "/AsusLogo.png" },
    { name: "MSI", logo: "/MsiLogo.png" },
    { name: "Razer", logo: "/RazerLogo.png" },
    { name: "Apple", logo: "/MacLogos.png" },
    { name: "Samsung", logo: "/SamsungLogo.png" },
    { name: "Dell", logo: "/DellLogos.png" },
];

// Duplicate the brands array for seamless looping
const scrollingBrands = [...brands, ...brands];

export function BrandStrip() {
    return (
        <section className="bg-black w-full h-[100px] flex items-center justify-center overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="relative w-full overflow-hidden">
                    <div
                        className="flex items-center gap-8 animate-scroll-x"
                        style={{
                            width: "max-content",
                            animation: "scroll-x 18s linear infinite",
                        }}
                    >
                        {scrollingBrands.map((brand, idx) => (
                            <div
                                key={brand.name + idx}
                                className="flex items-center justify-center p-2 rounded-lg w-[180px] h-[80px]"
                            >
                                <Image
                                    src={brand.logo}
                                    alt={brand.name}
                                    width={120}
                                    height={40}
                                    className="object-contain w-full h-full"
                                />
                            </div>
                        ))}
                    </div>
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