<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AboutPageResource extends JsonResource
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
            'main_detail' => $this->main_detail,
            'sub_detail' => $this->sub_detail,
            'total_brands' => $this->total_brands,
            'total_products' => $this->total_products,
            'total_sales' => $this->total_sales,
            'yearly_sale' => $this->yearly_sale,
            'monthly_sale' => $this->monthly_sale,
            'total_reviews' => $this->total_reviews,
            'average_rating' => $this->average_rating,
            'monthly_visitors' => $this->monthly_visitors,
            'years_in_operation' => $this->years_in_operation,
            'user_id' => $this->user_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
