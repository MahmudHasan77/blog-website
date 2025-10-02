import { NextRequest, NextResponse } from "next/server";
import adminModel from "@/lib/adminModel";
import database from "@/lib/MongoDB";
import bcrypt from "bcrypt";
import { randomBytes } from "crypto";

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();
    await database();

    const admin = await adminModel.findOne({ email: data.email });
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Not authorized1" },
        { status: 403 }
      );
    }

    if (admin.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Not authorized" },
        { status: 403 }
      );
    }

    const isValid = await bcrypt.compare(data.password, admin.password);
    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Invalid password" },
        { status: 401 }
      );
    }

    // ✅ Create a NextResponse instance
    const response = NextResponse.json({success:true, message: "Login successful" });
    const sessionToken = randomBytes(16).toString("hex");

    admin.sessionToken = sessionToken;
    admin.sessionCreatedAt = new Date();
    await admin.save();

    response.cookies.set("session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
};
