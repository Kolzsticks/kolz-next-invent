import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    console.log("API received request:", { username }); // Debug log

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    const user = await db.user.findFirst({
      where: { username },
    });

    console.log("Found user:", user ? "yes" : "no"); // Debug log

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" }, 
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    console.log("Password valid:", isPasswordValid); // Debug log

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" }, 
        { status: 401 }
      );
    }

    const token = await new SignJWT({ 
      id: user.id, 
      username: user.username,
      role: user.role 
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(SECRET_KEY);

    const { password: _, ...userWithoutPassword } = user;

    console.log(user); // Debug log
    return NextResponse.json({
      success: true,
      user: {
        ...userWithoutPassword,
        access_token: token,
      }
    });
  } catch (error: any) {
    console.error("API error:", error); // Debug log
    return NextResponse.json(
      { error: "An error occurred", details: error.message },
      { status: 500 }
    );
  }
}