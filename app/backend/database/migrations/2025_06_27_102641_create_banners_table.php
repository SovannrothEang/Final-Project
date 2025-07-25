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
        Schema::create('tbl_banners', function (Blueprint $table) {
            $table->id();
            $table->string('url');
            $table->foreignId('user_id')
                ->constrained('tbl_users', 'id')
                ->cascadeOnDelete();
            $table->boolean('active')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_banners');
    }
};
