"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginService } from "../component/service";


interface loginDetails {
    userName : string;
    password : string;
}

export default function LoginPage() {
  const router = useRouter()
const [formData, setFormData] = useState<loginDetails>({
    userName : "",
    password : ""
})

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await LoginService(formData);
    console.log(response, "response");
  } catch (error) {
    console.error("error occurred", error);
  }
};


  const onChangeData = (name:string , value:string) => {
  setFormData((prev)=> ({...prev,
      [name]: value
  }))
  }
  const handleClick = ()=> {
    router.push("/signup")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <input
              type="text"
              name="userName"
              placeholder="Enter your email"
              value={formData.userName}
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

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <span className="text-blue-600 cursor-pointer hover:underline" onClick={handleClick}>
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
