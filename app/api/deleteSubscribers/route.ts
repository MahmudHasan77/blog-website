// app/api/deleteSubscribers/route.ts
import { NextRequest, NextResponse } from "next/server";
import database from "@/lib/MongoDB";
import subscriberModel from "@/lib/subscriberModel";
import { authMiddleware } from "@/lib/authMiddleware";

export async function POST(request: NextRequest) {
  const isAdmin = await authMiddleware(request);
  if (!isAdmin) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    await database();
    const body = await request.json();
    await subscriberModel.findByIdAndDelete(body?.id);

    return NextResponse.json(
      { success: true, message: "Deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
