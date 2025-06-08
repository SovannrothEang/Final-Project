<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *      schema="product",
 *      required={"name", "descriptions", "price", "quantity"},
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         format="int64",
 *     ),
 *     @OA\Property(
 *         property="name",
 *         type="string"
 *     ),
 *     @OA\Property(
 *         property="descriptions",
 *         type="string",
 *     ),
 *     @OA\Property(
 *         property="price",
 *         type="number",
 *         format="float",
 *     ),
 *     @OA\Property(
 *         property="quantity",
 *         type="integer"
 *     ),
 *     @OA\Property(
 *         property="options",
 *         type="array",
 *         description="Available product options",
 *         @OA\Items(
 *             type="object",
 *             @OA\Property(
 *                  property="color",
 *                  type="array",
 *                  @OA\Items(
 *                    type="string"
 *                  )
 *              ),
 *             @OA\Property(
 *                  property="size",
 *                  type="array",
 *                  @OA\Items(
 *                    type="string"
 *                  )
 *              )
 *         )
 *     ),
 *     @OA\Property(
 *         property="created_at",
 *         type="string",
 *         format="date-time",
 *         description="Creation timestamp"
 *     ),
 *     @OA\Property(
 *         property="updated_at",
 *         type="string",
 *         format="date-time",
 *         description="Last update timestamp"
 *     )
 * )
 */

class Product extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'description',
        'price',
        'quantity',
        'options',
        'user_id'
    ];

    protected function casts(): array
    {
        return [
            "options" => "array",
        ];
    }

    public function user(){
        return $this->belongsTo(User::class);
    }

    public static function inStock(): bool
    {
        return auth()->user()->products()->quantity >= 0;
    }
}
