<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'descriptions',
        'price',
        'options',
    ];

    protected function casts(): array
    {
        return [
            'options' => 'string[]',
        ];
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
}
