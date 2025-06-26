<?php

namespace App\Http\Requests\Products;

use App\Rules\ValidProductOptions;
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
            'brand' => 'sometimes|string|max:255',
            'price' => 'sometimes|numeric|min:0.01',
            'description' => 'nullable|string|max:255',
            'short_description' => 'nullable|string|max:255',
            'stock' => 'sometimes|integer|min:1',
            'options' => [
                'sometimes',
                new ValidProductOptions(),
            ],
            'discount' => 'nullable|integer',
            'is_top' => 'nullable|boolean',
            'status' => 'nullable|string',
            'rating' => 'nullable|integer',
            'reviews' => 'nullable|integer',
        ];
    }
    /**
     * Get custom error messages
     */
    public function messages(): array
    {
        return [
            'name.string' => 'Product name must be a string',
            'name.max' => 'Product name must not exceed 255 characters',
            
            'brand.string' => 'Brand name must be a string',
            'brand.max' => 'Brand name must not exceed 255 characters',
            
            'price.numeric' => 'Price must be a number',
            'price.min' => 'Price must be at least 0.01',
            
            'description.string' => 'Description must be a string',
            'description.max' => 'Description must not exceed 255 characters',
            
            'short_description.string' => 'Short description must be a string',
            'short_description.max' => 'Short description must not exceed 255 characters',
            
            'stock.integer' => 'Stock must be an integer',
            'stock.min' => 'Stock must be at least 1',
            
            'options.*' => 'Invalid product options format',
        ];
    }
}
