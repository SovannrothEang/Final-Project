<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 *  @OA\Schema(
 *     schema="storeCategoryRequest",
 *     required={"name"},
 *     @OA\Property(property="name", type="string", description="Category name"),
 * )
 */
class Category extends Model
{
    protected $table = 'tbl_categories';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
    ];

    public function product() {
        return $this->hasOne(Product::class);
    }
}
