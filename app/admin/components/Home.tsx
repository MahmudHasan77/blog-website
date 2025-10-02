import Link from "next/link";
import { FaPenAlt } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { GiBullseye } from "react-icons/gi";
import React from "react";
import { IoStatsChart } from "react-icons/io5";
import { TfiLayoutSliderAlt } from "react-icons/tfi";
const Home = ({
  countBlogs,
  subscriberCount,
  visit,
  HomeSliders,
}: {
  countBlogs: number;
  subscriberCount: number;
  visit: number;
  HomeSliders: number;
}) => {
  return (
    <div className="my-5 flex flex-wrap justify-center gap-3 max-w-xl mx-auto">
      <div className="w-60 flex flex-col justify-center h-30 rounded border border-orange-300 homeBoxStyle bg-white shadow">
        <div className="flex w-full h-full items-center justify-center">
          <div className="flex items-center justify-center px-2">
            <FaPenAlt className="text-4xl text-orange-600" />
          </div>
          <div className="flex flex-1  items-center justify-center flex-col">
            <h1 className="font-bold text-2xl text-red-500 ">{countBlogs}</h1>
            <h1 className="font-bold ">Total Blogs</h1>
          </div>
          <div className="flex items-center justify-center px-2">
            <IoStatsChart className="text-5xl text-orange-600" />
          </div>
        </div>
        <div className="flex justify-center items-center border-t border-green-200 pb-2 text-sm">
          <Link href={"/admin/blogList"}>View all Blogs</Link>
        </div>
      </div>

      <div className="w-60 flex flex-col justify-center h-30 rounded border border-blue-300 homeBoxStyle bg-white shadow">
        <div className="flex w-full h-full items-center justify-center">
          <div className="flex items-center justify-center px-2">
            <TfiLayoutSliderAlt className="text-4xl text-blue-600" />
          </div>
          <div className="flex flex-1  items-center justify-center flex-col">
            <h1 className="font-bold text-2xl text-blue-500 ">{HomeSliders}</h1>
            <h1 className="font-bold text-xs">Total Home Slider</h1>
          </div>
          <div className="flex items-center justify-center px-2">
            <IoStatsChart className="text-5xl text-blue-600" />
          </div>
        </div>
        <div className="flex justify-center items-center border-t border-blue-200 pb-2 text-sm">
          <Link href={"/admin//viewBlog"}>View Blogs</Link>
        </div>
      </div>
      <div className="w-60 flex flex-col justify-center h-30 rounded border border-green-300 homeBoxStyle bg-white shadow">
        <div className="flex w-full h-full items-center justify-center">
          <div className="flex items-center justify-center px-2">
            <TfiLayoutSliderAlt className="text-4xl text-green-600" />
          </div>
          <div className="flex flex-1  items-center justify-center flex-col">
            <h1 className="font-bold text-2xl text-green-500 ">
              {HomeSliders}
            </h1>
            <h1 className="font-bold text-xs">Total Home Slider</h1>
          </div>
          <div className="flex items-center justify-center px-2">
            <IoStatsChart className="text-5xl text-green-600" />
          </div>
        </div>
        <div className="flex justify-center items-center border-t border-green-200 pb-2 text-sm">
          <Link href={"/admin//viewBlog"}>View Blogs</Link>
        </div>
      </div>

      <div className="w-60 flex flex-col justify-center h-30 rounded border border-orange-300 homeBoxStyle bg-white shadow">
        <div className="flex w-full h-full items-center justify-center">
          <div className="flex items-center justify-center px-2">
            <GiBullseye className="text-4xl text-orange-600" />
          </div>
          <div className="flex flex-1  items-center justify-center flex-col">
            <h1 className="font-bold text-2xl text-orange-500 ">{visit}</h1>
            <h1 className="font-bold">
              Most <span className="text-xs">(10)</span> Visited{" "}
            </h1>
          </div>
          <div className="flex items-center justify-center px-2">
            <IoStatsChart className="text-5xl text-orange-600" />
          </div>
        </div>
        <div className="flex justify-center items-center border-t border-orange-200 pb-2 text-sm">
          <Link href={"/admin//viewBlog"}>View Blogs</Link>
        </div>
      </div>
      <div className="w-60 flex flex-col justify-center h-30 rounded border border-green-300 homeBoxStyle bg-white shadow">
        <div className="flex w-full h-full items-center justify-center">
          <div className="flex items-center justify-center px-2">
            <FaUsers className="text-4xl text-green-600" />
          </div>
          <div className="flex flex-1  items-center justify-center flex-col">
            <h1 className="font-bold text-2xl text-green-500 ">
              {subscriberCount}
            </h1>
            <h1 className="font-bold text-sm">Total Subscribers</h1>
          </div>
          <div className="flex items-center justify-center px-2">
            <IoStatsChart className="text-5xl text-green-600" />
          </div>
        </div>
        <div className="flex justify-center items-center border-t border-green-200 pb-2 text-sm">
          <Link href={"/admin//subscribers"}>View all Subscriber</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
