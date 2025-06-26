<?php

namespace App\Http\Resources;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $category = Category::find($this->category_id);
        $categoryName = $category ? $category->name : null;
        // if (is_array($this->images_id))
        // $images = Image::where('id')

        return [
            'id' => $this->id,
            'name' => $this->name,
            'brand' => $this->brand, 
            'category' => $categoryName,
            'description' => $this->description,
            'short_description' => $this->short_description, 
            'price' => $this->price,
            'stock' => $this->stock, 
            'options' => $this->formatOptions(), 
            'discount' => $this->discount,
            'in_stock' => $this->inStock(),
            'is_top' => $this->is_top,
            'is_new' => $this->isNew(),
            'status' => $this->status, 
            'rating' => $this->rating, 
            'reviews' => $this->reviews, 
            'created_at' => $this->created_at->toDateTimeString(), 
            'updated_at' => $this->updated_at->toDateTimeString(), 
        ];
    }

    /**
     * Format the options field for API response
     *
     * @return array
     */
    protected function formatOptions(): array
    {
        // If options is already an array (when retrieved from JSON column)
        if (is_array($this->options)) {
            return $this->options;
        }

        // If options is stored as JSON string (fallback)
        try {
            return json_decode($this->options, true) ?: [];
        } catch (\Exception $e) {
            return [];
        }
    }
}
