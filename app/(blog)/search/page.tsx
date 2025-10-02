"use client";
import { Pagination } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FcSearch, FcSynchronize } from "react-icons/fc";
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
const Page = () => {
  const [searchValue, setSearchValue] = useState("");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchingSearch = async () => {
      try {
        setLoading(true)
        const response = await axios.post("/api/search", {
          search: searchValue,
          page:page
        });
        setBlogs(response?.data?.blogs);
        setTotalPages(response?.data?.totalPage);
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false)
      }
    };
    fetchingSearch();
  }, [page, searchValue]);
  return (
    <div>
      <div
        className={`mx-auto w-80 transition-transform duration-300 z-40  bg-white my-2 rounded-full searchBarShadow`}
      >
        <div className="relative">
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            type="text"
            className="outline-none p-2 text-center w-full"
          />
          {!searchValue && (
            <span className="absolute top-1/2 -translate-y-1/2 right-3.5">
              <FcSearch />
            </span>
          )}
          {searchValue && isLoading && (
            <span className="absolute top-1/2 -translate-y-1/2 right-3.5">
              <FcSynchronize className="animate-spin" />
            </span>
          )}
        </div>
      </div>

      <div>
        {blogs.length > 0 &&
          blogs?.map((blog) => (
            <div
              key={blog?._id}
              className={
                "w-80 mx-auto flex justify-around items-center gap-2 border border-zinc-300 h-25 my-2 bg-white p-1 rounded-sm"
              }
            >
              <div>
                <Image
                  src={blog?.image}
                  alt={blog.title}
                  height={80}
                  width={100}
                />
              </div>
              <Link href={`/single/${blog?._id}`}>
                <div className="">
                  <h1 className={"font-semibold text-sm"}>
                    {blog?.title?.length > 60
                      ? blog?.title.slice(0, 60) + "..."
                      : blog?.title}
                  </h1>
                  <p className="text-sm text-gray-700">
                    {blog?.content?.length > 60
                      ? blog?.content.slice(0, 60) + "..."
                      : blog?.content}
                  </p>
                </div>
              </Link>
            </div>
          ))}
      </div>
              <div className="flex justify-center items-center my-5">
                <Pagination
                  count={totalPages}
                  boundaryCount={1}
                  siblingCount={0}
                  page={page}
                  onChange={(e, v) => setPage(v)}
                  variant="outlined"
                />
              </div>
    </div>
  );
};

export default Page;
