import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import brands from "@/data/brands";
import categories from "@/data/categories";
// import { Checkbox } from "@radix-ui/react-checkbox";
import { Link } from "lucide-react";

export default function ProductSidebar({
	isLoading,
	isActive,
	category,
	brand,
	handleInputChange,
}: {
	isLoading: boolean;
	isActive: boolean;
	category: string;
	brand: string;
	handleInputChange: (field: string, value: string | boolean) => void;
}) {
	return (
		<div className="space-y-6">
			{/* Product Status */}
			<Card>
				<CardHeader>
					<CardTitle>Product Status</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center space-x-2">
						<Checkbox
							id="isActive"
							checked={isActive}
							onCheckedChange={(checked) =>
								handleInputChange("isActive", checked as boolean)
							}
						/>
						<Label htmlFor="isActive">Active</Label>
					</div>
					{/* <div className="flex items-center space-x-2">
							<Checkbox
								id="isFeatured"
								checked={formData.isFeatured}
								onCheckedChange={(checked) =>
									handleInputChange("isFeatured", checked as boolean)
								}
							/>
							<Label htmlFor="isFeatured">Featured Product</Label>
						</div> */}

					<div className="space-y-2">
						<Label htmlFor="category">Category</Label>
						<Select
							value={category}
							onValueChange={(value) => handleInputChange("category", value)}
						>
							<SelectTrigger>
								<SelectValue placeholder="Select category" />
							</SelectTrigger>
							<SelectContent>
								{categories.map((category) => (
									<SelectItem key={category} value={category}>
										{category}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className="space-y-2">
						<Label htmlFor="brand">Brand</Label>
						<Select
							value={brand}
							onValueChange={(value) => handleInputChange("brand", value)}
						>
							<SelectTrigger>
								<SelectValue placeholder="Select brand" />
							</SelectTrigger>
							<SelectContent>
								{brands.map((brand) => (
									<SelectItem key={brand} value={brand}>
										{brand}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					{/* <div className="space-y-2">
							<Label htmlFor="tags">Tags</Label>
							<Input
								id="tags"
								value={formData.tags}
								onChange={(e) => handleInputChange("tags", e.target.value)}
								placeholder="gaming, laptop, rgb (comma separated)"
							/>
						</div> */}
				</CardContent>
			</Card>

			{/* Product Organization */}
			<Card>
				<CardHeader>
					<CardTitle>Product Organization</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4"></CardContent>
			</Card>

			{/* Actions */}
			<Card>
				<CardContent className="pt-6">
					<div className="space-y-3">
						<Button
							type="submit"
							className="w-full bg-red-500 hover:bg-red-600"
							disabled={isLoading}
						>
							{isLoading ? "Updating..." : "Update Product"}
						</Button>
						<Button type="button" variant="outline" className="w-full" asChild>
							<Link href="/admin/products">Cancel</Link>
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
