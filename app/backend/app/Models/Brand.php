<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    protected $table = 'tbl_brands';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'description',
        'country',
        'website_url',
        'is_active',
        'user_id',
    ];

    public function products() {
        return $this->hasMany(Product::class, 'brand_id');
    }
}
