<?php

namespace App\Http\Requests\Products;

use App\Rules\ValidProductOptions;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

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
    public function authorize(): bool
    {
        return Auth::check();
        // return auth()->check();
        // return $this->user()->can('update', Product::class);

        // Only product owner can update
        // $product = Product::find($this->route('id'));
        // return $product && $this->user()->id === $product->user_id;
    }

    /**
     * Determine if the user is authorized to make this request.
     */
    public function rules(): array
    {
        return [
            'name' => 'sometimes|string|max:255',
            'brand_id' => 'sometimes|integer|exists:tbl_brands,id',
            'price' => 'sometimes|numeric|min:0.01',
            'description' => 'sometimes|nullable|string|max:255',
            'short_description' => 'sometimes|nullable|string|max:255',
            'category_id' => 'sometimes|integer|exists:tbl_categories,id',
            'stock' => 'sometimes|integer|min:0',
            'options' => [
                'sometimes',
                new ValidProductOptions(),
            ],
            'discount' => 'sometimes|nullable|integer',
            'is_top' => 'sometimes|nullable|boolean',
            'is_active' => 'sometimes|sometimes|boolean',
            'status' => 'sometimes|nullable|string',
            'rating' => 'sometimes|nullable|integer',
            'reviews' => 'sometimes|nullable|integer',
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
            
            'brand_id.integer' => 'Brand id must be an integer',

            'category_id.integer' => 'Category id must be an integer',
            
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
