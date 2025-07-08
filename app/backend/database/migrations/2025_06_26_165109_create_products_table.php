<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tbl_products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('brand_id')
                ->constrained('tbl_brands', 'id');
            $table->foreignId('category_id')
                ->constrained('tbl_categories', 'id');
            $table->decimal('price', 10, 2);
            $table->string('description')->nullable();
            $table->string('short_description')->nullable();
            $table->json('options')->nullable();
            $table->integer('discount')->nullable();
            $table->integer('stock')->default(0);
            $table->boolean('is_top');
            $table->boolean('is_active')->default(true);
            $table->enum('status', ['available', 'out_of_stock', 'discontinued'])
                ->default('available');
            $table->integer('rating');
            $table->integer('reviews');
            $table->foreignId('user_id')
                ->constrained('tbl_users', 'id')
                ->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_products');
    }
};
