<?php

namespace App\Models\Api;

use Illuminate\Database\Eloquent\Model;

class Payments extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'user_id',
        'currency',
        'status',
        'towards',
        'amount',
        'item_id',
        'payment_method',
        'transaction_id',
    ];

    /**
     * Relationships
     */

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function item()
    {
        return $this->belongsTo(Item::class);
    }
}
