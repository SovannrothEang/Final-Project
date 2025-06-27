<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

/**
 *  @OA\Schema(
 *     schema="storeCategoryRequest",
 *     required={"name", "user_id"},
 *     @OA\Property(property="name", type="string", description="Category name", example="Electronics"),
 *     @OA\Property(property="description", type="string", description="Category description", example="Electronic devices and accessories", nullable=true),
 *     @OA\Property(property="is_active", type="boolean", description="Is category active", example=true),
 * )
 */
class StoreCategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
        // return auth()->check();
        // return $this->user()->can('create', Category::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255|unique:tbl_categories,name',
            'description' => 'nullable|string|max:500',
            'is_active' => 'nullable|boolean',
            'user_id' => 'required|integer|exists:tbl_users,id',
        ];
    }

    /**
     * Get custom error messages.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Category name is required',
            'name.string' => 'Category name must be a string',
            'name.max' => 'Category name must not exceed 255 characters',
            'name.unique' => 'Category name must be unique',
            
            'description.string' => 'Description must be a string',
            'description.max' => 'Description must not exceed 500 characters',
            
            'is_active.boolean' => 'Is active must be a boolean value',
            
            'user_id.required' => 'User ID is required',
            'user_id.integer' => 'User ID must be an integer',
            'user_id.exists' => 'Specified user does not exist',
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'user_id' => $this->user()->id,
        ]);
    }
}
