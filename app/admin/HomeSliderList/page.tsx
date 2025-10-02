"use client";
import Loader from "@/app/(blog)/components/Loader";
import axios from "axios";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";
import { RiLoader2Fill } from "react-icons/ri";
type sliderType = {
  _id: string;
  image: string;
  title: string;
};
const HomeSliderList = () => {
  const [sliders, setSliders] = useState<sliderType[]>([]);
  const [selectedSlider,setSelectedSlider]=useState("")

  const fetchingSliders = useCallback(async () => {
    try {
      const response = await axios.get("/api/getHomeSlider");
      if (response?.data?.success) {
        setSliders(response?.data?.sliders);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    fetchingSliders();
  }, [fetchingSliders]);

  const deleteSlider = async(id:string)=>{
    try {
        setSelectedSlider(id)
        const response = await axios.post('/api/deleteSlider',{id})
        if(response?.data?.success){
            toast.success(response?.data?.message)
            fetchingSliders()
        }
    } catch (error) {
        console.log(error)
    }finally{
        setSelectedSlider("")
    }
  }
  return (
    <div className="min-w-md">
      <h1 className="font-bold text-center py-2">Home Sliders</h1>
      <div className="font-bold grid grid-cols-5 border-b border-orange-500">
        <h1 className="col-span-2 text-center">Image</h1>
        <h1 className="col-span-2 text-center">Title</h1>
        <h1 className="text-center">Action</h1>
      </div>
      {sliders?.length === 0 ? (
        <Loader />
      ) : (
        sliders?.map((slider) => {
          return (
            <div
              key={slider?._id}
              className="my-2 border bg-white grid grid-cols-5 border-zinc-300 h-20 w-full "
            >
              <div className="relative h-20 w-40 col-span-2 text-center">
                <Image
                  src={slider?.image}
                  fill
                  alt="slider image"
                  className="object-cover"
                />
              </div>
              <h1 className=" col-span-2 text-center text-sm">
                {slider?.title?.length > 70
                  ? slider?.title?.slice(0, 70) + "..."
                  : slider?.title}
              </h1>
              {selectedSlider === slider?._id ? (
                <span
                  className="flex justify-center items-center text-red-500 text-xl cursor-pointer"
                >
                  <RiLoader2Fill className="animate-spin"/>
                </span>
              ) : (
                <span
                  className="flex justify-center items-center text-red-500 text-xl cursor-pointer"
                  onClick={() => deleteSlider(slider?._id)}
                >
                  <MdDeleteForever />
                </span>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default HomeSliderList;
