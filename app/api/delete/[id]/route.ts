import database from "@/lib/MongoDB";
import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import blogModel from "../../../../lib/BlogModel";
import { authMiddleware } from "@/lib/authMiddleware";
import connectCloudinary from "@/lib/Cloudinary";

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
  const isAdmin = await authMiddleware(request);
  if (!isAdmin) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }
    await database();

    const { id } =  params;
const blog = await blogModel.findById(id)
if(!blog){
  return NextResponse.json({success:false,message:'blog not found'})
}
const blogImage = blog?.image;
const arrayImage = blogImage.split("/")
const  publicUrl = arrayImage[arrayImage.length -1].split(".")[0]

connectCloudinary()
 await cloudinary.uploader.destroy(publicUrl)
    const deletedBlog = await blogModel.findByIdAndDelete(id);

    if (!deletedBlog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Blog deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to delete blog", error },
      { status: 500 }
    );
  }
};
