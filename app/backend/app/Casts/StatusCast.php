<?php

namespace App\Casts;

use App\Enum\Status;
use Illuminate\Contracts\Database\Eloquent\CastsAttributes;

class StatusCast implements CastsAttributes
{
    public function get($model, string $key, $value, array $attributes)
    {
        return $value ? Status::from($value) : null;
    }

    public function set($model, string $key, $value, array $attributes)
    {
        return $value ? $value->value : null;
    }
}