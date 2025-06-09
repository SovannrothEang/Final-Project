"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
	images: {
		src: string;
		alt: string;
	}[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
	const [selectedImage, setSelectedImage] = useState(0);

	return (
		<div className="grid gap-4">
			{/* Thumbnails */}
			<div className="flex gap-4">
				{images.map((image, index) => (
					<div
						key={index}
						className={cn(
							"cursor-pointer overflow-hidden rounded-lg border-2 aspect-square w-16 relative",
							selectedImage === index
								? "border-red-500"
								: "border-transparent hover:border-gray-300"
						)}
						onClick={() => setSelectedImage(index)}
					>
						<Image
							src={image.src || "/placeholder.svg"}
							alt={image.alt}
							fill
							sizes=""
							className="object-cover"
						/>
					</div>
				))}
			</div>

			{/* Main Image */}
			<div className="aspect-[4/3] overflow-hidden rounded-lg bg-gray-100 relative">
				<Image
					src={images[selectedImage].src || "/placeholder.svg"}
					alt={images[selectedImage].alt}
					fill
					className="object-contain"
				/>
			</div>
		</div>
	);
}
