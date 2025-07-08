<?php

namespace App\Http\Resources;

use App\Models\Brand;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 *  @OA\Schema(
 *       schema="product",
 *       required={"name", "brand", "price", "quantity", "options"},
 *      @OA\Property(
 *          property="id",
 *          type="integer",
 *          format="int64",
 *          description="Product ID"
 *      ),
 *      @OA\Property(
 *          property="name",
 *          type="string",
 *          description="Product name"
 *      ),
 *      @OA\Property(
 *          property="brand",
 *          type="string",
 *          description="Product brand"
 *      ),
 *      @OA\Property(
 *          property="description",
 *          type="string",
 *          description="Product description"
 *      ),
 *      @OA\Property(
 *          property="short_description",
 *          type="string",
 *          description="Short product description"
 *      ),
 *      @OA\Property(
 *          property="price",
 *          type="number",
 *          format="float",
 *          description="Product price"
 *      ),
 *      @OA\Property(
 *          property="stock",
 *          type="integer",
 *          description="Stock quantity (alias for quantity)"
 *      ),
 *      @OA\Property(
 *          property="options",
 *          type="object",
 *          description="Available product options (color, size, etc.)",
 *          example={
 *              "color": {"red", "blue"},
 *              "size": {"small", "medium"}
 *          }
 *      ),
 *      @OA\Property(
 *          property="discount",
 *          type="integer",
 *          description="Discount percentage",
 *          example=10
 *      ),
 *      @OA\Property(
 *          property="is_top",
 *          type="boolean",
 *          description="Is top product flag"
 *      ),
 *      @OA\Property(
 *          property="status",
 *          type="string",
 *          description="Product status",
 *          enum={"available", "out_of_stock", "discontinued"}
 *      ),
 *      @OA\Property(
 *          property="rating",
 *          type="integer",
 *          description="Product rating",
 *          example=5
 *      ),
 *      @OA\Property(
 *          property="reviews",
 *          type="integer",
 *          description="Number of reviews",
 *          example=10
 *      ),
 *      @OA\Property(
 *          property="images_id",
 *          type="array",
 *          description="Array of image IDs",
 *          @OA\Items(type="integer")
 *      ),
 *      @OA\Property(
 *          property="user_id",
 *          type="integer",
 *          description="ID of the user who created the product"
 *      ),
 *      @OA\Property(
 *          property="created_at",
 *          type="string",
 *          format="date-time",
 *          description="Creation timestamp"
 *      ),
 *      @OA\Property(
 *          property="updated_at",
 *          type="string",
 *          format="date-time",
 *          description="Last update timestamp"
 *      )
 *  )
 */

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $brand = Brand::find($this->brand_id);
        if ($brand === null)
            throw new NotFoundHttpException('Cannot find brand of the product');

        $category = Category::find($this->category_id);
        if ($brand === null)
            throw new NotFoundHttpException('Cannot find category of the product');
        // if (is_array($this->images_id))
        // $images = Image::where('id')

        return [
            'id' => $this->id,
            'name' => $this->name,
            'brand' => [
                'id' => $brand->id,
                'name' => $brand->name,
            ], 
            'category' => [
                'id' => $category->id,
                'name' => $category->name,
            ],
            'description' => $this->description,
            'short_description' => $this->short_description, 
            'price' => $this->price,
            'stock' => $this->stock, 
            'options' => $this->formatOptions(), 
            'discount' => $this->discount,
            'in_stock' => $this->inStock(),
            'is_top' => $this->is_top,
            'is_new' => $this->isNew(),
            'is_active' => $this->is_active,
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
