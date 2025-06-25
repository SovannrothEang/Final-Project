// export interface Product {
// 	id: string;
// 	name: string;
// 	brand: string;
// 	sku: string;
// 	price: number;
// 	description: string;
// 	options: { colors: string[]; sizes: string[] };
// 	discount: number;
// 	stock: number;
// 	inStock: boolean;
// 	isNew: boolean;
// 	category: string;
// 	status: string;
// 	rating: number;
// 	reviews: number;
// 	images: string;
// 	createdAt: string;
// }
// // image: { src: string; alt: string };

export interface Product{
	id: number;
	name: string;
	category: number; // store category id
	price: number;
	description: string;
	options: {
		series: string[];
		colors: string[];
		sizes: string[];
	};
	discount: number;
	stock: number;
	inStock: boolean;
	isNew: boolean;
	isTop: boolean;
	status: string;
	rating: number;
	reviews: number;
	images: string;
	createdAt: string;
	updatedAt: string;
}

export type ProductList = Product[];


