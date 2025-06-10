import { Loader2 } from "lucide-react";

export default function Loading() {
	return (
		<div className="bg-white">
			<div className="container mx-auto px-4 py-8">
				<div className="flex items-center justify-center py-20">
					<div className="text-center">
						<Loader2 className="w-12 h-12 animate-spin text-red-500 mx-auto mb-4" />
						<h2 className="text-xl font-semibold text-gray-900 mb-2">
							Loading...
						</h2>
						<p className="text-gray-600">
							Please wait while we load your content.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
