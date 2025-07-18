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
        Schema::create('tbl_contacts', function (Blueprint $table) {
            $table->id();
            $table->string('store_name');
            $table->string('address');
            $table->string('description')->nullable();
            $table->string('email')->unique();
            $table->string('phone')->unique();
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
        Schema::dropIfExists('tbl_contacts');
    }
};
