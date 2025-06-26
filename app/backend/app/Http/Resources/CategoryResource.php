<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 *  @OA\Schema(
 *     schema="Category",
 *     type="object",
 *     @OA\Property(property="id", type="integer", format="int64", description="Category ID", example=1),
 *     @OA\Property(property="name", type="string", description="Category name", example="Electronics"),
 *     @OA\Property(property="description", type="string", description="Category description", example="Electronic devices and accessories", nullable=true),
 *     @OA\Property(property="is_active", type="boolean", description="Is category active", example=true),
 *     @OA\Property(property="user_id", type="integer", format="int64", description="User ID who created the category", example=1),
 *     @OA\Property(property="created_at", type="string", format="date-time", description="Creation timestamp", example="2023-01-01T12:00:00Z"),
 *     @OA\Property(property="updated_at", type="string", format="date-time", description="Last update timestamp", example="2023-01-01T12:00:00Z")
 * )
 */
class CategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'is_active' => $this->is_active,
            'user_id' => $this->user_id,
            'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),
        ];
    }
}
