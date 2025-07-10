<?php

namespace App\Http\Controllers\v1\categories;

use App\Http\Controllers\v1\ApiController;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class CategoryAdminController extends ApiController
{
    public function index(): JsonResponse
    {
        try {
            $validated = request()->validate([
                'name' => 'nullable|string|max:255',
                'is_active' => 'nullable|boolean',
                'user_id' => 'nullable|integer|exists:tbl_users,id',
            ]);
            $query = Category::query();

            // Apply filters if provided
            $query->when(isset($validated['name']),
                    fn($q) => $q->where('name', 'like', '%' . $validated['name'] . '%'))
                ->when(isset($validated['description']),
                    fn($q) => $q->where('description', 'like', '%' . $validated['description'] . '%'))
                ->when(isset($validated['is_active']),
                    fn($q) => $q->where('is_active', $validated['is_active']))
                ->when(isset($validated['user_id']),
                    fn($q) => $q->where('user_id', $validated['user_id']));

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
            $category = Category::findOrFail($id);
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

    public function store(StoreCategoryRequest $request): JsonResponse
    {
        try {
            $category = DB::transaction(function () use ($request) {
                $category = Category::create($request->validated());
                DB::commit();
                // Fixed inconsistent response structure
                return $category->fresh();
            });
            return response()->json([
                'success' => true,
                'message' => 'Create category successfully',
                'data' => new CategoryResource($category),
            ], 201);
            
        } catch (QueryException $e) {
            // Added specific handling for duplicate entries
            if ($e->errorInfo[1] == 1062) {
                return response()->json([
                    'success' => false,
                    'message' => 'Category name already exists'
                ], 400);
            }
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to create category',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(UpdateCategoryRequest $request, int $id): JsonResponse
    {
        try {
            $category = DB::transaction(function () use ($request, $id) {
                $category = Category::where('id', $id)
                ->lockForUpdate()
                ->findOrFail();
                $category->update($request->validated());
                return $category->fresh();
            });
                return response()->json([
                    'success' => true,
                    'message' => 'Category updated successfully',
                    'data' => new CategoryResource($category),
                ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Category not found'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update category',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy(int $id): JsonResponse
    {
        try {
            DB::transaction(function () use ($id) {
                $category = Category::withCount('products')->findOrFail($id);
                
                if ($category->products_count > 0) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Cannot delete category because it has associated products'
                    ], 409);
                }
                $category->delete();
            });
            
            return response()->json([
                'success' => true,
                'message' => 'Delete category successfully',
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Category not found'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete category',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
