<?php

namespace App\Enum;

enum Status: string {
  case AVAILABLE = 'available';
  case OUT_OF_STOCK = 'out_of_stock';
  case DISCONTINUED = 'discontinued';
}