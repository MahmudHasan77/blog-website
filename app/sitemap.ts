// app/sitemap.ts
import blogModel from "@/lib/BlogModel";
import database from "@/lib/MongoDB";
import { Types } from "mongoose";
import type { MetadataRoute } from "next";

const CHUNK_SIZE = 50000; // Google limit
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export async function generateSitemaps() {
  await database();
  const totalBlogs = await blogModel.countDocuments();
  const chunks = Math.ceil(totalBlogs / CHUNK_SIZE);
  return Array.from({ length: chunks }, (_, i) => ({ id: i }));
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  await database();
  const skip = id * CHUNK_SIZE;

  const allBlogs = await blogModel
    .find({}, { _id: 1, createdAt: 1 })
    .skip(skip)
    .limit(CHUNK_SIZE)
    .lean<{ _id: Types.ObjectId; createdAt: Date }[]>();

  return allBlogs.map((blog) => ({
    url: `${BASE_URL}/single/${blog._id.toString()}`,
    lastModified: blog.createdAt,
  }));
}
