<?php

namespace App\Http\Requests\Products;

use Illuminate\Foundation\Http\FormRequest;

/**
 * @OA\Schema(
 *      schema="updateProduct",
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
            'options.*' => ['sometimes'],
            'options.*.*' => ['sometimes'],
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
