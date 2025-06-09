import Image from "next/image";
import { Button } from "../ui/button";

export function ClawBanner() {
	return (
		<section className="relative w-full sm:h-[250px] lg:h-[300px] rounded-xl overflow-hidden">
			{/* Background image */}
			<div className="w-full">
				<Image
					src="/Claw.png"
					alt="Claw AI Grip and Game"
					fill
					className="object-cover"
					priority
				/>
			</div>

			{/* Overlay content */}
			<div className="absolute inset-0  flex flex-col justify-center  text-white px-4">
				<h2 className="text-3xl sm:text-4xl font-bold mb-2">CLAW & AI</h2>
				<p className="text-lg sm:text-xl mb-4">GRIP AND GAME</p>
				<Button className="bg-white text-black hover:bg-gray-100 w-[100px] ">
					Shop Now
				</Button>
			</div>
		</section>
	);
}
