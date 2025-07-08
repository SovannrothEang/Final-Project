<?php

namespace App\Http\Requests\Products;

use App\Rules\ValidProductOptions;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

/**
 *  @OA\Schema(
 *       schema="storeProduct",
 *       required={"name", "brand", "price", "quantity", "options", "category_id", "stock", "user_id"},
 *      @OA\Property(property="name", type="string", description="Product name"),
 *      @OA\Property(property="brand", type="string", description="Product brand"),
 *      @OA\Property(property="price", type="number", format="float", description="Product price"),
 *      @OA\Property(property="category_id", type="integer", description="Category ID"),
 *      @OA\Property(property="description", type="string", description="Product description", nullable=true),
 *      @OA\Property(property="short_description", type="string", description="Short product description", nullable=true),
 *      @OA\Property(property="stock", type="integer", description="Stock quantity", example=10),
 *      @OA\Property( property="options", type="object", description="Available product options (color, size, etc.)",
 *          example={
 *              "color": {"red", "blue"},
 *              "size": {"small", "medium"}
 *          }),
 *      @OA\Property(property="discount", type="integer", description="Discount percentage", nullable=true, example=10),
 *      @OA\Property(property="is_top", type="boolean", description="Is top product flag", nullable=true),
 *      @OA\Property(property="status", type="string", description="Product status", nullable=true, enum={"available", "out_of_stock", "discontinued"}),
 *      @OA\Property(property="rating", type="integer", description="Product rating", nullable=true, example=5),
 *      @OA\Property(property="reviews", type="integer", description="Number of reviews", nullable=true, example=10)
 *  )
 */ 

class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
        // return auth()->check();
        // return $this->user()->can('create', Product::class);
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
            'brand_id' => 'required|integer|exists:tbl_brands,id',
            'price' => 'required|numeric|min:0.01',
            'category_id' => 'required|integer|exists:tbl_categories,id',
            'description' => 'nullable|string|max:255',
            'short_description' => 'nullable|string|max:255',
            'stock' => 'required|integer|min:1',
            'options' => [
                'required',
                new ValidProductOptions(),
            ],
            'discount' => 'nullable|integer',
            'is_top' => 'nullable|boolean',
            'is_active' => 'nullable|boolean',
            'status' => 'nullable|string',
            'rating' => 'nullable|integer',
            'reviews' => 'nullable|integer',
            'user_id' => 'required|integer|exists:tbl_users,id',
        ];
    }
    /**
     * Get custom error messages
     */
    public function messages(): array
    {
        return [
        'name.required' => 'Product name is required',
        'name.string' => 'Product name must be a string',
        'name.max' => 'Product name must not exceed 255 characters',
        
        'brand_id.required' => 'Brand is required',

        'category_id.required' => 'Category is required',
        
        'price.required' => 'Price is required',
        'price.numeric' => 'Price must be a number',
        'price.min' => 'Price must be at least 0.01',
        
        'description.string' => 'Description must be a string',
        'description.max' => 'Description must not exceed 255 characters',
        
        'short_description.string' => 'Short description must be a string',
        'short_description.max' => 'Short description must not exceed 255 characters',
        
        'stock.required' => 'Stock quantity is required',
        'stock.integer' => 'Stock must be an integer',
        'stock.min' => 'Stock must be at least 1',
        
        'options.required' => 'Product options are required',
        
        'discount.integer' => 'Discount must be an integer',
        
        'is_top.integer' => 'Top product flag must be an integer',
        
        'status.string' => 'Status must be a string',
        
        'rating.integer' => 'Rating must be an integer',
        
        'reviews.integer' => 'Reviews count must be an integer',
        
        'user_id.required' => 'User ID is required',
        'user_id.integer' => 'User ID must be an integer',
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
