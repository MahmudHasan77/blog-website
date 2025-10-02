"use client";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";

interface SliderType {
  image: string;
  title: string;
  _id: string;
}
type slidersProps = {
  sliders: SliderType[];
};

const HomeSliderEffect = ({ sliders }: slidersProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPase, setPase] = useState(false);

  // Swipe refs
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Auto slide effect
  useEffect(() => {
    if (isPase) return;
    if (sliders.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliders.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isPase, sliders.length]);

  // Pause after manual click
  useEffect(() => {
    if (!isPase) return;
    const interval = setInterval(() => {
      setPase(false);
    }, 2000);
    return () => clearInterval(interval);
  }, [isPase]);

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    const swipeThreshold = 50; // pixels

    if (distance > swipeThreshold) {
      // Swiped left → next slide
      setCurrentIndex((prev) => (prev + 1) % sliders.length);
      setPase(true);
    } else if (distance < -swipeThreshold) {
      // Swiped right → previous slide
      setCurrentIndex((prev) => (prev - 1 + sliders.length) % sliders.length);
      setPase(true);
    }
  };

  return (
    <div
      className="w-full h-50 rounded-lg mx-auto overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative w-full h-full">
        {sliders.length > 0 && (
          <Image
            fill
            priority
            className="object-cover transition-all duration-500"
            src={sliders[currentIndex].image}
            alt={sliders[currentIndex].title}
          />
        )}
        <p className="bg-black/50 absolute bottom-5 text-white text-sm px-5 rounded transform transition-all left-5">
          <span>{sliders[currentIndex]?.title}</span>
        </p>
        <div className="flex mx-auto justify-center gap-2 py-1 absolute bottom-0 left-1/2 -translate-x-1/2">
          {sliders?.map((_, index) => (
            <span
              onClick={() => {
                setCurrentIndex(index);
                setPase(true);
              }}
              key={index}
              className={`w-3 h-3 flex gap-3 rounded-full ${
                index === currentIndex ? "bg-black" : "bg-gray-500"
              }`}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeSliderEffect;
