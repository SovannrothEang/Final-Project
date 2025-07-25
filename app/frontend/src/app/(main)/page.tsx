"use client";
import { HeroSection } from "@/components/layouts/HeroSection";
import { BrandStrip } from "@/components/layouts/BrandStrip";
import { AllProduct } from "@/components/products/AllProduct";
import { FutureProduct } from "@/components/products/FutureProduct";
import { NewArrival } from "@/components/products/NewArrival";
import TopSellingSection from "@/components/products/TopSelling";
import { ClawBanner } from "@/components/products/ClawBanner";

export default function HomePage() {
	return (
		<>
			<div className="animate-fade-in">
				<HeroSection />
				<BrandStrip />

				<div className="container mx-auto px-8 pt-10">
					<div className="animate-slide-in-up">
						<NewArrival title="New Arrivals" />
					</div>

					<div className="animate-slide-in-up">
						<TopSellingSection />
					</div>

					<div className="animate-slide-in-up">
						<AllProduct title="All Products" />
					</div>

					<div className="animate-slide-in-up">
						<ClawBanner />
					</div>

					<div className="animate-slide-in-up">
						<FutureProduct />
					</div>
				</div>
			</div>

			<style jsx global>{`
				@keyframes fade-in {
					0% {
						opacity: 0;
						transform: translateY(40px) scale(0.98);
					}
					100% {
						opacity: 1;
						transform: translateY(0) scale(1);
					}
				}
				.animate-fade-in {
					animation: fade-in 1.2s cubic-bezier(0.22, 1, 0.36, 1);
				}

				@keyframes slide-in-up {
					0% {
						opacity: 0;
						transform: translateY(60px);
					}
					100% {
						opacity: 1;
						transform: translateY(0);
					}
				}
				.animate-slide-in-up {
					animation: slide-in-up 1s cubic-bezier(0.22, 1, 0.36, 1);
				}

				@keyframes pop-in {
					0% {
						opacity: 0;
						transform: scale(0.95);
					}
					100% {
						opacity: 1;
						transform: scale(1);
					}
				}
				.animate-pop-in {
					animation: pop-in 0.7s cubic-bezier(0.22, 1, 0.36, 1);
				}

				.glow-hover:hover {
					box-shadow: 0 0 24px 0 #f87171, 0 0 48px 0 #fbbf24;
					transition: box-shadow 0.3s;
				}
			`}</style>
		</>
	);
}
