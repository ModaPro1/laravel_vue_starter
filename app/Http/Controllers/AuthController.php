<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
  public function register(Request $request) {
    $validator = Validator::make($request->only('name', 'email', 'password'), [
      'name' => 'required',
      'email' => 'email|unique:users',
      'password' => 'required|min:8'
    ]);

    if($validator->fails()) {
      return response()->json([
        'success' => false,
        'messages' => $validator->messages()
      ]);
    }

    $user = User::create([
      'name' => $request->name,
      'email' => $request->email,
      'password' => Hash::make($request->password)
    ]);

    $token = $user->createToken('appToken')->plainTextToken;

    return response()->json(['success' => true, 'token' => $token]);
  }

  public function login(Request $request) {

    if(Auth::attempt($request->only('email', 'password'))) {
      $user = User::where('email', $request->email)->first();
      $token = $user->createToken('appToken')->plainTextToken;

      return response()->json(['success' => true, 'token' => $token]);
    }

    return response()->json(['success' => false, 'message' => 'Invalid Credentials']);
  }

  public function checkAuth(Request $request) {
    return response()->json(['success' => true, 'user' => $request->user()]);
  }
}
