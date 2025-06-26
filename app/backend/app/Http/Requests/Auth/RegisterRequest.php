<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * @OA\Schema(
 *   schema="registerRequest",
 *   required={"name", "email", "password"},
 *   @OA\Property(
 *     property="name",
 *     type="string",
 *     description="Enter name for the account"
 *   ),
 *   @OA\Property(
 *     property="email",
 *     type="string",
 *     description="Enter email for the account"
 *   ),
 *   @OA\Property(
 *     property="password",
 *     type="string",
 *     description="Enter the password"
 *   )
 * )
 */

class RegisterRequest extends FormRequest
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
            'name' => 'required|string|min:4',
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('tbl_users', 'email')],
            'password' => 'required|string|min:8',
        ];
    }
    public function messages(): array
    {
        return [
            'name.required' => 'Name is required',
            'email.required' => 'Email is required',
            'password.required' => 'Password is required'
        ];
    }
}
