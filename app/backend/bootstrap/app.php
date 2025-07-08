<?php

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->alias([
            'auth' => \App\Http\Middleware\Authenticate::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->renderable(function (AuthenticationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized access',
                'error' => $e->getMessage()
            ], 401);
        });
        $exceptions->renderable(function (AuthorizationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Forbidden access',
                'error' => $e->getMessage()
            ], 403);
        });
        $exceptions->renderable(function (NotFoundHttpException $e, $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'success' => false,
                    'message' => 'Resource not found',
                    'errors' => [
                        'url' => $e->getMessage(),
                        'method' => $request->method()
                    ],
                ], 404);
            }
        });
        $exceptions->renderable(function (\Throwable $e) {
            Log::error('[Unhandled exception] '. $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Internal server error',
                'error' => 'An unexpected error occurred',
            ], 500);
        });
    })->create();
