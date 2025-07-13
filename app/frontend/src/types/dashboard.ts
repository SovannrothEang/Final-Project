// Additional types for dashboard - separate from your existing api.ts
export interface DashboardStats {
  totalProducts: number
  activeProducts: number
  totalCategories: number
  totalBrands: number
  lowStockItems: number
  outOfStockItems: number
}

export interface ProductFilters {
  search: string
  category: string
  brand: string
  status: string
}
