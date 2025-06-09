import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFoundPage() {
	return (
		<div className="bg-white">
			<div className="container mx-auto px-4 py-8">
				{/* Breadcrumb */}
				<div className="text-sm text-gray-500 mb-8">
					<Link href="/" className="hover:text-gray-800">
						Home
					</Link>
					<span className="mx-2">/</span>
					<span>404 Error</span>
				</div>

				{/* 404 Content */}
				<div className="text-center py-20">
					<h1 className="text-8xl font-bold text-gray-900 mb-4">
						404 Not Found
					</h1>
					<p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
						Your visited page not found. You may go home page.
					</p>
					<Button asChild className="bg-red-500 hover:bg-red-600 px-8 py-3">
						<Link href="/">Back to home page</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
