<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $table = 'tbl_contacts';

    protected $fillable = [
        'store_name',
        'address',
        'description',
        'email',
        'phone',
        'social_medias',
        'user_id'
    ];
    protected $casts = [
        'social_medias' => 'array'
    ];

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }
}
