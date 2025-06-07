<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Validator;


/**
 * @OA\Info(
 *     version="1.0.0",
 *     title="Laravel API with Swagger",
 *     description="API documentation for Laravel using Swagger"
 * )
 *
 * @OA\Server(
 *     url=L5_SWAGGER_CONST_HOST,
 *     description="Local API Server"
 * )
 */
class AuthController extends Controller
{
    /**
     * Handle user login
     */
    /**
     * @OA\Post(
     *     path="/api/login",
     *     summary="Authenticate user and generate token",
     *     @OA\RequestBody(
     *       required=true,
     *       @OA\JsonContent(
     *         required={"email", "password"},
     *         ref="#/components/schemas/loginRequest"
     *       )
     *     ),
     *     @OA\Response(response="200", description="Successful login"),
     *     @OA\Response(response="422", description="Validation errors")
     * )
     */
    public function login(LoginRequest $request) : JsonResponse
    {
        $validated = $request->validated();
        $user = User::where('email', $validated['email'])->first();
        if(!$user || !Hash::check($validated['password'], $user->password)){
            return response()->json([
                'success' => false,
                'message' => 'The provided credential is incorrect!',
            ], 404);
        }
        return response()->json([
            'success' => true,
            'token' => $user->createToken('api-token')->plainTextToken
        ]);
    }

    /**
     * Handle new user register
     */
    /**
     * @OA\Post(
     *     path="/api/register",
     *     summary="Register a new user",
     *     @OA\RequestBody(
     *       required=true,
     *       @OA\JsonContent(
     *         ref="#/components/schemas/registerRequest"
     *       )
     *     ),
     *     @OA\Response(response="201", description="User registered successfully"),
     *     @OA\Response(response="422", description="Validation errors")
     * )
     */

    public function register(RegisterRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $user = User::create($validated);
        if (!$user)
            return response()->json([
                'success' => false,
                'message' => 'Something occured while trying to create user!'
            ], 500);
        return response()->json([
            'success' => true,
            'token' => $user->createToken('api-token')->plainTextToken
        ], 201);
    }
    /**
     * Handle user logout
     */
    /**
     * @OA\Post(
     *     path="/api/logout",
     *     summary="Logout authenticated user",
     *     @OA\Response(response="200", description="Logged out successfully"),
     *     @OA\Response(response="401", description="No active session to log out")
     * )
     */
    public function logout(Request $request)
    {
        $user = $request->user();
        if( $user && $user->currentAccessToken()) {
            $user->tokens()
                ->where('id', $user->currentAccessToken()->id)->delete();
            return response()->json(['message' => 'Logged out successfully']);
        }
        return response()->json(['message' => 'No active session to log out'], 401);
    }
    /**
     * Get authenticated user details
     */
    /**
     * @OA\Get(
     *     path="/api/user",
     *     summary="Get authenticated user details",
     *     @OA\Response(response="200", description="Successful operation")
     * )
     */
    public function user()
    {
        $user = auth()->user;
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthenticated.'
            ], 401);
        }

        $id = $user->id;
        $data = User::where('id', $id)->firstOrFail();
        if($data === null)
        {
            return response()->json([
                'success' => false,
                'message' => "Invalid user ID!",
            ]);
        }
        return response()->json([
            'success' => true,
            'data' => new UserResource($data)
        ]);
    }
}
