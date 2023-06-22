<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\RegistrationRequest;

class AuthController extends Controller
{
    /**
     * Create User
     * @param Request $request
     * @return User 
     */

    public function createUser(RegistrationRequest $request)
    {

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        return $this->success($user);
    }

    /**
     * Login The User
     * @param Request $request
     * @return User
     */
    public function loginUser(LoginRequest $request)
    {
        $user = User::where('email', $request->email)->first();

        if ($user && Hash::check($request->password, $user->password)) {
            $token    = $user->createToken('authToken')->plainTextToken;
            $response = [
                'token' => $token,
                'message' =>  "Login Successfully.",
                'user'   => $user
            ];
            return $this->success($response);
        }

        return $this->fail("Password doesn't match");
    }


    /**
     * 
     * AuthUser
     * 
     */
    public function authUser()
    {
        $authUser =   Auth::user();

        return $this->success($authUser);
    }
}
