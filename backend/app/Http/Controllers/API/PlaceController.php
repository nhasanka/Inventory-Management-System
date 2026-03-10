<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Place;

class PlaceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Place::with('cupboard')->get());
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
            'cupboard_id' => 'required|exists:cupboards,id',
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:255|unique:places,code',
        ]);

        $place = Place::create([
            'cupboard_id' => $request->cupboard_id,
            'name' => $request->name,
            'code' => $request->code,
        ]);

        return response()->json($place, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $place = Place::with('cupboard')->find($id);
        if (!$place) {
            return response()->json(['message' => 'Place not found'], 404);
        }
        return response()->json($place);
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
        $place = Place::find($id);
        if (!$place) {
            return response()->json(['message' => 'Place not found'], 404);
        }

        $request->validate([
            'cupboard_id' => 'required|exists:cupboards,id',
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:255|unique:places,code,' . $place->id,
        ]);

        $place->update([
            'cupboard_id' => $request->cupboard_id,
            'name' => $request->name,
            'code' => $request->code,
        ]);

        return response()->json($place);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
