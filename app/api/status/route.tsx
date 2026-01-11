import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
      const [status]= await db.execute("select * from status");
      return NextResponse.json( 
        {success:true, data:status}
      )
    } catch(error) {
        return NextResponse.json(
            {success:false, message:error}
        )
    }
}