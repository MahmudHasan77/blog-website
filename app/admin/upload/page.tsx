"use client";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaImage } from "react-icons/fa6";
import { LuLoaderCircle } from "react-icons/lu";
import Editor from "../components/text-aditor";
const Page = () => {
  type BlogData = {
    title: string;
    content: string;
    author: string;
    category: string;
  };
  const [blogData, setBlogData] = useState<BlogData>({
    title: "",
    content: "",
    author: "",
    category: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [authorImage, setAuthorImage] = useState<File | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const authorImageRef = useRef<HTMLInputElement>(null);
  const imageClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const authorImageClick = () => {
    authorImageRef.current?.click();
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
   try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", blogData.title);
      formData.append("content", blogData.content);
      formData.append("author", blogData.author);
      formData.append("category", blogData.category);
      if (image) {
        formData.append("image", image);
      }
      if (authorImage) {
        formData.append("authorImage", authorImage);
      }

      const response = await axios.post("/api/add", formData);
      console.log(response)
      if (response.data.success) {
        toast.success(response.data.message);
        // setBlogData({ title: "", content: "", author: "", category: "" });
        // setImage(null);
        // setAuthorImage(null);
      }
    } catch (error: unknown) {
 const err = error as AxiosError<{ message: string }>;
 console.log(err)
 toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h1 className="font-bold text-center w-full p-5">Upload Blog </h1>
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setBlogData((prev) => ({ ...prev, title: e.target.value }))
            }
            value={blogData.title}
            placeholder="Title"
            className="border border-gray-300 p-2 rounded outline-none"
          />
          <label htmlFor="category" className="p-2">
            Category
          </label>
          <select
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setBlogData((prev) => ({ ...prev, category: e.target.value }))
            }
            id="category"
            title="Select Category"
            className="border border-gray-300 p-2 rounded outline-none"
          >
            <option value="">Select Category</option>
            <option value="quran">Quran</option>
            <option value="sunnah">Sunnah</option>
          </select>

          <div>
            <label htmlFor="blogImage" className="p-2">
              Blog Image
            </label>
            <div
              className="h-[100px] w-[100px] border border-gray-300 relative"
              onClick={imageClick}
            >
              {image ? (
                <Image
                  className="mx-auto object-cover h-[100px] w-[100px]"
                  src={URL.createObjectURL(image)}
                  height={100}
                  width={100}
                  alt=""
                />
              ) : (
                <span className="absolute w-full h-full top-0 left-0 flex justify-center items-center text-3xl text-gray-300">
                  <FaImage />
                </span>
              )}
            </div>

            <input
              type="file"
              id="blogImage"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setImage(e.target.files[0]);
                } else {
                  setImage(null);
                }
              }}
              ref={inputRef}
            />
          </div>

          <textarea
            placeholder="Content"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setBlogData((prev) => ({ ...prev, content: e.target.value }))
            }
            value={blogData.content}
            className="border border-gray-300 p-2 rounded h-40 "
          ></textarea>

          <input
            type="text"
            value={blogData.author}
            placeholder="Author Name"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setBlogData((prev) => ({ ...prev, author: e.target.value }))
            }
            className="border border-gray-300 p-2 rounded outline-none"
          />

          <div>
            <label htmlFor="authorImage" className="p-2">
              Author Image
            </label>
            <div
              className="h-[100px] w-[100px] border border-gray-300 relative"
              onClick={authorImageClick}
            >
              {authorImage ? (
                <Image
                  className="mx-auto object-cover h-[100px] w-[100px]"
                  src={URL.createObjectURL(authorImage)}
                  height={100}
                  width={100}
                  alt=""
                />
              ) : (
                <span className="absolute w-full h-full top-0 left-0 flex justify-center items-center text-3xl text-gray-300">
                  <FaImage />
                </span>
              )}
            </div>

            <input
              type="file"
              id="authorImage"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setAuthorImage(e.target.files[0]);
                } else {
                  setAuthorImage(null);
                }
              }}
              ref={authorImageRef}
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="bg-blue-500 relative text-white p-2 rounded hover:bg-blue-600 transition disabled:opacity-50"
          >
{loading&&<span className=' absolute top-1/2 -translate-y-1/2 left-1/3 animate-spin'><LuLoaderCircle/></span>
}            Upload
          </button>
        </form>
      </div>
      <Editor/>
    </div>
  );
};

export default Page;
