import type { Metadata } from "next";
import "@/styles/globals.css";
import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";

export const metadata: Metadata = {
	title: "Exclusive - Premier Online Shopping",
	description: "South Asia's premier online shopping marketplace",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			{/* Header */}
			<Header />
			<main className="min-h-screen">{children}</main>
			{/* Footer */}
			<Footer />
		</>
	);
}
