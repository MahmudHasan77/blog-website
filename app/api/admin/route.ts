import adminModel from "@/lib/adminModel";
import database from "@/lib/MongoDB";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (request: Request) => {
  try {
    database()
    const data = await request.json();
    const { email, password, role } = data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new adminModel({
      email,
      password: hashedPassword,
      role,
    });
  await newAdmin.save();
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
};
