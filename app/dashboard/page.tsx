export default function Dashboard() {
    const project =[
        {project_id:1, projectName:"Hrm power"},
         {project_id:2, projectName:"Asset manager"},
          {project_id:3, projectName:"Skylink lifts"},
    ]
    return (
        <div className="min-h-screen p-4">
           <div className="grid grid-cols-[3fr_1fr] min-h-screen">
             <div>
            <select name="role"
             className="px-3 py-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
             >
              <option value="Select Project">Select Project</option>
              {project.map((role) => (
                <option key={role.project_id}>
                  {role.projectName}
                </option>
              ))}

            </select>

          </div>
             <div className="bg-yellow-200 flex min-h-screen">
                <h1>helloo</h1>
            </div>
        </div>
        </div>
    )

}