<?php

namespace App\Models;

use App\Casts\StatusCast;
use Illuminate\Database\Eloquent\Model;

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
class Product extends Model
{
    protected $table = 'tbl_products';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'brand',
        'category_id',
        'price',
        'description',
        'short_description',
        'options',
        'discount',
        'stock',
        'is_top',
        'rating',
        'reviews',
        'images_id',
        'user_id',
    ];

    protected function casts(): array
    {
        return [
            'options' => 'array',
        ];
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function category() {
        return $this->hasOne(Category::class);
    }

    public function inStock(): bool
    {
        return $this->quantity > 0;
    }

    public function isNew(): bool
    {
        // $recentProducts = Product::orderBy('created_at', 'desc')->take(10)->get();
        // return $recentProducts->contains('id', $this->id);
        return $this->created_at->gte(now()->subDays(7));
    }
}
