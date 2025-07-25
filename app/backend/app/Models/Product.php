<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


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
        'brand_id',
        'category_id',
        'price',
        'description',
        'short_description',
        'options',
        'discount',
        'stock',
        'is_active',
        'reviews',
        'rating',
        'image',
        'user_id',
    ];

    protected function casts(): array
    {
        return [
            'options' => 'array',
        ];
    }

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function brand() {
        return $this->belongsTo(Brand::class, 'brand_id');
    }

    public function category() {
        return $this->belongsTo(Category::class, 'category_id');
    }

    // public function images() {
    //     return $this->hasMany(Image::class, 'product_id');
    // }

    public function inStock(): bool
    {
        return $this->stock > 0;
    }

    public function isNew(): bool
    {
        // $recentProducts = Product::orderBy('created_at', 'desc')->take(10)->get();
        // return $recentProducts->contains('id', $this->id);
        return $this->created_at->gte(now()->subDays(7));
    }
    public function getTotalRated(): float
    {
        if ($this->reviews > 0) {
            return ($this->rating / $this->reviews);
        }
        return 0.0;
    }

    public function isTop(): bool
    {
        return $this->rating >= 4.0 && $this->reviews >= 10;
    }
}
