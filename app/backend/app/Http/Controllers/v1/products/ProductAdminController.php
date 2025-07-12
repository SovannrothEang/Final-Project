<?php

namespace App\Http\Controllers\v1\products;

use App\Http\Controllers\v1\ApiController;
use App\Http\Requests\Products\StoreProductRequest;
use App\Http\Requests\Products\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Log;

class ProductAdminController extends ApiController
{
    /**
     * 
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
            $query = Product::query();
            // Search
            if (isset($validated['search'])) {
                $query->where(fn ($q) => $q
                    ->where('name', 'like', '%' . $validated['search'] . '%')
                    ->orWhere('short_description', 'like', '%' . $validated['search'] . '%')
                    ->orWhere('description', 'like', '%' . $validated['search'] . '%')
                );
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
     * 
     */
    public function show(int $id) : JsonResponse
    {
        try {
            $product = Product::with(['category', 'brand'])
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
            return response()->json([
                    'success' => false,
                    'message' => 'Internal error',
                    'error' => $e->getMessage(),
                ],500);
        }
    }
    /**
     * 
     */
    public function store(StoreProductRequest $request) : JsonResponse
    {
        DB::beginTransaction();
        try {
            $validated = $request->validated();
            $product = Product::create($validated);

            // if ($request->has('category_id')) {
            //     $product->category()->sync($request->input('categort_id'));
            // }

            DB::commit();
            Log::info('Product created successfully', ['product_id' => $product->id]);
            return response()->json([
                'success' => true,
                'message' => 'Create product successfully!',
                'data' => $product,
            ], 201);
        } catch (ValidationException $e) {
            DB::rollBack();
            Log::warning('Product creation validation failed', ['errors' => $e->errors()]);
            
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $e->errors()
            ], 422);

        } catch (QueryException $e) {
            DB::rollBack();
            Log::error('Product creation database error', [
                'error' => $e->getMessage(),
                'code' => $e->getCode()
            ]);
            return response()->json([
                'success' => false,
                'message' => 'Database error occurred',
                'error' => config('app.debug') ? $e->getMessage() : 'Please try again later'
            ], 500);

        } catch (QueryException $e) {
            DB::rollBack();
            Log::error('Product creation failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'success' => false,
                'message' => 'Database error',
                'error' =>  $e->getMessage(),
            ], 500);
        }
    }
    /**
     *  Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, int $id) : JsonResponse
    {
        DB::beginTransaction();
        try {
            $product = Product::with(['category', 'brand'])->lockForUpdate()->findOrFail($id);
            // DB::table('tbl_products')->where('id', $id)->lockForUpdate()->get();
            $validated = $request->validated();
            $product ->update($validated);
            if ($request->has('category_id')) { // maybe will lead to an error if since the input is string
                $categoryId = (int)$request->input('category_id');
                $product->category()->sync([$categoryId]);
            }
            DB::commit();
            Log::info("Product updated successfully", [
                'product_id' => $id,
                'updated_fields' => array_keys($validated)
            ]);
            return response()->json([
                'success' => true,
                'message' => 'Update product successfully!',
            ]);
        } catch (ModelNotFoundException $e) {
            DB::rollBack();
            Log::warning("Product not found for update", ['product_id' => $id]);
            
            return response()->json([
                'success' => false,
                'message' => 'Product not found',
                'error' => 'No product found with ID: ' . $id
            ], 404);

        } catch (ValidationException $e) {
            DB::rollBack();
            Log::warning('Product update validation failed', ['errors' => $e->errors()]);
            
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $e->errors()
            ], 422);

        } catch (QueryException $e) {
            DB::rollBack();
            Log::error('Product update database error', [
                'product_id' => $id,
                'error' => $e->getMessage(),
                'code' => $e->getCode()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Database error occurred',
                'error' => config('app.debug') ? $e->getMessage() : 'Please try again later'
            ], 500);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Product update failed', [
                'product_id' => $id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to update product',
                'error' => config('app.debug') ? $e->getMessage() : 'An unexpected error occurred'
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id) : JsonResponse
    {
        DB::beginTransaction();
        try {
            $product = Product::with(['category', 'brand'])
                ->lockForUpdate()
                ->findOrFail($id);
            // Checking when implement the order
            // if ($product->orders()->exists()) {
            //     throw new \Exception('Cannot delete product with associated orders');
            // }
            $product->delete();
            DB::commit();
            Log::info("Product deleted successfully", ['product_id' => $id]);
            return response()->json([
                'success' => true,
                'message' => 'Delete product successfully!'
            ]);
        } catch (ModelNotFoundException $e) {
            DB::rollBack();
            Log::warning("Product not found for deletion", ['product_id' => $id]);
            
            return response()->json([
                'success' => false,
                'message' => 'Product not found',
                'error' => 'No product found with ID: ' . $id
            ], 404);

        } catch (QueryException $e) {
            DB::rollBack();
            Log::error('Product deletion database error', [
                'product_id' => $id,
                'error' => $e->getMessage(),
                'code' => $e->getCode()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Database error occurred',
                'error' => config('app.debug') ? $e->getMessage() : 'Please try again later'
            ], 500);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Product deletion failed', [
                'product_id' => $id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to delete product',
                'error' => config('app.debug') ? $e->getMessage() : $e->getMessage() // Show specific error for business rules
            ], 409); // 409 Conflict for business rule violations
        }
    }
}
