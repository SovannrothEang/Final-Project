import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function HeroSection() {
	return (
		<section className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-16 mb-16">
			<div className="container mx-auto px-4">
				<div className="grid lg:grid-cols-2 gap-12 items-center">
					<div>
						<h1 className="text-5xl font-bold mb-4">
							Exquisite Computers
							<br />
							<span className="text-gray-300">
								Choose Performance, Choose Us
							</span>
						</h1>
						<p className="text-lg text-gray-300 mb-8 max-w-md">
							Discover the Perfect System for Every Task and Elevate Your
							Digital Experience with Timeless Design and Precision Engineering
							– computer
						</p>
						<Button className="bg-white text-black hover:bg-gray-100 px-8 py-3">
							Shop Now
						</Button>

						{/* Social Links */}
						<div className="flex gap-4 mt-8">
							<div className="w-10 h-10 border border-gray-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-white hover:text-black transition-colors">
								f
							</div>
							<div className="w-10 h-10 border border-gray-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-white hover:text-black transition-colors">
								t
							</div>
							<div className="w-10 h-10 border border-gray-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-white hover:text-black transition-colors">
								ig
							</div>
						</div>
					</div>

					<div className="relative">
						<Image
							src="/placeholder.svg?height=400&width=600"
							alt="Gaming Laptop"
							width={600}
							height={400}
							className="object-contain"
						/>

						{/* Navigation arrows */}
						<Button
							variant="outline"
							size="sm"
							className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 p-0 bg-white/10 border-white/20 text-white hover:bg-white hover:text-black"
						>
							<ChevronLeft className="w-4 h-4" />
						</Button>
						<Button
							variant="outline"
							size="sm"
							className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 p-0 bg-white/10 border-white/20 text-white hover:bg-white hover:text-black"
						>
							<ChevronRight className="w-4 h-4" />
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
