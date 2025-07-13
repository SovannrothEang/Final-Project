import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "../ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import { Product } from "@/types/product";
import Image from "next/image";
import { Badge } from "../ui/badge";

export default function TableProduct({
	products,
	handleEdit,
	handleDelete,
}: {
	products: Product[];
	handleEdit: (product: Product) => void;
	handleDelete: (id: number) => void;
}) {
	const getStatusBadge = (active: boolean, stock: number) => {
		if (!active) {
			return <Badge variant="outline">Not active</Badge>;
		}
		if (stock === 0) {
			return <Badge variant="destructive">Out of Stock</Badge>;
		}
		if (stock < 10) {
			return <Badge variant="secondary">Low Stock</Badge>;
		}
		return <Badge className="bg-green-500 hover:bg-green-600">In Stock</Badge>;
	};

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>ID</TableHead>
					<TableHead>Product</TableHead>
					<TableHead>Description</TableHead>
					<TableHead>Category</TableHead>
					<TableHead>Brand</TableHead>
					<TableHead>Price</TableHead>
					<TableHead>Stock</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Created</TableHead>
					<TableHead className="text-right">Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{products &&
					products.map((product) => (
						<TableRow key={product.id}>
							<TableCell className="font-medium">{product.id}</TableCell>
							<TableCell className="font-medium">
								<div className="relative flex items-center space-x-4">
									<div className="relative w-[60px] h-[60px] overflow-hidden rounded-md">
										<Image
											src={product.image ? product.image : "/placeholder.svg"}
											alt={product.name}
											fill
											sizes="60px"
											className="object-contain"
										/>
									</div>
									<div>
										<div className="font-medium">{product.name}</div>
									</div>
								</div>
							</TableCell>
							<TableCell>
								<div className="text-sm text-gray-500 truncate">
									{product.short_description}
								</div>
							</TableCell>
							<TableCell>{product.category.name}</TableCell>
							<TableCell>{product.brand.name}</TableCell>
							<TableCell>${product.price.toFixed(2)}</TableCell>
							<TableCell>{product.stock}</TableCell>
							<TableCell>
								{getStatusBadge(
									product.is_active === 1 ? true : false,
									product.stock
								)}
							</TableCell>
							<TableCell>
								{new Date(product.created_at).toLocaleDateString()}
							</TableCell>
							<TableCell className="text-right">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="ghost" className="h-8 w-8 p-0">
											<MoreHorizontal className="h-4 w-4" />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuItem onClick={() => handleEdit(product)}>
											<Edit className="mr-2 h-4 w-4" />
											Edit
										</DropdownMenuItem>
										<DropdownMenuItem
											className="text-red-600"
											onClick={() => handleDelete(product.id)}
										>
											<Trash2 className="mr-2 h-4 w-4" />
											Delete
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</TableCell>
						</TableRow>
					))}
			</TableBody>
		</Table>
	);
}
