"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Package, Settings } from "lucide-react";

const navigation = [
	{ name: "Dashboard", href: "/admin", icon: LayoutDashboard },
	{ name: "Products", href: "/admin/products", icon: Package },
	{ name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
	const pathname = usePathname();

	return (
		<aside className="w-48 bg-white border-r border-gray-200 min-h-screen">
			<nav className="p-4 space-y-2">
				{navigation.map((item) => {
					const isActive = pathname === item.href;
					return (
						<Link
							key={item.name}
							href={item.href}
							className={cn(
								"flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
								isActive
									? "bg-red-50 text-red-700 border-r-2 border-red-500"
									: "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
							)}
						>
							<item.icon className="w-5 h-5" />
							{item.name}
						</Link>
					);
				})}
			</nav>
		</aside>
	);
}
