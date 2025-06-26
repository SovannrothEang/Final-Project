<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ValidProductOptions implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // 1. Check if value is an array
        if (!is_array($value)) {
            $fail('Options must be an array.');
            return;
        }

        // 2. Check if array is not empty
        if (empty($value)) {
            $fail('At least one option is required.');
            return;
        }

        // 3. Define allowed keys
        $allowedKeys = ['color', 'size'];

        // 4. Check for invalid keys
        $givenKeys = array_keys($value);
        $invalidKeys = array_diff($givenKeys, $allowedKeys);
        
        if (!empty($invalidKeys)) {
            $fail("Only '" . implode("', '", $allowedKeys) . "' are allowed as option keys. Found invalid keys: " . implode(", ", $invalidKeys));
            return;
        }

        // 5. Validate each option
        foreach ($value as $key => $items) {
            // Check if items is an array
            if (!is_array($items)) {
                $fail("The value for '$key' must be an array of strings.");
                return;
            }

            // Check if items array is not empty
            if (empty($items)) {
                $fail("At least one item is required for '$key'.");
                return;
            }

            // Check if all items are strings
            if (!empty(array_filter($items, fn($item) => !is_string($item)))) {
                $fail("All items in '$key' must be strings.");
                return;
            }

            // Check for duplicate items
            if (count($items) !== count(array_unique($items))) {
                $fail("Duplicate values are not allowed in '$key'.");
                return;
            }
        }
    }
}
