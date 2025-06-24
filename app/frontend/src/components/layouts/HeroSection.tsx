"use client";
import { useState } from "react";
import { useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Asuspic from "../../assets/asus.png";
import Razerpic from "../../assets/razer.webp";
import Acerpic from "../../assets/acer.png";
import Msipic from "../../assets/msi.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faXTwitter,
	faFacebookF,
	faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const slides = [
	{
		bg: "bg-[linear-gradient(to_right,_#ADB0B0,_#E1E1E1)]",
		image: Asuspic,
		alt: "Gaming Laptop",
	},
	{
		bg: "bg-[linear-gradient(to_right,_#F4A764,_#FFDEC2)]",
		image: Razerpic,
		alt: "Workstation Laptop",
	},
	{
		bg: "bg-[linear-gradient(to_right,_#30A357,_#75E39A)]",
		image: Acerpic,
		alt: "Workstation Laptop",
	},
	{
		bg: "bg-[linear-gradient(to_right,_#F24F4F,_#FFA895)]",
		image: Msipic,
		alt: "Workstation Laptop",
	},
];

export function HeroSection() {
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrent((prev) => (prev + 1) % slides.length);
		}, 5000);
		return () => clearInterval(interval);
	}, []);

	const handlePrev = () =>
		setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
	const handleNext = () => setCurrent((prev) => (prev + 1) % slides.length);

	return (
		<section
			className="text-white w-full"
			style={{
				backgroundImage: "linear-gradient(to right, #ADB0B0, #E1E1E1)",
			}}
		>
			<div
				className={`container mx-auto ${slides[current].bg} transition-colors duration-700`}
			>
				<div className="grid lg:grid-cols-2 items-center">
					<div className="w-full flex flex-col items-start pt-16 pl-18">
						<h1 className="text-6xl font-bold mb-4 ">
							Exquisite Computers
							<br />
							<span className="text-4xl">Choose Performance,</span>
							<span className="text-4xl text-black"> Choose Us</span>
						</h1>
						<p className="text-xl text-black mb-1 mt-8 max-w-lg font-semibold">
							Discover the Perfect System for Every Task and
						</p>
						<p className="text-xl text-black mb-2 mt-2 max-w-lg font-semibold">
							Elevate Your Digital Experience with Timeless
						</p>
						<p className="text-xl text-black mb-10 mt-1 max-w-lg font-semibold">
							Design and Precision Engineering - Computer
						</p>
						<div className="mb-10 max-h-12">
							<Button
								className="bg-white font-bold text-lg px-8 py-6 hover:shadow-xl shadow-neutral-100 cursor-pointer 
                                text-black rounded-2xl border-b-6 border-r-6 -translate-1 hover:border-0 hover:translate-0 hover:bg-neutral-700 hover:text-white"
							>
								Shop Now
							</Button>
						</div>

						{/* Social Links */}
						<div className="flex gap-4 mb-4 ml-3">
							<div className="w-8 h-8 ring-2 rounded-full flex items-center justify-center cursor-pointer hover:text-black transition-colors">
								<FontAwesomeIcon icon={faFacebookF} className="w-4 h-4" />
							</div>
							<div className="w-8 h-8 ring-2 rounded-full flex items-center justify-center cursor-pointer hover:text-black transition-colors">
								<FontAwesomeIcon icon={faXTwitter} className="w-4 h-4" />
							</div>
							<div className="w-8 h-8 ring-2 rounded-full flex items-center justify-center cursor-pointer hover:text-black transition-colors">
								<FontAwesomeIcon icon={faYoutube} className="w-4 h-4" />
							</div>
						</div>
					</div>

					<div className="relative w-full min-h-[400px] sm:min-h-[500px] lg:min-h-[670px] flex items-center justify-center">
						<div className="w-full h-[220px] sm:h-[300px] md:h-[350px] lg:h-[400px] flex items-center justify-center">
							<Image
								src={slides[current].image}
								alt={slides[current].alt}
								width={600}
								height={400}
								className="object-contain w-auto h-full max-h-full max-w-full"
								priority
							/>
						</div>
						{/* Navigation arrows */}
						<Button
							variant="ghost"
							size="sm"
							onClick={handlePrev}
							className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 ring-2  rounded-full flex items-center justify-center cursor-pointer hover:text-black transition-colors hover:bg-transparent"
						>
							<ChevronLeft
								className="w-2 h-2"
								style={{ width: "32px", height: "32px" }}
							/>
						</Button>
						<Button
							variant="ghost"
							size="sm"
							onClick={handleNext}
							className="mr-10 absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 ring-2  rounded-full flex items-center justify-center cursor-pointer hover:text-black transition-colors hover:bg-transparent"
						>
							<ChevronRight
								className="w-4 h-4"
								style={{ width: "32px", height: "32px" }}
							/>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
