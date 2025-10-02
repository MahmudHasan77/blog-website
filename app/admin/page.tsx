import React from "react";
import Image from "next/image";
import Home from "./components/Home";
import database from "@/lib/MongoDB";
import blogModel from "../../lib/BlogModel";
import subscriberModel from "@/lib/subscriberModel";
import homeSliderModel from "@/lib/homeSliderModel";
const Page = async () => {
  let CountBlogs = 0;
  let subscriberCount = 0;
  let visit = 0;
  let HomeSliders= 0;
  try {
    await database();
    CountBlogs = await blogModel.countDocuments();
    subscriberCount = await subscriberModel.countDocuments();
    visit = await blogModel.countDocuments().sort({view:1}).limit(10);
    HomeSliders = await homeSliderModel.countDocuments()
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="w-full px-1 py-5 bg-zinc-100 min-h-screen">
      <div className="w-full">
        <Image
          src="/images.png"
          height={50}
          width={300}
          alt="dash board"
          className="mx-auto object-cover shadow"
        />
        <Home
          countBlogs={CountBlogs}
          subscriberCount={subscriberCount}
          visit={visit}
          HomeSliders={HomeSliders}
        />
      </div>
    </div>
  );
};

export default Page;
