import { authMiddleware } from "@/lib/authMiddleware";
import homeSliderModel from "@/lib/homeSliderModel";
import database from "@/lib/MongoDB";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import connectCloudinary from "@/lib/Cloudinary";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const isAdmin = await authMiddleware(request);
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    await database();
    await connectCloudinary();
    const slider = await homeSliderModel.findById(body?.id);
    const arrayImage = slider?.image?.split("/");
    const publicUrl = arrayImage[arrayImage.length - 1].split(".")[0];
    await cloudinary.uploader.destroy(publicUrl);
    const deletedSlider = await homeSliderModel.findByIdAndDelete(body?.id);
    if (!deletedSlider) {
      return NextResponse.json(
        { success: false, message: "something went wrong try again" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: true, message: "slider deleted successfully" },
      { status: 202 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
};
