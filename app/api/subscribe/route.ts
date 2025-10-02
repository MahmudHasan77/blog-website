import database from "@/lib/MongoDB";
import subscriberModel from "@/lib/subscriberModel";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const data = await request.json();
    database()
    const newSubscribe = new subscriberModel({
      email: data.email,
    });
    await newSubscribe.save();
    return NextResponse.json({success:true},{ status: 200 });
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json(
    { message: "something went wrong" },
    { status: 500 }
  );
};
