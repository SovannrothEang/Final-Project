"use client";

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// import { useProducts } from "@/utils/product-service"; // Adjust import path
import { useProducts } from "@/services/productService"; // Adjust import path
import { ProductResponse } from "@/types/product";

// Custom debounce hook
function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export function Header() {
  const [isDiscount] = useState(false);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300); // 300ms delay
  const { data, isLoading, error } = useProducts(
    debouncedSearchQuery.trim() ? { search: debouncedSearchQuery.trim() } : undefined
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <>
      {isDiscount && (
        <div className="bg-black text-white text-center py-3 text-sm">
          Sign Up and get 15% off for your first order.{" "}
          <span className="underline cursor-pointer">Sign Up Now</span>
        </div>
      )}
      <header className="border-b sticky z-50 top-0 bg-gray-50/75 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 grid grid-cols-2 md:grid-cols-3">
          <div className="text-2xl font-bold flex items-center">
            <span className="animate-bounce-up">
              <Link href="/">Exclusive</Link>
            </span>
          </div>
          <div className="flex items-center justify-center md:px-4">
            <div className="relative w-full max-w-md">
              <form onSubmit={handleSearch} className="relative">
                <Input
                  placeholder="Search products..."
                  className="w-full text-xs sm:text-base rounded-full border border-gray-400 pr-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <Search className="w-4 h-4 text-gray-400" />
                </button>
              </form>
              {searchQuery.trim() && (
                <div className="absolute w-full mt-2 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
                  {isLoading && <p className="p-2 text-gray-500">Loading...</p>}
                  {error && <p className="p-2 text-red-500">Error loading suggestions</p>}
                  {!isLoading && !error && data?.data?.length === 0 && (
                    <p className="p-2 text-gray-500">No products found</p>
                  )}
                  {!isLoading &&
                    !error &&
                    data?.data?.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        className="block p-2 hover:bg-gray-100"
                        onClick={() => setSearchQuery("")}
                      >
                        {product.name} ({product.category.name})
                      </Link>
                    ))}
                </div>
              )}
            </div>
          </div>
          <nav className="hidden md:flex justify-end">
            <div className="w-[75%] hidden md:flex items-center justify-end gap-3 md:*:px-2">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
              <Link href="/about" className="hover:underline">
                About
              </Link>
            </div>
          </nav>
        </div>
      </header>
      <style jsx global>{`
        @keyframes bounce-up {
          0%,
          100% {
            transform: translateY(0);
          }
          20% {
            transform: translateY(-18px);
          }
          40% {
            transform: translateY(0);
          }
          60% {
            transform: translateY(-10px);
          }
          80% {
            transform: translateY(0);
          }
        }
        .animate-bounce-up {
          display: inline-block;
          animation: bounce-up 1.6s infinite;
        }
      `}</style>
    </>
  );
}