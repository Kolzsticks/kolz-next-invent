import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    const user = await db.user.findFirst({
      where: { username },
    });

    if (!user) {
      console.log("User not found"); // Debug log
      return NextResponse.json({ error: "Invalid credentials" }, { status: 404 });
    }

    // console.log("Stored password hash:", user.password); // Debug log

    // Compare the plaintext password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // console.log("Password comparison result:", isPasswordValid); // Debug log

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({ user: userWithoutPassword });
  } catch (error: any) {
    return NextResponse.json(
      { error: "An error occurred", details: error.message },
      { status: 500 }
    );
  }
}
