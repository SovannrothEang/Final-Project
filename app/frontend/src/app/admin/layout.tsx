import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Exclusive Admin - Dashboard",
	description: "Admin dashboard for Exclusive e-commerce platform",
};

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<div className="min-h-screen bg-gray-50">
					<AdminHeader />
					<div className="flex">
						<AdminSidebar />
						<main className="flex-1 p-6">{children}</main>
					</div>
				</div>
			</body>
		</html>
	);
}
