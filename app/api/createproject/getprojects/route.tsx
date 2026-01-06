import { db } from "@/lib/db";
import { NextResponse } from "next/server";

 export async function GET() {
    try {
    const [rows] = await db.execute("select * from projects order by project_id desc")
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