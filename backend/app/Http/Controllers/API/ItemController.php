<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Item;
use Symfony\Component\HttpFoundation\Response;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Response()->json(Item::with('place')->get());
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
            'name' => 'required',
            'code' => 'required|unique:items',
            'quantity' => 'required|integer',
            'place_id' => 'required'
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('items', 'public');
        }

        $item = Item::create([
            'name' => $request->name,
            'code' => $request->code,
            'quantity' => $request->quantity,
            'serial_number' => $request->serial_number,
            'description' => $request->description,
            'place_id' => $request->place_id,
            'status' => $request->status,
            'image' => $path ?? null
        ]);

        return response()->json($item);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $item = Item::with('place')->find($id);
        if (!$item) {
            return response()->json(['message' => 'Item not found'], 404);
        }
        return response()->json($item);
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
        $item = Item::find($id);
        if (!$item) {
            return response()->json(['message' => 'Item not found'], 404);
        }

        $request->validate([
            'name' => 'required',
            'code' => 'required|unique:items,code,' . $item->id,
            'quantity' => 'required|integer',
            'place_id' => 'required'
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('items', 'public');
            $item->image = $path;
        }

        $item->update([
            'name' => $request->name,
            'code' => $request->code,
            'quantity' => $request->quantity,
            'serial_number' => $request->serial_number,
            'description' => $request->description,
            'place_id' => $request->place_id,
            'status' => $request->status,
        ]);

        return response()->json($item);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
    public function increment($id)
    {
        $item = Item::findOrFail($id);

        $item->increment('quantity');

        return response()->json($item);
    }

    public function decrement($id)
    {
        $item = Item::findOrFail($id);

        if ($item->quantity <= 0) {
            return response()->json([
                'message' => 'Out of stock'
            ], 400);
        }

        $item->decrement('quantity');

        return response()->json($item);
    }
}
