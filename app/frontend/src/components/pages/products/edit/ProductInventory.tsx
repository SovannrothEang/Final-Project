import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// import { Checkbox } from "@radix-ui/react-checkbox";
import { Label } from "@radix-ui/react-label";

export default function ProductInventory({
	sku,
	handleInputChange,
}: {
	sku: string;
	handleInputChange: (field: string, value: string | boolean) => void;
}) {
	return (
		<>
			{/* Inventory */}
			<Card>
				<CardHeader>
					<CardTitle>Inventory</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="sku">SKU</Label>
						<Input
							id="sku"
							value={sku}
							onChange={(e) => handleInputChange("sku", e.target.value)}
							placeholder="Enter SKU"
						/>
					</div>

					{/* <div className="flex items-center space-x-2">
						<Checkbox
							id="trackQuantity"
							checked={formData.trackQuantity}
							onCheckedChange={(checked) =>
								handleInputChange("trackQuantity", checked as boolean)
							}
						/>
						<Label htmlFor="trackQuantity">Track quantity</Label>
					</div> */}

					{/* {formData.trackQuantity && (
						<div className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="stock">Quantity</Label>
								<Input
									id="stock"
									type="number"
									value={formData.stock}
									onChange={(e) => handleInputChange("stock", e.target.value)}
									placeholder="0"
								/>
							</div>
						</div>
					)} */}
				</CardContent>
			</Card>
		</>
	);
}
