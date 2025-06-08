<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Product;

class ProductTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test product creation.
     *
     * @return void
     */
    public function test_product_can_be_created()
    {
        $productData = [
            'name' => 'Test Product',
            'description' => 'This is a test product',
            'price' => 100.00,
            'quantity' => 10,
            'options' => [
                'colors' => ["red", "blue"],
                'sizes' => ["L", "XL"]
            ]
        ];

        // Create a user and authenticate
        $user = \App\Models\User::factory()->create();
        $this->actingAs($user);

        $response = $this->postJson('/api/v1/products', $productData);

        $response->assertStatus(201)
                ->assertJsonStructure([
                    'location',
                    'message',
                    'success'
                ])
                ->assertJsonFragment([
                    'message' => 'Create product successfully!',
                    'success' => true
                ]);

        // Assert that the product is associated with the authenticated user
        $this->assertDatabaseHas('products', [
            'name' => $productData['name'],
            'description' => $productData['description'],
            'price' => $productData['price'],
            'quantity' => $productData['quantity'],
            'options' => json_encode($productData['options']), // Expect options as a JSON string
            'user_id' => $user->id
        ]);
    }

    /**
     * Test product retrieval.
     *
     * @return void
     */
    public function test_product_can_be_retrieved()
    {
        // Create a user and authenticate
        $user = \App\Models\User::factory()->create();
        $this->actingAs($user);

        $product = Product::create([
            'name' => 'Another Product',
            'description' => 'Another test product',
            'price' => 200.00,
            'quantity' => 5,
            'options' => [
                'colors' => ["red", "blue"],
                'sizes' => ["L", "XL"]
            ],
            'user_id' => $user->id
        ]);

        $response = $this->getJson('/api/v1/products/' . $product->id);

        $response->assertStatus(200)
                ->assertJsonFragment([
                    'name' => 'Another Product',
                    'description' => 'Another test product',
                    'price' => 200.00,
                    'quantity' => 5,
                    'in_stock' => true,
                    'options' => [
                        'colors' => ["red", "blue"],
                        'sizes' => ["L", "XL"]
                    ]
                ]);
    }
}
