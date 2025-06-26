<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

/**
 *  @OA\Schema(
 *     schema="storeBrandRequest",
 *     required={"name", "country", "user_id"},
 *     @OA\Property(property="name", type="string", description="Brand name", example="Nike"),
 *     @OA\Property(property="description", type="string", description="Brand description", example="Sportswear company"),
 *     @OA\Property(property="country", type="string", description="Country of origin", example="USA"),
 *     @OA\Property(property="website_url", type="string", description="Brand website URL", example="https://www.nike.com"),
 *     @OA\Property(property="is_active", type="boolean", description="Is brand active", example=true),
 * )
 */
class StoreBrandRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
        // return auth()->check();
        // return $this->user()->can('create', Brand::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:500',
            'country' => 'required|string|max:100',
            'website_url' => 'nullable|url|max:255',
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
            'name.required' => 'Brand name is required',
            'name.string' => 'Brand name must be a string',
            'name.max' => 'Brand name must not exceed 255 characters',
            
            'description.string' => 'Description must be a string',
            'description.max' => 'Description must not exceed 500 characters',
            
            'country.required' => 'Country is required',
            'country.string' => 'Country must be a string',
            'country.max' => 'Country must not exceed 100 characters',
            
            'website_url.url' => 'Website URL must be a valid URL',
            'website_url.max' => 'Website URL must not exceed 255 characters',
            
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
