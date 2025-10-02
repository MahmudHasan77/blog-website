"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Slider = {
  image: string;
  title: string;
};

type HomeSliderProps = {
  sliders: Slider[];
};

const HomeSlider = ({ sliders }: HomeSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPass, setPass] = useState(false);

  // Fetch sliders

  // Auto-play
  useEffect(() => {
    if (!isPass) return;
    const interval = setInterval(() => {
      setPass(false);
    }, 2000);

    return () => clearInterval(interval);
  }, [isPass]);

  useEffect(() => {
    if (sliders.length === 0) return;
    if (isPass) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === sliders.length - 1 ? 0 : prev + 1));
    }, 2000);

    return () => clearInterval(interval);
  }, [isPass, sliders]);

  return (
    <>
      {sliders?.length === 0 ? (
        <></>
      ) : (
        <div className="relative w-full max-w-3xl mx-auto h-60 overflow-hidden rounded-lg">
          {sliders.length > 0 && (
            <div className="w-full h-50 relative">
              <div
                className={`flex transition-transform ${
                  currentIndex === 0 ? "duration-100" : "duration-700 "
                } ease-in-out`}
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {sliders?.map((slider, index) => (
                  <div
                    key={index}
                    className="relative flex-shrink-0 w-full h-50"
                  >
                    <Image
                      src={slider.image}
                      alt={slider.title || "slider"}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
              {/* Previous Button */}
              <button
                onClick={() => {
                  setCurrentIndex(
                    currentIndex === 0 ? sliders.length - 1 : currentIndex - 1
                  );
                  setPass(true);
                }}
                className="absolute top-1/2 left-3 -translate-y-1/2 bg-gray-800/70 text-white p-2 rounded-full hover:bg-gray-900"
              >
                &#10094;
              </button>

              {/* Next Button */}
              <button
                onClick={() => {
                  setCurrentIndex(
                    currentIndex === sliders.length - 1 ? 0 : currentIndex + 1
                  );
                  setPass(true);
                }}
                className="absolute top-1/2 right-3 -translate-y-1/2 bg-gray-800/70 text-white p-2 rounded-full hover:bg-gray-900"
              >
                &#10095;
              </button>
            </div>
          )}

          {/* Dots Navigation */}
          <div className="flex justify-center mt-3 space-x-2">
            {sliders.map((_, index: number) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-3 w-3 rounded-full ${
                  index === currentIndex ? "bg-gray-800" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default HomeSlider;
