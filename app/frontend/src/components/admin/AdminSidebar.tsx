
// "use client";

// import { usePathname } from "next/navigation";
// import Link from "next/link";
// import { cn } from "@/lib/utils";
// import {
// 	LayoutDashboard,
// 	Package,
// 	Settings,
// 	User,
// 	ChevronDown,
// 	Store,
// } from "lucide-react";
// import {
// 	DropdownMenu,
// 	DropdownMenuContent,
// 	DropdownMenuItem,
// 	DropdownMenuSeparator,
// 	DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";
// import LogoutButton from "./LogoutButton";

// const navigation = [
// 	{ name: "Dashboard", href: "/admin", icon: LayoutDashboard },
// 	{ name: "Products", href: "/admin/products", icon: Package },
// 	{ name: "Categories", href: "/admin/categories", icon: Package },
// 	{ name: "Brands", href: "/admin/brands", icon: Package },
// 	{ name: "Settings", href: "/admin/settings", icon: Settings },
// ];

// export function AdminSidebar() {
// 	const pathname = usePathname();

// 	return (
// 		<aside className="w-64 bg-gray-900 text-white max-h-screen overflow-y-auto position-fixed left-0 flex flex-col">
// 			{/* Logo Section */}
// 			<div className="p-6 border-b border-gray-700">
// 				<Link href="/admin" className="flex items-center gap-3">
// 					<div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
// 						<Store className="w-6 h-6 text-white" />
// 					</div>
// 					<div>
// 						<h1 className="text-xl font-bold text-white">Exclusive</h1>
// 						<p className="text-sm text-gray-400">Admin Panel</p>
// 					</div>
// 				</Link>
// 			</div>

// 			{/* Navigation Menu */}
// 			<nav className="flex-1 p-4">
// 				<div className="space-y-2">
// 					<p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
// 						Main Menu
// 					</p>
// 					{navigation.map((item) => {
// 						const isActive = pathname === item.href;
// 						return (
// 							<Link
// 								key={item.name}
// 								href={item.href}
// 								className={cn(
// 									"flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
// 									isActive
// 										? "bg-red-600 text-white shadow-lg"
// 										: "text-gray-300 hover:text-white hover:bg-gray-800"
// 								)}
// 							>
// 								<item.icon className="w-5 h-5" />
// 								{item.name}
// 							</Link>
// 						);
// 					})}
// 				</div>
// 			</nav>

// 			{/* User Profile Section */}
// 			<div className="p-4 border-t border-gray-700">
// 				<DropdownMenu>
// 					<DropdownMenuTrigger asChild>
// 						<Button
// 							variant="ghost"
// 							className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 text-left justify-start"
// 						>
// 							<div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
// 								<User className="w-5 h-5 text-white" />
// 							</div>
// 							<div className="flex-1 text-left">
// 								<p className="text-sm font-medium text-white">John Doe</p>
// 								<p className="text-xs text-gray-400">Administrator</p>
// 							</div>
// 							<ChevronDown className="w-4 h-4 text-gray-400" />
// 						</Button>
// 					</DropdownMenuTrigger>
// 					<DropdownMenuContent align="end" className="w-56 mb-2">
// 						<DropdownMenuItem>
// 							<User className="w-4 h-4 mr-2" />
// 							Profile Settings
// 						</DropdownMenuItem>
// 						<DropdownMenuSeparator />
// 						<DropdownMenuItem asChild>
// 							<Link href="/">
// 								<Store className="w-4 h-4 mr-2" />
// 								Back to Store
// 							</Link>
// 						</DropdownMenuItem>
// 						<DropdownMenuItem className="p-0">
// 							<LogoutButton />
// 						</DropdownMenuItem>
// 					</DropdownMenuContent>
// 				</DropdownMenu>
// 			</div>
// 		</aside>
// 	);
// }


"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  Settings,
  User,
  ChevronDown,
  Store,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import LogoutButton from "./LogoutButton";
import useUserFetch from "@/utils/user-fetching";

// Interfaces
interface User {
  id: number;
  name: string;
  email: string;
}

interface UserResponse {
  success: boolean;
  data: {
    user: User;
    token_abilities: string[];
    token_expires_at: string;
  };
}

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Categories", href: "/admin/categories", icon: Package },
  { name: "Brands", href: "/admin/brands", icon: Package },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { data, error, isLoading } = useUserFetch<UserResponse>("auth/user");
  const user = data?.data?.user;

  return (
    <aside className="w-64 bg-gray-900 text-white max-h-screen overflow-y-auto flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
            <Store className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Exclusive</h1>
            <p className="text-sm text-gray-400">Admin Panel</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Main Menu
          </p>
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-red-600 text-white shadow-lg"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-700">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 text-left justify-start"
            >
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 text-left">
                {isLoading ? (
                  <>
                    <p className="text-sm font-medium text-white">Loading...</p>
                    <p className="text-xs text-gray-400">Fetching user data</p>
                  </>
                ) : error || !user ? (
                  <>
                    <p className="text-sm font-medium text-white">Guest</p>
                    <p className="text-xs text-gray-400">Not authenticated</p>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-medium text-white">{user.name}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </>
                )}
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mb-2">
            <DropdownMenuItem asChild>
              <Link href="/admin/settings">
				<User className="w-4 h-4 mr-2" />
              		Settings
			  </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/">
                <Store className="w-4 h-4 mr-2" />
                Back to Store
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-0">
              <LogoutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}
