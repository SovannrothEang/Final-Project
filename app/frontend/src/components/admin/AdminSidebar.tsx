"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
	LayoutDashboard,
	Package,
	ShoppingCart,
	Users,
	BarChart3,
	Settings,
	Tag,
	Truck,
} from "lucide-react";

const navigation = [
	{ name: "Dashboard", href: "/admin", icon: LayoutDashboard },
	{ name: "Products", href: "/admin/products", icon: Package },
	{ name: "Orders", href: "/admin/orders", icon: ShoppingCart },
	{ name: "Customers", href: "/admin/customers", icon: Users },
	{ name: "Categories", href: "/admin/categories", icon: Tag },
	{ name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
	{ name: "Shipping", href: "/admin/shipping", icon: Truck },
	{ name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
	const pathname = usePathname();

	return (
		<aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
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
