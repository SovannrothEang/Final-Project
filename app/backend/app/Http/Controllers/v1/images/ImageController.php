<?php

namespace App\Http\Controllers\v1\images;

use App\Http\Controllers\v1\ApiController;
use App\Http\Requests\StoreImageRequest;
use App\Http\Requests\UpdateImageRequest;
use App\Http\Resources\ImageResource;
use App\Models\Image;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;

class ImageController extends ApiController
{
    public function index(): JsonResponse
    {
        try {
            $images = Image::all();
            
            if ($images->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'No images found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => ImageResource::collection($images)
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch images',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show(int $id): JsonResponse
    {
        try {
            $image = Image::findOrFail($id);
            return response()->json([
                    'success' => true,
                    'message' => 'Get images by ID successfully',
                    'data' => new ImageResource($image)
                ]);
        } catch (\Exception $e) {
            if($e instanceof ModelNotFoundException)
                return response()->json([
                        'success' => false,
                        'message' => 'Imags is not found by id: ' . $id,
                        'error' => $e->getMessage(),
                    ],404);

            return response()->json([
                    'success' => false,
                    'message' => 'Internal error',
                    'error' => $e->getMessage(),
                ],500);
        }
    }

    public function store(StoreImageRequest $request): JsonResponse
    {
        try {
            $image = Image::create($request->validated());

            // Fixed inconsistent response structure
            return response()->json([
                'success' => true,
                'message' => 'Create image successfully',
                'data' => $image,
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
                'message' => 'Failed to create image',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(UpdateImageRequest $request, int $id): JsonResponse
    {
        try {
            $image = Image::findOrFail($id);
            
            $image->update($request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Image updated successfully',
                'data' => $image
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Image not found'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update image',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy(int $id): JsonResponse
    {
        try {
            $image = Image::findOrFail($id);
            $image->delete();
            
            return response()->json([
                'success' => true,
                'message' => 'Delete image successfully',
            ], 200);
            
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Image not found'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete image',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
