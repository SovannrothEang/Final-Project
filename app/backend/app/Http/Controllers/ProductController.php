<?php

namespace App\Http\Controllers;

use App\Http\Requests\Products\StoreProductRequest;
use App\Http\Requests\Products\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\JsonResponse;

class ProductController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    /**
     * @OA\Get(
     *     path="/api/products",
     *     summary="Display a listing of products",
     *     @OA\Response(response="200", description="Successful operation")
     * )
     */
    public function index()
    {
        return ProductResource::collection(
            Product::latest()->paginate(15)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    /**
     * @OA\Post(
     *     path="/api/products",
     *     summary="Store a newly created product",
     *     @OA\Response(response="200", description="Successful operation")
     * )
     */
    public function store(StoreProductRequest $request)
    {
//        $decodedData = json_decode($request->getContent(), true);
        $validated = $request->validated();
        $product = Product::create([$validated]);
        return new ProductResource($product);
    }

    /**
     * Display the specified resource.
     */
    /**
     * @OA\Get(
     *     path="/api/products/{id}",
     *     summary="Display the specified product",
     *     @OA\Response(response="200", description="Successful operation")
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
            ]);
    }

    /**
     * Update the specified resource in storage.
     */
    /**
     * @OA\Put(
     *     path="/api/products/{id}",
     *     summary="Update the specified product",
     *     @OA\Response(response="201", description="Successful operation")
     * )
     */
    public function update(UpdateProductRequest $request, string $id) : JsonResponse
    {
        $product = Product::where('id', $id)->firstOrFail();
        if ($product === null)
            return response()->json([
                'success' => false,
                'message' => 'Product Not Found!',
            ]);
        $validated = $request->validated();
        $product->update($validated);
        return response()->json([
            'success' => true,
                'message' => 'Update product successfully!',
            'data' => new ProductResource($product)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    /**
     * @OA\Delete(
     *     path="/api/products/{id}",
     *     summary="Remove the specified product",
     *     @OA\Response(response="201", description="Successful operation")
     * )
     */
    public function destroy(string $id) : JsonResponse
    {
        $product = Product::where('id', $id)->firstOrFail();
        if ($product === null)
            return response()->json([
                'success' => false,
                'message' => 'Product Not Found!',
            ]);
        $product->delete();
        return response()->json([
            'success' => true,
            'message' => 'Delete product successfully!'
        ]);
    }
}
