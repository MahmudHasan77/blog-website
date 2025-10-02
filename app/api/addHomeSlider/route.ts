import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import connectCloudinary from "@/lib/Cloudinary";
import homeSliderModel from "@/lib/homeSliderModel";
export const POST = async (request: NextRequest) => {
  try {
    const formData = await request.formData();
    await connectCloudinary();
    const title = formData.get("title") as string;
    const image = formData.get("image") as File;
    const base = await Buffer.from(await image.arrayBuffer()).toString(
      "base64"
    );
    const result = await cloudinary.uploader.upload(
      `data:${image.type};base64,${base}`
    );
    const newSlider = new homeSliderModel({
      title,
      image: result.secure_url,
    });
    const savedSlider = await newSlider.save();
    if (!savedSlider) {
      return NextResponse.json({ success: false }, { status: 200 });
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "something went wrong",
    });
  }
};
