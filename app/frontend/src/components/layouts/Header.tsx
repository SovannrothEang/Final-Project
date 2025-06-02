"use client";

import { ChevronDown, Search } from "lucide-react";
import { Input } from "../ui/input";
import Link from "next/link";
import { useState } from "react";

export function Header() {
	const [isDiscount] = useState(true);
	return (
		<>
			{isDiscount && (
				<div className="bg-black text-white text-center py-3 text-sm">
					Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
					<span className="underline cursor-pointer">ShopNow</span>
					<div className="absolute right-4 top-3 flex items-center gap-1">
						English <ChevronDown className="w-4 h-4" />
					</div>
				</div>
			)}
			<header className="border-b">
				<div className="container mx-auto px-4 py-4 flex items-center justify-between">
					<div className="text-2xl font-bold">Exclusive</div>

					<nav className="hidden md:flex items-center space-x-8">
						<Link href="/" className="hover:underline">
							Home
						</Link>
						<Link href="#" className="hover:underline">
							Contact
						</Link>
						<Link href="/about" className="hover:underline">
							About
						</Link>
						<Link href="/login" className="hover:underline">
							Log in
						</Link>
						<Link href="#" className="hover:underline">
							Sign Up
						</Link>
					</nav>

					<div className="flex items-center gap-4">
						<div className="relative">
							<Input
								placeholder="What are you looking for?"
								className="w-64 pr-10"
							/>
							<Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
						</div>
					</div>
				</div>
			</header>
		</>
	);
}
