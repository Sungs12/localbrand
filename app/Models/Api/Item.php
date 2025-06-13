<?php

namespace App\Models\Api;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Item extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'price',
        'stock',
        'description',
        'image',
    ];

    /**
     * Relationships
     */

    public function payments()
    {
        return $this->hasMany(\App\Models\Api\Payments::class);
    }
}
