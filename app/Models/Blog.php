<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'content',
        'author',
        'related_images'
    ];

    /**
     * Get the user that authored the blog.
     */
    protected $casts = [
        'related_images' => 'array', // Cast related_images as an array
    ];
    public function author()
    {
        return $this->belongsTo(User::class, 'author');
    }
}
