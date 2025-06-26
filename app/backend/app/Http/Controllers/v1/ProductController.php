<?php

namespace App\Http\Controllers\v1;

use App\Http\Requests\Products\StoreProductRequest;
use App\Http\Requests\Products\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\JsonResponse;

class ProductController extends ApiController
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    /**
     * @OA\Get(
     *     path="/api/v1/products",
     *     summary="Display a listing of products",
     *     tags={"Products"},
     *     @OA\Response(
     *       response=200,
     *       description="Successful operation",
     *     ),
     *     @OA\Response(
     *       response=404,
     *       description="No Product was found!",
     *     )
     * )
     */
    public function index(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => ProductResource::collection(
                Product::latest()->paginate(15)
            )
        ]);
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
                    'location' => env('APP_URL').'/api/v1/products/'.$product->id,
                ], 201);

            return response()->json([
                'success' => false,
                'message' => 'Failed to create product!',
            ], 400);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Something happened in Creating Product',
                'errors' => $e->getMessage()
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
        $product = Product::where('id', $id)->firstOrFail();
        return $product !== null
            ? response()->json([
                'success' => true,
                'message' => 'Get product by ID successfully!',
                'data' => new ProductResource($product)
            ])
            : response()->json([
                'success' => false,
                'message' => 'Product Not Found!',
            ],404);
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
            $product = Product::where('id', $id)->firstOrFail();
            if ($product === null)
                return response()->json([
                    'success' => false,
                    'message' => 'Product Not Found!',
                ], 404);
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
        $product = Product::where('id', $id)->firstOrFail();
        if ($product === null)
            return response()->json([
                'success' => false,
                'message' => 'Product Not Found!',
            ], 404);
        $product->delete();
        return response()->json([
            'success' => true,
            'message' => 'Delete product successfully!'
        ], 204);
    }
}
