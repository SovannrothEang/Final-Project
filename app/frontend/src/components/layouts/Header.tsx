"use client";

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function Header() {
	const [isDiscount] = useState(false);
	const router = useRouter();
	const [searchQuery, setSearchQuery] = useState("");

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchQuery.trim()) {
			router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
		}
	};

	return (
		<>
			{isDiscount && (
				<div className="bg-black text-white text-center py-3 text-sm">
					Sign Up and get 15% off for your first order.{" "}
					<span className="underline cursor-pointer">Sign Up Now</span>
				</div>
			)}
			<header className="border-b sticky z-50 top-0 bg-gray-50/75 backdrop-blur-sm">
				<div className="container mx-auto px-4 py-4 grid grid-cols-2 md:grid-cols-3">
					<div className="text-2xl font-bold flex items-center">
						<span className="animate-bounce-up">
							<Link href="/">Exclusive</Link>
						</span>
					</div>
					<div className="flex items-center justify-center md:px-4">
						<div className="relative w-full rounded-full border border-gray-400">
							<form onSubmit={handleSearch} className="relative">
								<Input
									placeholder="What are you looking for?"
									className="w-full text-xs sm:text-base rounded-full border border-gray-400"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
								/>
								<button
									type="submit"
									className="absolute right-3 top-1/2 transform -translate-y-1/2"
								>
									<Search className="absolute hidden sm:block right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
								</button>
							</form>
						</div>
						{/* Theme Toggle
						<Button variant="ghost" size="sm" className="p-2">
							<Moon className="w-5 h-5" />
						</Button> */}
					</div>
					<nav className="hidden md:flex justify-end">
						<div className="w-[75%] hidden md:flex items-center justify-end gap-3 md:*:px-2">
							<Link href="/" className="hover:underline">
								Home
							</Link>
							<Link href="/contact" className="hover:underline">
								Contact
							</Link>
							<Link href="/about" className="hover:underline">
								About
							</Link>
						</div>
					</nav>
				</div>
			</header>
			<style jsx global>{`
    			@keyframes bounce-up {
    			    0%, 100% {
    			        transform: translateY(0);
    			    }
    			    20% {
    			        transform: translateY(-18px);
    			    }
    			    40% {
    			        transform: translateY(0);
    			    }
    			    60% {
    			        transform: translateY(-10px);
    			    }
    			    80% {
    			        transform: translateY(0);
    			    }
    			}
    			.animate-bounce-up {
    			    display: inline-block;
    			    animation: bounce-up 1.6s infinite;
    			}
			`}</style>
		</>
	);
}
