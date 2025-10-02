"use client";
import axios from "axios";
import Image from "next/image";
import React, { FormEvent, useRef, useState } from "react";
import toast from "react-hot-toast";

type SliderData = {
  title: string;
  image: File | null;
};

const Page = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading,setLoading]=useState(false)
  const [sliderData, setSliderData] = useState<SliderData>({
    title: "",
    image: null,
  });

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSliderData((prev) => ({
        ...prev,
        image: e.target.files![0],
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", sliderData.title);
      if (sliderData.image) {
        formData.append("image", sliderData.image);
      }

      const response = await axios.post("/api/addHomeSlider", formData);
    if(response?.data?.success){
        toast.success("Slider added successfully")
        setSliderData({image:null,title:''})
    }
    } catch (error) {
      console.log(error);
    }finally{
        setLoading(false)
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <h1 className="text-xl font-bold text-center">Add Home Slider</h1>
        <div className="w-full flex justify-center my-3">
          <input
            type="text"
            name="title"
            value={sliderData.title}
            onChange={handleChange}
            placeholder="Blog title..."
            className="border border-zinc-300 outline-none p-2 bg-white rounded w-[80%] md:w-[50%]"
          />
        </div>
        <div
          onClick={handleClick}
          className="flex justify-center cursor-pointer my-3 h-30 w-50 border border-zinc-300 bg-amber-50 rounded overflow-hidden mx-auto items-center"
        >
          {sliderData?.image ? (
            <div className="flex justify-center mt-4 relative w-50 h-30">
              <Image
                src={URL.createObjectURL(sliderData.image)}
                alt="Preview"
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <span> Upload slider image..</span>
          )}
        </div>
        <input
          onChange={handleFileChange}
          ref={inputRef}
          type="file"
          className="hidden"
        />
        <div className="flex justify-center">
          {isLoading ? (
            <button
            disabled={isLoading}
              className="border px-10 border-orange-300 text-white bg-orange-300 mx-auto"
              type="submit"
            >
              Uploading...
            </button>
          ) : (
            <button
              className="border px-10 border-orange-500 text-white bg-orange-500 mx-auto"
              type="submit"
            >
              Add Slider
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Page;
