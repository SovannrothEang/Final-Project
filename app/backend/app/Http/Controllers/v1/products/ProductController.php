<?php

namespace App\Http\Controllers\v1\products;

use App\Http\Controllers\v1\ApiController;
use App\Http\Requests\Products\StoreProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ProductController extends ApiController
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        try {
            $validated = request()->validate([
                'search' => 'nullable|string|max:255',
                'category_id' => 'nullable|integer|exists:tbl_categories,id',
                'brand_id' => 'nullable|integer|exists:tbl_brands,id',
                'status' => 'nullable|integer|in:0,1,2',
                'price_range' => 'nullable|array',
                'price_range.min' => 'nullable|numeric|min:0',
                'price_range.max' => 'nullable|numeric|min:0',
                'date_range' => 'nullable|array',
                'date_range.start' => 'nullable|date',
                'date_range.end' => 'nullable|date',
                'sort_by' => 'nullable|string|in:name,price,created_at',
                'sort_direction' => 'nullable|string|in:asc,desc',
                'per_page' => 'nullable|integer|min:1|max:100',
            ]);
            $query = Product::query()->where('is_active', true);
            // Search
            if (isset($validated['search'])) {
                $query->where(function ($q) use ($validated) {
                    $q->where('name', 'like', '%' . $validated['search'] . '%')
                    ->orWhere('description', 'like', '%' . $validated['search'] . '%');
                });
            }

            // Filter
            $query->when(isset($validated['brand_id']), fn($q) =>
                    $q->where('brand_id', $validated['brand_id']))
                ->when(isset($validated['category_id']), fn($q) =>
                    $q->where('category_id', $validated['category_id']))
                ->when(isset($validated['status']), fn($q) =>
                    $q->where('status', $validated['status']));

            // Price range
            if (isset($validated['price_range'])) {
                $query->when(isset($validated['price_range']['min']),
                        fn($q) => $q->where('price', '>=', $validated['price_range']['min']))
                    ->when(isset($validated['price_range']['max']), 
                        fn($q) => $q->where('price', '<=', $validated['price_range']['max']));
            }
            if (isset($validated['max_price'])) {
                $query->where('price', '<=', $validated['max_price']);
            }

            // Date range
            if (isset($validated['date_range'])) {
                $query->when(isset($validated['date_range']['start']), 
                    fn($q) => $q->whereDate('created_at', '>=', $validated['date_range']['start']))
                    ->when(isset($validated['date_range']['end']), 
                    fn($q) => $q->whereDate('created_at', '<=', $validated['date_range']['end']));
            }
            // Sorting
            $sortBy = $validated['sort_by'] ?? 'created_at';
            $sortDirection = $validated['sort_direction'] ?? 'desc';
            $query->orderBy($sortBy, $sortDirection);

            // Pagination
            $perPage = $validated['per_page'] ?? 15;
            $products = $query->paginate($perPage);

            // If empty
            if ($products->isEmpty()) {
                return response()->json([
                    'success' => true,
                    'message' => 'No products found',
                    'data' => [],
                    'meta' => [
                        'current_page' => $products->currentPage(),
                        'last_page' => $products->lastPage(),
                        'per_page' => $products->perPage(),
                        'total' => $products->total()
                    ]
                ]);
            }

            return response()->json([
                'success' => true,
                'data' => ProductResource::collection($products),
                'meta' => [
                    'current_page' => $products->currentPage(),
                    'last_page' => $products->lastPage(),
                    'per_page' => $products->perPage(),
                    'total' => $products->total(),
                    'from' => $products->firstItem(),
                    'to' => $products->lastItem(),
                    'sort' => [
                        'by' => $sortBy,
                        'direction' => $sortDirection
                    ],
                    'filters' => $validated
                ]
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
     * Display the specified resource.
     */
    public function show(int $id) : JsonResponse
    {
        try {
            $product = Product::with(['category', 'brand'])
                ->where('is_active', true)
                ->findOrFail($id);
            return response()->json([
                    'success' => true,
                    'message' => 'Get product by ID successfully!',
                    'data' => new ProductResource($product)
                ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found',
                'error' => 'No product found with ID: ' . $id
            ], 404);

        } catch (QueryException $e) {
            Log::error('Product fetch error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Database error occurred',
                'error' => 'Please try again later'
            ], 500);

        } catch (\Exception $e) {
            Log::error('Product fetch error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Internal error',
                'error' => $e->getMessage(),
            ],500);
        }
    }

    public function vote(int $id, Request $request) : JsonResponse
    {
        try {
            DB::transaction(function () use ($id, $request) {
                $validated = $request->validate([
                    'stars' => 'required|integer|min:1|max:5'
                ]);
                // rating rating_count reviews
                $product = Product::where('is_active', true)->findOrFail($id);
                $product->increment('rating', $validated['stars']);
                $product->increment('reviews');
                $product->save();
            });
            return response()->json([
                'success' => true,
                'message' => 'update review'
            ]);
        } catch (ModelNotFoundException $e) {
        return response()->json([
            'success' => false,
            'message' => 'Product not found',
            'error' => 'No product found with ID: ' . $id
        ], 404);

        } catch (QueryException $e) {
            Log::error('Product fetch error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Database error occurred',
                'error' => 'Please try again later'
            ], 500);

        } catch (\Exception $e) {
            Log::error('Product fetch error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Internal error',
                'error' => $e->getMessage(),
            ],500);
        }
    }
}
