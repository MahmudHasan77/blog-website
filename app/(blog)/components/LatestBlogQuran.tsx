"use client"
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

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

const LatestBlogQuran = ({ blogs }: BlogListProps) => {
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

const [isShow,setShow]=useState(false)
const divRef= useRef<HTMLDivElement>(null)
useEffect(()=>{
  const currentDiv = divRef.current
if(!currentDiv)return;
const observer = new IntersectionObserver(([entry])=>{
  if(entry.isIntersecting){
    setShow(true)
  }else{
    setShow(false)
  }
},{rootMargin:"-10% -0%"})
if(currentDiv){observer.observe(currentDiv)}
return ()=>{if(currentDiv){
  observer.unobserve(currentDiv)
}}
},[])

return (
    <div className="my-2 flex justify-center max-w-3xl mx-auto">
      {blogs?.map((blog) => {
        return (
          <div
          ref={divRef}
            key={blog?._id}
            className={` border border-orange-300 rounded w-80 h-101  mx-auto flex justify-center items-center overflow-hidden`}
          >
            <div className="w-79 h-100  rounded  relative bg-white">
              <div className={`w-79 h-30 mx-auto relative rounded  overflow-hidden `}>
                <Image
                  src={blog?.image}
                  fill
                  alt={blog?.title?.slice(0, 50)}
                  className="object-cover"
                />
                <span
                  className={
                    "absolute bg-black/50 text-white px-1 text-xs rounded"
                  }
                >
                  {timeAgo(blog?.updatedAt)}
                </span>
              </div>
              <div className={ `${isShow?'translate-0 opacity-100':'translate-y-[100%] opacity-0'} duration-500 w-79 mx-auto  bg-white p-1 text-center`}>
                <h1 className="font-semibold text-orange-800 mb-1">
                  {blog?.title}
                </h1>
                <h1 className=" font-semibold text-sm">
                  {blog?.content?.slice(0, 300) + "..."}
              <Link href={`/single/${blog?._id}`} className="text-orange-400">Read more...
                  </Link>
                </h1>
              </div>
              <div className="absolute animateLatestBlog h-150 -z-50   w-30  top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LatestBlogQuran;
