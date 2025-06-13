<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Api\Payments;
use App\Models\User;

class PaymentController extends Controller
{
    //
    public function index(Request $request)
    {
        // Logic to list payments
        $payments = Payments::with('user', 'item')->all();
        return response()->json(['message' => 'List of payments']);
    }
    public function show(Request $request){
        // Logic to show a specific payment
        $payment = Payments::with('user', 'item')->find($request->id);
        if (!$payment) {
            return response()->json(['message' => 'Payment not found'], 404);
        }
        return response()->json(['message' => 'Payment details', 'data' => $payment]);
    }
    public function store(Request $request)
    {
        // Logic to create a new payment
        $validation = $request->validate([
            'user_id' => 'required|exists:users,id',
            'currency' => 'required|string|max:3',
            'status' => 'required|string',
            'towards' => 'required|string',
            'amount' => 'required|numeric|min:0',
            'item_id' => 'required|exists:items,id',
            'payment_method' => 'required|string',
            'transaction_id' => 'nullable|string|max:255',
        ]);
        $payment = Payments::create($request->all());
        return response()->json(['message' => 'Payment created successfully', 'data' => $payment], 201);
    }
    public function update(Request $request, $id)
    {
        // Logic to update a payment
        $payment = Payments::find($id);
        if (!$payment) {
            return response()->json(['message' => 'Payment not found'], 404);
        }
        $validation = $request->validate([
            'user_id' => 'sometimes|exists:users,id',
            'currency' => 'sometimes|string|max:3',
            'status' => 'sometimes|string',
            'towards' => 'sometimes|string',
            'amount' => 'sometimes|numeric|min:0',
            'item_id' => 'sometimes|exists:items,id',
            'payment_method' => 'sometimes|string',
            'transaction_id' => 'nullable|string|max:255',
        ]);
        $payment->update($request->all());
        return response()->json(['message' => 'Payment updated successfully', 'data' => $payment]);
    }
    public function destroy($id)
    {
        // Logic to delete a payment
        $payment = Payments::find($id);
        if (!$payment) {
            return response()->json(['message' => 'Payment not found'], 404);
        }
        $payment->delete();
        return response()->json(['message' => 'Payment deleted successfully']);
    }
}
