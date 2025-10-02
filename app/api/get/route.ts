import blogModel from "@/lib/BlogModel";
import database from "@/lib/MongoDB";
import { NextResponse } from "next/server";
export const POST = async (request: Request) => {
  try {
    database();
    const body = await request.json();
    const { page } = body;
    const limit = 10;
    const skip = (page - 1) * limit;

    const countBlogs = await blogModel.countDocuments();
    const blogs = await blogModel
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json(
      { success: true, blogs, totalPages: Math.ceil(countBlogs / limit) },
      { status: 200 }
    );
  } catch (error) {
    NextResponse.json({ status: 500, message: "something went wrong" });
    console.log(error);
  }
};
