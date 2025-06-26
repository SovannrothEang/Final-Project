<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 *  @OA\Schema(
 *     schema="brand",
 *     type="object",
 *     @OA\Property(property="id", type="integer", format="int64", example=1),
 *     @OA\Property(property="name", type="string", example="Nike"),
 *     @OA\Property(property="description", type="string", example="Sportswear company"),
 *     @OA\Property(property="country", type="string", example="USA"),
 *     @OA\Property(property="website_url", type="string", example="https://www.nike.com"),
 *     @OA\Property(property="is_active", type="boolean", example=true),
 *     @OA\Property(property="user_id", type="integer", format="int64", example=1),
 *     @OA\Property(property="created_at", type="string", format="date-time", example="2023-01-01T12:00:00Z"),
 *     @OA\Property(property="updated_at", type="string", format="date-time", example="2023-01-01T12:00:00Z")
 * )
 */
class BrandResource extends JsonResource
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
            'country' => $this->country,
            'website_url' => $this->website_url,
            'is_active' => $this->is_active,
            'user_id' => $this->user_id,
            'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),
        ];
    }
}
