import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
    const [roles] = await db.execute("select * from roles");
      return NextResponse.json(
      {success:true , data: roles})
    } catch(error) {
      return NextResponse.json(
      {success:false , message:error})
    }

}