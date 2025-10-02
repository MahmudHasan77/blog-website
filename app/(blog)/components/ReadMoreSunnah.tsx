"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const ReadMoreSunnah = () => {
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
      { rootMargin: "-10% 10%" }
    );
    if (currentDiv) {
      observer.observe(currentDiv);
    }
    return () => {
      if (currentDiv) {
        observer.unobserve(currentDiv);
      }
    };
  }, []);
  return (
    <div ref={divRef} className="w-80 overflow-hidden mx-auto">
      <div
        className={`text-orange-500 text-center py-1 relative w-80 duration-300 mx-auto ${
          isShow ? "-translate-x-0 opacity-100" : "-translate-x-96 opacity-0"
        }`}
      >
        <Link
          href={"/sunnah"}
          className="border-b font-semibold text-sm border-orange-300 border-dashed pb-0.5"
        >
          Read more from Sunnah
          <span className="absolute top-3 right-1/5">
            <MdKeyboardDoubleArrowRight className="arrowStyle" />
          </span>
          <span className="absolute top-3 left-1/5">
            <MdKeyboardDoubleArrowRight className="arrowStyle" />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default ReadMoreSunnah;
