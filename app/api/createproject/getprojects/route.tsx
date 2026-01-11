import { db } from "@/lib/db";
import { NextResponse } from "next/server";

 export async function GET() {
    try {
    const [rows] = await db.execute(`select p.project_id, p.project_name,p.client_name,p.client_country,p.client_email_id,p.start_date,p.end_date,p.sprint_duration,p.estimated_hours,
s.status from projects p join status s on p.status_id = s.status_id order by project_id desc`)
    return NextResponse.json(
  {success:true, data:rows}
    )
}
catch(error) {
    return NextResponse.json(
        {success:false, message:error}
    )
}
 }