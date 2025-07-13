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

    protected function prepareForValidation(): void
    {
        $this->merge([
            'user_id' => $this->user()->id,
        ]);
    }
}
