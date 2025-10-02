"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { BiListUl } from "react-icons/bi";
import { RiMenu5Fill } from "react-icons/ri";
import Image from "next/image";
const SideBar = () => {
  const pathName = usePathname();
  const [isShow, setShow] = useState(false);
  return (
    <div>
      <div>
        <div className="flex justify-around border-b border-zinc-300 items-center fixed w-full bg-white z-50">
          <button className={`${isShow ? "text-orange-500" : ""} fixed left-5`}>
            <RiMenu5Fill
              className="text-xl cursor-pointer"
              onClick={() => setShow(!isShow)}
            />
          </button>
          <Link href="/admin">
            <Image
              src={"/islamic-logo.jpg"}
              height={50}
              width={50}
              alt="logo"
            />
          </Link>
          <h1 className="font-bold text-2xl text-orange-600">Admin Panel</h1>
        </div>
      </div>
      <div
        className={`${
          isShow ? "" : "-ml-52"
        }  flex flex-col gap-4 py-3 w-40 border border-zinc-300 pt-18 shadow min-h-screen bg-zinc-100 duration-300`}
       >
        <Link href="/admin/upload">
          <div
            className={`${
              pathName === "/admin/upload"
                ? "bg-gray-900  text-white"
                : "bg-white text-black"
            } flex items-center justify-between p-2  border border-gray-300 font-bold`}
          >
            <span>
              <IoIosAdd />
            </span>
            Add Blog
          </div>
        </Link>
        <Link href="/admin/addHomeSlider">
          <div
            className={`${
              pathName === "/admin/addHomeSlider"
                ? "bg-gray-900  text-white"
                : "bg-white text-black"
            } flex items-center justify-between p-2  border border-gray-300 font-bold`}
          >
            <span>
              <IoIosAdd />
            </span>

            <span className="">Add Slider</span>
          </div>
        </Link>
        <Link href="/admin/blogList">
          <div
            className={`${
              pathName === "/admin/blogList"
                ? "bg-gray-900 text-white"
                : "bg-white text-black"
            } flex items-center justify-between p-2 border border-gray-300 font-bold`}
          >
            <span>
              <BiListUl />
            </span>
            Blogs List
          </div>
        </Link>
        <Link href="/admin/subscribers">
          <div
            className={`${
              pathName === "/admin/subscribers"
                ? "bg-gray-900 text-white"
                : "bg-white text-black"
            } flex items-center justify-between p-2 border border-gray-300 font-bold`}
          >
            <span>
              <BiListUl />
            </span>
            Subscriber List
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
