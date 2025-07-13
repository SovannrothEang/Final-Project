<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreContactRequest extends FormRequest
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
            'address' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'description' => 'nullable|string|max:255',
            'user_id' => 'required|integer|exists:tbl_users,id',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'address.required' => 'The address field is mandatory.',
            'address.max' => 'The address cannot exceed 255 characters.',
            'email.required' => 'The email field is mandatory.',
            'email.email' => 'Please enter a valid email address.',
            'email.max' => 'The email cannot exceed 255 characters.',
            'phone.required' => 'The phone number field is mandatory.',
            'phone.string' => 'The phone number must be a string.',
            'phone.max' => 'The phone number cannot exceed 20 characters.',
            'user_id.required' => 'The user ID is required.',
            'user_id.integer' => 'The user ID must be an integer.',
            'user_id.exists' => 'The selected user ID does not exist.',
            'social_medias.array' => 'The social medias must be an array.',
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'user_id' => $this->user()->id,
        ]);
    }
}
