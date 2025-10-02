"use client";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { RiLoader3Line } from "react-icons/ri";
const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading,setLoading]=useState(false)
  const [data, setData] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
try {
  setLoading(true)
      const response = await axios.post("/api/adminSignIn", data);
      if (response?.data?.success) {
        toast.success('Welcome to Admin Panel');
        setData({ email: "", password: "" });
      }else{
        toast.error(response?.data?.message)
      }

} catch (error:unknown) {
  const err = error as AxiosError<{message:string}>
  console.log(error)
  toast.error(err?.response?.data?.message||'something went wrong')
}finally{
  setLoading(false)
}
  };

  return (
    <div>
      <h1 className="font-bold text-center text-xl py-3">Sign In </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-2 border bg-zinc-200 border-zinc-300 py-5 w-80 mx-auto"
      >
        <input
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          type="email"
          required
          className="outline-none border border-zinc-400 bg-white py-1 px-2 text-center w-70 rounded"
          placeholder="Email..."
        />
        <div className="relative">
          <input
            required
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            type={showPassword ? "text" : "password"}
            className="outline-none border border-zinc-400 bg-white py-1 px-2 text-center w-70 rounded"
            placeholder="Password..."
          />
          <span
            className="absolute top-1/2 -translate-y-1/2 right-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {isLoading ? (
          <div className="relative">
            <button
              disabled={isLoading}
              type="submit"
              className="bg-white rounded w-70 mt-2 border disabled:text-gray-400 border-orange-300 shadow py-2"
            >
              Submit
            </button>
            <span className="absolute top-[30px] -translate-1/2 left-1/3 animate-spin text-red-500"><RiLoader3Line/></span>
          </div>
        ) : (
          <button
            type="submit"
            className="bg-white rounded w-70 mt-2 border border-orange-300 shadow py-2"
          >
            Submit
          </button>
        )}
      </form>
    </div>
  );
};

export default SignIn;
