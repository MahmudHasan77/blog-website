"use client";
import React, { useState, useEffect } from "react";
import { Reem_Kufi } from "next/font/google";

const reem = Reem_Kufi();

const HomePart = () => {
  const text = "Islam shows the Way of Truth and Tranquility";
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-3xl mx-auto h-20">
      <div className="flex flex-wrap justify-center items-center w-[70%] mx-auto">
        {text.split("").map((char, i) => (
          <span
            key={i}
            className={`
              ${reem.className}
              inline-block transform transition-all duration-500 uppercase font-bold
              ${
                isVisible
                  ? "opacity-100 translate-y-5 headLindeStyle"
                  : "opacity-0 -translate-y-30"
              }
            `}
            style={{
              transitionDelay: `${i * 0.2}s`,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default HomePart;
