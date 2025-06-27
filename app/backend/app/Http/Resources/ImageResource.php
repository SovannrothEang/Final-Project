<?php

namespace App\Http\Resources;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ImageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $product = Product::findOrFail($this->product_id);
        $category = Category::findOrFail($product->category_id);

        return [
            'id' => $this->id,
            'url' => $this->url,
            'product_id' => $product->id,
            'product_category' => $category->name,
        ];
    }
}
