// app/(admin)/layout.tsx
import React from "react";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import database from "@/lib/MongoDB";
import adminModel from "@/lib/adminModel";
import HeaderSidebar from "./components/HeaderSideBar"
type LayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
  const cookiesStore = await cookies()
  const sessionCookie = cookiesStore.get("session")?.value;

  if (!sessionCookie) {
    redirect("/signIn");
  }
   await database()
const admin = await adminModel.findOne({
  sessionToken: sessionCookie,
});
if(!admin){
  redirect("/signIn")
}
if(admin?.role !== "admin"){
  redirect("/signIn")
}
  return (
    <html lang="en">
      <body>
        <div className="flex">
            <Toaster />
          <div>
            <div className="">
              <HeaderSidebar />
            </div>
          </div>
          <div className="p-1 flex-1 mt-14">{children}</div>
        </div>
      </body>
    </html>
  );
}
