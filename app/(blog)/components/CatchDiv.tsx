"use client"
import { useEffect, useRef, useState } from "react";

export default function DemoDiv() {
  const divRef = useRef(null);
  const [show,setShow]=useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          console.log("✅ Div entered the viewport");
        } else {
          setShow(false);
          console.log("❌ Div left the viewport");
        }
      },
      { root: null, rootMargin: "-10% 0px -10% 0px" }
    );

    if (divRef.current) {
      observer.observe(divRef.current);
    }

    return () => {
      if (divRef.current) observer.unobserve(divRef.current);
    };
  }, []);

  return (
    <div
    className={show?"opacity-100 duration300 h-10 border":"opacity-0 duration-00 h-10 border"}
      ref={divRef}
    >
      Watch me!
    </div>
  );
}
