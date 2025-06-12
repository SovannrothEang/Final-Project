"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error("Application error:", error);
	}, [error]);

	return (
		<div className="bg-white">
			<div className="container mx-auto px-4 py-8">
				{/* Breadcrumb */}
				<div className="text-sm text-gray-500 mb-8">
					<Link href="/" className="hover:text-gray-800">
						Home
					</Link>
					<span className="mx-2">/</span>
					<span>Error</span>
				</div>

				{/* Error Content */}
				<div className="text-center py-20">
					<div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
						<AlertTriangle className="w-12 h-12 text-red-500" />
					</div>

					<h1 className="text-4xl font-bold text-gray-900 mb-4">
						Oops! Something went wrong
					</h1>
					<p className="text-lg text-gray-600 mb-2">
						We encountered an unexpected error.
					</p>
					<p className="text-sm text-gray-500 mb-8">
						{error.message ||
							"Please try again or contact support if the problem persists."}
					</p>

					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button
							onClick={reset}
							className="bg-red-500 hover:bg-red-600 flex items-center gap-2"
						>
							<RefreshCw className="w-4 h-4" />
							Try Again
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

					{/* Error Details (only in development) */}
					{process.env.NODE_ENV === "development" && (
						<details className="mt-8 text-left max-w-2xl mx-auto">
							<summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
								Error Details (Development Only)
							</summary>
							<pre className="mt-4 p-4 bg-gray-100 rounded-md text-xs overflow-auto">
								{error.stack}
							</pre>
						</details>
					)}
				</div>
			</div>
		</div>
	);
}
