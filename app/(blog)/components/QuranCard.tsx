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

const QuranCard = ({ blogs }: BlogListProps) => {
  const [isShow, setShow] = useState("");
  const handleClick = (id: string) => {
    const selected = isShow === id ? "" : id;
    setShow(selected);
  };
  return (
    <>
      <div className="flex flex-wrap gap-2 justify-center w-80 max-w-3xl mx-auto">
        {blogs?.map((blog, index) => {
          return (
            <div
              key={blog?._id}
              className={`hover:scale-105 transition-all duration-300 border border-zinc-300 w-80 h-85 rounded overflow-hidden relative`}
              onClick={() => handleClick(blog?._id)}
            >
              <div className="relative w-80 h-44">
                <Image
                  src={blog?.image}
                  alt={blog?.title?.slice(0, 100) || "blog image"}
                  className="object-cover"
                  fill
                  unoptimized={false}
                  placeholder="blur"
                  blurDataURL="https://res.cloudinary.com/dpf3ipd7p/image/upload/v1755093621/blur-white_fskalg.jpg"
                />
              </div>

              <div
                className={`flex flex-col left-0 w-20 justify-between items-center p-1 bg-black/20 rounded absolute top-0  text-white ${
                  isShow == blog?._id ? "hidden" : ""
                }`}
              >
                <span className=" text-xs">{blog?.category}</span>
                <p className="text-xs  ">{timeAgo(blog.updatedAt)}</p>
              </div>

              <Link href={`/single/${blog?._id}`}>
                <div
                  className={` px-5 py-2  ${
                    isShow == blog?._id
                      ? "bg-white/0"
                      : index % 2 !== 0
                      ? "bg-black/40 text-white"
                      : "bg-white/50"
                  }`}
                >
                  <h1 className={` font-semibold text-sm text-center w-full`}>
                    {blog.title && blog.title.length > 80
                      ? blog.title.slice(0, 70) + "..."
                      : blog.title}
                  </h1>
                  <p className="text-sm text-center">
                    {blog?.content?.slice(0, 200) + "..."}
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default QuranCard;
