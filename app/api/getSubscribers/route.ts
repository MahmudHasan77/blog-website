import subscriberModel from "@/lib/subscriberModel";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    
    const subscribers = await subscriberModel.find().sort({ createdAt: -1 });

    return NextResponse.json({ success: true, subscribers }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
};
