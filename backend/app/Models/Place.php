<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Place extends Model
{
    use HasFactory;
    protected $fillable = [
        'cupboard_id',
        'name',
        'code',
    ];
    public function cupboard()
    {
        return $this->belongsTo(Cupboard::class);
    }
}
