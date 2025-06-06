<?php

namespace App\Http\Requests\Products;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function rules(): array
    {
        return [
            'name' => 'sometimes|string|max:255',
            'description' => 'sometimes|string|max:255',
            'price' => 'sometimes|numeric|min:0.01',
            'quantity' => 'sometimes|integer|min:1',
            'options' => 'sometimes|array',
            'options.*' => ['sometimes|array'],
            'options.*.*' => ['sometimes|string'],
        ];
    }
    /**
     * Get custom error messages
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Product name is required',
            'price.min' => 'Price must be at least 0.01',
            'quantity.min' => 'Stock must be at least 1',
        ];
    }
}
