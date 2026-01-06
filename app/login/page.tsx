"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginService, postMethodService } from "../component/service";
import InputField from "../component/inputfield";


interface loginDetails {
  userName: string;
  password: string;
}

interface formError {
  userName?: string;
  password?: string;
  conformPassword?: string;
  role?: string;
}


export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<loginDetails>({
    userName: "",
    password: ""
  })
  const [formError, setFormError] = useState<formError>({
    userName: "",
    password: ""
  })

  const validation = (): boolean => {
    const formErrors: formError = {};
    let isVaild = true;
    if (!formData.userName) {
      formErrors.userName = "Enter the userName"
      isVaild = false;
    }
    if (!formData.password) {
      formErrors.password = "Enter the password"
      isVaild = false
    }
    setFormError(formErrors);
    return isVaild
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validation()) return

    try {
      const response = await postMethodService({
        apiUrl:"/api/login",
        payload:formData
      }
      );
      if (response.success === true) {
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("error occurred", error);
    }
  };


  const onChangeData = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  const handleClick = () => {
    router.push("/signup")
  }
  const fields = [
    {
      labelName: "User Name",
      placeholder: "User Name",
      name: "userName",
      value: formData.userName,
      required: true,
      type: "text",
      onChange: onChangeData,
      error: formError.userName
    },
    {
      labelName: "Password",
      placeholder: "Password",
      name: "password",
      value: formData.password,
      required: true,
      onChange: onChangeData,
      type: "password",
      error: formError.password
    },
  ];


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          {fields.map(field => (
            <InputField
              key={field.name}
              labelName={field.labelName}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              value={field.value}
              required={field.required}
              onChange={field.onChange}
              error={field.error}
            />
          ))}

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
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
