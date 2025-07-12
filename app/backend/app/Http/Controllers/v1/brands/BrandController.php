<?php

namespace App\Http\Controllers\v1\brands;

use App\Http\Controllers\v1\ApiController;
use App\Http\Resources\BrandResource;
use App\Models\Brand;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class BrandController extends ApiController
{
    public function index(): JsonResponse
    {
        try {
            $validated = request()->validate([
                'search' => 'nullable|string|max:255',
                'country' => 'nullable|string|max:100',
                'sort_direction' => 'nullable|string|in:asc,desc',
            ]);
            $query = Brand::query()->where('is_active', true);

            // Apply filters if provided
            if (isset($validated['search'])) {
                $query->where(fn ($q) => $q
                    ->where('name', 'like', '%' . $validated['search'] . '%')
                    ->orWhere('description', 'like', '%' . $validated['search'] . '%')
                );
            }
            $query->when(isset($validated['country']),
                fn($q) => $q->where('country', 'like', '%' . $validated['country'] . '%'));

            $sortDirection = $validated['sort_direction'] ?? 'desc';
            $query->orderBy('created_at', $sortDirection);

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
            $brand = Brand::where('is_active')->findOrFail($id);
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
            return response()->json([
                'success' => false,
                'message' => 'Internal error',
                'error' => $e->getMessage(),
            ],500);
        }
    }
}