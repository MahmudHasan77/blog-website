import blogModel from "@/lib/BlogModel";
import database from "@/lib/MongoDB";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const limit = 20;
    const page = body.page;
    const skip = (page - 1) * limit;
    database();
    const count = await blogModel.countDocuments({ category: "sunnah" });
    const blogs = await blogModel
      .find({ category: "sunnah" })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    return NextResponse.json(
      {
        success: true,
        blogs,
        totalBlogs: count,
        totalPage: Math.ceil(count / limit),
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
};
