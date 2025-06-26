<?php

namespace App\Http\Controllers\v1;

use App\Http\Requests\Products\StoreProductRequest;
use App\Http\Requests\Products\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Exception;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\JsonResponse;

/**
 *  @OA\Schema(
 *     schema="productPagination",
 *     type="object",
 *     @OA\Property(property="current_page", type="integer", example=1),
 *     @OA\Property(property="data", type="array",
 *         @OA\Items(ref="#/components/schemas/product")
 *     ),
 *     @OA\Property(property="first_page_url", type="string", example="http://api.example.com/api/v1/products?page=1"),
 *     @OA\Property(property="from", type="integer", example=1),
 *     @OA\Property(property="last_page", type="integer", example=10),
 *     @OA\Property(property="last_page_url", type="string", example="http://api.example.com/api/v1/products?page=10"),
 *     @OA\Property(property="links", type="array",
 *         @OA\Items(
 *             @OA\Property(property="url", type="string", nullable=true),
 *             @OA\Property(property="label", type="string"),
 *             @OA\Property(property="active", type="boolean")
 *         )
 *     ),
 *     @OA\Property(property="next_page_url", type="string", nullable=true, example="http://api.example.com/api/v1/products?page=2"),
 *     @OA\Property(property="path", type="string", example="http://api.example.com/api/v1/products"),
 *     @OA\Property(property="per_page", type="integer", example=15),
 *     @OA\Property(property="prev_page_url", type="string", nullable=true),
 *     @OA\Property(property="to", type="integer", example=15),
 *     @OA\Property(property="total", type="integer", example=150)
 * )
 */
