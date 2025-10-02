import blogModel from "@/lib/BlogModel";
import database from "@/lib/MongoDB";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    database();
    const limit = 20;
    const skip = (body?.page-1)*limit;
const count = await blogModel.countDocuments({title:{$regex:body?.search,$options:"i"}})
    const blogs = await blogModel
      .find({ title: { $regex: body.search, $options: "i" } })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
const totalPage = Math.ceil(count/limit)

    return NextResponse.json({ success: true, blogs ,totalPage}, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
};
