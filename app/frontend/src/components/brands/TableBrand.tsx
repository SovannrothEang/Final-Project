// import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
// import { Button } from "../ui/button";
// import {
// 	DropdownMenu,
// 	DropdownMenuContent,
// 	DropdownMenuItem,
// 	DropdownMenuTrigger,
// } from "../ui/dropdown-menu";
// import {
// 	Table,
// 	TableHeader,
// 	TableRow,
// 	TableHead,
// 	TableBody,
// 	TableCell,
// } from "../ui/table";
// import { Brand } from "@/types/brands";
// import Image from "next/image";
// import { Badge } from "../ui/badge";

// export default function TableBrand({
// 	brands,
// 	handleEditBrand,
// 	handleDeleteBrand,
// }: {
// 	brands: Brand[];
// 	handleEditBrand: (brand: Brand) => void;
// 	handleDeleteBrand: (brandId: number) => void;
// }) {
// 	return (
// 		<Table>
// 			<TableHeader>
// 				<TableRow>
// 					<TableHead>Brand</TableHead>
// 					<TableHead>Description</TableHead>
// 					<TableHead>Country</TableHead>
// 					<TableHead>Products</TableHead>
// 					<TableHead>Status</TableHead>
// 					<TableHead>Website</TableHead>
// 					<TableHead className="text-right">Actions</TableHead>
// 				</TableRow>
// 			</TableHeader>
// 			<TableBody>
// 				{brands && brands.length > 0 ? (
// 					brands.map((brand) => (
// 						<TableRow key={brand.id}>
// 							<TableCell className="font-medium">
// 								<div className="flex items-center space-x-3">
// 									{brand.logo && (
// 										<Image
// 											src={brand.logo || "/placeholder.svg"}
// 											alt={brand.name}
// 											className="w-10 h-10 rounded-md object-cover"
// 										/>
// 									)}
// 									<span>{brand.name}</span>
// 								</div>
// 							</TableCell>
// 							<TableCell className="max-w-xs truncate">
// 								{brand.description}
// 							</TableCell>
// 							<TableCell>{brand.country}</TableCell>
// 							<TableCell>
// 								<Badge variant="outline">{brand.products_count} products</Badge>
// 							</TableCell>
// 							<TableCell>
// 								<Badge variant={brand.is_active ? "default" : "secondary"}>
// 									{brand.is_active ? "Active" : "Not active"}
// 								</Badge>
// 							</TableCell>
// 							<TableCell>
// 								<a
// 									href={`https://${brand.website_url}`}
// 									target="_blank"
// 									rel="noopener noreferrer"
// 									className="text-blue-600 hover:underline"
// 								>
// 									{brand.website_url}
// 								</a>
// 							</TableCell>
// 							<TableCell className="text-right">
// 								<DropdownMenu>
// 									<DropdownMenuTrigger asChild>
// 										<Button variant="ghost" className="h-8 w-8 p-0">
// 											<MoreHorizontal className="h-4 w-4" />
// 										</Button>
// 									</DropdownMenuTrigger>
// 									<DropdownMenuContent align="end">
// 										<DropdownMenuItem onClick={() => handleEditBrand(brand)}>
// 											<Edit className="mr-2 h-4 w-4" />
// 											Edit
// 										</DropdownMenuItem>
// 										<DropdownMenuItem
// 											className="text-red-600"
// 											onClick={() => handleDeleteBrand(brand.id)}
// 										>
// 											<Trash2 className="mr-2 h-4 w-4" />
// 											Delete
// 										</DropdownMenuItem>
// 									</DropdownMenuContent>
// 								</DropdownMenu>
// 							</TableCell>
// 						</TableRow>
// 					))
// 				) : (
// 					<TableRow>
// 						<TableCell>&quot;No Brands&quot;</TableCell>
// 					</TableRow>
// 				)}
// 			</TableBody>
// 		</Table>
// 	);
// }

"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash2, ExternalLink } from "lucide-react";
import type { Brand } from "@/types/brands";
import Image from "next/image";

interface TableBrandProps {
	brands: Brand[];
	handleEditBrand: (brand: Brand) => void;
	handleDeleteBrand: (brandId: number) => void;
}

export default function TableBrand({
	brands,
	handleEditBrand,
	handleDeleteBrand,
}: TableBrandProps) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Brand</TableHead>
					<TableHead>Description</TableHead>
					<TableHead>Country</TableHead>
					<TableHead>Website</TableHead>
					<TableHead>Products</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Created</TableHead>
					<TableHead className="text-right">Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{brands && brands.length > 0 ? (
					brands.map((brand) => (
						<TableRow key={brand.id}>
							<TableCell className="font-medium">
								<div className="relative flex items-center space-x-4">
									<div className="relative w-[60px] h-[60px] flex items-center space-x-3">
										<Image
											src={brand.logo ? brand.logo : "/placeholder.svg"}
											alt={brand.name}
											fill
											sizes="60px"
											className="object-contain"
										/>
									</div>
									<div>
										<div className="font-medium">{brand.name}</div>
									</div>
								</div>
							</TableCell>
							<TableCell className="max-w-xs truncate">
								{brand.description || "No description"}
							</TableCell>
							<TableCell>
								<Badge variant="outline">{brand.country}</Badge>
							</TableCell>
							<TableCell>
								{brand.website_url ? (
									<a
										href={brand.website_url}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center text-blue-600 hover:text-blue-800"
									>
										<ExternalLink className="w-3 h-3 mr-1" />
										Visit
									</a>
								) : (
									<span className="text-gray-400">No website</span>
								)}
							</TableCell>
							<TableCell>
								<Badge variant="outline">
									{brand.products_count || 0} products
								</Badge>
							</TableCell>
							<TableCell>
								<Badge
									variant={brand.is_active === 1 ? "default" : "secondary"}
								>
									{brand.is_active === 1 ? "Active" : "Inactive"}
								</Badge>
							</TableCell>
							<TableCell>
								{new Date(brand.created_at).toLocaleDateString()}
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
						<TableCell colSpan={8} className="text-center py-8">
							No brands found.
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
