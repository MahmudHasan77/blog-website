import Image from "next/image";
import Link from "next/link";
import React from "react";
type Blog = {
  _id: string;
  title: string;
  content: string;
  image: string;
  author: string;
  authorImage: string;
  category: string;
  updatedAt: string;
};

type BlogListProps = {
  blogs: Blog[];
};

const QuranSmallCard = ({ blogs }: BlogListProps) => {
  return (
    <div className="flex flex-wrap gap-2 justify-around  max-w-3xl mx-auto mt-4">
      {blogs?.map((blog) => {
        return (
          <div
            key={blog?._id}
            className="w-80 border border-zinc-300 bg-white rounded h-15 flex gap-2 justify-between"
          >
            <div className="relative h-full min-w-20 border">
              <Image
                src={blog?.image}
                fill
                className="object-cover"
                alt={blog?.title?.slice(0, 100)}
              />
            </div>
            <Link href={`/single/${blog?._id}`}>
              <h1 className="text-sm py-1">
                {blog?.title?.length > 80
                  ? blog?.title?.slice(0, 70) + "..."
                  : blog?.title}
              </h1>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default QuranSmallCard;
