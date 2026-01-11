import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
interface addProject {
    projectName : string,
    clientName:string,
    clientContactNumber:string,
    clientEmail:string,
    clientCountry:string,
    startDate:string,
    endDate:string,
    sprintDuration:number,
    estimatedHours:number,
    status:number,
    projectDescription:string,


}
export async function POST(req:NextRequest) {
    try {
 const body:addProject = await req.json()
 await db.execute(`insert into projects (project_name,client_name,client_contact_number,client_email_id,client_country,start_date,end_date,sprint_duration,estimated_hours,description,status_id) values(?,?,?,?,?,?,?,?,?,?,?)`, [body.projectName, body.clientName,body.clientContactNumber,body.clientEmail,body.clientCountry,body.startDate, body.endDate,body.sprintDuration,body.estimatedHours,body.projectDescription,body.status]);
 return NextResponse.json ({
    message: "Project Created Succesffully", success:true 
 }, {status:201})
    } catch(error) {
        return NextResponse.json ({
    message: "internal server error", success:false 
 }, {status:500})
    }
}