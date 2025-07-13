
// "use client"

// import { Search, Bell, Settings } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// export function AdminHeader() {
//   return (
//     <header className="bg-white border-b border-gray-200 px-6 py-4 position-fixed top-0">
//       <div className="flex items-center justify-between">
//         {/* Search Section */}
//         <div className="flex-1 max-w-md">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//             <Input
//               type="text"
//               placeholder="Search products, orders, customers..."
//               className="pl-10 pr-4 py-2 w-full border-gray-300 focus:border-red-500 focus:ring-red-500"
//             />
//           </div>
//         </div>

//         {/* Right Section */}
//         <div className="flex items-center gap-3">
//           {/* Notifications */}
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" size="icon" className="relative hover:bg-gray-100">
//                 <Bell className="w-5 h-5" />
//                 <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end" className="w-80">
//               <div className="p-3 border-b">
//                 <h3 className="font-semibold">Notifications</h3>
//               </div>
//               <div className="p-3">
//                 <p className="text-sm text-gray-500">No new notifications</p>
//               </div>
//             </DropdownMenuContent>
//           </DropdownMenu>

//           {/* Quick Settings */}
//           <Button variant="ghost" size="icon" className="hover:bg-gray-100">
//             <Settings className="w-5 h-5" />
//           </Button>
//         </div>
//       </div>
//     </header>
//   )
// }



"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useFetch from "@/utils/data-fetching";

interface Product {
  id: number;
  name: string;
  created_at: string;
  brand: { name: string };
  category: { name: string };
}

interface ProductResponse {
  success: boolean;
  data: Product[];
}

export function AdminHeader() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState<Product[]>([]);
  const [searching, setSearching] = useState(false);

  // Fetch latest 5 products for notifications
  const { data: recentProducts, isLoading, error } = useFetch<ProductResponse>(
    "/admin/products?sort_by=created_at&sort_direction=desc&per_page=5"
  );

  // Handle search
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;

    setSearching(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/admin/products?search=${encodeURIComponent(
          query
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) throw new Error("Search failed");
      const result: ProductResponse = await res.json();
      setSearchResult(result.data);
    } catch (err) {
      console.error(err);
      setSearchResult([]);
    } finally {
      setSearching(false);
    }

    // Optional: Redirect to /admin/products page
    router.push(`/admin/products?search=${encodeURIComponent(query)}`);
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="pl-10 pr-4 py-2 w-full border-gray-300 focus:border-red-500 focus:ring-red-500"
          />

          {/* Live search result dropdown */}
          {query.trim() && (
            <div className="absolute top-full left-0 mt-2 w-full bg-white shadow-lg border border-gray-200 rounded-md max-h-60 overflow-y-auto z-50">
              {searching ? (
                <p className="p-3 text-sm text-gray-500">Searching...</p>
              ) : searchResult.length > 0 ? (
                searchResult.map((product) => (
                  <Link
                    key={product.id}
                    href={`/admin/products/${product.id}`}
                    className="block p-3 hover:bg-gray-100 text-sm"
                  >
                    <p className="font-medium">{product.name}</p>
                    <p className="text-xs text-gray-500">
                      {product.category?.name} • {product.brand?.name}
                    </p>
                  </Link>
                ))
              ) : (
                <p className="p-3 text-sm text-gray-500">No products found</p>
              )}
            </div>
          )}
        </form>

        {/* Notifications + Settings */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative hover:bg-gray-100">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-3 border-b">
                <h3 className="font-semibold text-sm">Latest Products</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {isLoading ? (
                  <p className="text-sm text-gray-500 p-3">Loading...</p>
                ) : error ? (
                  <p className="text-sm text-red-500 p-3">Failed to load</p>
                ) : recentProducts?.data?.length ? (
                  recentProducts.data.map((product) => (
                    <div key={product.id} className="p-3 border-b text-sm">
                      <p className="font-medium">{product.name}</p>
                      <p className="text-xs text-gray-500">
                        {product.category?.name} • {product.brand?.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(product.created_at).toLocaleString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 p-3">No new products</p>
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Settings */}
          <Link href="/admin/settings" passHref>
            <Button variant="ghost" size="icon" className="hover:bg-gray-100">
              <Settings className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

