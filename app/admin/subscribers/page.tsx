"use client";
import axios, { AxiosError } from "axios";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
const Page = () => {
  const [deleteLoading, setDeleteLoading] = useState("");
  const [subscribers, setSubscribers] = useState<
    { _id: string; email: string; createdAt: string }[]
  >([]);
  const fetchingSubscribers = useCallback(async () => {
    try {
      const response = await axios.get("/api/getSubscribers");
      setSubscribers(response?.data?.subscribers);
      if (!response?.data?.success) {
        toast.success("Something went wrong");
      }
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
    }
  }, []);
  useEffect(() => {
    fetchingSubscribers();
  }, [fetchingSubscribers]);

  const handleDelete = async (id: string) => {
    try {
      setDeleteLoading(id);
      const response = await axios.post("/api/deleteSubscribers", { id });
      if (response?.data?.success) {
        fetchingSubscribers();
        toast.success("Subscriber deleted successfully");
      }
    } catch (error) {
      const err = error as AxiosError<{message:string}>
      toast.error(err?.response?.data?.message||"something went wrong")
      console.log(error);
    } finally {
      setDeleteLoading("");
    }
  };
  return (
    <div>
      <div>
        <div className="font-bold border-b grid grid-cols-4 text-center py-3">
          <h1 className=" col-span-2">Gmail</h1>
          <h1>Date</h1>
          <h1>Delete</h1>
        </div>
        {subscribers?.map((sub) => {
          return (
            <div
              key={sub?._id}
              className="grid p grid-cols-4 text-center my-1 p-1 bg-zinc-100 items-center"
            >
              <h1 className=" col-span-2">{sub?.email}</h1>
              <div className="mx-auto">
                <h1 className="text-xs bg-white w-20 text-center">
                  {sub?.createdAt?.split("T")[0]}
                </h1>
              </div>
              <div
                className="flex justify-center text-red-500 cursor-pointer"
                onClick={() => handleDelete(sub?._id)}
              >
                {sub?._id !== deleteLoading && <RxCross2 />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
