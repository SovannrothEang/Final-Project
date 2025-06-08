<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use App\Models\User;

class UserUnitTest extends TestCase
{
    /**
     * Test user model instantiation.
     *
     * @return void
     */
    public function test_user_model_can_be_instantiated()
    {
        $user = new User();
        $this->assertInstanceOf(User::class, $user);
    }

    /**
     * Test user has expected fillable attributes.
     *
     * @return void
     */
    public function test_user_has_expected_fillable_attributes()
    {
        $user = new User();
        $expectedFillable = [
            'name',
            'email',
            'password',
        ];
        $this->assertEquals($expectedFillable, $user->getFillable());
    }

    /**
     * Test user has products relationship.
     *
     * @return void
     */
    public function test_user_has_products_relationship()
    {
        $user = new User();
        $this->assertTrue(method_exists($user, 'products'));
        // We cannot assert the instance of HasMany directly in a unit test without a database connection.
        // We can only check if the method exists.
    }
}
