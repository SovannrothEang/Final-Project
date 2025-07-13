<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ContactResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $user = User::findOrFail($this->user_id);
        return [
            'id' => $this->id,
            'store_name' => $this->store_name,
            'address' => $this->address,
            'email' => $this->email,
            'phone' => $this->phone,
            'description' => $this->description,
            'user_id' => $this->user_id,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
            ],
            'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),
        ];
    }
}
