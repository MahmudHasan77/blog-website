// app/sitemap.ts
import blogModel from "@/lib/BlogModel";
import database from "@/lib/MongoDB";
import { Types } from "mongoose";
import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await database();
  const blogs = await blogModel
    .find({}, { _id: 1, createdAt: 1 })
    .lean<{ _id: Types.ObjectId; createdAt: Date }[]>();

  return blogs.map((blog) => ({
    url: `${BASE_URL}/single/${blog._id.toString()}`,
    lastModified: blog.createdAt,
  }));
}
