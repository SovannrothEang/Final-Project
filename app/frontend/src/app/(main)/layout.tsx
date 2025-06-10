import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";

const inter = Inter({ subsets: ["latin"] });

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
		<html lang="en">
			<body className={`${inter.className} antialiased`}>
				{/* Header */}
				<Header />
				<main className="min-h-screen">{children}</main>
				{/* Footer */}
				<Footer />
			</body>
		</html>
	);
}
