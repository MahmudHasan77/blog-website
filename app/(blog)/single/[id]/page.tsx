// app/blog/[id]/page.tsx
import mongoose from "mongoose";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import database from "@/lib/MongoDB";
import blogModel from "@/lib/BlogModel";

// ✅ TypeScript types
interface BlogTypes {
  _id: string;
  title: string;
  content: string;
  image: string;
  author: string;
  authorImage: string;
  category: string;
  createdAt: Date;
  view?: number;
}

interface PageProps {
  params: { id: string };
}

// ✅ Dynamic Metadata
export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return { title: "Blog not found" };
  }

  await database();
  const blog = await blogModel.findById(id).lean<BlogTypes>();
  if (!blog) return { title: "Blog not found" };

  return {
    title: blog.title,
    description: blog.content.slice(0, 150),
  };
}

// ✅ Page Component
const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  // 1. Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return notFound();
  }

  await database();

  // 2. Fetch Blog
  const blog = await blogModel.findById(id).lean<BlogTypes>();
  if (!blog) return notFound();

  // 3. Increment view count (optional)
  await blogModel.findByIdAndUpdate(id, { $inc: { view: 1 } });

  // 4. Fetch related blogs
  const relatedBlogs = await blogModel
    .find({ category: blog.category, _id: { $ne: blog._id } })
    .sort({ createdAt: -1 })
    .limit(10)
    .lean<BlogTypes[]>();

  return (
    <div className="grid md:flex mx-auto my-2">
      {/* Main Blog */}
      <div className="p-5 bg-white max-w-xl mx-auto">
        <div className="flex flex-col items-center justify-center py-5 gap-2">
          <div className="rounded-full overflow-hidden border border-gray-300 h-[50px] w-[50px]">
            <Image
              src={blog.authorImage}
              alt={blog.author}
              width={50}
              height={50}
            />
          </div>
          <p className="font-semibold text-sm">
            Written by: <span className="text-orange-500">{blog.author}</span>
          </p>
        </div>

        <span className="text-white bg-orange-400 px-5 pb-0.5 rounded">
          {blog.category}
        </span>

        <Image
          className="m-auto py-3"
          src={blog.image}
          alt={blog.title}
          width={200}
          height={200}
        />

        <h1 className="font-semibold text-red-900 mb-2 text-center">
          {blog.title}
        </h1>
        <p className="text-sm text-gray-700 p-3">{blog.content}</p>
      </div>

      {/* Related Blogs */}
      <div className="p-5">
        <h1 className="font-bold text-center">You Can Also Read</h1>
        <div>
          {relatedBlogs?.map((rBlog) => (
            <div
              key={rBlog._id}
              className="w-80 mx-auto flex justify-around items-center gap-2 border border-zinc-300 h-25 my-2 bg-white p-1 rounded-sm"
            >
              <div>
                <Image
                  src={rBlog.image}
                  alt={rBlog.title}
                  width={150}
                  height={100}
                />
              </div>
              <Link href={`/blog/${rBlog._id}`}>
                <div>
                  <h1 className="font-semibold text-sm">
                    {rBlog.title.length > 60
                      ? rBlog.title.slice(0, 60) + "..."
                      : rBlog.title}
                  </h1>
                  <p className="text-sm text-gray-700">
                    {rBlog.content.length > 60
                      ? rBlog.content.slice(0, 60) + "..."
                      : rBlog.content}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
