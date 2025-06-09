import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "font-awesome/css/font-awesome.min.css";
import Asuspic from "../../assets/Asus.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faXTwitter,
	faFacebookF,
	faYoutube,
} from "@fortawesome/free-brands-svg-icons";

export function HeroSection() {
	return (
		<>
			<section
				className="text-white w-full"
				style={{
					backgroundImage: "linear-gradient(to right, #ADB0B0, #E1E1E1)",
				}}
			>
				<div className="container mx-auto">
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
							<Button
								className="bg-white font-bold text-xl border-black ring-2
							shadow-2xl text-black rounded-4xl py-7 hover:ring-green-400 hover:shadow-green-600  hover:bg-black px-10 hover:text-white"
							>
								Shop Now
							</Button>

							{/* Social Links */}
							<div className="flex gap-4 p-3">
								<div className="w-12 h-12 ring-2 rounded-full flex items-center justify-center cursor-pointer hover:text-black transition-colors">
									<FontAwesomeIcon icon={faFacebookF} className="w-6 h-6" />
								</div>
								<div className="w-12 h-12 ring-2 rounded-full flex items-center justify-center cursor-pointer hover:text-black transition-colors">
									<FontAwesomeIcon icon={faXTwitter} className="w-6 h-6" />
								</div>
								<div className="w-12 h-12 ring-2 rounded-full flex items-center justify-center cursor-pointer hover:text-black transition-colors">
									<FontAwesomeIcon icon={faYoutube} className="w-6 h-6" />
								</div>
							</div>
						</div>

						<div className="relative w-full">
							<Image
								src={Asuspic}
								alt="Gaming Laptop"
								width={600}
								height={400}
								className="object-contain flex items-center justify-center w-full h-full pr-20"
							/>
							{/* Navigation arrows */}

							<Button
								variant="ghost"
								size="sm"
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
		</>
	);
}
