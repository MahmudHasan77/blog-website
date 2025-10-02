"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const ReadMoreQuran = () => {
  const [isShow, setShow] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentDiv = divRef.current; 

    if (!currentDiv) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
        } else {
          setShow(false);
        }
      },
      {
        rootMargin: "-10% 10%",
      }
    );

    observer.observe(currentDiv);

    return () => {
      observer.unobserve(currentDiv); 
    };
  }, []);

  return (
    <div ref={divRef} className="w-80 overflow-hidden mx-auto">
      <div
        className={`text-orange-500 text-center py-1 relative w-80 duration-300 mx-auto ${
          isShow ? "-translate-x-0 opacity-100" : "-translate-x-90 opacity-0"
        }`}
      >
        <Link
          href="/quran"
          className="border-b font-semibold text-sm border-orange-500 border-dashed pb-0.5"
        >
          Read more from Quran
          <span className="absolute top-3 right-1/5">
            <MdKeyboardDoubleArrowRight />
          </span>
          <span className="absolute top-3 left-1/5">
            <MdKeyboardDoubleArrowRight />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default ReadMoreQuran;
