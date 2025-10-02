import { ObjectId } from "mongoose";
import blogModel from "@/lib/BlogModel";
import database from "@/lib/MongoDB";
import SmallCard from "./components/SmallCard";
import homeSliderModel from "@/lib/homeSliderModel";
import LatestBlogQuran from "./components/LatestBlogQuran";
import LatestBlogSunnah from "./components/LatestBlogSunnah";
import ReadMoreQuran from "./components/ReadMoreQuran";
import SunnahHeading from "./components/SunnahHeading";
import ReadMoreSunnah from "./components/ReadMoreSunnah";
import HomeSliderEffect from "./components/HomeSliderEffect";
import HomePart from "./components/HomePart";

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

interface BlogDoc {
  _id: ObjectId;
  title: string;
  content: string;
  image: string;
  author: string;
  authorImage: string;
  category: string;
  updatedAt: string;
}

type slidersType = {
  title: string;
  image: string;
  _id:string
};
// ISR: 60 seconds
export const revalidate = 60;

const page = async () => {
  let blogs: Blog[] = [];
  let sunnahBlogs: Blog[] = [];
  let sliders: slidersType[] = [];
  try {
    await database();
    const fetchedBlogs = await blogModel
      .find({ category: "quran" })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean<BlogDoc[]>();

    blogs = fetchedBlogs.map((blog) => ({
      ...blog,
      _id: blog._id.toString(),
    }));
    const fetchedSunnahBlogs = await blogModel
      .find({ category: "sunnah" })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean<BlogDoc[]>();

    sunnahBlogs = fetchedSunnahBlogs.map((blog) => ({
      ...blog,
      _id: blog._id.toString(),
    }));

    const fetchingSliders = await homeSliderModel
      .find()
      .lean<{ _id: ObjectId; image: string; title: string }[]>();
    sliders = fetchingSliders?.map((slider) => ({
      ...slider,
      _id: slider?._id?.toString(),
    }));
  } catch (error) {
    console.log(error);
  }

  return (
    <div>
      <main className="max-w-3xl mx-auto">
        <HomeSliderEffect sliders={sliders} />
        <HomePart/>
        <h1 className="font-bold quranHeading text-center text-xl py3">
          Living Life by the Quran
        </h1>
        <div className="flex pb-1">
          <p className="text-sm mx-auto text-green-600">
            Latest Blogs from Quran
          </p>
        </div>
        <div className="md:hidden">
          <LatestBlogQuran blogs={blogs?.slice(0, 1)} />
        </div>
        <div className="hidden md:inline">
          <LatestBlogQuran blogs={blogs?.slice(0, 2)} />
        </div>

        <SmallCard blogs={blogs?.slice(1, blogs.length)} />
        <ReadMoreQuran />
        <SunnahHeading />
        <div className="flex pb-1">
          <p className="text-sm mx-auto text-green-600">
            Latest Blogs from Sunnah
          </p>
        </div>
        <div className="md:hidden">
          <LatestBlogSunnah blogs={sunnahBlogs?.slice(0, 1)} />
        </div>
        <div className="hidden md:inline">
          <LatestBlogSunnah blogs={sunnahBlogs?.slice(0, 2)} />
        </div>
        <SmallCard blogs={sunnahBlogs?.slice(1, blogs?.length)} />
        <ReadMoreSunnah />
      </main>
      <footer></footer>
    </div>
  );
};

export default page;
