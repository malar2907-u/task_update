"use client";

export default function CreateProjectModal({ isOpen, onClose }: any) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-4xl rounded-xl shadow-xl p-6 max-h-[90vh] overflow-y-auto">
        <h1 className="text-black font-bold mb-4">CREATE PROJECT</h1>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-gray-600 text-sm mx-2">User Name</label>
            <input
              type="text"
              name="userName"
              placeholder="Enter Project Name"
              className="w-full m-1 px-3 py-2 border border-gray-100 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            /></div>
          <div>
              <label className="text-gray-600 text-sm mx-2">Client Name</label>
            <input
              type="text"
              name="clientName"
              placeholder="Enter Client Name"
              className="w-full m-1 px-3 py-2 border border-gray-100 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            /></div>
          <div>
              <label className="text-gray-600 text-sm mx-2">Client Name</label>
            <input
              type="text"
              name="userName"
              placeholder="Enter Client Contact Number"
              className="w-full m-1 px-3 py-2 border border-gray-100 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            /></div>
          <div>
               <label className="text-gray-600 text-sm mx-2">Client Email Id</label>
            <input
              type="text"
              name="clientEmailId"
              placeholder="Enter Client Email Id"
              className="w-full m-1 px-3 py-2 border border-gray-100 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            /></div>
             <div>
                  <label className="text-gray-600 text-sm mx-2">Start Date</label>
            <input
              type="text"
              name="startDate"
              placeholder="Enter Start Date"
              className="w-full m-1 px-3 py-2 border border-gray-100 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            /></div>
              <div>
              <label className="text-gray-600 text-sm mx-2">End Date</label>
            <input
              type="text"
              name="endDate"
              placeholder="Enter End Date"
              className="w-full m-1 px-3 py-2 border border-gray-100 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            /></div>
              <div>
                    <label className="text-gray-600 text-sm mx-2">Estimated hours</label>
            <input
              type="text"
              name="estimatedHours"
              placeholder="Enter Estimated hours"
              className="w-full m-1 px-3 py-2 border border-gray-100 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            /></div>
             <div>
                  <label className="text-gray-600 text-sm mx-2">Total Sprint Plan</label>
            <input
              type="text"
              name="userName"
              placeholder="Enter total sprint"
              className="w-full m-1 px-3 py-2 border border-gray-100 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            /></div>
              <div>
                    <label className="text-gray-600 text-sm mx-2">Project Status</label>
            <input
              type="text"
              name="projectStatus"
              placeholder="Enter Project Status"
              className="w-full px-3 py-2 border border-gray-100 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
             {/* <label className="text-gray-600 text-sm mx-2">document upload</label> */}
            <input
              type="file"
              name="docfile"
              placeholder="Enter Project Status"
              className="w-full mt-4 px-3 py-1 border border-gray-200 rounded-sm"
            />
            </div>
            
            <div>
                  <label className="text-gray-600 text-sm mx-2">Description</label>
            <textarea className="w-full m-1 px-3 py-2 border border-gray-100 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-26"/>
            </div>
            
        </div>
        <div className="gap-4 flex justify-end mt-4">
        <button className="bg-blue-500 py-2 px-4 rounded-sm text-white font-medium text-sm cursor-pointer">Submit</button>
        <button className="border-1 border-blue-500 p-2 px-4 rounded-sm text-blue-500 font-medium text-sm cursor-pointer">Cancel</button>
        </div>
      </div>
    </div>
  );
}
