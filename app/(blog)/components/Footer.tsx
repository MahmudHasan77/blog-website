"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import Subscribe from "./Subscription";

const Footer = () => {
  const [isShow, setShow] = useState(false);
  const [isIconShow,setIconShow]=useState(false)
  const iconDiv=useRef<HTMLDivElement>(null)
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const currentDiv = divRef.current;
    if (!currentDiv) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShow(true);
      } else {
        setShow(false);
      }
    }, {
        rootMargin:"-20% -0%"
    });
    if(currentDiv){observer.observe(currentDiv)}
    return ()=>{if(currentDiv){observer.unobserve(currentDiv)}}
  }, []);
  
  useEffect(()=>{
    const currentIconDiv= iconDiv.current;
    if(!currentIconDiv)return;
const observer = new IntersectionObserver(([entry])=>{
    if(entry.isIntersecting){
        setIconShow(true)
        console.log('entry')
    }else{
        setIconShow(false)
    }
},{
    rootMargin:'-10% -0%'
})
if(currentIconDiv){
    observer.observe(currentIconDiv)
}
return ()=>{
    if(currentIconDiv){
        observer.unobserve(currentIconDiv)
    }
}
  },[])

  return (
    <div ref={divRef} className="overflow-hidden">
      <footer
        className={` ${
          isShow ? "translate-y-0 opacity-100" : " translate-y-[100%] opacity-0"
        }  bg-zinc-300 mt-5 flex flex-col md:flex-row justify-around items-center duration-300`}
      >
        <div className="flex items-center justify-center flex-col gap-2">
          <h1 className="font-bold footerText">
            Subscribe to get Latest Blogs
          </h1>
          <Subscribe />
        </div>
        <div
          ref={iconDiv}
          className="flex flex-col items-center justify-center my-5 gap-3 "
        >
          <h1
            className={`${
              isIconShow ? "-translate-y-0" : "-translate-y-[100%] opacity-0"
            } font-bold duration-300 footerText`}
          >
            Our Social Media
          </h1>
          <div className="flex gap-3">
            <span
              className={`text-orange-500 border rounded-full p-2 duration-300 bg-white border-orange-500 ${
                isIconShow
                  ? "-translate-x-0 opacity-100"
                  : "-translate-x-30 opacity-0"
              }`}
            >
              <a
                href="https://web.facebook.com/mhmd.mhmwd.hsn.460051"
                target="blanket"
              >
                <FaFacebookF />
              </a>
            </span>
            <span className="text-orange-500 border rounded-full p-2 bg-white border-orange-500">
              <a
                href="https://www.instagram.com/musafir0131173"
                target="blanket"
              >
                <GrInstagram />
              </a>
            </span>
            <span
              className={` ${
                isIconShow
                  ? "translate-x-0 opacity-100"
                  : "translate-x-30 opacity-0"
              } text-orange-500 border duration-300 rounded-full p-2 bg-white border-orange-500`}
            >
              <a href="https://x.com/MahmudHasan2002" target="blanket">
                <FaTwitter />
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
