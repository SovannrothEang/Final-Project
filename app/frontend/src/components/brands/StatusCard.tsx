import { Award, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Brand } from "@/types/brands";

export default function StatusCard({ brands }: { brands: Brand[] }) {
	return (
		<div className="grid gap-6 md:grid-cols-4">
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Total Brands</CardTitle>
					<Award className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">{brands.length}</div>
					<p className="text-xs text-muted-foreground">+2 from last month</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Active Brands</CardTitle>
					<Star className="h-4 w-4 text-green-600" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">
						{brands && brands.length > 0
							? brands.filter((b) => b.is_active).length
							: 0}
					</div>
					<p className="text-xs text-muted-foreground">Currently selling</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Total Products</CardTitle>
					<Award className="h-4 w-4 text-blue-600" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">
						{brands.length > 0
							? brands.reduce((sum, b) => sum + b.products_count, 0)
							: 0}
						{/* {brands.reduce((b) => )} */}
					</div>
					<p className="text-xs text-muted-foreground">Across all brands</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Top Brand</CardTitle>
					<Star className="h-4 w-4 text-yellow-600" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">
						{brands.length > 0
							? brands.reduce((prev, current) =>
									prev.products_count > current.products_count ? prev : current
							  ).name
							: "N/A"}
					</div>
					<p className="text-xs text-muted-foreground">Most products</p>
				</CardContent>
			</Card>
		</div>
	);
}
