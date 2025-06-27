<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Poster extends Model
{
    protected $table = 'tbl_poster';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'url',
        'user_id',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
