<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class HandleAuthExceptions
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        try {
            return $next($request);
        } catch (AuthenticationException $e) {
            return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized access',
                    'error' => $e->getMessage()
                ], 401);
        } catch (AuthorizationException $e) {
            return response()->json([
                    'success' => false,
                    'message' => 'Forbidden',
                    'error' => $e->getMessage()
                ], 403);
        } catch (\Exception $e) {
        // Log the exception for debugging purposes
        // \Log::error('Unhandled exception in auth middleware: '. $e->getMessage());
        return response()->json([
            'success' => false,
            'message' => 'Internal server error',
            'error' => 'An unexpected error occurred'
        ], 500);
    }
    }
}
