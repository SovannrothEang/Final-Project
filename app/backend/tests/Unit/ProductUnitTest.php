<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use App\Models\Product;

class ProductUnitTest extends TestCase
{
    /**
     * Test product model instantiation.
     *
     * @return void
     */
    public function test_product_model_can_be_instantiated()
    {
        $product = new Product();
        $this->assertInstanceOf(Product::class, $product);
    }

    /**
     * Test product has expected fillable attributes.
     *
     * @return void
     */
    public function test_product_has_expected_fillable_attributes()
    {
        $product = new Product();
        $expectedFillable = [
            'name',
            'description',
            'price',
            'quantity',
            'options',
            'user_id'
        ];
        $this->assertEquals($expectedFillable, $product->getFillable());
    }

    /**
     * Test inStock method returns true when quantity is greater than 0.
     *
     * @return void
     */
    public function test_product_is_in_stock_when_quantity_greater_than_zero()
    {
        $product = new Product(['quantity' => 10]);
        $this->assertTrue($product->inStock());
    }

    /**
     * Test inStock method returns false when quantity is 0.
     *
     * @return void
     */
    public function test_product_is_not_in_stock_when_quantity_is_zero()
    {
        $product = new Product(['quantity' => 0]);
        $this->assertFalse($product->inStock());
    }

    /**
     * Test inStock method returns false when quantity is less than 0.
     *
     * @return void
     */
    public function test_product_is_not_in_stock_when_quantity_less_than_zero()
    {
        $product = new Product(['quantity' => -5]);
        $this->assertFalse($product->inStock());
    }
}
