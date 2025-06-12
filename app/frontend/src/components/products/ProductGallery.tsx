import Image from "next/image";

export function ProductGallery({ images }: { images: string }) {
	return (
		<div className="grid gap-4 gap-x-10">
			{/* Main Image */}
			<div className="aspect-square overflow-hidden rounded-lg bg-gray-100 relative">
				<Image
					src={images || "/placeholder.svg"}
					alt="product image"
					fill
					className="object-contain"
				/>
			</div>

			{/* Thumbnails */}
			<div className="flex gap-4">
				{/* {images.map((image, index) => (
					<div
						key={index}
						className={cn(
							"cursor-pointer overflow-hidden rounded-lg border-2 aspect-square w-21 relative", // Increased size here
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
							className="object-cover"
						/>
					</div>
				))} */}
			</div>

			{/* Main Image takes remaining space */}
			<div className="flex-1 aspect-[4/3] overflow-hidden rounded-lg bg-gray-100 relative">
				<Image
					src={images || "/placeholder.svg"}
					alt={"laptop photo"}
					fill
					className="object-contain"
				/>
			</div>
		</div>
	);
}
