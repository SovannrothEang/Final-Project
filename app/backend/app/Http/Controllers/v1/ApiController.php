<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use OpenApi\Annotations as OA;

/**
 * @OA\Info(
 *     version="1.0.0",
 *     title="Laravel API with Swagger",
 *     description="API documentation for Laravel using Swagger",
 *     @OA\License(name="MIT")
 * )
 * 
 * @OA\Server(
 *     url="http://localhost:8000",
 *     description="Local"
 * )
 * 
 * @OA\SecurityScheme(
 *     securityScheme="bearerAuth",
 *     type="http",
 *     scheme="bearer",
 *     bearerFormat="JWT"
 * )
 */

class ApiController extends Controller 
{
  //
}