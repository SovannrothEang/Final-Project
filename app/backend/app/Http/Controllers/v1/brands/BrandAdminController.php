<?php

namespace App\Http\Controllers\v1\brands;

use App\Http\Controllers\v1\ApiController;
use App\Http\Requests\StoreBrandRequest;
use App\Http\Requests\UpdateBrandRequest;
use App\Http\Resources\BrandResource;
use App\Models\Brand;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class BrandAdminController extends ApiController
{
    /**
     *  @OA\Get(
     *     path="/api/v1/brands",
     *     summary="Get all brands",
     *     tags={"Brands"},
     *     @OA\Parameter(
     *         name="name",
     *         in="query",
     *         description="Filter by brand name (partial match)",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="country",
     *         in="query",
     *         description="Filter by country of origin",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="is_active",
     *         in="query",
     *         description="Filter by active status",
     *         required=false,
     *         @OA\Schema(type="boolean")
     *     ),
     *     @OA\Parameter(
     *         name="user_id",
     *         in="query",
     *         description="Filter by user ID who created the brand",
     *         required=false,
     *         @OA\Schema(type="integer", format="int64")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="data", type="array",
     *                 @OA\Items(ref="#/components/schemas/brand")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="No brands found",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="No brands found")
     *         )
     *     )
     *  )
     */
    public function index(): JsonResponse
    {
        try {
            $validated = request()->validate([
                'name' => 'nullable|string|max:255',
                'country' => 'nullable|string|max:100',
                'is_active' => 'nullable|boolean',
                'user_id' => 'nullable|integer|exists:tbl_users,id',
            ]);
            $query = Brand::query();

            // Apply filters if provided
            $query->when(isset($validated['name']),
                    fn($q) => $q->where('name', 'like', '%' . $validated['name'] . '%'))
                ->when(isset($validated['country']),
                    fn($q) => $q->where('country', 'like', '%' . $validated['country'] . '%'))
                ->when(isset($validated['is_active']),
                    fn($q) => $q->where('is_active', $validated['is_active']))
                ->when(isset($validated['user_id']),
                    fn($q) => $q->where('user_id', $validated['user_id']));

            $brands = $query->get();
            // Check if any Brands were found
            if ($brands->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'No brands found'
                ], 200);
            }

            return response()->json([
                'success' => true,
                'data' => BrandResource::collection($brands)
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $e->errors()
            ], 422);
        } catch (QueryException $e) {
            if ($e->getCode() == 23000) {
                return response()->json([
                    'success' => false,
                    'message' => 'Foreign key constraint violation'
                ], 409);
            }

            return response()->json([
                'success' => false,
                'message' => 'Database error'
            ], 500);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Internal server error',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show(int $id) {
        try {
            $brand = Brand::findOrFail($id);
            return response()->json([
                    'success' => true,
                    'message' => 'Get brand by ID successfully',
                    'data' => new BrandResource($brand)
                ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Brand not found',
                'error' => 'No brand found with ID: ' . $id
            ], 404);

        } catch (QueryException $e) {
            Log::error('Brand fetch error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Database error occurred',
                'error' => 'Please try again later'
            ], 500);

        } catch (\Exception $e) {
            if($e instanceof ModelNotFoundException)
                return response()->json([
                        'success' => false,
                        'message' => 'Brand is not found by id: ' . $id,
                        'error' => $e->getMessage(),
                    ],404);

            return response()->json([
                    'success' => false,
                    'message' => 'Internal error',
                    'error' => $e->getMessage(),
                ],500);
        }
    }

    public function store(StoreBrandRequest $request)
    {
        DB::beginTransaction();
        try {
            $brand = Brand::create($request->validated());
            DB::commit();
            return response()->json([
                'success' => true,
                'message' => 'Brand created successfully',
                'data' => $brand
            ], 201);
        } catch (ValidationException $e) {
            DB::rollBack();
            Log::warning('Brand creation validation failed', ['errors' => $e->errors()]);
            
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $e->errors()
            ], 422);

        } catch (QueryException $e) {
            DB::rollBack();
            Log::error('Brand creation database error', [
                'error' => $e->getMessage(),
                'code' => $e->getCode()
            ]);
            if ($e->errorInfo[1] == 1062) {
                return response()->json([
                    'success' => false,
                    'message' => 'Category name already exists'
                ], 400);
            }

            return response()->json([
                'success' => false,
                'message' => 'Database error occurred',
                'error' => config('app.debug') ? $e->getMessage() : 'Please try again later'
            ], 500);
        }
    }

    public function update(UpdateBrandRequest $request, int $id): JsonResponse
    {
        try {
            $brand = DB::transaction(function () use ($request, $id) {
                $brand = Brand::where('id', $id)->lockForUpdate()->firstOrFail();
                $brand->update($request->validated());
                return $brand->fresh();
            });

            return response()->json([
                'success' => true,
                'message' => 'Brand updated successfully.',
                'data' => new BrandResource($brand),
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Brand not found.',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update brand due to a conflict. Please try again.',
            ], 409);
        }
    }

    public function destroy(int $id): JsonResponse
    {
        try {
            DB::transaction(function () use ($id) {
                $brand = Brand::withCount('products')->findOrFail($id);
                if ($brand->products_count > 0) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Cannot delete brand because it has associated products'
                    ], 409);
                }
                $brand->delete();
            });
            return response()->json([
                'success' => true,
                'message' => 'Brand deleted successfully'
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Brand not found'
            ], 404);
        } catch (QueryException $e) {
            if ($e->errorInfo[1] == 1451) {
                return response()->json([
                    'success' => false,
                    'message' => 'Cannot delete brand: it is being used by other records'
                ], 409);
            }

            return response()->json([
                'success' => false,
                'message' => 'Database error while deleting brand'
            ], 500);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Unexpected error occurred',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }
}
