<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\v1\ApiController;
use App\Http\Requests\AboutPage\StoreAboutPageRequest;
use App\Http\Requests\AboutPage\UpdateAboutPageRequest;
use App\Http\Resources\AboutPageResource;
use App\Models\AboutPage;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class AboutPageController extends ApiController
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        try {
            $aboutPages = AboutPage::all();

            return response()->json([
                'data' => AboutPageResource::collection($aboutPages)
            ]);
        } catch (QueryException $e) {
            Log::error('AboutPage fetch error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Database error',
                'erros' => $e->getMessage(),
            ], 500);
        } catch (\Exception $e) {
            Log::error('AboutPage fetch error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Internal error',
                'erros' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAboutPageRequest $request): JsonResponse
    {
        try {
            $aboutPage = AboutPage::create($request->validated());
            return response()->json([
                'data' => new AboutPageResource($aboutPage)
            ]);
        } catch (QueryException $e) {
            Log::error('AboutPage fetch error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Database error',
                'erros' => $e->getMessage(),
            ], 500);
        } catch (\Exception $e) {
            Log::error('AboutPage fetch error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Internal error',
                'erros' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id): JsonResponse
    {
        try {
            $aboutPage = AboutPage::findOrFail($id);
            return response()->json([
                'data' => new AboutPageResource(($aboutPage))
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'About page content not found.',
                'errors' => $e->getMessage()
            ],404);
        } catch (QueryException $e) {
            Log::error('AboutPage fetch error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Database error',
                'erros' => $e->getMessage(),
            ], 500);
        } catch (\Exception $e) {
            Log::error('AboutPage fetch error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Internal error',
                'erros' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAboutPageRequest $request, int $id): JsonResponse
    {
        try {
            $aboutPage = AboutPage::findOrFail($id);
            $aboutPage->update($request->validated());
            return response()->json([
                'data' => new AboutPageResource($aboutPage)
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'About page content not found.',
                'errors' => $e->getMessage()
            ],404);
        } catch (QueryException $e) {
            Log::error('AboutPage fetch error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Database error',
                'erros' => $e->getMessage(),
            ], 500);
        } catch (\Exception $e) {
            Log::error('AboutPage fetch error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Internal error',
                'erros' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            $aboutPage = AboutPage::findOrFail($id);
            $aboutPage->delete();
            return response()->json([
                'message' => 'delete about page content successfully'
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'About page content not found.',
                'errors' => $e->getMessage()
            ],404);
        } catch (QueryException $e) {
            Log::error('AboutPage fetch error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Database error',
                'erros' => $e->getMessage(),
            ], 500);
        } catch (\Exception $e) {
            Log::error('AboutPage fetch error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Internal error',
                'erros' => $e->getMessage(),
            ], 500);
        }
    }
}
