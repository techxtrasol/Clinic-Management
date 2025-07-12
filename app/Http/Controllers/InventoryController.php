<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InventoryController extends Controller
{
    public function index()
    {
        $inventories = Inventory::latest()->get();
        return Inertia::render('inventory/InventoryList', [
            'inventories' => $inventories,
        ]);
    }

    public function show(Inventory $inventory)
    {
        return Inertia::render('inventory/InventoryView', [
            'inventory' => $inventory,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'quantity' => 'required|integer',
            'unit' => 'required|string',
            'description' => 'nullable|string',
            'status' => 'required|string',
        ]);
        $inventory = Inventory::create($data);
        return redirect()->route('inventory.index')->with('success', 'Inventory item created.');
    }

    public function update(Request $request, Inventory $inventory)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'quantity' => 'required|integer',
            'unit' => 'required|string',
            'description' => 'nullable|string',
            'status' => 'required|string',
        ]);
        $inventory->update($data);
        return redirect()->route('inventory.show', $inventory)->with('success', 'Inventory item updated.');
    }

    public function destroy(Inventory $inventory)
    {
        $inventory->delete();
        return redirect()->route('inventory.index')->with('success', 'Inventory item deleted.');
    }
}
