import type React from "react"
import type { Metadata } from "next"
import "@/styles/globals.css"
import { AdminSidebar } from "@/components/admin/AdminSidebar"
import { AdminHeader } from "@/components/admin/AdminHeader"

export const metadata: Metadata = {
	title: "Exclusive Admin - Dashboard",
	description: "Admin dashboard for Exclusive e-commerce platform",
}

export default function AdminLayout({
  	children,
}: {
  	children: React.ReactNode
}) {
	return (
		<div className="flex h-screen bg-gray-50 overflow-hidden">
			{/* Fixed Sidebar */}
			<AdminSidebar />

			{/* Main Content Area */}
			<div className="flex-1 flex flex-col h-screen overflow-hidden">
				{/* Fixed Header */}
				<AdminHeader />

				{/* Scrollable Content */}
				<main className="flex-1 overflow-y-auto">
				<div className="p-6">
					<div className="max-w-7xl mx-auto">{children}</div>
				</div>
				</main>
			</div>
		</div>
	)
}
