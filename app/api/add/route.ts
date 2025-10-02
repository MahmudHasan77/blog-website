import database from "@/lib/MongoDB";
import { NextRequest, NextResponse } from "next/server";
import blogModel from "../../../lib/BlogModel";
import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
} from "cloudinary";
import connectCloudinary from "@/lib/Cloudinary";
import { authMiddleware } from "@/lib/authMiddleware";

export const POST = async (request: NextRequest) => {
  try {
  const isAdmin = await authMiddleware(request);
  if (!isAdmin) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }
    await database();
    connectCloudinary();

    const formData = await request.formData();

    const title = formData.get("title");
    const content = formData.get("content");
    const author = formData.get("author");
    const category = formData.get("category");
    const image = formData.get("image");
    const authorImage = formData.get("authorImage");

    if (!title || !content || !author || !category || !image || !authorImage) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    if (!(image instanceof File) || !(authorImage instanceof File)) {
      return NextResponse.json(
        { success: false, message: "Invalid file type" },
        { status: 400 }
      );
    }

    const imageBuffer = Buffer.from(await image.arrayBuffer());
    const authorImageBuffer = Buffer.from(await authorImage.arrayBuffer());

    // Upload image
    const uploadToCloudinary = (
      buffer: Buffer
    ): Promise<UploadApiResponse | UploadApiErrorResponse> => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream((error, result) => {
            if (error) return reject(error);
            if (!result) return reject(new Error("Upload failed"));
            resolve(result);
          })
          .end(buffer);
      });
    };

    const result = await uploadToCloudinary(imageBuffer);
    const authorResult = await uploadToCloudinary(authorImageBuffer);

    // Create blog in MongoDB
    const newBlog = new blogModel({
      title: String(title),
      category: String(category),
      content: String(content),
      image: result.secure_url,
      author: String(author),
      authorImage: authorResult.secure_url,
    });

    await newBlog.save();

    return NextResponse.json(
      { success: true, message: "Blog added successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to add blog", error },
      { status: 500 }
    );
  }
};
