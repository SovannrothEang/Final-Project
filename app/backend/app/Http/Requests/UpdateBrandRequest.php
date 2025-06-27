<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

/**
 *  @OA\Schema(
 *     schema="updateBrandRequest",
 *     @OA\Property(property="name", type="string", description="Brand name", example="Nike"),
 *     @OA\Property(property="description", type="string", description="Brand description", example="Sportswear company", nullable=true),
 *     @OA\Property(property="country", type="string", description="Country of origin", example="USA"),
 *     @OA\Property(property="website_url", type="string", description="Brand website URL", example="https://www.nike.com", nullable=true),
 *     @OA\Property(property="is_active", type="boolean", description="Is brand active", example=true),
 *     @OA\Property(property="user_id", type="integer", format="int64", description="User ID who created the brand", example=1)
 * )
 */
class UpdateBrandRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
        // return auth()->check();
        // return $this->user()->can('update', Brand::class);

        // Only product owner can update
        // $brand = Brand::find($this->route('id'));
        // return $product && $this->user()->id === $brand->user_id;
    }

    public function rules(): array
    {
        return [
            // The 'name' must be unique in the 'tbl_brands' table, except for the
            // brand record that has the same ID as the one in the current route.
            //
            // $this->route('id') . 'id' => gets the value of {id} parameter you've defined in your route
            'name' => 'sometimes|string|max:255|unique:tbl_brands,name,' . $this->route('id') . ',id',
            'description' => 'nullable|string|max:500',
            'country' => 'nullable|string|max:100',
            'website_url' => 'nullable|url|max:255',
            'is_active' => 'nullable|boolean',
            'user_id' => 'sometimes|integer|exists:tbl_users,id',
        ];
    }

    public function messages(): array
    {
        return [
            'name.string' => 'Brand name must be a string',
            'name.max' => 'Brand name must not exceed 255 characters',
            'name.unique' => 'Brand name must be unique',

            'description.string' => 'Description must be a string',
            'description.max' => 'Description must not exceed 500 characters',

            'country.string' => 'Country must be a string',
            'country.max' => 'Country must not exceed 100 characters',

            'website_url.url' => 'Website URL must be a valid URL',
            'website_url.max' => 'Website URL must not exceed 255 characters',
            
            'is_active.boolean' => 'Is active must be a boolean value',
            'user_id.exists' => 'Specified user does not exist',
        ];
    }
}
