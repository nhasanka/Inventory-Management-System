<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Cupboard;

class CupboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Cupboard::all());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
        ]);

        $cupboard = Cupboard::create([
            'name' => $request->name,
            'location' => $request->location,
        ]);

        return response()->json($cupboard, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $cupboard = Cupboard::find($id);
        if (!$cupboard) {
            return response()->json(['message' => 'Cupboard not found'], 404);
        }
        return response()->json($cupboard);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $cupboard = Cupboard::find($id);
        if (!$cupboard) {
            return response()->json(['message' => 'Cupboard not found'], 404);
        }

        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'location' => 'sometimes|required|string|max:255',
        ]);

        $cupboard->update($request->only(['name', 'location']));
        return response()->json($cupboard);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
