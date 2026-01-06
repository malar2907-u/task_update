"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CommonTable from "../component/commontable";
import { fetchDataWithoutParams } from "../component/service";

/* ---------- TYPES ---------- */

type Project = {
  project_id: number;
  project_name: string;
  client_name: string;
  client_contact_number: string;
  client_email_id: string;
  client_country: string;
  start_date: string;
  end_date: string;
  sprint_duration: number;
  estimated_hours: string;
  description: string;
};

type ApiResponse<T> = {
  success: boolean;
  data: T;
};

type Column = {
  header: string;
  accessor: string;
  isDate?: boolean;
};

/* ---------- COMPONENT ---------- */

export default function Projects() {
  const router = useRouter();

  const [getAllProject, setGetAllProject] = useState<Project[]>([]);

  const getProjects = async () => {
    try {
      const response: ApiResponse<Project[]> =
        await fetchDataWithoutParams({
          apiUrl: "/api/createproject/getprojects",
        });

      if (response.success) {
        setGetAllProject(response.data);
      }
    } catch (error) {
      console.error("Error while fetching projects", error);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);


  const projectColumns: Column[] = [
    { header: "Project Name", accessor: "project_name" },
    { header: "Client Name", accessor: "client_name" },
    { header: "Email", accessor: "client_email_id" },
    { header: "Country", accessor: "client_country" },
    { header: "Start Date", accessor: "start_date", isDate: true },
    { header: "End Date", accessor: "end_date", isDate: true },
    { header: "Sprint (Days)", accessor: "sprint_duration" },
    { header: "Estimated Hours", accessor: "estimated_hours" }
  ];

  return (
    <>
      <div className="flex justify-between mt-4 mx-2">
        <h1 className="text-lg font-bold">Project Details</h1>

        <button
          className="bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-sm cursor-pointer"
          onClick={() => router.push("/createproject")}
        >
          + Add Project
        </button>
      </div>

      <div className="p-2">
        <CommonTable columns={projectColumns} data={getAllProject} />
      </div>
    </>
  );
}
