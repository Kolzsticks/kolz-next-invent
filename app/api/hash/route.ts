import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    if (!password) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return NextResponse.json({
      success: true,
      hashedPassword,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "An error occurred while hashing the password",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
