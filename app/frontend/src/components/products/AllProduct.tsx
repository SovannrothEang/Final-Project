// import { Product } from "@/types/product";
// import { ProductCard } from "./ProductCard";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { Category } from "@/types/category";
// import { useState } from "react";

// interface AllProductProps {
// 	title: string;
// 	products: Product[];
// 	categories: Category[];
// 	showViewAll?: boolean;
// 	showNavigation?: boolean;
// }

// export function AllProduct({
// 	title,
// 	products,
// 	categories,
// 	showViewAll = true,
// }: AllProductProps) {

// 	const [activeCategory, setActiveCategory] = useState(categories[0]);

// 	return (
// 		<section className="w-full mb-12">
// 			<div className="mb-8">
// 				<div className="flex items-center gap-2 mb-2">
// 					<div className="w-4 h-10 bg-black rounded"></div>
// 					<span className="font-bold text-2xl">{title}</span>
// 				</div>
// 			</div>

// 			{/* Category Buttons */}
// 			<div className="flex gap-3 justify-start mb-10 w-full overflow-hidden overflow-x-scroll">
// 				{categories.map((category) => (
// 					<Button
// 						key={category.name}
// 						variant={category === activeCategory ? "default" : "outline"}
// 						className={`text-lg font-semibold px-6 py-5 rounded-xl ${
// 						category === activeCategory ? "bg-black hover:bg-gray-700" : ""
// 						}`}
// 						onClick={() => setActiveCategory(category)}
// 					>
// 						{category.name}
// 					</Button>
// 				))}
// 				{/* {[
// 					"Laptops",
// 					"Desktops",
// 					"PC Components",
// 					"Monitors",
// 					"Accessories",
// 					"Networking Devices",
// 					"Gaming Gears",
// 				].map((category) => (
// 					<Button
// 						key={category}
// 						variant={category === "Laptops" ? "default" : "outline"}
// 						className={`text-lg font-semibold px-6 py-5 rounded-xl ${
// 							category === "Laptops" ? "bg-black hover:bg-gray-700" : ""
// 						}`}
// 					>
// 						{category}
// 					</Button>
// 				))} */}
// 			</div>

// 			{/* Product Grid */}
// 			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-8">
// 				{products.slice(0, 8).map((product) => (
// 					<ProductCard key={product.id} {...product} />
// 				))}
// 			</div>

// 			{showViewAll && (
// 				<div className="text-center">
// 					<Button variant="outline" className="rounded-4xl">
// 						<Link href="/products" className="px-8 py-6 ">
// 							View All Products
// 						</Link>
// 					</Button>
// 				</div>
// 			)}
// 		</section>
// 	);
// }


import { ProductCard } from "./ProductCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCategories } from "@/services/categoryService";
import { useProducts } from "@/services/productService";
import { useState } from "react";

interface AllProductProps {
  title: string;
  showViewAll?: boolean;
}

export function AllProduct({ title, showViewAll = true }: AllProductProps) {
  // The service now directly returns the array, no need for .data
  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useCategories();
  
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const { data: productsResponse, isLoading: productsLoading } = useProducts({
    category_id: activeCategory || undefined,
    per_page: 8
  });

  // Handle loading states
  if (categoriesLoading || productsLoading) {
    return (
      <section className="w-full mb-12">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-10 bg-black rounded"></div>
            <span className="font-bold text-2xl">{title}</span>
          </div>
        </div>
        <div>Loading products...</div>
      </section>
    );
  }

  // Handle error states
  if (categoriesError) {
    return (
      <section className="w-full mb-12">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-10 bg-black rounded"></div>
            <span className="font-bold text-2xl">{title}</span>
          </div>
        </div>
        <div>Error loading categories</div>
      </section>
    );
  }

  return (
    <section className="w-full mb-12">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-4 h-10 bg-black rounded"></div>
          <span className="font-bold text-2xl">{title}</span>
        </div>
      </div>

      {/* Category Buttons */}
      <div className="flex gap-3 justify-start mb-10 w-full overflow-hidden overflow-x-scroll">
        <Button
          variant={!activeCategory ? "default" : "outline"}
          className={`text-lg font-semibold px-6 py-5 rounded-xl ${
            !activeCategory ? "bg-black hover:bg-gray-700" : ""
          }`}
          onClick={() => setActiveCategory(null)}
        >
          All Products
        </Button>
        
        {categories?.map((category) => (
          <Button
            key={category.id}
            variant={category.id === activeCategory ? "default" : "outline"}
            className={`text-lg font-semibold px-6 py-5 rounded-xl ${
              category.id === activeCategory ? "bg-black hover:bg-gray-700" : ""
            }`}
            onClick={() => setActiveCategory(category.id === activeCategory ? null : category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-8">
        {productsResponse?.data?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {showViewAll && (
        <div className="text-center">
          <Button variant="outline" className="rounded-4xl">
            <Link href="/products" className="px-8 py-6">
              View All Products
            </Link>
          </Button>
        </div>
      )}
    </section>
  );
}