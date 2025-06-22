import Image from "next/image";

const deviceImages = [
    "/Future1.png",
    "/Future2.png",
    "/Future3.png",
    "/Future4.png",
    "/Future5.png",
    "/Future6.png",
];

export function FutureProduct() {
    return (
        <>
            <section className="mb-16">
                <h2 className="text-3xl font-semibold text-center mb-12">
                    Devices of The Future
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                    {deviceImages.map((imgSrc, index) => (
                        <div
                            key={index}
                            className="aspect-square bg-gray-100 rounded-lg overflow-hidden group transition-shadow duration-300 hover:shadow-2xl hover:ring-4 hover:ring-black"
                        >
                            <Image
                                src={imgSrc}
                                alt={`Future device ${index + 1}`}
                                width={300}
                                height={300}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}