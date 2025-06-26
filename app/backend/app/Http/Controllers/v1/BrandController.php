<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBrandRequest;
use App\Http\Requests\UpdateBrandRequest;
use App\Models\Brand;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BrandController extends Controller
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
            $query = Brand::query();

            // Apply filters if provided
            if ($name = request('name')) {
                $query->where('name', 'like', '%' . $name . '%');
            }

            if ($country = request('country')) {
                $query->where('country', 'like', '%' . $country . '%');
            }

            if ($isActive = request('is_active')) {
                $query->where('is_active', $isActive);
            }

            if ($userId = request('user_id')) {
                $query->where('user_id', $userId);
            }

            $brands = $query->get();

            // Check if any products were found
            if ($brands->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'No brands found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $brands
            ]);
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
        }
    }

    /**
     *  @OA\Post(
     *     path="/api/v1/brands",
     *     summary="Create a new brand",
     *     tags={"Brands"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/storeBrandRequest")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Brand created successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Brand created successfully"),
     *             @OA\Property(property="data", ref="#/components/schemas/brand")
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Validation error"),
     *             @OA\Property(property="errors", type="object")
     *         )
     *     )
     * )
     */
    public function store(StoreBrandRequest $request)
    {
        try {
            $brand = Brand::create($request->validated());
            
            return response()->json([
                'success' => true,
                'message' => 'Brand created successfully',
                'data' => $brand
            ], 201);
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
                'message' => 'Failed to create brand',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     *  @OA\Put(
     *     path="/api/v1/brands/{id}",
     *     summary="Update a brand",
     *     tags={"Brands"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Brand ID",
     *         @OA\Schema(type="integer", format="int64")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/updateBrandRequest")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Brand updated successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Brand updated successfully"),
     *             @OA\Property(property="data", ref="#/components/schemas/brand")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Brand not found",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Brand not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Validation error"),
     *             @OA\Property(property="errors", type="object")
     *         )
     *     )
     * )
     */
    public function update(UpdateBrandRequest $request, int $id): JsonResponse
    {
        try {
            DB::transaction(function () use ($request, $id) {
            $brand = Brand::where('id', $id)->lockForUpdate()->firstOrFail();
            $brand->update($request->validated());
        });

            return response()->json([
                'success' => true,
                'message' => 'Brand updated successfully.',
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

    /**
     *  @OA\Delete(
     *     path="/api/v1/brands/{id}",
     *     summary="Delete a brand",
     *     tags={"Brands"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Brand ID",
     *         @OA\Schema(type="integer", format="int64")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Brand deleted successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Brand deleted successfully")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Brand not found",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Brand not found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Server error",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Failed to delete brand"),
     *             @OA\Property(property="error", type="string")
     *         )
     *     )
     *  )
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            $brand = Brand::findOrFail($id);
            $brand->delete();

            return response()->json([
                'success' => true,
                'message' => 'Brand deleted successfully'
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Brand not found'
            ], 404);
        } catch (\Illuminate\Database\QueryException $e) {
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
