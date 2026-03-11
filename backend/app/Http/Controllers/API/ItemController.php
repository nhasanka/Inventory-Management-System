<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Item;
use App\Services\ActivityLogService;
use Symfony\Component\HttpFoundation\Response;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Item::with('place')->get());
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

        ActivityLogService::log(
            'Item Created',
            'Item',
            $item->id,
            null,
            $item->toArray()
        );
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

        $oldValues = $item->getOriginal();

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

        ActivityLogService::log(
            'Item Updated',
            'Item',
            $item->id,
            $oldValues,
            $item->fresh()->toArray()
        );

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

        $oldQuantity = $item->quantity;

        $item->increment('quantity');

        ActivityLogService::log(
            'Quantity Increased',
            'Item',
            $item->id,
            ['quantity' => $oldQuantity],
            ['quantity' => $item->quantity]
        );

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

        $oldQuantity = $item->quantity;

        $item->decrement('quantity');

        ActivityLogService::log(
            'Quantity Decreased',
            'Item',
            $item->id,
            ['quantity' => $oldQuantity],
            ['quantity' => $item->quantity]
        );

        return response()->json($item);
    }
}
