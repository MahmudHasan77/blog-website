import React from 'react'
import { RiLoader2Line } from "react-icons/ri";
const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center p-5">
        <h1 className='LoadingTextStyle'>Loading...</h1>
      <span className="animate-spin">
        <RiLoader2Line className="text-5xl loaderStyle" />
      </span>
    </div>
  );
}

export default Loader