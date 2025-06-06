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
            'options' => 'array<string>[]',
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
