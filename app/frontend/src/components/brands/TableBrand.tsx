import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from "../ui/table";
import { Brand } from "@/types/brands";
import Image from "next/image";
import { Badge } from "../ui/badge";

export default function TableBrand({
	brands,
	handleEditBrand,
	handleDeleteBrand,
}: {
	brands: Brand[];
	handleEditBrand: (brand: Brand) => void;
	handleDeleteBrand: (brandId: number) => void;
}) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Brand</TableHead>
					<TableHead>Description</TableHead>
					<TableHead>Country</TableHead>
					<TableHead>Products</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Website</TableHead>
					<TableHead className="text-right">Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{brands && brands.length > 0 ? (
					brands.map((brand) => (
						<TableRow key={brand.id}>
							<TableCell className="font-medium">
								<div className="flex items-center space-x-3">
									{brand.logo && (
										<Image
											src={brand.logo || "/placeholder.svg"}
											alt={brand.name}
											className="w-10 h-10 rounded-md object-cover"
										/>
									)}
									<span>{brand.name}</span>
								</div>
							</TableCell>
							<TableCell className="max-w-xs truncate">
								{brand.description}
							</TableCell>
							<TableCell>{brand.country}</TableCell>
							<TableCell>
								<Badge variant="outline">{brand.products_count} products</Badge>
							</TableCell>
							<TableCell>
								<Badge variant={brand.is_active ? "default" : "secondary"}>
									{brand.is_active ? "Active" : "Not active"}
								</Badge>
							</TableCell>
							<TableCell>
								<a
									href={`https://${brand.website_url}`}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-600 hover:underline"
								>
									{brand.website_url}
								</a>
							</TableCell>
							<TableCell className="text-right">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="ghost" className="h-8 w-8 p-0">
											<MoreHorizontal className="h-4 w-4" />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuItem onClick={() => handleEditBrand(brand)}>
											<Edit className="mr-2 h-4 w-4" />
											Edit
										</DropdownMenuItem>
										<DropdownMenuItem
											className="text-red-600"
											onClick={() => handleDeleteBrand(brand.id)}
										>
											<Trash2 className="mr-2 h-4 w-4" />
											Delete
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</TableCell>
						</TableRow>
					))
				) : (
					<TableRow>
						<TableCell>&quot;No Brands&quot;</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
