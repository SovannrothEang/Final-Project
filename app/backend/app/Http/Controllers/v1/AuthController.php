<?php

namespace App\Http\Controllers\v1;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use App\Models\User;
use Exception;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends ApiController
{
    /**
     * Handle user login
     */
    /**
     * @OA\Post(
     *     path="/api/auth/login",
     *     summary="Authenticate the user and generate token",
     *     @OA\RequestBody(
     *       required=true,
     *       @OA\JsonContent(
     *         ref="#/components/schemas/loginRequest"
     *       )
     *     ),
     *     tags={"Authentication"},
     *     @OA\Response(response="200", description="Successful login"),
     *     @OA\Response(response="404", description="User not found"),
     *     @OA\Response(response="422", description="Validation errors"),
     *     @OA\Response(response="500", description="Internal error")
     * )
     */
    public function login(LoginRequest $request) : JsonResponse
    {
        $validated = $request->validated();
        if (!Auth::guard('sanctum')->attempt($validated)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
        $user = User::where('email', $validated['email'])->first();
        if(!$user || !Hash::check($validated['password'], $user->password)){
            return response()->json([
                'success' => false,
                'message' => 'Invalid credential',
            ], 401);
        }
        return response()->json([
            'success' => true,
            'token' => $user->createToken('api-token')->plainTextToken
        ], 200);
    }

    /**
     * Handle new user register
     */
    /**
     * @OA\Post(
     *     path="/api/auth/register",
     *     summary="Register a new user",
     *     @OA\RequestBody(
     *       required=true,
     *       @OA\JsonContent(
     *         ref="#/components/schemas/registerRequest"
     *       )
     *     ),
     *     tags={"Authentication"},
     *     @OA\Response(response="201", description="User registered successfully"),
     *     @OA\Response(response="422", description="Validation errors"),
     *     @OA\Response(response="500", description="Internal error")
     * )
     */

    public function register(RegisterRequest $request): JsonResponse
    {
        try {
            $validated = $request->validated();
            $user = User::create($validated);
            
            return response()->json([
                'success' => true,
                'message' => 'User registered successfully',
                'token' => $user->createToken('api-token')->plainTextToken
            ], 201);
            
        } catch (QueryException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Registration failed: database error',
                'errors' => config('app.debug') ? $e->getMessage() : null
            ], 500);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Registration failed',
                'errors' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }
    /**
     * Handle user logout
     */
    /**
     * @OA\Post(
     *     path="/api/logout",
     *     summary="Logout authenticated user",
     *     tags={"Authentication"},
     *     @OA\Response(response="200", description="Logged out successfully"),
     *     @OA\Response(response="401", description="No active session to log out")
     * )
     */
    public function logout(Request $request)
    {
        $user = $request->user();
        
        if ($user && $user->currentAccessToken()) {
            $user->currentAccessToken()->delete();
            
            return response()->json([
                'success' => true,
                'message' => 'Logged out successfully'
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'No active session to log out'
        ], 401);
    }
    /**
     * Get authenticated user details
     */
    /**
     * @OA\Get(
     *     path="/api/auth/user",
     *     summary="Get authenticated user details",
     *     tags={"Users"},
     *     @OA\Response(response="200", description="Successful operation"),
     *     @OA\Response(response="401", description="Unauthenticated")
     *  )
     */
    public function user(Request $request)
    {
        // $user = Auth::user();
        // if (!$user) {
        //     return response()->json([
        //         'success' => false,
        //         'message' => 'Unauthenticated'
        //     ], 401);
        // }
        if (!$request->user()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthenticated. Please log in.'
            ], 401);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'user' => new UserResource($request->user()),
                'token_abilities' => $request->user()->currentAccessToken()->abilities ?? [],
                'token_expires_at' => $request->user()->currentAccessToken()->expires_at ?? null,
            ]
        ]);
    }
    /**
     * Checking if the token is valid
     */
    /**
     * @OA\Get(
     *     path="/api/v1/verify-token",
     *     summary="Get authenticated user details",
     *     tags={"Authentication"},
     *     @OA\Response(response="200", description="Successful operation"),
     *     @OA\Response(response="401", description="Unauthenticated")
     * )
     */
    public function verifyToken() {
        return response()->json([
            'success' => true,
            'message' => 'Token is valid'
        ],200);
    }
}
