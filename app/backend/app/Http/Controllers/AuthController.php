<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;


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
     *     @OA\Response(response="200", description="Successful login"),
     *     @OA\Response(response="422", description="Validation errors")
     * )
     */
    public function login(Request $request){
        $validated = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string|min:8',
        ]);
        $user = User::where('email', $validated['email'])->first();
        if(!$user || !Hash::check($validated['password'], $user->password)){
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }
        return response()->json([
            'token' => $user->createToken('api-token')->plainTextToken
        ]);
    }
    /**
     * @OA\Post(
     *     path="/api/register",
     *     summary="Register a new user",
     *     @OA\Parameter(
     *         name="name",
     *         in="query",
     *         description="User's name",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="email",
     *         in="query",
     *         description="User's email",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="password",
     *         in="query",
     *         description="User's password",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(response="201", description="User registered successfully"),
     *     @OA\Response(response="422", description="Validation errors")
     * )
     */
    /**
     * Handle new user register
     */
    public function register(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);
        return response()->json([
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
        $id = $this->user()->id;
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
