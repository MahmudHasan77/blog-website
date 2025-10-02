import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="bg-white shadow p-3 max-w-xl mx-auto">
      <div className="w-full flex justify-center items-center relative h-52">
        <Image
          className="object-contain"
          src={"/34913d59-f2ab-4b6a-bfa7-ea764cccf1a6.jpg"}
          fill
          alt="about image"
        />
      </div>
      <h1 className="font-bold text-center p-5 text-orange-500">
        welcome to my website
      </h1>
      <p className="font-semibold text-sm p-2">
        I build modern, responsive full-stack websites using HTML, CSS,
        Tailwind, Bootstrap, JavaScript, TypeScript, jQuery, React.js, Next.js,
        Node.js, Express.js, MongoDB & Mongoose
      </p>
      💻 <h1 className="font-bold">My Services Include:</h1>
      <p className="font-semibold text-sm p-2">
        ✅ Frontend Development pixel-perfect and responsive designs using HTML,
        CSS, Tailwind, Bootstrap, JavaScript, TypeScript, jQuery, React.js, and
        Next.js, Redux,
      </p>
      <p className="font-semibold text-sm p-2">
        ✅ Backend Development secure and scalable APIs using Node.js and
        Express.js.
      </p>
      <p className="font-semibold text-sm p-2">
        ✅ Database Design & Integration efficient and structured data handling
        with MongoDB and Mongoose.
      </p>
      <p className="font-semibold text-sm p-2">
        ✅ Login & Payment Systems secure authentication, authorization, and
        payment gateway integration.
      </p>
      <p className="font-semibold text-sm p-2">
        ✅ Dynamic Forms & API Connections interactive forms and integration
        with third-party APIs.
      </p>
      <p className="font-semibold text-sm p-2">
        ✅ Admin Dashboards & E-commerce Solutions easy management of content,
        users, and orders.
      </p>
      <p className="font-semibold text-sm p-2">
        ✅ SEO-friendly & Performance Optimized fast-loading and search engine
        ready websites. .
      </p>
      <h1 className="font-bold">Why Me?</h1>
      <p className="font-semibold text-sm p-2">
        ➤ I focus on clean, maintainable code, modern UI/UX, fast performance,
        and 100% client satisfaction.
      </p>
      <p className="font-semibold text-sm p-2">
        ➤ Professional and timely delivery{" "}
      </p>
      <p className="font-semibold text-sm p-2">
        ➤ Friendly and clear communication{" "}
      </p>
      <p className="font-semibold text-sm p-2">
        ➤ Custom solutions tailored to your business needs{" "}
      </p>
      <h1 className="font-bold">
        Let&apos;s bring your web project to life! 🚀
      </h1>
      <div className="flex justify-center items-center gap-3 flex-wrap">
        <div className="w-50">
          <Link
            href={
              "https://www.fiverr.com/mahmud02002/create-a-modern-responsive-website-using-react-node-js-and-mongodb"
            }
          >
            <div className="font-bold flex justify-center items-center flex-col p-5 border w-50 shadow border-zinc-300 mx-auto my-5 ">
              <h1>My Fiverr Account </h1>
              <Image
                src={"/download.png"}
                height={50}
                width={50}
                alt="fiverr link"
              />
            </div>
          </Link>
        </div>
        <div className="w-50">
          <Link href={"https://www.upwork.com/freelancers/~01f79fa3d73d7c8d81"}>
            <div className="font-bold flex justify-center items-center flex-col p-5 border w-50 shadow border-zinc-300 mx-auto my-5 ">
              <h1>My UpWork Account </h1>
              <Image
                src={"/images (1).png"}
                height={50}
                width={50}
                alt="fiverr link"
              />{" "}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
