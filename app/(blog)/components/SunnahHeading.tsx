"use client";
import React, { useEffect, useRef, useState } from "react";

const SunnahHeading = () => {
  const [isShow, setShow] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const currentDiv = divRef.current;
    if (!currentDiv) {
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShow(true);
      } else {
        setShow(false);
      }
    },
    {
        rootMargin:"-20% -20%"
    }

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
    <div
    className="max-w-80 overflow-hidden mx-auto"
    ref={divRef}>
      <h1 className={`font-bold text-orange-600 text-center py-3 text-xl duration-500 ${isShow?'-translate-y-0 opacity-100':'translate-x-[100vh] opacity-0'}`}>
        Sunnah: Source of Inspiration
      </h1>
    </div>
  );
};

export default SunnahHeading;
