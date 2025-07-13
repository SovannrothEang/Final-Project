<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreContactRequest;
use App\Http\Requests\UpdateContactRequest;
use App\Http\Resources\ContactResource;
use App\Models\Contact;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;

class ContactController extends Controller
{
    public function index(): JsonResponse
    {
        try {
            $contact = Contact::all();
            return response()->json([
                'data' => ContactResource::collection($contact)
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Internal error',
                'errors' => $e->getMessage(),
            ]);
        }
    }

    public function store(StoreContactRequest $request): JsonResponse
    {
        try {
            $validated = $request->validated();
            // Set default values for null fields
            // $data = array_merge([
            //     'store_name' => 'Exclusive Store',
            //     'address' => 'No Address',
            //     'email' => 'lumor@email.com',
            //     'phone' => '+855-12-345-5678',
            //     'description' => 'No Description'
            // ], array_filter($validated));

            $validated['store_name'] = 'Exclusive Store';
            $contact = Contact::create($validated);
            return response()->json([
                'message' => 'Contact created successfully',
                'data' => new ContactResource($contact)
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Internal error',
                'errors' => $e->getMessage()
            ], 500);
        }
    }

    public function show(int $id): JsonResponse
    {
        try {
            $contact = Contact::findOrFail($id);
            
            return response()->json([
                'data' => $contact
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Internal error',
                'errors' => $e->getMessage()
            ], 500);
        }
    }

    public function update(UpdateContactRequest $request, int $id): JsonResponse
    {
        try {
            $contact = Contact::findOrFail($id);
            
            $validated = $request->validated();
            $contact->update(array_filter($validated));

            return response()->json([
                'message' => 'Contact updated successfully',
                'data' => new ContactResource($contact)
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Contact not found'
            ], 404);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Internal error',
                'errors' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy(int $id): JsonResponse
    {
        try {
            $contact = Contact::findOrFail($id);
            $contact->delete();
            return response()->json([
                'message' => 'Contact deleted successfully'
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Contact not found'
            ], 404);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Internal error',
                'errors' => $e->getMessage()
            ], 500);
        }
    }

}
