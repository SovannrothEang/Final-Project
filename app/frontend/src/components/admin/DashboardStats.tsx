"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, ShoppingCart, AlertTriangle, TrendingUp } from "lucide-react"
import useFetch from "@/utils/data-fetching" // Using your existing hook
// import type { ProductResponse, CategoryResponse, BrandResponse } from "@/types/api" // Using your existing types
import type { ProductResponse } from "@/types/product"
import type { CategoryResponse } from "@/types/category"
import type { BrandResponse } from "@/types/brands"

export function DashboardStats() {
  const { data: productsData, isLoading: productsLoading } = useFetch<ProductResponse>("/products")
  const { data: categoriesData, isLoading: categoriesLoading } = useFetch<CategoryResponse>("/admin/categories")
  const { data: brandsData, isLoading: brandsLoading } = useFetch<BrandResponse>("/admin/brands")

  const products = productsData?.data || []
  const categories = categoriesData?.data || []
  const brands = brandsData?.data || []

  const stats = [
    {
      title: "Total Products",
      value: productsLoading ? "..." : products.length.toString(),
      icon: Package,
      description: "Active products in inventory",
    },
    {
      title: "Categories",
      value: categoriesLoading ? "..." : categories.length.toString(),
      icon: ShoppingCart,
      description: "Product categories",
    },
    {
      title: "Brands",
      value: brandsLoading ? "..." : brands.length.toString(),
      icon: TrendingUp,
      description: "Partner brands",
    },
    {
      title: "Low Stock Items",
      value: productsLoading ? "..." : products.filter((p) => p.stock < 10 && p.stock > 0).length.toString(),
      icon: AlertTriangle,
      description: "Items with low inventory",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
