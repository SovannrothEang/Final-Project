"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error("Global application error:", error);
	}, [error]);

	return (
		<html>
			<body>
				<div className="min-h-screen bg-white flex items-center justify-center px-4">
					<div className="text-center max-w-md">
						<div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
							<AlertTriangle className="w-12 h-12 text-red-500" />
						</div>

						<h1 className="text-3xl font-bold text-gray-900 mb-4">
							Critical Error
						</h1>
						<p className="text-gray-600 mb-6">
							A critical error occurred that prevented the application from
							loading properly.
						</p>

						<Button
							onClick={reset}
							className="bg-red-500 hover:bg-red-600 flex items-center gap-2 mx-auto"
						>
							<RefreshCw className="w-4 h-4" />
							Reload Application
						</Button>

						{/* Error Details (only in development) */}
						{process.env.NODE_ENV === "development" && (
							<details className="mt-8 text-left">
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
			</body>
		</html>
	);
}