class ProductController extends ApiController
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    /**
     *  @OA\Get(
     *     path="/api/v1/products",
     *     summary="Display a listing of products",
     *     tags={"Products"},
     *     @OA\Parameter(
     *         name="name",
     *         in="query",
     *         description="Filter by product name (partial match)",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="category_id",
     *         in="query",
     *         description="Filter by category ID",
     *         required=false,
     *         @OA\Schema(type="integer", format="int64")
     *     ),
     *     @OA\Parameter(
     *         name="min_price",
     *         in="query",
     *         description="Minimum price filter",
     *         required=false,
     *         @OA\Schema(type="number", format="float")
     *     ),
     *     @OA\Parameter(
     *         name="max_price",
     *         in="query",
     *         description="Maximum price filter",
     *         required=false,
     *         @OA\Schema(type="number", format="float")
     *     ),
     *     @OA\Parameter(
     *         name="brand_id",
     *         in="query",
     *         description="Filter by brand ID",
     *         required=false,
     *         @OA\Schema(type="integer", format="int64")
     *     ),
     *     @OA\Parameter(
     *         name="status",
     *         in="query",
     *         description="Filter by product status (partial match)",
     *         required=false,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="created_at_start",
     *         in="query",
     *         description="Filter by creation date start (YYYY-MM-DD)",
     *         required=false,
     *         @OA\Schema(type="string", format="date")
     *     ),
     *     @OA\Parameter(
     *         name="created_at_end",
     *         in="query",
     *         description="Filter by creation date end (YYYY-MM-DD)",
     *         required=false,
     *         @OA\Schema(type="string", format="date")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="data", ref="#/components/schemas/productPagination")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="No products found",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="No products found")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal server error",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Internal server error"),
     *             @OA\Property(property="error", type="string")
     *         )
     *     )
     * )
     */
    public function index(): JsonResponse
    {
        try {
            $query = Product::query();

            // Apply filters
            if ($name = request('name')) {
                $query->where('name', 'like', '%' . $name . '%');
            }
            
            if ($categoryId = request('category_id')) {
                $query->where('category_id', $categoryId);
            }

            if ($minPrice = request('min_price')) {
                $query->where('price', '>=', $minPrice);
            }

            if ($maxPrice = request('max_price')) {
                $query->where('price', '<=', $maxPrice);
            }
            
            if ($brandId = request('brand_id')) {
                $query->where('brand_id', $brandId);
            }
            
            if ($status = request('status')) {
                $query->where('status', 'like', '%' . $status . '%');
            }

            if ($createdAtStart = request('created_at_start')) {
                $query->whereDate('created_at', '>=', $createdAtStart);
            }

            if ($createdAtEnd = request('created_at_end')) {
                $query->whereDate('created_at', '<=', $createdAtEnd);
            }

            // Paginate the results
            $products = $query->latest()->paginate(15);

            // Check if any products were found
            if ($products->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'No products found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => ProductResource::collection($products)
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
     * Store a newly created resource in storage.
     */
    /**
     * @OA\Post(
     *     path="/api/v1/products",
     *     summary="Store a newly created product",
     *     tags={"Products"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/storeProduct")
     *     ),
     *     @OA\Response(
     *       response="201",
     *       description="Successful operation"
     *     ),
     *     @OA\Response(
     *       response=422,
     *       description="Invalid request!"
     *     ),
     *     @OA\Response(
     *       response=500,
     *       description="Internal Error!"
     *     )
     * )
     */
    public function store(StoreProductRequest $request) : JsonResponse
    {
        try {
            $validated = $request->validated();
            $product = Product::create($validated);
            if ($product)
                return response()->json([
                    'success' => true,
                    'message' => 'Create product successfully!',
                    'data' => $product,
                ], 201);

            return response()->json([
                'success' => false,
                'message' => 'Failed to create product!',
            ], 400);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Internal error ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    /**
     * @OA\Get(
     *     path="/api/v1/products/{id}",
     *     summary="Display the specified product",
     *     tags={"Products"},
     *     @OA\Parameter(
     *       name="id",
     *       in="path",
     *       required=true,
     *       @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *       response="200", 
     *       description="Successful operation"
     *     ),
     *     @OA\Response(
     *       response="404", 
     *       description="Product not found!"
     *     )
     * )
     */
    public function show(string $id) : JsonResponse
    {
        $product = Product::with(['category', 'brand'])->findOrFail($id);
        return response()->json([
                'success' => true,
                'message' => 'Get product by ID successfully!',
                'data' => new ProductResource($product)
            ]);
    }

    /**
     * Update the specified resource in storage.
     */
    /**
     * @OA\Put(
     *     path="/api/v1/products/{id}",
     *     summary="Update the specified product",
     *     tags={"Products"},
     *     @OA\Parameter(
     *       name="id",
     *       in="path",
     *       required=true,
     *       @OA\Schema(type="string")
     *     ),
     *     @OA\RequestBody(
     *       required=true,
     *       @OA\JsonContent(
     *         ref="#/components/schemas/updateProduct"
     *       )
     *     ),
     *     @OA\Response(
     *       response="200", 
     *       description="Successful operation"
     *     ),
     *     @OA\Response(
     *       response="404", 
     *       description="Product not found!"
     *     ),
     *     @OA\Response(
     *       response="422", 
     *       description="Unprocessable Entity!"
     *     ),
     *     @OA\Response(
     *       response="500", 
     *       description="Internal Error!"
     *     )
     * )
     */
    public function update(UpdateProductRequest $request, string $id) : JsonResponse
    {
        try {
            $product = Product::with(['category', 'brand'])->findOrFail($id);
            $validated = $request->validated();
            $product->update($validated);
            return response()->json([
                'success' => true,
                'message' => 'Update product successfully!',
                'location' => env('APP_URL')."/api/products".$id
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Something happened while Updating Product',
                'errors' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    /**
     * @OA\Delete(
     *     path="/api/v1/products/{id}",
     *     summary="Remove the specified product",
     *     tags={"Products"},
     *     @OA\Parameter(
     *       name="id",
     *       in="path",
     *       required=true,
     *       @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *       response="204", 
     *       description="Successful operation"
     *     ),
     *     @OA\Response(
     *       response="404", 
     *       description="Product not found!"
     *     )
     * )
     */
    public function destroy(string $id) : JsonResponse
    {
        $product = Product::with(['category', 'brand'])->findOrFail($id);
        $product->delete();
        return response()->json([
            'success' => true,
            'message' => 'Delete product successfully!'
        ], 204);
    }
}
