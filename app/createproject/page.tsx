"use client";

import { useEffect, useState } from "react";
import InputField from "../component/inputfield";
import { fetchDataWithoutParams, postMethodService } from "../component/service";
import { useRouter } from "next/navigation";


interface AddProject {
  projectName: string;
  clientName: string;
  clientContactNumber: string;
  clientEmail: string;
  clientCountry: string;
  startDate: string;
  endDate: string;
  sprintDuration: number;
  estimatedHours: number;
  status: number,
  projectDescription: string;
}
type status = {
  status_id: number;
  status: string;
}
type ApiResponse<T> = {
  success: boolean;
  data: T
}


export default function CreateProject() {
  const router = useRouter();
  const [status, setStatus] = useState<status[]>([])
  const [formData, setFormData] = useState<AddProject>({
    projectName: "",
    clientName: "",
    clientContactNumber: "",
    clientEmail: "",
    clientCountry: "",
    startDate: "",
    endDate: "",
    sprintDuration: 0,
    estimatedHours: 0,
    status: 0,
    projectDescription: "",
  });

  const handleChange = (name: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [name]: name === "sprintDuration" || name === "estimatedHours" || name=== "status" ? Number(value) : value
    }))
  }

  const getStatus = async () => {
    try {
      const response: ApiResponse<status[]> = await fetchDataWithoutParams({ apiUrl: "/api/status" });
      console.log(response, "responseee")
      if (response.success) setStatus(response.data);
    } catch (err) {
      console.error("Error fetching roles:", err);
    }
  };

  useEffect(() => {
    getStatus();
  }, [])

  const statusOptions = status.map((status) => ({
    label: status.status,
    value: status.status_id,
  }))

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await postMethodService({
        apiUrl: "api/createproject",
        payload: formData
      })
      if (response.success) {
        router.push("/projects")
      }

    } catch (error) {
      console.error("error occured", error)
    }
  }
  const fields = [
    {
      labelName: "Project Name",
      name: "projectName",
      placeholder: "Enter project name",
      value: formData.projectName,
      onChange: handleChange
    },
    {
      labelName: "Client Name",
      name: "clientName",
      value: formData.clientName,
      placeholder: "Enter client name",
      onChange: handleChange
    },
    {
      labelName: "Country",
      name: "clientCountry",
      value: formData.clientCountry,
      placeholder: "Enter client name",
      onChange: handleChange
    },
    {
      labelName: "Client Contact Number",
      name: "clientContactNumber",
      placeholder: "Enter contact number",
      value: formData.clientContactNumber,
      type: "tel",
      onChange: handleChange
    },
    {
      labelName: "Client Email",
      name: "clientEmail",
      placeholder: "Enter email address",
      type: "email",
      value: formData.clientEmail,
      onChange: handleChange
    },
    {
      labelName: "Start Date",
      name: "startDate",
      type: "date",
      value: formData.startDate,
      onChange: handleChange
    },
    {
      labelName: "End Date",
      name: "endDate",
      type: "date",
      value: formData.endDate,
      onChange: handleChange
    },
    {
      labelName: "Sprint Duration (Days)",
      name: "sprintDuration",
      type: "number",
      value: formData.sprintDuration,
      placeholder: "Eg: 14",
      onChange: handleChange
    },
    {
      labelName: "Estimated Hours",
      name: "estimatedHours",
      type: "number",
      value: formData.estimatedHours,
      placeholder: "Eg: 120",
      onChange: handleChange
    },
    {
      labelName: "status",
      name: "status",
      value: formData.status,
      placeholder: "Select status",
      onchange: handleChange,
      type: "select",
      options: statusOptions
    },
    {
      labelName: "Project Description",
      name: "projectDescription",
      value: formData.projectDescription,
      placeholder: "Describe the project briefly",
      type: "textarea",
      onChange: handleChange
    },
  ];


  return (
    <>
      <div className="bg-gray-50 flex justify-center py-10 bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50 ">
        <div className="w-full max-w-6xl bg-white rounded-xl shadow-md p-8  ">

          {/* Header */}
          <div className="mb-6 border-b border-gray-200 pb-4">
            <h1 className="text-2xl font-semibold text-blue-500">
              Create Project
            </h1>
            <p className="text-xs font-bold text-black text-gray-500 mt-1">
              Fill in the details to create a new project
            </p>
          </div>

          {/* Form */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {fields.map((field) => (
              <InputField
                key={field.name}
                labelName={field.labelName}
                placeholder={field.placeholder}
                name={field.name}
                type={field.type}
                value={field.value}
                onChange={handleChange}
                options ={field.options}
              />
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-10">
            <button
              onClick={() => router.push("/projects")}
              className="px-4 py-2 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 transition cursor-pointer"
            >
              Cancel
            </button>

            <button
              onClick={handleCreateProject}
              className="px-4 py-2 rounded-md bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 transition shadow cursor-pointer"
            >
              Create
            </button>
          </div>

        </div>
      </div>

    </>
  );
}
