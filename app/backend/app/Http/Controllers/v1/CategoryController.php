<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoryRequest;
use App\Models\Category;
use Illuminate\Http\JsonResponse;

/**
 *  @OA\Schema(
 *     schema="category",
 *     required={"name"},
 *     @OA\Property(property="id", type="integer", format="int64", description="Category ID"),
 *     @OA\Property(property="name", type="string", description="Category name"),
 *     @OA\Property(property="created_at", type="string", format="date-time", description="Creation timestamp"),
 *     @OA\Property(property="updated_at", type="string", format="date-time", description="Last update timestamp")
 * )
 */
class CategoryController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/v1/categories",
     *     summary="Get all categories",
     *     tags={"Categories"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="data", type="array", 
     *                 @OA\Items(ref="#/components/schemas/Category")
     *             )
     *         )
     *     )
     */
    public function index(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => Category::all()
        ]);
    }

    /**
     *  @OA\Post(
     *     path="/api/v1/categories",
     *     summary="Create a new category",
     *     tags={"Categories"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/storeCategoryRequest")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Category created successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Create category successfully")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Failed to create category",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Failed to create category!")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server error",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Something happened in Creating category"),
     *             @OA\Property(property="errors", type="string")
     *         )
     *     )
     */
    public function store(StoreCategoryRequest $request): JsonResponse
    {
        try {
            $validated = $request->validated();
            $category = Category::create($validated);
            if ($category)
                return response()->json([
                    'success' => true,
                    'message' => 'Create category successfully',
                ], 201);

                return response()->json([
                    'success' => false,
                    'message' => 'Failed to create category!',
                ], 400);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Something happened in Creating category',
                'errors' => $e->getMessage()
            ], 500);
        }
    }

    /**
     *  @OA\Delete(
     *     path="/api/v1/categories/{id}",
     *     summary="Delete a category",
     *     tags={"Categories"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Category ID",
     *         @OA\Schema(type="integer", format="int64")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Category deleted successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Delete category successfully")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Category not found",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Category is not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server error",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Something happened in Deleting category"),
     *             @OA\Property(property="errors", type="string")
     *         )
     *     )
     */
    public function destroy(int $id): JsonResponse
    {
        $category = Category::where('id', $id)->firstOrFail();
        if ($category === null)
            return response()->json([
                    'success' => false,
                    'message' => 'Category is not found',
                ], 404);

        $category->delete();
        return response()->json([
                    'success' => true,
                    'message' => 'Delete category successfully',
                ], 200);
    }
}
