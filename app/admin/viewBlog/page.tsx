"use client";
import React, { useEffect, useState, useCallback } from "react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import Loader from "@/app/(blog)/components/Loader";
import { RiLoader3Fill } from "react-icons/ri";
import Image from "next/image";
import Link from "next/link";
type Blog = {
  _id: string;
  title: string;
  content: string;
  image: string;
  author: string;
  authorImage: string;
  category: string;
  updatedAt: string;
  createdAt: string;
  view:number
};
const Page = () => {
  const [isLoading, setLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const fetchingBlogs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/view", {});
      setBlogs(response?.data?.blogs);

      setIsDeleteLoading(true);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err?.response?.data?.message || "something went wrong!");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchingBlogs();
  }, [fetchingBlogs]);

  const handleDeleteClick = async (response: string) => {
    if (response === "yes" && selectedBlogId) {
      try {
        setDeleteLoading(selectedBlogId);
        const response = await axios.delete(`/api/delete/${selectedBlogId}`);
        fetchingBlogs();
        const data = response.data;
        toast.success(data?.message);
      } catch (error: unknown) {
        const err = error as AxiosError<{ message: string }>;
        toast.error(err?.response?.data?.message || "something went wrong");
      } finally {
        setDeleteLoading("");
      }
    }
  };
console.log(blogs)
  return (
    <div className="min-w-2xl">
      <h1 className="text-3xl font-bold text-center my-5">
        Most Visited Blog List
        <span className="text-xs">
          {blogs?.length > 0 && `Total blogs (${blogs?.length})`}
        </span>
      </h1>

      <div className="grid grid-cols-7 gap-5 text-center justify-center items-center font-semibold border-b-1 border-orange-500 pb-2">
        <h1>Author</h1>
        <h1 className="col-span-2">Title</h1>
        <h1>Image</h1>
        <h1>Views</h1>
        <h1>Date</h1>
        <h1>Delete</h1>
      </div>
      {isLoading && !isDeleteLoading ? (
        <Loader />
      ) : (
        <>
          {blogs?.map((blog) => (
            <div
              key={blog._id}
              className="grid grid-cols-7 gap-5 text-center justify-center items-center text-sm border-b border-gray-300 pb-2 pt-2"
            >
              <h2 className="text-xs">{blog.author}</h2>

              <h2 className="text-xs col-span-2">
                <Link href={`/admin/singleBlog/${blog?._id}`}>
                  {blog.title.length > 50
                    ? blog.title.slice(0, 50) + "..."
                    : blog.title}
                </Link>
              </h2>
              <Image
                src={blog?.image}
                height={50}
                width={50}
                alt="blog image"
                className="mx-auto"
              />
              <span className="font-bold text-red-500">{blog?.view}</span>
              <h2 className="text-xs">
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </h2>

              {deleteLoading === blog?._id ? (
                <div className="text-center cursor-pointer flex justify-center items-center border h-5 w-5 mx-auto bg-red-500 text-white rounded hover:scale-110 hover:shadow-lg transition-all duration-300 ease-in-out">
                  <RiLoader3Fill className="animate-spin" />
                </div>
              ) : (
                <div
                  onClick={() => {
                    return setSelectedBlogId(blog?._id), setShowModal(true);
                  }}
                  className="text-center cursor-pointer flex justify-center items-center text-red-500  h-5 w-5 mx-auto rounded hover:scale-110 hover:shadow-lg transition-all duration-300 ease-in-out"
                >
                  <RxCross2 />
                </div>
              )}
            </div>
          ))}
        </>
      )}
      {showModal && (
        <div className=" w-[70%] mx-auto p-5 border mt-10 flex flex-col justify-center items-center bg-zinc-300 rounded fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 right-0 m-auto  ">
          <h1 className="font-semibold text-sm text-center">
            Ary Sure You Want to Delete this Blog ?
          </h1>
          <div className="flex gap-3 mt-2 mx-auto ">
            <button
              onClick={() => {
                setShowModal(false);
                handleDeleteClick("yes");
              }}
              className="bg-red-500 text-white px-4 py-2 rounded mr-2"
            >
              Yes
            </button>
            <button
              onClick={() => {
                handleDeleteClick("no");
                return setShowModal(false);
              }}
              className="bg-white text-black px-4 py-2 rounded"
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
