"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MoreHorizontal, Edit, Trash2, Eye, Plus } from "lucide-react"
import useFetch from "@/utils/data-fetching" // Using your existing hook
// import type { ProductResponse, CategoryResponse, BrandResponse, Product } from "@/types/api" // Using your existing types
import type { ProductResponse, Product } from "@/types/product"
import type { CategoryResponse } from "@/types/category"
import type { BrandResponse } from "@/types/brands"


export function ProductsTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedBrand, setSelectedBrand] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")

  const {
    data: productsData,
    isLoading: productsLoading,
    error: productsError,
  } = useFetch<ProductResponse>("/products")
  const { data: categoriesData } = useFetch<CategoryResponse>("/admin/categories")
  const { data: brandsData } = useFetch<BrandResponse>("/admin/brands")

  const products = productsData?.data || []
  const categories = categoriesData?.data || []
  const brands = brandsData?.data || []

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || product.category.id.toString() === selectedCategory
      const matchesBrand = selectedBrand === "all" || product.brand.id.toString() === selectedBrand
      const matchesStatus = selectedStatus === "all" || product.status === selectedStatus

      return matchesSearch && matchesCategory && matchesBrand && matchesStatus
    })
  }, [products, searchTerm, selectedCategory, selectedBrand, selectedStatus])

  const getStatusBadge = (product: Product) => {
    if (!product.in_stock || product.stock === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>
    }
    if (product.stock < 10) {
      return <Badge variant="secondary">Low Stock</Badge>
    }
    if (product.is_new) {
      return (
        <Badge variant="default" className="bg-blue-500">
          New
        </Badge>
      )
    }
    return (
      <Badge variant="default" className="bg-green-500">
        In Stock
      </Badge>
    )
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      console.log("Deleting product:", id)
      // Implement delete logic here
    }
  }

  if (productsError) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-500">Error loading products. Please try again.</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Products Management</h2>
            <Button asChild>
              <Link href="/admin/products">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Link>
            </Button>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Brands" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Brands</SelectItem>
                {brands.map((brand) => (
                  <SelectItem key={brand.id} value={brand.id.toString()}>
                    {brand.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="unavailable">Unavailable</SelectItem>
                <SelectItem value="discontinued">Discontinued</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {productsLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="text-muted-foreground">Loading products...</div>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No products found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Image
                            src={product.image || "/placeholder.svg?height=40&width=40"}
                            alt={product.name}
                            width={40}
                            height={40}
                            className="rounded-md object-cover"
                          />
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-muted-foreground">{product.short_description}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{product.category.name}</TableCell>
                      <TableCell>{product.brand.name}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">${product.price}</span>
                          {product.discount > 0 && (
                            <span className="text-sm text-green-600">-{product.discount}% off</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={product.stock < 10 ? "text-red-600 font-medium" : ""}>{product.stock}</span>
                      </TableCell>
                      <TableCell>{getStatusBadge(product)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span>{product.rating}</span>
                          <span className="text-sm text-muted-foreground">({product.reviews})</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/products/${product.id}`}>
                                <Eye className="w-4 h-4 mr-2" />
                                View
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/products/${product.id}/edit`}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(product.id)} className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}

        {filteredProducts.length > 0 && (
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing {filteredProducts.length} of {products.length} products
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
