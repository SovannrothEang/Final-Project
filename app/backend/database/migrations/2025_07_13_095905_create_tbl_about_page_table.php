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
        Schema::create('tbl_about_page', function (Blueprint $table) {
            $table->id();
            $table->string('main_detail');
            $table->json('sub_detail');
            $table->integer('total_brands');
            $table->integer('total_products');
            $table->integer('total_sales');
            $table->json('yearly_sale');
            $table->json('monthly_sale');
            $table->integer('total_reviews');
            $table->float('average_rating');
            $table->integer('monthly_visitors');
            $table->integer('years_in_operation');
            $table->foreignId('user_id')
                ->constrained('tbl_users', 'id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_about_page');
    }
};
