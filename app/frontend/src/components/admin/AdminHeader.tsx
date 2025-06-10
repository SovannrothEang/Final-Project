"use client";

import { Bell, User, LogOut, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export function AdminHeader() {
	return (
		<header className="bg-white border-b border-gray-200 px-6 py-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4">
					<Link href="/admin" className="text-xl font-bold text-gray-900">
						Exclusive Admin
					</Link>
				</div>

				<div className="flex items-center gap-4">
					{/* Notifications */}
					<Button variant="ghost" size="icon" className="relative">
						<Bell className="w-5 h-5" />
						<span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
					</Button>

					{/* User Menu */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="flex items-center gap-2">
								<User className="w-5 h-5" />
								<span>Admin</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem>Profile Settings</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem asChild>
								<Link href="/">
									<Home className="w-4 h-4 mr-2" />
									Back to Store
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<LogOut className="w-4 h-4 mr-2" />
								Logout
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	);
}
