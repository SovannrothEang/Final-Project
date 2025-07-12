<?php

namespace App\Http\Controllers\v1\categories;

use App\Http\Controllers\v1\ApiController;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;

class CategoryController extends ApiController
{
    public function index(): JsonResponse
    {
        try {
            $validated = request()->validate([
                'search' => 'nullable|string|max:255',
                'sort_direction' => 'nullable|string|in:asc,desc',
            ]);
            $query = Category::query()->where('is_active', true);

            // Apply filters if provided
            if (isset($validated['search'])) {
                $query->where(fn ($q) => $q
                    ->where('name', 'like', '%' . $validated['search'] . '%')
                    ->orWhere('description', 'like', '%' . $validated['search'] . '%')
                );
            }
            $sortDirection = $validated['sort_direction'] ?? 'desc';
            $query->orderBy('created_at', $sortDirection);

            $categories = $query->get();
            // Check if any Brands were found
            if ($categories->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'No categories found'
                ], 200);
            }

            return response()->json([
                'success' => true,
                'data' => CategoryResource::collection($categories)
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch categories',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show(int $id) {
        try {
            $category = Category::where('is_active', true)->findOrFail($id);
            return response()->json([
                    'success' => true,
                    'message' => 'Get category by ID successfully',
                    'data' => new CategoryResource($category)
                ]);
        } catch (\Exception $e) {
            if($e instanceof ModelNotFoundException)
                return response()->json([
                        'success' => false,
                        'message' => 'Category is not found by id: ' . $id,
                        'error' => $e->getMessage(),
                    ],404);

            return response()->json([
                    'success' => false,
                    'message' => 'Internal error',
                    'error' => $e->getMessage(),
                ],500);
        }
    }
}