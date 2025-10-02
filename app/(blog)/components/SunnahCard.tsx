"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (seconds < 60) return `${seconds} seconds ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minutes ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  return `${days} days ago`;
}
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

const SunnahCard = ({ blogs }: BlogListProps) => {
  const [isShow, setShow] = useState("");
  const handleClick = (id: string) => {
    const selected = isShow === id ? "" : id;
    setShow(selected);
  };
  return (
    <>
      <div className="flex flex-wrap gap-2 justify-center w-[90%] max-w-3xl mx-auto">
        {blogs?.map((blog) => {
          return (
            <div
              key={blog?._id}
              className={`hover:scale-105 transition-all duration-300 border border-zinc-300 w-80 h-50 rounded overflow-hidden`}
            >
              <div
                onClick={() => handleClick(blog?._id)}
                className="w-80 h-35  m-auto flex justify-center items-center overflow-hidden relative"
              >
                <Image
                  src={blog?.image}
                  alt={blog?.title?.slice(0, 100) || "blog image"}
                  className="object-cover"
                  fill
                  unoptimized={false}
                />
                <div
                  className={`flex flex-col w-20 justify-between items-center p-1 bg-black/20 rounded absolute top-0 left-0  text-white ${
                    isShow == blog?._id ? "hidden" : ""
                  }`}
                >
                  <span className=" text-xs">{blog?.category}</span>
                  <p className="text-xs  ">{timeAgo(blog.updatedAt)}</p>
                </div>
              </div>

              <Link href={`/single/${blog?._id}`}>
                <h1
                  className={`${
                    isShow == blog?._id ? "bg-black/90 text-white" : "bg-white"
                  } font-semibold text-xs  px-5 py-2 text-center w-full`}
                >
                  {blog.title && blog.title.length > 105
                    ? blog.title.slice(0, 105) + "..."
                    : blog.title}
                </h1>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SunnahCard;
