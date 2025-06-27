<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

/**
 *  @OA\Schema(
 *     schema="updateCategoryRequest",
 *     @OA\Property(property="name", type="string", description="Category name", example="Electronics"),
 *     @OA\Property(property="description", type="string", description="Category description", example="Electronic devices and accessories", nullable=true),
 *     @OA\Property(property="is_active", type="boolean", description="Is category active", example=true),
 *     @OA\Property(property="user_id", type="integer", format="int64", description="User ID who created the category", example=1)
 * )
 */
class UpdateCategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
        // return auth()->check();
        // return $this->user()->can('update', Category::class);

        // Only product owner can update
        // $category = category::find($this->route('id'));
        // return $category && $this->user()->id === $category->user_id;
    }
    public function rules(): array
    {
        return [
            // The 'name' must be unique in the 'tbl_categories' table, except 
            // for the category record that has the ID matching the 'category' parameter in the current route.
            //
            // $this->route('id') . 'id' => gets the value of {id} parameter you've defined in your route
            'name' => 'sometimes|string|max:255|unique:tbl_categories,name,' . $this->route('id') . ',id',
            'description' => 'nullable|string|max:500',
            'is_active' => 'nullable|boolean',
            'user_id' => 'sometimes|integer|exists:tbl_users,id',
        ];
    }

    public function messages(): array
    {
        return [
            'name.string' => 'Category name must be a string',
            'name.max' => 'Category name must not exceed 255 characters',
            'name.unique' => 'Category name must be unique',

            'description.string' => 'Description must be a string',
            'description.max' => 'Description must not exceed 500 characters',
            
            'is_active.boolean' => 'Is active must be a boolean value',
            'user_id.exists' => 'Specified user does not exist',
        ];
    }
}
