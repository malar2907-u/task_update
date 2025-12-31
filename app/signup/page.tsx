"use client";

import { useState } from "react";
import { signUpService } from "../component/service";
interface loginDetails {
    userName : string;
    password : string;
    conformPassword : string;
    role:string,
}

export default function SignUp() {
const [formData, setFormData] = useState<loginDetails>({
    userName : "",
    password : "",
    conformPassword:"",
    role:""
})

  const  handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
    const  response = await signUpService(formData) 
    console.log(response)
    } catch (error) {
        console.error("error occured", error)
    }
  };

  const onChangeData = (name:string , value:string) => {
  setFormData((prev)=> ({...prev,
      [name]: value
  }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          SignUp
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <input
              type="text"
              name="userName"
              placeholder="Enter your Name"
              value={formData.userName}
              onChange={(e) => onChangeData(e.target.name , e.target.value)}
              className="w-full m-1 px-3 py-2 border border-gray-100 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

           <div>
            <input
              type="text"
              name="role"
              placeholder="Enter your role"
              value={formData.role}
              onChange={(e) => onChangeData(e.target.name , e.target.value)}
              className="w-full m-1 px-3 py-2 border border-gray-100 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => onChangeData(e.target.name , e.target.value)}
              className="w-full m-1 px-3 py-2 border border-gray-100 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
           <div>
            <input
              type="password"
              name="conformPassword"
              placeholder="Enter your conform password"
              value={formData.conformPassword}
              onChange={(e) => onChangeData(e.target.name , e.target.value)}
              className="w-full m-1 px-3 py-2 border border-gray-100 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition  cursor-pointer"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
