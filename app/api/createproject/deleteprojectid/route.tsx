import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface deleteProject {
    status_id : number;
    project_id:number;
}

export async function GET(request:NextRequest) {
    try{
      const body: deleteProject = await request.json();
        const { status_id, project_id } = body;

    if (!status_id || !project_id) { 
      return NextResponse.json(
        { success: false, message: "Missing status_id or project_id" },
        { status: 400 }
      );
    }

    await db.execute(
      "UPDATE projects SET status_id = ? WHERE project_id = ?",
      [status_id, project_id]
    );
       return NextResponse.json (
        {success:true, message:"updated successfully"}, {status:200}
      )

    } catch(error) {
      return NextResponse.json (
        {message:"error occured", success:false}, {status:500}
      )
    }
}