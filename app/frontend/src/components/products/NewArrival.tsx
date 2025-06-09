const products = [
	{
		name: "Razer Blade 16",
		desc: "Unleash the Night. Power in Every Pulse.",
		img: "/Razer.png",
	},
	{
		name: "Speakers",
		desc: "Hear the Distinction.",
		img: "/Speaker.png",
	},
	{
		name: "Monitor",
		desc: "TUF Monitor",
		img: "/Monitor.png",
	},
	{
		name: "Keyboard",
		desc: "A note of luxury.",
		img: "/KeyBoard.png",
	},
	{
		name: "Head Phone",
		desc: "Hear the Intensity.",
		img: "/HeadPhone.png",
	},
	{
		name: "PlayStation 5",
		desc: "Black and White version of the PS5 coming out on sale",
		img: "/PlayStation.png",
	},
	{
		name: "PC",
		desc: "Bold Performance. Timeless Design.",
		img: "/PC.png",
	},
];

type NewArrivalProps = {
	title: string;
};

export function NewArrival({ title }: NewArrivalProps) {
	return (
		<section className="h-[660px] w-full mt-3">
			<div className="mb-8">
				<div className="flex items-center gap-2 mb-2">
					<div className="w-4 h-10 bg-black rounded"></div>
					<span className="font-bold text-2xl">{title}</span>
				</div>
			</div>

			<div
				className="grid grid-rows-3 grid-cols-7 gap-6 h-full pt-3"
				style={{ height: "calc(100% - 80px)" }}
			>
				{/* Left tall box */}
				<div className="row-span-3 col-span-3 rounded-xl shadow-lg overflow-hidden">
					<ProductCard product={products[0]} />
				</div>

				{/* Row 1 small boxes */}
				{[1, 2, 3, 4].map((i) => (
					<div
						key={products[i].name}
						className="row-span-1 col-span-1 rounded-xl shadow-lg overflow-hidden"
					>
						<ProductCard product={products[i]} isSmall />
					</div>
				))}

				{/* Middle tall box */}
				<div className="row-span-2 col-span-2 rounded-xl shadow-lg overflow-hidden">
					<ProductCard product={products[5]} />
				</div>

				{/* Right tall box */}
				<div className="row-span-2 col-span-2 rounded-xl shadow-lg overflow-hidden">
					<ProductCard product={products[6]} />
				</div>
			</div>
		</section>
	);
}

function ProductCard({
	product,
	isSmall = false,
}: {
	product: (typeof products)[number];
	isSmall?: boolean;
}) {
	return (
		<div
			className="h-full w-full bg-black bg-contain bg-no-repeat bg-center relative text-white"
			style={{ backgroundImage: `url(${product.img})` }}
		>
			{/* Optional dark overlay for readability */}
			<div className="absolute inset-0 bg-black opacity-30" />

			{/* Content */}
			<div className="relative z-10 h-full p-4 flex flex-col justify-end">
				<h3 className={`${isSmall ? "text-lg" : "text-2xl"} font-bold`}>
					{product.name}
				</h3>
				<p className={`pt-1 ${isSmall ? "text-xs" : "text-sm"} text-whtie`}>
					{product.desc}
				</p>
				<button
					className={`underline font-semibold pt-2 mt-2 text-left text-white ${
						isSmall ? "text-sm" : "text-base"
					} hover:text-gray-300`}
				>
					Shop Now
				</button>
			</div>
		</div>
	);
}
