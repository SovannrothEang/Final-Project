"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Package, Globe } from "lucide-react"
import useFetch from "@/utils/data-fetching" // Using your existing hook
// import type { CategoryResponse, BrandResponse } from "@/types/api" // Using your existing types
import type { CategoryResponse } from "@/types/category"
import type { BrandResponse } from "@/types/brands"

export function CategoriesBrandsOverview() {
  const { data: categoriesData, isLoading: categoriesLoading } = useFetch<CategoryResponse>("/admin/categories")
  const { data: brandsData, isLoading: brandsLoading } = useFetch<BrandResponse>("/admin/brands")

  const categories = categoriesData?.data || []
  const brands = brandsData?.data || []

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Categories */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Categories
          </CardTitle>
          <Button size="sm" asChild>
            <Link href="/admin/categories">
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {categoriesLoading ? (
            <div className="text-center py-4 text-muted-foreground">Loading categories...</div>
          ) : categories.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">No categories found</div>
          ) : (
            <div className="space-y-3">
              {categories.slice(0, 5).map((category) => (
                <div key={category.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{category.name}</h4>
                      {category.is_active ? (
                        <Badge variant="default" className="bg-green-500">
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Inactive</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{category.products_count} products</p>
                  </div>
                </div>
              ))}
              {categories.length > 5 && (
                <div className="text-center pt-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/admin/categories">View All ({categories.length})</Link>
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Brands */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Brands
          </CardTitle>
          <Button size="sm" asChild>
            <Link href="/admin/brands">
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {brandsLoading ? (
            <div className="text-center py-4 text-muted-foreground">Loading brands...</div>
          ) : brands.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">No brands found</div>
          ) : (
            <div className="space-y-3">
              {brands.slice(0, 5).map((brand) => (
                <div key={brand.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{brand.name}</h4>
                      {brand.is_active ? (
                        <Badge variant="default" className="bg-green-500">
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Inactive</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{brand.description}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <p className="text-xs text-muted-foreground">{brand.products_count} products</p>
                      <p className="text-xs text-muted-foreground">{brand.country}</p>
                    </div>
                  </div>
                </div>
              ))}
              {brands.length > 5 && (
                <div className="text-center pt-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/admin/brands">View All ({brands.length})</Link>
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
