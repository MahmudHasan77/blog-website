import blogModel from "@/lib/BlogModel";
import { NextResponse } from "next/server";

export const POST = async () => {
  try {
    const blogs = await blogModel.find().sort({ view: -1 }).limit(10);

    if (blogs.length === 0) {
      return NextResponse.json(
        { success: false, message: "No blogs found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, blogs }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
};
