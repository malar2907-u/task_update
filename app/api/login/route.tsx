import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

interface LoginRequest {
  userName: string;
  password: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: LoginRequest = await req.json();

    if (!body.userName || !body.password) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    // Get user by username
    const [rows]: any = await db.execute(
      `SELECT * FROM task_update WHERE userName = ?`,
      [body.userName]
    );

    if (rows.length === 0) {
      return NextResponse.json({ message: "User not found", success:false }, { status: 404 });
    }

    const user = rows[0];
   console.log(user,'userr')
    const isPasswordValid = await bcrypt.compare(body.password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid password", success:false }, { status: 401 });
    }

    return NextResponse.json({ message: "Login successful", success:true }, { status: 200 });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Internal server error", success:false }, { status: 500 });
  }
}
