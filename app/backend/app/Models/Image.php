<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $table = 'tbl_images';

    protected $fillable = [
        'url',
        'product_id',
        'user_id'
    ];

    public function product() {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
