import blogModel from "@/lib/BlogModel";
import database from "@/lib/MongoDB";

import Image from "next/image";
import React from "react";

interface BlogTypes {
  title: string;
  image: string;
  content: string;
  author: string;
  authorImage: string;
  category: string;
}

const Page = async ({ params }: { params: { id: string } }) => {
   const { id } = await params;
  let blog: BlogTypes = {
    title: "",
    image: "",
    content: "",
    author: "",
    authorImage: "",
    category: "",
  };
  try {
    database();
    const foundBlog = await blogModel.findById(id);
    if (foundBlog) {
      blog = foundBlog;
    }
  } catch (error) {
    console.log(error);
  }


  return (
    <div className="grid md:flex mx-auto my-2">
      <div className="p-5 bg-white max-w-xl mx-auto">
        <div className="flex  flex-col items-center justify-center py-5 gap-2">
          <div className="rounded-full overflow-hidden border border-gray-300 h-[50px] w-[50px]">
            <Image
              className=""
              src={blog?.authorImage}
              alt={blog.author}
              width={50}
              height={50}
            />
          </div>
          <p className="font-semibold text-sm">
            Written by : <span className="text-orange-500">{blog.author}</span>
          </p>
        </div>
        <span className="text-white bg-orange-400 px-5 pb-0.5 rounded">
          {blog?.category}
        </span>

        <Image
          className="m-auto py-3"
          src={blog?.image}
          alt={blog.title}
          width={200}
          height={200}
        />
        <h1 className="font-semibold text-red-900 mb-2 text-center">
          {blog.title}
        </h1>

        <p className="text-sm text-gray-700 p-3">{blog.content}</p>
      </div>

    </div>
  );
};
export default Page;
