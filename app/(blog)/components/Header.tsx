"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FcSearch } from "react-icons/fc";
const Header = () => {
  const pathName = usePathname();

  return (
    <header className="flex border border-zinc-200  flex-col justify-between items-center md:flex-row sticky top-0 bg-white z-50 md:h-20">
      <div className="flex justify-around items-center w-[80%]  ">
        <Link prefetch href="/">
          <Image src={"/islamic-logo.jpg"} height={40} width={40} alt="logo" />
        </Link>

        <h1 className="headLindeStyle font-bold text-xl">
          Let`s Learn About Islam
        </h1>
      </div>

      <div className=" flex  items-center justify-between w-[90%]   font-semibold text-xs text-gray-600">
        <div
          className={`${
            pathName === "/" && "border border-orange-200"
          } relative overflow-hidden p-0.5`}
        >
          <div className="bg-white z-50">
            <Link
              prefetch
              className={`${
                pathName === "/" && "text-orange-800 navStyle"
              } text-orange-500 px-1 pb-0.5`}
              href={"/"}
            >
              Home
            </Link>
          </div>
          {pathName === "/" && (
            <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 -z-500 animateStyle w-15 h-3 " />
          )}
        </div>
        <div
          className={`${
            pathName === "/quran" && "border border-orange-200"
          } relative overflow-hidden p-0.5`}
        >
          <div className="bg-white z-50">
            <Link
              prefetch
              className={`${
                pathName === "/quran" && "text-orange-800 navStyle"
              } text-orange-500 px-1 pb-0.5`}
              href={"/quran"}
            >
              Quran
            </Link>
          </div>
          {pathName === "/quran" && (
            <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 -z-500 animateStyle w-15 h-3 " />
          )}
        </div>
        <div
          className={`${
            pathName === "/sunnah" && "border border-orange-200"
          } relative overflow-hidden p-0.5`}
        >
          <div className="bg-white z-50">
            <Link
              prefetch
              className={`${
                pathName === "/sunnah" && "text-orange-800 navStyle"
              } text-orange-500 px-1 pb-0.5`}
              href={"/sunnah"}
            >
              Sunnah
            </Link>
          </div>
          {pathName === "/sunnah" && (
            <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 -z-500 animateStyle w-15 h-3 " />
          )}
        </div>
        <div
          className={`${
            pathName === "/about" && "border border-orange-200"
          } relative overflow-hidden p-0.5`}
        >
          <div className="bg-white z-50">
            <Link
              prefetch
              className={`${
                pathName === "/about" && "text-orange-800 navStyle"
              } text-orange-500 px-1 pb-0.5`}
              href={"/about"}
            >
              About us
            </Link>
          </div>
          {pathName === "/about" && (
            <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 -z-500 animateStyle w-15 h-3 " />
          )}
        </div>
        <div
          className={`${
            pathName === "/contact" && "border border-orange-200"
          } relative overflow-hidden p-0.5`}
        >
          <div className="bg-white z-50">
            <Link
              prefetch
              className={`${
                pathName === "/contact" && "text-orange-800 navStyle"
              } text-orange-500 px-1 pb-0.5`}
              href={"/contact"}
            >
              Contact us
            </Link>
          </div>
          {pathName === "/contact" && (
            <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 -z-500 animateStyle w-15 h-3 " />
          )}
        </div>

        <div>
          <span className="w-8 h-8 mx-auto rounded-full">
            <Link prefetch href={"/search"}>
              <div className="border border-zinc-300 mx-auto my-1 w-7 h-7 flex justify-center items-center rounded-full ">
                <span>
                  <FcSearch />
                </span>
              </div>
            </Link>
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
