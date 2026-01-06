"use client";

import { useEffect, useState } from "react";
import { fetchDataWithoutParams, postMethodService } from "../component/service";
import { useRouter } from "next/navigation";
import InputField from "../component/inputfield";

interface LoginDetails {
  userName: string;
  password: string;
  conformPassword: string;
  role: string;
}

type RoleType = {
  role_id: number;
  role: string;
};

type ApiResponse<T> = {
  success: boolean;
  data: T;
};

interface FormError {
  userName?: string;
  password?: string;
  conformPassword?: string;
  role?: string;
}

export default function SignUp() {
  const [formData, setFormData] = useState<LoginDetails>({
    userName: "",
    password: "",
    conformPassword: "",
    role: ""
  });

  const [roles, setRoles] = useState<RoleType[]>([]);
  const [error, setError] = useState<FormError>({});
  const router = useRouter();

  const getRoles = async () => {
    try {
      const response: ApiResponse<RoleType[]> = await fetchDataWithoutParams({apiUrl:"/api/roles"});
      console.log(response, "responseee")
      if (response.success) setRoles(response.data);
    } catch (err) {
      console.error("Error fetching roles:", err);
    }
  };

  useEffect(() => {
    getRoles();
  }, []);
  console.log(roles, "v")

  const roleOptions = roles.map((role) => ({
    label: role.role,
    value: role.role
  }));
  console.log(roleOptions, "roleOptions")

  const validateForm = (): boolean => {
    const newError: FormError = {};
    let isValid = true;

    if (!formData.userName.trim()) {
      newError.userName = "Please enter user name";
      isValid = false;
    }

    if (!formData.role) {
      newError.role = "Please select role";
      isValid = false;
    }

    if (!formData.password) {
      newError.password = "Please enter password";
      isValid = false;
    }

    if (!formData.conformPassword) {
      newError.conformPassword = "Please enter confirm password";
      isValid = false;
    }

    if (formData.password && formData.conformPassword && formData.password !== formData.conformPassword) {
      newError.conformPassword = "Password and confirm password do not match";
      isValid = false;
    }

    setError(newError);
    return isValid;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await postMethodService({
        apiUrl: "api/signup",
        payload:formData
      })
      if (response.success) {
        router.push("/login");
      }
    } catch (err) {
      console.error("Sign up error:", err);
    }
  };

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const fields = [
    {
      labelName: "User Name",
      name: "userName",
      value: formData.userName,
      placeholder: "Enter User Name",
      onchange: handleChange,
      error: error.userName,
      required: true,
      type: "text"
    },
    {
      labelName: "Role",
      name: "role",
      value: formData.role,
      placeholder: "Select Role",
      onchange: handleChange,
      error: error.role,
      required: true,
      type: "select",
      options: roleOptions
    },
    {
      labelName: "Password",
      name: "password",
      value: formData.password,
      placeholder: "Enter Password",
      onchange: handleChange,
      error: error.password,
      required: true,
      type: "password"
    },
    {
      labelName: "Confirm Password",
      name: "conformPassword",
      value: formData.conformPassword,
      placeholder: "Confirm Password",
      onchange: handleChange,
      error: error.conformPassword,
      required: true,
      type: "password"
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>

        <form onSubmit={handleSignUp} className="space-y-4">
          {fields.map((field) => (
            <InputField
              key={field.name}
              labelName={field.labelName}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              value={field.value}
              required={field.required}
              onChange={field.onchange}
              options={field.options}
              error={field.error}
            />
          ))}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
          >
            Sign Up
          </button>

          <div
            className="flex justify-center mt-2 cursor-pointer"
            onClick={() => router.push("/login")}
          >
            <span className="text-sm text-gray-500 hover:text-gray-700">
              {"<< Back to Login"}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
