<?php

namespace App\Http\Requests\Products;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
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
            'description' => 'nullable|string|max:255',
            'price' => 'required|numeric|min:0.01',
            'quantity' => 'required|integer|min:1',
            'options' => 'nullable|array',
            'options.*' => ['array'],
            'options.*.*' => ['string|max:255'],
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
