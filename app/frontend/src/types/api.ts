// Generic API response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  errors?: Record<string, string[]>
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    current_page: number
    last_page: number
    per_page: number
    total: number
    from: number
    to: number
  }
  links: {
    first: string
    last: string
    prev?: string
    next?: string
  }
}

export interface ApiError {
  message: string
  errors?: Record<string, string[]>
  status?: number
}

export interface BaseFilters {
  page?: number
  per_page?: number
  search?: string
  sort_by?: string
  sort_order?: "asc" | "desc"
}

export interface UploadResponse {
  url: string
  filename: string
  size: number
  mime_type: string
}
