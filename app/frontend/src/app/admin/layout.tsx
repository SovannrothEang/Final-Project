import type React from "react";
import type { Metadata } from "next";
import "@/styles/globals.css";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

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
		<>
			<AdminHeader />
			<div className="flex">
				<AdminSidebar />
				<main className="flex-1 p-4">{children}</main>
			</div>
		</>
	);
}
