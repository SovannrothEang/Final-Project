<?php

namespace App\Http\Requests\AboutPage;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreAboutPageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'main_detail' => 'required|string|max:255',
            'sub_detail' => 'required|array',
            'sub_detail.*.title' => 'required|string|max:255',
            'sub_detail.*.description' => 'required|string',
            'total_brands' => 'required|integer|min:0',
            'total_products' => 'required|integer|min:0',
            'total_sales' => 'required|integer|min:0',
            'yearly_sale' => 'required|array',
            'yearly_sale.*.year' => 'required|integer|min:1900|max:' . (date('Y') + 1),
            'yearly_sale.*.amount' => 'required|numeric|min:0',
            'monthly_sale' => 'required|array',
            'monthly_sale.*.month' => 'required|string|max:20',
            'monthly_sale.*.amount' => 'required|numeric|min:0',
            'total_reviews' => 'required|integer|min:0',
            'average_rating' => 'required|numeric|min:0|max:5',
            'monthly_visitors' => 'required|integer|min:0',
            'years_in_operation' => 'required|integer|min:0',
            'user_id' => 'required|integer|exists:tbl_users,id',
        ];
    }

    public function messages(): array
    {
        return [
            'main_detail.required' => 'The main detail field is required.',
            'main_detail.string' => 'The main detail must be a string.',
            'main_detail.max' => 'The main detail may not be greater than :max characters.',
            'sub_detail.required' => 'The sub detail field is required.',
            'sub_detail.array' => 'The sub detail must be an array.',
            'sub_detail.*.title.required' => 'Each sub detail title is required.',
            'sub_detail.*.title.string' => 'Each sub detail title must be a string.',
            'sub_detail.*.title.max' => 'Each sub detail title may not be greater than :max characters.',
            'sub_detail.*.description.required' => 'Each sub detail description is required.',
            'sub_detail.*.description.string' => 'Each sub detail description must be a string.',
            'total_brands.required' => 'The total brands field is required.',
            'total_brands.integer' => 'The total brands must be an integer.',
            'total_brands.min' => 'The total brands must be at least :min.',
            'total_products.required' => 'The total products field is required.',
            'total_products.integer' => 'The total products must be an integer.',
            'total_products.min' => 'The total products must be at least :min.',
            'total_sales.required' => 'The total sales field is required.',
            'total_sales.integer' => 'The total sales must be an integer.',
            'total_sales.min' => 'The total sales must be at least :min.',
            'yearly_sale.required' => 'The yearly sale field is required.',
            'yearly_sale.array' => 'The yearly sale must be an array.',
            'yearly_sale.*.year.required' => 'Each yearly sale year is required.',
            'yearly_sale.*.year.integer' => 'Each yearly sale year must be an integer.',
            'yearly_sale.*.year.min' => 'Each yearly sale year must be at least :min.',
            'yearly_sale.*.year.max' => 'Each yearly sale year may not be greater than :max.',
            'yearly_sale.*.amount.required' => 'Each yearly sale amount is required.',
            'yearly_sale.*.amount.numeric' => 'Each yearly sale amount must be a number.',
            'yearly_sale.*.amount.min' => 'Each yearly sale amount must be at least :min.',
            'monthly_sale.required' => 'The monthly sale field is required.',
            'monthly_sale.array' => 'The monthly sale must be an array.',
            'monthly_sale.*.month.required' => 'Each monthly sale month is required.',
            'monthly_sale.*.month.string' => 'Each monthly sale month must be a string.',
            'monthly_sale.*.month.max' => 'Each monthly sale month may not be greater than :max characters.',
            'monthly_sale.*.amount.required' => 'Each monthly sale amount is required.',
            'monthly_sale.*.amount.numeric' => 'Each monthly sale amount must be a number.',
            'monthly_sale.*.amount.min' => 'Each monthly sale amount must be at least :min.',
            'total_reviews.required' => 'The total reviews field is required.',
            'total_reviews.integer' => 'The total reviews must be an integer.',
            'total_reviews.min' => 'The total reviews must be at least :min.',
            'average_rating.required' => 'The average rating field is required.',
            'average_rating.numeric' => 'The average rating must be a number.',
            'average_rating.min' => 'The average rating must be at least :min.',
            'average_rating.max' => 'The average rating may not be greater than :max.',
            'monthly_visitors.required' => 'The monthly visitors field is required.',
            'monthly_visitors.integer' => 'The monthly visitors must be an integer.',
            'monthly_visitors.min' => 'The monthly visitors must be at least :min.',
            'years_in_operation.required' => 'The years in operation field is required.',
            'years_in_operation.integer' => 'The years in operation must be an integer.',
            'years_in_operation.min' => 'The years in operation must be at least :min.',
            'user_id.required' => 'The user ID field is required.',
            'user_id.integer' => 'The user ID must be an integer.',
            'user_id.exists' => 'The selected user ID is invalid.',
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'user_id' => $this->user()->id,
        ]);
    }
}
