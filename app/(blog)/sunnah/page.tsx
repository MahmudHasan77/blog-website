"use client";
import { Pagination } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import QuranCard from "../components/QuranCard";
import Loader from "../components/Loader";
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

const AllQuran = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [count, setCount] = useState(0);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchingBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.post("/api/getAllSunnah", { page });
        if (response?.data?.success) {
          setBlogs(response?.data?.blogs);
          setTotalPages(response?.data?.totalPage);
          setCount(response?.data?.totalBlogs);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchingBlogs();
  }, [page]);
  return (
    <div>
      <div className="flex">
        <span className="font-bold text-center py-1 my-2 text-orange-500 border-b mx-auto">
          The Holy Quran: Guide for Our Life
        </span>
      </div>
      {count === 1 ? (
        <div className="flex justify-center my-1">
          <span className="text-sm font-semibold">There is( {count}) blog</span>
        </div>
      ) : (
        <div className="flex justify-center my-1">
          <span className="text-sm font-semibold">
            There are( {count}) blogs
          </span>
        </div>
      )}
      {isLoading ? <Loader /> : <QuranCard blogs={blogs} />}
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

export default AllQuran;
