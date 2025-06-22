<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use OpenApi\Annotations as OA;

/**
 * @OA\OpenApi(
 *    @OA\Info(
 *      version="1.0.0",
 *      title="Laravel API with Swagger",
 *      description="API documentation for Laravel using Swagger",
 *      @OA\License(name="MIT")
 *    ),
 * 
 *    @OA\Server(
 *      url="http://localhost:8000",
 *      description="Local"
 *    ),
 *    
 *    @OA\Tag(
 *      name="Products",
 *      description="API Endpoints for Products"
 *    ),
 *    
 *    @OA\Tag(
 *      name="Authentication",
 *      description="API Endpoints for Authenticating"
 *    ),
 *    
 *    @OA\Tag(
 *      name="Users",
 *      description="API Endpoints for Users"
 *    ),
 * 
 *    @OA\Components(
 *      @OA\SecurityScheme(
 *        securityScheme="bearerAuth",
 *        type="http",
 *        scheme="bearer",
 *        bearerFormat="JWT"
 *      )
 *    )
 *  )
 */

class ApiController extends Controller 
{
  //
}