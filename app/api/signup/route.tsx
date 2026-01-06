import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

interface SignupRequest {
  userName: string;
  password: string;
  conformPassword: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: SignupRequest = await req.json();

    if (!body.userName || !body.password || !body.conformPassword) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    if (body.password !== body.conformPassword) {
      return NextResponse.json({ message: "Passwords do not match" }, { status: 400 });
    }

    const [existingUsers]: any = await db.execute(
      `SELECT * FROM task_update WHERE userName = ?`,
      [body.userName]
    );

    if (existingUsers.length > 0) {
      return NextResponse.json({ message: "Username already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    await db.execute(
      `INSERT INTO task_update (userName, password) VALUES (?, ?)`,
      [body.userName, hashedPassword]
    );

    return NextResponse.json({ message: "Signup successfully",success:true }, { status: 201 });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
