<?php

namespace App\Http\Requests\Products;

use Illuminate\Foundation\Http\FormRequest;

/**
 * @OA\Schema(
 *      schema="storeProduct",
 *      required={"name", "description", "price", "quantity", "options"},
 *     @OA\Property(
 *         property="name",
 *         type="string"
 *     ),
 *     @OA\Property(
 *         property="description",
 *         type="string",
 *     ),
 *     @OA\Property(
 *         property="price",
 *         type="number",
 *         format="float",
 *     ),
 *     @OA\Property(
 *         property="quantity",
 *         type="integer"
 *     ),
 *     @OA\Property(
 *         property="options",
 *         type="array",
 *         description="Available product options",
 *         @OA\Items(
 *             type="object",
 *             @OA\Property(
 *                  property="color",
 *                  type="array",
 *                  @OA\Items(
 *                    type="string"
 *                  )
 *              ),
 *             @OA\Property(
 *                  property="size",
 *                  type="array",
 *                  @OA\Items(
 *                    type="string"
 *                  )
 *              )
 *         )
 *     )
 * )
 */

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
            'options.*.*' => ['string'],
            'user_id' => 'required|integer',
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
