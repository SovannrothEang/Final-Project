<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutPage extends Model
{
    protected $table = 'tbl_about_page';

    protected $fillable = [
        'main_detail',
        'sub_detail',
        'total_brands',
        'total_products',
        'total_sales',
        'yearly_sale',
        'monthly_sale',
        'total_reviews',
        'average_rating',
        'monthly_visitors',
        'years_in_operation',
        'user_id'
    ];

    protected $casts = [
        'sub_detail' => 'array',
        'yearly_sale' => 'array',
        'monthly_sale' => 'array',
        'total_brands' => 'integer',
        'total_products' => 'integer',
        'total_sales' => 'integer',
        'total_reviews' => 'integer',
        'average_rating' => 'float',
        'monthly_visitors' => 'integer',
        'years_in_operation' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
