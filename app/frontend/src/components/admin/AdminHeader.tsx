"use client";

import { User, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export function AdminHeader() {
	return (
		<header className="border-b sticky z-50 top-0 bg-gray-50/75 backdrop-blur-sm">
			<div className="flex items-center justify-between container mx-auto px-4 py-4">
				<div className="flex items-center gap-4">
					<Link href="/admin" className="text-2xl font-bold flex items-center">
						Exclusive Admin
					</Link>
				</div>

				<div className="flex items-center gap-4">
					{/* Notifications */}
					{/* <Button
						variant="ghost"
						size="icon"
						className="relative ring-1 ring-slate-200 shadow-border"
					>
						<Bell className="w-5 h-5" />
						<span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
					</Button> */}

					{/* User Menu */}
					<DropdownMenu>
						<div className="px-1 py-2">
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" className="flex items-center gap-2">
									<User className="w-6 h-6" />
									<span className="text-lg">Admin</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="space-y-2">
								<DropdownMenuItem>Profile Settings</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem asChild>
									<Link href="/">
										<Home className="w-4 h-4 mr-2" />
										Back to Store
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem className="p-0">
									<LogoutButton />
								</DropdownMenuItem>
							</DropdownMenuContent>
						</div>
					</DropdownMenu>
				</div>
			</div>
		</header>
	);
}
