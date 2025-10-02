import homeSliderModel from "@/lib/homeSliderModel";
import database from "@/lib/MongoDB";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    database();
    const sliders = await homeSliderModel.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, sliders }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
};
