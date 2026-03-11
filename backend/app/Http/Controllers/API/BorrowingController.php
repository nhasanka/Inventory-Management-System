<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Borrowing;
use App\Models\Item;
use Illuminate\Support\Facades\DB;
use App\Services\ActivityLogService;

class BorrowingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Borrowing::with('item')->get());
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
            'item_id' => 'required|exists:items,id',
            'borrower_name' => 'required',
            'contact_details' => 'required',
            'borrow_date' => 'required|date',
            'expected_return_date' => 'required|date',
            'quantity' => 'required|integer|min:1'
        ]);


        $item = Item::findOrFail($request->item_id);

        if ($item->quantity < $request->quantity) {
            return response()->json([
                'message' => 'Not enough stock'
            ], 400);
        }


        DB::transaction(function () use ($request, $item) {

            $borrow =   Borrowing::create([
                'item_id' => $item->id,
                'borrower_name' => $request->borrower_name,
                'contact_details' => $request->contact_details,
                'borrow_date' => $request->borrow_date,
                'expected_return_date' => $request->expected_return_date,
                'quantity' => $request->quantity
            ]);

            $oldQuantity = $item->quantity;

            // reduce stock
            $item->quantity -= $request->quantity;

            // update status
            $item->status = 'Borrowed';

            $item->save();

            ActivityLogService::log(
                'Item Borrowed',
                'Borrowing',
                $borrow->id,
                null,
                $borrow->toArray()
            );

            ActivityLogService::log(
                'Quantity Decreased',
                'Item',
                $item->id,
                ['quantity' => $oldQuantity],
                ['quantity' => $item->quantity]
            );
        });

        return response()->json(['message' => 'Item borrowed successfully']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function returnItem($id)
    {
        $borrow = Borrowing::findOrFail($id);

        if ($borrow->status == 'returned') {
            return response()->json(['message' => 'Already returned']);
        }

        DB::transaction(function () use ($borrow) {

            $item = Item::find($borrow->item_id);

            $oldQuantity = $item->quantity;

            // restore stock
            $item->quantity += $borrow->quantity;

            if ($item->quantity > 0) {
                $item->status = 'In-Store';
            }

            $item->save();

            $borrow->status = 'returned';
            $borrow->save();

            // 🔹 Borrow return log
            ActivityLogService::log(
                'Item Returned',
                'Borrowing',
                $borrow->id,
                ['status' => 'Borrowed'],
                ['status' => 'Returned']
            );

            // 🔹 Quantity increase log
            ActivityLogService::log(
                'Quantity Increased',
                'Item',
                $item->id,
                ['quantity' => $oldQuantity],
                ['quantity' => $item->quantity]
            );
        });

        return response()->json(['message' => 'Item returned']);
    }
}
