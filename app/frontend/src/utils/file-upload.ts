import { getToken } from "@/lib/session"

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL

export interface UploadResponse {
  success: boolean
  filename: string
  url?: string
  message?: string
}

export async function uploadFile(file: File, folder = "brands"): Promise<UploadResponse> {
  const token = await getToken()

  const formData = new FormData()
  formData.append("file", file)
  formData.append("folder", folder)

  const response = await fetch(`${API_BASE}/api/v1/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      // Don't set Content-Type for FormData, let browser set it with boundary
    },
    body: formData,
  })

  if (!response.ok) {
    throw new Error(`Upload failed: ${response.status} ${response.statusText}`)
  }

  return await response.json()
}

export async function deleteFile(filename: string): Promise<void> {
  const token = await getToken()

  const response = await fetch(`${API_BASE}/api/v1/upload/${filename}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error(`Delete failed: ${response.status} ${response.statusText}`)
  }
}
