import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

export default function ProductPricing({
	price,
	handleInputChange,
}: {
	price: number;
	handleInputChange: (field: string, value: string | boolean) => void;
}) {
	return (
		<>
			{/* Pricing */}
			<Card>
				<CardHeader>
					<CardTitle>Pricing</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="price">Price *</Label>
							<Input
								id="price"
								type="number"
								step="0.01"
								value={price}
								onChange={(e) => handleInputChange("price", e.target.value)}
								placeholder="0.00"
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="comparePrice">Compare at Price</Label>
							<Input
								id="comparePrice"
								type="number"
								step="0.01"
								value={price}
								onChange={(e) =>
									handleInputChange("comparePrice", e.target.value)
								}
								placeholder="0.00"
							/>
						</div>
					</div>
				</CardContent>
			</Card>
		</>
	);
}
