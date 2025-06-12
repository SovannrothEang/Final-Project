import { Button } from "@/components/ui/button";
import { Server, Home, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function Custom500() {
	return (
		<div className="bg-white">
			<div className="container mx-auto px-4 py-8">
				{/* Breadcrumb */}
				<div className="text-sm text-gray-500 mb-8">
					<Link href="/" className="hover:text-gray-800">
						Home
					</Link>
					<span className="mx-2">/</span>
					<span>500 Error</span>
				</div>

				{/* 500 Content */}
				<div className="text-center py-20">
					<div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
						<Server className="w-12 h-12 text-red-500" />
					</div>

					<h1 className="text-6xl font-bold text-gray-900 mb-4">500</h1>
					<h2 className="text-2xl font-semibold text-gray-800 mb-4">
						Internal Server Error
					</h2>
					<p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
						We&apos;re experiencing some technical difficulties. Our team has
						been notified and is working to fix this issue.
					</p>

					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button
							onClick={() => window.location.reload()}
							className="bg-red-500 hover:bg-red-600 flex items-center gap-2"
						>
							<RefreshCw className="w-4 h-4" />
							Refresh Page
						</Button>
						<Button
							variant="outline"
							asChild
							className="flex items-center gap-2"
						>
							<Link href="/">
								<Home className="w-4 h-4" />
								Go Home
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
