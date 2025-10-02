"use client";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Subscribe = () => {
  const [email,setEmail]=useState('')
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await axios.post('/api/subscribe',{email})
    if(response?.data?.success){
  toast.success('Congratulation!')
  setEmail('')

}
    try {
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error?.response?.data?.message || "something went wrong");
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex items-center rounded-sm overflow-hidden border border-orange-500"
      >
        <input
        value={email}
          type="email"
          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value)}
          placeholder="mh123@email.com"
          required
          className="outline-none bg-white px-3 text-center text-sm py-1 w-60"
        />
        <button
          type="submit"
          className="bg-orange-500 cursor-pointer py-1 px-2 font-semibold text-sm"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Subscribe;
