"use client";

import { ChevronDown, Moon, Search, ShoppingCart, User } from "lucide-react";
import { Input } from "../ui/input";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
	const [isDiscount] = useState(false);
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
						<Link href="/contact" className="hover:underline">
							Contact
						</Link>
						<Link href="/about" className="hover:underline">
							About
						</Link>
						<Link href="/login" className="hover:underline">
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
						{/* Cart Icon */}
						<Button variant="ghost" size="sm" className="p-2" asChild>
							<Link href="/cart">
								<ShoppingCart className="w-5 h-5" />
							</Link>
						</Button>

						{/* User Account Dropdown */}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="sm" className="p-2">
									<User className="w-5 h-5" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-56">
								<DropdownMenuItem asChild>
									<Link href="/profile">Manage My Account</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>My Order</DropdownMenuItem>
								<DropdownMenuItem>My Reviews</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									Logout
									{/* <Link href="/logout">Logout</Link> */}
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>

						{/* Theme Toggle */}
						<Button variant="ghost" size="sm" className="p-2">
							<Moon className="w-5 h-5" />
						</Button>
					</div>
				</div>
			</header>
		</>
	);
}
