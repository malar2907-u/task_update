import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { project_id: string } }
) {
  try {
    const { project_id } = params;

    const [rows] = await db.execute(
      "SELECT * FROM projects WHERE project_id = ?",
      [project_id]
    );

    return NextResponse.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
